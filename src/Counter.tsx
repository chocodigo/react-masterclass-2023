import React, { useEffect, useRef, useState } from "react";
import CountBox from "./components/CountBox";
import Reslut from "./components/Result";
import { round, goal } from "./atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

const INIT_MINUTE = 25;
const INIT_SECONDS = 0;

const ROUND = 4;
const GOAL = 12;

const padNumber = (num: number, length: number) => {
  return String(num).padStart(length, "0");
};

const Wrapper = styled.div`
  background-color: #e84c3f;
  color: white;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 100px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const BoxWrapper = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;

const DotWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  margin: 0 10px;
`;

const Dot = styled.div`
  width: 20px;
  height: 20px;
  background-color: #f4a69c;
  border-radius: 50%;
`;

const Button = styled(motion.div)`
  width: 100px;
  height: 100px;
  background-color: #ba3c32;
  color: white;
  font-size: 50px;
  font-weight: bold;
  border-radius: 50%;
  margin-top: 10px;
`;

const ResultWrapper = styled.div`
  display: flex;
  width: 80vw;
  justify-content: space-between;
`;

const BtnVariants = {
  hover: {
    scale: 1.2,
  },
  click: {
    scale: 1,
  },
};

const Counter = () => {
  const [minute, setMinute] = useState(INIT_MINUTE);
  const [seconds, setSeconds] = useState(INIT_SECONDS);
  let initialTime = useRef(minute * 60 + seconds);

  const [isStart, setIsStart] = useState(false);

  const interval = useRef<NodeJS.Timer>();

  const [_round, setRound] = useRecoilState(round);
  const setGoal = useSetRecoilState(goal);

  useEffect(() => {
    if (isStart) {
      interval.current = setInterval(() => {
        initialTime.current -= 1;
        setSeconds(initialTime.current % 60);
        setMinute(Math.floor(initialTime.current / 60));
        if (initialTime.current < 0) {
          clearInterval(interval.current);
          setIsStart(false);
          setMinute(INIT_MINUTE);
          setSeconds(INIT_SECONDS);
          initialTime.current = INIT_MINUTE * 60 + INIT_SECONDS;
          if (_round < ROUND - 1) {
            setRound((prev: number) => prev + 1);
          } else {
            setRound(0);
            setGoal((prev: number) => prev + 1);
          }
        }
      }, 1000);
    } else {
      clearInterval(interval.current);
    }
  }, [isStart]);

  const onClickStartBtn = () => {
    setIsStart((prev) => !prev);
  };

  return (
    <Wrapper>
      <h1>Pomodoro</h1>
      <BoxWrapper>
        <CountBox count={padNumber(minute, 2)} />
        <DotWrapper>
          <Dot />
          <Dot />
        </DotWrapper>
        <CountBox count={padNumber(seconds, 2)} />
      </BoxWrapper>
      <Button
        onClick={onClickStartBtn}
        variants={BtnVariants}
        whileHover={"hover"}
        whileTap={"click"}
      >
        {isStart ? (
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z"></path>
          </svg>
        ) : (
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
          </svg>
        )}
      </Button>
      <ResultWrapper>
        <Reslut title={"round"} defaultCount={ROUND} />
        <Reslut title={"goal"} defaultCount={GOAL} />
      </ResultWrapper>
    </Wrapper>
  );
};

export default Counter;

import React, { useEffect, useRef, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import Header from "./pages/Header";
import Router from "./Router";

export const Wrapper = styled(motion.div)`
  height: 100vh;
  //height: 200vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  //flex-direction: column;
  background: linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0));
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  margin-right: 10px;
`;

export const Box2 = styled(motion.div)`
  //width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  //margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  //position: absolute;
  top: 100px;
`;

const Circle = styled(motion.div)`
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background-color: white;
  height: 70px;
  width: 70px;
  border-radius: 50%;
  place-self: center;
`;

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const boxVariants = {
  start: {
    opacity: 0,
    scale: 0.5,
  },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const circleVariants = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
  },
};

const whileVariants = {
  hover: {
    scale: 1.5,
    rotateZ: 90,
  },
  click: {
    borderRadius: "50%",
    scale: 1,
  },
};

const Svg = styled.svg`
  width: 300px;
  height: 300px;
  path {
    stroke: white;
    stroke-width: 2;
  }
`;
const svg = {
  start: { pathLength: 0, fill: "rgba(255, 255, 255, 0)" },
  end: {
    fill: "rgba(255, 255, 255, 1)",
    pathLength: 1,
  },
};
function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  const gradient = useTransform(
    x,
    [-800, 800],
    [
      "linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))",
      "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))",
    ]
  );
  const { scrollY, scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);

  const [showing, setShowing] = useState(false);
  const toggleShowing = () => setShowing((prev) => !prev);

  const boxVariants = {
    initial: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateZ: 360,
    },
    leaving: {
      opacity: 0,
      scale: 0,
      y: 50,
    },
  };

  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const nextPlease = () => {
    setBack(false);
    setVisible((prev) => (prev === 10 ? 10 : prev + 1));
  };
  const prevPlease = () => {
    setBack(true);
    setVisible((prev) => (prev === 1 ? 1 : prev - 1));
  };
  const box = {
    entry: (back: boolean) => {
      return {
        x: back ? -500 : 500,
        opacity: 0,
        scale: 0,
      };
    },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
      },
    },
    exit: (back: boolean) => {
      return {
        x: back ? 500 : -500,
        opacity: 0,
        scale: 0,
        transition: {
          duration: 1,
        },
      };
    },
  };
  return (
    <>

      <Router/>
    </>
  );
}

export default App;

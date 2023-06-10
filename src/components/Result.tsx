import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { round, goal } from "../atoms";
import styled from "styled-components";

interface IProps {
  title: string;
  defaultCount: number;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 50px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

const Title = styled.div`
  color: #ffc7b8;
`;

const Count = styled.div`
  color: #fff0e9;
  margin-bottom: 8px;
`;

const Reslut = ({ title, defaultCount }: IProps) => {
  const count = useRecoilValue(title === "goal" ? goal : round);
  return (
    <Wrapper>
      <Count>
        {count}/{defaultCount}
      </Count>
      <Title>{title.toUpperCase()}</Title>
    </Wrapper>
  );
};

export default Reslut;

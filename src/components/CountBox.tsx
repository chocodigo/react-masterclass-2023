import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import styled from "styled-components";

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: #e84c3f;
  font-size: 140px;
  font-weight: bold;
  border-radius: 10px;
`;

interface IProps {
  count: string;
}

const boxVariants = {
  entry: {
    scale: 0,
    opacity: 0,
  },
  center: {
    scale: 1,
    opacity: 1,
  },
  exit: {
    scale: 0,
    opacity: 0,
  },
};

const CountBox = ({ count }: IProps) => {
  return (
    <Box
      variants={boxVariants}
      initial={"entry"}
      animate={"center"}
      exit={"exit"}
      key={count}
    >
      {count}
    </Box>
  );
};

export default CountBox;

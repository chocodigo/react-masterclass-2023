import React, { useEffect, useRef, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { Wrapper, Box2 as Box } from "./App";

const Circle = styled(motion.div)`
  background-color: #00a5ff;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function _814() {
  const [clicked, setClicked] = useState(false);
  const toggleClick = () => setClicked((prev) => !prev);
  return (
    <Wrapper onClick={toggleClick}>
      <Box>
        {!clicked ? (
          <Circle layoutId={"circle"} style={{ borderRadius: "50px" }} />
        ) : null}
      </Box>
      <Box>
        {clicked ? (
          <Circle layoutId={"circle"} style={{ borderRadius: "0" }} />
        ) : null}
      </Box>
    </Wrapper>
  );
}

export default _814;

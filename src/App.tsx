import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

import Router from "./Router";
import Modal from "./components/Modal";
import { useRecoilState } from "recoil";
import { movieId } from "./atoms";

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

function App() {
  const [id, setId] = useRecoilState(movieId);
  useEffect(() => {
    if (id !== -1) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [id]);
  return (
    <>
      <AnimatePresence>
        {id !== -1 && <Modal id={id} layoutId={id + ""} />}
      </AnimatePresence>
      <Router />
    </>
  );
}

export default App;

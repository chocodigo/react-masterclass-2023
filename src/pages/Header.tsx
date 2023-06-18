import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { getPopular, IAPIResponse } from "../api";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Wrapper = styled(motion.div)`
  display: flex;
  background-color: black;
  color: white;
  justify-content: center;
  font-size: 16px;
  margin-bottom: 20px;
  a {
    margin-right: 10px;
  }
`;

const LinkWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
`;
const Circle = styled(motion.div)`
  background-color: darkred;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const Header = () => {
  const [circle, setCircle] = useState("popular");
  const onToggle = (value: string) => setCircle(value);

  return (
    <Wrapper>
      <LinkWrapper onClick={() => onToggle("popular")}>
        <Link to={"/"}>POPULAR</Link>
        {circle === "popular" && <Circle layoutId="circle" />}
      </LinkWrapper>
      <LinkWrapper onClick={() => onToggle("coming-soon")}>
        <Link to={"/coming-soon"}>COMING SOON</Link>
        {circle === "coming-soon" && <Circle layoutId="circle" />}
      </LinkWrapper>
      <LinkWrapper onClick={() => onToggle("now-playing")}>
        <Link to={"/now-playing"}>NOW PLAYING</Link>
        {circle === "now-playing" && <Circle layoutId="circle" />}
      </LinkWrapper>
    </Wrapper>
  );
};

export default Header;

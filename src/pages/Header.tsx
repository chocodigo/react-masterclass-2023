import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import {getPopular, IAPIResponse} from "../api";
import {Link} from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  a{
    margin-right: 10px;
  }
`
const Header = () =>{

    return <Wrapper>
        <Link to={'/'}>POPULAR</Link>
        <Link to={'/'}>COMING SOON</Link>
        <Link to={'/'}>NOW PLAYING</Link>
    </Wrapper>
}

export default Header;
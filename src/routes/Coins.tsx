import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet-async";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
  font-family: "Source Sans Pro", sans-serif;
`;

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.containerBgColor};
  color: ${(props) => props.theme.containerTextColor};
  transition: color 0.2s ease-in;
  border-radius: 10px;
  margin-bottom: 10px;
  a {
    display: flex;
    transition: color 0.2s ease-in;
    align-items: center;
    padding: 20px;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentContainerBgColor};
    }
    background-color: ${(props) => props.theme.accentContainerTextColor};
  }
  &:active {
    a {
      color: ${(props) => props.theme.accentOnColor};
    }
    background-color: ${(props) => props.theme.accentColor};
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
const ThemeChangeButton = styled.button`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.containerBgColor};
  padding: 7px;
  border-radius: 10px;
  color: ${(props) => props.theme.containerTextColor};
  &:hover {
    color: ${(props) => props.theme.accentContainerBgColor};
    background-color: ${(props) => props.theme.accentContainerTextColor};
  }
  &:active {
    color: ${(props) => props.theme.accentOnColor};
    background-color: ${(props) => props.theme.accentColor};
  }
`;

// 코인 목록

function Coins() {
  const { isLoading, data: coins } = useQuery<ICoin[]>("allCoins", fetchCoins);
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
        <ThemeChangeButton onClick={toggleDarkAtom}>
          {isDark ? <LightModeIcon /> : <DarkModeIcon />}
        </ThemeChangeButton>
      </Header>
      {isLoading ? (
        <Loader>Loading ...</Loader>
      ) : (
        <CoinsList>
          {coins?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `${process.env.PUBLIC_URL}/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;

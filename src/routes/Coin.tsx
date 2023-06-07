import React, { useEffect, useState } from "react";
import {
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import Price, { defaultQuotes } from "./Price";
import Chart from "./Chart";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet-async";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
interface RouteParams {
  coinId: string;
}
const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.containerBgColor};
  color: ${(props) => props.theme.containerTextColor};
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) =>
    props.isActive
      ? props.theme.accentContainerBgColor
      : props.theme.containerBgColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive
      ? props.theme.accentContainerTextColor
      : props.theme.containerTextColor};
  a {
    display: block;
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

interface RouteState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_a: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;
// 코인 상세 정보

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: info } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersloading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId)
    // {
    //   // 5초 간격으로 호출
    //   refetchInterval: 5000,
    // }
  );

  const loading = infoLoading || tickersloading;

  return (
    <Container>
      <Helmet>
        <title>
          {" "}
          {state?.name ? state.name : loading ? "Loading..." : info?.name}
        </title>
      </Helmet>
      <Header>
        <Link to={process.env.PUBLIC_URL + "/"}>
          <ArrowBackIcon />
        </Link>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : info?.name}
        </Title>
        <Img
          src={`https://coinicons-api.vercel.app/api/icon/${tickersData?.symbol.toLowerCase()}`}
        />
      </Header>
      {loading ? (
        <Loader>Loading ...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>$ {tickersData?.quotes.USD.price}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`${process.env.PUBLIC_URL}/${coinId}/chart`}>
                Chart
              </Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`${process.env.PUBLIC_URL}/${coinId}/price`}>
                Price
              </Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`${process.env.PUBLIC_URL}/${coinId}/price`}>
              <Price quotes={tickersData?.quotes || defaultQuotes} />
            </Route>
            <Route path={`${process.env.PUBLIC_URL}/${coinId}/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;

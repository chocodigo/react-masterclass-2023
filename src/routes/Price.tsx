import React from "react";
import styled from "styled-components";
import MovingIcon from "@mui/icons-material/Moving";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

interface PriceProps {
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

export const defaultQuotes = {
  USD: {
    ath_date: "",
    ath_price: 0,
    market_cap: 0,
    market_cap_change_24h: 0,
    percent_change_1h: 0,
    percent_change_1y: 0,
    percent_change_6h: 0,
    percent_change_7d: 0,
    percent_change_12h: 0,
    percent_change_15m: 0,
    percent_change_24h: 0,
    percent_change_30d: 0,
    percent_change_30m: 0,
    percent_from_price_ath: 0,
    price: 0,
    volume_24h: 0,
    volume_24h_change_24h: 0,
  },
};

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.div`
  background-color: ${(props) => props.theme.surfaceBgColor};
  color: ${(props) => props.theme.surfaceTextColor};
  font-size: 12px;
  font-weight: 400;
  height: 100px;
  border-radius: 10px;
  padding: 10px;
`;

const InfoWrapper = styled.div<{ state: number }>`
  display: flex;
  color: ${(props) =>
    props.state > 0
      ? props.theme.errorColor
      : props.state === 0
      ? props.theme.containerTextColor
      : props.theme.accentColor};
  align-items: center;
  justify-content: space-between;
  height: 100%;
  font-size: 30px;
`;

interface IValue {
  state: number;
  title: string;
}

function Price({ quotes = defaultQuotes }: PriceProps) {
  const valueList = [
    {
      title: "1시간",
      state: quotes.USD.percent_change_1h,
    },
    {
      title: "24시간",
      state: quotes.USD.percent_change_24h,
    },
    {
      title: "7일",
      state: quotes.USD.percent_change_7d,
    },
    {
      title: "30일",
      state: quotes.USD.percent_change_30d,
    },
  ];

  const Info = ({ state, title }: IValue) => {
    return (
      <Tab>
        <div>{title}</div>
        <InfoWrapper state={state}>
          <div>{state} %</div>
          {state > 0 ? (
            <MovingIcon />
          ) : state === 0 ? (
            <HorizontalRuleIcon />
          ) : (
            <TrendingDownIcon />
          )}
        </InfoWrapper>
      </Tab>
    );
  };

  return (
    <Tabs>
      {valueList.map((value, idx) => (
        <Info key={`info_${idx}`} title={value.title} state={value.state} />
      ))}
    </Tabs>
  );
}

export default Price;

import React from "react";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

const ChartWrapper = styled.div`
  background-color: ${(props) => props.theme.containerBgColor};
  border-radius: 10px;
  width: 100%;
  height: 300px;
  //display: flex;
  //align-items: center;
  //justify-content: center;
  margin-bottom: 10px;
`;

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <>
      <ChartWrapper>
        {isLoading ? (
          "Loading Chart..."
        ) : (
          <ApexChart
            type={"line"}
            series={[
              {
                name: "Price",
                data:
                  (data?.map((price) => Number(price.close)) as number[]) || [],
              },
            ]}
            options={{
              theme: {
                mode: "dark",
              },
              chart: {
                height: 300,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: {
                show: false,
              },
              stroke: {
                curve: "smooth",
                width: 4,
              },
              xaxis: {
                labels: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                type: "datetime",
                categories: data?.map((price) =>
                  new Date(price.time_close * 1000).toISOString()
                ),
              },
              yaxis: {
                labels: {
                  show: false,
                },
              },
              fill: {
                type: "gradient",
                gradient: {
                  gradientToColors: ["#0be881"],
                  stops: [0, 100],
                },
              },
              colors: ["#0fbcf9"],
              tooltip: {
                y: {
                  formatter: (value) => `${value.toFixed(1)}`,
                },
              },
            }}
          />
        )}
      </ChartWrapper>
      <ChartWrapper>
        {isLoading ? (
          "Loading Chart..."
        ) : (
          <ApexChart
            type={"candlestick"}
            series={[
              {
                data:
                  data?.map((price) => {
                    return {
                      x: new Date(price.time_close),
                      y: [price.open, price.high, price.low, price.close],
                    };
                  }) || [],
              },
            ]}
            options={{
              chart: {
                height: 300,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: {
                show: false,
              },
              xaxis: {
                labels: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                type: "datetime",
              },
              yaxis: {
                labels: {
                  show: false,
                },
              },
            }}
          />
        )}
      </ChartWrapper>
    </>
  );
}

export default Chart;

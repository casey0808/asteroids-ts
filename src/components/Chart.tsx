import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { IAsteroidData, IMinerData, IPlanetData } from "../constants/typing";
import gridBg from "../assets/images/gridBg.svg";
import planetIcon from "../assets/images/planet.svg";
import minerIcon from "../assets/images/rocket.svg";
import asteroidIcon from "../assets/images/asteroids.svg";

const Chart = ({ data }: { data: any }) => {
  const planet = data?.planets?.map((each: IPlanetData) => [
    each.position.x,
    each.position.y,
  ]);
  const miner = data?.miners?.map(
    (each: IMinerData) => !!each.x && !!each.y && [each.x, each.y, each.angle]
  );

  const asteroid = data?.asteroids?.map((each: IAsteroidData) => [
    each.position.x,
    each.position.y,
  ]);

  const option = {
    backgroundColor: "transparent",
    grid: {
      show: false,
    },
    xAxis: { show: false, min: 0, max: 1000 },
    yAxis: { show: false, min: 0, max: 1000 },
    series: [
      {
        symbolSize: 80,
        symbol: `image://${planetIcon}`,
        data: planet ? [...planet] : [],
        type: "scatter",
        symbolKeepAspect: true,
      },
      {
        symbolSize: 20,
        symbol: `image://${minerIcon}`,
        data: miner ? [...miner] : [],
        type: "scatter",
        symbolKeepAspect: true,
        symbolRotate: (value: any) => value[2]
      },
      {
        symbolSize: 30,
        symbol: `image://${asteroidIcon}`,
        data: asteroid ? [...asteroid] : [],
        type: "scatter",
        symbolKeepAspect: true,
      },
    ],
    graphic: [
      {
        type: "image",
        style: {
          image: gridBg,
          width: 800,
          height: 800,
        },
      },
    ],
  };

  if (!planet && !miner && !asteroid) {
    return <></>;
  }

  return (
    <ReactECharts
      option={option}
      style={{ height: "100%", width: '100%' }}
      lazyUpdate={true}
    />
  );
};

export default Chart;

import { EMColKey, IMinerData, IPlanetData } from "./constants/typing";
import RocketIcon from "./assets/icons/rocket.svg";
import AsteroidIcon from "./assets/icons/asteroid.svg";
import PlanetIcon from "./assets/icons/planet.svg";
import Rocket from "./assets/icons/rocketClicked.svg";
import Asteroid from "./assets/icons/asteroidClicked.svg";
import Planet from "./assets/icons/planetClicked.svg";

export const getPlanetName = (id: string, planetList: IPlanetData[]) => {
  const obj = planetList?.find((planet) => planet._id === id);
  return obj?.name;
};

export const getCurrentMiner = (id: string, minerList: IMinerData[]) => {
  const obj = minerList?.find((miner) => miner._id === id);
  return obj?.name;
};

export const getCustomTabs = (colKey: string) => {
  const customTabs = [
    {
      label: "Miners",
      key: "miners",
      src: colKey === EMColKey.MINERS ? Rocket : RocketIcon,
    },
    {
      label: "Asteroids",
      key: "asteroids",
      src: colKey === EMColKey.ASTEROIDS ? Asteroid : AsteroidIcon,
    },
    {
      label: "Planet",
      key: "planets",
      src: colKey === EMColKey.PLANETS ? Planet : PlanetIcon,
    },
  ];
  return customTabs;
};

import RocketIcon from '../assets/icons/rocket.svg';
import AsteroidIcon from '../assets/icons/asteroid.svg';
import PlanetIcon from '../assets/icons/planet.svg';

export const columns: any = {
  miners: [
    "Name",
    "Planet",
    "carryCapacity",
    "travelSpeed",
    "miningSpeed",
    "Position",
    "Status",
  ],
  asteroids: ["Name", "Minerals", "currentMiner", "Position"],
  planets: ["Name", "Miners", "Minerals", "Action"],
};

export const customTabs = [
  { label: "Miners", key: "miners", src: RocketIcon },
  { label: "Asteroids", key: "asteroids", src: AsteroidIcon },
  { label: "Planet", key: "planets", src: PlanetIcon },
];

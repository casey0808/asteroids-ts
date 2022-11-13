export interface IPlanetData {
  _id: string;
  name: string;
  miners: number;
  minerals: number;
  position: {
    x: number;
    y: number;
  };
  __v: number;
}

export interface IMinerData {
  _id?: string;
  name: string;
  planet: any;
  x: number | undefined;
  y: number | undefined;
  angle: number;
  carryCapacity: number;
  travelSpeed: number;
  miningSpeed: number;
  status: number;
  minerals: number | undefined;
  __v?: number;
  target?: string;
  targetType?: string;
}

export interface IAsteroidData {
  position: {
    x: number;
    y: number;
  };
  _id: string;
  name: string;
  minerals: number;
  status: number;
  currentMiner: null | string;
  __v: number;
}

export interface IFormData {
  name: string;
  planet: string;
  carryCapacity: number;
  travelSpeed: number;
  miningSpeed: number;
}

export interface IColumnData {
    miners: IMinerData[];
    planets: IPlanetData[];
    asteroids: IAsteroidData[];
    currentTick: number;
}

export enum EMMinerStatus {
  IDLE = 0,
  TRAVELING = 1,
  MINING = 2,
  TRANSFERING = 3
}

export const MinerStatus = [
  {value: EMMinerStatus.IDLE, name: 'Idle'},
  {value: EMMinerStatus.MINING, name: 'Mining'},
  {value: EMMinerStatus.TRANSFERING, name: 'Transfering'},
  {value: EMMinerStatus.TRAVELING, name: 'Traveling'}
]

export enum EMColKey {
  MINERS = 'miners',
  PLANETS = 'planets',
  ASTEROIDS = 'asteroids'
}

// export const IRecord {
//   record: IPlanetData[] | IMinerData | 
// }
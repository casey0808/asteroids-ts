import { IMinerData, IPlanetData } from "./constants/typing";

export const getPlanetName = (id: string, planetList: IPlanetData[]) => {
    const obj = planetList?.find(planet => planet._id === id);
    return obj?.name
}

export const getCurrentMiner = (id: string, minerList: IMinerData[]) => {
    const obj = minerList?.find(miner => miner._id === id);
    return obj?.name
}
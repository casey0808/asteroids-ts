export interface IPlanetData {
    name: string
    miners: number
    minerals: string
    key?: number
}

export interface IFormData {
    name: string
    planet: string
    carryCapacity: number
    travelSpeed: number
    miningSpeed: number
}
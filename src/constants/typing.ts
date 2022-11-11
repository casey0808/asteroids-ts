export interface IPlanetData {
    _id: number
    name: string
    miners: number
    minerals: string
}

export interface IFormData {
    name: string
    planet: string
    carryCapacity: number
    travelSpeed: number
    miningSpeed: number
}
import { IFormData, IMinerData } from "../constants/typing";

export const baseUrl = "https://asteroids.dev.mediasia.cn";

export const getMinerList = async () => {
  const res = await (
    await fetch(`${baseUrl}/miners`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
  ).json();
  console.log("res", res);
  return res;
};

export const getPlanetList = async () => {
  const res = await (
    await fetch(`${baseUrl}/planets`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
  ).json();
  console.log("res", res);
  return res;
};

export const getAsteroidList = async () => {
  const res = await (
    await fetch(`${baseUrl}/asteroids`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
  ).json();
  console.log("res", res);
  return res;
};

export const addMiners = async (params: IMinerData) => {
  try {
    const res = await (
      await fetch(`${baseUrl}/miners`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...params }),
      })
    ).json();
    console.log("res", res);
    return res
  } catch (e) {
    console.log(e)
  }
};

export const getMinerByPlanet = async (id: string) => {
  const res = await (
    await fetch(`${baseUrl}/miners?planetId=${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
  ).json();
  console.log("res", res);
  return res;
};
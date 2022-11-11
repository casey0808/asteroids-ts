export const baseUrl = 'https://asteroids.dev.mediasia.cn';

export const getMiners = async () => {
  const res = await (
    await fetch(`${baseUrl}/miners`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
  ).json();
  console.log('res', res);
  return res;
};

export const getPlanets = async () => {
  const res = await (
    await fetch(`${baseUrl}/planets`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
  ).json();
  console.log('res', res);
  return res;
};

# Asteroid Mining Simulation
This is an asteroid mining simulation, using react, ts and scss for the frontend, connecting to an express, node, websocket backend server (the backend server is provided by Slingshot at [asteroids-backend](https://git.mediasia-group.com/mediasia-interactive/asteroids-backend)).

## Structure
Main functional components are located in the `/components` folder, while scss code in `/styles` folder.

### Content.tsx
Contains code that builds the main page.

It is divided into two grids.
On the left, it's tabs and table, while the simulation displays on the right grid.

### Table.tsx
Data is passed from `Content` based on which tab it is currently on.

### ModalSection.tsx
Contains modal code with form. Will show up after clicking the `Create a miner` button on the `planet` tab.

### ListModal.tsx
Will appear after clicking the data in `Miners` column with list of miners based on planet id.

### Chart.tsx
Display planets, asteroids and miners on the canvas based on their current positions.
Built with `echarts-for-react`.

### Libraries
- [ahooks](https://ahooks.js.org/)
- [antd](https://ant.design/)
- [echarts-for-react](https://www.npmjs.com/package/echarts-for-react)
- [socket.io](https://www.npmjs.com/package/socket.io)
- [gh-pages](https://www.npmjs.com/package/gh-pages)

## Deliverables

**Check it out [here](https://cancui.work/asteroids-ts/)** (host on github pages)

- :white_check_mark: `Websocket`: 
	- :white_check_mark: All planet, miners and asteroids status and information displayed on the frontend should be updated live via a websocket connection to the backend 
    - :white_check_mark: Each time a miner, planet, asteroid is created or modified on the backend, it should be updated live on the frontend 
- `REST API`:
	- :white_check_mark: GET `/miners` or `/planets` or `/asteroids` : return the list of respective items
	- :white_check_mark: GET `/miners?planetId=[planet ID]`: return the list of miners from a given planet ID
	- GET `/miners/[miner ID]`: return a miner based on its ID
	- :white_check_mark: POST `/miners`: create a miner
	- PUT `/miners/[miner ID]`: update a miner based on its ID
	- DELETE `/miners/[miner ID]`: delete a miner based on its ID
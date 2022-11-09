import MinerIcon from './assets/icons/miner.svg';
import './styles/global.scss';
import Content from './components/Content';

function App() {
  // fetch("http://localhost:3001/miners", { method: "GET" })
  //   .then((res) => res.json())
  //   .then((r) => console.log(r));

  return (
    <div className='main'>
      <div className='header'>
        <img src={MinerIcon} />
        <p>BACKEND MINER</p>
      </div>
      <Content />
    </div>
  );
}

export default App;
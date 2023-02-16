import MinerIcon from './assets/icons/miner.svg';
import './styles/global.scss';
import Content from './components/Content';

function App() {

  return (
    <div className='main'>
      <div className='header'>
        <img src={MinerIcon} alt="icon" />
        <p>BACKEND MINER</p>
      </div>
      <Content />
    </div>
  );
}

export default App;
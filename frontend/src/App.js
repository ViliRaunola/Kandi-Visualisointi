import './App.css';
import Home from './components/Home';
import Wifi from './components/Wifi';
import Bluetooth from './components/Bluetooth';
import Overall from './components/Overall';
import ResponsiveAppBar from './components/NavBar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<> <ResponsiveAppBar/> <Home/></>}></Route>
          <Route path='/wifi' element={<> <ResponsiveAppBar/> <Wifi/></>}></Route>
          <Route path='/bluetooth' element={<> <ResponsiveAppBar/> <Bluetooth/></>}></Route>
          <Route path='/overall' element={<> <ResponsiveAppBar/> <Overall/></>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

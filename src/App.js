
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home';
import DashboardPage from './pages/Dashboard';
import CoinPage from './pages/Coin';
import LoginSignUpMenu from './components/LoginSignUpMenu';
import WatchListPage from './pages/WatchListPage';
import EmailaKnowledgement from './components/EmailAknowledgement';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path='/login' element={<LoginSignUpMenu />} />
          <Route path='/watchlist' element={<WatchListPage />} />
          {/* for dynamic routing */}
          <Route path="/coin/:id" element={<CoinPage />} />
          <Route path="/emailaknowledgement" element={<EmailaKnowledgement />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

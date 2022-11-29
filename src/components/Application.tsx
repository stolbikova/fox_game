import React, { useState } from 'react';
import './Application.scss';
import {
  Route,
  Routes,
  Navigate,
  Link,
  useNavigate
} from "react-router-dom";
import GameScreen from './screens/GameScreen/GameScreen';
import WelcomeScreen from './screens/WelcomeScreen/WelcomeScreen';
import FinalScreen from './screens/FinalScreen/FinalScreen';
import Header from './Header';
import { ScoreboardItem } from '../types';

const Application: React.FC = () => {
  const [scoreboard, setScoreboard] = useState(new Map<string, ScoreboardItem>());
  const navigate = useNavigate();

  const handlePlay = (data: ScoreboardItem) => {
    if (!!data.name) setScoreboard(scoreboard.set(data.name, data));
    navigate(`game?player=${data.name}`);
  }

  const handleExpire = (name: string, score: number) => {
    navigate("scoreboard");
    if (!!name)
    setScoreboard(scoreboard.set(name, {
      ...scoreboard.get(name),
      score: score
    }));
  }

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/scoreboard">Scoreboard</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/game" element={(
          <div>
            <Header />
            <GameScreen onExpire={handleExpire} />
          </div>
        )}
        />

        <Route path="" element={(
          <div>
            <Header />
            <WelcomeScreen onPlay={handlePlay} />
          </div>
        )}
        />

        <Route path="/scoreboard" element={(
          <div>
            <Header />
            <FinalScreen onPlay={(name) => { navigate(`game?player=${name}`) }} onToWelcomeScreen={() => { navigate("") }} scoreboard={scoreboard} />
          </div>
        )}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default Application;

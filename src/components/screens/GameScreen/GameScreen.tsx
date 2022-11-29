import React, { useState } from 'react';
import './GameScreen.scss';
import ImageList from './components/ImageList';
import { PlAY_TIME_MS } from '../../../constants';
import { Counter } from './components/Counter';
import { LoadingButton } from '@mui/lab';

interface GameProps {
  onExpire: (name: string, score: number) => void;
}

const GameScreen: React.FC<GameProps> = ({ onExpire }) => {
  const [score, setScore] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(Date.now() + PlAY_TIME_MS);
  const [blockGame, setBlockGame] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const handleExpire = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const name = urlParams.get('player');
    setBlockGame(true);
    onExpire(name, score);
  }

  const handleFirstImagesLoad = () => {
    setCountdown(Date.now() + PlAY_TIME_MS);
    setLoading(false);
  }

  return (
    <div>
      <div className={`main-teaser ${loading ? 'hidden' : ''}`}>
        Score: {score},&nbsp;<Counter countdown={countdown} onExpire={handleExpire} />
      </div>
      <ImageList
        decrementScore={() => { setScore(prev => prev - 1) }}
        incrementScore={() => { setScore(prev => prev + 1) }}
        block={blockGame}
        onFirstLoad={handleFirstImagesLoad}
        loading={loading}
      />
      <LoadingButton loading={loading} loadingPosition='center' size='large' style={{ width: "100%" }}></LoadingButton>
    </div>
  );
};

export default GameScreen;

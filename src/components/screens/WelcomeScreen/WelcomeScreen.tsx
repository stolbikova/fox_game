import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import "./WelcomeScreen.scss";
import { ScoreboardItem } from '@src/types';

interface WelcomeProps {
  onPlay: (data: ScoreboardItem) => void;
}
const WelcomeScreen: React.FC<WelcomeProps> = ({ onPlay }) => {
  const [name, setName] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(true);
  const handleNameInput = (e: React.FormEvent) => {
    const value: string = (e.target as HTMLTextAreaElement).value;
    setName(value);
  }
  const handleBlur = () => {
    setEditMode(false);
  }
  const handleNameClick = () => {
    setEditMode(true);
  }

  useEffect(() => {
    if (name === '') {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [name]);

  const handlePlay = () => {
    onPlay({
      name,
      date: new Date().getFullYear().toString() + ' ' + new Date().toLocaleString('default', { month: 'short', day: '2-digit' }),
      score: 0
    });
  }

  return (
    <div >
      <div className='container'>
        {editMode ?
          <TextField id="outlined-basic" label="Name" variant="outlined" onBlur={handleBlur} onInput={handleNameInput} value={name} /> :
          <span onClick={handleNameClick}>Hello {name}!</span>}
      </div>

      <div className='container button-container'>
        <Button disabled={disabled} variant="contained" onClick={handlePlay}>PLAY</Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;

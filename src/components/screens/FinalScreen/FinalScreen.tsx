import React, { useState } from 'react';
import { Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Checkbox, Tooltip } from '@mui/material';
import './FinalScreen.scss';
import { ScoreboardItem } from '@src/types';

interface FinalScreenProps {
    onPlay: (name: string) => void;
    onToWelcomeScreen: () => void;
    scoreboard: Map<string, ScoreboardItem>;
}

const FinalScreen: React.FC<FinalScreenProps> = ({ onPlay, onToWelcomeScreen, scoreboard }) => {
    const [selectedName, setSelectedName] = useState<string>('');
    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.ariaLabel) setSelectedName(e.target.ariaLabel);
    }
    const handlePlayClick = () => {
        if (selectedName) onPlay(selectedName);
    }
    return (
        <div>
            <div>
                <span>Scoreboard</span>
                {scoreboard.size !== 0 ?
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>Rank</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Score</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>{Array.from(scoreboard.values()).sort((a, b) => a.score > b.score ? -1 : 1).map((row, index) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={selectedName === row.name}
                                            onChange={handleSelect}
                                            inputProps={{
                                                'aria-label': row.name,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.score}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer> :
                    <span>: Empty</span>}
                <div className='button-container'>
                    <Button variant="contained" onClick={onToWelcomeScreen}>To Welcome Screen</Button>
                    {selectedName === '' ? <Tooltip title="Choose a player!" placement="top">
                        <Button variant="contained" onClick={handlePlayClick}>PLAY!</Button>
                    </Tooltip> : <Button variant="contained" onClick={handlePlayClick}>PLAY!</Button>}
                </div>
            </div>
        </div>
    );
};

export default FinalScreen;

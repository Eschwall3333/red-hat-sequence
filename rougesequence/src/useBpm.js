import React, { useState } from 'react';
import style from 'styled-components';

const BPM = style.input`
    color: #25ccf7;
    border: 2px solid #25ccf7;
    font-soze: 20px;
    background: none;
    padding: 15px;
    font-family: 'Righteous' , cursive;
    border-radius: 2;
    margin: 2px 4px;
    margin-right: 20px;
    align-self: cwnter;
`;


export default function useStart(initialBpm) {
    const [bpm, set] = useState(initialBpm);
    const setBpm = e => set(e.target.value);

    return [
        bpm,
        <BPM type="number" value={bpm} min="20" max="200" onChange={setBpm} />,
    ];
}
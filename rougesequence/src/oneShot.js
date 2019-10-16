import React, { useState } from 'react';
import style from 'styled-components';
import { bufferResource } from './bufferResource';

const Button = style.button`
    background: ${props => (props.held ? '#fd7272' : 'none')};
    flex: 1;
    border: 2px solid #fd7272;
    color: ${props => (props.held ? 'black' : '#fd7272')};
    display: inline-block;
    font-size: 22px;
    border-radius: 2;
    padding: 15px;
    font-family: 'Righteous', cursive;
    margin: 2px;
    &:active {
        background: #fd7272;
        color: black;
    }
`;

export default function OneShot({ sound, title}) {
    let [held, setHeld] = useState(false);
    let buffer = bufferResource.read(sound);
    buffer.volume.value = -7;

    function playSound(e) {
        if (held) {
            setHeld(false);
            buffer.stop();
        } else {
            if (e.shiftKey) {
                buffer.loop = true;
                setHeld(true);
            }
            buffer.start();
        }
    }
    function stopSound() {
        if (!held) {
            buffer.stop();
        }
    }
    return (
        <Button
            held={held}
            onMouseDown={playSound}
            onTouchStart={playSound}
            onTouchEnd={stopSound}
            onMouseUp={stopSound}
            >
            {title}
            </Button>
    );
}
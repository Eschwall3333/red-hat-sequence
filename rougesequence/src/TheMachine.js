import React, { useState, useEffect, useRef } from 'react';
import style from 'styled-components';
import Tone from 'tone';
import useBpm from './useBpm';
import useStart from './useStart';
import StepContext from './StepContext';
import Transport from './Transport';
import StepSequencer from './StepSequencer';
import Fx from './FX';

const Container = styled.div`
    max-width: 900px;
    margin: auto;
    background: linear-gradient(to bottom right, #222, #0a0a0a);
    border: 2px solid red;
    border-radius: 4px;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    `;

const ButtonCont = styled.div`
    flex: 1;
    flex-direction; row;
    align-items; stretch;
    width: 102%;
    padding: 0px 15px 10px;
    display: flex;
`;
//import sounds folder here
const config = {
    tracks: ['Sub1', 'Sub2', 'Kick', 'Snare', 'Clap', 'HiHat', 'OpenHat'], 
    samples: {
        Sub1: 'sounds/sub1.wav',
        Sub2: 'sounds/sub2.wav',
        Kick: 'sounds/kick.wav',
        Snare: 'sounds/snare.wav',
        Clap: 'sounds/clap.wav',
        HiHat: 'sounds/HiHat.wav',
        OpenHat: 'sounds/openHat.wav',

    },
};

const initStepState = {
    Sub1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    Sub2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    Kick: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    Snare: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    Clap: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    HiHat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    OpenHat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

export default function TheMachine() {
    const [stepState, setSteps] = useState(initStepState);
    const [buffers, setBuffers] = useState({});
    const [currentStep, setCurrentStepState] = useState(0);
    const [start, startButton] = useStart();
    const [bpm, bpmSelector] = useBpm(125);
    const buffersRef = useRef(buffers);
    buffersRef.current = buffers;
    const stepsRef = useRef(stepState);
    stepsRef.current = stepState;
    const currentStepRef = useRef(currentStep);
    currentStepRef.current = currentStep;

    useEffect(
        () => {
            Tone.Transport.scheduleRepeat(function(time){
                Object.keys(buffersRef.current).forEach(b => {
                    let targetStep = stepsRef.current[b] [currentStepRef.current];
                    let targetBuffer = buffersRef.current[b];


                    if (targetStep === 1) {
                        targetBuffer.start(time);
                    } else if (targetStep === 2) {
                        targetBuffer.start();
                        targetBuffer.start('+64n');
                        targetBuffer.start('+32n');
                    }
                });
                setCurrentStepState(step => {
                    return step > 14 ? 0 : step +1;
                });
            }, '16n');
        },
        [config]
    );

    useEffect
}
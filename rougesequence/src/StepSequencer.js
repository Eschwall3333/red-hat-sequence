import React from 'react';
import style from 'styled-components';
import { bufferResource } from './bufferResource';
import Track from './Track';

const Wrapper = style.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    border: 1px solid #555;
    margin: 0px 20px 20px;
    position: relative;
`;

const IndicatorWrapper = style.div`
    posistion: absolute;
    width: 600px;
    top: 0px;
    right: 0px;
    height: 100%;
    padding: 4px 2px;
    pointer-events: none;
`;

const StepIndicator = style.div`
    posistion: absolute;
    top: 0px;
    left: ${props => props.step * 37.5}px;
    width: 38px;
    height: 100%;
    background: #00ff0020;
`;

export default function StepSequncer({
    config,
    playing,
    currentStep,
    setBuffers,
}) {
    return (
        <Wrapper>
            <IndicatorWrapper>
                {playing && <StepIndicator step={currentStep} />}
            </IndicatorWrapper>
            {config.tracks.map(t => (
                <Track
                name={t}
                key={t}
                buffer={bufferResource.read(config.sample[t])}
                setBuffers={setBuffers}
                />
            ))}
        </Wrapper>
    );
}
import React, { useEffect } from 'react';
import style from 'styled-components';
import Stepss from './Stepss';

const Wrapper = style.div`
    display: flex;
    flex: 1;
`;

const Info = style.div`
    flex: 0 0 150px;
    background: lineear-gradient(#292929, #111);
    border: 1px solid #555;
`;

const Name = style.div`
    color: white;
    font-size: 14px;
    margin-left: 20px;
    line-height: 100%;
    margin: 0;
    vertical-align: middle;
    padding: 0px 8px;
    line-height: 50px;
`;

export default function Track({ buffer, name, setBuffers}) {
    useEffect(
        () => {
            setBuffers(buffers => ({
                ...buffers,
                [name]: buffer,
            }));
        },
        [buffer]
    );

    return (
        <Wrapper>
            <Info>
                <Name>{name}</Name>
            </Info>
            <Stepss name={name} />
        </Wrapper>
    );
}
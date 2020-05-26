import React from 'react';
import { ContentContainer } from './styled';
import { Pin } from '../../../../types/Pin';
import { Coordinates } from '../../../../types/Coordinates';
import { List } from './components/List';

interface SidePinsContainerProps {
    pins: Pin[];
    onClickItemHandle: (coords: Coordinates) => void;
}

export function SidePinsContainer(props: SidePinsContainerProps) {
    return (
        <ContentContainer>
            <h1>Pins</h1>
            <List
                onClickItemHandle={props.onClickItemHandle}
                pins={props.pins}
            />
        </ContentContainer>
    );
}

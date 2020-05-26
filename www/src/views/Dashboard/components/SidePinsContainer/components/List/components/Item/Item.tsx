import React from 'react';
import { ContentContainer, Coordinates, Title } from './styled';
import { Pin } from '../../../../../../../../types/Pin';
import { Coordinates as ICoordinates } from '../../../../../../../../types/Coordinates';

interface ItemProps {
    pin: Pin;
    onClickHandle: (coords: ICoordinates) => void;
}

export function Item(props: ItemProps) {
    const lastCoordinates = props.pin.coords[props.pin.coords.length - 1];

    function onClick() {
        props.onClickHandle(lastCoordinates);
    }

    return (
        <ContentContainer onClick={onClick}>
            <Title>{props.pin.title}</Title>
            <Coordinates>
                {lastCoordinates.lat}, {lastCoordinates.lng}
            </Coordinates>
        </ContentContainer>
    );
}

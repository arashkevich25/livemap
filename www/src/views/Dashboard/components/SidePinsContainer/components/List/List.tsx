import React from 'react';
import { Pin } from '../../../../../../types/Pin';
import { ContentContainer } from './styled';
import { Item } from './components/Item';
import { Coordinates } from '../../../../../../types/Coordinates';

interface ListProps {
    pins: Pin[];
    onClickItemHandle: (coords: Coordinates) => void;
}

export function List(props: ListProps) {
    return (
        <ContentContainer>
            {props.pins.map((pin) => (
                <Item
                    onClickHandle={props.onClickItemHandle}
                    pin={pin}
                    key={pin.id}
                />
            ))}
        </ContentContainer>
    );
}

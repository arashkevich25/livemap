import React, { useState } from 'react';
import { ContentContainer, MapContainer } from './styled';
import { SidePinsContainer, Maps } from './components';
import { useFetchPins } from './hooks';
import { Coordinates } from '../../types/Coordinates';
import { Loader } from '../../components';

export function Dashboard() {
    const { pins, pinsFetching, pinsHasFetched, error } = useFetchPins();
    const [center, setCenter] = useState<Coordinates | null>(null);

    if (error) {
        return <span>{error}</span>;
    }

    if (pinsFetching || !pinsHasFetched) {
        return <Loader />;
    }

    if (!center) {
        setCenter(pins[0].coords[0]);
        return <Loader />;
    }

    return (
        <ContentContainer>
            <Maps
                containerElement={<MapContainer />}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<MapContainer />}
                mapElement={<MapContainer />}
                center={center}
                pins={pins}
            />
            <SidePinsContainer onClickItemHandle={setCenter} pins={pins} />
        </ContentContainer>
    );
}

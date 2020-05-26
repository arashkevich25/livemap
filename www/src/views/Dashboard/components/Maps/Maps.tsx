import React from 'react';
import {
    GoogleMap,
    Marker,
    withScriptjs,
    withGoogleMap,
    Polyline,
} from 'react-google-maps';
import { Coordinates } from '../../../../types/Coordinates';
import { Pin } from '../../../../types/Pin';

interface MapsProps {
    center: Coordinates;
    pins: Pin[];
}

function ComponentMaps(props: MapsProps) {
    return (
        <GoogleMap defaultZoom={14} center={props.center}>
            {props.pins.map((pin) => (
                <React.Fragment key={pin.id}>
                    <Polyline
                        path={pin.coords}
                        options={{
                            strokeColor: '#ff2527',
                            strokeOpacity: 0.75,
                            strokeWeight: 2,
                        }}
                    />
                    <Marker
                        label={pin.title}
                        position={pin.coords[pin.coords.length - 1]}
                    />
                </React.Fragment>
            ))}
        </GoogleMap>
    );
}

export const Maps = withScriptjs(withGoogleMap(ComponentMaps));

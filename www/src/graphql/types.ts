import { gql } from 'apollo-boost';

gql`
    type coords {
        lat: Int
        lng: Int
    }

    type pin {
        id: Int
        title: String
        coords: coords
    }

    type Query {
        pins: [pin]
    }

    type Subscription {
        pinsMoved: [pin]
    }
`;

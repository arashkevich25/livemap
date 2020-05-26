import { gql } from 'apollo-boost';

export const MOVE_PINS = gql`
    subscription {
        pinsMoved {
            id
            title
            coords {
                lat
                lng
            }
        }
    }
`;

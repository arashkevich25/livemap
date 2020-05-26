import { gql } from 'apollo-boost';

export const GET_PINS = gql`
    query {
        pins {
            id
            title
            coords {
                lat
                lng
            }
        }
    }
`;

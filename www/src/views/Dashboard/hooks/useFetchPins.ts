import { Pin } from '../../../types/Pin';
import { useEffect, useReducer } from 'react';
import { client } from '../../..';
import { GET_PINS } from '../../../schemes';
import { Coordinates } from '../../../types/Coordinates';
import { MOVE_PINS } from '../../../schemes/movePins';

interface UseFetchPinsState {
    pinsFetching: boolean;
    pinsHasFetched: boolean;
    pins: Pin[];
    error: string | null;
}

const initState: UseFetchPinsState = {
    pins: [],
    pinsFetching: false,
    pinsHasFetched: false,
    error: null,
};

enum ActionTypes {
    FetchPins = '[Pins] fetch pins',
    FetchPinsSuccess = '[Pins] fetch pins success',
    FetchPinsFailed = '[Pins] fetch pins failed',
    UpdatePins = '[Pins] update pins',
}

interface FetchPins {
    type: typeof ActionTypes.FetchPins;
}

interface FetchPinsSuccess {
    type: typeof ActionTypes.FetchPinsSuccess;
    pins: Pin[];
}

interface FetchPinsFailed {
    type: typeof ActionTypes.FetchPinsFailed;
    error: string;
}

interface UpdatePins {
    type: typeof ActionTypes.UpdatePins;
    pins: Pin<Coordinates>[];
}

type FetchPinsUnion =
    | FetchPins
    | FetchPinsSuccess
    | UpdatePins
    | FetchPinsFailed;

function pinsReducer(
    state: UseFetchPinsState = initState,
    action: FetchPinsUnion
): UseFetchPinsState {
    switch (action.type) {
        case ActionTypes.FetchPins: {
            return {
                ...state,
                pinsFetching: true,
            };
        }

        case ActionTypes.FetchPinsSuccess: {
            return {
                ...state,
                pins: action.pins,
                pinsHasFetched: true,
                pinsFetching: false,
            };
        }

        case ActionTypes.FetchPinsFailed: {
            return {
                ...state,
                pinsFetching: false,
                pinsHasFetched: false,
                pins: [],
                error: action.error,
            };
        }

        case ActionTypes.UpdatePins: {
            const pins: Pin[] = state.pins.map((pin) => {
                if (action.pins.map(({ id }) => id).includes(pin.id)) {
                    const updatedPinData = action.pins.find(
                        ({ id }) => id === pin.id
                    )!;
                    return {
                        ...pin,
                        title: updatedPinData.title,
                        coords: [...pin.coords, updatedPinData.coords],
                    };
                }

                return pin;
            });

            return {
                ...state,
                pins,
            };
        }

        default:
            return state;
    }
}

export function useFetchPins(): UseFetchPinsState {
    const [state, dispatch] = useReducer(pinsReducer, initState);

    function listenMovingPins() {
        client
            .subscribe({ query: MOVE_PINS })
            .subscribe(({ data: { pinsMoved } }) => {
                dispatch({
                    type: ActionTypes.UpdatePins,
                    pins: pinsMoved,
                });
            });
    }

    useEffect(() => {
        function fetchData() {
            dispatch({
                type: ActionTypes.FetchPins,
            });

            client
                .query<{ pins: Pin<Coordinates>[] }>({
                    query: GET_PINS,
                    fetchPolicy: 'no-cache',
                })
                .then(({ data }) => {
                    dispatch({
                        type: ActionTypes.FetchPinsSuccess,
                        pins: data.pins.map((pin) => ({
                            ...pin,
                            coords: [pin.coords],
                        })),
                    });
                    listenMovingPins();
                })
                .catch((error) =>
                    dispatch({
                        type: ActionTypes.FetchPinsFailed,
                        error: JSON.stringify(error),
                    })
                );
        }

        fetchData();
    }, []);

    return state;
}

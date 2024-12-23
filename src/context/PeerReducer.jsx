import { ADD_PEER, REMOVE_PEER } from "./PeerActions";

export const peerReducer = (state, action) => {
    switch (action.type) {
        case ADD_PEER:
            return {
                ...state,
                [action.payload.ID]: {
                    stream: action.payload.stream,
                },
            };
        case REMOVE_PEER:
            const { [action.payload.ID]: deleted, ...rest } = state;
            return rest;    
        default:
            return { ...state };
    }
};

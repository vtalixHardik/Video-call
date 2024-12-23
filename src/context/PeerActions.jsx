export const ADD_PEER = "ADD_PEER";
export const REMOVE_PEER = "REMOVE_PEER";

export const addPeerAction = (ID, stream) => ({
    type: ADD_PEER,
    payload: { ID, stream}
});

export const removePeerAction = (ID) => ({
    type: REMOVE_PEER,
    payload: { ID }
});

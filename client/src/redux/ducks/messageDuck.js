import { addInfo } from "../../shared/service";


const ADD_MESSAGE_REQUEST = 'ADD_MESSAGE_REQUEST';
const ADD_MESSAGE_SUCCESS = 'ADD_MESSAGE_SUCCESS';
const ADD_MESSAGE_FAILURE = 'ADD_MESSAGE_FAILURE';


const addMessageRequest = () => {
    return {
        type: ADD_MESSAGE_REQUEST,
    };
};

const addMessageSuccess = (message) => {
    return {
        type: ADD_MESSAGE_SUCCESS,
        payload: message,
    };
};

const addMessageFailure = (error) => {
    return {
        type: ADD_MESSAGE_FAILURE,
        payload: error,
    };
};

export const addMessage = (message) => {
    return async function fetchMyApi(dispatch) {
        dispatch(addMessageRequest());
        try {
            const newMessage = await addInfo("messages", message)
            dispatch(addMessageSuccess(newMessage))
        } catch (error) {
            dispatch(addMessageFailure(error.message))
        }
    };
};


// INITIAL STATE
const initialState = {
    loading: false,
    message: '',
    error: '',
};


// REDUCER

export const messageReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_MESSAGE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADD_MESSAGE_SUCCESS:
            return {
                loading: false,
                message: payload,
                error: '',
            };
        case ADD_MESSAGE_FAILURE:
            return {
                loading: false,
                message: '',
                error: payload,
            };

        default:
            return state;
    }
}
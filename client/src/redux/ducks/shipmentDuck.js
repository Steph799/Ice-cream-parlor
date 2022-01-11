import { addInfo, removeInfo } from "../../shared/service";


const ADD_ORDER_REQUEST = 'ADD_ORDER_REQUEST';
const ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS';
const ADD_ORDER_FAILURE = 'ADD_ORDER_FAILURE';

const CLEAN_ORDER ="CLEAN_ORDER"

const REMOVE_ORDER_REQUEST = 'REMOVE_ORDER_REQUEST';
const REMOVE_ORDER_SUCCESS = 'REMOVE_ORDER_SUCCESS';
const REMOVE_ORDER_FAILURE = 'REMOVE_ORDER_FAILURE';


const addOrderRequest = () => {
    return {
        type: ADD_ORDER_REQUEST,
    };
}; 

const addOrderSuccess = (order) => {
    return {
        type: ADD_ORDER_SUCCESS,
        payload: order,
    };
};

const addOrderFailure = (error) => {
    return {
        type: ADD_ORDER_FAILURE,
        payload: error,
    };
};

const cleanOrder=()=>{ //after confirm the order
    return {
        type: CLEAN_ORDER
    }
}

const removeOrderRequest = () => {
    return {
        type: REMOVE_ORDER_REQUEST,
    };
};

const removeOrderSuccess = () => {
    return {
        type: REMOVE_ORDER_SUCCESS,
       // payload: id,
    };
};

const removeOrderFailure = (error) => {
    return {
        type: REMOVE_ORDER_FAILURE,
        payload: error,
    };
};

export const addOrder = (order) => {
    return async function fetchMyApi(dispatch) {
        dispatch(addOrderRequest());
        try {
            const newOrder = await addInfo("shipments", order)
            dispatch(addOrderSuccess(newOrder))
        } catch (error) {
            dispatch(addOrderFailure(error.massage))
        }
    };
};


export const CleanOrder = () => { //clean payload that have the token...
    return function clean(dispatch) {
        dispatch(cleanOrder());
    }  
};

export const deleteOrder = (id) => {
    return async function fetchMyApi(dispatch) {
        dispatch(removeOrderRequest());
        try {
            await removeInfo("shipments", id)
            dispatch(removeOrderSuccess())
        } catch (error) {
            dispatch(removeOrderFailure(error.massage))
        }
    };
};


// INITIAL STATE
const initialState = {
    loading: false,
    order: '',
    error: '',
};

// REDUCER
export const shipmentReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADD_ORDER_SUCCESS:
            return {
                loading: false,
                order:  payload,
                error: '',
            };
        case ADD_ORDER_FAILURE:
            return {
                loading: false,
                order: '',
                error: payload,
            };

        case REMOVE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case REMOVE_ORDER_SUCCESS:
            return {
                loading: false,
                order: '',
                error: '',
            };
        case REMOVE_ORDER_FAILURE:
            return {
                loading: false,
                order: state.order,
                error: payload,
            };
        case CLEAN_ORDER:
            return { ...initialState}

        default:
            return state;
    }
};

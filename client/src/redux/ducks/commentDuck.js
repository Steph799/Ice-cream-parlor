import { getInfo, addInfo } from "../../shared/service";

// TYPE
const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST';
const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';

const FETCH_LAST_COMMENT_REQUEST = 'FETCH_LAST_COMMENT_REQUEST'; //show the last message in the main page
const FETCH_LAST_COMMENT_SUCCESS = 'FETCH_LAST_COMMENT_SUCCESS';
const FETCH_LAST_COMMENT_FAILURE = 'FETCH_LAST_COMMENT_FAILURE';

const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';


// ACTION CREATORS
const fetchCommentsRequest = () => {
    return {
        type: FETCH_COMMENTS_REQUEST,
    };
};

const fetchCommentsSuccess = (comments) => {
    return {
        type: FETCH_COMMENTS_SUCCESS,
        payload: comments,
    };
};

const fetchCommentsFailure = (error) => {
    return {
        type: FETCH_COMMENTS_FAILURE,
        payload: error,
    };
};

const fetchLastCommentRequest = () => {
    return {
        type: FETCH_LAST_COMMENT_REQUEST,
    };
};

const fetchLastCommentSuccess = (comment) => {
    return {
        type: FETCH_LAST_COMMENT_SUCCESS,
        payload: comment,
    };
};

const fetchLastCommentFailure = (error) => {
    return {
        type: FETCH_LAST_COMMENT_FAILURE,
        payload: error,
    };
};


const addCommentRequest = () => {
    return {
        type: ADD_COMMENT_REQUEST,
    };
};

const addCommentSuccess = (comment) => {
    return {
        type: ADD_COMMENT_SUCCESS,
        payload: comment,
    };
};

const addCommentFailure = (error) => {
    return {
        type: ADD_COMMENT_FAILURE,
        payload: error,
    };
};


export const fetchComments = () => {
    return async function fetchMyApi(dispatch) {
        dispatch(fetchCommentsRequest());
        try {
            const comments = await getInfo("comments")
            dispatch(fetchCommentsSuccess(comments))
        } catch (error) {
            dispatch(fetchCommentsFailure(error.message))
        }
    };
};


export const fetchLastComment = () => {
    return async function fetchMyApi(dispatch) {
        dispatch(fetchLastCommentRequest());
        try {
            const comment = await getInfo("comments/last") //return an array of one object with the last comment
            const [lastComment] = comment //get the object itself
            dispatch(fetchLastCommentSuccess(lastComment))
        } catch (error) {
            dispatch(fetchLastCommentFailure(error.message))
        }
    };
};

export const addComment = (comment) => {
    return async function fetchMyApi(dispatch) {
        dispatch(addCommentRequest());
        try {
            const newComment = await addInfo("comments", comment)
            dispatch(addCommentSuccess(newComment))
        } catch (error) {
            dispatch(addCommentFailure(error.message))
        }
    };
};


// INITIAL STATE
const initialState = {
    loading: false,
    comments: [],
    lastComment: '',
    error: '',
};


// REDUCER
export const commentReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_COMMENTS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_COMMENTS_SUCCESS:
            return {
                loading: false,
                comments: payload,
                lastComment: state.lastComment,
                error: '',
            };
        case FETCH_COMMENTS_FAILURE:
            return {
                loading: false,
                comments: [],
                lastComment: '',
                error: payload,
            };
        case FETCH_LAST_COMMENT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_LAST_COMMENT_SUCCESS:
            return {
                loading: false,
                comments: state.comments,
                lastComment: payload,
                error: '',
            };
        case FETCH_LAST_COMMENT_FAILURE:
            return {
                loading: false,
                comments: state.comments,
                lastComment: '',
                error: payload,
            };

        case ADD_COMMENT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADD_COMMENT_SUCCESS:
            return {
                loading: false,
                comments: [...state.comments, payload],
                lastComment: state.lastComment,
                error: '',
            };
        case ADD_COMMENT_FAILURE:
            return {
                loading: false,
                comments: state.comments,
                lastComment: state.lastComment,
                error: payload,
            };

        default:
            return state;
    }
};



 
     
     
import actionTypes from "../actions/actionTypes";

const initialState = {
    isAuth: false,
    username: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.SIGN_IN:
            return {
                ...state,
                isAuth: true,
                username: action.payload.username
            };
        case actionTypes.SIGN_OUT:
            return {
                ...state,
                isAuth: false,
                username: ''
            };
        default:
            return state;
    }
}
import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default function(state = initialState, action) {
    switch(action.type) {
        case actionTypes.GET_SHOPPING_LISTS:

            return action.response.data;

        default:
            return state;
    }
}

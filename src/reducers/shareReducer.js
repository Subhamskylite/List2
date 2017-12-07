import _ from 'lodash';
import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default function share(state = initialState, action) {
    switch(action.type) {
        case actionTypes.SHARE_LIST_REQUEST:
            return {
                ...state,
                loading: true
            };

        case actionTypes.SHARE_LIST_SUCCESS:
            return { ...state,
                loading: false
            };

        case actionTypes.SHARE_LIST_FAIL:
            return {
                ...state,
                loading: false
            };

        default:
            return state;
    }
}
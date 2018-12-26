import {SET_FILTER} from '../constants';

const initialState = 'all';

export default function filter(state = initialState, action) {
    switch (action.type) {
        case SET_FILTER: {
            return action.filter;
        }

        default: {
            return state;
        }
    }
}

import {List, fromJS} from 'immutable';
import {UNDO_ACTION, REDO_ACTION} from '../constants';

const initialState = fromJS({
    previousStates: [],
    currentState: [],
    nextStates: []
});

const actionsReducer = targetReducer => (state = initialState, action) => {
    switch (action.type) {
        case UNDO_ACTION: {
            if (!state.get('previousStates').size) {
                return state;
            }
            const lastState = state.get('currentState');
            const currentState = state.get('previousStates').last();

            return state.set('previousStates', state.get('previousStates').pop())
                .set('currentState', currentState)
                .set('nextStates', state.get('nextStates').unshift(lastState));
        }
        case REDO_ACTION: {
            if (!state.get('nextStates').size) {
                return state;
            }
            const lastState = state.get('currentState');
            const currentState = state.get('nextStates').first();
            return state.set('previousStates', state.get('previousStates').push(lastState))
                .set('currentState', currentState)
                .set('nextStates', state.get('nextStates').shift());
        }

        default: {
            const lastState = state.get('currentState');
            const currentState = targetReducer(lastState, action);

            return state.set('previousStates', state.get('previousStates').push(lastState))
                .set('currentState', currentState)
                .set('nextStates', List([]));
        }
    }
};

export default actionsReducer;

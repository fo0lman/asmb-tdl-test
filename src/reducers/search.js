import {fromJS} from 'immutable';
import {tagsParser} from '../utils/tags';
import {SET_SEARCH} from '../constants';

const initialState = fromJS({
    text: '',
    tags: []
});

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH: {
            const {text, tags} = tagsParser(action.search);
            return state
                .set('text', text)
                .set('tags', fromJS(tags));
        }

        default: {
            return state;
        }
    }
};

export default searchReducer;

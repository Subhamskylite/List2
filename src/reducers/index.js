import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './authReducer';
import shoppingLists from './shoppingListsReducer';
import listItems from './listItemsReducer';
import friends from './friendsReducer';
import users from './usersReducer';
import share from './shareReducer';

const rootReducer = combineReducers({
    form: formReducer,
    auth,
    shoppingLists,
    listItems,
    friends,
    users,
    share
});

export default rootReducer;

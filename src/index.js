import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {createHistory as history} from 'history';
import thunk from 'redux-thunk';

import Home from './containers/Home';
import NotFound from './containers/NotFound';
import rootReducer from './reducers/rootReducer';
import { USERS_INITIAL_UPDATE } from './reducers/users';
import { fetchUsers } from './api';


const middlewares = applyMiddleware(thunk, logger);
const store = createStore(rootReducer, {}, middlewares);

fetchUsers().then(users => store.dispatch({ type: USERS_INITIAL_UPDATE, payload: users }));

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route exact path='/' component={Home}/>
                {/*<Route exact path='/users/:id' component={UserPage}/>*/}
                <Route component={NotFound}/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);

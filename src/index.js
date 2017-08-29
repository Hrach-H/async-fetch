import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { fetchPostsRequest, fetchPostsSuccess, fetchPostsError} from './actionReducers';
import { allReducers } from "./reducers/index";


function fetchPostsWithRedux() {
    return (dispatch) => {
        dispatch(fetchPostsRequest());
        return fetch('https://59a11ee1c89deb0011c337d5.mockapi.io/products')
            .then( response => response.json() )
            .then( result => dispatch(fetchPostsSuccess(result)))
            .catch( dispatch(fetchPostsError()) );
    }
}

class App extends React.Component {
    componentDidMount(){
        this.props.fetchPostsWithRedux()
    }
    render(){
        return (
            <ul>
                {
                    this.props.posts &&
                    this.props.posts.map((product) =>{
                        return(
                            <li>{product.name}</li>
                        )
                    })
                }
            </ul>
        )
    }
}


function mapStateToProps(state){
    return {
        posts: state.postsReducer.posts
    }
}


App = connect(mapStateToProps, {fetchPostsWithRedux})(App);

const store = createStore(
    allReducers,
    applyMiddleware(thunk)
);
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
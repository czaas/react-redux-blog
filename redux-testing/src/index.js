import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import store from './redux/store';
import { fetchCategories } from './redux/actions/categories';
import { fetchAllPosts } from './redux/actions/posts';
import { fetchComments } from './redux/actions/comments';

store.dispatch(fetchCategories());
store.dispatch(fetchAllPosts());
store.dispatch(fetchComments('8xf0y6ziyjabvozdd253nd'));

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

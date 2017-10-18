import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import store from './redux/store';
// import { fetchCategories } from './redux/actions/categories';
// import { fetchAllPosts, fetchCreatePost, fetchUpdatePost, fetchVoteOnPost } from './redux/actions/posts';
// import { fetchComments } from './redux/actions/comments';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
, document.getElementById('root'));
registerServiceWorker();

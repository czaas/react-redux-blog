import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import store from './redux/store';
import { fetchCategories } from './redux/actions/categories';
import { fetchAllPosts, fetchCreatePost, fetchUpdatePost, fetchVoteOnPost } from './redux/actions/posts';
import { fetchComments } from './redux/actions/comments';

//store.dispatch(fetchCategories());
store.dispatch(fetchAllPosts());
// store.dispatch(fetchComments('8xf0y6ziyjabvozdd253nd'));
// store.dispatch(fetchCreatePost({
// 	"title": "Another new post",
// 	"body": "Here are all of my other posts. don't browse around.",
// 	"author": "Cameron",
// 	"category": "react"
// }))
// store.dispatch(fetchCreatePost({
// 	"title": "Hereyee hereyee",
// 	"body": ".",
// 	"author": "Cameron",
// 	"category": "react"
// }))

setTimeout(() => {
	//store.dispatch(fetchUpdatePost('6ni6ok3ym7mf1p33lnez', { title: 'Back to the orig' }));

	// store.dispatch(fetchVoteOnPost(store.getState().posts.posts[0]));
}, 2000);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

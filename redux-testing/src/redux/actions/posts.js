import fetch from 'isomorphic-fetch';
import {
	REQUEST_POSTS,
	RECEIVE_POSTS,

	fetchAuth,
} from './index';

export function requestPosts() {
	return {
		type: REQUEST_POSTS,
	}
}

export function receivePosts(posts) {
	let arrayOfPosts;
	
	if (!Array.isArray(posts)) {
		arrayOfPosts = [posts];
	} else {
		arrayOfPosts = posts;
	}

	return {
		type: RECEIVE_POSTS,
		posts: arrayOfPosts,
	}
}

	
export function fetchAllPosts() {
	return (dispatch) => {
		dispatch(requestPosts());

		fetch(`http://localhost:3001/posts`, fetchAuth)
			.then(
				res => res.json(),
				err => console.log(`An error has occurred ${err}`),
			)
			.then(json => {
				dispatch(receivePosts(json));
			})
	}
}

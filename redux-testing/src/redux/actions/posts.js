import fetch from 'isomorphic-fetch';
import {
	REQUEST_POSTS,
	RECEIVE_POSTS,
	GET_POST_COMMENTS,
	RECEIVE_POST_COMMENTS,

	fetchAuth,
} from './index';

// START getting posts
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

		return fetch(`http://localhost:3001/posts`, fetchAuth)
			.then(
				res => res.json(),
				err => console.log(`An error has occurred ${err}`),
			)
			.then(json => {
				dispatch(receivePosts(json));
			})
	}
}
// END getting posts

// START getting comments for post
export function getPostComments(postId) {
	return {
		type: GET_POST_COMMENTS,
		id: postId,
	}
}

export function receivePostComments(comments) {
	return {
		type: RECEIVE_POST_COMMENTS,
		comments,
	}
}

export function fetchComments(id) {
	return (dispatch) => {
		dispatch(getPostComments(id));

		return fetch(`http://localhost:3001/posts/${ id }/comments`, fetchAuth)
			.then(
				res => res.json(),
				err => console.log(`An error has occurred: ${ err }`)
			)
			.then(json => {
				dispatch(receivePostComments(json));
			});
	}
}
// END getting comments for post
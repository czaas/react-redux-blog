import fetch from 'isomorphic-fetch';
import {
	GET_POST_COMMENTS,
	RECEIVE_POST_COMMENTS,

	fetchAuth,
} from './index';

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
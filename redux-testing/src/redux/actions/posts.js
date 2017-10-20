import fetch from 'isomorphic-fetch';
import shortid from 'shortid';
import {
	REQUEST_POSTS,
	RECEIVE_POSTS,

	CREATE_POST,
	POST_CREATED,
	POST_HAS_ERRORS,

	REQUEST_UPDATE_POST,
	RECEIVE_UPDATE_POST,

	REQUEST_DELETE_POST,
	RECEIVE_DELETE_POST,

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
	let allPostsReceivedAndValidated = [];
	
	if (!Array.isArray(posts)) {
		arrayOfPosts = [posts];
	} else {
		arrayOfPosts = posts;
	}

	arrayOfPosts.forEach((post) => {
		if (post && post.id) {
			allPostsReceivedAndValidated.push(post);
		}
	});

	return {
		type: RECEIVE_POSTS,
		posts: allPostsReceivedAndValidated,
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
			});
	}
}
// END getting posts

// START create post
export function createPost() {
	return {
		type: CREATE_POST,
	};
}
export function postCreated(postFinalized) {
	return {
		type: POST_CREATED,
		post: postFinalized,
	};
}
export function postHasErrors(errors) {
	return {
		type: POST_HAS_ERRORS,
		errors
	};
}

export function newPostcheckForErrors(newPost) {
	var errors = [];

	if (typeof newPost.title !== 'string' || newPost.title === '') {
		errors.push('Must have a valid title.');
	}

	if (typeof newPost.body !== 'string' || newPost.body === '') {
		errors.push('Must have a valid content body.');
	}

	if (typeof newPost.author !== 'string' || newPost.author === '') {
		errors.push('Must enter an authors name.');
	}

	if (typeof newPost.category !== 'string' || newPost.category === '') {
		errors.push('Must select a valid category.');
	}
	return errors;
}

export function fetchCreatePost(newPost) {
	return (dispatch) => {
		dispatch(createPost());

		newPost.timestamp = Date.now();
		newPost.id = shortid.generate();

		let validatePost = newPostcheckForErrors(newPost);

		if (validatePost.length === 0) {
			let updatedFetchHeaders = Object.assign({}, fetchAuth, {
				method: 'POST',
				body: JSON.stringify(newPost),
			});

			return fetch(`http://localhost:3001/posts`, updatedFetchHeaders)
				.then(
					res => res.json(),
					err => console.log(`An error occurred: ${err}`)
				)
				.then(json => {
					let postUpdated = Object.assign({}, newPost, json);
					
					dispatch(postCreated(postUpdated));
				})
		} else {
			return new Promise((resolve, reject) => {
				dispatch(postHasErrors(validatePost));
				resolve();
			});
		}
	}
}
// END create post


// START update post
export function requestUpdatePost() {
	return {
		type: REQUEST_UPDATE_POST,
	};
}
export function receiveUpdatePost(updatedPost) {
	return {
		type: RECEIVE_UPDATE_POST,
		post: updatedPost,
	}
}
export function fetchUpdatePost(postId, postUpdates) {
	return (dispatch) => {
		dispatch(requestUpdatePost());

		let updatePostHeaders = {
			...fetchAuth,
			method: 'PUT',
			body: JSON.stringify(postUpdates),
		};

		return fetch(`http://localhost:3001/posts/${ postId }`, updatePostHeaders)
			.then(
				res => res.json(),
				err => console.log(`An error has occurred: ${ err }`)
			)
			.then(json => {
				dispatch(receiveUpdatePost(json));
			});
	}
}

export function fetchVoteOnPost(post, upvotePost = true) {
	return (dispatch) => {
		dispatch(requestUpdatePost());

		let updatePostHeaders = {
			...fetchAuth,
			method: 'PUT',
			body: JSON.stringify({
				...post,
				voteScore: post.voteScore + (upvotePost ? 1 : -1),
			}),
		};
		return fetch(`http://localhost:3001/posts/${ post.id }`, updatePostHeaders)
			.then(
				res => res.json(),
				err => console.log(`An error has occurred: ${ err }`)
			)
			.then(json => {
				dispatch(receiveUpdatePost(json));
			});
	}
}
// END update post

// START delete post
export function requestDeletePost() {
	return {
		type: REQUEST_DELETE_POST,
	};
}

export function receiveDeletePost(postId) {
	return {
		type: RECEIVE_DELETE_POST,
		id: postId,
	};
}

export function fetchDeletePost(postId) {
	return (dispatch) => {
		dispatch(requestDeletePost());

		let deletePostHeaders = {
			...fetchAuth,
			method: 'DELETE',
		};
		return fetch(`http://localhost:3001/posts/${postId}`, deletePostHeaders)
			.then(
				res => res.json(),
				err => console.log(`An error has occurred: ${ err }`)
			)
			.then(json => {
				dispatch(receiveDeletePost(json.id));
			});
	}
}
// END delete post
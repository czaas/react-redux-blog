import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './posts.js';
import * as types from './index.js';
import fetch from 'isomorphic-fetch';


const somePosts = [
    {
        "id": "8xf0y6ziyjabvozdd253nd",
        "timestamp": 1467166872634,
        "title": "Udacity is the best place to learn React",
        "body": "Everyone says so after all.",
        "author": "thingtwo",
        "category": "react",
        "voteScore": 6,
        "deleted": false
    },
    {
        "id": "6ni6ok3ym7mf1p33lnez",
        "timestamp": 1468479767190,
        "title": "Learn Redux in 10 minutes!",
        "body": "Just kidding. It takes more than 10 minutes to learn technology.",
        "author": "thingone",
        "category": "redux",
        "voteScore": -5,
        "deleted": false
    }
];

describe('post actions', () => {
	describe('getting all posts from server', () => {

		it('should request posts', () => {
			const expectedAction = {
				type: types.REQUEST_POSTS
			};
			expect(actions.requestPosts()).toEqual(expectedAction);
		});

		it('should receive posts', () => {

			const expectedAction = {
				type: types.RECEIVE_POSTS,
				posts: somePosts
			};

			expect(actions.receivePosts(somePosts)).toEqual(expectedAction);
		});
	});

	describe('creating posts', () => {
		it('should create a CREATE_POST object', () => {
			expect(actions.createPost()).toEqual({ type: types.CREATE_POST });
		});
		it('should create a POST_CREATED object', () => {
			const newPost = {
				title: 'New post',
				body: 'Post content here',
				id: 'fakeid-321'
			};
			expect(actions.postCreated(newPost)).toEqual({ type: types.POST_CREATED, post: newPost });
		});
		it('should create a has errors object if a field is missing', () => {
			const errArr = ['Missing something', 'hopefully better errors'];
			expect(actions.postHasErrors(errArr)).toEqual({ type: types.POST_HAS_ERRORS, errors: errArr });
		});
	});

	describe('updating a post', () => {
		it('should create a update post action creator', () => {
			const expectedAction = { type: types.REQUEST_UPDATE_POST };
			expect(actions.requestUpdatePost()).toEqual(expectedAction);
		});
		it('should create a received update post with post action creator', () => {
			const updatedPost = {
				title: 'I was updated',
			};
			const expectedAction = {
				type: types.RECEIVE_UPDATE_POST,
				post: updatedPost
			}
			expect(actions.receiveUpdatePost(updatedPost)).toEqual(expectedAction);
		});
	});

	describe('deleting a post', () => {
		it('should create a request delete post action', () => {
			const expectedAction = { type: types.REQUEST_DELETE_POST };
			expect(actions.requestDeletePost()).toEqual(expectedAction);
		});
		it('should create a received delete post action along with returning the id of post to be deleted', () => {
			let fakePostId = 'fakeid-222';
			const expectedAction = { type: types.RECEIVE_DELETE_POST, id: fakePostId, };
			expect(actions.receiveDeletePost(fakePostId)).toEqual(expectedAction);
		});
	});
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async posts', () => {
	afterEach(() => nock.cleanAll());

	it('Fetching all posts creates REQUEST_POSTS and RECEIVE_POSTS when fetching has complete', () => {
		nock('http://localhost:3001')
			.get('/posts')
			.reply(200, somePosts);

		const expectedActions = [
			{ type: types.REQUEST_POSTS },
			{ type: types.RECEIVE_POSTS, posts: somePosts }
		];

		const store = mockStore({ posts: [] });

		return store.dispatch(actions.fetchAllPosts()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('should create new post when requirements are met', () => {
		let validPost = {
			"title": "Test Post 1",
			"body": "This is a new post",
			"author": "Cameron",
			"category": "react"
		};
		nock('http://localhost:3001')
			.post('/posts')
			.reply(200, validPost);

		const store = mockStore({ posts: [] });
		const expectedActions = [
			{ type: types.CREATE_POST, },
			{ type: types.POST_CREATED, post: validPost }
		];

		return store.dispatch(actions.fetchCreatePost(validPost))
			.then(() => {
				expect(store.getActions()).toEqual(expectedActions)
			});
	});

	it('should throw error action if post is invalid', () => {
		let invalidPost = {
			"title": "", // note invalid title
			"body": "This is a new post",
			"author": "Cameron",
			"category": "react"
		};

		const store = mockStore({ posts: [], postErrors: [] });
		const expectedActions = [
			{ type: types.CREATE_POST, },
			{ type: types.POST_HAS_ERRORS, errors: ['Must have a valid title.'] }
		];

		return store.dispatch(actions.fetchCreatePost(invalidPost)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		})
	});

	it('should request a update to a post', () => {
		let updatedPost = {
			title: 'an updated post',
		};
		nock('http://localhost:3001')
			.put('/posts/fakeid-111')
			.reply(200, updatedPost);

		const store = mockStore({ posts: [] });
		const expectedActions = [
			{ type: types.REQUEST_UPDATE_POST },
			{ type: types.RECEIVE_UPDATE_POST, post: updatedPost }
		];

		return store.dispatch(actions.fetchUpdatePost('fakeid-111', updatedPost)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('should be able to upvote post', () => {
		let expectedUpdatedPost = {
			...somePosts[0],
			voteScore: somePosts[0].voteScore + 1
		};
		nock('http://localhost:3001')
			.put(`/posts/${ somePosts[0].id }`)
			.reply(200, (url, returnedUpdate) => returnedUpdate);

		const store = mockStore({ posts: [somePosts[0]] });
		const expectedActions = [
			{ type: types.REQUEST_UPDATE_POST },
			{ type: types.RECEIVE_UPDATE_POST, post: expectedUpdatedPost }
		];

		return store.dispatch(actions.fetchVoteOnPost(somePosts[0]))
			.then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
	});

	it('should be able to downvote post', () => {
		let expectedUpdatedPost = {
			...somePosts[0],
			voteScore: somePosts[0].voteScore - 1
		};
		nock('http://localhost:3001')
			.put(`/posts/${ somePosts[0].id }`)
			.reply((url, requestUpdated) => {
				return requestUpdated;
			});
		
		const store = mockStore({ posts: [somePosts[0]] });
		const expectedActions = [
			{ type: types.REQUEST_UPDATE_POST },
			{ type: types.RECEIVE_UPDATE_POST, post: expectedUpdatedPost }
		];

		return store.dispatch(actions.fetchVoteOnPost(somePosts[0], false))
			.then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
	});

	it('should delete post', () => {
		let postToBeDeletedId = 'fakeId-223';
		nock('http://localhost:3001')
			.delete(`/posts/${ postToBeDeletedId }`)
			.reply(200, { id: postToBeDeletedId });

		const store = mockStore({ posts: [] });
		const expectedActions = [
			{ type: types.REQUEST_DELETE_POST },
			{ type: types.RECEIVE_DELETE_POST, id: postToBeDeletedId }
		];

		return store.dispatch(actions.fetchDeletePost(postToBeDeletedId))
			.then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
	});
});
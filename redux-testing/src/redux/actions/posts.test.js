import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './posts.js';
import * as types from './index.js';


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
const someComments = [{ id: '123', comment: 'Yes' }, { id: '321', comment: 'No' }];

describe('post actions', () => {
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

	it('should request comments by post id', () => {
		const requestedPostId = 'fakeid-123';
		const expectedAction = {
			type: types.GET_POST_COMMENTS,
			id: requestedPostId,
		};

		expect(actions.getPostComments(requestedPostId)).toEqual(expectedAction);
	});
	it('should receive comments', () => {
		const expectedAction = {
			type: types.RECEIVE_POST_COMMENTS,
			comments: someComments,
		};

		expect(actions.receivePostComments(someComments)).toEqual(expectedAction);
	});
});


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async posts', () => {
	afterEach(() => nock.cleanAll());

	it('creates REQUEST_POSTS and RECEIVE_POSTS when fetching has complete', () => {
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
		})
	});

	it('creates GET_POST_COMMENTS and RECEIVE_POST_COMMENTS when fetching for comments', () => {

		const postId = 'fakeid-124';

		nock('http://localhost:3001')
			.get(`/posts/${ postId }/comments`)
			.reply(200, someComments);

		const expectedActions = [
			{ type: types.GET_POST_COMMENTS, id: postId },
			{ type: types.RECEIVE_POST_COMMENTS, comments: someComments }
		];

		const store = mockStore({ comments: [] });

		return store.dispatch(actions.fetchComments(postId)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './comments.js';
import * as types from './index.js';

const someComments = [{ id: '123', comment: 'Yes' }, { id: '321', comment: 'No' }];

describe('comments actions', () => {
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

describe('async comments', () => {
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
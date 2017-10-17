import * as actions from '../actions';
import commentsReducer, { initialCommentsState } from './comments';

const someComments = [{ id: '123', comment: 'Yes' }, { id: '321', comment: 'No' }];


describe('posts reducer', () => {
	it('should request posts and trigger the fetching comments to be true and reset old comments', () => {
		expect(
			commentsReducer(
				{
					currentPostCommentsId: 'fakeid-124',
					currentPostComments: someComments,
				}, {
					type: actions.GET_POST_COMMENTS,
					id: 'fakeid-123',
				}
			)
		).toEqual({
			currentPostComments: [],
			currentPostCommentsId: 'fakeid-123',
			fetchingComments: true,
		});
	});

	it('should receive the post comments and update state and set fetching to false', () => {
		expect(
			commentsReducer(
				{
					fetchingComments: true
				},
				{
					type: actions.RECEIVE_POST_COMMENTS,
					comments: someComments,
				}
			)
		).toEqual({
			fetchingComments: false,
			currentPostComments: someComments,
		});
	});
});
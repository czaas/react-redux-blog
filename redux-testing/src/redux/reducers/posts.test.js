import * as actions from '../actions';
import postsReducer, { initialPostState } from './posts';

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

describe('posts reducer', () => {
	it('should return default state', () => {
		expect(postsReducer())
			.toEqual(initialPostState);
	});

	it('should toggle fetching to true if REQUEST_POSTS', () => {
		expect(
			postsReducer({}, { type: actions.REQUEST_POSTS })
		).toEqual({
			fetching: true
		});
	});

	it('should make fetching false and add posts when it receives posts', () => {
		expect(
			postsReducer({
				fetching: true
			}, 
			{ 
				type: actions.RECEIVE_POSTS, 
				posts: somePosts
			})
		).toEqual({
			fetching: false,
			posts: somePosts
		});
	});

	it('should remove duplicate posts by id', () => {
		expect(
			postsReducer(
				{}, {
				type: actions.RECEIVE_POSTS,
				posts: [...somePosts, ...somePosts]
			})
		).toEqual({
			fetching: false,
			posts: somePosts
		});
	});
});
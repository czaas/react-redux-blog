import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './categories.js';
import * as types from './index.js';

describe('category actions', () => {
	it('should request categories', () => {
		const expectedAction = {
			type: types.REQUEST_CATEGORIES
		};
		expect(actions.requestCategories()).toEqual(expectedAction);
	});

	it('should receive categories', () => {
		const someCategories = [{
			name: 'react',
			path: 'react'
		}, {
			name: 'redux',
			path: 'redux'
		}];

		const expectedAction = {
			type: types.RECEIVE_CATEGORIES,
			all: someCategories
		};

		expect(actions.receiveCategories(someCategories)).toEqual(expectedAction);
	});
});


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async categories', () => {
	afterEach(() => nock.cleanAll());

	it('creates REQUEST_CATEGORIES and RECEIVE_CATEGORIES when fetching has complete', () => {
		const categories = [{
			name: 'react',
			path: 'react'
		}, {
			name: 'redux',
			path: 'redux'
		}];

		nock('http://localhost:3001')
			.get('/categories')
			.reply(200, { 
				categories: categories
			});

		const expectedActions = [
			{ type: types.REQUEST_CATEGORIES },
			{ type: types.RECEIVE_CATEGORIES, all: categories }
		];

		const store = mockStore({ all: [] });

		return store.dispatch(actions.fetchCategories()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		})
	});
});
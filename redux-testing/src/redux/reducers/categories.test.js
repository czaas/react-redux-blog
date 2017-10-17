import * as actions from '../actions';
import categoriesReducer, { initialCategoriesState } from './categories';

describe('categories reducer', () => {
	// all reducers should first test for initial state being returned if none of the switches match. 

	it('should return the initial state', () => {
		expect(categoriesReducer(undefined, undefined)).toEqual(initialCategoriesState);
	});

	it('should toggle fetching to be true when REQUEST_CATEGORIES', () => {
		expect(
			categoriesReducer(undefined, {
				type: actions.REQUEST_CATEGORIES
			})
		).toEqual({
			fetching: true,
			all: []
		});
	});

	it('should toggle fetching to false and add new categories to array', () => {
		const someCategories = [
			{ name: 'react', path: 'react' },
			{ name: 'redux', path: 'redux' }
		];

		expect(
			categoriesReducer(
				{ fetching: true }, // initial state
				{
					type: actions.RECEIVE_CATEGORIES,
					all: someCategories,
				}
			)
		).toEqual({
			fetching: false,
			all: someCategories,
		});
	});

	it('should remove deuplicate of the same categories by path', () => {
		const duplicateCategories = [
			{ name: 'react', path: 'react' },
			{ name: 'redux', path: 'redux' },
			{ name: 'react', path: 'react' },
			{ name: 'redux', path: 'redux' },
		];
		const expectedCategories = [
			{ name: 'react', path: 'react' },
			{ name: 'redux', path: 'redux' }
		];

		expect(
			categoriesReducer(
				undefined,
				{
					type: actions.RECEIVE_CATEGORIES,
					all: duplicateCategories
				}
			)
		).toEqual({
			fetching: false,
			all: expectedCategories
		});
	});
});
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import PostList from './PostList';

let testPosts = [{
	id: 'fakeid-123',
	title: 'Post1',
},{
	id: 'fakeid-124',
	title: 'Post2',
},{
	id: 'fakeid-125',
	title: 'Post3',
}];

describe('<PostList />', () => {
	it('should render lists of post titles', () => {
		const wrapper = shallow(<PostList posts={testPosts} />);
		
		wrapper.find('h2').forEach((child) => {
			expect(child.find('Link').name()).toBe('Link');
		});
		expect(wrapper.find('h2').length).toEqual(3);
	});
	
	it('each post title h2 should contain a <Link />', () => {
		const wrapper = shallow(<PostList posts={testPosts} />);
		
		wrapper.find('h2').forEach((child) => {
			expect(child.find('Link').name()).toBe('Link');
		});
	})
});
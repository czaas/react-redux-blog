import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Post from './Post';

const testPost = {
    "id": "6ni6ok3ym7mf1p33lnez",
    "timestamp": 1468479767190,
    "title": "Learn Redux in 10 minutes!",
    "body": "Just kidding.\n It takes more than 10 minutes to learn technology.",
    "author": "thingone",
    "category": "redux",
    "voteScore": -5,
    "deleted": false
}

describe('<Post />', () => {
	it('should render a post title', () => {
		const wrapper = shallow(<Post post={testPost} />);
		let renderedHeader = wrapper.find('h1').text();

		expect(renderedHeader).toEqual(testPost.title);
	});
	it('should render content with <br /> tags', () => {
		const wrapper = shallow(<Post post={testPost} />);
		let renderedContent = wrapper.find('#bodyContent').html();
		let expectedContent = `<div id="bodyContent">${ testPost.body.replace(/\n/g, '<br />') }</div>`;

		expect(renderedContent).toEqual(expectedContent);
	});
	it('should render the author', () => {
		const wrapper = shallow(<Post post={testPost} />);
		const renderedContent = wrapper.find('#author').text();
		expect(renderedContent).toBe(`Posted by: ${ testPost.author }`);
	});
});
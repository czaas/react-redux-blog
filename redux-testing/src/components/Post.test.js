import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import {
  Router,
  Route,
} from 'react-router-dom';

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

	it('should render icon that calls upvote that returns the post', () => {
		const handleClick = (post) => post;
		const spy = sinon.spy(handleClick);

		const wrapper = shallow(<Post post={testPost} upVote={spy} />);

		wrapper.find('Icon#upVote').props().onClick();
		expect(spy.calledWith(testPost)).toBe(true);
	});
	it('should render icon that calls downvote that returns the post', () => {
		const handleClick = (post) => post;
		const spy = sinon.spy(handleClick);

		const wrapper = shallow(<Post post={testPost} downVote={spy} />);

		wrapper.find('Icon#downVote').props().onClick();
		expect(spy.calledWith(testPost)).toBe(true);
	});
	it('should render the voteScore of the post', () => {
		const wrapper = shallow(<Post post={testPost} />);

		const renderedContent = wrapper.find('#voteScore').text();

		expect(renderedContent).toBe(testPost.voteScore.toString());
	});
	it('should render the author', () => {
		const wrapper = shallow(<Post post={testPost} />);
		const renderedContent = wrapper.find('#author').text();
		expect(renderedContent).toBe(`Posted by: ${ testPost.author }`);
	});
});
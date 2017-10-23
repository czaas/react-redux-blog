import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import {VoteOnPost} from './VoteOnPost';

const testPost = {
    "id": "6ni6ok3ym7mf1p33lnez",
    "timestamp": 1468479767190,
    "title": "Learn Redux in 10 minutes!",
    "body": "Just kidding.\n It takes more than 10 minutes to learn technology.",
    "author": "thingone",
    "category": "redux",
    "voteScore": -5,
    "deleted": false
};

describe('test for vote on post', () => {

	it('renders the component', () => {
		const wrapper = shallow(<VoteOnPost post={testPost} />);
		expect(wrapper.exists()).toBe(true);
	});
	
	it('should render the post score passed in', () => {
		const wrapper = shallow(<VoteOnPost post={testPost} />);

		expect(wrapper.find('#voteScore').text()).toBe(`${testPost.voteScore}`)
	});
	
	it('should log the click of upvote and downvote', () => {
		const spy = sinon.spy();
		const wrapper = shallow(<VoteOnPost post={testPost} upVotePost={spy} downVotePost={spy} />);

		wrapper.find('#upVote').simulate('click');
		wrapper.find('#downVote').simulate('click');

		expect(spy.callCount).toBe(2);
	});
});

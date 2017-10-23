import React from 'react';
import { connect } from 'react-redux';
import { fetchVoteOnPost } from '../redux/actions/posts';
import Icon from 'react-icons-kit';
import { circleUp } from 'react-icons-kit/icomoon/circleUp';
import { circleDown } from 'react-icons-kit/icomoon/circleDown'; 

export const VoteOnPost = (props) => (
	<div className="voteOnPost">
		<span id="voteScore">{props.post.voteScore}</span>
		<Icon icon={circleUp} id="upVote" onClick={() => props.upVotePost(props.post)} />
		<Icon icon={circleDown} id="downVote" onClick={() => props.downVotePost(props.post)} />
	</div>
);

const mapStateToProps = (state, ownProps) => {
	return {}
};

const mapDispatchToProps = dispatch => {
	return {
	    upVotePost: (post) => {
	      dispatch(fetchVoteOnPost(post, true));
	    },
	    downVotePost: (post) => {
	      dispatch(fetchVoteOnPost(post, false));
	    },
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(VoteOnPost);
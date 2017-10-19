import React from 'react';
import Icon from 'react-icons-kit';
import { circleUp } from 'react-icons-kit/icomoon/circleUp';
import { circleDown } from 'react-icons-kit/icomoon/circleDown';    

class Post extends React.Component {
	state = {
		post: {}
	}
	componentWillMount(props) {
		let currentPost;

		this.props.posts.map((post) => {
			if (post.id === this.props.match.params.id) {
				currentPost = post;
			}
			return post;
		});

		if (currentPost) {
			this.setState({
				post: currentPost
			});
		}
	}
	render() {
		return (
			<section className="viewPost">
				<div className="viewPost__upvote">
					{this.state.post.voteScore}
					<Icon icon={circleUp} onClick={() => this.props.upVote(this.state.post)} />
					<Icon icon={circleDown} onClick={() => this.props.downVote(this.state.post)} />
				</div>
				<div className="viewPost__content">
					<h1>{this.state.post.title}</h1>

					{this.state.post.body}
				</div>
			</section>
		);
	}
}

export default Post;
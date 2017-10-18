import React from 'react';

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
		});

		if (currentPost) {
			this.setState({
				post: currentPost
			});
		}
	}
	render() {
		return (
			<section>
				<h1>{this.state.post.title}</h1>

				{this.state.post.body}
			</section>
		);
	}
}

export default Post;
import React from 'react';

class EditPost extends React.Component {
	state = {
		id: '',
		title: '',
		author: '',
		category: '',
		body: '',
	}

	componentDidMount() {
		if (this.props.match.params.id) {
			let currentPost = {};

			this.props.posts.map(post => {
				if (post.id === this.props.match.params.id) {
					currentPost = {
						...post,
					};
				}

				return post;
			});

			if (currentPost.id) {
				this.setState(() => {
					return {
						id: currentPost.id,
						title: currentPost.title,
						author: currentPost.author,
						category: currentPost.category,
						body: currentPost.body,
					}
				});
			}
		}
	}

	inputChange = (e) => {	
		let textUpdated = {};
		textUpdated[e.target.id] = e.target.value;

		this.setState(() => textUpdated);
	}

	onSave = (e) => {
		if (e) {
			e.preventDefault();
		}

		if (this.state.id !== '') {
			// update post
			this.props.updatePost(this.state);

			this.props.history.push(`/post/${ this.state.id }`);
		} else {
			// create new post
			let newPost = {
				...this.state,
			};

			delete newPost.id;
			this.props.saveNewPost(this.state);
			this.props.history.push('/');
		}
	}

	render() {
		let header = this.state.id.length === 0 ? 'New Post' : 'Edit Post';
		return (
			<section>
				<h1>{header}</h1>
				<form onSubmit={this.onSave}>
					<div>
						<label htmlFor="title">Post Title</label>
						<input type="text" id="title" onChange={this.inputChange} value={this.state.title} required />
					</div>

					<div>
						<label htmlFor="author">Author</label>
						<input type="text" id="author" onChange={this.inputChange} value={this.state.author} required />
					</div>

					<div>
						<label htmlFor="category">Category</label>
						<input type="text" id="category" onChange={this.inputChange} value={this.state.category} required />
					</div>

					<div>
						<label htmlFor="body">Your Content</label>
						<textarea id="body" onChange={this.inputChange} value={this.state.body} required />
					</div>	

					<button>Save</button>
				</form>
			</section>
		);
	}
}

export default EditPost;
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
		if (this.props.post && this.props.post.id !== '') {
			this.setState(() => { 
				return {
					...this.props.post 
				};
			});
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

	deletePost = () => {
		let confirmation = window.confirm('Are you sure? There is no undo.');

		if (confirmation) {
			this.props.deletePost(this.state.id);
			this.props.history.push('/');
		}
	}

	showDeletePost = () => {
		if (this.state.id.length > 0) {
			return (
				<p style={{ color: 'red', cursor: 'pointer' }} onClick={this.deletePost}>Delete Post</p>
			);
		}
	}

	render() {
		let header = this.state.id.length === 0 ? 'New Post' : 'Edit Post';
		return (
			<section>
				<h1>{header}</h1>
				{this.showDeletePost()}
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
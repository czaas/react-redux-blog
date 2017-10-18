import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ posts }) => {
	return (
		<section>
			<h1>Home</h1>
			{posts.map((post, i) => (
				<h2 key={`post-${i}`}>
					<Link to={`/post/${ post.id }`}>{post.title}</Link>
				</h2>
			))}
		</section>
	);
}

export default PostList;
import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/icomoon/pencil';

const PostList = ({ posts }) => {
	return (
		<section>
			<h1>Home</h1>
			{posts.map((post, i) => (
				<h2 key={`post-${i}`}>
					<Link to={`/post/${ post.id }`}>{post.title}</Link><Link to={`/post/${ post.id }/edit`}><Icon icon={pencil} /></Link>
				</h2>
			))}
		</section>
	);
}

export default PostList;
import React from 'react';
import { Link } from 'react-router-dom';
import VoteOnPost from './VoteOnPost';

const PostList = ({ posts }) => {
	return (
		<section>
			<h1>Home</h1>
			{posts.sort((a, b) => b.voteScore - a.voteScore).map((post, i) => (
				<div key={`post-${i}`}>
					<h2>
						<Link to={`/post/${ post.id }`}>{post.title}</Link>
					</h2>
				<VoteOnPost post={post} />
				</div>
			))}
		</section>
	);
}

export default PostList;
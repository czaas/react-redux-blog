import React from 'react';
import Icon from 'react-icons-kit';  
import { pencil } from 'react-icons-kit/icomoon/pencil'; 
import { Link } from 'react-router-dom';
import VoteOnPost from './VoteOnPost';

const Post = (props) => {
	let bodyContent = props.post.body;

	if (bodyContent) {
		bodyContent = bodyContent.replace(/\n/g, '<br />');
	}
	return (
		<section className="viewPost">
			<div className="viewPost__content">
				<h1>{props.post.title}</h1>
				<div className="viewPost__upvote">
					<VoteOnPost post={props.post} />
					<Link to={`/post/${ props.post.id }/edit`}><Icon icon={pencil} /></Link>
				</div>

				<p id="author">Posted by: <strong>{props.post.author}</strong></p>
				
				<div id="bodyContent" dangerouslySetInnerHTML={{__html: bodyContent}} />
			</div>
		</section>
	);
}

export default Post;
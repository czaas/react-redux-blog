import React from 'react';
import Icon from 'react-icons-kit';
import { circleUp } from 'react-icons-kit/icomoon/circleUp';
import { circleDown } from 'react-icons-kit/icomoon/circleDown';   
import { pencil } from 'react-icons-kit/icomoon/pencil'; 
import { Link } from 'react-router-dom';

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
					<span id="voteScore">{props.post.voteScore}</span>
					<Icon icon={circleUp} id="upVote" onClick={() => props.upVote(props.post)} />
					<Icon icon={circleDown} id="downVote" onClick={() => props.downVote(props.post)} />

					<Link to={`/post/${ props.post.id }/edit`}><Icon icon={pencil} /></Link>
				</div>

				<p id="author">Posted by: <strong>{props.post.author}</strong></p>
				
				<div id="bodyContent" dangerouslySetInnerHTML={{__html: bodyContent}} />
			</div>
		</section>
	);
}

export default Post;
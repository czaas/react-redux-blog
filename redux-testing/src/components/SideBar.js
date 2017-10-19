import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => (
	<aside>
		<nav>
			<ul>
				<li><Link to="/">Home</Link></li>
				<li><Link to="/post/new">Create New Post</Link></li>
			</ul>
		</nav>
	</aside>
);

export default SideBar;
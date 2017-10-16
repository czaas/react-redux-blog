import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import store from './redux/store';
import { fetchCategories } from './redux/actions/categories';
import { fetchAllPosts } from './redux/actions/posts';

store.dispatch(fetchCategories());
store.dispatch(fetchAllPosts());

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

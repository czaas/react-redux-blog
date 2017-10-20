export const fetchAuth = {
	headers: {
		'Authorization': 'something-here',
		'Accept': 'application/json',
        'Content-Type': 'application/json',
	}
};

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const GET_POST_COMMENTS = 'GET_POST_COMMENTS';
export const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS';

export const CREATE_POST = 'CREATE_POST';
export const POST_CREATED = 'POST_CREATED';
export const POST_HAS_ERRORS = 'POST_HAS_ERRORS';

export const REQUEST_UPDATE_POST = 'REQUEST_UPDATE_POST';
export const RECEIVE_UPDATE_POST = 'RECEIVE_UPDATE_POST';

export const REQUEST_DELETE_POST = 'REQUEST_DELETE_POST';
export const RECEIVE_DELETE_POST = 'RECEIVE_DELETE_POST';

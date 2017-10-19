// Library imports
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';

// redux actions
import { fetchAllPosts, fetchCreatePost, fetchVoteOnPost, fetchUpdatePost } from './redux/actions/posts';

// app components and resources
import PostList from './components/PostList';
import Post from './components/Post';
import FourZeroFour from './components/FourZeroFour';
import SideBar from './components/SideBar';
import EditPost from './components/EditPost';
import './App.css';

class App extends Component {
  componentWillMount() {
    this.props.getAllPosts();
  }
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App__header">
            <h1>_blog</h1>
          </header>

          <div className="App__content">
            <main>
              <Switch>
                <Route path="/" exact component={() => <PostList posts={this.props.allPosts} />} />
                <Route path="/post/new" component={(props) => <EditPost {...props} saveNewPost={this.props.saveNewPost} />} />
                <Route path="/post/:id/edit" component={(props) => <EditPost {...props} posts={this.props.allPosts} updatePost={this.props.updatePost} />} />
                <Route path="/post/:id" component={(props) => <Post {...props} posts={this.props.allPosts} upVote={this.props.upVotePost} downVote={this.props.downVotePost} />} />
                <Route path="*" component={FourZeroFour} />
              </Switch>
            </main>
            <SideBar />
          </div>
        </div>
      </Router>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    fetchingPosts: state.posts.fetching,
    allPosts: state.posts.posts,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getAllPosts: () => {
      dispatch(fetchAllPosts());
    },
    saveNewPost: (newPostObj) => {
      dispatch(fetchCreatePost(newPostObj));
    },
    updatePost: (post) => {
      dispatch(fetchUpdatePost(post.id, post));
    },
    upVotePost: (post) => {
      dispatch(fetchVoteOnPost(post, true));
    },
    downVotePost: (post) => {
      dispatch(fetchVoteOnPost(post, false));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
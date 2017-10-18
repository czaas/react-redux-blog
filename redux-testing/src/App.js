// Library imports
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import {
  unionBy,
} from 'lodash';

// redux actions
import { fetchAllPosts } from './redux/actions/posts';

// app components and resources
import PostList from './components/PostList';
import Post from './components/Post';
import FourZeroFour from './components/FourZeroFour';
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

          <main className="App__content">
            <Switch>
              <Route path="/" exact component={() => <PostList posts={this.props.allPosts} />} />
              <Route path="/post/:id" component={(props) => <Post {...props} posts={this.props.allPosts} />} />
              <Route path="*" component={FourZeroFour} />
            </Switch>
          </main>
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
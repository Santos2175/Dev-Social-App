import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import Spinner from '../layout/Spinner';

const Post = ({ getPost, post: { post, loading } }) => {
  const { id } = useParams();
  useEffect(() => {
    getPost(id);
  }, [getPost, id, post]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <section className='container'>
      <Link to='/posts' className='btn btn-light'>
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <p>Comments...</p>
      <div className='comments'>
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </section>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);

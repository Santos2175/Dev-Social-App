import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  auth,
  addLike,
  removeLike,
  deletePost,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions = true,
}) => {
  const hasLiked = likes.some(
    (like) => like.user.toString() === auth.user._id.toString()
  );
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p>
          Posted on <Moment format='MMMM DD, YYYY hh:mm A'>{date}</Moment>
        </p>
        <hr />

        <div className='m'>
          <button
            onClick={(e) => addLike(_id)}
            type='button'
            className='btn btn-light'>
            <i
              className='fas fa-thumbs-up'
              style={{ color: hasLiked ? 'var(--primary-color)' : 'black' }}
            />{' '}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button
            onClick={(e) => removeLike(_id)}
            type='button'
            className='btn btn-light'>
            <i className='fas fa-thumbs-down' />
          </button>
          <Link to={`/posts/${_id}`} className='btn btn-primary'>
            {comments.length > 0 ? (
              comments.length === 1 ? (
                <span>{comments.length} Comment</span>
              ) : (
                <span>{comments.length} Comments</span>
              )
            ) : (
              <span>Comment</span>
            )}
          </Link>
          {showActions && !auth.loading && user === auth.user._id && (
            <button
              onClick={(e) => deletePost(_id)}
              type='button'
              className='btn btn-danger'>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);

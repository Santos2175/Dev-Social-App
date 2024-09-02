import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { removeComment } from '../../actions/post';

const CommentItem = ({
  removeComment,
  auth,
  postId,
  comment: { _id, text, name, avatar, user, date },
}) => {
  return (
    <div className='post bg-white p-1 m-1'>
      <div>
        <Link to={`/api/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-2'>{text}</p>
        <p>
          Posted on <Moment format='MMMM DD, YYYY hh:mm A'>{date}</Moment>
        </p>
        <hr />
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={(e) => removeComment(postId, _id)}
            type='button'
            className='btn btn-danger m'>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  removeComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { removeComment })(CommentItem);

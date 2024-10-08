import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addComment } from '../../actions/post';
import { connect } from 'react-redux';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(text);
    addComment(postId, { text });
    setText('');
  };
  return (
    <div className='post-form'>
      <div className='bg-primary p post-form__title'>
        <h3 className='px-1'>Leave a comment</h3>
      </div>
      <form className='form my-1' onSubmit={handleSubmit}>
        <textarea
          cols='30'
          rows='5'
          name='text'
          value={text}
          placeholder='Comment on the post'
          onChange={(e) => setText(e.target.value)}
          required></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);

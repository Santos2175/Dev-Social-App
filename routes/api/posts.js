const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../../middlewares/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

const router = Router();

//@route   POST api/posts
//@desc    create a post
//@access  Private
router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      return res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route   GET api/posts
//@desc    get all posts
//@access  Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    if (!posts) return res.status(404).json({ msg: 'No posts found' });

    return res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@route   GET api/posts/:post_id
//@desc    get post by id
//@access  Private
router.get('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post)
      return res.status(404).json({ msg: 'No post found with this id' });

    return res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'No post found with this id' });
    }
    res.status(500).send('server error');
  }
});

//@route   DELETE api/posts/post_id
//@desc    delete post
//@access  Private
router.delete('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) return res.status(404).json({ msg: 'No posts found' });

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'user not authorized' });
    }

    await post.deleteOne();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('server error');
  }
});

//@route   PUT api/posts/like/:post_id
//@desc    like a post
//@access  Private
router.put('/like/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.json(post.likes);
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();
    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});

//@route   PUT api/posts/unlike/:post_id
//@desc    unlike a post
//@access  Private
router.put('/unlike/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.json(post.likes);
    }

    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);
    await post.save();
    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});

//@route   POST api/posts/comment/:post_id
//@desc    comment on a post
//@access  Private
router.post(
  '/comment/:post_id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const post = await Post.findById(req.params.post_id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route   DELETE api/posts/comment/:id/:comment_id
//@desc    delete comment on a post
//@access  Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    //find post
    const post = await Post.findById(req.params.id);

    //find comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    //chec comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    //check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User unauthorized' });
    }

    const commentIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(commentIndex, 1);

    await post.save();

    res.json({ msg: 'comment deleted' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'server error' });
  }
});

module.exports = router;

const {Router} = require('express')
const router = Router()


//@route   GET api/posts
//@desc    test route
//@access  Public
router.get('/',(req,res)=>res.send('Posts route'))

module.exports = router
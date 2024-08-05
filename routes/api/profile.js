const {Router} = require('express')
const auth = require('../../middlewares/auth')
const {check, validationResult} = require('express-validator')

const Profile = require('../../models/Profile')
const User = require('../../models/User')

const router = Router()


//@route   GET api/profile/me
//@desc    get current users profile
//@access  Private
router.get('/me',auth, async (req,res)=>{

    try {
        const profile = await Profile.findOne({user:req.user.id}).populate('user',['name', 'avatar'])

        if(!profile) return res.status(400).json({msg:"there is no profile for this user"})

        res.json(profile)

        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


//@route   POST api/profile/
//@desc    create or update user profile
//@access  Private
router.post('/',[auth, [
    check('status', 'Status is required ').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
]], async (req,res)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
    }

    console.log(req.user.id)
    
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body


    //build profile object
    const profileFields = {}

    profileFields.user = req.user.id

    if(company) profileFields.company = company
    if(website) profileFields.website  = website
    if(location) profileFields.location  = location
    if(bio) profileFields.bio  =bio
    if(status) profileFields.status  =status
    if(githubusername) profileFields.githubusername  =githubusername

    if(skills){
        profileFields.skills = skills.split(',').map(skill=>skill.trim())
    }

    //build social object
    profileFields.social ={}
    if(youtube) profileFields.social.youtube = youtube 
    if(twitter) profileFields.social.twitter = twitter
    if(facebook) profileFields.social.facebook = facebook 
    if(linkedin) profileFields.social.linkedin = linkedin
    if(instagram) profileFields.social.instagram = instagram


    try {

        let profile = await Profile.findOne({user:req.user.id})

        if(profile){
            //update
            profile = await Profile.findOneAndUpdate({user:req.user.id},{
                $set:profileFields
            },
        {new:true})

            return res.json(profile)
        }


        //create
        profile = new Profile(profileFields);
        await profile.save()

        res.json(profile)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error')
    }


})


//@route   GET api/profile/
//@desc    get all profiles
//@access  Public
router.get('/', async(req,res)=>{
    try {

        const profiles = await Profile.find().populate('user',['name','avatar'])
        res.json(profiles)
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
})


//@route   GET api/profile/user/:userId
//@desc    get profile by user id
//@access  Public
router.get('/user/:user_id', async(req,res)=>{
    try {
        console.log(req.params.user_id)
        const profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar'])


        if(!profile) return res.status(400).json({msg:"Profile not found"})

        res.json(profile)
        
    } catch (error) {
        console.error(error.message)
        if(error.kind == 'ObjectId'){
            return res.status(400).json({msg:"Profile not found"})
        }
        res.status(500).send('Server error')
    }
})



//@route   DELETE api/profile/
//@desc    delete profile, user and posts
//@access  Private
router.delete('/',auth, async(req,res)=>{
    try {

        //@todo - romove users posts

        //romove profile
        await Profile.findOneAndDelete({user:req.user.id})

        //remove user
        await User.findOneAndDelete({_id:req.user.id})

        res.json({msg:"User deleted"})
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
})


//@route   PUT api/profile/experience
//@desc    add profile experience
//@access  Private
router.put('/experience', [auth,[
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'company is required').not().isEmpty(),
    check('from', 'from date is required').not().isEmpty(),
]], async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({user:req.user.id});

        profile.experience.unshift(newExp);

        await profile.save();

        res.json(profile);
    } catch (error) {
        console.error(error.message)
        res.status(500).json({msg:"server error"})
    }

})


//@route   Delete api/profile/experience/:exp_id
//@desc    delete profile experience
//@access  Private
router.delete('/experience/:exp_id', auth, async (req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.user.id});

        //Get remove index
        const removeIndex = profile.experience.map(item=>item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex,1)

        await profile.save()

        res.json({msg:"experience deleted"})

    } catch (error) {
        console.error(error.message)
        res.status(500).json({msg:"server error"})
    }
})



module.exports = router
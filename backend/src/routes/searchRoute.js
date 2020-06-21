const router = require('express').Router();
var twit = require('twit');


router.get('/details/:accountName', async (req,res) => {
    console.log('in search', req.params.accountName);
    let config =  {
        consumer_key: process.env.CONSUMER_KEY,  
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,  
        access_token_secret: process.env.ACCESS_TOKEN_secret
    }
    console.log({config});
    
    
    var Twitter = new twit(config);
    let params = {
        q: req.params.accountName,
        result_type: 'recent',
        lang: 'en'
    }
    let result = await Twitter.get('search/tweets', params);
    console.log("response=", result.data.statuses);
    res.status(200).json(result.data.statuses);
});

router.get('/names/:accountName', async (req,res) => {
    console.log('in fetching tweets', req.params.accountName);
    let config =  {
        consumer_key: process.env.CONSUMER_KEY,  
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,  
        access_token_secret: process.env.ACCESS_TOKEN_secret
    }
    console.log(config);
    
    
    var Twitter = new twit(config);
    let params = {
        q: req.params.accountName
    }
    let result = await Twitter.get('users/search', params);
    console.log("response=", result.data);
    let namesArray = result.data.map( user => ({
        username: user.name, 
        id: user.id, 
        screen_name: user.screen_name, 
        profile_image_url: user.profile_image_url
    }));
    res.status(200).json(namesArray);
});


module.exports = router;
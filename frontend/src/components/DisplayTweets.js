import React from 'react';

class DisplayTweets extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        console.log(this.props.user.username, this.props.user.screenName);
        
        return(
            <div className= 'flex-container'>
            {
                this.props.tweetsOfSelectedUser.map( tweet => {
                    return <div key= {tweet.id}>
                        <img style={{borderRadius: "50%"}} src = {this.props.user.profile_image_url} alt="image" />

                        <span style={{marginBottom: '0px'}}>
                            {this.props.user.username}
                        </span>

                        <span style={{float: "right"}}>
                            {tweet.created_at.split(" ")[1]}{` ${tweet.created_at.split(" ")[2]}`}{`, ${tweet.created_at.split(" ")[5]}`} 
                        </span>
                        
                        <small style={{display: 'block', marginBottom: "2px"}}>
                            @{this.props.user.screen_name}
                        </small>
                        {tweet.text}
                    </div>
                })
            }
            </div>
        )
    }
}

export default DisplayTweets;
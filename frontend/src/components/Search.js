import React from 'react';
import axios from 'axios';
import logo from '../images/twitter.png'

import '../styles/style.css';
import DisplayTweets from './DisplayTweets';

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchValue: '',
            searchedValueArray: [],
            tweetsOfSelectedUser: [],
            userSelectedBool: false,
            selectedUser: '',
            screenName: ''
        }
    }

    handleSearchValue = (e) => {
        e.preventDefault();
        console.log("in handleSearchValue...", e.target.value);
        this.setState({
            searchValue: e.target.value
        }, async() => {
            const options = {
                url: `http://localhost:5000/search/names/${this.state.searchValue}`,
                method: "GET"
            }
            let users = await axios(options);
            this.setState({
                searchedValueArray: users.data,
                userSelectedBool: false
            }, () => console.log("searchedValueArray=",this.state.searchedValueArray))
        })
        
    }

    handleGetTweets = async(user) => {
        // e.preventDefault();
        console.log("in handleGetTweets...", user.username);
        this.setState({
            searchValue: user.username,
            searchedValueArray: [],
            selectedUser: user
        }, ()=> console.log("screenName after clicking=", this.state.screenName));
        const options = {
            url: `http://localhost:5000/search/details/${this.state.searchValue}`,
            method: "GET"
        }
        let details = await axios(options);
        this.setState({
            tweetsOfSelectedUser: details.data,
            userSelectedBool: true
        }, () => console.log("searchedValueArray=",this.state.tweetsOfSelectedUser))
        
    }

    // handleSubmit = async() => {
    //     // e.preventDefault();
    //     console.log("in handleSubmit...", this.state.searchValue);
    //     this.setState({
    //         searchedValueArray: [],
    //         // screenName: user.screen_name
    //     });
    //     const options = {
    //         url: `http://localhost:5000/search/details/${this.state.searchValue}`,
    //         method: "GET"
    //     }
    //     let details = await axios(options);
    //     this.setState({
    //         tweetsOfSelectedUser: details.data,
    //         userSelectedBool: true
    //     }, () => console.log("searchedValueArray=",this.state.tweetsOfSelectedUser))
        
    // }

    render(){
        return(
            <div>
                <div className= 'searchbarParent'>
                    <div>
                        <h3 className="logo">TWEET</h3><img className="twitterlogo" src={logo} alt="twitter logo"/><h3 className="logo">SEARCH</h3>
                    </div>
                    <input className="searchbar" type='search' value = {this.state.searchValue} onChange={e => this.handleSearchValue(e)}/>
                    {/* <button onClick= { e=> this.handleSubmit()}>Search</button> */}
                    <div>
                        {
                            this.state.searchedValueArray? this.state.searchedValueArray.map( user => {
                            return <div key={user.id} onClick={e => this.handleGetTweets(user)}>{user.username}</div>
                            }) : '' 
                        }{
                            this.state.userSelectedBool ? 
                                <DisplayTweets 
                                    tweetsOfSelectedUser={this.state.tweetsOfSelectedUser} 
                                    // name={this.state.searchValue}
                                    // screenName= {this.state.screenName}
                                    // profile_image_url = {}
                                    user = {this.state.selectedUser}/> : ''
                        }
                    </div>
                </div>
            </div>
        )
    }
}


export default Search;
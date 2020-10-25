import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import axios from 'axios';

import Home from './Home';
import DynamicPage from './DynamicPage';
import NoMatch from './NoMatch';

class Tweet extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      hidden:"hidden"
    }
  }

  componentWillMount() {
    var that = this;
    setTimeout( () => {
      that.show();
    }, that.props.wait);
  }

  show() {
    this.setState({
      hidden : ""
    });
  }

  goToTweet(e,tweet) {
    e.preventDefault();
    window.open('https://twitter.com/'+tweet.user.screen_name+'/status/'+tweet.id_str, '_blank');
  }

  render() {
    return <div className={this.state.hidden}>
    <div className="tweet" onClick={(e) => this.goToTweet(e, this.props.tweet)}>
      <div className="tweet-user-info">
        <img className="tweet-user-img" src={this.props.tweet.user.profile_image_url} alt={this.props.tweet.user.screen_name}/>
        <span className="tweet-user-name">{this.props.tweet.user.name}</span><br/>
        <span className="tweet-user-username">@{this.props.tweet.user.screen_name}</span>
      </div>
      <div className="tweet-text">
        <p>{this.props.tweet.text}</p>
        <span className="tweet-datetime">{this.props.tweet.js_date}</span>
      </div>
    </div>
    </div>;
  }
}

class TrackApp extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      tweets: [],
      banIslamCount: 0,
      banShariaCount: 0,
      civilizationJihadCount: 0,
      islamIsTheProblemCount: 0,
      civilizationJihadCount: 0,
      totalHashTagCount: 0,
      totalCount: 0
    };
  }

  componentDidMount() {
    var _this = this;
    const tweet = 'https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/search/tweets.json?q=node.js';
    this.serverRequest =
      axios
        .get("/api/gettweets")
        .then(function(result) {
          _this.setState({
            tweets: result.data[0].latestTweets,
            banIslamCount: result.data[0].banIslamCount,
            banShariaCount: result.data[0].banShariaCount,
            civilizationJihadCount: result.data[0].civilizationJihadCount,
            islamIsTheProblemCount: result.data[0].islamIsTheProblemCount,
            civilizationJihadCount: result.data[0].civilizationJihadCount,
            totalHashTagCount: result.data[0].banIslamCount + result.data[0].banShariaCount + result.data[0].islamIsTheProblemCount + result.data[0].civilizationJihadCount,
            totalCount: result.data[0].totalCount
          });
        })
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    return (
      <div className="container">
        <div className="row counts">
          <div className="col-md-3 col-sm-6">
             <div className="count-boxes cyan">
               <h1><NumberFormat value={this.state.banIslamCount} displayType={'text'} thousandSeparator={true} /></h1>
               <p className="hashtag">#BanIslam</p>
             </div>
          </div>
          <div className="col-md-3 col-sm-6">
           <div className="count-boxes green">
              <h1><NumberFormat value={this.state.banShariaCount} displayType={'text'} thousandSeparator={true} /></h1>
              <p className="hashtag">#BanSharia</p>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="count-boxes red">
              <h1><NumberFormat value={this.state.islamIsTheProblemCount} displayType={'text'} thousandSeparator={true} /></h1>
              <p className="hashtag">#IslamIsTheProblem</p>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
           <div className="count-boxes yellow">
              <h1><NumberFormat value={this.state.civilizationJihadCount} displayType={'text'} thousandSeparator={true} /></h1>
              <p className="hashtag">#CivilizationJihad</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="total-counts">
              <p>Total tweets with the 4 main hashtags</p>
              <div className="total-number"><NumberFormat value={this.state.totalHashTagCount} displayType={'text'} thousandSeparator={true} /></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="total-counts">
              <p>Total tweets collected</p>
              <div className="total-number"><NumberFormat value={this.state.totalCount} displayType={'text'} thousandSeparator={true} /></div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <canvas id="all-time-chart"></canvas>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <div className="download">
              <a href="/dataset">Download Complete Dataset</a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 divider">
            <h3 className="latest-tweets">Latest Tweets</h3>
          </div>
        </div>
        <div className="row">
        {this.state.tweets.map(function(tweet, index) {
          return (
            <div className="col-md-4 col-sm-6">
            <Tweet tweet={tweet} wait={1000*index} />
            </div>
          );
        })}
        </div>
      </div>
    )
  }
}


export default TrackApp;




//var appRoot = document.getElementById('app');

//ReactDOM.render(template, appRoot);

//Babel is javascript compiler
//babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch
//live-server public
//only a single root element in jsx template
//ex: <div><h1>Indecision App</h1><p>This is some info</p></div>
//var username = "test"  <h1>{username}</h1>

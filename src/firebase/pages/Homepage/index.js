import React, { useState, useEffect } from 'react';
import NewTweet from '../../components/NewTweet';
import Tweet from "../../components/Tweet";
import {db} from "../../services/index";
import PageHeader from '../../customComponents/PageHeader';
import Spinner from '../../customComponents/Spinner';
import TwitterButton from '../../customComponents/TwitterButton';

export default function Homepage() {
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTweetsHandler = async () => {
    try {
      setIsLoading(true);
      db.ref('tweets').on("value", (snapshot) => {
        let tweetList = [];
        snapshot.forEach((snap) => {
          let obj2 = {};
          Object.assign(obj2, snap.val(), {id: snap.key});
          tweetList.push(obj2);
        });
        const sortedTweetList = tweetList.sort(function (a, b) {
          return new Date(b.time) - new Date(a.time);
        });
        setTweets(sortedTweetList);
        setIsLoading(false);
      });
    } catch (error) {
      // this.setState({ readError: error.message });
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchTweetsHandler();
  }, []);

  return (
    <div>
      <PageHeader title="Home" />
      <Spinner open={isLoading}/>
      <NewTweet />
      <div>
        {tweets.map((item) => <Tweet key={item.id} item={item} homepage />)}
      </div>
    </div>
  );
}
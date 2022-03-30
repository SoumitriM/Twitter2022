import React, { useState, useEffect } from 'react';
import NewTweet from '../../components/NewTweet';
import Tweet from "../../components/Tweet";
import {db} from "../../services/index";
import PageHeader from '../../customComponents/PageHeader';
import { Spinner } from '../../customComponents/Spinner';

export default function Homepage() {
  const [tweets, setTweets] = useState([]);

  const fetchMoviesHandler = async () => {
    try {
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
      });
    } catch (error) {
      // this.setState({ readError: error.message });
    }
  }
  useEffect(() => {
    fetchMoviesHandler();
  }, []);

  return (
    <div>
      <PageHeader title="Home" />
      <Spinner/>
      <NewTweet />
      <div>
        {tweets.map((item) => <Tweet key={item.id} item={item} homepage />)}
      </div>
    </div>
  );
}
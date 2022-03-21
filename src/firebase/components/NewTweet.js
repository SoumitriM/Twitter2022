import { Grid } from '@material-ui/core';
import profilePic from '../constants/profile_pic.jpg';
import { makeStyles } from '@material-ui/core';
import Card from '../customComponents/Card';
import { db, auth } from '../services/index';
import TwitterButton from '../customComponents/TwitterButton';
import ActionBar from '../customComponents/ActionBar';
import { useEffect, useRef, useState } from 'react';
// import {storage} from "../firebase";
import { storage } from '../services/index';

const NewTweet = () => {
  const newTweetInput = useRef("");
  var tweet = "";
  const [image, setImage] = useState(null);
  const [isImage, setIsImage] = useState(false);
  const [user, setUser] = useState();
  const [currUserDet, setCurrUserDet] = useState({});

  useEffect(() => {
    setUser(auth().currentUser);
  }, []);

  useEffect(() => {
    db.ref('users/' + auth().currentUser.uid).on("value", snapshot => {
      const userDetail = snapshot.val();
      setCurrUserDet(userDetail);
      // console.log(userDetail);
    })
  }, []);

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setIsImage(true);
    }
  }

  const newTweetHandler = (e) => {
    e.preventDefault();
    if (isImage === true) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      setIsImage(false);
      uploadTask.on(
        "state_changed",
        snapshot => { },
        error => {
        },
        () => {
          storage.ref("images").child(image.name).getDownloadURL()
            .then(url => {
              addTweetHandler({
                username: currUserDet.username,
                userId: currUserDet.userId,
                uid: currUserDet.uid,
                time: new Date().toJSON(),
                tweet: newTweetInput.current.value,
                image: true,
                imageURL: url
              });
            });

        }

      );
    }

    else if (isImage === false) {
      addTweetHandler({
        username: currUserDet.username,
        userId: currUserDet.userId,
        uid: currUserDet.uid,
        time: new Date().toJSON(),
        tweet: newTweetInput.current.value,
        image: false
      });

    }
    newTweetInput.current.value = "";
  }
  async function addTweetHandler(tweet) {
    const newReference = db.ref('tweets').push();
    const obj = {};
    Object.assign(obj, tweet, { id: newReference.key });
    newReference.set(obj);
  };
  return (
    <Card>
      <Grid container>
        <Grid item xs={2} md={2}>
          <img className="profile-pic" src={currUserDet.photoUrl} alt="profile-picture" />
        </Grid>
        <Grid item xs={10} md={10}>
          <div className=" tweet-form">
            <input type="text" name="tweet" placeholder="What's Happening?" ref={newTweetInput} />
            <ActionBar />
            <TwitterButton onClick={newTweetHandler} label="Tweet" />
          </div>
          {isImage && <p>{image.name}</p>}
        </Grid>
      </Grid>
    </Card>


  );
}

export default NewTweet;
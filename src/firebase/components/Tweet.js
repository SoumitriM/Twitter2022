import { Grid } from '@material-ui/core';
import profilePic from '../constants/profile_pic.jpg';
import ReplyDialog from './ReplyDialog';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../customComponents/Card';
import { db, auth } from '../services/index';
import { timestamp, ConvertToArray } from '../../utils';


const Tweet = (props) => {
  const { item, showReplies, parentId } = props;
  const history = useHistory();
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [time, setTime] = useState("");
  const [openReplyDialog, setOpenReplyDialog] = useState(false);
  const [replyData, setReplyData] = useState([]);
  const [user, setUser] = useState([]);
  const [firstReply, setFirstReply] = useState(false);
  let tweetTime = new Date();
  if (parentId && parentId !== '') {
    var newIdString = `${parentId}/replies/${item.id}`;
  } else var newIdString = `${item.id}`;

  console.log(newIdString);
  useEffect(() => {
    setUser(auth().currentUser);
    //console.log('dd', auth().currentUser, auth().currentUser.email);
  }, [item]);

  // useEffect(() => {
  //   db.ref(`users/${user.userId}`).on("value", (snapshot) => {
  //     //const obj = snapshot[0].val();
  //     console.log('snapshot', snapshot);
  //     const newObj = Object.assign({}, user);
  //     setUser(newObj);
  //     console.log('userDet', newObj);
  //     // console.log(newObj);
  //   });
  // }, [item]);

  useEffect(() => {
    tweetTime = item.time;
    var time_string = timestamp(tweetTime);
    setTime(time_string);
  }, [item]);

  useEffect(() => {
    const replies = ConvertToArray(item.replies);
    const sortedReplies = replies.sort(function (a, b) {
      return new Date(b.time) - new Date(a.time);
    });
    setReplyData(sortedReplies);
  }, [item]);

  const likeHandler = (event) => {
    event.stopPropagation();
    let newLikeCount = 0;
    if (like === true) {
      newLikeCount = likeCount - 1;
      setLikeCount(newLikeCount);
      setLike(false);
    }
    else if (like === false) {
      newLikeCount = likeCount + 1;
      setLikeCount(newLikeCount);
      setLike(true);
    };

  }
  const handleOpenReplyDialog = (e) => {
    e.stopPropagation();
    console.log(e.target);
    setOpenReplyDialog(true);
  }

  const handleReplyMessage = (message) => {
    const { item } = props;
    const newReply = {
      username: user.displayName,
      userId: user.email,
      time: new Date().toJSON(),
      tweet: message,
      image: false
    }
    addTweetHandler(newReply, item.id);
  }

  const showTweetDetailsHandler = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    console.log("kk", e.preventDefault());
    history.push(`/${item.username}/${item.id}`);
  }

  async function addTweetHandler(newReply, id) {
    console.log("dd", newIdString);
    const replyRef = db.ref(`tweets/${newIdString}/replies`).push();
    console.log(replyRef);
    const obj = {};
    Object.assign(obj, newReply, { id: replyRef.key });
    replyRef.set(newReply);
    setOpenReplyDialog(false);
  };

  const likeIcon = like ? "heart" : "heart-outline";

  return (
    <Card onClick={(e) => showTweetDetailsHandler(e)}>
      <Grid container>
        <Grid item xs={2} md={2}>
          {/* <img className="profile-pic" src={user.PhotoUrl} alt="user pic" /> */}
        </Grid>
        <Grid item xs={10} md={10}>
          <div className="tweet-header">
            <li key={item.username} className="tweet-username">{item.username}</li>
            <li key={item.userId} className="tweet-userId">@{item.userId}</li>
            <li key={item.id} style={{ fontSize: "0.3rem", margin: "0 0.5rem 0 0.5rem", color: "grey" }}><ion-icon name="time"></ion-icon></li>
            <li key={time} style={{ color: "grey" }}>{time}</li>
          </div>
          {item.image && <img src={item.imageURL} className="tweet-image" alt="tweet-image" />}
          <p>{props.item.tweet}</p>
          <div className="tweet-icons">
            <ul>
              <li><ion-icon name="chatbubble-outline" onClick={handleOpenReplyDialog}></ion-icon><span className="react-count">{replyData.length > 0 ? replyData.length : ''}</span></li>
              <li><ion-icon name="repeat-outline"></ion-icon></li>
              <li onClick={likeHandler}><ion-icon name={likeIcon}></ion-icon><span className="react-count">{likeCount}</span></li>
              <li><ion-icon name="share-outline"></ion-icon></li>
            </ul>
          </div>
        </Grid>
      </Grid>
      <ReplyDialog openDialog={openReplyDialog} onReply={handleReplyMessage} />
      {showReplies && replyData.length > 0 && replyData.map((reply) => (
        <Tweet item={reply} showReplies="false" parentId={newIdString} />
      ))}
    </Card>
  )
};
export default Tweet;
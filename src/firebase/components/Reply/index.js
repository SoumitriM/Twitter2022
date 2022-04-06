// import { Grid } from '@material-ui/core';
// import ReplyDialog from '../ReplyDialog';
// import { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { db, auth } from '../../services';
// import { timestamp, ConvertToArray } from '../../../utils';
// import './style.css';


// const Reply = (props) => {
//   const { item, author, parentId } = props;
//   const history = useHistory();
//   const [like, setLike] = useState(false);
//   const [likeCount, setLikeCount] = useState(0);
//   const [time, setTime] = useState("");
//   const [openReplyDialog, setOpenReplyDialog] = useState(false);
//   const [replyData, setReplyData] = useState([]);
//   const [user, setUser] = useState({});
//   const [currUser, setCurrUser] = useState({});
//   const [currUserDet, setCurrUserDet] = useState({});
//   const [profilePic, setProfilePic] = useState();
//   const [firstReply, setFirstReply] = useState(false);
//   let tweetTime = new Date();
//   const [dp, setDp] = useState(profilePic);

//   if (parentId && parentId !== '') {
//     var newIdString = `${parentId}/replies/${item.id}`;
//   } else var newIdString = `${item.id}`;

//   useEffect(() => {
//     setCurrUser(auth().currentUser);
//   }, [item]);

//   useEffect(() => {
//     db.ref('users/' + auth().currentUser.uid).on("value", snapshot => {
//       const userDetail = snapshot.val();
//       setCurrUserDet(userDetail);
//     })
//   }, [item]);
//   useEffect(() => {
//     db.ref('users/' + item.uid).on("value", snapshot => {
//       let ddp = snapshot.val();
//       if (ddp !== null && 'photoUrl' in ddp) {
//         setDp(ddp.photoUrl);
//         console.log('dp', ddp.photoUrl, item.uid);
//       }
//     })
//   }, [item]);

//   useEffect(() => {
//     tweetTime = item.time;
//     var time_string = timestamp(tweetTime);
//     setTime(time_string);
//   }, [item]);

//   useEffect(() => {
//     const replies = ConvertToArray(item.replies);
//     const sortedReplies = replies.sort(function (a, b) {
//       return new Date(b.time) - new Date(a.time);
//     });
//     setReplyData(sortedReplies);
//   }, [item]);

//   const likeHandler = (event) => {
//     let newLikeCount = 0;
//     if (like === true) {
//       newLikeCount = likeCount - 1;
//       setLikeCount(newLikeCount);
//       setLike(false);
//     }
//     else if (like === false) {
//       newLikeCount = likeCount + 1;
//       setLikeCount(newLikeCount);
//       setLike(true);
//     };

//   }

//   const handleOpenReplyDialog = (e) => {
//     setOpenReplyDialog(true);
//   }

//   const handleReplyMessage = (message) => {
//     const { item } = props;
//     const newReply = {
//       userId: currUserDet.userId,
//       uid: currUserDet.uid,
//       username: currUserDet.username,
//       time: new Date().toJSON(),
//       tweet: message,
//       image: false
//     }
//     console.log(newReply);
//     addReplyHandler(newReply, item.id);
//   }

//   const showTweetDetailsHandler = (e) => {
//     history.push(`/${item.username}/${item.id}`);
//   }

//   async function addReplyHandler(newReply, id) {
//     const replyRef = db.ref(`tweets/${newIdString}/replies`).push();
//     const obj = {};
//     Object.assign(obj, newReply, { id: replyRef.key });
//     replyRef.set(newReply);
//     setOpenReplyDialog(false);
//   };

//   const actionHandler = (e) => {
//     const closestEl = e.target.closest("[data-action]");
//     let action = '';
//     if (closestEl) {
//       action = closestEl.dataset.action;
//     }
//     if (action === 'like') {
//       likeHandler();
//     } if (action === 'reply') {
//       handleOpenReplyDialog();
//     } if (action === 'ok') {
//       showTweetDetailsHandler();
//     } else if (action === '') {
//       showTweetDetailsHandler();
//     }
//   }

//   const likeIcon = like ? "heart" : "heart-outline";

//   return (
//     <div className='tweet-container' onClick={(e) => actionHandler(e)}>
//       <div className="profile-pic-div">
//         <img className="profile-pic" src={dp} alt="user pic" />
//       </div>
//       <div className='tweet-body'>
//         <div className="tweet-header">
//           <li key={item.username} className="tweet-username">{item.username}</li>
//           <li key={item.userId} className="tweet-userId">@{item.userId}</li>
//           <li key={item.id} style={{ fontSize: "0.3rem", margin: "0 0.5rem 0 0.5rem", color: "grey" }}><ion-icon name="time"></ion-icon></li>
//           <li key={time} style={{ color: "grey" }}>{time}</li>
//         </div>
//         <div>Replying to {author}</div>
//         {item.image && <img src={item.imageURL} className="tweet-image" alt="tweet-image" />}
//         <p className="tweet-content">{props.item.tweet}</p>
//         <div className="tweet-icons">
//           <ul>
//             <li data-action="reply"><ion-icon name="chatbubble-outline"></ion-icon><span className="react-count">{replyData.length > 0 ? replyData.length : ''}</span></li>
//             <li><ion-icon name="repeat-outline"></ion-icon></li>
//             <li data-action="like"><ion-icon name={likeIcon}></ion-icon><span className="react-count">{likeCount}</span></li>
//             <li><ion-icon name="share-outline"></ion-icon></li>
//           </ul>
//         </div>
      
//       {showReplies && replyData.length > 0 && replyData.map((reply) => (
//         <Reply item={reply} parentId={newIdString} />
//       ))}
//       </div>
//       <ReplyDialog openDialog={openReplyDialog} onReply={handleReplyMessage} />
//     </div>
//   )
// };
// export default Reply;
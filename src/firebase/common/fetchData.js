import { db, auth } from "../services";

export const getUserDetails = () => {
  const res = db.ref('users/' + auth().currentUser.uid).on("value", snapshot => {
    return snapshot.val();
  }).catch(error => { });
};

export const updateUserDetails = (userData) => {
  db.ref('users' + auth().currentUser.uid).update(userData).catch((error) => { });
};

export const postReply = (newReply, newIdString) => {
  const replyRef = db.ref(`tweets/${newIdString}/replies`).push();
  const obj = {};
  Object.assign(obj, newReply, { id: replyRef.key });
  replyRef.set(newReply);
  setOpenReplyDialog(false);
};

export const postTweet = (tweet) => {
  const newReference = db.ref('tweets').push();
  const obj = {};
  Object.assign(obj, tweet, { id: newReference.key });
  newReference.set(obj);
};
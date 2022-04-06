import { useRef, useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import profilePic from '../../constants/profile_pic.jpg';
import { Dialog } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import TwitterButton from '../../customComponents/TwitterButton';
import ActionBar from '../../customComponents/ActionBar';
import { db, auth, storage } from '../../services';

export default function ReplyDialog(props) {
  const { openDialog, onReply } = props;
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [currUserDet, setCurrUserDet] = useState({});

  useEffect(() => {
    db.ref('users/' + auth().currentUser.uid).on("value", snapshot => {
      const userDetail = snapshot.val();
      setCurrUserDet(userDetail);
      // console.log(userDetail);
    })
  }, []);


  const newTweetInput = useRef("");

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setIsImage(true);
    }
  }

  const newReplyHandler = (e) => {
    e.preventDefault();
    onReply(newTweetInput.current.value);
  }

  return (
      <Dialog open={openDialog} >
        <div className='replyDialog'>
          <div className="profile-pic-div"><img className="profile-pic" src={currUserDet.photoUrl} alt="profile-picture" /></div>
          <div className="tweet-form">
            <input type="textField" className="tweet-textfield" cols="5" rows="5" placeholder="Type your reply here" ref={newTweetInput} />
            <ActionBar onTweetBtnClick={newReplyHandler} onImageClick={handleImageUpload}/>
          </div>
          {isImage && <p>{image.name}</p>}
      </div>
      </Dialog>
  );
}

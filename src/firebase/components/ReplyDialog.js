import { useRef, useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import profilePic from '../constants/profile_pic.jpg';
import { Dialog } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import Card from '../customComponents/Card';
import TwitterButton from '../customComponents/TwitterButton';
import ActionBar from '../customComponents/ActionBar';

export default function ReplyDialog(props) {
  const { openDialog, onReply } = props;
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);

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
    <div>
      <Dialog open={openDialog} >
        <div className="replyDialog">
          <Card>
            <Grid container>
              <Grid item xs={2} md={2}>
                <img className="profile-pic" src={profilePic} alt="profile-picture" />
              </Grid>
              <Grid item xs={10} md={10}>
                <div className=" tweet-form">
                  <input type="text" name="tweet" placeholder="Type your reply here" ref={newTweetInput} />
                  <ActionBar onTweetBtnClick={newReplyHandler} onImageClick={handleImageUpload}/>
                </div>
                {isImage && <p>{image.name}</p>}
              </Grid>
            </Grid>
          </Card>

        </div>
      </Dialog>
    </div>
  );
}

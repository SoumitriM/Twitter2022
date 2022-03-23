import { useRef, useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Card from '../../customComponents/Card';
import RoundButton from '../../customComponents/RoundButton';
import TwitterButton from '../../customComponents/TwitterButton';


export default function EditModal(props) {
  const { open, onSave, onClose, coverPicture, profilePicture } = props;
  const [coverPic, setCoverPic] = useState(null);
  const [image, setImage] = useState(null);

  const newTweetInput = useRef("");

  const handleCoverPictureUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  const handleDisplayPictureUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  return (
    <div>
      <Dialog open={open} >
        <div className="editModal">
          <div className="editModalHeader">
            <div className="editModalHeaderLeft">
              <div className="closeIcon" onClick={onClose}><CloseIcon /></div>
              <h2>Edit Profile</h2>
            </div>
            <div className="editModalHeaderRight">
              <TwitterButton label="Save" />
            </div>
          </div>
          <div className="editModalUploadSection">
            <div className="uploadCoverPicture">
              <img className="editModalCoverPicture" src={coverPicture} alt="cover photo" />
              <div className="uploadImageBtn"><RoundButton /></div>
            </div>
            <div className="uploadDisplayPicture">
              <img className="editModalDisplayPicture" src={profilePicture} alt="profile picture" />
              <div className="uploadImageBtn"><RoundButton /></div>
            </div>
          </div>
          <div className="editModalUpdateSection">
          <TextField label="Name" variant="outlined" />
          <TextField label="Bio" variant="outlined" multiline rows={5} />
          <TextField label="Location" variant="outlined" />
          </div>

        </div>
      </Dialog>
    </div>
  );
}

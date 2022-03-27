import { useRef, useState, useEffect } from 'react';
import { storage } from '../../services/index';
import { Button } from '@material-ui/core';
import { Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Card from '../../customComponents/Card';
import RoundButton from '../../customComponents/RoundButton';
import TwitterButton from '../../customComponents/TwitterButton';


export default function EditModal(props) {
  const { coverPicture, open, onSave, onClose, profileDetails } = props;
  const [coverPic, setCoverPic] = useState(null);
  const [image, setImage] = useState(null);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    setUserDetails(profileDetails);
  }, []);

  const newUserName = useRef("");
  const newBio = useRef("");
  const newLocation = useRef("");

  useEffect(() => {
    setUserDetails(profileDetails);
    setImage(profileDetails.photoUrl);
    setCoverPic(coverPicture)
    console.log('ref->', newUserName.current);
  })

  const handlePictureUpload = (e, type) => {
    if (e.target.files[0]) {
      putImage(e.target.files[0], type);
    }
  }

  function putImage(image, type) {
    let userDetails = {};
    const uploadTask = storage.ref(`${type}/${profileDetails.uid}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => { },
      error => {
        console.log(error)
      },
      () => {
        storage.ref(`${type}`).child(`${profileDetails.uid}`).getDownloadURL()
          .then(url => {
            type === 'profilepictures' ? setImage(url) : setCoverPic(url);
          })

      }

    );
  }

  const saveUserDetails = () => {
    const updatedUserDetails = {
      ...profileDetails,
      username: newUserName.current.value,
      bio: newBio.current.value,
      location: newBio.current.value,
      coverPicture: coverPic,
      photoUrl: image
    }
    onSave(updatedUserDetails);
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
              <TwitterButton onClick={saveUserDetails} label="Save" />
            </div>
          </div>
          <div className="editModalUploadSection">
            <div className="uploadCoverPicture">
              <img className="editModalCoverPicture" src={coverPic} alt="cover photo" />
              <div className="uploadImageBtn"><RoundButton onChange={(e) => handlePictureUpload(e, 'coverpictures')} /></div>
            </div>
            <div className="uploadDisplayPicture">
              <img className="editModalDisplayPicture" src={image} alt="profile picture" />
              <div className="uploadImageBtn"><RoundButton onChange={(e) => handlePictureUpload(e, 'profilepictures')} /></div>
            </div>
          </div>
          <div className="editModalUpdateSection">
            <TextField label="Name" variant="outlined" inputRef={newUserName} />
            <TextField label="Bio" variant="outlined" multiline rows={5} inputRef={newBio} />
            <TextField label="Location" variant="outlined" inputRef={newLocation} />
          </div>

        </div>
      </Dialog>
    </div>
  );
}

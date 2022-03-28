import { useRef, useState, useEffect } from 'react';
import { storage } from '../../services/index';
import { Dialog } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import RoundButton from '../../customComponents/RoundButton';
import TwitterButton from '../../customComponents/TwitterButton';
import sampleDp from '../../constants/blankDp.jpeg';
import sampleCp from '../../constants/coverPicture.png';

export default function EditModal(props) {
  const { coverPicture, open, onSave, onClose, profileDetails } = props;
  const [coverPic, setCoverPic] = useState(sampleCp);
  const [dp, setDp] = useState(sampleDp);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    setUserDetails(profileDetails);
  }, []);

  const newUserName = useRef("");
  const newBio = useRef("");
  const newLocation = useRef("");

  useEffect(() => {
    if(profileDetails.photoUrl){
      console.log('i am here');
      setDp(profileDetails.photoUrl);
    }
    if(profileDetails.coverPicture){
      setCoverPic(profileDetails.coverPicture);
    }
    setUserDetails(profileDetails);
    console.log('ref->', newUserName.current);
  }, []);

  const handlePictureUpload = (e, type) => {
    console.log(coverPic);
    if (e.target.files[0]) {
      putImage(e.target.files[0], type);
    }
  }

  function putImage(image, type) {
    let userDetails = {};
    const uploadTask = storage.ref(`${type}/${profileDetails.userId}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => { },
      error => {
        console.log(error)
      },
      () => {
        storage.ref(`${type}`).child(`${profileDetails.userId}`).getDownloadURL()
          .then(url => {
            console.log(url, type);
            if (type === 'profilepictures') {
              setDp(url);
            }
            if (type === 'coverpictures') {
              setCoverPic(url);
            }
          })

      }

    );
  }

  const saveUserDetails = () => {
    const updatedUserDetails = {
      ...profileDetails,
      username: newUserName.current.value,
      bio: newBio.current.value,
      location: newLocation.current.value,
      coverPicture: coverPic,
      photoUrl: dp
    }
    console.log('saved->', updatedUserDetails);
    onSave(updatedUserDetails);
  }

  const handleCloseModal = () => {
    onClose();
    if(profileDetails.photoUrl){
      setDp(profileDetails.photoUrl);
    } else setDp(sampleDp);
    if(profileDetails.coverPicture){
      setCoverPic(profileDetails.coverPicture);
    } else setCoverPic(sampleCp);
  }

  return (
    <div>
      <Dialog open={open} >
        <div className="editModal">
          <div className="editModalHeader">
            <div className="editModalHeaderLeft">
              <div className="closeIcon" onClick={handleCloseModal}><CloseIcon /></div>
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
              <img className="editModalDisplayPicture" src={dp} alt="profile picture" />
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

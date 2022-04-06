import { useRef, useState, useEffect } from 'react';
import { db, auth, storage } from '../../services/';
import { Dialog } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import RoundButton from '../../customComponents/RoundButton';
import TwitterButton from '../../customComponents/TwitterButton';
import Spinner from '../../customComponents/Spinner';
import sampleDp from '../../constants/blankDp.jpeg';
import sampleCp from '../../constants/coverPicture.png';
import './style.css';

export default function EditModal(props) {
  const { open, onSave, onClose, profileDetails } = props;
  const [coverPic, setCoverPic] = useState(null);
  const [dp, setDp] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    db.ref(`users/${auth().currentUser.uid}`).on("value", snapshot => {
      const userDetail = snapshot.val();
      setUserDetails({...userDetail});
      if(userDetail.photoUrl){
        console.log('i am here');
        setDp(userDetail.photoUrl);
      }
      if(userDetail.coverPicture){
        setCoverPic(userDetail.coverPicture);
      }
      setLoading(false);
    })
  }, []);

  // useEffect(() => {
  //   setUserDetails(profileDetails);
  // }, []);

  const newUserName = useRef(userDetails.username);
  const newBio = useRef("");
  const newLocation = useRef("");

  useEffect(() => {
    console.log('dp', dp);
  })

  const handlePictureUpload = (e, type) => {
    setLoading(true);
    console.log(coverPic);
    if (e.target.files[0]) {
      putImage(e.target.files[0], type);
    }
  }

  function putImage(image, type) {
    let userDetails = {};
    const uploadTask = storage.ref(`${type}/${userDetails.userId}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => { },
      error => {
        console.log(error)
      },
      () => {
        storage.ref(`${type}`).child(`${userDetails.userId}`).getDownloadURL()
          .then(url => {
            console.log(url, type);
            if (type === 'profilepictures') {
              setDp(url);
            }
            if (type === 'coverpictures') {
              setCoverPic(url);
            }
            setLoading(false);
          })

      }

    );
  }

  const handleUserDetailsUpdate = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name] : e.target.value
    });
  };

  const saveUserDetails = () => {
    let updatedUserDetails = {...userDetails};
    if (coverPic) updatedUserDetails = {...updatedUserDetails, coverPicture: coverPic};
    if (dp) updatedUserDetails = {...updatedUserDetails, photoUrl: dp};
    console.log('saved->', updatedUserDetails);
    onSave(updatedUserDetails);
  }

  const handleCloseModal = () => {
    onClose();
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
              {loading && <Spinner open={loading}/>}
              <img className="editModalCoverPicture" src={coverPic || sampleCp} alt="cover photo" />
              <div className="uploadImageBtn"><RoundButton onChange={(e) => handlePictureUpload(e, 'coverpictures')} /></div>
            </div>
            <div className="uploadDisplayPicture">
              <img className="editModalDisplayPicture" src={dp || sampleDp} alt="profile picture" />
              <div className="uploadImageBtn"><RoundButton onChange={(e) => handlePictureUpload(e, 'profilepictures')} /></div>
            </div>
          </div>
          <div className="editModalUpdateSection">
            <TextField label="Name" name="username" variant="outlined" value={userDetails.username || ""} onChange={handleUserDetailsUpdate}/>
            <TextField label="Bio" name="bio" variant="outlined" value={userDetails.bio || ""} multiline rows={5} onChange={handleUserDetailsUpdate}/>
            <TextField label="Location" name="location" variant="outlined" value={userDetails.location || ""} onChange={handleUserDetailsUpdate}/>
          </div>

        </div>
      </Dialog>
    </div>
  );
}

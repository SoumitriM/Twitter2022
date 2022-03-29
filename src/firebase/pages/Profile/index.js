import React, { useState, useEffect } from 'react';
import Tweet from "../../components/Tweet";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Card from '../../customComponents/Card';
import { db, auth } from "../../services/index";
import PageHeader from '../../customComponents/PageHeader';
import coverPicture from '../../constants/coverPicture.png';
import blankDp from '../../constants/blankDp.jpeg'
import EditModal from '../../components/EditModal';
export default function Profile() {
  const [currUserDet, setCurrUserDet] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    console.log('before', currUserDet);
    db.ref(`users/${auth().currentUser.uid}`).on("value", snapshot => {
      const userDetail = snapshot.val();
      setCurrUserDet({ ...userDetail });
      console.log(userDetail);
    })
  }, []);

  const handleCLoseModal = () => {
    setOpenEditModal(false);
  }

  const handleEditModal = () => {
    setOpenEditModal(true);
  }

  const updateUserDetails = (userData) => {
    const obj = {};
    obj[`users/${auth().currentUser.uid}`] = userData;
    db.ref().update(obj).then(() => alert('updated')).catch((error) => { });
    handleCLoseModal();
  };

  return (
    <div>
      <PageHeader title={currUserDet.username} subheading="3 Tweets" />
      <Card>
        <div className="userProfile">
          <img className="profileCoverPhoto" src={currUserDet.coverPicture || coverPicture} alt="cover photo" />
          <img className="displayPicture" src={currUserDet.photoUrl || blankDp} alt="profile picture" />
          <div className="buttonSection">
            <div className="whiteBtn" onClick={handleEditModal}>Edit Profile</div>
          </div>
          <div className="userDetails">
            <p className="tweet-username">{currUserDet.username}</p>
            <p className="tweet-userId">@{currUserDet.userId}</p>
            <div className="additionalUserDetails">
              {currUserDet.bio && <p>{currUserDet.bio}</p>}
              {currUserDet.location && <p className='greyFont'><LocationOnOutlinedIcon />{currUserDet.location}</p>}
              <div className="followDetails">
                <p className="greyFont"><span className="blackFont">5</span> Following</p>
                <p className="greyFont"><span className="blackFont">10</span> Followers</p>
              </div>
            </div>

          </div>
        </div>
      </Card>
      {openEditModal &&
        <EditModal
          coverPicture={coverPicture}
          open={openEditModal}
          onClose={handleCLoseModal}
          onSave={updateUserDetails}
          profileDetails={currUserDet}
        />}
    </div>
  );
}
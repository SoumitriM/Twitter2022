import { auth, db } from './index';
import { storage } from './index';
import { useHistory } from 'react-router-dom';
export const signup = (email, password, username, userId, photoUrl) => {
  return auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      console.log(res);
      const user = auth().currentUser;
      console.log(email, user.uid, password, username, userId, photoUrl);
      putImage( email, user.uid, username, userId, photoUrl);
      return user.updateProfile({
        email: email,
        displayName: username,
      });
    });
}

function writeUserData(user) {
  db.ref('users/' + user.uid).set(user).catch(error => {
    console.log(error.message);
  });
}
function putImage( email, uid, username, userId, image) {
  let userDetails = {};
  const uploadTask = storage.ref(`profilepictures/${uid}`).put(image);
  uploadTask.on(
    "state_changed",
    snapshot => { },
    error => {
      console.log(error)
    },
    () => {
      storage.ref("profilepictures").child(uid).getDownloadURL()
        .then(url => {
          userDetails = {
            userId: userId,
            email: email,
            username: username,
            photoUrl: url,
            uid: uid
          }
          return userDetails;
        }).then(userDet => writeUserData(userDet));

    }

  );
}
export function signin(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}

export function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
}
export function signOut() {
  console.log('here');
  return auth().signOut();
}
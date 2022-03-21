import { auth, db } from './index';
import { storage } from './index';
import { Redirect } from 'react-router-dom';
export const signup = (email, password, username, userId, photoUrl) => {
  return auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const user = auth().currentUser;
      putImage( email, user.uid, username, userId, photoUrl);
      return user.updateProfile({
        email: email,
        displayName: username
      });
    });
}

function writeUserData(user) {
  db.ref('users/' + user.uid).set(user).catch(error => {
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
  return auth().signOut();
}
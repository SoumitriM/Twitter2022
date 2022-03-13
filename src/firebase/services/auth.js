import { auth, db } from './index';

export function signup(email, password, username, userId, photoUrl) {
  return auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      console.log(res);
      const user = auth().currentUser;
      console.log(email, password, username, userId, photoUrl);
      var userDetails = {
        userId: userId,
        email: email,
        username: username,
        PhotoUrl: photoUrl
      }
      writeUserData(userDetails);
      return user.updateProfile({
        email: email,
        displayName: username
      });
    });
}

function writeUserData(user) {
  db.ref('users/' + user.userId).set(user).catch(error => {
      console.log(error.message);
  });
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
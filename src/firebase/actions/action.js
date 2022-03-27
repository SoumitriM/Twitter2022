import { Dispatch } from "react";
import { db, auth } from "../services/index";

export const userDetails = (payload) => ({
  type: 'USER DETAILS',
  payload
});

export const getUserDetails = () => (dispatch) => {
  db.ref('users/' + auth().currentUser.uid).on("value", snapshot => {
    const userDetail = snapshot.val();
    dispatch(userDetails(userDetail));
  });
};

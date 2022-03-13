import { Dialog, DialogTitle, DialogActions, Button, DialogContent, TextField } from "@material-ui/core";
import { useState } from "react";
import TwitterButton from "../../customComponents/TwitterButton";
import "./index.css";
import { signup, signInWithGoogle } from "../../services/auth";
import { useHistory } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");

  const history = useHistory();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePhotoChange = (e) => {
    setPhoto(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("trigg");
    // this.setState({ error: "" });
    const x =  await signup(email, password, username, userId, photo);
     alert('signed up');
     history.push("/");
    // try {
     
    // } catch (error) {
    //   // this.setState({ error: error.message });
    // }
  };

  const googleSignIn = async (e) => {
    // try {
    //   await signInWithGoogle();
    // } catch (error) {
    //   // this.setState({ error: error.message });
    // }
    await signInWithGoogle();
  };
  return (
    <div className="container">
      <Dialog open={true} >
        <div className="signupContainer">
          <DialogTitle id="alert-dialog-title">
            Sign Up
          </DialogTitle>
          <DialogContent>
            <TextField
              id="outlined-name"
              label="Email ID"
              className="textField"
              value={email}
              onChange={handleEmailChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              label="Password"
              className="textField"
              value={password}
              type="password"
              onChange={handlePasswordChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              label="Username"
              className="textField"
              value={username}
              onChange={handleUsernameChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              label="User ID"
              className="textField"
              value={userId}
              onChange={handleUserIdChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              label="URL"
              className="textField"
              value={photo}
              onChange={handlePhotoChange}
              margin="normal"
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <TwitterButton label="Sign Up with Google" onClick={googleSignIn} />
            <TwitterButton label="Register" onClick={handleSubmit}/>
          </DialogActions>

        </div>
      </Dialog>
    </div>
  );
}
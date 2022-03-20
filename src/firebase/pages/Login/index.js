import { Dialog, DialogTitle, DialogActions, Button, DialogContent, TextField } from "@material-ui/core";
import { useState } from "react";
import TwitterButton from "../../customComponents/TwitterButton";
import "./index.css";
import { signin, signInWithGoogle } from "../../services/auth";
import { useHistory } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // this.setState({ error: "" });
    const x =  await signin(email, password);
     history.push("/");
    // try {
     
    // } catch (error) {
    //   // this.setState({ error: error.message });
    // }
  };

  const redirectToSignUpPAge = async (e) => {
    history.push("/register");
  };
  return (
    <div className="container">
      <Dialog open={true} >
        <div className="signupContainer">
          <DialogTitle id="alert-dialog-title">
            Login
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Email ID"
              className="textField"
              value={email}
              onChange={handleEmailChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Password"
              className="textField"
              value={password}
              type="password"
              onChange={handlePasswordChange}
              margin="normal"
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <TwitterButton label="Create a New Account" onClick={redirectToSignUpPAge} />
            <TwitterButton label="Login" onClick={handleSubmit}/>
          </DialogActions>

        </div>
      </Dialog>
    </div>
  );
}
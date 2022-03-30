import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Card from "../../customComponents/Card";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { navigationList } from "../../constants/navigationList";
import { db, auth } from '../../services';
import { signOut } from "../../services/auth";
import { useHistory, useParams } from "react-router-dom";
import TwitterButton from "../../customComponents/TwitterButton";
import './style.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "black",
    color: "white"
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const Navigation = () => {
  const history = useHistory();
  const classes = useStyles();
  const [currUserDet, setCurrUserDet] = useState({});

  useEffect(() => {
    db.ref('users/' + auth().currentUser.uid).on("value", snapshot => {
      const userDetail = snapshot.val();
      setCurrUserDet(userDetail);
      // console.log(userDetail);
    })
  }, []);

  const handleSignOut = () => {
    signOut().then((res) => {
      history.go("/login");
    });
  }

  const handlePageRedirect = (path) => {
    if (path === '/profile') {
      path = `/${currUserDet.userId}`;
      console.log(path);
    }
    history.push(path);
  }

  return (
    <div className="navlist">
      <List component="nav" aria-label="main mailbox folders">
        {navigationList.map((item) => (
          <ListItem key={item.name} button onClick={() => handlePageRedirect(item.path)}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
        <ListItem key="tweetBtn" className="tweetBtn">
        <div className="colorBtn btn-Lg" onClick={handleSignOut}>Log Out</div>
        </ListItem>

      </List>
    </div>
  );
};
export default Navigation;

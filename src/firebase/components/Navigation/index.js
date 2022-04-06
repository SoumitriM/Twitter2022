import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { navigationList } from "../../constants/navigationList";
import { db, auth } from '../../services';
import { signOut } from "../../services/auth";
import { useHistory, useParams } from "react-router-dom";
import Brightness4OutlinedIcon from '@material-ui/icons/Brightness4Outlined';
import './style.css';

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const Navigation = () => {
  const history = useHistory();
  const [currUserDet, setCurrUserDet] = useState({});
  const [themeType, setThemeType] = useState("Light");

  useEffect(() => {
    db.ref('users/' + auth().currentUser.uid).on("value", snapshot => {
      const userDetail = snapshot.val();
      setCurrUserDet(userDetail);
    })
    const defaultTheme = localStorage.getItem("twitterTheme");
    console.log('default', defaultTheme);
    if (defaultTheme && defaultTheme === "Dark") {
      setThemeType("dark");
    }
  }, [themeType]);

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

  const handleTheme = () =>  {
    console.log(themeType);
    if (themeType === "Light") {
      setThemeType("Dark");
      localStorage.setItem("twitterTheme", 'Dark');
      document.documentElement.setAttribute("data-theme","dark");
    }
    else {
      setThemeType("Light");
      localStorage.setItem("twitterTheme", 'Light');
      document.documentElement.setAttribute("data-theme","Light");
    }
  };

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
        <ListItem key="theme" button onClick={handleTheme}>
            <ListItemIcon>
              <Brightness4OutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={themeType + " Mode"} />
          </ListItem>
        <ListItem key="tweetBtn" className="tweetBtn">
        <div className="colorBtn btn-Lg" onClick={handleSignOut}>Log Out</div>
        </ListItem>

      </List>
    </div>
  );
};
export default Navigation;

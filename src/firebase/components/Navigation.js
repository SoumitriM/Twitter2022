import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Card from "../customComponents/Card";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { navigationList } from "../constants/navigationList";
import { signOut } from "../services/auth";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const Navigation = () => {
  const history = useHistory();
  const classes = useStyles();

  const handleSignOut = () => {
    signOut().then((res) => {
      history.go("/login");
    });
  }

  const handlePageRedirect = (path) => {
    history.push(path);
  }

  return (
    <Card>
      <div className={classes.root}>
        <List component="nav" aria-label="main mailbox folders">
          {navigationList.map((item) => (
            <ListItem button onClick={()=> handlePageRedirect(item.path)}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
          ))}
          <ListItem button onClick={handleSignOut}>
            <ListItemText primary="Log Out" />
          </ListItem>
        </List>
      </div>
    </Card>
  );
};
export default Navigation;

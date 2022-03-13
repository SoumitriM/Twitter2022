import React from "react";
import { Route, useParams } from "react-router-dom";
import Homepage from '../pages/Homepage';
import Status from "../pages/Status";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
export default function RouteComponent(props) {
    const {isAuthenticated} = props;
    let {userName, statusId} = useParams();
    
    const routes = [
        {
            name: "Home",
            path: "/",
            exact: true,
            // icon: <HomeIcon />,
            component: isAuthenticated ? Homepage : Login
        },
        {
            name: "Explore",
            path: "/explore",
            exact: true,
            // icon: <ExploreIcon />
        },
        {
            name: "Notifications",
            path: "/notifications",
            exact: true,
            // icon: <NotificationsNoneIcon />
        },
        {
            name: "Messages",
            path: "/messages",
            exact: true,
            // icon: <MailOutlineIcon />
        },
        {
            name: "Bookmarks",
            path: "/bookmarks",
            exact: true,
            // icon: <BookmarkBorderIcon />
        },
        {
            name: "Lists",
            path: "/lists",
            exact: true,
            // icon: <ListAltIcon />
        },
        {
            name: "Profile",
            path: `/:userName`,
            exact: true,
            // icon: <PersonOutlineIcon />
            // component: <Status />
        },
        {
            name: "Status",
            path: `/:userName/:statusId`,
            exact: true,
            component: Status
        },
        {
            name: "More",
            path: "/more",
            exact: true,
            // icon: <MoreOutlinedIcon />
        },
        {
            name: "SignUp",
            path: "/register",
            exact: true,
            component: SignUp
            // icon: <MoreOutlinedIcon />
        },
        {
            name: "SignUp",
            path: "/login",
            exact: true,
            component: Login
            // icon: <MoreOutlinedIcon />
        }

    ];
    return (
        <React.Fragment>
            {routes.map((route) => (
                <Route exact={true} {...route} />
            ))}
        </React.Fragment>
    );
};
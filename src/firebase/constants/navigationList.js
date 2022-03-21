import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from "@material-ui/icons/Home";
import ExploreIcon from "@material-ui/icons/Explore";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import MoreOutlinedIcon from "@material-ui/icons/MoreOutlined";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

export const navigationList = [
    {
        name: "",
        path: "/",
        // exact: true,
        icon: <TwitterIcon />,
        // component: <Homepage />
    },
    {
        name: "Home",
        path: "/",
        // exact: true,
        icon: <HomeIcon />,
        // component: Homepage
    },
    {
        name: "Explore",
        path: "/explore",
        // exact: true,
        icon: <ExploreIcon />
    },
    {
        name: "Notifications",
        path: "/notifications",
        // exact: true,
        icon: <NotificationsNoneIcon />
    },
    {
        name: "Messages",
        path: "/messages",
        // exact: true,
        icon: <MailOutlineIcon />
    },
    {
        name: "Bookmarks",
        path:"/bookmarks",
        // exact: true,
        icon: <BookmarkBorderIcon />
    },
    {
        name: "Lists",
        path:"/lists",
        // exact: true,
        icon: <ListAltIcon />
    },
    {
        name: "Profile",
        path:"/profile",
        // exact: true,
        icon: <PersonOutlineIcon />
    },
    {
        name: "More",
        path:"/more",
        // exact: true,
        icon: <MoreOutlinedIcon />
    }

];
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    button: {
        borderRadius: "25px",
        textTransform: "none",
    }

});

export default function TwitterButton({ onClick, label }) {
  const classes = useStyles();
    return (
        <Button variant="contained" 
          onClick={onClick}
          color="primary"
          className={classes.button} 
          disableElevation
        >
          {label}
        </Button>
    );

}
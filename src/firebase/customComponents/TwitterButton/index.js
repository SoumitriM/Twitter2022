import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import './style.css';
export default function TwitterButton({ onClick, label, size}) {
  const classes = `colorBtn btn-${size}`;
    return <div className={classes} onClick={onClick}>{label}</div>

}
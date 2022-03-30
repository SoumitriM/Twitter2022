import Card from '../Card';
import { Grid } from '@material-ui/core';
import './style.css';

export default function PageHeader(props) {
  const { title, subheading } = props;
  return (
    <div className='pageHeader'>
      <h2>{title}</h2>
      {subheading && <p>{subheading}</p>}
    </div>
  );
}
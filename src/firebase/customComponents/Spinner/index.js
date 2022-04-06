import { Dialog } from "@material-ui/core";
import './index.css';

const Spinner = ({open}) => {
  return (
    <Dialog open={open}>
      <div className="spinner"></div>
    </Dialog>
  )
};

export default Spinner;

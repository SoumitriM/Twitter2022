import {connect} from 'react-redux';
import { getUserDetails } from '../actions/action';
import EditModal from '../components/EditModal';

const mapStateToProps = state => {
    return {
        userData: state.userDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    getUserDetails : () => dispatch(getUserDetails())
};

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
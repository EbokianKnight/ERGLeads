import ContactTable from './component.js';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import contactActions from '../../actions/contactActions';

const mapStateToProps = (state, ownProps) => ({
  data: state.contacts,
})

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      index: () => dispatch(contactActions.index()),
      show: (id) => dispatch(contactActions.show(id)),
      create: (data) => dispatch(contactActions.create(data)),
      update: (id, data) => dispatch(contactActions.update(id, data)),
      destroy: (id) => dispatch(contactActions.destroy(id)),
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactTable);

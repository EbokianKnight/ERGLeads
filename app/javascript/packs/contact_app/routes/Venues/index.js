// ------------------------------------
// Smart Component
// ------------------------------------

import React from 'react';
import ReactTable from "react-table";
import { normalizeString } from '../../utils';

class Venues extends React.Component {
  constructor() {
    super();
    // Boiler Plate function assignment, to be removed when I remember how.
    this.handleClick = this.handleClick.bind(this);
    this.customFiltering = this.customFiltering.bind(this);
  }

  componentDidMount() {
    this.props.actions.index();
  }

  customFiltering(filter, row, column) {
    const id = filter.pivotId || filter.id
    if (!(row[id] !== undefined)) return true;
    let content = normalizeString(String(row[id]));
    return content.includes(normalizeString(filter.value));
  }

  handleClick(state, rowInfo, column, instance) {
    return {
      onClick: (e, handleOriginal) => {
        if (column.Header == "Name") {
          console.log(rowInfo);
          console.log("it can navigate to this id:", rowInfo.original.id)
        }

        if (handleOriginal) handleOriginal();
      }
    };
  }

  render() {
    const data = this.props.data.venues

    const columns = [{
      Header: 'Location Name',
      accessor: 'name',
      maxWidth: 300,
      style: { cursor: 'pointer' }
    }, {
      id: 'phone',
      Header: 'Phone Number',
      accessor: 'phone'
    }, {
      id: 'type_of_venue',
      Header: 'Type of Venue',
      accessor: 'type_of_venue'
    }, {
      id: 'location.full_address',
      Header: 'Address',
      accessor: data => data.location.full_address
    }]

    return <ReactTable
      className="-highlight"
      data={data}
      columns={columns}
      minRows={5}
      filterable={true}
      pageSizeOptions={[10, 20, 50, 100, 10000]}
      defaultPageSize={100}
      defaultFilterMethod={this.customFiltering}
      getTdProps={this.handleClick}
    />;
  }
}

// ------------------------------------
// Container
// ------------------------------------

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import venueActions from '../../actions/venueActions';

const mapStateToProps = (state, ownProps) => ({
  data: state.venues,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(venueActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Venues);

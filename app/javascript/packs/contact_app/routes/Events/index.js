// ------------------------------------
// Smart Component
// ------------------------------------

import React from 'react';
import ReactTable from "react-table";
import { normalizeString } from '../../utils';

class Events extends React.Component {
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
        if (column.Header == "Event Name") {
          console.log("it can navigate to this id:", rowInfo.original.id)
        } else if (column.Header == "Venue") {
          console.log("it can navigate to this id:", rowInfo.original.venue_id)
        }

        if (handleOriginal) handleOriginal();
      }
    };
  }

  render() {
    const data = this.props.data.events

    const columns = [{
      Header: 'Event Name',
      accessor: 'name',
      maxWidth: 300,
      style: { cursor: 'pointer' }
    }, {
      Header: 'Venue',
      accessor: 'venue_name'
    }, {
      id: 'date',
      Header: 'Date',
      accessor: 'date'
    }];

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
import eventActions from '../../actions/eventActions';

const mapStateToProps = (state, ownProps) => ({
  data: state.events,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(eventActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Events);

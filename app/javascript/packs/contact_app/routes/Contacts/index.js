// ------------------------------------
// Smart Component
// ------------------------------------

import React from 'react';
import ReactTable from "react-table";
import checkboxHOC from "react-table/lib/hoc/selectTable";
const CheckboxTable = checkboxHOC(ReactTable);
import { normalizeString } from '../../utils';

class Contacts extends React.Component {
  constructor() {
    super();
    this.state = { selection: [], selectAll: false };

    // Boiler Plate function assignment, to be removed when I remember how.
    this.handleClick = this.handleClick.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.customFiltering = this.customFiltering.bind(this);
    this.toggleSelection = this.toggleSelection.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.isSelected = this.isSelected.bind(this);
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
        if (column.Header == "Full Name") {
          console.log(rowInfo);
          console.log("it can navigate to this id:", rowInfo.original.id)
        }

        if (handleOriginal) handleOriginal();
      }
    };
  }

  handleSelection(state, rowInfo, column, instance) {
    if (!rowInfo) return {};
    const selected = this.isSelected(rowInfo.original.id);
    return { style: { backgroundColor: selected ? "lightblue" : "inherit" } };
  }

  isSelected(key) {
    return this.state.selection.includes(key);
  };

  toggleAll() {
    const selectAll = this.state.selectAll ? false : true;
    const selection = [];
    if (selectAll) {
      // we need to get at the internals of ReactTable
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      // the 'sortedData' property contains the currently accessible records based on the filter and sort
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      // we just push all the IDs onto the selection array
      currentRecords.forEach(item => {
        selection.push(item._original.id);
      });
    }
    this.setState({ selectAll, selection });
  };

  toggleSelection(key, shift, row) {
    let selection = [...this.state.selection];
    const keyIndex = selection.indexOf(key);
    // check to see if the key exists
    if (keyIndex >= 0) {
      // it does exist so we will remove it using destructing
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1)
      ];
    } else {
      // it does not exist so add it
      selection.push(key);
    }
    // update the state
    this.setState({ selection });
  };

  render() {
    const data = this.props.data.contacts
    const { handleSelection, toggleSelection, toggleAll, isSelected, logSelection } = this;

    const checkboxProps = {
      selectAll: this.state.selectAll,
      keyField: 'id',
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: "checkbox",
      getTrProps: handleSelection,
    };

    const columns = [{
      Header: 'Full Name',
      accessor: 'full_name',
      maxWidth: 300,
      style: { cursor: 'pointer' }
    }, {
      id: 'phone',
      Header: 'Phone Number',
      accessor: 'phone',
      width: 150,
    }, {
      id: 'email',
      Header: 'Email Address',
      accessor: 'email'
    }, {
      id: 'location.city',
      Header: 'City',
      accessor: data => data.location.city
    }, {
      id: 'location.state',
      Header: 'State',
      width: 60,
      accessor: data => data.location.state
    }]

    return <CheckboxTable
      ref={r => (this.checkboxTable = r)}
      className="-highlight"
      data={data}
      columns={columns}
      minRows={5}
      filterable={true}
      pageSizeOptions={[10, 20, 50, 100, 10000]}
      defaultPageSize={20}
      defaultFilterMethod={this.customFiltering}
      getTdProps={this.handleClick}
      {...checkboxProps}
    />;
  }
}

// ------------------------------------
// Container
// ------------------------------------

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import contactActions from '../../actions/contactActions';

const mapStateToProps = (state, ownProps) => ({
  data: state.contacts,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(contactActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);

import React from 'react';
import ReactTable from "react-table";
import { normalizeString } from '../../utils';

const VenueTable = ({ venues, linkTo }) => {
  const customFiltering = (filter, row, column) => {
    const id = filter.pivotId || filter.id
    if (!(row[id] !== undefined)) return true;
    let content = normalizeString(String(row[id]));
    return content.includes(normalizeString(filter.value));
  }

  const handleClick = (state, rowInfo, column, instance) => {
    return {
      onClick: (e, handleOriginal) => {
        if (column.Header == "Venue Name") linkTo(rowInfo.original.id);
        if (handleOriginal) handleOriginal();
      }
    };
  }

  const columns = [{
    id: 'website',
    Header: 'Web',
    maxWidth: 50,
    accessor: 'website',
    Filter: (row) => null,
    Cell: (row) => {
      if (!row.value) return null
      return <a href={row.value} target="_blank">link</a>
    }
    }, {
      Header: 'Venue Name',
      accessor: 'name',
      maxWidth: 300,
      style: { cursor: 'pointer' }
    }, {
      id: 'phone',
      Header: 'Phone Number',
      accessor: 'phone',
      width: 150,
    }, {
      id: 'location.city',
      Header: 'City',
      width: 150,
      accessor: data => data.location.city
    }, {
      id: 'location.state',
      Header: 'State',
      width: 60,
      accessor: data => data.location.state
    }, {
      id: 'type_of_venue',
      Header: 'Type of Venue',
      accessor: 'type_of_venue'
    }
  ];
  return (
    <ReactTable
      className="-highlight"
      data={venues}
      columns={columns}
      minRows={5}
      filterable={true}
      pageSizeOptions={[10, 20, 50, 100, 500]}
      defaultPageSize={20}
      defaultFilterMethod={customFiltering}
      getTdProps={handleClick}
    />
  );

}

export default VenueTable;

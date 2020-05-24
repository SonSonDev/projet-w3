import React from "react"
import PropTypes from "prop-types"
import { useTable } from "react-table"


function Table ({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  return (
    <table className="table is-bordered is-size-6 w100" {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr key className="notification" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th key className="has-text-grey" {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr key {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td key {...cell.getCellProps()}>{cell.render("Cell")}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
}
export default Table
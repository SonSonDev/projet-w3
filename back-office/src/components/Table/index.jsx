import React from 'react'
import PropTypes from 'prop-types'

const Table = ({
  data = [
    { id: 1, name: 'name 1', email: 'email 1', role: 'role 1' },
    { id: 2, name: 'name 2', email: 'email 2', role: 'role 2' },
    { id: 3, name: 'name 3', email: 'email 3', role: 'role 3' }
  ],
  columns = [
    { title: 'Name', key: 'name' },
    { title: 'Email', key: 'email' },
    { title: 'Role', key: 'role' },
    { label: 'Delete', handleClick: () => console.log('Delete') },
    { label: 'Edit', handleClick: () => console.log('Edit') }
  ]
}) => {
  return (
    <table className="table is-striped table is-bordered w100">
      <thead>
        <tr>
          {columns.map(({ title, label }) => (
            <th key={title || label}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(({ id, ...entry }) => (
          <tr key={id}>
            {columns.map(({ key, label, handleClick, link, customString }, i) => (
              <td key={id + i}>
                { link ?
                  <a href={link(entry[key])} target="_blank" rel="noopener noreferrer">{entry[key]}</a> 
                  : customString ? customString(entry)
                  : key ? (entry[key] || '-' )
                  : (
                  <button
                    className="button is-small"
                    onClick={() => handleClick({ variables: { id } })}
                  >
                    {label}
                  </button>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

Table.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      key: PropTypes.string,
      label: PropTypes.string,
      handleClick: PropTypes.func,
    })
  ).isRequired,
}

export default Table
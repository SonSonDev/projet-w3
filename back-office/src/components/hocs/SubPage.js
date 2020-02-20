import React from "react"
import PropTypes from "prop-types"

const SubPage = ({history, children}) => {
  return (
    <div className="py3">
      <button className="ml4 mb2" onClick={history.goBack}>
        <i className="ri-arrow-go-back-fill" />
      </button>
      {children}
    </div>
  )
}

SubPage.propTypes = {
  history: PropTypes.object,
  children: PropTypes.node,
}

export default SubPage
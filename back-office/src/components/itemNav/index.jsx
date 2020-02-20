import React from "react"
import PropTypes from "prop-types"
import { Link, useLocation } from "react-router-dom"

function ItemNav({ links, children, icon }) {
  const { pathname } = useLocation()
  return (
    <li>
      <Link
        to={"/" + links[0]}
        onClick={e => e.currentTarget.blur()}
        className={[
          "button justify-left",
          pathname.split("/").some(bit => links.includes(bit)) ? "is-success is-light" : "is-white",
        ].join(" ")}
      >
        <span className="icon">
          <i className={icon} />
        </span>
        <span className="flex">{children}</span>
      </Link>
    </li>
  )
}

ItemNav.propTypes = {
  links: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
  icon: PropTypes.string,
}

export default ItemNav

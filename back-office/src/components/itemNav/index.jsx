import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"

function ItemNav({ link, children, icon }) {
  const { pathname } = useLocation()

  return (
    <li>
      <Link
        to={link}
        onClick={e => e.currentTarget.blur()}
        className={[
          "button justify-left",
          pathname === link ? "is-success is-light" : "is-white",
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

export default ItemNav

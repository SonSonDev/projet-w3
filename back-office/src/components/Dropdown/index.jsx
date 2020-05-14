import React, { useState, useEffect } from "react"


export default function Dropdown ({ className, TriggerComponent, children }) {

  const [ dropdownActive, setDropdownActive ] = useState(false)
  useEffect(() => {
    const closeDropdown = () => setDropdownActive(false)
    window.addEventListener("click", closeDropdown)
    return () => window.removeEventListener("click", closeDropdown)
  }, [])

  return (
    <div className={`dropdown ${dropdownActive && "is-active"} ${className}`}>
      <div
        onClick={() => !dropdownActive && setTimeout(() => setDropdownActive(true))}
        className="dropdown-trigger w100 pointer"
      >
        {TriggerComponent}
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {children}
        </div>
      </div>
    </div>
  )
}
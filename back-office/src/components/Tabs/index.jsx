import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

import Dropdown from "../Dropdown"


const Tabs = ({
  tabs = [{ title: "All", filter: () => true }],
  activeTabIndex = 0,
  action = { label: "", url: ""},
  onTabClick = () => console.log("action"),
  DropdownContent,
}) => {
  return (
    <div className="tabs relative z1" style={{overflow: "visible"}}>
      <ul>
        {tabs.map(({ title }, index) => (
          <li className={activeTabIndex === index ? "is-active" : ""} key={index}>
            <a onClick={() => onTabClick(index)}>{title}</a>
          </li>
        ))}
        <div className="buttons go-to-right" style={{ transform: "translateY(-5px)" }}>
          { action.url && (
            <Link to={action.url} className="button is-primary">
              <span className="icon"><i className="ri-add-box-line"/></span>
              <span className="">{action.label}</span>
            </Link>
          )}
          {DropdownContent && (
            <Dropdown
              className="is-right"
              TriggerComponent={
                <button className="button is-light">
                  <span className='icon'><i className='ri-more-fill'/></span>
                </button>
              }
            >
              {DropdownContent}
            </Dropdown>
          )}
        </div>
      </ul>
    </div>
  )
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      filter: PropTypes.func.isRequired,
    }).isRequired,
  ),
  activeTabIndex: PropTypes.number,
  action: PropTypes.shape({
    label: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  onTabClick: PropTypes.func,
}

export default Tabs
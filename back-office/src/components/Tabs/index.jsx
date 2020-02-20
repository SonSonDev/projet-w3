import React from "react"
import PropTypes from "prop-types"

const Tabs = ({
  tabs = [{ title: "All", filter: () => true }],
  activeTabIndex = 0,
  action = { label: "", url: ""},
  onTabClick = () => console.log("action"),
}) => {
  return (
    <div className="tabs" style={{overflow: "visible"}}>
      <ul>
        {tabs.map(({ title }, index) => (
          <li className={activeTabIndex === index ? "is-active" : ""} key={index}>
            <a href="#" onClick={() => onTabClick(index)}>{title}</a>
          </li>
        ))}
        { action.url && (
          <a href={action.url} className="button is-primary go-to-right" style={{transform: "translate(-5px,-5px)"}}>
            <span className="icon"><i className="ri-add-box-line"/></span>
            <span className="">{action.label}</span>
          </a>
        )}
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
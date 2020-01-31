import React from "react";

const Tabs = ({
  tabs = [
    { title: "All", filter: () => true },
    { title: "Shop", filter: ({ category }) => category === "SHOP" }
  ],
  activeTabIndex = 0,
  action = { label : "ajouter une action", url: "/"},
  onTabClick = () => console.log("action")
}) => {
  return (
    <div className="tabs">
      <ul>
        {tabs.map(({ title, active }, index) => (
          <li className={activeTabIndex === index ? "is-active" : ""} key={index}>
            <a onClick={() => onTabClick(index)}>{title}</a>
          </li>
        ))}
        <a href={action.url} className="button is-small go-to-right">{action.label}</a>
      </ul>
    </div>
  );
};

export default Tabs;

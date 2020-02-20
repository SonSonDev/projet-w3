import React from "react";

function ItemNav({ link, children, icon }) {
  return (
    <li>
      <a
        href={link}
        className={[
          "button justify-left",
          window.location.pathname === link ? "is-success is-light" : "is-white"
        ].join(" ")}
      >
        <span className="icon">
          <i className={icon} />
        </span>
        <span className="flex">{children}</span>
      </a>
    </li>
  );
}

export default ItemNav;

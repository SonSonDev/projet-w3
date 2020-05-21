import React, { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { useQuery } from "@apollo/react-hooks"

import { categories, tags, hours } from "../../utils/wording"
import { GET_TAGS } from "../../graphql/tag"


function Fields ({ children = [], helpers: { register, watch, errors }, level = 0, path = [] }) {
  const [ collapsedChildren, setCollapsedChildren ] = useState({})
  // useEffect(() => {
  //   level === 2 && console.log(collapsedChildren, children)
  // })
  return children.map(({ key, label, type, options, children, collapsible, required, className, attributes }, i, a) => {
    const collapsed = collapsedChildren[label]
    const hasChildren = children || collapsible
    // || type === "C"
    const fieldClassName = additionalClassName => [ "control", additionalClassName,
      collapsible && !(!collapsed && hasChildren) && "display-none",
      !collapsible && (!collapsed && hasChildren) && "display-none",
    ].join(" ")
    const error = key?.split(".").reduce((acc, curr) => acc[curr] || acc, errors).type

    return (
      <div className={[
        level ? "field" : "mb2",
        !level && i!==a.length-1 && "border-bottom",
        !level && !collapsed && "pb3",
        level && hasChildren && label && "pl2",
        className,
      ].join(" ")} key={`${key}@${label}`}>
        <label
          className={[
            level ? "label has-text-grey-dark" : "bold is-size-5 mb2",
            level && hasChildren && label && "bold",
            hasChildren && label && "flex items-center mxn2 pointer",
          ].join(" ")}
          onClick={() => setCollapsedChildren({ ...collapsedChildren, [label]: !collapsed })}
        >
          {hasChildren && label && (
            <span className="icon is-small has-text-grey">
              <i className={collapsed ? "ri-arrow-right-s-line" : "ri-arrow-down-s-line"}/>
            </span>
          )}
          <span>
            {label}
            {collapsed && collapsible && !!watch(key)?.length && ` (${watch(key).length})`}
            {error && <span className='has-text-danger'>*</span>}
          </span>
        </label>
        {children && (
          <Fields helpers={{ register, watch, errors }} level={level + 1} path={key ? [ ...path, key ] : path}>
            {children.map(({ className, ...rest }) => ({ ...rest, className: [ className, collapsed && hasChildren && "display-none" ].join(" ") }))}
          </Fields>
        )}
        {(() => {
          switch (type) {
          case "T": return (
            <div className={fieldClassName()}>
              <input name={key} ref={register({ required })} className={[ "input", false && "is-danger" ].join(" ")} {...attributes} />
            </div>
          )
          case "TT": return (
            <div className={fieldClassName()}>
              <textarea name={key} ref={register({ required })} className="textarea" />
            </div>
          )
          case "R": return (
            <div className={fieldClassName("buttons has-addons")}>
              {options.map(({ value, label }) => (
                <label className={[ "button", watch(key) === value && "is-success is-light", false && "is-danger is-outlined" ].join(" ")} key={value}>
                  <input type="radio" value={value} name={key} ref={register({ required })} className={[ "mr05 display-none" ].join(" ")} {...attributes} />
                  {label}
                </label>
              ))}
            </div>
          )
          case "C": return (
            <div className={fieldClassName()}>
              {options.map(({ value, label }) => (
                <label className="checkbox flex mb1" key={value}>
                  <span className={["icon is-size-4 is-small mr1", watch(key)?.includes(value) ? "has-text-primary" : "has-text-grey-lighter" ].join(" ")}>
                    <i className={watch(key)?.includes(value) ? "ri-checkbox-fill" : "ri-checkbox-blank-line"}/>
                  </span>
                  <input type="checkbox" value={value} name={key} ref={register({ required })} className="mr05" hidden />
                  {label}
                </label>
              ))}
            </div>
          )
          case "S": return (
            <div className={fieldClassName()}>
              <div className="select is-fullwidth">
                <select id="category" name={key} ref={register({ required })}>
                  <option value="" />
                  {options.map(({ value, label }) => (
                    <option value={value} key={value}>{label}</option>
                  ))}
                </select>
              </div>
            </div>
          )
          case "H": return (
            <div className={fieldClassName()}>
              {options.map(({ value, label, attributes }) => (
                <label className="flex items-center mb1" key={value}>
                  <span className={["icon is-size-4 is-small mr1", watch(`${key}[${value}].day`) ? "has-text-primary" : "has-text-grey-lighter" ].join(" ")}>
                    <i className={watch(`${key}[${value}].day`) ? "ri-checkbox-fill" : "ri-checkbox-blank-line"}/>
                  </span>
                  <input type="checkbox" value={value} name={`${key}[${value}].day`} ref={register({ required })} className="mr05" {...attributes} hidden />
                  <span className='mr-auto'>{label}</span>
                  <input name={`${key}[${value}].start`} ref={register({ required })} className={[ "input" ].join(" ")} type='time' disabled={!watch(`${key}[${value}].day`)} defaultValue="09:00" />
                  <span className='mx1'>-</span>
                  <input name={`${key}[${value}].end`} ref={register({ required })} className={[ "input" ].join(" ")} type='time' disabled={!watch(`${key}[${value}].day`)} defaultValue="19:00" />
                </label>
              ))}
            </div>
          )
          case "P": return (
            <div className={fieldClassName()}>
              <div className="file is-boxed mb1">
                <label className="file-label">
                  <input className="file-input" type="file" name={key} ref={register({ required })} multiple />
                  <span className="file-cta">
                    <span className="file-icon"><i className="ri-upload-2-line"/></span>
                    <span className="file-label">Uploader un fichier</span>
                  </span>
                </label>
              </div>
              {!!watch(key)?.length && [ ...watch(key) ].map(({ name }, i) => (
                <button className='button is-white' key={`${i}@${name}`}>
                  <span>{name}</span>
                  <span className="icon"><i className="ri-close-line"/></span>
                </button>
              ))}
            </div>
          )
          }
        })()}
        {/* {error && <p className="help is-danger">{error}</p>} */}
      </div>
    )
  })
}


export default function Form ({ form, onSubmit, onCancel, onDelete, submitting, children }) {
  const { handleSubmit, register, watch, errors } = useForm(children)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="columns">
      <div className='column is-two-fifths'>
        <Fields helpers={{ register, watch, errors }}>{form(watch())}</Fields>
        {onDelete && (
          <a onClick={onDelete} className={[ "button has-text-danger bold", submitting && "is-loading" ].join(" ")}>
            Supprimer
          </a>
        )}
      </div>
      <div className='column'>
        <div className='buttons fixed bottom-0 pb3 pl3'>
          <a onClick={onCancel} className='button bold'>Annuler</a>
          <button type='submit' className={[ "button is-primary bold", submitting && "is-loading" ].join(" ")}>
            Valider
          </button>
        </div>
      </div>
    </form>
  )
}
import React, { useState } from "react"
import { useForm } from "react-hook-form"

function Fields ({ children = [], helpers: { register, watch, setValue, errors }, level = 0, path = [] }) {
  const [ collapsedChildren, setCollapsedChildren ] = useState({})
  // useEffect(() => {
  //   level === 2 && console.log(collapsedChildren, children)
  // })
  return children.map(({ key, label, type, options, children, collapsible, required, className, attributes, disabled, params }, i, a) => {
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
          <Fields helpers={{ register, watch, setValue, errors }} level={level + 1} path={key ? [ ...path, key ] : path}>
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
          case "AT": return (
            <div className={fieldClassName()}>
              {
                new Array(params.number).fill(1).map((_,i) => (
                  <div className={[(i+1 !== params) && "mb1", "field has-addons"].join(" ")} key={i}>
                    <input name={`${key}[${i}]`} ref={register({ required })} className={[ "input", false && "is-danger" ].join(" ")} {...attributes} />
                    <button tabIndex="-1" type="button" className="button" onClick={(e) => { e.target.children[0] ? e.target.children[0].click() : console.log(e) }}>
                      <input tabIndex="-1" type="radio" ref={register({ required })} name={params.radioKey} value={watch(`${key}[${i}]`)} />
                    </button>
                  </div>
                ))
              }
            </div>
          )
          case "TT": return (
            <div className={fieldClassName()}>
              <textarea name={key} ref={register({ required })} className="textarea" {...attributes} />
            </div>
          )
          case "R": return (
            <div className={fieldClassName("buttons has-addons")}>
              {options.map(({ value, label }) => (
                <label className={[ "button", watch(key) === value && "is-success is-light", false && "is-danger is-outlined", disabled && "is-static" ].join(" ")} key={value}>
                  <input type="radio" value={value} name={key} ref={register({ required })} className={[ "mr05 display-none" ].join(" ")} {...attributes} disabled={disabled} />
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
              {[ ...watch(key)?.filter(({ files, uri }) => files?.length || uri) || [], {} ].map((_, i, a) => (
                <div className={[ "file is-boxed mb2", i !== a.length-1 && "display-none" ].join(" ")} key={`${key}[${i}]`}>
                  <label className="file-label">
                    <input className="file-input" type="file" name={`${key}[${i}].files`} ref={register({ required })} accept="image/*" />
                    <span className="file-cta">
                      <span className="file-icon"><i className="ri-upload-2-line"/></span>
                      <span className="file-label">Uploader un fichier</span>
                    </span>
                  </label>
                  <input type='uri' name={`${key}[${i}].uri`} ref={register({ required })} hidden />
                </div>
              ))}
              <div className="field is-grouped is-grouped-multiline">
                {watch(key)?.map(({ files: [ { name } = {} ] = [], uri }, i) => (name || uri) && (
                  <div className='control' key={`${i}@${name}`}>
                    <div className="tags has-addons">
                      <span className="tag is-success is-light">{name || uri.split("/").pop()}</span>
                      <a onClick={() => {
                        setValue(`${key}[${i}].files`, "")
                        setValue(`${key}[${i}].uri`, "")
                      }} className="tag is-delete is-success is-light" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
          }
        })()}
        {/* {error && <p className="help is-danger">{error}</p>} */}
      </div>
    )
  })
}

function Form ({ form, onSubmit, onCancel, onDelete, submitting, children }) {
  const { handleSubmit, register, watch, setValue, errors } = useForm(children)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="columns">
      <div className='column is-two-fifths'>
        <Fields helpers={{ register, watch, setValue, errors }}>{form(watch({ nest: true }))}</Fields>
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

export default Form
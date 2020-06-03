import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { unparse, parse } from "papaparse"

import Table from "../Table"
import Dropdown from "../Dropdown"


function Index ({ data, columns, tabs, children: { slug, entity, genre, onImport, onExport } }) {

  const [ search, setSearch ] = useState("")
  const [ activeTabIndex, setActiveTabIndex ] = useState(0)

  const filteredData = data.filter(tabs[activeTabIndex].filter)
    .filter(obj => JSON.stringify(obj).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .includes(search.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")),
    )

  return (
    <main className="">
      <div className="px3 py2 flex justify-between border-bottom">
        <h1 className="is-size-3 bold my05">{data.length} {entity}s</h1>

        <div className={`buttons go-to-right ${!slug && "hidden"}`}>
          <Link to={`/${slug}/create`} className="button is-primary bold">
            {/* <span className="icon"><i className="ri-add-box-line"/></span> */}
            <span className="">{`Ajouter ${genre === "M" ? "un" : "une"} ${entity}`}</span>
          </Link>
          {onExport && (
            <Dropdown
              className="is-right"
              TriggerComponent={
                <button className="button is-success is-light">
                  <span className='icon'><i className='ri-more-fill'/></span>
                </button>
              }
            >
              <a className="dropdown-item">
                <span className="icon"><i className="ri-download-2-line"/></span>
                <span className="">Importer un .csv</span>
                <input className="file-input pointer" type="file" name="resume" accept=".csv" onInput={e => {
                  if (!e.target.files.length) return
                  parse(e.target.files[0], { complete: onImport, header: true })
                }}/>
              </a>
              <a
                className="dropdown-item"
                href={"data:text/csv;charset=utf-8," + encodeURIComponent(
                  unparse(data.map(onExport)),
                )}
                download={`${Date.now()}_${entity}s(${data.length}).csv`}
              >
                <span className="icon"><i className="ri-upload-2-line"/></span>
                <span className="">Exporter en .csv</span>
              </a>
            </Dropdown>
          )}
        </div>
      </div>

      <div className="p3">
        <div className='flex justify-between mb1'>
          <div className="field has-addons">
            <div className="control"><button className="button is-static">Filtre</button></div>
            <div className="control is-expanded">
              <div className="select is-fullwidth">
                <select value={activeTabIndex} onChange={e => setActiveTabIndex(e.target.value)}>
                  {tabs.map(({ title }, index) => <option value={index} key={title}>{title}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="control has-icons-right">
            <input value={search} onChange={e => setSearch(e.target.value)} className="input message" placeholder="Rechercher"/>
            <span className="icon is-right"><i className="ri-search-line"/></span>
          </div>
        </div>

        <Table data={filteredData} columns={columns} />
      </div>

    </main>
  )
}

Index.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  tabs: PropTypes.array.isRequired,
  children: PropTypes.object,
}

export default Index
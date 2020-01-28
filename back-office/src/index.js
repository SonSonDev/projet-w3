import React from 'react'
import ReactDOM from 'react-dom'
import '@duik/it/dist/styles.css'
import './style/style.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {wrapRootElement} from './components/wrapRootElement'

ReactDOM.render(<wrapRootElement><App /></wrapRootElement>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

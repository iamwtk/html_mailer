import React from 'react'
import { render } from 'react-dom'
import Layout from './pages/layout'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const app = document.getElementById('main');

render((
   <Router>
    <Layout/>
  </Router>), app);
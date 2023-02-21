// Importing the React 
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Importing Pages
import Layout from './components/Layout';
import Main from './pages/Main';
import Setup from './pages/Setup';
import Editor from './pages/Editor';
import Protocol from './pages/Protocol'
import Chamber from './pages/Chamber'
import Syringe from './pages/Syringe'
import Filter from './pages/Filter'
import Magnet from './pages/Magnet'
import Navigation from './components/Navigation'

ReactDOM.render(
  <Layout>
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/main" component={Main} />
        <Route exact path='/setup' component={Setup} />
        <Route path='/editor/:name' component={Editor} />
        <Route path="/protocol" component={Protocol} />
        <Route path="/chamber" component={Chamber} />
        <Route path="/syringe" component={Syringe} />
        <Route path="/filter" component={Filter} />
        <Route path="/magnet" component={Magnet} />
      </Switch>
  </BrowserRouter>
  </Layout>
  , document.getElementById('root')
);

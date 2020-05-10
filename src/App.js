import React from 'react';
import './App.css';
import ListPage from './components/list-page/list-page';
import { BrowserRouter as Router, Route,  Switch } from 'react-router-dom'
import IncidentDetail from './components/detail-page/detail-page';
import Header from './components/common/header';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
        <Router>
          <Switch>
            <Route exact path='/' component={ListPage}></Route>
            <Route path='/case' component={IncidentDetail}></Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;

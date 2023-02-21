import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './pages/Main';
import Setup from './pages/Setup';
import Editor from './pages/Editor';

const App = () => {
    return (
        <BrowserRouter>
            <Route exact path='/' component={Main}/>
            <Route exact path='/setup' component={Setup}/>
            <Route exact path='/editor' component={Editor}/>
        </BrowserRouter>   
    );
}

export default App;
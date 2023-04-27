import './App.css';

import {Route, Switch} from 'react-router-dom';

import Header from "./components/header/Header.component";
import MainPage from "./pages/main_page/MainPage.component";
import TaskPage from "./pages/tasksPage/TaskPage.component";

function App() {
    return (
        <div className="App">
            <Header/>
            <div className="app_container">
                <Switch>
                    <Route exact path='/' component={MainPage}/>
                    <Route path='/project/:projectId' component={TaskPage}/>
                </Switch>
            </div>
        </div>
    );
}

export default App;

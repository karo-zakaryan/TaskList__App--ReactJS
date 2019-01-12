import React from 'react';
import Header from "./components/Header/Header";
import {Switch, Route} from "react-router-dom";
import Page404 from "./components/Page404/Page404";
import routePaths from "./constKeys/routePaths";
import TaskList from "./components/TaskList/TaskList";
import SignIn from "./components/SignIn/SignIn";
import AppendTask from "./components/AppendTask/AppendTask";

const TaskListApp = () => (
    <main>
        <Header/>

        <Switch>
            <Route path="/" exact component={TaskList}/>
            <Route path={routePaths.signIn} exact component={SignIn}/>
            <Route path={routePaths.appendTask} exact component={AppendTask}/>

            <Page404/>
        </Switch>
    </main>
);

export default TaskListApp;
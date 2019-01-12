import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import TaskListApp from './TaskListApp';
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux"
import {store} from "./redux/store";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import './index.css';

const theme = createMuiTheme({
    palette: {
        primary: {main: "#2196f3"},
        secondary: {main: '#e91e63'},
    },
    typography: {useNextVariants: true},
});

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <MuiThemeProvider theme={theme}>
                <TaskListApp/>
            </MuiThemeProvider>
        </Provider>
    </Router>
    , document.getElementById('root')
);

serviceWorker.unregister();
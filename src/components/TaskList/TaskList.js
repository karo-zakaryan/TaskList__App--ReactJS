import React, {Component} from 'react';
import Task from "../Task/Task";
import Filter from "../Filter/Filter";
import Pagination from "../Pagination/Pagination";
import {bindActionCreators} from "redux";
import {editTask, embarkTasks} from "../../redux/actions/taskActions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core";
import {signIn} from "../../redux/actions/authActions";

class TaskList extends Component {
    componentDidMount() {
        const isAuth = Boolean(localStorage.adminLogin);
        const {signIn, admin} = this.props;
        (isAuth && !admin.isAuth) && signIn({username: "admin", password: "123"});
    }

    render() {
        const {classes, tasks, editTask, admin, embarkTasks, location} = this.props;

        return (
            <section className={classes.root}>
                <article className={classes.article}>
                    <Filter embarkTasks={embarkTasks} location={location}/>
                    <div>
                        {
                            tasks.currentTasks.map((task, index) => (
                                <Task editTask={editTask}
                                      admin={admin}
                                      key={index}
                                      id={task.id}
                                      task={task}/>
                            ))
                        }
                    </div>
                    <Pagination embarkTasks={embarkTasks} location={location} tasks={tasks}/>
                </article>
            </section>
        );
    }
}

const styles = theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        marginTop: "10vh",
        alignItems: "center",
    },
    article: {
        width: "50%"
    }
});

const mapStateToProps = state => {
    return {
        tasks: state.tasks.tasks,
        admin: state.admin,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        embarkTasks: bindActionCreators(embarkTasks, dispatch),
        editTask: bindActionCreators(editTask, dispatch),
        signIn: bindActionCreators(signIn, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(TaskList)));
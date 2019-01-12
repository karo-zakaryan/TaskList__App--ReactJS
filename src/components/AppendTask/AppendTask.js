import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {appendTask} from "../../redux/actions/taskActions";
import {
    CssBaseline,
    Paper,
    Typography,
    FormControl,
    TextField,
    Button,
    withStyles
} from "@material-ui/core";
import {withRouter} from "react-router-dom";

class AppendTask extends Component {
    state = {
        username: "",
        email: "",
        text: ""
    };

    appendTaskHandler = event => {
        const {appendTask, history} = this.props;
        const {username, email, text} = this.state;
        const formData = new FormData();
        formData.set("username", username);
        formData.set("email", email);
        formData.set("text", text);
        appendTask(formData).then(res => {
            history.push("/");
        }).catch(error => {
            console.error(error);
        });

        event.preventDefault();
    };

    handleChange = event => {
        const {name, value} = event.target;

        this.setState({
            [name]: value,
        });
    };

    render() {
        const {classes} = this.props;
        const {username, email, text} = this.state;

        return (
            <main className={classes.main}>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Append Task
                    </Typography>
                    <form className={classes.form} noValidate>
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                id="username"
                                label="Name"
                                value={username}
                                placeholder="Your name"
                                onChange={this.handleChange}
                                type="text"
                                name="username"
                                autoComplete="username"
                                margin="normal"
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                id="email"
                                label="Email"
                                value={email}
                                placeholder="Your Email"
                                onChange={this.handleChange}
                                type="email"
                                name="email"
                                autoComplete="email"
                                margin="normal"
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                id="text"
                                label="Text"
                                value={text}
                                onChange={this.handleChange}
                                type="text"
                                name="text"
                                autoComplete="text"
                                margin="normal"
                                variant="outlined"
                            />
                        </FormControl>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.appendTaskHandler}
                            className={`${classes.submit} ${classes.blue}`}
                        >
                            Append Task
                        </Button>
                    </form>
                </Paper>
            </main>
        )
    }
}

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        height: '100vh',
        position: 'relative',
    },
    paper: {
        width: '500px',
        height: "fit-content",
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '50px 24px 60px 24px',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
        "& div": {
            width: "100%"
        }
    },
    submit: {
        height: '40px',
        display: "flex",
        width: "-webkit-fill-available",
        justifyContent: "center",
        marginTop: theme.spacing.unit * 3,
        outline: 0,
        "& div": {
            width: "auto",
            height: 37
        },
        "& span": {
            fontSize: "0.875rem"
        }
    },
    blue: {
        backgroundColor: '#04a9f5',
        color: '#fff'
    }
});

const mapStateToProps = state => {
    return {
        tasks: state.tasks.tasks
    }
};

const mapDispatchToProps = dispatch => {
    return {
        appendTask: bindActionCreators(appendTask, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(AppendTask)));
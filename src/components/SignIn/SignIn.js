import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {Button, CssBaseline, FormControl, Paper, Typography, TextField, withStyles} from '@material-ui/core';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {signIn} from "../../redux/actions/authActions";

class SignIn extends Component {
    state = {
        username: "",
        password: "",
        disabled: true,
        formErrors: {
            username: "",
            password: "",
            loginError: ""
        }
    };

    handleChange = event => {
        const {name, value} = event.target;
        const {formErrors, username, password} = this.state;

        switch (name) {
            case "username":
                formErrors.username =
                    value.length < 5 ? "Minimum 5 characters required" : "";
                break;
            case "password":
                formErrors.password =
                    value.length < 3 ? "Minimum 3 characters required" : "";
                break;
            default:
                break;
        }

        this.setState({
            formErrors,
            [name]: value,
            disabled: (formErrors.username || !username) || (formErrors.password || !password)
        });
    };

    signIn = event => {
        const {username, password, formErrors} = this.state;
        const {signIn, history} = this.props;

        signIn({username: username, password: password}).then(res => {
            localStorage.setItem("adminLogin", "true");
            history.push('/');
            this.setState({
                username: '',
                password: ''
            });
        }).catch(error => {
            this.setState(prevState => ({
                formErrors: {
                    ...prevState.formErrors,
                    loginError: error
                }
            }));
            console.error(formErrors.loginError);
        });

        event.preventDefault();
    };

    render() {
        const {formErrors, disabled} = this.state;
        const {classes} = this.props;

        return (
            <main className={classes.main}>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                id="outlined-email-input"
                                label="Username"
                                className={formErrors.username.length > 0 ? classes.error__input : null}
                                onChange={this.handleChange}
                                type="text"
                                name="username"
                                autoComplete="username"
                                margin="normal"
                                variant="outlined"
                            />
                            {formErrors.username.length > 0 && (
                                <span className={classes.error__input}>{formErrors.username}</span>
                            )}
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                className={formErrors.password.length > 0 ? classes.error__input : null}
                                onChange={this.handleChange}
                                type="password"
                                name="password"
                                autoComplete="current-password"
                                margin="normal"
                                variant="outlined"
                            />
                            {formErrors.password.length > 0 && (
                                <span className={classes.error__input}>{formErrors.password}</span>
                            )}
                        </FormControl>
                        {formErrors.loginError.length > 0 && (
                            <span className={classes.error__input}>{formErrors.loginError}</span>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={`${classes.submit} ${classes.blue}`}
                            onClick={this.signIn}
                            disabled={!!disabled}
                        >
                            Sign in
                        </Button>
                    </form>
                </Paper>
            </main>
        );
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
    },
    error__input: {
        fontSize: 12,
        color: "red",
        display: "block",
    }
});

const mapDispatchToProps = dispatch => {
    return {
        signIn: bindActionCreators(signIn, dispatch),
    };
};

export default connect(null, mapDispatchToProps)(withRouter(withStyles(styles)(SignIn)));
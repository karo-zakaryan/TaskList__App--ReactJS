import React, {Component} from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    withStyles,
    Button,
    Popover,
} from '@material-ui/core';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Link, withRouter} from "react-router-dom";
import {signIn, signOut} from "../../redux/actions/authActions";
import routePaths from "../../constKeys/routePaths";

class Header extends Component {
    state = {
        anchorEl: null
    };

    componentDidMount() {
        const isAuth = Boolean(localStorage.adminLogin);
        const {signIn, admin} = this.props;
        (isAuth && !admin.isAuth) && signIn({username: "admin", password: "123"});
    }

    signOut = () => {
        const {signOut, history} = this.props;
        signOut();
        history.push("/");
        localStorage.removeItem("adminLogin", "false");
    };

    openAuthOver = e => {
        this.setState({
            anchorEl: e.currentTarget,
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };

    render() {
        const {classes, admin} = this.props;
        const {anchorEl} = this.state;
        const isAuth = localStorage.adminLogin;
        const open = Boolean(anchorEl);

        return (
            <nav className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Link to="/" className={classes.aLink}>
                            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                TaskListApp
                            </Typography>
                        </Link>

                        <Button className={classes.button} variant="text" onClick={this.openAuthOver}>
                            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                Authentication
                            </Typography>
                        </Button>
                        <Popover
                            id="auth-popper"
                            open={open}
                            anchorEl={anchorEl}
                            onClose={this.handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            {
                                isAuth
                                    ? <>
                                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                            <b>{admin.username}</b>
                                        </Typography>
                                        <Button className={classes.signOut} variant="text" onClick={this.signOut}>
                                            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                                Sign Out
                                            </Typography>
                                        </Button>
                                    </>
                                    : <>
                                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                            <b>user</b>
                                        </Typography>
                                        <Link to={routePaths.signIn} className={classes.aLink}>
                                            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                                Sign In
                                            </Typography>
                                        </Link>
                                    </>
                            }
                        </Popover>

                        <Link to={routePaths.appendTask} className={classes.aLink}>
                            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                Append Task
                            </Typography>
                        </Link>
                    </Toolbar>
                </AppBar>
            </nav>
        );
    }
}

const styles = theme => ({
    root: {
        width: '100%',
        "&>header>div": {
            justifyContent: "space-around",
        }
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        textOverflow: "initial",
        textTransform: "initial",
        [theme.breakpoints.down('sm')]: {
            fontSize: 15,
        },
    },
    logout: {
        width: "fit-content",
        "& div": {
            width: "fit-content",
        }
    },
    button: {
        color: "beige",
        "&:hover": {
            backgroundColor: "#2196f3"
        }
    },
    aLink: {
        textDecoration: "none",
        color: "beige"
    },
    signOut: {
        color: "black",
        "&:hover": {
            backgroundColor: "#fff"
        },
        "& span:hover": {
            color: "#2196f3"
        }
    }
});

const mapStateToProps = state => {
    return {
        admin: state.admin,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signOut: bindActionCreators(signOut, dispatch),
        signIn: bindActionCreators(signIn, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Header)));
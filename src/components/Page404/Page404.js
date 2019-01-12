import React from "react";
import {withStyles} from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import {withRouter} from "react-router-dom";
import {ArrowBack} from "@material-ui/icons";

const Page404 = ({classes, history}) => (
    <div className={classes.page_404}>
        <div className={classes.gif} style={{backgroundImage: "url('http://i.giphy.com/l117HrgEinjIA.gif')"}}/>
        <div className={classes.oops}>
            Oops!
            <Button className={classes.button} onClick={() => history.push("/")} color="primary">
                <ArrowBack/>
                Back to application</Button>
        </div>
    </div>
);

const styles = theme => ({
    page_404: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "#121212",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    gif: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundSize: "cover",
        mixBlendMode: "overlay"
    },
    oops: {
        fontFamily: "fantasy",
        fontSize: 144,
        color: "white",
        display: "flex",
        alignItems: "center",
        backgroundSize: "cover",
        justifyContent: "center",
    },
    button: {
        fontSize: 18
    }

});

export default withRouter(withStyles(styles)(Page404));
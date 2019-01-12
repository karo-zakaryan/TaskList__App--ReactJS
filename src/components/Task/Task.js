import React, {Component} from 'react';
import {
    Card,
    CardContent,
    CardActionArea,
    CardActions,
    Button,
    Badge,
    CardHeader,
    Typography,
    Input,
    FormControl,
    MenuItem,
    withStyles,
    TextField
} from "@material-ui/core";

class Task extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEdit: false,
            status: props.task.status,
            text: props.task.text
        };
    }

    editHandler = event => {
        const {id, editTask} = this.props;
        const {status, text} = this.state;
        const st = typeof status === "object" ? status[0] : status;
        const txt = typeof text === "object" ? text[0] : text;

        editTask({
            text: txt,
            status: st
        }, id);

        this.setState({
            isEdit: false
        }, () => {
            window.location.reload();
        });

        event.preventDefault();
    };

    isEditHandler = () => {
        this.setState({isEdit: !this.state.isEdit});
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: [event.target.value]
        });
    };

    render() {
        const {classes, task, admin} = this.props;
        const {isEdit, status} = this.state;
        const isAuth = localStorage.adminLogin;

        return (
            <Card className={classes.card}>
                {
                    isEdit
                        ? <form className={classes.root}>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="status"
                                    name="status"
                                    select
                                    label="Status"
                                    className={classes.textField}
                                    value={status}
                                    defaultValue={task.status}
                                    onChange={this.handleChange}
                                    SelectProps={{
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                    margin="normal"
                                    variant="outlined"
                                >
                                    <MenuItem value={10}>Done</MenuItem>
                                    <MenuItem value={0}>Not Done</MenuItem>
                                </TextField>
                                <Input type="textarea"
                                       name="text"
                                       defaultValue={task.text}
                                       onChange={this.handleChange}/>
                                <Button type="submit" onClick={this.editHandler} className={classes.saveBtn}>Save</Button>
                            </FormControl>
                        </form>
                        : <>
                            <CardActionArea>
                                <CardHeader
                                    title={`Username: ${task.username}`}
                                    subheader={`Email: ${task.email}`}
                                />
                                <CardContent>
                                    {(task.status === 10)
                                        ? <Badge badgeContent="D" color="primary" children="Done"/>
                                        : <Badge badgeContent="N" color="error" children="Not Done Yet"/>
                                    }
                                    <Typography component="p">
                                        Task: {task.text}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                {(admin && isAuth) && (
                                    <Button size="small" color="primary" onClick={this.isEditHandler}>Edit</Button>
                                )}
                            </CardActions>
                        </>
                }
            </Card>
        );
    }
}

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    card: {
        marginBottom: "1%"
    },
    media: {
        objectFit: 'cover',
    },
    formControl: {
        minWidth: 120,
        padding: 16
    },
    menu: {
        width: 200,
    },
    saveBtn: {
        "& span": {
            color: "#e91e63"
        }
    }
});

export default withStyles(styles)(Task);
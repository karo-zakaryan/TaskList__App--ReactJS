import React, {Component} from 'react';
import {config} from '../../configs/config';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import {editFilter} from "../../redux/actions/taskActions";
import {FormGroup, Button, TextField, MenuItem, withStyles} from "@material-ui/core";
import qs from "query-string";

class Filter extends Component {
    state = {
        filter: "",
        direction: ""
    };

    componentWillMount() {
        const {location, history, editFilter, embarkTasks, filter} = this.props;
        const params = qs.parse(location.search, {ignoreQueryPrefix: true});
        let newParams = {...params};

        if (!newParams.filter) {
            newParams.filter = config.filter.default.sort;
        }
        if (!newParams.direction) {
            newParams.direction = config.filter.default.direction;
        }
        if (!newParams.page) {
            newParams.page = 1;
        }

        history.push({
            pathname: '/',
            search: "?" + new URLSearchParams(newParams).toString()
        });

        editFilter(newParams);
        embarkTasks({
            ...filter,
            ...newParams
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {editFilter} = this.props;
        const {filter, direction} = this.state;
        if (prevState.filter !== filter) {
            editFilter({filter});
        }
        if (prevState.direction !== direction) {
            editFilter({direction});
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: [event.target.value]
        });
    };

    filterHandler = event => {
        const {filter, direction} = this.state;
        const {location, embarkTasks, history, filter: def} = this.props;
        const params = qs.parse(location.search, {ignoreQueryPrefix: true});

        if (filter[0] || direction[0]) {
            const configs = filter[0] && direction[0] ? {
                filter: filter[0],
                direction: direction[0],
                page: params.page
            } : filter[0] ? {
                filter: filter[0],
                direction: def.direction,
                page: params.page
            } : {
                filter: def.filter,
                direction: direction[0],
                page: params.page
            };

            embarkTasks(configs);
            history.push({
                pathname: '/',
                search: "?" + new URLSearchParams(configs).toString()
            });
        }

        event.preventDefault();
    };

    render() {
        const {classes, filter} = this.props;

        return (
            <div className={classes.root}>
                <form className={classes.form}>
                    <FormGroup>
                        <TextField
                            id="filter"
                            name="filter"
                            select
                            label="Filter By"
                            className={classes.textField}
                            value={filter.filter}
                            onChange={this.handleChange}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            margin="normal"
                            variant="outlined"
                        >
                            {
                                config.filter.sort.map((filterEL, index) => (
                                    <MenuItem key={index} value={filterEL}>
                                        {filterEL}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                    </FormGroup>
                    <FormGroup>
                        <TextField
                            id="direction"
                            name="direction"
                            select
                            label="Order"
                            className={classes.textField}
                            value={filter.direction}
                            onChange={this.handleChange}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            margin="normal"
                            variant="outlined"
                        >
                            {
                                config.filter.direction.map((filterEl, index) => (
                                    <MenuItem key={index} value={filterEl}>
                                        {filterEl}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                    </FormGroup>
                    <FormGroup className={classes.formGroup}>
                        <Button type="submit" className={classes.button} onClick={this.filterHandler}>Filter</Button>
                    </FormGroup>
                </form>
            </div>
        )
    }
}

const styles = theme => ({
    root: {
        marginBottom: "1%"
    },
    form: {
        display: "flex",
        justifyContent: "space-evenly"
    },
    textField: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        background: "rgba(255, 255, 255, 0.15)",
        marginLeft: 0,
        width: '300px',
        height: "100%",
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: '200px',
        }
    },
    menu: {
        marginTop: "-1%"
    },
    formGroup: {
        justifyContent: "space-evenly"
    },
    button: {
        backgroundColor: "darkgray",
        color: "#fff",
        "&:hover": {
            backgroundColor: "grey",
            transition: "0.5s"
        }
    }

});

const mapStateToProps = state => {
    return {
        filter: state.tasks.filter
    }
};

const mapDispatchToProps = dispatch => {
    return {
        editFilter: bindActionCreators(editFilter, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Filter)));
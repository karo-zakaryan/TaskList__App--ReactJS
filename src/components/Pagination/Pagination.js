import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import ReactPaginate from 'react-paginate';
import qs from 'query-string';

class Pagination extends Component {
    pageChangeHandler = event => {
        const {embarkTasks, history, location} = this.props;
        const params = qs.parse(location.search, {ignoreQueryPrefix: true});
        embarkTasks({
            filter: params.filter,
            direction: params.direction,
            page: event.selected + 1
        });
        history.push({
            pathname: '/',
            search: "?" + new URLSearchParams({
                filter: params.filter,
                direction: params.direction,
                page: event.selected + 1
            }).toString()
        });
    };

    render() {
        const {tasks} = this.props;
        return (
            <div>
                <ReactPaginate previousLabel={"Prev"}
                               nextLabel={"Next"}
                               pageCount={Math.ceil(tasks.amountOfTasks / 3)}
                               marginPagesDisplayed={3}
                               pageRangeDisplayed={tasks.tasksPerPage}
                               breakClassName={"break-me"}
                               onPageChange={this.pageChangeHandler}
                               containerClassName={"pagination"}
                               subContainerClassName={"pages pagination"}
                               activeClassName={"active"}/>
            </div>
        )
    }
}

export default withRouter(Pagination);
import actionTypes from "./actionTypes";
import {config} from '../../configs/config';
import API from "../../API";
import rfc3986 from "../../configs/rfc3986";
import md5 from "../../configs/md5";

const {sort, direction} = config.filter.default;

export const embarkTasks = (params = {sort, direction, page: 0}) => dispatch => {
    API.get(`/`, {
        params: {
            developer: config.devName,
            page: params.page,
            sort_field: params.sort,
            sort_direction: params.direction
        },
    })
        .then((res) => {
            if (res.data.status === "ok") {
                dispatch({
                    type: actionTypes.EMBARK_LIST,
                    data: res.data.message,
                    page: params.page
                });
            }
        }).catch(error => {
        console.error(error);
    });
};

export const appendTask = taskData => dispatch => {
    const params = {
        developer: config.devName,
    };
    return new Promise(
        (resolve, reject) => {
            API.post(`/create`, taskData, {
                params
            })
                .then(res => {
                    resolve();
                    embarkTasks();
                }).catch(error => {
                reject(error);
            });
        });
};

export const editTask = (unorderedData, id) => dispatch => {
    let params = {
        developer: config.devName
    };
    let formData = new FormData();
    let orderedData = {};
    let encodedObject = {};
    let encodedString = "";

    Object.keys(unorderedData).sort().forEach(function (key) {
        orderedData[key] = unorderedData[key];
    });
    orderedData.token = 'beejee';

    for (let prop in orderedData) {
        encodedObject[rfc3986(prop)] = rfc3986(orderedData[prop]);
    }
    for (let prop in encodedObject) {
        if (encodedString !== "") {
            encodedString += "&";
        }
        encodedString += `${prop}=${encodedObject[prop]}`
    }

    encodedString = md5(encodedString);
    orderedData.signature = encodedString;

    for (let prop in orderedData) {
        formData.append(prop, orderedData[prop]);
    }

    API.post(`/edit/${id}/`, formData, {
        params
    })
        .then(res => {
            dispatch({
                type: actionTypes.EDIT_TASK,
                data: unorderedData,
                id: id
            });
        }).catch(error => {
        console.error(error);
    });
};


export const editFilter = newParams => dispatch => {
    dispatch({
        type: actionTypes.EDIT_FILTER,
        newParams
    })
};
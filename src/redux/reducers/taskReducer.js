import actionTypes from "../actions/actionTypes";
import {config} from '../../configs/config';

const filterDelConf = config.filter.default;
const initialState = {
    tasks: {
        currentTasks: [],
        amountOfTasks: 0,
        tasksPerPage: config.tasks.perPage,
    },
    filter: {
        filter: filterDelConf.sort,
        direction: filterDelConf.direction,
        page: filterDelConf.page
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.EMBARK_LIST:
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    currentTasks: [
                        ...action.data.tasks
                    ],
                    amountOfTasks: action.data.total_task_count,
                },
                filter: {
                    ...state.filter,
                    page: action.page
                },
            };
        case actionTypes.EDIT_TASK:
            let tempState = Object.assign({}, state);
            tempState.tasks.currentTasks = tempState.tasks.currentTasks.map(currentTask => {
                if (currentTask.id === action.id) {
                    return Object.assign({}, currentTask, action.data);
                }
                return currentTask;
            });
            return tempState;
        case actionTypes.EDIT_FILTER:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    ...action.newParams
                }
            };
        default:
            return state;
    }
}
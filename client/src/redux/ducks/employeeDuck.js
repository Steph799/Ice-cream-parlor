import { addInfo, getInfo, updateInfo, removeInfo } from "../../shared/service"


//Types
const FETCH_EMPLOYEES_REQUEST = "FETCH_EMPLOYEES_REQUEST"
const FETCH_EMPLOYEES_SUCCESS = "FETCH_EMPLOYEES_SUCCESS"
const FETCH_EMPLOYEES_FAILURE = "FETCH_EMPLOYEES_FAILURE"

const ADD_EMPLOYEE_REQUEST = "ADD_EMPLOYEE_REQUEST"
const ADD_EMPLOYEE_SUCCESS = "ADD_EMPLOYEE_SUCCESS"
const ADD_EMPLOYEE_FAILURE = "ADD_EMPLOYEE_FAILURE"

const EDIT_EMPLOYEE_REQUEST = "EDIT_EMPLOYEE_REQUEST"
const EDIT_EMPLOYEE_SUCCESS = "EDIT_EMPLOYEE_SUCCESS"
const EDIT_EMPLOYEE_FAILURE = "EDIT_EMPLOYEE_FAILURE"

const REMOVE_EMPLOYEE_REQUEST = "REMOVE_EMPLOYEE_REQUEST"
const REMOVE_EMPLOYEE_SUCCESS = "REMOVE_EMPLOYEE_SUCCESS"
const REMOVE_EMPLOYEE_FAILURE = "REMOVE_EMPLOYEE_FAILURE"

//------------FETCH----------------------------------------------------------------------//
const fetchEmployeesRequest = () => {
    return {
        type: FETCH_EMPLOYEES_REQUEST
    }
}
const fetchEmployeesSuccess = (employees) => {
    return {
        type: FETCH_EMPLOYEES_SUCCESS,
        payload: employees
    }
}
const fetchEmployeesFailure = (error) => {
    return {
        type: FETCH_EMPLOYEES_FAILURE,
        payload: error
    }
}
//------------ADD----------------------------------------------------------------------//
const addEmployeeRequest = () => {
    return {
        type: ADD_EMPLOYEE_REQUEST,
    }
}
const addEmployeeSuccess = (employee) => {
    return {
        type: ADD_EMPLOYEE_SUCCESS,
        payload: employee
    }
}

const addEmployeeFailure = (error) => {
    return {
        type: ADD_EMPLOYEE_FAILURE,
        payload: error
    }
}

//------------EDIT----------------------------------------------------------------------//

const editEmployeeRequest = () => {
    return {
        type: EDIT_EMPLOYEE_REQUEST,
    }
}
const editEmployeeSuccess = (employee) => {
    return {
        type: EDIT_EMPLOYEE_SUCCESS,
        payload: employee
    }
}

const editEmployeeFailure = (error) => {
    return {
        type: EDIT_EMPLOYEE_FAILURE,
        payload: error
    }
}

//------------DELETE----------------------------------------------------------------------//

const removeEmployeeRequest = () => {
    return {
        type: REMOVE_EMPLOYEE_REQUEST,
    };
};

const removeEmployeeSuccess = (index) => {
    return {
        type: REMOVE_EMPLOYEE_SUCCESS,
        payload: index,
    };
};

const removeEmployeeFailure = (error) => {
    return {
        type: REMOVE_EMPLOYEE_FAILURE,
        payload: error,
    };
};


export const fetchEmployees = () => {
    return async function (dispatch) {
        dispatch(fetchEmployeesRequest())
        try {
            const employees = await getInfo("employees")   
            dispatch(fetchEmployeesSuccess(employees))
        }
        catch (error) {
            dispatch(fetchEmployeesFailure(error.massage))
        }
    }
}

export const addEmployee = (employee) => {
    return async function (dispatch) {
        dispatch(addEmployeeRequest())
        try {
            const newEmployee = await addInfo("employees", employee)   
            dispatch(newEmployee ? addEmployeeSuccess(newEmployee) : addEmployeeFailure("Fail to add this employee") )        
        }
        catch (error) {
            dispatch(addEmployeeFailure(error.massage))
        }
    }
}

export const editEmployee = (employee, id, index) => {
    return async function fetchMyApi(dispatch) {
        dispatch(editEmployeeRequest());
        try {
            const updatedEmployee = await updateInfo("employees", employee, id) //in the db
            const data = { index: index, employee: updatedEmployee }
            dispatch(editEmployeeSuccess(data))
        } catch (error) {
            dispatch(editEmployeeFailure(error.massage))
        }
    };
};

export const removeEmployee = (id, index) => {
    return async function fetchMyApi(dispatch) {
        dispatch(removeEmployeeRequest());
        try {
            await removeInfo("employees", id) //delete in mongo
            dispatch(removeEmployeeSuccess(index)) //tell the ui which index do we delete
        } catch (error) {
            dispatch(removeEmployeeFailure(error.massage))
        }
    };
};


const initialState = {
    loading: false,
    employees: [],
    error: ''
}


export function employeeReducer(state = initialState, { type, payload }) {
    switch (type) {
        case FETCH_EMPLOYEES_REQUEST:
            return { ...state, loading: true }
        case FETCH_EMPLOYEES_SUCCESS:
            return { loading: false, employees: payload, error: '' }
        case FETCH_EMPLOYEES_FAILURE:
            return { loading: false, employees: [], error: payload }

        case ADD_EMPLOYEE_REQUEST:
            return { ...state, loading: true }
        case ADD_EMPLOYEE_SUCCESS:
            return { loading: false, employees: [...state.employees, payload], error: '' }
        case ADD_EMPLOYEE_FAILURE:
            return { loading: false, employees: state.employees, error: payload }

        case EDIT_EMPLOYEE_REQUEST:
            return { ...state, loading: true }
        case EDIT_EMPLOYEE_SUCCESS:
            const updatedArray = [...state.employees.slice(0, payload.index), payload.employee,
            ...state.employees.slice(payload.index + 1)]
            return {
                loading: false,
                employees: updatedArray,
                error: '',
            };
        case EDIT_EMPLOYEE_FAILURE:
            return {
                loading: false,
                employees: state.employees,
                error: payload,
            };

        case REMOVE_EMPLOYEE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case REMOVE_EMPLOYEE_SUCCESS:
            state.employees.splice(payload, 1)
            return {
                loading: false,
                employees: state.employees, //payload is the index
                error: '',
            };
        case REMOVE_EMPLOYEE_FAILURE:
            return {
                loading: false,
                employees: state.employees,
                error: payload,
            };
        default:
            return state
    }
}


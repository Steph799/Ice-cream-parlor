import { combineReducers } from "redux";
import {employeeReducer} from './ducks/employeeDuck'
import { shipmentReducer} from './ducks/shipmentDuck'
import {commentReducer} from './ducks/commentDuck'
import { messageReducer} from './ducks/messageDuck'


const rootReducer = combineReducers({
    employee: employeeReducer,
    comment: commentReducer,
    message: messageReducer,
    shipment: shipmentReducer,
})

export default rootReducer
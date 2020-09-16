import thunks from 'redux-thunk'
import {createStore,applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import axios from 'axios';



const REMOVE='REMOVE';
const DESTROY='DESTROY';
const ADD_EMPLOYEES='ADD_EMPLOYEES';
const ADD_DEPARTMENTS='ADD_DEPARTMENTS'

 export const removeFromDepartmentAction=(employee)=>({type:REMOVE,data:employee})
 export const destroyEmployeeAction=(employee)=>({type:DESTROY,data:employee})
  const setfetchEmployees=(employees)=>({type:ADD_EMPLOYEES,data:employees});
  const setfetchDepartments=(departments)=>({type:ADD_DEPARTMENTS,data:departments});

const initialState={
    departments: [],
     employees: [],

}
export const fetchEmployees=()=>{
    return async (dispatch)=>{
        const {data}=await axios.get('/api/employees')
        dispatch(setfetchEmployees(data))
    }
}

export const fetchDepartments=()=>{
    return async (dispatch)=>{
        const {data}=await axios.get('/api/departments')
        dispatch(setfetchDepartments(data))
    }
}




 const reducer=(state=initialState,action)=>{
    switch(action.type){
            case REMOVE:
               const employeeId=action.data;
               
            //   return state.map(_employee=>employee.id===employeeId?employee:_employee)
                const newArr=state.employees.map(employee=>{
                   return employeeId.id===employee.id?employeeId:employee
                })
               return(
                   {
                       ...state,
                       employees:newArr
                    })
            case DESTROY:
             const employeeeId=action.data.id;
             const newArrr= state.employees.filter(employee=>{
                 return employee.id !==employeeeId})
              return (
                  {
                      ...state,
                      employees:newArrr
                  }
              )  

             case ADD_EMPLOYEES:
                 const employee=action.data;
                 return ({
                     ...state,
                     employees:employee,
                 })

                 case ADD_DEPARTMENTS:
                 const department=action.data;
                 return ({
                     ...state,
                     departments:department,
                 })
             default:
                 return state; 

    }
}


const store=createStore(reducer,applyMiddleware(thunks,createLogger()))
export default store
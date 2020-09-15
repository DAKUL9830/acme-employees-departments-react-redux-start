import React from 'react';
import store from '../store';
import {connect} from 'react-redux'
import {destroyEmployeeAction,removeFromDepartmentAction} from '../store';



const Employee = ({ employee, deleteEmployee, removeDepartment })=> {
  return (
    <li key={ employee.id }>
      { employee.name }
      <button onClick={ function(){deleteEmployee(employee)}}>x</button>
      {
        //!!store.dispatch({type:'REMOVE'}) && (
          <button onClick={ function(){removeDepartment(employee)}}>Remove From Department</button>
        //)
      }
    </li>
  );
};
 function mapDispatchToProps(dispatch){
  return {
    removeDepartment: employee=>{
        dispatch(removeFromDepartmentAction(employee))
    },
    deleteEmployee:employee=>{
        dispatch(destroyEmployeeAction(employee))
    },
    
}
 }
export default connect(null,mapDispatchToProps) (Employee);

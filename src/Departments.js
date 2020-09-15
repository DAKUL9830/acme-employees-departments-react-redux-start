import React from 'react';
import Department from './Department';
import {connect} from 'react-redux'
const Departments = ({ departments, employees, destroyEmployee, removeFromDepartment })=> {
  return (
    <ul className='departments'>
      <Department destroyEmployee={ destroyEmployee } employees={ employees } />
      {
        departments.map( department => {
          return (
            <Department
              key = { department.id }
              department = { department }
              employees = { employees }
              destroyEmployee = { destroyEmployee }
              removeFromDepartment = { removeFromDepartment }
            />
          );
        })
      }
    </ul>
  );
}

export default connect(null,null)(Departments);

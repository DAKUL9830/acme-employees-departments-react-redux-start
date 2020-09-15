import React from 'react';
import Employees from './Employees';
import {connect} from 'react-redux'

const Department = ({ department, employees, destroyEmployee, removeFromDepartment })=> {
    return (
      <li>
        <span className='department-title'>
          { department ? department.name : 'No Department' } ({
            employees.filter( employee => employee.departmentId === (department ? department.id : null) ).length
          })
        </span>
        <Employees
          department={ department }
          employees ={ employees }
          destroyEmployee = { destroyEmployee }
          removeFromDepartment={ removeFromDepartment }
        />
      </li>
    );
};

export default connect(null,null)(Department);

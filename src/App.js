import React from 'react';
import axios from 'axios';
import Departments from './Departments';
import Stats from './Stats';
import {connect} from 'react-redux';
import {fetchEmployees,fetchDepartments,destroyEmployeeAction,removeFromDepartmentAction} from '../store';



class App extends React.Component{
  constructor(props){
    super(props);
    //this.state = store.getState();
    //   departments: [],
    //   employees: []
    
    this.destroyEmployee = this.destroyEmployee.bind(this);
    this.removeFromDepartment = this.removeFromDepartment.bind(this);
  }
//   async destroyEmployee(employee){
//     await axios.delete(`/api/employees/${employee.id}`);
//     const employees = this.state.employees.filter(_employee => employee.id !== _employee.id);
//     this.setState({ employees });
//  }

 async destroyEmployee(employee){
    
        try{
            
    await axios.delete(`/api/employees/${employee.id}`);
        }catch(err){
            console.error(err.message)
        }
        //dispatch (destroyEmployeeAction(employee))
        this.props.deleteEmployee(employee)
    }
    
 
 
//   async removeFromDepartment(employee){
//     employee = (await axios.put(`/api/employees/${employee.id}`, { departmentId: null})).data;
//     const employees = this.state.employees.map(_employee => employee.id === _employee.id ? employee : _employee);
//     this.setState({ employees });
//   }
 async removeFromDepartment(employee){
   
        try{
     axios.put(`/api/employees/${employee.id}`, { departmentId: null}).data;
        }catch(err){
          console.error(err.message)
        }
        //dispatch (removeFromDepartmentAction(employee))
    this.props.removeDepartment(employee);
  }
//   async componentDidMount(){
//     const responses = await Promise.all([
//       axios.get('/api/employees'),
//       axios.get('/api/departments'),
//     ]);
//     this.setState({
//       employees: responses[0].data,
//       departments: responses[1].data
//     });
//   }
     async componentDidMount(){
      const employees= await axios.get('/api/employees');
      const departments=await axios.get('/api/departments');
      this.props.fetchEmp(employees.data);
      this.props.fetchDep(departments.data);

    }
    // fetchData(){
    //     {
    //         return (dispatch) => {
    //             request.get('/api/employees'),
    //             request.get('/api/departments')
    //             .then((res) => {
    //                 return res.body
    //             }).then(data => {
    //                 dispatch(data)
    //             })
    //         }
    //     }
    // }
  render(){
  const{employees,departments}= this.props;
    const { destroyEmployee, removeFromDepartment } = this;
    if(!Array.isArray(employees)||!Array.isArray(departments)){
        console.log(employees)
        return <div>loading</div>
    }
    return (
      <div>
        <h1>Acme Employees And Departments</h1>
        <Stats employees={ employees }/>
        <Departments
          departments={ departments }
          employees={ employees }
          destroyEmployee = { destroyEmployee }
          removeFromDepartment = { removeFromDepartment }
      />
      </div>
    );
  }
}
function mapStateToProps(state){
  return { employees:state.employees,
             departments:state.departments}

}
function mapDispatchToProps(dispatch){
    return {
        removeDepartment: employee=>{
            dispatch(removeFromDepartmentAction(employee))
        },
        deleteEmployee:employee=>{
            dispatch(destroyEmployeeAction(employee))
        },
        fetchEmp:employee=>{
            dispatch(fetchEmployees(employee))
        },
        fetchDep:department=>{
            dispatch(fetchDepartments(department))
        },
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(App)
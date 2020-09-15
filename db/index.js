const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/newacme_db');
const faker = require('faker');

const Employee = conn.define('employee', {
  name: STRING 
});

const Department = conn.define('department', {
  name: STRING 
});

Employee.belongsTo(Department);

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const _departments = [];
  while(_departments.length < 5){
    _departments.push(Department.create({ name: faker.commerce.department() }));
  }
  const departments = await Promise.all(_departments);
  const _employees = [];
  while(_employees.length < 50){
    _employees.push(Employee.create({ name: faker.name.firstName(), departmentId: faker.random.arrayElement(departments).id }));
  }
};

module.exports = {
  syncAndSeed,
  models: {
    Employee,
    Department
  }
};

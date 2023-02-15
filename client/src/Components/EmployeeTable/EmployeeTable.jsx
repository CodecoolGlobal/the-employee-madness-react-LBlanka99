import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onDelete }) => (
  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Position</th>
          <th>Starting date</th>
          <th>Salary (USD)</th>
          <th>Desired salary (USD)</th>
          <th>Difference</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id} style={{backgroundColor: employee.favColor}}>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td>{new Date(employee.startingDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
            <td>{employee.currentSalary.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).slice(0, -3)}</td>
            <td>{employee.desiredSalary.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).slice(0, -3)}</td>
            <td>{(employee.desiredSalary - employee.currentSalary).toLocaleString('en-US', { style: 'currency', currency: 'USD' }).slice(0, -3)}</td>
            <td>
              <Link to={`/update/${employee._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => onDelete(employee._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EmployeeTable;

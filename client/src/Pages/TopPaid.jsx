import { useState } from "react";


const fetchEmployees = () => {
    return fetch("/api/top-paid-employees?limit=3").then((res) => res.json());
  };

const TopPaid = () => {
    const [employees, setEmployees] = useState(null);

    fetchEmployees().then(res => setEmployees(res));

    return (
    <div className="EmployeeTable">
        <table>
        <thead>
            <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Position</th>
            <th>Salary</th>
            <th />
            </tr>
        </thead>
        <tbody>
            {employees && employees.map((employee) => (
            <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.level}</td>
                <td>{employee.position}</td>
                <td>{employee.salary}</td>
            </tr>
        ))}
      </tbody>
    </table>
  </div>
)};

export default TopPaid;
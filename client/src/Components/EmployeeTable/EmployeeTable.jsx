import { useState } from "react";
import { Link } from "react-router-dom";
import "./EmployeeTable.css";



const EmployeeTable = ({ employees, onDelete }) => {
  const levels = employees.reduce((acc, employee) => {
    if (!acc.includes(employee.level)) {
      acc.push(employee.level);
    };
    return acc;
  }, []);

  const positions = employees.reduce((acc, employee) => {
    if (!acc.includes(employee.position)) {
      acc.push(employee.position);
    }
    return acc;
  }, []);

  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");

  const handleLevelChange = event => {
    console.log(event.target.value);
    setSelectedLevel(event.target.value);
  };

  const handlePositionChange = event => {
    setSelectedPosition(event.target.value);
  }

  let empty = true;
  
  return (
  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Level
            <select name="levels" onChange={handleLevelChange}>
              <option value={""}>-- Choose a level to filter --</option>
              {levels.map(level =>
                <option key={level} value={level}>{level}</option>
              )}
            </select>
          </th>
          <th>Position
            <select name="positions" onChange={handlePositionChange}>
              <option value={""}>-- Choose a position to filter --</option>
              {positions.map(position =>
                <option key={position} value={position}>{position}</option>
              )}
            </select>
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => {
          if ((employee.level === selectedLevel || !selectedLevel) && (employee.position === selectedPosition || !selectedPosition)) {
            empty = false;
            return (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.level}</td>
                <td>{employee.position}</td>
                <td>
                  <Link to={`/update/${employee._id}`}>
                    <button type="button">Update</button>
                  </Link>
                  <button type="button" onClick={() => onDelete(employee._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            )
          }
          })}
      </tbody>
    </table>
    {empty ? <h1 id="empty">There is not a single {selectedLevel} {selectedPosition} among the employees :/</h1> : <></>}
  </div>
)};

export default EmployeeTable;

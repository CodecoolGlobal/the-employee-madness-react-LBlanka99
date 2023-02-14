import {  useState } from "react";
import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'



const EmployeeTable = ({ employees, onDelete, onToggle }) => {
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [sortingBy, setSortingBy] = useState("");
  const [arrow, setArrow] = useState(faArrowDown);
  const [direction, setDirection] = useState(1);
  let empty = true;


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

  const filterByLevels = event => {
    setSelectedLevel(event.target.value);
  };

  const filterByPositions = event => {
    setSelectedPosition(event.target.value);
  };

  const handleSorting = event => {
    setSortingBy(event.target.value);
  };

  const toggleDirection = () => {
    if (arrow === faArrowDown) {
      setArrow(faArrowUp);
      setDirection(-1)
    } else {
      setArrow(faArrowDown);
      setDirection(1);
    }
  }


  if (sortingBy) {
      if (sortingBy === "lastName") {
        employees.sort((a, b) => (a.name.split(" ").at(-1) > b.name.split(" ").at(-1)) ? 1*direction : -1*direction);
      } else if (sortingBy === "middleName") {
        let filtered = employees.filter(employee => employee.name.split(" ").length > 2);
        filtered.sort((a, b) => (a.name.split(" ")[1] > b.name.split(" ")[1] ? 1*direction : -1*direction));
        let others = employees.filter(employee => employee.name.split(" ").length <= 2);
        employees = filtered.concat(others);
      } else {
        employees.sort((a, b) => (a[sortingBy] > b[sortingBy]) ? 1*direction : -1*direction);
      }
  }


  
  return (
  <div className="table">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Level
            <select name="levels" onChange={filterByLevels}>
              <option value={""}>-- Choose a level to filter --</option>
              {levels.map(level =>
                <option key={level} value={level}>{level}</option>
              )}
            </select>
          </th>
          <th>Position
            <select name="positions" onChange={filterByPositions}>
              <option value={""}>-- Choose a position to filter --</option>
              {positions.map(position =>
                <option key={position} value={position}>{position}</option>
              )}
            </select>
          </th>
          <th>Equipment</th>
          <th>Present</th>
          <th>Sort by
            <select name="sorting" onChange={handleSorting}>
              <option value={""}>-- Please choose --</option>
              <option value={"name"}>First name</option>
              <option value={"lastName"}>Last name</option>
              <option value={"middleName"}>Middle name</option>
              <option value={"position"}>Position</option>
              <option value={"level"}>Level</option>
            </select>
            <button onClick={toggleDirection} id="arrow">
            <FontAwesomeIcon icon={arrow} />
            </button>
          </th>
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
                <td>{employee.equipment}</td>
                <td>
                  <input
                  type="checkbox"
                  checked={employee.present}
                  onChange={() => onToggle(employee._id)} />
                </td>
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

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
          <th>Max Players of the favourite board game</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => {
          let maxPlayers;
          if (employee.favGame) {
            fetch(`/api/boardGames/${employee.favGame}`).then(res => res.json).then(res => {maxPlayers = res.maxPlayers});
            console.log(maxPlayers);
          }
          return (
            <tr key={employee._id}>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td>{maxPlayers}</td>
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
        })}
      </tbody>
    </table>
  </div>
);

export default EmployeeTable;

import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onDelete }) => {
  const [openModal, setOpenModal] = useState(false);
  const [deletableID, setDeletableID] = useState(null);

  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Position</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
              <td>
                <Link to={`/update/${employee._id}`}>
                  <button type="button">Update</button>
                </Link>
                <button type="button" onClick={() => {
                  setOpenModal(true);
                  setDeletableID(employee._id)
                  }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal 
      open={openModal} 
      onClose={() => {
        setOpenModal(false);
        setDeletableID(null)
        }} 
      onSubmit={() => {
        onDelete(deletableID);
        setOpenModal(false)
        }}>
        Are you sure to delete?
      </Modal>
    </div>
  );
}


export default EmployeeTable;

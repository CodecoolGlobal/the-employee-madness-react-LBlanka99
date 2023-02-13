import { useEffect, useState } from "react";

const updateEmployee = (employee) => {
  return fetch(`/api/employees/${employee._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [equipments, setEquipments] = useState(null);
  const [data, setData] = useState(employee);
  

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    return onSave(employee);
  };

  const fetchEquipments = () => {
    return fetch("/api/equipments").then((res) => res.json());
  };

  useEffect(() => {
    fetchEquipments().then(res => setEquipments(res));
  }, []);

  const chooseEquipment = (event) => {
    employee.equipment = event.target.value;
    updateEmployee(employee);
    setData({...employee})
  }


  return (
    <div>
      <form className="EmployeeForm" id="EmployeeForm" onSubmit={onSubmit}>
        {data && (
          <input type="hidden" name="_id" defaultValue={data._id} />
        )}

        <div className="control">
          <label htmlFor="name">Name:</label>
          <input
            defaultValue={data ? data.name : null}
            name="name"
            id="name"
          />
        </div>

        <div className="control">
          <label htmlFor="level">Level:</label>
          <input
            defaultValue={data ? data.level : null}
            name="level"
            id="level"
          />
        </div>

        <div className="control">
          <label htmlFor="position">Position:</label>
          <input
            defaultValue={data ? data.position : null}
            name="position"
            id="position"
          />
        </div>
      </form>

      <div className="control equipment-select">
        <label htmlFor="equipment">Equipment in use:</label>
        <select
          value={data?.equipment ? data.equipment : ""}
          name="equipment"
          id="equipment"
          form="EmployeeForm"
          onChange={chooseEquipment}
        >
          <option value="">Please select an equipment</option>
          {equipments && equipments.map(equipment => 
            <option key={equipment._id} value={equipment.name}>{equipment.name}</option>)}
        </select>
      </div>

      <form>
      <div className="buttons">
          <button type="submit" disabled={disabled}>
            {data ? "Update Employee" : "Create Employee"}
          </button>

          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;

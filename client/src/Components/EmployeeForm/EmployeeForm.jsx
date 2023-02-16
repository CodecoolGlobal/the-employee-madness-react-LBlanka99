import { useEffect, useState } from "react";

const EmployeeForm = ({ onSave, disabled, employee, onCancel, chooseBoardGame }) => {
  const [games, setGames] = useState(null);
  const [choosenGame, setChoosenGame] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    const choosenID = games.filter(game => game.name === choosenGame)[0]._id;
    employee.favGame = choosenID;

    return onSave(employee);
  };

  useEffect(() => {
    fetch("/api/boardGames/").then(res => res.json()).then(res => setGames(res));
  }, []);

  return (
    <form className="EmployeeForm" id="employeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={employee ? employee.name : null}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          defaultValue={employee ? employee.level : null}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
        />
      </div>

      <div className="control">
        <label htmlFor="favGame">Favourite game:</label>
        <select
          value={choosenGame}
          name="favGame"
          id="favGame"
          form="employeeForm"
          onChange={(event) => setChoosenGame(event.target.value)}
        >
          <option value="">Please choose a board game</option>
          {games && games.map(game => (
            <option value={game.name} key={game._id}>{game.name}</option>
          ))}
        </select>
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;

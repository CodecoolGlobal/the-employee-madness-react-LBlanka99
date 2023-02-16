import { useEffect, useState } from "react";

const { useParams } = require("react-router-dom");

const Kittens = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [kittens, setKittens] = useState(null);
  const [newName, setNewName] = useState("");
  const [newWeight, setNewWeight] = useState("");

  useEffect(() => {
    fetch(`/api/kittens/${id}`)
      .then((res) => res.json())
      .then((res) => setKittens(res));
    fetch(`/api/employees/${id}`)
      .then((res) => res.json())
      .then((res) => setEmployee(res));
  }, [id]);

  const createKitten = () => {
    if (newName && newWeight) {
      const newKitten = {
        name: newName,
        weight: newWeight,
        employee: employee._id,
      };
      fetch("/api/kittens/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newKitten),
      })
        .then((res) => res.json())
        .then((res) => setKittens([...kittens, res]));
      setNewName("");
      setNewWeight("");
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Weight</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          {kittens &&
            employee &&
            kittens.map((kitten) => (
              <tr key={kitten._id}>
                <td>{kitten.name}</td>
                <td>{kitten.weight} kg</td>
                <td>{employee.name}</td>
              </tr>
            ))}
          <tr>
            <td>
              <input
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                value={newWeight}
                onChange={(event) => setNewWeight(event.target.value)}
              />
            </td>
            <td>
              <button onClick={createKitten}>Add Kitten</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Kittens;

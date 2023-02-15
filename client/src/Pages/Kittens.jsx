import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Kittens = () => {
    const { id } = useParams();
    const [kittens, setKittens] = useState(null);
    const [newName, setNewName] = useState("");
    const [newWeight, setNewWeight] = useState("");
    const [employee, setEmployee] = useState(null)

    useEffect(() => {
        fetch(`/api/employees/${id}`).then(res => res.json()).then(res => {
            setKittens(res.kittens);
            setEmployee(res);
        });
    }, [id]);

    const createKitten = () => {
        if (newName && newWeight && newWeight > 0) {
            employee.kittens.push({name: newName, weight: newWeight});
            fetch(`/api/employees/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(employee)
            }
            )
            setNewName("");
            setNewWeight("");
        }
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Weight</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {kittens && kittens.map(kitten => (
                        <tr key={kitten._id}>
                            <td>{kitten.name}</td>
                            <td>{kitten.weight} kg</td>
                            <td />
                        </tr>
                    ))}
                    <tr>
                        <td>
                            <input value={newName} onChange={(event) => setNewName(event.target.value)}/>
                        </td>
                        <td>
                            <input type="number" value={newWeight} onChange={(event) => setNewWeight(event.target.value)} />
                        </td>
                        <td>
                            <button onClick={createKitten}>Add new kitten</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};

export default Kittens;
import { useState } from "react";

const ToolsTable = ({tools, filterTools, setTools}) => {
    const [newName, setNewName] = useState("");
    const [newWeight, setNewWeight] = useState("");

    const createTool = () => {
        if(newName && newWeight && newWeight > 0) {
            fetch("/api/tools/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name: newName, weight: newWeight})
            }).then(res => res.json()).then(res => setTools([...tools, res]));
            setNewName("");
            setNewWeight("");
        }
    }


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name
                            <input id="filterInput" onChange={filterTools}></input>
                        </th>
                        <th>Weight</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {tools && tools.map(tool => (
                        <tr key={tool._id}>
                            <td>{tool.name}</td>
                            <td>{tool.weight} kg</td>
                            <td />
                        </tr>
                    ))}
                    <tr>
                        <td>
                            <input value={newName} onChange={(event) => setNewName(event.target.value)} />
                        </td>
                        <td>
                            <input value={newWeight} onChange={(event) => setNewWeight(event.target.value)} type="number" />
                        </td>
                        <td>
                            <button onClick={createTool}>Add tool</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};

export default ToolsTable;
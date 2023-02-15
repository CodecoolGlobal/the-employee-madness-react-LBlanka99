const ToolsTable = ({tools}) => {

    const filterTools = (event) => {
        fetch(`/api/tools?name=${event.target.value}`)
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
                    </tr>
                </thead>
                <tbody>
                    {tools && tools.map(tool => (
                        <tr key={tool._id}>
                            <td>{tool.name}</td>
                            <td>{tool.weight} kg</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default ToolsTable;
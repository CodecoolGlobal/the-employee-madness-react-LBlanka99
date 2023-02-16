import { useEffect, useState } from "react";
import ToolsTable from "../Components/ToolsTable";

const ToolList = () => {
    const [tools, setTools] = useState(null);

    useEffect(() => {
        fetch("/api/tools/").then(res => res.json()).then(res => setTools(res));
    }, []);

    const filterTools = (event) => {
        fetch(`/api/tools?name=${event.target.value}`).then(res => res.json()).then(res => setTools(res));
    }

    return (
        <ToolsTable tools={tools} filterTools={filterTools} setTools={setTools}/>
    )
};

export default ToolList;
import { useEffect, useState } from "react";
import ToolsTable from "../Components/ToolsTable";

const ToolList = () => {
    const [tools, setTools] = useState(null);

    useEffect(() => {
        fetch("/api/tools/").then(res => res.json()).then(res => setTools(res));
    }, [])

    return (
        <ToolsTable tools={tools} />
    )
};

export default ToolList;
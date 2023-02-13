import React, { useEffect, useState } from "react";

const fetchEmployees = () => {
    return fetch("/api/employees").then((res) => res.json());
  };

const MissingEmployees = () => {
    const [data, setData] = useState(null);
    let missings;
    
    useEffect(() => {
        fetchEmployees()
        .then((employees) => {
            setData(employees);
            console.log(employees);
        })
    }, []);
    
    if (data) {
        missings = data.filter(employee => employee.present === false);
        console.log(missings);
    }
    

    return (
        <ul>
            {data && missings.map(missing => <li key={missing._id}>{missing.name}</li>)}
        </ul>
    )
}

export default MissingEmployees;
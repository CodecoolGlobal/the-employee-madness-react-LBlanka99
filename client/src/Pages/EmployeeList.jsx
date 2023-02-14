import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = (signal) => {
  return fetch("/api/employees", { signal }).then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const handleDelete = (id) => {
    deleteEmployee(id).catch((err) => {
      console.log(err);
    });

    setData((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  const handlePresent = (id) => {
    const index = data.findIndex(employee => employee._id === id);
    data[index].present = !data[index].present;
    fetch(`/api/employees/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data[index]),
    }).then((res) => res.json());
    setData([...data]);
  }

  useEffect(() => {
    const controller = new AbortController();

    fetchEmployees(controller.signal)
      .then((employees) => {
        setLoading(false);
        setData(employees.results);
        setNextPage(employees.next.page);
        setPrevPage(employees.prev.page);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setData(null);
          throw error;
        }
      });

    return () => controller.abort();
  }, []);

  const jumpTo = (page) => {
    if (!page) {
      return;
    }
    fetch(`api/employees?page=${page}`).then((res) => res.json())
      .then((res) => {
        setData(res.results);
        setNextPage(res.next.page);
        setPrevPage(res.prev.page);
      })
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <EmployeeTable employees={data} onDelete={handleDelete} onToggle={handlePresent} />
      {prevPage ? 
      <button onClick={() => jumpTo(prevPage)}>Previous page</button> :
      <button disabled>Previous page</button>}
      {nextPage ?
      <button onClick={() => jumpTo(nextPage)}>Next page</button> :
      <button disabled>Next page</button>
      }
    </div>
  )
};

export default EmployeeList;

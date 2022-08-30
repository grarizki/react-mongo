import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../App.css'

const Record = (props) => (
    <tr className="table-info table-hover">
        <td className="fw-bold text-uppercase ">{props.record.name}</td>
        <td className="fw-bold text-uppercase text-primary">{props.record.position}</td>
        <td className="fw-bold text-uppercase text-success">{props.record.level}</td>
        <td>
            <Link className="btn btn-warning" to={`/edit/${props.record._id}`}>Edit</Link> <span className="mx-sm-2"></span>
            <button className="btn btn-danger"
                onClick={() => {
                    props.deleteRecord(props.record._id);
                }}
            >
                Delete
            </button>
        </td>
    </tr>
);

export default function RecordList() {
    const [records, setRecords] = useState([]);
    const [order, setOrder] = useState("ASC")
    const sort = (col) => {
        if (order === "ASC") {
            const sorted = [...records].sort((a, b) => a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
            setRecords(sorted)
            setOrder("DSC")
        }
        if (order === "DSC") {
            const sorted = [...records].sort((a, b) => a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1);
            setRecords(sorted)
            setOrder("ASC")
        }
    }

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:5000/record/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setRecords(records);
        }

        getRecords();

        return;
    }, [records.length]);

    // This method will delete a record
    async function deleteRecord(id) {
        await fetch(`http://localhost:5000/${id}`, {
            method: "DELETE"
        });

        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);
    }

    // This method will map out the records on the table
    function recordList() {
        return records.map((record) => {
            return (
                <Record
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    // This following section will display the table with the records of individuals.
    return (
        <div>
            <h3 className="text-center">Employee List</h3>
            <table className="table table-striped rounded" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th className="pointer" onClick={() => sort("name")}>Name</th>
                        <th className="pointer" onClick={() => sort("position")} > Position</th>
                        <th className="pointer" onClick={() => sort("level")}>Level</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{recordList()}</tbody>
            </table>
        </div >
    );
}
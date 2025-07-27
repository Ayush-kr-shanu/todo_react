import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import AddTask from "./AddTask";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = () => {
    const task = localStorage.getItem("todo");
    try {
      const taskObj = JSON.parse(task);
      if (Array.isArray(taskObj)) {
        setData(taskObj);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("Invalid JSON in localStorage:", err);
      setData([]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleStatusChange = (index, newStatus) => {
    const updateData = [...data];
    updateData[index].status = newStatus;
    setData(updateData);
    localStorage.setItem("todo", JSON.stringify(updateData));
    toast.success(`Status updated to "${newStatus}"`, { autoClose: 2000 });
  };

  const handleDelete = (index) => {
    const updateData = [...data];
    updateData.splice(index, 1);
    setData(updateData);
    localStorage.setItem("todo", JSON.stringify(updateData));
    toast.info("Task deleted successfully", { autoClose: 2000 });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditTask(data[index]);
    setShowModal(true);
  };

  const handleTaskAdded = (taskData) => {
    const existingTasks = JSON.parse(localStorage.getItem("todo")) || [];

    if (editIndex !== null) {
      existingTasks[editIndex] = taskData;
    } else {
      existingTasks.push(taskData);
    }

    localStorage.setItem("todo", JSON.stringify(existingTasks));
    setData(existingTasks);
    setEditIndex(null);
    setEditTask(null);
    setShowModal(false);

    toast.success(
      editIndex !== null
        ? "Task updated successfully"
        : "Task added successfully",
      {
        autoClose: 2000,
      }
    );
  };

  return (
    <div className="home">
      <ToastContainer />
      <button
        className="add-task-btn"
        onClick={() => {
          setShowModal(true);
          setEditTask(null);
          setEditIndex(null);
        }}
      >
        + Add Task
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button
              className="close-btn"
              onClick={() => {
                setShowModal(false);
                setEditIndex(null);
                setEditTask(null);
              }}
            >
              &times;
            </button>
            <AddTask
              show={showModal}
              onTaskAdded={handleTaskAdded}
              onClose={() => {
                setShowModal(false);
                setEditIndex(null);
                setEditTask(null);
              }}
              editData={editTask}
            />
          </div>
        </div>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>Sn</th>
            <th>Task Name</th>
            <th>Task detail</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No tasks found
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.task}</td>
                <td>{item.taskDetail}</td>
                <td>{item.priority}</td>
                <td>{item.dueDate}</td>
                <td>
                  <select
                    value={item.status || "Pending"}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td>
                  <button
                    style={{ marginRight: "10px", backgroundColor: "#007bff" }}
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

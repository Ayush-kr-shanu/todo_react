import React, { useState, useEffect } from "react";

const AddTask = ({ show, onClose, onTaskAdded, editData }) => {
  const [task, setTask] = useState("");
  const [taskDetail, setTaskDetail] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editData) {
      setTask(editData.task);
      setTaskDetail(editData.taskDetail);
      setPriority(editData.priority);
      setDueDate(editData.dueDate);
    } else {
      setTask("");
      setTaskDetail("");
      setPriority("Low");
      setDueDate("");
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      task,
      taskDetail,
      priority,
      dueDate,
      status: editData?.status || "Pending",
    };

    onTaskAdded(newTask);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="form-container">
        <h3>{editData ? "Edit Task" : "Add Your Task"}</h3>
        <form onSubmit={handleSubmit}>
          <p>Task:</p>
          <input
            type="text"
            placeholder="Name of task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          />

          <p>Task Detail:</p>
          <input
            type="text"
            placeholder="Description"
            value={taskDetail}
            onChange={(e) => setTaskDetail(e.target.value)}
          />

          <p>Priority:</p>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <p>Due Date:</p>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <div style={{ textAlign: "right", marginTop: "15px" }}>
            <button type="submit">{editData ? "Update" : "Add"}</button>
            <button
              type="button"
              style={{ marginLeft: "10px", backgroundColor: "#6c757d" }}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;

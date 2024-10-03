import { React, useRef, useState } from "react";
import "./Master.css";

const Master = () => {
  const nameRef = useRef(null);
  const descRef = useRef(null);
  const addTaskContainerRef = useRef(null);
  const submitButtonRef = useRef(null);
  const updateButtonRef = useRef(null);
  const editButtonRef = useRef(null);
  const [taskList, setTaskList] = useState([]);
  const [taskId, setTaskId] = useState(null);

  //   NEW Task Created Here
  const handleAddTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),   // Unique Id For Each Element
      name: nameRef.current.value,
      description: descRef.current.value,
    };
    setTaskList([newTask, ...taskList]);
    nameRef.current.value = null;
    descRef.current.value = null;
    addTaskContainerRef.current.style.display = "none";
  };

// Delete Function
  const handleDelete = (element) => {
    const updatedList = taskList.filter((ele) => ele !== element);
    setTaskList(updatedList);
  };
// Edit Function
  const handleEdit = (task) => {
    if (
      addTaskContainerRef.current.style.display === "none" ||
      addTaskContainerRef.current.style.display === ""
    ) {
      addTaskContainerRef.current.style.display = "block";
    } else {
      addTaskContainerRef.current.style.display = "none";
    }

    submitButtonRef.current.style.display = "none";
    updateButtonRef.current.style.display = "inline-block";
    nameRef.current.value = task.name;
    descRef.current.value = task.description;
    setTaskId(task.id);
  };
// Update The New Info
  const handleUpdate = (e) => {
    e.preventDefault();
    const update = taskList.map((ele, ind) => {
      if (ele.id === taskId) {
        return {
          ...ele,
          name: nameRef.current.value,
          description: descRef.current.value,
        };
      } else {
        return ele;
      }
    });
    setTaskList(update);
    nameRef.current.value = null;
    descRef.current.value = null;
    setTaskId(null);
    addTaskContainerRef.current.style.display = "none";
  };

  //   AddTaskCOntainer

  const handleAddTaskContainer = (e) => {
    e.preventDefault();
    updateButtonRef.current.style.display = "none";
    submitButtonRef.current.style.display = "inline-block";
    if (
      addTaskContainerRef.current.style.display === "none" ||
      addTaskContainerRef.current.style.display === ""
    ) {
      addTaskContainerRef.current.style.display = "block";
    } else {
      addTaskContainerRef.current.style.display = "none";
    }
  };
  return (
    <>
      <div className="mainContainer">
        <h1 className="title">TODO - LIST</h1>
        <div className="buttonContainer">
          <button onClick={handleAddTaskContainer}>Add Task</button>
        </div>
        <div className="addTaskContainer" ref={addTaskContainerRef}>
          <form>
            <label htmlFor="name">Task Name</label>
            <input type="text" name="name" id="name" ref={nameRef} />
            <label htmlFor="desc">Description</label>
            <input type="text" name="desc" id="desc" ref={descRef} />
            <div className="addTaskContainerButtons">
              <button
                className="submit"
                onClick={handleAddTask}
                ref={submitButtonRef}
              >
                Submit
              </button>
              <button
                className="update"
                ref={updateButtonRef}
                onClick={handleUpdate}
              >
                Update
              </button>
              <button className="closeAddTask" onClick={handleAddTaskContainer}>
                Close
              </button>
            </div>
          </form>
        </div>
        <div className="taskContainer">
          <h2 className="subTitle">Tasks</h2>
          <div className="tasks">
            {taskList.map((task, index) => {
              return (
                <div className="singleTask" key={index} id={task.id}>
                  <div className="part1">
                    <h3 className="name">{task.name}</h3>
                    <p className="description">{task.description}</p>
                  </div>
                  <div className="part2">
                    <button
                      className="edit"
                      ref={editButtonRef}
                      onClick={() => handleEdit(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(task)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Master;

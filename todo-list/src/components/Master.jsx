import { React, useRef, useState } from "react";
import "./Master.css";

const Master = () => {
  const nameRef = useRef(null);
  const descRef = useRef(null);
  const addTaskContainerRef = useRef(null);
  const submitButtonRef = useRef(null);
  const updateButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const completeButtonRef = useRef(null);
  const editButtonRef = useRef(null);
  const [taskList, setTaskList] = useState([]);
  const [showCompletedTask, setShowCompletedTask] = useState([]);
  const [showNotCompletedTask, setShowNotCompletedTask] = useState([]);
  const [taskId, setTaskId] = useState(null);

  //   NEW Task Created Here
  const handleAddTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      name: nameRef.current.value,
      description: descRef.current.value,
    };
    setTaskList([newTask, ...taskList]);
    nameRef.current.value = null;
    descRef.current.value = null;
  };

  const handleDelete = (element) => {
    const updatedList = taskList.filter((ele) => ele !== element);
    setTaskList(updatedList);
  };

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

  //   -------------------------------------------------------------
  // Completed Task List
  const showCmplete = () => {
    setTaskList(showCompletedTask);
  };
  const completing = (id) => {
    const completedList = taskList.find((task) => task.id === id);
    setShowCompletedTask([...showCompletedTask, completedList]);
    const removeComplete = taskList.filter((task) => task.id !== id);
    setTaskList(removeComplete);
  };

  //   Not Completed Task

  const showNotComplete = () => {
    setTaskList(showNotCompletedTask);
  };

  const notCompleting = () => {
    
  };

  return (
    <>
      <div className="mainContainer">
        <h1 className="title">TODO - LIST</h1>
        <div className="buttonContainer">
          <button onClick={handleAddTaskContainer}>Add Task</button>
          <button onClick={showCmplete}>Completed</button>
          <button onClick={showNotComplete}>Not Completed</button>
          <button>All Tasks</button>
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
                      className="complete"
                      ref={completeButtonRef}
                      onClick={() => completing(task.id)}
                    >
                      Complete
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

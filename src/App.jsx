import "./App.css";
import Header from "./Header";
import { useState, useEffect } from "react";
import { ImBin } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import Modal from "./Modal";

//get items stored in the localstorage when page loads
const getLocalItems = () => {
  let list = localStorage.getItem("lists");

  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

//beginning of app component
function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [taskList, setTaskList] = useState(getLocalItems());
  const [editTask, setEditTask] = useState(null);

  //set items inside the localstorage when there's a change in taskList
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(taskList));
  }, [taskList]);

  //function responsible for the editing of task
  function handleEditTask(id) {
    const task = taskList.find((t) => t.id === id);
    setEditTask(task);
    setInputValue(task.text);
    setOpenModal(true);
  }

  //function for theme changer
  function HandleClick() {
    setDarkTheme(!darkTheme);
  }

  //function for bringing out the modal overlay
  function HandleOverlay() {
    setOpenModal(!openModal);
  }

  //onchange function for handling the changes in input field
  function HandleChange(e) {
    setInputValue(e.target.value);
  }

  //function responsible for adding task to the items list
  function HandleTaskList() {
    if (inputValue) {
      //enables that there's no submission of empty input
      if (editTask) {
        const upDatedTaskList = taskList.map((task) => {
          if (task.id === editTask.id) {
            return {
              ...task,
              text: inputValue,
            };
          }
          return task;
        });
        setTaskList(upDatedTaskList);
        setEditTask(null);
      } else {
        setTaskList([...taskList, { id: Date.now(), text: inputValue }]);
      }

      setInputValue("");
      setOpenModal(!openModal);
    } else {
      setOpenModal(true);
    }
  }

  //function responsible for deletion of task
  function OnRemovetask(id) {
    const upDatedTodos = taskList.filter((todo) => todo.id !== id);
    setTaskList(upDatedTodos);
  }

  //rendering!!!!!
  return (
    <div className={darkTheme ? "main-container dark" : "main-container light"}>
      <Header
        HandleClick={HandleClick}
        HandleOverlay={HandleOverlay}
        darkTheme={darkTheme}
      />
      {taskList.length > 0 ? (
        <div className="body-container">
          {taskList.map((item) => {
            return (
              <div
                className={
                  darkTheme
                    ? "item-container dark-item"
                    : "item-container light-item"
                }
                key={item.id}
              >
                <ul>
                  <li id={item.id}>{item.text}</li>
                </ul>
                <div className="task-btn">
                  <FaEdit
                    className="edit-btn"
                    onClick={() => handleEditTask(item.id)}
                  />
                  <ImBin
                    className="delete-btn"
                    onClick={() => OnRemovetask(item.id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="nothing">Nothing to show here</p>
      )}
      {openModal ? (
        <Modal>
          <div>
            <input
              className="text-input"
              type="text"
              placeholder="Input task"
              value={inputValue}
              onChange={HandleChange}
            />
          </div>
          <div className="btn-container">
            <button className="addTask-btn" onClick={HandleTaskList}>
              Add Task
            </button>
            <button className="closeModal-btn" onClick={HandleOverlay}>
              Close Modal
            </button>
          </div>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;

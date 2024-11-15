import React, { useEffect, useState } from "react";
import SubTask from "./SubTask";
import TaskCard from "./TaskCard";
import Toolbar from "./Toolbar";

function Tasks() {
  const [showSubTask, setShowSubTask] = useState(false);
  // const [showCard, setCard] = useState(true);

  useEffect(() => {
    const addBtn = document.getElementsByClassName("addBtn")[0];

    const handleMouseEnter = () => {
      addBtn.style.border = "solid 1px aliceblue";
      addBtn.style.boxShadow = "0px 0px 100px white";
    };

    const handleMouseLeave = () => {
      addBtn.style.border = "";
      addBtn.style.boxShadow = "";
    };

    const handleClick = () => {
      setShowSubTask((prev) => !prev);
    };

    addBtn.addEventListener("mouseenter", handleMouseEnter);
    addBtn.addEventListener("mouseleave", handleMouseLeave);
    addBtn.addEventListener("click", handleClick);

    return () => {
      addBtn.removeEventListener("mouseenter", handleMouseEnter);
      addBtn.removeEventListener("mouseleave", handleMouseLeave);
      addBtn.removeEventListener("click", handleClick);
    };
  }, []);

  const taskStyle = {
    backgroundColor: "",
    height: "auto",
    width: "60%",
    margin: "20px auto",
    borderRadius: "50px",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 0",
    display: "flex",
    flexDirection: "column",
  };

  const btnStyle = {
    color: "aliceblue",
    transition: "all 0.38s ease",
    height: "60px",
    width: "60px",
    backgroundColor: "",
    fontSize: "40px",
    padding: "0",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  };

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadedTasks = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let myvalue = JSON.parse(localStorage.getItem(key));
      if (myvalue !== null) {
        loadedTasks.push(myvalue);
        console.log(loadedTasks);
      }
    }
    setTasks(loadedTasks);
  }, []);

  const searchBar = {
    height: "20px",
    width: "160px",
    borderRadius: "30px",
    position: "absolute",
    right: "180px",
    top: "170px",
    padding: "5px",
    paddingLeft: "10px",
    fontStyle: "italic",
  };

  const [searchInput, setSearchInput] = useState("");
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="container" style={taskStyle}>
      <div className="centered addBtn" style={btnStyle}>
        +
      </div>
      <br />
      {showSubTask && (
        <SubTask
          setTasks={setTasks}
          setShowSubTask={setShowSubTask}
          showSubTask={showSubTask}
        />
      )}
      {tasks.map((task, index) => (
        <TaskCard
          keyItem={index}
          value={task.value}
          priority={task.priority}
          tag={task.tag}
          setTasks={setTasks}
        />
      ))}
      <div>
        <p
          onClick={() => {
            let searchIndex;
            for (let i = 0; i <= tasks.length; i++) {
              if (tasks[i] !== undefined) {
                console.log(tasks[i]["value"]);
                searchInput === tasks[i]["value"]
                  ? (searchIndex = i)
                  : console.log("not found");
              } else {
                console.log("undefined");
              }
            }
            setTasks((prevTasks) =>
              prevTasks.filter((_, index) => index === searchIndex)
            );
          }}
          style={{
            fontSize: "30px",
            position: "absolute",
            top: "135px",
            right: "150px",
            color: "white",
            cursor: "pointer",
          }}
        >
          ⌕
        </p>
        <input
          onChange={handleSearch}
          style={searchBar}
          type="text"
          placeholder="Search Tasks"
        ></input>
      </div>
      <Toolbar setTasks={setTasks} tasks={tasks} />
    </div>
  );
}

export default Tasks;

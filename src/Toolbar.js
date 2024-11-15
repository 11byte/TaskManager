import React, { useEffect } from "react";
function Toolbar({ setTasks, tasks }) {
  const toolStyle = {
    position: "absolute",
    top: "170px",
    left: "25px",
    height: "150px",
    width: "300px",
    border: "2px solid gold",
    borderRadius: "40px",
    color: "gold",
  };

  const prio = {
    padding: " 10px",
    paddingBottom: "20px",
    width: "100px",
    display: "inline-block",
    margin: "10px",
    height: "15px",
    backgroundColor: "rgba(0, 128, 128, 0.2)",
    borderRadius: "30px",
    cursor: "pointer",
    transiion: "all 2s ease",
  };
  useEffect(() => {
    const changeStyle = (e) => {
      document.querySelectorAll(".btn").forEach((ele) => {
        ele.style.backgroundColor = "rgba(0, 128, 128, 0.2)";
      });
      e.style.backgroundColor = "rgba(0, 250, 250, 0.2)";
    };

    document.querySelectorAll(".btn").forEach((element) => {
      element.style.transition = "all 0.3s ease";
      element.addEventListener("click", () => {
        changeStyle(element);
      });
    });
  }, []);

  const reorderTasksByPriorityh2l = () => {
    const priorityOrder = {
      High: 1,
      Default: 2,
      Low: 3,
    };

    const sortedTasks = [...tasks].sort((a, b) => {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    setTasks(sortedTasks);
  };

  const reorderTasksByPriorityl2h = () => {
    const priorityOrder = {
      High: 3,
      Default: 2,
      Low: 1,
    };

    const sortedTasks = [...tasks].sort((a, b) => {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    setTasks(sortedTasks);
  };

  return (
    <div style={toolStyle}>
      <p>Sort By:</p>
      <div
        onClick={() => {
          reorderTasksByPriorityl2h();
        }}
        className="btn"
        id="l2h"
        style={prio}
      >
        Low to High
      </div>
      <div
        onClick={() => {
          reorderTasksByPriorityh2l();
        }}
        className="btn"
        id="h2l"
        style={prio}
      >
        High to Low
      </div>
    </div>
  );
}
export default Toolbar;

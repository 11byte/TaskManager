import React, { useState, useEffect, useRef } from "react";
import "./taskCard.css";
function TaskCard({ keyItem, value, priority, tag, setTasks }) {
  var pcolor;
  if (priority === "Default") {
    pcolor = "silver";
  } else if (priority === "High") {
    pcolor = "#fc3f3f";
  } else {
    pcolor = "lime";
  }
  const cardStyle = {
    display: "inline-block",
    backgroundColor: "rgba(0, 128, 128, 0.2)",
    margin: "30px",
    width: "600px",
    height: "150px",
    borderRadius: "20px",
    color: "white",
    fontFamily: "Courier",
    padding: "15px",
    borderBottom: `groove 3px ${pcolor}`,
  };

  function deleteTask() {
    // setCard(false);
    setTasks((prevTasks) => prevTasks.filter((_, index) => index !== keyItem));
    var keyValue = localStorage.key(keyItem);
    console.log(keyValue);
    localStorage.removeItem(keyValue);
  }

  const [isChecked, setIsChecked] = useState(false);
  const cardRef = useRef(null);
  function handleCheckChange(event) {
    setIsChecked(event.target.checked);
  }

  useEffect(() => {
    console.log("ischeckedAfter", isChecked);

    if (isChecked) {
      cardRef.current.style.opacity = "0.6";

      cardRef.current.querySelector("h3").style.textDecoration = "line-through";
    } else {
      cardRef.current.style.opacity = "1";
      cardRef.current.querySelector("h3").style.textDecoration = "";
    }
  }, [isChecked]);
  return (
    <div ref={cardRef} className="card" style={cardStyle}>
      <div style={{ position: "relative" }}>
        <input
          checked={isChecked}
          onChange={handleCheckChange}
          className="custom-checkbox"
          id="chkbox"
          type="checkbox"
          style={{
            position: "absolute",
            left: "10px",
            top: "15px",
            height: "30px",
            width: "30px",
            borderRadius: "60px",
          }}
        ></input>
        <h3
          style={{
            display: "inline-block",
            margin: "0px",
            marginLeft: "30px",
            marginTop: "18px",
            fontSize: "30px",
          }}
        >
          {value}
        </h3>
        <div
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundImage =
              "linear-gradient(to bottom, #B22234, #DC143C)";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "cyan";
            e.currentTarget.style.backgroundImage =
              "linear-gradient(to bottom, rgba(0, 128, 128, 0.3), rgba(0, 255, 255, 0.3))";
          }}
          onClick={(keyItem) => {
            deleteTask();
          }}
          style={{
            position: "absolute",
            top: "45px",
            right: "-50px",
            transition: "all 0.5s ease",
            color: "cyan",
            fontSize: "40px",
            borderRadius: "80px",
            width: "55px",
            height: "55px",
            backdropFilter: "blur(30px)",
            cursor: "pointer",
            boxShadow: "-5px 0px 2px rgba(0, 20, 20)",
            backgroundImage:
              "linear-gradient(to bottom, rgba(0, 128, 128, 0.3), rgba(0, 255, 255, 0.3))",
          }}
        >
          🗑
        </div>
        <h6
          style={{
            position: "absolute",
            left: "10px",
            top: "80px",
            width: "auto",
            height: "auto",
            borderRadius: "50px",
            fontSize: "15px",
            padding: "10px",
            boxShadow: "10px 5px 12px rgba(0, 20, 20)",
            background:
              "linear-gradient(to bottom, rgba(0, 128, 128, 0.3), rgba(0, 255, 255, 0.3))",
          }}
        >
          #{tag}
        </h6>
      </div>

      <br />

      <h5
        style={{
          borderRadius: "100px",
          display: "inline-block",
          marginLeft: "10px",
          fontSize: "19px",
          width: "20%",
          padding: "10px",
          boxShadow: `0px 3px 30px ${pcolor}`,
          color: `${pcolor}`,
          borderBottom: `groove 2px ${pcolor}`,
        }}
      >
        {priority}
      </h5>
    </div>
  );
}
export default TaskCard;

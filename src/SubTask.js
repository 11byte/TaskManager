import React, { useState, useEffect } from "react";
import prdef from "./prdef.png";
import prhigh from "./prhigh.png";
import prlow from "./prlow.png";

function SubTask({ setShowSubTask, showSubTask, setTasks }) {
  const [currentImage, setCurrentImage] = useState(prdef);
  const [display, setDisplay] = useState("Default");
  const [fade, setFade] = useState(false);

  const images = [prdef, prlow, prhigh];

  const changeImage = () => {
    setFade(true);
    setTimeout(() => {
      const currentIndex = images.indexOf(currentImage);
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentImage(images[nextIndex]);

      switch (images[nextIndex]) {
        case prdef:
          setDisplay("Low");
          break;
        case prlow:
          setDisplay("High");
          break;
        case prhigh:
          setDisplay("Default");
          break;
        default:
          break;
      }
      console.log(display);

      setFade(false);
    }, 200);
  };

  useEffect(() => {
    function btnOvr(element) {
      element.style.boxShadow = "0px 0px 45px white";
    }

    function btnLeave(element) {
      element.style.boxShadow = "";
    }

    document.querySelectorAll(".btn").forEach((element) => {
      element.addEventListener("mouseover", () => {
        btnOvr(element);
      });
      element.addEventListener("mouseleave", () => {
        btnLeave(element);
      });
    });
    return () => {
      document.querySelectorAll(".btn").forEach((element) => {
        element.removeEventListener("mouseover", btnOvr);
        element.removeEventListener("mouseleave", btnLeave);
      });
    };
  }, [setShowSubTask]);

  const cardStyle = {
    width: "400px",
    height: "20px",
    borderRadius: "20px",
    padding: "10px",
    fontSize: "20px",
  };

  const btn = {
    cursor: "pointer",
    fontSize: "28px",
    height: "40px",
    width: "40px",
    borderRadius: "80px",
    backgroundColor: "transparent",
    display: "inline-block",
    margin: "20px",
    color: " aliceblue",
  };

  const priority = {
    position: "absolute",
    width: "250px",
    top: "2px",
    right: "-250px",
    cursor: "pointer",
    opacity: fade ? 0 : 1,
    transition: "opacity 0.2s ease",
  };
  const tag = {
    height: "40px",
    width: "75px",
    fontSize: "20px",
    marginLeft: "40px",
    borderRadius: "10px",
    backgroundColor: "transparent",
    color: "silver",
    padding: "5px",
    borderStyle: "groove",
    borderColor: "white",
  };
  const [inputValue, setInputValue] = useState("");
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const [tagValue, setTagValue] = useState("");
  const handleTagChange = (e) => {
    setTagValue(e.target.value);
  };
  var currentDisplay;
  function handleConfirm() {
    switch (currentImage) {
      case prdef:
        currentDisplay = "Default";
        break;
      case prlow:
        currentDisplay = "Low";
        break;
      case prhigh:
        currentDisplay = "High";
        break;
      default:
        break;
    }
    console.log(currentDisplay);
    setShowSubTask(false);
    var myObj = {
      value: inputValue,
      priority: currentDisplay,
      tag: tagValue,
    };
    setTasks((prevTasks) => [...prevTasks, myObj]);
    localStorage.setItem(`task_${Date.now()}`, JSON.stringify(myObj));
  }

  return (
    <div style={{ position: "absolute", top: "220px", zIndex: "10" }}>
      <div
        style={{
          position: "relative",
          backdropFilter: "blur(20px)",
          borderRadius: "30px",
          boxShadow: "5px 5px 1000px silver",
          padding: "20px",
        }}
      >
        <input
          style={cardStyle}
          type="text"
          onChange={handleChange}
          placeholder="Enter Task"
        />
        <div>
          <div
            id="confirm"
            className="btn"
            style={btn}
            onClick={() => {
              handleConfirm(display);
            }}
          >
            ✔
          </div>
          <div
            className="btn"
            style={btn}
            onClick={() => {
              console.log(showSubTask);
              for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                console.log(value);
              }
            }}
          >
            ✘
          </div>
          <input
            onChange={handleTagChange}
            id="tagInput"
            type="text"
            placeholder=" #Tags"
            style={tag}
          ></input>
        </div>
        <img
          id="priority"
          style={priority}
          src={currentImage}
          alt="Priority"
          onClick={changeImage}
        />
      </div>
    </div>
  );
}

export default SubTask;

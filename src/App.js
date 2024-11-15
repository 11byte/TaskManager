import "./App.css";
import { useEffect } from "react";
import Tasks from "./Tasks";

function App() {
  useEffect(() => {
    const appElement = document.querySelector("header");

    const handleMouseOver = () => {
      appElement.style.color = "silver";
      appElement.style.boxShadow = "40px 20px 1500px white";
    };

    appElement.addEventListener("mouseover", handleMouseOver);
    appElement.addEventListener("mouseleave", () => {
      appElement.style.color = "aliceblue";
      appElement.style.boxShadow = "0px 0px 0px white";
    });

    // Cleanup function to remove the event listener
    return () => {
      appElement.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const Title = {
    fontSize: "60px",
    marginTop: "15px",
    fontFamily: "Lobster,cursive",
    fontStyle: "italic",
    color: "aliceblue",
    transition: "all 0.4s ease",
    borderBottom: "solid 2px",
    paddingBottom: "10px",
  };
  return (
    <div className="App">
      <header style={Title}>Task Manager</header>
      <Tasks />
    </div>
  );
}

export default App;

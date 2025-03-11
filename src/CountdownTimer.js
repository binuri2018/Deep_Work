import React, { useState, useEffect } from "react";
import { FaCog, FaRedo } from "react-icons/fa"; // Import icons from react-icons

// Image options stored in "public/assets/"
const backgroundImages = [
  { name: "City Lights", path: "/assets/citylights.jpeg" },
  { name: "Marble Beach", path: "/assets/beach.jpeg" },
  { name: "Calm Forest", path: "/assets/forest.jpeg" },
  { name: "Sunny Beach", path: "/assets/sunny.jpeg" },
  { name: "Dreamy Flowers", path: "/assets/flowers.jpeg" }
];

const CountdownTimer = () => {
  const [inputMinutes, setInputMinutes] = useState(25);
  const [time, setTime] = useState(inputMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [bgImage, setBgImage] = useState(localStorage.getItem("bgImage") || backgroundImages[0].path);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      playSound();
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  const playSound = () => {
    const audio = new Audio("https://www.soundjay.com/button/beep-07.wav");
    audio.play();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSetTime = () => {
    if (!isRunning) {
      setTime(inputMinutes * 60);
    }
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.value;
    setBgImage(selectedImage);
    localStorage.setItem("bgImage", selectedImage);
  };

  return (
    <div style={{ 
      ...styles.container, 
      background: `url(${bgImage}) no-repeat center/cover` 
    }}>
      <h1 style={styles.timer}>{formatTime(time)}</h1>

      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button style={styles.iconButton} onClick={() => setTime(inputMinutes * 60)}>
          <FaRedo size={20} />
        </button>
        <button style={styles.iconButton} onClick={() => setIsSettingsOpen(true)}>
          <FaCog size={20} />
        </button>
      </div>

      {/* Settings Panel */}
      {isSettingsOpen && (
        <div style={styles.settingsPanel}>
          <h2 style={{ color: "white", textAlign: "center" }}>Settings</h2>
          
          {/* Set Time */}
          <div>
            <label style={styles.label}>Set Timer (Minutes): </label>
            <input
              type="number"
              value={inputMinutes}
              onChange={(e) => setInputMinutes(e.target.value)}
              style={styles.input}
              min="1"
            />
            <button style={styles.button} onClick={handleSetTime}>Set Time</button>
          </div>

          {/* Change Background */}
          <div>
            <label style={styles.label}>Choose Background Image: </label>
            <select onChange={handleImageChange} value={bgImage} style={styles.select}>
              {backgroundImages.map((img, index) => (
                <option key={index} value={img.path}>{img.name}</option>
              ))}
            </select>
          </div>

          {/* Close Settings Button */}
          <button style={styles.closeButton} onClick={() => setIsSettingsOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    height: "100vh", fontFamily: "Arial, sans-serif", transition: "background 0.3s ease-in-out"
  },
  timer: { fontSize: "50px", marginBottom: "20px", color: "white" },
  buttonContainer: {
    display: "flex", gap: "10px", marginTop: "10px"
  },
  button: {
    fontSize: "18px", padding: "10px 20px", cursor: "pointer",
    border: "none", borderRadius: "5px", backgroundColor: "#007bff", color: "white"
  },
  iconButton: {
    fontSize: "18px", padding: "10px", cursor: "pointer",
    border: "none", borderRadius: "5px", backgroundColor: "#007bff", color: "white",
    display: "flex", alignItems: "center", justifyContent: "center"
  },
  settingsPanel: {
    position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(0, 0, 0, 0.85)", padding: "20px", borderRadius: "10px",
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)", width: "300px", textAlign: "center"
  },
  closeButton: {
    backgroundColor: "#ff4444", color: "white", border: "none", padding: "10px",
    cursor: "pointer", fontSize: "16px", borderRadius: "5px", marginTop: "10px"
  },
  input: {
    fontSize: "18px", padding: "5px", margin: "5px", width: "100%", textAlign: "center"
  },
  select: {
    fontSize: "18px", padding: "5px", marginTop: "10px", width: "100%"
  },
  label: {
    color: "white", fontSize: "18px", marginTop: "10px", display: "block"
  }
};

export default CountdownTimer;

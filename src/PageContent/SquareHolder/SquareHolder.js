import React, { useEffect, useState } from "react";
import { Canvas } from "react-three-fiber";
import FlatSquare from "./Dependencies/FlatSquare";
import BoxCreator from "../BoxCreator/BoxCreator";
import { Vector3 } from "three";
import { useMyContext } from "../../MyContextProvider";
// CUNT CUNT CUNT CUNT 
function handlePointerClick(index) {
  console.log(`Clicked square at index ${index}`);
}

const SquareHolder = () => {
  const [squares, setSquares] = useState([]);
  const [selectedSave, ] = useMyContext();
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleMove = ({ index, oldPosition, newPosition }) => {
    if (!newPosition) {
      console.error("Invalid newPosition:", newPosition);
      return;
    }

    // Use a larger threshold for collision detection
    const threshold = 2.4;
    const canvasSize = 20;
    const canvasHeight = 10;

    // Check for collisions with other squares (excluding the square being moved)
    const collided = squares
      .filter((square, i) => i !== index)
      .some(
        (square) =>
          Math.abs(newPosition.x - square.position[0]) < threshold &&
          Math.abs(newPosition.y - square.position[1]) < threshold
      );

    // Check if the new position is within the canvas boundaries
    const withinCanvas =
      newPosition.x - 2 / 2 >= -canvasSize / 2 &&
      newPosition.x + 2 / 2 <= canvasSize / 2 &&
      newPosition.y - 2 / 2 >= -canvasHeight / 2 &&
      newPosition.y + 2 / 2 <= canvasHeight / 2;

    // If no collision and within canvas boundaries, update the position
    if (!collided && withinCanvas) {
      setSquares((prevSquares) =>
        prevSquares.map((square, i) =>
          i === index ? { ...square, position: newPosition.toArray() } : square
        )
      );
      saveData();
    } else {
      console.log("Collided or outside canvas boundaries");
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleDelete = (index) => {
    if (squares.length === 1) {
      setSquares([
        {
          sizeX: 4,
          sizeY: 4,
          color: "yellow",
          position: [1, 1, 1],
          title: "No data",
          description: "Please insert disc",
        },
      ]);
      saveData();
      return;
    }
    setSquares((prevSquares) => {
      const newSquares = [...prevSquares];

      newSquares.splice(index, 1);
      saveData(newSquares);
      return newSquares;
    });
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const createSquare = (title, description, color, sizeX, sizeY, e) => {
    if (title === "" || description === "" || color === "") {
      console.log("Please finish creating cube");
      return;
    }
    const newPosition = findAvailablePosition(sizeX, sizeY);

    if (newPosition) {
      const newSquare = {
        sizeX,
        sizeY,
        color,
        position: newPosition.toArray(),
        title,
        description,
      };

      setSquares((prevSquares) => {
        const newSquares = [...prevSquares, newSquare];
        saveData(newSquares);
        return newSquares;
      });
    } else {
      console.log("No available space for the new square.");
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const findAvailablePosition = (sizeX, sizeY) => {
    const threshold = 1;
    let canvasWidth = 20;
    let canvasHeight = 10;
    for (
      let x = -canvasWidth / 2 + 3;
      x < canvasWidth / 2 - 2;
      x += threshold
    ) {
      for (
        let y = -canvasHeight / 2 + 3;
        y < canvasHeight / 2 - 2;
        y += threshold
      ) {
        const available = !squares.some(
          (square) =>
            x < square.position[0] + square.sizeX / 2 + threshold &&
            x + sizeX / 2 + threshold > square.position[0] &&
            y < square.position[1] + square.sizeY / 2 + threshold &&
            y + sizeY / 2 + threshold > square.position[1]
        );

        if (available) {
          return new Vector3(x, y, 1); // Assuming the Z position is 1
        }
      }
    }

    return null; // No available space found
  };
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function saveData() {
    if (squares.length > 0) {
      const pre = JSON.parse(localStorage.getItem('Squares')) || {}
      pre[selectedSave] = squares

      localStorage.setItem(
        `Squares`,
        JSON.stringify(pre)
      );
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function loadDataFromStorage() {
    const allSavedSquares = JSON.parse(localStorage.getItem('Squares')) || {};
    const savedSquares = allSavedSquares[selectedSave] || [];
  
    if (Array.isArray(savedSquares) && savedSquares.length > 0) {
      setSquares(savedSquares);
      console.log("Collected Data from storage");
    } else {
      setSquares([
        {
          sizeX: 2,
          sizeY: 2,
          color: "purple",
          position: [2, 1, 1],
          title: "No data",
          description: "Please insert disc",
        },
      ]);
      console.log("No storage");
    }
  }
  const putDataInStorage = async () => {
    let placeholderServerLink = 'ip-to-link/api/saveUserData'
    let userName = 'test'
    try { 
      const data = localStorage.getItem('Squares')
      const response = await axios.post(`${placeholderServerLink}/api/saveUserData/${userName}`, data)

      if (response.status === 200){
        console.log('Data successfully saved to server')
      } else {
        console.log('Failed to save data to server, please try again in a few minutes or check our social media for any downtime')
      }
    } catch (error) {
      console.log(error)
    }
  }
  ///////////////////
  const getDataFromStorage = async () =>{
    let placeholderServerLink = 'ip-to-link/api/getUserData'
    let userName = 'test'
    try {
      const response = await axios.post(`${placeholderServerLink}/api/getUserData/${userName}`)

      if (response.status === 200){
        setSquares(response.data.squares)
      } else if (response.status === 404) {
        setSquares([
          {
            sizeX: 2,
            sizeY: 2,
            color: "purple",
            position: [2, 1, 1],
            title: "No data",
            description: "Please insert disc",
          },
        ]);
      }
    } catch(error){
      console.log(error)
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    loadDataFromStorage();
  }, [selectedSave]);

  useEffect(() => {
    saveData();
  }, [handleDelete]);

  useEffect(() => {
    loadDataFromStorage()
  }, []);
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div style={{ height: "100" }}>
      <Canvas
        style={{
          height: "50vh",
          width: "80%",
          margin: "auto",
          border: "1px solid black",
        }}
      >
        <ambientLight intensity={2} />
        <pointLight position={[10, 10, 10]} />
        {squares.map((square, index) => (
          <FlatSquare
            key={index}
            index={index}
            position={square.position}
            {...square}
            onClick={() => handlePointerClick(index)}
            onMove={({ index, position, newPosition }) =>
              handleMove({ index, oldPosition: position, newPosition })
            }
            onDelete={() => handleDelete(index)}
          />
        ))}
      </Canvas>
      <BoxCreator onCreateSquare={createSquare} />
    </div>
  );
};

export default SquareHolder;

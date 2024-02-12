import { Box, Button, Tab, Tabs } from "@mui/material";
import { useMyContext } from "../../MyContextProvider";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
function DashBar() {
  const [selectedSave, setSelectedSave] = useMyContext();
  const [saves, setSaves] = useState([1, 2, 3]);
  const uniqueSaves = [...new Set(saves)];
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function changeSave(selectedFile) {
    setSelectedSave(selectedFile);
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function deleteSave(selectedSaveToDelete) {
  if (saves.length === 1) {
    getLength();
    return;
  }

  let pre = JSON.parse(localStorage.getItem('Squares')) || {};

  // Create a shallow copy of the object and delete the specified property
  const newSquares = { ...pre };
  delete newSquares[selectedSaveToDelete];

  localStorage.setItem('Squares', JSON.stringify(newSquares));

  getLength();
  setSelectedSave(1);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addSave() {
  const prevData = JSON.parse(localStorage.getItem('Squares')) || {};

  const newSaveData = {
    [saves.length + 1]: {  // Assuming saves are identified by numeric keys
      sizeX: 2,
      sizeY: 2,
      color: "purple",
      position: [2, 1, 1],
      title: "No data",
      description: "Please insert disc",
    },
  };

  const updatedData = { ...prevData, ...newSaveData };
  localStorage.setItem('Squares', JSON.stringify(updatedData));

  getLength();
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getLength(){
    const allSavedSquares = JSON.parse(
      localStorage.getItem(`Squares`) 
    ) || {};
    const savedSquares = allSavedSquares[selectedSave] || {}
      let result = []
      for (const [index, value] of Object.entries(allSavedSquares)){
        result.push(index)
      }
      setSaves(result)  
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (saves.length === 0){
      addSave()
    }
  },[saves])

  useEffect(() => {
    getLength()
  },[])
  

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }} className="bg-blue-600 flex">
      <Tabs
        className="bg-blue-600 text-white"
        value={selectedSave}
        style={{ width: "50%"}}
      >
        {uniqueSaves.map((key) => (
          <Tab
            key={key}
            style={{ color: "white" }}
            className="border-black border-2 text-white h-[100%]"
            label={`Save ${key}`}
            onClick={() => changeSave(key)}
          />
        ))}
      </Tabs>  
        <div style={{ width: "50%", display: 'flex', margin: 'auto', justifyContent: 'center'}} >
          <h1
            style={{
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            Current save : {selectedSave}
          </h1>
          <Button
            style={{ color: "white" }}
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={() => deleteSave(selectedSave)}
          >
            Delete
          </Button>
          <Button style={{ color: 'white'}} variant="outlined" onClick={addSave}>
            Add Save
          </Button>
        </div>
      
    </Box>
  );
}

export default DashBar;

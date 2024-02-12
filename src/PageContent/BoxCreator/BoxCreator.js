import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';

function BoxCreator({ onCreateSquare }) {
  const [boxTitle, setBoxTitle] = useState('');
  const [boxDesc, setBoxDesc] = useState('');
  const [boxColor, setBoxColor] = useState(''); 

  const handleCreateSquare = (e) => {
    e.preventDefault()
    let sizeX = 2, sizeY = 2
    onCreateSquare(boxTitle, boxDesc, boxColor, sizeX, sizeY);
  };

  return (
    <div className="w-[20%]">
        <h1 className='bg-blue-500'>Box Generator</h1>
        <form onSubmit={handleCreateSquare} className='m-[5%]'>
          <Button type="submit" variant="contained" color="primary">
            Create Box
          </Button>
          <div className='m-[10px]'>
            <TextField style={{marginBottom: '10px'}} label="Title" onChange={(e) => setBoxTitle(e.target.value)} />
            <TextField label="Description" onChange={(e) => setBoxDesc(e.target.value)} />          
          </div>
          <FormLabel id="demo-radio-buttons-group-label">Color</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue=""
            name="radio-buttons-group"
            onChange={(e) => setBoxColor(e.target.value)}
          >
            <FormControlLabel value="red" control={<Radio />} label="Red" />
            <FormControlLabel value="blue" control={<Radio />} label="Blue" />
            <FormControlLabel value="green" control={<Radio />} label="Green" />
          </RadioGroup>
        </form>
    </div>
  );
}

export default BoxCreator;

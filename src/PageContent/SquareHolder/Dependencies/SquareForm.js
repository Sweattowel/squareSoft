import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

function SquareForm() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    const lines = event.target.value.split('\n');
    if (lines.length <= 2) {
      setInputValue(event.target.value);
    } else {
      // If more than 2 lines, only keep the first two lines
      setInputValue(lines.slice(0, 2).join('\n'));
    }
  };

  return (
    <form className='mt-2 border-red'>
      <TextField
        id="outlined-multiline"
        label="Enter Text"
        multiline
        rows={2}
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
      />
    </form>
  );
}
export default SquareForm
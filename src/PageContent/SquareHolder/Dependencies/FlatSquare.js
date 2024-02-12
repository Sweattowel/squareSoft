import React, { useRef, useState, useEffect } from 'react';
import { useDrag } from 'react-use-gesture';
import { Vector3 } from 'three';
import SquareForm from './SquareForm';
import { Html } from '@react-three/drei';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const FlatSquare = ({ sizeX, sizeY, color, position, onClick, onMove, onDelete, index, title, description, material }) => {
  const groupRef = useRef();
  const squareMeshRef = useRef();
  

  const bind = useDrag(({ offset: [x, y], movement: [mx, my], memo = position }) => {
    const newPosition = new Vector3(memo[0] + mx * 0.01, memo[1] - my * 0.01, 1);
    onMove({ index, position, newPosition });
    return memo;
  });
  
  return (
    <group ref={groupRef}>
      <mesh style={{height: '200px',}} position={position} onClick={onClick} {...bind()} ref={squareMeshRef}>
        <planeGeometry args={[sizeX + 0.5, sizeY + 0.5]} />
        <meshStandardMaterial color={color} {...material} />
      </mesh>

      <Html position={position} className='h-[160px] w-[175px] left-[-87.5px] top-[-80px] flex justify-center items-center' >
        <div className="absolute border-1 border-black h-[100%] bg-blue-500">
          <div className='flex items-center justify-center'>
            <h3 className='mr-5 border-b border-black'>{title}</h3>
            <DeleteForeverIcon onClick={() => onDelete(index)} />
          </div>
          <p className='flex items-center justify-center w-full border border-black mt-1 mb-1'>{description}</p>
          <SquareForm />
        </div>
      </Html>
    </group>
  );
};

export default FlatSquare;

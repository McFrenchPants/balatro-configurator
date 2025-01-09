import { Container, Typography } from '@mui/material';
import React, { useState, useRef } from 'react';

const DraggableImage = ({ src, alt, width, height }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [discard, setDiscard] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if(position.x > 800 && position.y < -180){
      console.log("ENTERED DROP ZONE");
      setDiscard(true);
    }
  };

  return (
    <>
      <div 
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          cursor: isDragging ? 'grabbing' : 'grab',
          animation: isDragging ? 'none' : 'float 6s ease-in-out infinite'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img 
          src={src} 
          alt={alt}
          width={width}
          height={height}
          style={{ userSelect: 'none', transform: discard ? 'scale(0,0)' : 'none', animation: discard ? 'discard 1s' : 'none' }}
          draggable={false}
        />
      </div>
      {isDragging && (
      <Container sx={{ position: 'fixed', right: '20px', top: '20px', height: '120px', width: '250px', p: '20px', backgroundColor: 'rgba(248,73,66,0.8)', display: 'block', border: 'solid 2px white', borderRadius: '6px'}}>
        <Typography sx={{fontSize: 48, textShadow: '-1px 1px 3px rgba(0, 0, 0, 0.75)'}}>Discard</Typography>
      </Container>
      )}
    </>
  );
};

export default DraggableImage;
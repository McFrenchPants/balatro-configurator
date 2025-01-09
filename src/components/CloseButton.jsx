import React from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function CloseButton({ onClick }) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        width: 40,
        height: 40,
        borderRadius: '50%', // Make the button circular
        backgroundColor: '#f44336',
        color: 'white',
        '&:hover': {
          backgroundColor: '#d32f2f',
        }
      }}
    >
      <CloseIcon />
    </IconButton>
  );
}

export default CloseButton;

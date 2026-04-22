import React from "react";
import { CircularProgress, Box } from "@mui/material";

function LoadingSpinner() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
      <CircularProgress color="primary" />
    </Box>
  );
}

export default LoadingSpinner;

import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

function Results({ result }) {
  if (!result) return null;

  return (
    <Card sx={{ mt: 3, border: "1px solid red" }}>
      <CardContent>
        <Typography variant="h6" color="error">
          Prediction: {result.prediction}
        </Typography>

        <Typography>
          Confidence: {result.confidence}%   {/* ✅ FIXED */}
        </Typography>

        <Typography>
          Risk Level: {result.risk_level}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Results;
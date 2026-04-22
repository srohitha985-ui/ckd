// src/components/FeatureImportance.js
import React from "react";
import { Card, CardContent, Typography, LinearProgress, Box } from "@mui/material";

const FeatureImportance = ({ data }) => {
  if (!data || data.length === 0)
    return <Typography sx={{ mt: 3 }}>No feature importance data available.</Typography>;

  return (
    <Card sx={{ mt: 4, p: 2, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Feature Importance
        </Typography>
        {data.map((item, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="body2">{item.feature}</Typography>
            <LinearProgress
              variant="determinate"
              value={item.importance * 100}
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default FeatureImportance;

// src/components/StatsCard.js
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const StatsCard = ({ title, value, color }) => {
  return (
    <Card sx={{ borderTop: `6px solid ${color}`, borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" color="textSecondary">
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatsCard;

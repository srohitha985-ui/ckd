import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Grid,
  CircularProgress,
  Box
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/model-metrics")
      .then((res) => res.json())
      .then((data) => {
        setMetrics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching metrics:", err);
        setError("Failed to load metrics");
        setLoading(false);
      });
  }, []);

  // 🔥 Loading
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  // 🔥 Error
  if (error) {
    return (
      <Typography color="error" align="center" mt={5}>
        {error}
      </Typography>
    );
  }

  // 🔥 Top 10 Features
  const featureData = Object.entries(metrics.feature_importance)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([key, value]) => ({
      name: key,
      value: value,
    }));

  const statCards = [
    { title: "Accuracy", value: metrics.accuracy },
    { title: "Precision", value: metrics.precision },
    { title: "Recall", value: metrics.recall },
    { title: "F1-Score", value: metrics.f1_score },
  ];

  // 🔥 Color logic
  const getColor = (value) => {
    if (value >= 0.9) return "#2e7d32"; // green
    if (value >= 0.75) return "#ed6c02"; // orange
    return "#d32f2f"; // red
  };

  return (
    <div style={{ padding: "25px" }}>
      {/* 🔥 Title */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        CKD Prediction Model Performance Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* 🔹 STAT CARDS */}
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 4,
                transition: "0.3s",
                "&:hover": { transform: "scale(1.03)" }
              }}
            >
              <CardContent>
                <Typography variant="h6">{stat.title}</Typography>

                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ color: getColor(stat.value) }}
                >
                  {(stat.value * 100).toFixed(2)}%
                </Typography>

                <LinearProgress
                  variant="determinate"
                  value={stat.value * 100}
                  sx={{
                    height: 8,
                    mt: 1,
                    borderRadius: 5,
                    backgroundColor: "#eee",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: getColor(stat.value)
                    }
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* 🔹 FEATURE IMPORTANCE */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Top 10 Important Features
              </Typography>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={featureData}>
                  <XAxis dataKey="name" angle={-30} textAnchor="end" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
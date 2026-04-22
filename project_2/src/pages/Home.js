import React from "react";
import { Typography, Card, CardContent, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/predict");
  };

  return (
    <Card
      sx={{
        p: 4,
        mt: 8,
        maxWidth: 800,
        mx: "auto",
        textAlign: "center",
        boxShadow: 4,
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          gutterBottom
          color="primary"
          sx={{ fontWeight: "bold" }}
        >
          Chronic Kidney Disease Detection
        </Typography>

        <Typography variant="body1" sx={{ mb: 4 }}>
          This system uses Machine Learning models like Random Forest, SVM, and
          Logistic Regression to predict the likelihood of Chronic Kidney
          Disease based on patient health parameters.
        </Typography>

        <Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleNavigate}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Go to Prediction
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Home;

import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Container
} from '@mui/material';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import ResultCard from '../components/ResultCard';

function PredictionForm() {
  const [formData, setFormData] = useState({
    age: "",
    bp: "",
    sg: "",
    al: "",
    su: "",
    bgr: "",
    bu: "",
    sc: "",
    sod: "",
    pot: "",
    hemo: "",
    pcv: "",
    wc: "",
    rc: ""
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post("http://127.0.0.1:8000/predict", {
        age: Number(formData.age),
        bp: Number(formData.bp),
        sg: Number(formData.sg),
        al: Number(formData.al),
        su: Number(formData.su),
        bgr: Number(formData.bgr),
        bu: Number(formData.bu),
        sc: Number(formData.sc),
        sod: Number(formData.sod),
        pot: Number(formData.pot),
        hemo: Number(formData.hemo),
        pcv: Number(formData.pcv),
        wc: Number(formData.wc),
        rc: Number(formData.rc)
      });

      setResult(response.data);
    } catch (error) {
      console.error("Prediction error:", error);
      alert("Error connecting to the backend!");
    }

    setLoading(false);
  };

  const fields = [
    "age","bp","sg","al","su",
    "bgr","bu","sc","sod","pot",
    "hemo","pcv","wc","rc"
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card sx={{ p: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Enter Patient Details
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {fields.map((field) => (
                <Grid item xs={12} sm={6} md={4} key={field}>
                  <TextField
                    label={field.toUpperCase()}
                    name={field}
                    type="number"
                    value={formData[field]}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
              ))}
            </Grid>

            <Box textAlign="center" sx={{ mt: 3 }}>
              <Button variant="contained" color="primary" type="submit">
                {loading ? "Predicting..." : "Predict CKD"}
              </Button>
            </Box>
          </form>

          {loading && <LoadingSpinner />}

          {result && (
            <ResultCard
              prediction={result.prediction}
              confidence={result.confidence}
              risk={result.risk_level}
            />
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default PredictionForm;
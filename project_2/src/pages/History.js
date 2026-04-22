import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Divider,
  Button,
  Box
} from '@mui/material';
import axios from 'axios';
import jsPDF from 'jspdf';

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/history")
      .then(res => setHistory(res.data))
      .catch(err => console.error("Error fetching history:", err));
  }, []);

  // ✅ CLEAN PDF FUNCTION
  const downloadPDF = () => {
    const pdf = new jsPDF();

    let y = 20;

    // 🏥 TITLE
    pdf.setFontSize(18);
    pdf.text("CKD Prediction History", 60, y);

    y += 10;

    // 📅 DATE
    const currentDate = new Date().toLocaleString();
    pdf.setFontSize(10);
    pdf.text(`Date: ${currentDate}`, 10, y);

    y += 10;

    // 🔥 ONLY HISTORY (NO EXTRA DATA)
    if (history.length === 0) {
      pdf.setFontSize(12);
      pdf.text("No history available.", 10, y);
    } else {
      history.forEach((h, index) => {
        pdf.setFontSize(11);

        pdf.text(`Record ${index + 1}`, 10, y);
        y += 6;

        pdf.text(`Prediction: ${h.prediction}`, 10, y);
        y += 6;

        pdf.text(`Confidence: ${h.confidence}%`, 10, y);
        y += 6;

        pdf.text(`Risk Level: ${h.risk_level}`, 10, y);
        y += 6;

        pdf.text(`Time: ${h.timestamp}`, 10, y);
        y += 10;

        // 📄 NEW PAGE if overflow
        if (y > 270) {
          pdf.addPage();
          y = 20;
        }
      });
    }

    // SAVE
    pdf.save("CKD_History_Report.pdf");
  };

  return (
    <Card sx={{ p: 3 }}>
      <CardContent>

        {/* 🔥 Title */}
        <Typography variant="h5" gutterBottom>
          Prediction History
        </Typography>

        {/* 🔥 Download Button */}
        <Box textAlign="right" mb={2}>
          <Button variant="contained" color="primary" onClick={downloadPDF}>
            📄 Export PDF
          </Button>
        </Box>

        {/* 🔥 UI LIST */}
        {history.length === 0 ? (
          <Typography>No history available.</Typography>
        ) : (
          <List>
            {history.map((h, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <div>
                    <Typography>
                      <strong>Prediction:</strong> {h.prediction}
                    </Typography>

                    <Typography>
                      <strong>Confidence:</strong> {h.confidence}%
                    </Typography>

                    <Typography>
                      <strong>Risk Level:</strong> {h.risk_level}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      {h.timestamp}
                    </Typography>
                  </div>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}

      </CardContent>
    </Card>
  );
}

export default History;
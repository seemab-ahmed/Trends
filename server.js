const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3000;
// AKfycbxXjJfPdtU4g2TNN6OQ_5GTGQ1OqtB2VWcZADP8uB93qlbznQC9W5E30WUHnBUHrtJp
// Replace with your actual Google Apps Script URL
// https://script.google.com/macros/s/AKfycbysxXD5uhrXNTzgxxT-mjfM_3unx-ybM9wU3Dmz6cYkuj9itxTmijsIP0KOD2V-uL0Z/exec
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbypaPv8Js0bralCgaKvj9d3srE0t39pQfZev1AwnSNyGN3AVl6-HK6cyfXYADMmKCDO/exec";

app.use(express.json());
app.use(cors());

app.post("/subscribe", async (req, res) => {
  console.log("Received from frontend:", req.body); // Log the payload
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const response = await axios.post(GOOGLE_SCRIPT_URL, { 
      type: "newsletter",
      email 
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    console.log("Google Script response:", response.data); // Log the response
    res.json(response.data);
  } catch (error) {
    console.error("Error calling Google Script:", error.response?.data || error.message);
    res.status(500).json({ 
      error: "Subscription failed",
      details: error.response?.data || error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
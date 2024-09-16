const express = require("express");
const Assessment = require("../models/Assessment");
const { authenticateJWT } = require("../middleware/auth");
const router = express.Router();

router.post("/submit", authenticateJWT, async (req, res) => {
  const { assessments } = req.body;

  try {
    const assessmentsData = assessments.map((a) => ({
      question: a.question,
      answer: a.answer,
      user: req.userId,
    }));

    await Assessment.insertMany(assessmentsData);
    res.status(201).json({ message: "Assessments submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error submitting assessments" });
  }
});

router.get("/fetch", authenticateJWT, async (req, res) => {
  try {
    const assessments = await Assessment.find({ user: req.userId });
    res.status(200).json(assessments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching assessments" });
  }
});

module.exports = router;

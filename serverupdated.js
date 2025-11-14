import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Your protected numbers
const protectedNumbers = ["3206939553", "3057175014", "3446823272"];

// Proxy endpoint
app.get("/api/simdatabase.php", async (req, res) => {
  const { phone } = req.query;

  if (!phone) {
    return res.status(400).json({ error: "Missing phone parameter" });
  }

  // Check if phone is one of your protected numbers
  if (protectedNumbers.includes(phone)) {
    return res.json({
      phone: phone,
      name: "OWNER",
      carrier: "Classified 😎",
      location: "Top Secret 🕵️‍♂️",
      status: "Access Denied 🔒",
      message: "🤣 Whoa there! You’re snooping for the OWNER’s number! Epic fail 😜",
      developer: "NasirHacker"
    });
  }

  try {
    // Call the real API
    const response = await axios.get(
      `https://legendxdata.site/Api/simdata.php?phone=${phone}`
    );

    // Append your own field
    const finalResponse = {
      ...response.data,
      developer: "NasirHacker"
    };

    res.json(finalResponse);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from real API" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Proxy API running on port ${PORT}`));

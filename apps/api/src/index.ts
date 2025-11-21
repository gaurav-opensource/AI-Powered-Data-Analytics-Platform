import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//import routes
import statsRoutes from "./routes/statsRoutes.ts";
import invoiceRoutes from "./routes/invoiceRoutes.ts";
import chatRoutes from "./routes/chatRoutes.ts";
import vendorRoutes from "./routes/vendorRoutes.ts";

//data base connection
import prisma from "./utils/prismaClient.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


// Routes
app.use("/api", statsRoutes);
app.use("/api", invoiceRoutes);
app.use("/api", chatRoutes);
app.use("/api", vendorRoutes);

//test api for database connection
app.get("/test-db", async (req, res) => {
  try {
    const result = await prisma.invoices.findFirst(); 
    res.json({
      success: true,
      message: "Database Connected Successfully!",
      sampleData: result
    });
  } catch (error) {
    res.json({ success: false});
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

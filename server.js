import express from "express";
import cors from "cors";
import routes from "./src/routes.js";  // ✅ Ensure .js is explicitly added

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());  // ✅ Corrected JSON middleware
app.use("/api", routes);  // ✅ Fixed route syntax



app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);  // ✅ Fixed string interpolation
});

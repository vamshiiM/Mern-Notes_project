import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import tpRoutes from "./routes/tpRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/ratelimiter.js";
import cors from "cors";
import path from "path"


dotenv.config(); // for environment variables

const app = express();
const port = process.env.PORT
const __dirname = path.resolve()

// connectDB();

// this is used for getting the information of var present in the .env rather then getting undefined
// console.log(process.env.MONGO_URL);

if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173"
    }));
}
// this acts as a middleware which processes the data and doesn't show undefined as default while accessing data or consol loging 
app.use(express.json());

// this is for rateLimiting in middleware
app.use(rateLimiter);

// note middleware is used for auth check 



//  this is for tp 
// app.use((req,res,next)=>{
//     console.log(`we just got a new req ${req.method} and req url is ${req.url}`);
//     next(); // this will call the next function 
// })

// used for routing
app.use("/tp", tpRoutes);
app.use("/api/notes", notesRoutes)

// for production

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

// this says if you get get request on "/api/notes" then send "you got notes"
// app.get("/api/notes", (req, res) => {
//     res.send("you got notes");
// })

// this is for creating post
// app.post("/api/notes", (req, res) => {
//     res.status(201).json({ message: "post created successfully" })
// })

// this is for updating

// app.put("/api/notes/:id", (req, res) => {
//     res.status(200).json({ message: "post updated successfully" })
// })

// this is for deleting 
// app.delete("api/notes/:id", (req, res) => {
//     res.status(200).json({ message: "notes deleted successfully" })
// })

// status code 200 means that the task was successfull
// app.get("/api/notes", (req, res) => {
//     res.status[200].send("you got notes");
// })
// app.post("/api/notes", (req, res) => {
//     res.status[201].send("you got notes");
// })


//status code 300 means redirection error

//status code 400 means you as a client have fucked up such as unauth etc

// always connect with Db first then start the server.

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server started : http://localhost:${port}`)
    })
})


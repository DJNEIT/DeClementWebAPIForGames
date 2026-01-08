const { timeStamp } = require("console");
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

//Static route set Up
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json);

//Define a route
app.get("/", (req, res)=>{
    res.send("Hello lil pup, the server is running");
});

app.get("/fun", (req, res)=>{
    res.send("Hello fun pup, the server is running");
});

app.get("/main", (req,res)=>{
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/secondPage", (req,res)=>{
    res.sendFile(path.join(__dirname, "public", "secondPage.html"));
});

//JSON data route
app.get("/api/data",(req,res)=>{
    res.json({player:"TytansDeath", timeStamp:new Date(),games:["TitanFall 2", "Apex Legends", "EldenRing", "7 Days to Die"]});
});

//JSON via data file
app.get("/api/games", (req,res)=>{
    fs.readFile("data.json", "utf-8", (err,data)=>{
        if(err)
        {
            res.status(500).json({error:"Failed to read data file"});
            return;
        }
        //send actual data
        res.json(JSON.parse(data));
    });
});

let leaderboard = [
    {player:"Cory",score:12},
    {player:"Tom", score: 1250},
    {player:"Spencer", score: 0}
]

//Post request example
app.post("/leaderboard", (req,res)=>{
    const {player, score} = req.body;

    //basic validation
    if(typeof player != "string"|| typeof score!= "number")
    {
        return res.status(400).json({
            ok:false,
            error:"Expected JSON body: {player:string, score:number}"
        });
    }
    //add leader to scoreboard
    leaderboard.push({player,score});
    //sort scores
    leaderboard.sort((a,b)=>b.score-a.score);

    console.log(leaderboard);
    res.status(201).json({
        ok:true,
        leaderboard
    });
});

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
});

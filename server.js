import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

app.get('/api/:date', (req, res) => { //TODO: Merge with blank API, use /:date?
    console.log(req.params)
    //console.log(req.params.date?)

    if('date' in req.params){
        console.log("check if there's something")
        const {date} = req.params

        const parsedDate = new Date(!isNaN(Number(date)) ? Number(date) : date)

        if(isNaN(parsedDate.getTime())){
            res.json({ error: "Invalid Date" })
        }
        else{
            res.json({unix: Math.floor(parsedDate.getTime()), utc: parsedDate.toUTCString()})
        }
    } 
    else{
    console.log('nothing found, use fallback output')

    const currentTime = Date.now()
    const formattedTime = new Date(currentTime * 1000); 

    res.json({unix: currentTime, utc: formattedTime.toUTCString() })
    }
})

app.get('/api/', (req, res) => { //TODO: Merge with API with date input, use /:date?
    console.log('blank output')
    const currentTime = Date.now()
    const formattedTime = new Date(currentTime); 

    console.log({unix: currentTime, utc: formattedTime.toUTCString() })

    res.json({unix: currentTime, utc: formattedTime.toUTCString() })
})


// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

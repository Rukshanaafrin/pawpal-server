const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("PawPal Server is Running");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://rukshanaafrinety797_db_user:AeTXILcRbG5Xvqvv@cluster0.0ogo0ei.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const petsCollection = client.db("pawpalDB").collection("pets");

        app.post("/pets", async (req, res) => {
            const newPet = req.body;

            const result = await petsCollection.insertOne(newPet);

            res.send(result);
        });


        await client.connect();
        console.log("Connected to MongoDB!");
    } finally {

    }
}

run().catch(console.dir);
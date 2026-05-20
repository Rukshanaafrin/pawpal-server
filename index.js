const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("PawPal Server is Running");
});

const {
    MongoClient,
    ServerApiVersion,
    ObjectId,
} = require("mongodb");

const uri =
    "mongodb+srv://rukshanaafrinety797_db_user:AeTXILcRbG5Xvqvv@cluster0.0ogo0ei.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {

        await client.connect();

        const petsCollection =
            client.db("pawpalDB").collection("pets");

        const requestsCollection =
            client.db("pawpalDB").collection("requests");

        // POST PET

        app.post("/pets", async (req, res) => {

            const newPet = req.body;

            const result =
                await petsCollection.insertOne(newPet);

            res.send(result);

        });

        // GET ALL PETS

        app.get("/pets", async (req, res) => {

            const result =
                await petsCollection.find().toArray();

            res.send(result);

        });

        // GET SINGLE PET

        app.get("/pets/:id", async (req, res) => {

            const id = req.params.id;

            const result =
                await petsCollection.findOne({
                    _id: new ObjectId(id),
                });

            res.send(result);

        });

        // UPDATE PET

        app.put("/pets/:id", async (req, res) => {

            const id = req.params.id;

            const updatedPet = req.body;

            const result =
                await petsCollection.updateOne(
                    {
                        _id: new ObjectId(id),
                    },
                    {
                        $set: updatedPet,
                    }
                );

            res.send(result);

        });

        // DELETE PET

        app.delete("/pets/:id", async (req, res) => {

            const id = req.params.id;

            const result =
                await petsCollection.deleteOne({
                    _id: new ObjectId(id),
                });

            res.send(result);

        });

        // ==========================
        // ADOPTION REQUEST APIs
        // ==========================

        // POST REQUEST

        app.post("/requests", async (req, res) => {

            const requestData = req.body;

            const result =
                await requestsCollection.insertOne(requestData);

            res.send(result);

        });

        // GET ALL REQUESTS

        app.get("/requests", async (req, res) => {

            const result =
                await requestsCollection.find().toArray();

            res.send(result);

        });

        // DELETE REQUEST

        app.delete("/requests/:id", async (req, res) => {

            const id = req.params.id;

            const result =
                await requestsCollection.deleteOne({
                    _id: new ObjectId(id),
                });

            res.send(result);

        });

        console.log("Connected to MongoDB!");

    } finally {
    }
}

run().catch(console.dir);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
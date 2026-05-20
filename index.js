const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("PawPal Server is Running");
});

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

    await client.db("admin").command({ ping: 1 });

    console.log("Connected to MongoDB!");

    const petsCollection =
      client.db("pawpalDB").collection("pets");

    const requestsCollection =
      client.db("pawpalDB").collection("requests");

    // ==========================
    // PET APIs
    // ==========================

    app.post("/pets", async (req, res) => {
      const newPet = req.body;

      const result =
        await petsCollection.insertOne(newPet);

      res.send(result);
    });

    app.get("/pets", async (req, res) => {
      const result =
        await petsCollection.find().toArray();

      res.send(result);
    });

    app.get("/pets/:id", async (req, res) => {
      const id = req.params.id;

      const result =
        await petsCollection.findOne({
          _id: new ObjectId(id),
        });

      res.send(result);
    });

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

    app.delete("/pets/:id", async (req, res) => {
      const id = req.params.id;

      const result =
        await petsCollection.deleteOne({
          _id: new ObjectId(id),
        });

      res.send(result);
    });

    // ==========================
    // REQUEST APIs
    // ==========================

    app.post("/requests", async (req, res) => {
      const requestData = req.body;

      const result =
        await requestsCollection.insertOne(
          requestData
        );

      res.send(result);
    });

    app.get("/requests", async (req, res) => {
      const result =
        await requestsCollection.find().toArray();

      console.log("Requests:", result);

      res.send(result);
    });

    app.delete("/requests/:id", async (req, res) => {
      const id = req.params.id;

      const result =
        await requestsCollection.deleteOne({
          _id: new ObjectId(id),
        });

      res.send(result);
    });

  } catch (error) {
    console.log(error);
  }
}

run();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
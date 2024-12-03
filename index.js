const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// MIDDELWARE
app.use(express.json());
app.use(cors());


const uri = "mongodb+srv://curd:NsEZ4GX6V1rswL5m@cluster0.bdxj8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function Main() {
    try {
        // database name
        const gymSchedule = client.db("gym-schedule").collection("schedule");
        // create
        app.post('/schedule', async (req, res) => {
            const data = req.body;
            const result = await gymSchedule.insertOne(data)
            res.send(result)
        })

        // read
        app.get('/schedule', async (req, res) => {
            const result = await gymSchedule.find().toArray();
            res.send(result)
        })

        // update
        app.get('/schedule/:id', async(req,res)=>{
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await gymSchedule.findOne(query);
            res.send(result);
        })

        // delete
        app.delete('/schedule/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await gymSchedule.deleteOne(query);
            res.send(result);
        })

        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    catch (error) {
        console.log(error);
    }
}

Main()



app.get('/', (req, res) => {
    res.send('Server is runding')
})


app.listen(port, () => {
    console.log('server is running on port:', port);
})
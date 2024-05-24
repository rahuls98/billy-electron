const { ipcMain } = require("electron");
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });

const connectToAtlas = async () => {
    try {
        const dbURI = process.env.ATLAS_URI;
        client = new MongoClient(dbURI);
        await client.connect();
        console.log("Connected to MongoDB Atlas");
    } catch (err) {
        console.error(err);
    }
};

const disconnectFromAtlas = async () => {
    try {
        await client.close();
        console.log("Disconnected from MongoDB Atlas");
    } catch (err) {
        console.error(err);
    }
};

ipcMain.handle("read", async () => {
    try {
        const db = client.db("billy-db");
        const collection = db.collection("data");
        let data = await collection.find({}).toArray();
        data = data.map((doc) => ({
            ...doc,
            _id: doc._id.toString(),
        }));
        console.log(data);
        return data;
    } catch (err) {
        console.error(err);
    }
});

ipcMain.handle("readInvoiceAndCustomerNames", async () => {
    try {
        const db = client.db("billy-db");
        const collection = db.collection("data");
        const aggregationPipeline = [
            {
                $project: {
                    _id: 1,
                    invoiceNo: 1,
                    billingCustomerName: 1,
                },
            },
        ];
        let data = await collection.aggregate(aggregationPipeline).toArray();
        data = data.map((doc) => ({
            ...doc,
            _id: doc._id.toString(),
        }));
        console.log(data);
        return data;
    } catch (err) {
        console.error(err);
    }
});

ipcMain.handle("write", async (event, newItem) => {
    try {
        const db = client.db("billy-db");
        const collection = db.collection("data");
        const result = await collection.insertOne(newItem);
        console.log({
            message: "Data written successfully",
            insertedId: result.insertedId,
        });
    } catch (err) {
        console.error(err);
    }
});

module.exports = {
    connectToAtlas,
    disconnectFromAtlas,
};

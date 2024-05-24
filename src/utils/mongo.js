const { MongoClient } = require("mongodb");

export const read = async () => {
    const dbURI = process.env.REACT_APP_ATLAS_URI;
    const client = new MongoClient(dbURI);
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas");
        const db = client.db("billy-db");
        const collection = db.collection("data");
        let data = await collection.find({}).toArray();
        data = data.map((doc) => ({
            ...doc,
            _id: doc._id.toString(),
        }));
        console.log(data);
        await client.close();
        console.log("Disconnected from MongoDB Atlas");
        return data;
    } catch (err) {
        console.error(err);
        await client.close();
        console.log("Disconnected from MongoDB Atlas");
    }
};

export const readInvoiceAndCustomerNames = async () => {
    const dbURI = process.env.REACT_APP_ATLAS_URI;
    const client = new MongoClient(dbURI);
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas");
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
        await client.close();
        console.log("Disconnected from MongoDB Atlas");
        return data;
    } catch (err) {
        console.error(err);
        await client.close();
        console.log("Disconnected from MongoDB Atlas");
    }
};

export const write = async (newItem) => {
    const dbURI = process.env.REACT_APP_ATLAS_URI;
    const client = new MongoClient(dbURI);
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas");
        const db = client.db("billy-db");
        const collection = db.collection("data");
        const result = await collection.insertOne(newItem);
        console.log({
            message: "Data written successfully",
            insertedId: result.insertedId,
        });
        await client.close();
        console.log("Disconnected from MongoDB Atlas");
    } catch (err) {
        console.error(err);
        await client.close();
        console.log("Disconnected from MongoDB Atlas");
    }
};

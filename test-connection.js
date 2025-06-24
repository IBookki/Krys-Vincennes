const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://user:userpass931@cluster0.nuzoh5n.mongodb.net/krys_vincennes?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connexion MongoDB réussie!");
    
    // Test d'insertion
    const db = client.db("krys_vincennes");
    const collection = db.collection("glasses");
    
    const testDoc = {
      brand: "Test",
      model: "Connexion",
      category: "homme",
      price: 100,
      description: "Test de connexion",
      image: "/test.jpg",
      createdAt: new Date()
    };
    
    const result = await collection.insertOne(testDoc);
    console.log("✅ Document inséré:", result.insertedId);
    
  } catch (error) {
    console.error("❌ Erreur:", error);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
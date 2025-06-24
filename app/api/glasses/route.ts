import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { MongoClient, ServerApiVersion } from "mongodb";

// Utiliser la variable d'environnement
const uri = process.env.MONGODB_URI!;

// Fonction pour créer une nouvelle connexion à chaque fois
async function connectToDatabase() {
  console.log("🔗 URI utilisée:", uri ? "✅ Variable d'environnement trouvée" : "❌ Variable manquante");
  console.log("🔗 URI commence par:", uri?.substring(0, 25) + "...");
  
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
  await client.connect();
  return { client, db: client.db("krys_vincennes") };
}

export async function POST(request: NextRequest) {
  let client;
  try {
    console.log("🚀 API POST appelée");
    console.log("🔗 URI MongoDB:", uri ? "✅ Définie" : "❌ Manquante");
    
    const formData = await request.formData();
    const image = formData.get('image') as File;
    
    console.log("📝 Données reçues:", {
      brand: formData.get('brand'),
      model: formData.get('model'),
      category: formData.get('category'),
      price: formData.get('price'),
      image: image?.name
    });
    
    if (!image) {
      return NextResponse.json({ error: "Aucune image fournie" }, { status: 400 });
    }

    // Créer le dossier uploads
    const uploadsDir = path.join(process.cwd(), 'public/uploads');
    await mkdir(uploadsDir, { recursive: true });
    
    // Sauvegarder l'image
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${image.name}`;
    const filepath = path.join(uploadsDir, filename);
    await writeFile(filepath, buffer);

    console.log("📸 Image sauvegardée:", filename);

    // Préparer les données pour MongoDB
    const glassesData = {
      brand: formData.get('brand') as string,
      model: formData.get('model') as string,
      category: formData.get('category') as 'homme' | 'femme' | 'enfant' | 'solaire',
      price: Number(formData.get('price')),
      description: formData.get('description') as string || "",
      image: `/uploads/${filename}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    console.log("💾 Données à insérer:", glassesData);

    // Connexion à MongoDB et insertion
    console.log("🔄 Tentative de connexion à MongoDB...");
    const { client: dbClient, db } = await connectToDatabase();
    client = dbClient;
    
    console.log("✅ Connexion MongoDB réussie");
    
    const collection = db.collection("glasses");
    const result = await collection.insertOne(glassesData);

    console.log("✅ Document inséré avec ID:", result.insertedId);
    
    return NextResponse.json({ 
      message: "Lunettes ajoutées avec succès", 
      glasses: { ...glassesData, _id: result.insertedId }
    });

  } catch (error) {
    console.error("❌ Erreur POST:", error);
    return NextResponse.json({ 
      error: "Erreur lors de l'ajout: " + error.message 
    }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
      console.log("🔒 Connexion fermée");
    }
  }
}

export async function GET(request: NextRequest) {
  let client;
  try {
    console.log("📊 API GET appelée");
    
    const { client: dbClient, db } = await connectToDatabase();
    client = dbClient;
    
    const collection = db.collection("glasses");
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let glasses;
    if (category) {
      glasses = await collection.find({ category }).toArray();
    } else {
      glasses = await collection.find({}).toArray();
    }
    
    console.log(`📊 Trouvé ${glasses.length} lunettes pour catégorie: ${category || 'toutes'}`);
    return NextResponse.json(glasses);
    
  } catch (error) {
    console.error("❌ Erreur GET:", error);
    return NextResponse.json([]);
  } finally {
    if (client) {
      await client.close();
    }
  }
}
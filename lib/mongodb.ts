import { MongoClient } from "mongodb";

// Declare the global variable for TypeScript
declare global {
	// eslint-disable-next-line no-var
	var _mongoClientPromise: Promise<MongoClient>;
}

if (!process.env.MONGODB_URI && typeof window === "undefined") {
	// Only show this warning on the server side
	console.warn("No MONGODB_URI defined, using hardcoded connection string");
}

const uri =
	process.env.MONGODB_URI ||
	"mongodb+srv://slowey:ai7mpy7bqOQ0Z4Bd@go-green-nextjs.leteke.mongodb.net/";
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
	// In development mode, use a global variable so that the value
	// is preserved across module reloads caused by HMR (Hot Module Replacement).
	if (!global._mongoClientPromise) {
		client = new MongoClient(uri, options);
		global._mongoClientPromise = client.connect();
	}
	clientPromise = global._mongoClientPromise;
} else {
	// In production mode, it's best to not use a global variable.
	client = new MongoClient(uri, options);
	clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

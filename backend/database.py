from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = "mongodb+srv://uthara:uthara2004@cluster0.bzy1cax.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0"

client = AsyncIOMotorClient(MONGO_URI)
db = client["ecommerce"]

users_collection = db["users"]  # Make sure your users collection is named 'users'

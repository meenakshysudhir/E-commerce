from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List
from models import Product, CartItem

# FastAPI App
app = FastAPI()

# Enable CORS (for frontend like React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use specific origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Atlas Connection
MONGO_URI = "mongodb+srv://uthara:uthara2004@cluster0.bzy1cax.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0"
client = AsyncIOMotorClient(MONGO_URI)
db = client["ecommerce"]
product_collection = db["products"]
cart_collection = db["cart"]
order_collection = db["orders"]

# Utility to clean MongoDB _id
def clean_product(doc):
    return {
        "id": doc["id"],
        "name": doc["name"],
        "price": doc["price"],
        "image": doc["image"]
    }

def clean_cart_item(doc):
    return {
        "product": clean_product(doc["product"]),
        "quantity": doc["quantity"]
    }

# Routes
@app.get("/products", response_model=List[Product])
async def get_products():
    docs = await product_collection.find().to_list(100)
    return [clean_product(doc) for doc in docs]

@app.get("/cart", response_model=List[CartItem])
async def get_cart():
    docs = await cart_collection.find().to_list(100)
    return [clean_cart_item(doc) for doc in docs]

@app.post("/cart/add", response_model=CartItem)
async def add_to_cart(product_id: int):
    product = await product_collection.find_one({"id": product_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    existing = await cart_collection.find_one({"product.id": product_id})
    if existing:
        await cart_collection.update_one(
            {"product.id": product_id},
            {"$inc": {"quantity": 1}}
        )
        updated = await cart_collection.find_one({"product.id": product_id})
        return clean_cart_item(updated)

    new_item = {
        "product": product,
        "quantity": 1
    }
    await cart_collection.insert_one(new_item)
    return clean_cart_item(new_item)

@app.post("/admin/products", response_model=Product)
async def admin_add_product(product: Product = Body(...)):
    if await product_collection.find_one({"id": product.id}):
        raise HTTPException(status_code=400, detail="Product ID already exists")
    await product_collection.insert_one(product.dict())
    return product
@app.get("/admin/products", response_model=List[Product])
async def getAllProducts():
    products = await product_collection.find().to_list(100)
    return [clean_product(p) for p in products]

    
@app.get("/admin/orders")
async def admin_get_orders():
    orders = await order_collection.find().to_list(100)
    return orders

# for getting all products added by the admin
@app.get("/products", response_model=List[Product])
async def get_products():
    products = await product_collection.find().to_list(100)
    return [clean_product(p) for p in products]
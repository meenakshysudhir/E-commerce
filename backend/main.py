# from fastapi import FastAPI, HTTPException, Body,Request
# from fastapi.middleware.cors import CORSMiddleware
# from motor.motor_asyncio import AsyncIOMotorClient

# from models import Product, CartItem,ProductIdRequest,OrderItem,Order,create_user, find_user_by_email, verify_password,UserSignup, UserLogin
# import cloudinary
# import cloudinary.uploader
# from datetime import datetime
# from typing import List

# # Configuration       
# cloudinary.config( 
#     cloud_name = "dftlk2vjb", 
#     api_key = "759728372863946", 
#     api_secret = "kSbb3-grjE1erE3GkAE9f6FBtG4", # Click 'View API Keys' above to copy your API secret
#     secure=True
# )

# # FastAPI App
# app = FastAPI()

# # Enable CORS (for frontend like React)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Use specific origin in production
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # MongoDB Atlas Connection
# MONGO_URI = "mongodb+srv://uthara:uthara2004@cluster0.bzy1cax.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0"
# client = AsyncIOMotorClient(MONGO_URI)
# db = client["ecommerce"]
# product_collection = db["products"]
# cart_collection = db["cart"]
# order_collection = db["orders"]

# # Utility to clean MongoDB _id
# def clean_product(doc):
#     return {
#         "id": doc["id"],
#         "name": doc["name"],
#         "price": doc["price"],
#         "image": doc["image"],
#         "quantity":doc["quantity"   ]
#     }

# def clean_cart_item(doc):
#     return {
#         "product": clean_product(doc["product"]),
#         "quantity": doc["quantity"]
#     }

# # To simulate DB, use in-memory list
# orders_db: List[Order] = []
# order_counter = 1  # simple incremental order ID


# # Routes
# @app.get("/products", response_model=List[Product])
# async def get_products():
#     docs = await product_collection.find().to_list(100)
#     return [clean_product(doc) for doc in docs]

# @app.get("/cart", response_model=List[CartItem])
# async def get_cart():
#     docs = await cart_collection.find().to_list(100)
#     return [clean_cart_item(doc) for doc in docs]

# #add to cart
# @app.post("/cart/add", response_model=CartItem)
# async def add_to_cart(item: ProductIdRequest):
#     product_id = item.product_id
#     product = await product_collection.find_one({"id": product_id})
#     if not product:
#         raise HTTPException(status_code=404, detail="Product not found")

#     existing = await cart_collection.find_one({"product.id": product_id})
#     if existing:
#         await cart_collection.update_one(
#             {"product.id": product_id},
#             {"$inc": {"quantity": 1}}
#         )
#         updated = await cart_collection.find_one({"product.id": product_id})
#         return clean_cart_item(updated)

#     new_item = {
#         "product": product,
#         "quantity": 1
#     }
#     await cart_collection.insert_one(new_item)
#     return clean_cart_item(new_item)



# #Admin adding new products
# @app.post("/admin/products", response_model=Product)
# async def admin_add_product(product: Product = Body(...)):
#     if await product_collection.find_one({"id": product.id}):
#         raise HTTPException(status_code=400, detail="Product ID already exists")

#     # Fix Google Drive URL to direct download link
#     if "drive.google.com/file/d/" in product.image:
#         file_id = product.image.split("/d/")[1].split("/")[0]
#         product.image = f"https://drive.google.com/uc?export=download&id={file_id}"

#     try:
#         upload_result = cloudinary.uploader.upload(product.image)
#         cloudinary_url = upload_result.get("secure_url")
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Image upload failed: {str(e)}")

#     product_dict = product.dict()
#     product_dict["image"] = cloudinary_url

#     await product_collection.insert_one(product_dict)
#     return product_dict


# @app.get("/admin/orders")
# async def admin_get_orders():
#     orders = await order_collection.find().to_list(100)
#     return orders


# #user order

# @app.post("/checkout")
# async def create_order(items: List[OrderItem]):
#     if not items:
#         raise HTTPException(status_code=400, detail="Order cannot be empty")

#     # Calculate overall order total by summing total_amount from each item
#     total_order_amount = sum(item.total_amount for item in items)

#     order_dict = {
#         "items": [item.dict() for item in items],
#         "total_amount": total_order_amount,
#         "created_at": datetime.utcnow(),
#     }

#     result = await order_collection.insert_one(order_dict)
#     return {"message": "Order placed successfully", "order_id": str(result.inserted_id)}

# @app.get("/orders")
# async def get_all_orders():
#     orders_cursor = order_collection.find()
#     orders = []
    
#     async for doc in orders_cursor:
#         orders.append({
#             "order_id": str(doc["_id"]),
#             "items": doc["items"],
#             "total_amount": doc["total_amount"],
#             "created_at": doc["created_at"]
#         })
    
#     return orders

# @app.post("/signup")
# def signup(user: UserSignup):
#     if find_user_by_email(user.email):
#         raise HTTPException(status_code=400, detail="Email already registered.")
    
#     create_user(user.dict())
#     return {"message": "User created successfully"}

# @app.post("/login")
# def login(user: UserLogin):
#     db_user = find_user_by_email(user.email)
#     if not db_user or not verify_password(user.password, db_user["password"]):
#         raise HTTPException(status_code=401, detail="Invalid credentials")
    
#     return {
#         "message": "Login successful",
#         "email": db_user["email"],
#         "user_id": str(db_user["_id"])
#     }


from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

from models import (
    Product, CartItem, ProductIdRequest, OrderItem, Order,
    create_user, find_user_by_email, verify_password, UserSignup, UserLogin,UserLoginSchema
)
import cloudinary
import cloudinary.uploader
from datetime import datetime
from typing import List

# Cloudinary config
cloudinary.config( 
    cloud_name="dftlk2vjb", 
    api_key="759728372863946", 
    api_secret="kSbb3-grjE1erE3GkAE9f6FBtG4", 
    secure=True
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB setup
MONGO_URI = "mongodb+srv://uthara:uthara2004@cluster0.bzy1cax.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0"
client = AsyncIOMotorClient(MONGO_URI)
db = client["ecommerce"]
product_collection = db["products"]
cart_collection = db["cart"]
order_collection = db["orders"]

# Utility clean functions
def clean_product(doc):
    return {
        "id": doc["id"],
        "name": doc["name"],
        "price": doc["price"],
        "image": doc["image"],
        "quantity": doc["quantity"]
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
async def add_to_cart(item: ProductIdRequest):
    product_id = item.product_id
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

    if "drive.google.com/file/d/" in product.image:
        file_id = product.image.split("/d/")[1].split("/")[0]
        product.image = f"https://drive.google.com/uc?export=download&id={file_id}"

    try:
        upload_result = cloudinary.uploader.upload(product.image)
        cloudinary_url = upload_result.get("secure_url")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image upload failed: {str(e)}")

    product_dict = product.dict()
    product_dict["image"] = cloudinary_url

    await product_collection.insert_one(product_dict)
    return product_dict

@app.get("/admin/orders")
async def admin_get_orders():
    orders = await order_collection.find().to_list(100)
    return orders

@app.post("/checkout")
async def create_order(items: List[OrderItem]):
    if not items:
        raise HTTPException(status_code=400, detail="Order cannot be empty")

    total_order_amount = sum(item.total_amount for item in items)

    order_dict = {
        "items": [item.dict() for item in items],
        "total_amount": total_order_amount,
        "created_at": datetime.utcnow(),
    }

    result = await order_collection.insert_one(order_dict)
    return {"message": "Order placed successfully", "order_id": str(result.inserted_id)}

@app.get("/orders")
async def get_all_orders():
    orders_cursor = order_collection.find()
    orders = []
    async for doc in orders_cursor:
        orders.append({
            "order_id": str(doc["_id"]),
            "items": doc["items"],
            "total_amount": doc["total_amount"],
            "created_at": doc["created_at"]
        })
    return orders

@app.post("/signup")
async def signup(user: UserSignup):
    if await find_user_by_email(user.email):
        raise HTTPException(status_code=400, detail="Email already registered.")
    await create_user(user.dict())
    return {"message": "User created successfully"}

@app.post("/login")
async def login(user: UserLogin):
    db_user = await find_user_by_email(user.email)
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "message": "Login successful",
        "email": db_user["email"],
        "user_id": str(db_user["_id"])
    }
@app.post("/admin/login")
def admin_login(user: UserLoginSchema):
    if user.email == "uthara@gmail.com" and user.password == "admin123":
        return {"message": "Admin login success"}
    raise HTTPException(status_code=401, detail="Invalid admin credentials")

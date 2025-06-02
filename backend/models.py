# from pydantic import BaseModel, Field, EmailStr 
# from typing import Optional,List
# from datetime import datetime
# from passlib.context import CryptContext
# from bson.objectid import ObjectId
# from database import users_collection


# class Product(BaseModel):
#     id: int
#     name: str
#     price: float
#     quantity:int
#     image: str
    
# class OrderItem(BaseModel):
#     product_id: int
#     product_name: str
#     quantity: int
#     unit_price: float
#     total_amount: float 

# class Order(BaseModel):
#     order_id: str = Field(..., alias="id")
#     items: List[OrderItem]
#     total_amount: float
#     created_at: datetime

# class CartItem(BaseModel):
#     product: Product
#     quantity: int = 1

# class AddToCartRequest(BaseModel):
#     user_id: str
#     product_id: int
# class ProductIdRequest(BaseModel):
#     product_id: int

# class UserSignup(BaseModel):
#     email: EmailStr
#     password: str

# class UserLogin(BaseModel):
#     email: EmailStr
#     password: str


# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# def hash_password(password: str) -> str:
#     return pwd_context.hash(password)

# def verify_password(plain_password: str, hashed_password: str) -> bool:
#     return pwd_context.verify(plain_password, hashed_password)

# def create_user(user_data: dict):
#     user_data["password"] = hash_password(user_data["password"])
#     return users_collection.insert_one(user_data)

# def find_user_by_email(email: str):
#     return users_collection.find_one({"email": email})

from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
from passlib.context import CryptContext
from database import users_collection  # This now works because of database.py

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Models

class Product(BaseModel):
    id: int
    name: str
    price: float
    quantity: int
    image: str

class OrderItem(BaseModel):
    product_id: int
    product_name: str
    quantity: int
    unit_price: float
    total_amount: float 

class Order(BaseModel):
    order_id: str = Field(..., alias="id")
    items: List[OrderItem]
    total_amount: float
    created_at: datetime

class CartItem(BaseModel):
    product: Product
    quantity: int = 1

class AddToCartRequest(BaseModel):
    user_id: str
    product_id: int

class ProductIdRequest(BaseModel):
    product_id: int

class UserSignup(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Password utils

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# Async DB helpers

async def create_user(user_data: dict):
    user_data["password"] = hash_password(user_data["password"])
    result = await users_collection.insert_one(user_data)
    return result

async def find_user_by_email(email: str):
    user = await users_collection.find_one({"email": email})
    return user
class UserLoginSchema(BaseModel):
    email: EmailStr
    password: str
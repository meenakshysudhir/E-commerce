from pydantic import BaseModel,Field
from typing import Optional,List
from datetime import datetime


class Product(BaseModel):
    id: int
    name: str
    price: float
    quantity:int
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
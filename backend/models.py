from pydantic import BaseModel
from typing import Optional

class Product(BaseModel):
    id: int
    name: str
    price: float
    quantity:int
    image: str
    

class CartItem(BaseModel):
    product: Product
    quantity: int = 1

class AddToCartRequest(BaseModel):
    user_id: str
    product_id: int
class ProductIdRequest(BaseModel):
    product_id: int
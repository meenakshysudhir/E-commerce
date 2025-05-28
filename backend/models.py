from pydantic import BaseModel
from typing import List

class Product(BaseModel):
    id: int
    name: str
    price: float
    image: str

class CartItem(BaseModel):
    product: Product
    quantity: int = 1

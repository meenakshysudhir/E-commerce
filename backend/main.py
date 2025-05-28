from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import Product, CartItem
from typing import List
from fastapi import Body

app = FastAPI()

# Allow frontend (e.g., localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use specific origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage
products = [
    Product(id=1, name="Smartphone", price=699, image="/iphone.jpg"),
    Product(id=2, name="Headphones", price=199, image="/jblheadphones.jpg"),
    Product(id=3, name="Laptop", price=1299, image="/legion.jpg"),
    Product(id=4, name="Smartwatch", price=249, image="/smartwatch.jpg"),
]

cart: List[CartItem] = []

@app.get("/products", response_model=List[Product])
def get_products():
    return products

@app.get("/cart", response_model=List[CartItem])
def get_cart():
    return cart

@app.post("/cart/add", response_model=CartItem)
def add_to_cart(product_id: int):
    product = next((p for p in products if p.id == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    for item in cart:
        if item.product.id == product_id:
            item.quantity += 1
            return item

    new_item = CartItem(product=product)
    cart.append(new_item)
    return new_item

orders = []  # Simple in-memory list of orders (expand as needed)

@app.post("/admin/products", response_model=Product)
def admin_add_product(product: Product = Body(...)):
    # Check if product with same id already exists
    if any(p.id == product.id for p in products):
        raise HTTPException(status_code=400, detail="Product ID already exists")
    products.append(product)
    return product

@app.get("/admin/orders")
def admin_get_orders():
    return orders  # For now, just return the orders list
export function getCart(){
    const cartString = localStorage.getItem("cart")

    if(cartString == null){
        localStorage.setItem("cart", "[]")
        return []
    }else{
        const cart = JSON.parse(cartString)
        return cart
    }
}


export function addToCart(product , qty){
    const cart = getCart();

    const existingProductIndex = cart.findIndex(
        (item)=>{ 
            return item.product.productId == product.productId
        }
    );
    if(existingProductIndex == -1){
        if(qty <= 0){
            console.error("Quantity must be greater than 0");
            return;
        }
        cart.push(
            {
                product : {
                    productId : product.productId,
                    name : product.name,
                    labeledPrice : product.labeledPrice,
                    price : product.price,
                    image : product.images[0]
                },
                qty : qty
            }
        )

    }else{

        const newQty = cart[existingProductIndex].qty + qty

        if(newQty <= 0){

            // remove product from cart
            cart.splice(existingProductIndex ,1)

        }else{
            cart[existingProductIndex].qty = newQty
        }

    }
    const cartString = JSON.stringify(cart);

    localStorage.setItem("cart", cartString);

}

//Sum of all cart price
export function getCartTotal(cart){
    
    
    let total = 0;

    cart.forEach(
        (cartItem)=>{
            // total = total + cartItem.product.price * cartItem.qty
            total += cartItem.product.price * cartItem.qty
        }
    )

    return total

}




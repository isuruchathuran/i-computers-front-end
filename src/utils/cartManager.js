import Swal from 'sweetalert2';

export const getCart = () => {
    try {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    } catch (e) {
        return [];
    }
};

export const saveCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
};

export const addToCart = (product) => {
    if (product.qty <= 0) {
        Swal.fire({
            title: "Out of Stock",
            text: "This product is currently out of stock.",
            icon: "error",
            background: '#1f2937',
            color: '#fff',
            confirmButtonColor: '#ef4444'
        });
        return;
    }

    const cart = getCart();
    const existingIndex = cart.findIndex(item => item.productId === (product.productId || product._id));
    
    if (existingIndex > -1) {
        Swal.fire({
            title: "Already in Cart",
            text: "This product is already in your cart.",
            icon: "info",
            background: '#1f2937',
            color: '#fff',
            confirmButtonColor: '#0ea5e9'
        });
    } else {
        cart.push({
            productId: product.productId || product._id,
            productCode: product.productCode || "CODE-NA",
            name: product.productName || product.name,
            category: product.category || "Uncategorized",
            image: product.images?.[0],
            price: product.price,
            quantity: 1,
            maxStock: product.qty || 1
        });
        saveCart(cart);
        Swal.fire({
            title: "Added!",
            text: "Product added to cart successfully",
            icon: "success",
            background: '#1f2937',
            color: '#fff',
            confirmButtonColor: '#10b981',
            timer: 1500,
            showConfirmButton: false
        });
    }
};

export const removeFromCart = (productId) => {
    const cart = getCart();
    const newCart = cart.filter(item => item.productId !== productId);
    saveCart(newCart);
    
    Swal.fire({
        title: "Removed",
        text: "Product removed successfully.",
        icon: "success",
        toast: true,
        position: 'top-end',
        background: '#1f2937',
        color: '#fff',
        timer: 1500,
        showConfirmButton: false
    });
};

export const updateQuantity = (productId, newQuantity) => {
    const cart = getCart();
    const index = cart.findIndex(item => item.productId === productId);
    if (index > -1) {
        if (newQuantity > cart[index].maxStock) {
            Swal.fire({
                title: "Stock Limit",
                text: `Only ${cart[index].maxStock} items available in stock.`,
                icon: "warning",
                toast: true,
                position: 'top-end',
                background: '#1f2937',
                color: '#fff',
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }
        if (newQuantity < 1) return; // Minimum 1
        
        cart[index].quantity = newQuantity;
        saveCart(cart);
        
        Swal.fire({
            title: "Updated",
            text: "Quantity updated successfully.",
            icon: "success",
            toast: true,
            position: 'top-end',
            background: '#1f2937',
            color: '#fff',
            timer: 1000,
            showConfirmButton: false
        });
    }
};

export const getCartTotal = () => {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getCartItemCount = () => {
    return getCart().length;
};

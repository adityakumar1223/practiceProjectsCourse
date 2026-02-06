document.addEventListener("DOMContentLoaded", ()=>{

    const products = [
        {id: 1, name: "Product 1", price: 19.99},
        {id: 2, name: "Product 2", price: 29.99},
        {id: 3, name: "Product 3", price: 49.99}
    ];


    const productList = document.getElementById("product-list");
    const emptyCartMsg = document.getElementById("empty-cart");
    const cartItems = document.getElementById("cart-items");
    const cartTotalMsg = document.getElementById("cart-total");
    const totalPriceMsg = document.getElementById("total-price");
    const checkoutBtn = document.getElementById("checkout-btn");
    const removeBtn = document.getElementsByClassName("removeButton");

    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach(item => renderCart(item));

    products.forEach((product) =>{
        const productDiv = document.createElement('div');
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <span>${product.name} - $${product.price.toFixed(2)}</span>
            <button data-id="${product.id}">Add to cart</button>
        `;
        productList.appendChild(productDiv);

    });

    productList.addEventListener("click", (e) =>{
        if(e.target.tagName === "BUTTON"){
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            addToCart(product);        
        }
    } );

    function addToCart(product){
        cart.push(product);
        renderCart();
    };

    function renderCart(){
        // emptyCartMsg.classList.add("hidden");
        cartItems.innerHTML = ``;
        let totalPrice = 0;

        if(cart.length > 0){
            emptyCartMsg.classList.add('hidden');
            cartTotalMsg.classList.remove("hidden")

            cart.forEach((item, index) =>{
                totalPrice += item.price;
                const cartItem = document.createElement('div');
                cartItem.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)}
                <button class="removeButton" id="${index}">Remove</button>
                `;
                
                cartItems.appendChild(cartItem);
                totalPriceMsg.textContent = `$${totalPrice}`;
                saveTasks();

            });
        }else{
            emptyCartMsg.classList.remove("hidden");
            totalPriceMsg.textContent = `$${0}`;
        }

        
    };

    checkoutBtn.addEventListener("click", ()=>{
        cart.length = 0;
        alert("Checked out sucessfully");
        
        renderCart();
    });

    cartItems.addEventListener("click", (e)=>{
        if(e.target.classList.contains("removeButton")){
            const index = e.target.id;
            cart.splice(index, 1);
            renderCart();
            saveTasks();
        }
    })

    function saveTasks(){
        localStorage.setItem("cart", JSON.stringify(cart));
    }


});
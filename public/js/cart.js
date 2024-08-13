// Start: update quantity of products in cart
const inputsQuantity = document.querySelectorAll("input[name='quantity']")
if (inputsQuantity.length > 0) {
    inputsQuantity.forEach(input => {
        input.addEventListener("change", (event) => {
            const productId = input.getAttribute("product-id")
            const quantity = input.value
            window.location.href = `/cart/update/${productId}/${quantity}`
            // console.log(event.target.value) // event.target = input.value
        })
    })
}

// End: update quantity of products in cart
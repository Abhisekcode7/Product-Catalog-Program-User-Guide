function calculateTotal() {
    const quantities = {
        A: parseInt(document.getElementById("quantityA").value) || 0,
        B: parseInt(document.getElementById("quantityB").value) || 0,
        C: parseInt(document.getElementById("quantityC").value) || 0,
    };

    const giftWrap = {
        A: document.getElementById("giftWrapA").checked,
        B: document.getElementById("giftWrapB").checked,
        C: document.getElementById("giftWrapC").checked,
    };

    const prices = {
        A: 20,
        B: 40,
        C: 50,
    };

    let subtotal = 0;
    let totalQuantity = 0;

    for (const product in quantities) {
        const quantity = quantities[product];
        const price = prices[product];
        const isGiftWrapped = giftWrap[product];

        const totalAmount = quantity * price;
        const giftWrapFee = isGiftWrapped ? quantity * 1 : 0;

        subtotal += totalAmount + giftWrapFee;
        totalQuantity += quantity;
    }

    const flat10Discount = subtotal > 200 ? 10 : 0;
    const bulk5Discount = Math.max(
        ...Object.entries(quantities).map(([product, quantity]) => (quantity > 10 ? 0.05 * prices[product] * quantity : 0))
    );

    const totalQuantityAbove15 = Object.values(quantities).filter(quantity => quantity > 15).reduce((acc, val) => acc + val, 0);
    const bulk10Discount = totalQuantity > 20 ? 0.1 * subtotal : 0;
    const tiered50Discount = totalQuantity > 30 && totalQuantityAbove15 > 0 ? 0.5 * subtotal : 0;

    const discounts = {
        flat_10_discount: flat10Discount,
        bulk_5_discount: bulk5Discount,
        bulk_10_discount: bulk10Discount,
        tiered_50_discount: tiered50Discount,
    };

    const maxDiscountName = Object.keys(discounts).reduce((a, b) => (discounts[a] > discounts[b] ? a : b));
    const maxDiscountAmount = discounts[maxDiscountName];

    const shippingFee = Math.ceil(totalQuantity / 10) * 5;
    const total = subtotal - maxDiscountAmount + shippingFee;

    const resultElement = document.getElementById("result");
    resultElement.innerHTML = `
        <h2>Order Summary</h2>
        <p class="result-text">Subtotal: $${subtotal}</p>
        <p class="result-text">Discount Applied: ${maxDiscountName} - Amount: $${maxDiscountAmount}</p>
        <p class="result-text">Shipping Fee: $${shippingFee}</p>
        <p class="result-total">Total: $${total}</p>
    `;

    resultElement.classList.remove("hidden");
}

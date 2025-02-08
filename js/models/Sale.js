// Sale.js
function Sale(customer, date = new Date()) {
    if (!(customer instanceof Customer)) {
        throw new Error('Cliente inválido');
    }
    this.id = Date.now();
    this.customer = customer;
    this.products = [];
    this.total = 0;
    this.date = date;
    this.status = 'pending';
}

Sale.prototype.addProduct = function(product, quantity) {
    if (!(product instanceof Product)) {
        throw new Error('Producto inválido');
    }
    if (!product.hasStock(quantity)) {
        alert('Stock insuficiente');
        return;
    }
    this.products.push({ product, quantity });
    this.total += product.price * quantity;
    product.updateStock(-quantity);
};

Sale.prototype.complete = function() {
    if (this.products.length === 0) {
        alert('No hay productos en la venta');
        return;
    }
    this.customer.incrementPurchases();
    this.status = 'completed';
};

Sale.prototype.renderUI = function() {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerHTML = `
        Venta #${this.id} - Cliente: ${this.customer.name} - Total: S/ ${this.total.toFixed(2)}
    `;
    return li;
};
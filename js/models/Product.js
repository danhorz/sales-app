function Product(name, price, stock) {
    this.id = Date.now();
    this.name = name;
    this.price = parseFloat(price);
    this.stock = parseInt(stock, 10);
    this.createdAt = new Date();
}

Product.prototype.updateStock = function(quantity) {
    const newStock = this.stock + quantity;
    if (newStock >= 0) {
        this.stock = newStock;
    } else {
        console.warn("No puedes tener stock negativo.");
    }
};

Product.prototype.getFormattedPrice = function() {
    return `S/ ${this.price.toFixed(2)}`;
};

Product.prototype.getProductInfo = function() {
    return `${this.name} - ${this.getFormattedPrice()} (Stock: ${this.stock})`;
};

Product.prototype.renderUI = function() {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerHTML = `
        ${this.getProductInfo()}
        <button class="btn btn-warning btn-sm float-end mx-1 edit-product">Editar</button>
        <button class="btn btn-danger btn-sm float-end delete-product">Eliminar</button>
    `;
    return li;
};

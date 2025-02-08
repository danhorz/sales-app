function Customer(name, email) {
    this.id = Date.now();
    this.name = name;
    this.email = email;
    this.totalPurchases = 0;
    this.createdAt = new Date();
}

Customer.prototype.updateEmail = function(email) {
    this.email = email;
};

Customer.prototype.renderUI = function() {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerHTML = `
        ${this.name} - ${this.email}
        <button class="btn btn-warning btn-sm float-end mx-1 edit-customer">Editar</button>
        <button class="btn btn-danger btn-sm float-end delete-customer">Eliminar</button>
    `;
    return li;
};

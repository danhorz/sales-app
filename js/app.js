document.addEventListener("DOMContentLoaded", () => {
    const productForm = document.getElementById("product-form");
    const productList = document.getElementById("product-list");

    const customerForm = document.getElementById("customer-form");
    const customerList = document.getElementById("customer-list");

    let products = [];
    let customers = [];

    // 📌 Manejo de PRODUCTOS
    productForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("product-name").value;
        const price = document.getElementById("product-price").value;
        const stock = document.getElementById("product-stock").value;

        const product = new Product(name, price, stock);
        products.push(product);
        renderProductList();

        productForm.reset();
    });

    // 📌 Manejo de CLIENTES
    customerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("customer-name").value;
        const email = document.getElementById("customer-email").value;

        const customer = new Customer(name, email);
        customers.push(customer);
        renderCustomerList();

        customerForm.reset();
    });

    // 📌 RENDERIZAR LISTA DE PRODUCTOS
    function renderProductList() {
        productList.innerHTML = "";
        products.forEach((product) => {
            const li = product.renderUI();

            // Agregar eventos a los botones dentro de cada item
            li.querySelector(".edit-product").addEventListener("click", () => {
                const newStock = prompt("Nuevo stock para " + product.name, product.stock);
                if (newStock !== null && !isNaN(newStock)) {
                    product.updateStock(parseInt(newStock, 10) - product.stock);
                    renderProductList();
                }
            });

            li.querySelector(".delete-product").addEventListener("click", () => {
                products = products.filter(p => p.id !== product.id);
                renderProductList();
            });

            productList.appendChild(li);
        });
    }

    // 📌 RENDERIZAR LISTA DE CLIENTES
    function renderCustomerList() {
        customerList.innerHTML = "";
        customers.forEach((customer) => {
            const li = customer.renderUI();

            // Agregar eventos a los botones dentro de cada item
            li.querySelector(".edit-customer").addEventListener("click", () => {
                const newEmail = prompt("Nuevo email para " + customer.name, customer.email);
                if (newEmail !== null && newEmail.includes("@")) {
                    customer.updateEmail(newEmail);
                    renderCustomerList();
                }
            });

            li.querySelector(".delete-customer").addEventListener("click", () => {
                customers = customers.filter(c => c.id !== customer.id);
                renderCustomerList();
            });

            customerList.appendChild(li);
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const productForm = document.getElementById("product-form");
    const productList = document.getElementById("product-list");

    const customerForm = document.getElementById("customer-form");
    const customerList = document.getElementById("customer-list");

    const saleForm = document.getElementById("sale-form");
    const salesList = document.getElementById("sales-list");
    const customerSelect = document.getElementById("sale-customer");
    const productSelect = document.getElementById("sale-product");
    const quantityInput = document.getElementById("sale-quantity");
    const saleItemsList = document.getElementById("sale-product-list");
    const saleTotal = document.getElementById("sale-total");
    const addProductSaleBtn = document.getElementById("add-product-sale");
    const confirmSaleBtn = document.getElementById("complete-sale");

    let products = [];
    let customers = [];
    let sales = [];
    let currentSale = null;

    // 📌 Manejo de PRODUCTOS
    productForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("product-name").value;
        const price = document.getElementById("product-price").value;
        const stock = document.getElementById("product-stock").value;

        const product = new Product(name, price, stock);
        products.push(product);
        renderProductList();
        updateProductSelect();

        productForm.reset();
    });

    function renderProductList() {
        productList.innerHTML = "";
        products.forEach((product) => {
            const li = product.renderUI();

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
                updateProductSelect();
            });

            productList.appendChild(li);
        });
    }

    function updateProductSelect() {
        productSelect.innerHTML = '<option value="">Seleccione un producto</option>';
        products.forEach(product => {
            const option = document.createElement("option");
            option.value = product.id;
            option.textContent = `${product.name} - ${product.getFormattedPrice()} (Stock: ${product.stock})`;
            productSelect.appendChild(option);
        });
    }

    // 📌 Manejo de CLIENTES
    customerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("customer-name").value;
        const email = document.getElementById("customer-email").value;

        const customer = new Customer(name, email);
        customers.push(customer);
        renderCustomerList();
        updateCustomerSelect();

        customerForm.reset();
    });

    function renderCustomerList() {
        customerList.innerHTML = "";
        customers.forEach((customer) => {
            const li = customer.renderUI();

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
                updateCustomerSelect();
            });

            customerList.appendChild(li);
        });
    }

    function updateCustomerSelect() {
        customerSelect.innerHTML = '<option value="">Seleccione un cliente</option>';
        customers.forEach(customer => {
            const option = document.createElement("option");
            option.value = customer.id;
            option.textContent = customer.name;
            customerSelect.appendChild(option);
        });
    }

    // 📌 Ventas
    customerSelect.addEventListener("change", () => {
        const selectedCustomer = customers.find(c => c.id == customerSelect.value);
        if (!selectedCustomer) return;
        currentSale = new Sale(selectedCustomer);
        saleItemsList.innerHTML = "";
        saleTotal.textContent = "S/ 0.00";
    });

    addProductSaleBtn.addEventListener("click", () => {
        if (!currentSale) {
            alert("Primero selecciona un cliente para la venta.");
            return;
        }

        const selectedProduct = products.find(p => p.id == productSelect.value);
        const quantity = parseInt(quantityInput.value, 10);

        if (!selectedProduct || isNaN(quantity) || quantity <= 0) {
            alert("Selecciona un producto y cantidad válida");
            return;
        }

        if (!selectedProduct.hasStock(quantity)) {
            alert("Stock insuficiente");
            return;
        }

        currentSale.addProduct(selectedProduct, quantity);
        renderSaleItems();
    });

    confirmSaleBtn.addEventListener("click", () => {
        if (!currentSale) {
            alert("Primero selecciona un cliente.");
            return;
        }

        if (currentSale.products.length === 0) {
            alert("No hay productos en la venta.");
            return;
        }

        currentSale.complete();
        sales.push(currentSale);
        renderSalesList();
        resetSaleForm();
    });

    function renderSaleItems() {
        saleItemsList.innerHTML = "";
        currentSale.products.forEach(({ product, quantity }) => {
            const li = document.createElement("li");
            li.classList.add("list-group-item");
            li.textContent = `${product.name} x${quantity} - S/ ${(product.price * quantity).toFixed(2)}`;
            saleItemsList.appendChild(li);
        });
        saleTotal.textContent = `S/ ${currentSale.total.toFixed(2)}`;
    }

    function renderSalesList() {
        salesList.innerHTML = "";
        sales.forEach(sale => salesList.appendChild(sale.renderUI()));
    }

    function resetSaleForm() {
        currentSale = null;
        customerSelect.value = "";
        saleItemsList.innerHTML = "";
        saleTotal.textContent = "S/ 0.00";
    }
});

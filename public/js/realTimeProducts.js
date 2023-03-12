const socket = io();

socket.on('products', (products) => {
    let container = document.getElementById('products-container');
    let containerHTML = '';
    products.forEach((product) => {
        containerHTML += `
            <div class="accordion m-2" id="accordionPanelsStayOpen${product._id}">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-h${product._id}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-${product._id}" aria-expanded="true"
                            aria-controls="panelsStayOpen-${product._id}">
                            <strong>ID: ${product._id} | ${product.title}</strong> 
                        </button>
                    </h2>
                    <div id="panelsStayOpen-${product._id}" class="accordion-collapse collapse"
                        aria-labelledby="panelsStayOpen-h${product._id}">
                        <div class="accordion-body">
                            <strong>ID: <a href="/products/${product._id}">${product._id}</a></strong><br>
                            <strong>Title: ${product.title}</strong><br>
                            Description: ${product.description}<br>
                            Price: <code>$${product.price}</code><br>
                            Stock: <code>${product.stock}</code><br>
                            Category: ${product.category}<br>
                        </div>
                    </div>
                </div>
            </div>`;
    });
    container.innerHTML = containerHTML;
});

socket.on('newProduct', (product) => {
    let container = document.getElementById('products-container');
    let newProduct = `
        <div class="accordion m-2" id="accordionPanelsStayOpen${product._id}">
            <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-h${product._id}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-${product._id}" aria-expanded="true"
                        aria-controls="panelsStayOpen-${product._id}">
                        <strong>ID: ${product._id} | ${product.title}</strong> 
                    </button>
                </h2>
                <div id="panelsStayOpen-${product._id}" class="accordion-collapse collapse"
                    aria-labelledby="panelsStayOpen-h${product._id}">
                    <div class="accordion-body">
                        <strong>ID: <a href="/products/${product._id}">${product._id}</a></strong><br>
                        <strong>Title: ${product.title}</strong><br>
                        Description: ${product.description}<br>
                        Price: <code>$${product.price}</code><br>
                        Stock: <code>${product.stock}</code><br>
                        Category: ${product.category}<br>
                    </div>
                </div>
            </div>
        </div>`;
    container.innerHTML += newProduct;
});

socket.on('updateProduct', (product) => {
    let container = document.getElementById(`accordionPanelsStayOpen${product._id}`);
    let updatedProduct = `
        <div class="accordion-item">
            <h2 class="accordion-header" id="panelsStayOpen-h${product._id}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-${product._id}" aria-expanded="true"
                    aria-controls="panelsStayOpen-${product._id}">
                    <strong>ID: ${product._id} | ${product.title}</strong> 
                </button>
            </h2>
            <div id="panelsStayOpen-${product._id}" class="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-h${product._id}">
                <div class="accordion-body">
                    <strong>ID: <a href="/products/${product._id}">${product._id}</a></strong><br>
                    <strong>Title: ${product.title}</strong><br>
                    Description: ${product.description}<br>
                    Price: <code>$${product.price}</code><br>
                    Stock: <code>${product.stock}</code><br>
                    Category: ${product.category}<br>
                </div>
            </div>
        </div>`;
    container.innerHTML = updatedProduct;
});

socket.on('deleteProduct', (pid) => {
    let container = document.getElementById('products-container');
    container.removeChild(document.getElementById(`accordionPanelsStayOpen${pid}`));
});
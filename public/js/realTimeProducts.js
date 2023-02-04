const socket = io();

socket.on('products', (products) => {
    let container = document.getElementById('products-container');
    let containerHTML = '';
    products.forEach((product) => {
        containerHTML += `
            <div class="accordion m-2" id="accordionPanelsStayOpen${product.id}">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-h${product.id}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-${product.id}" aria-expanded="true"
                            aria-controls="panelsStayOpen-${product.id}">
                            <strong>ID: ${product.id} | ${product.title}</strong> 
                        </button>
                    </h2>
                    <div id="panelsStayOpen-${product.id}" class="accordion-collapse collapse"
                        aria-labelledby="panelsStayOpen-h${product.id}">
                        <div class="accordion-body">
                            <strong>Title: ${product.title}</strong><br>
                            Description: ${product.description}<br>
                            Price: <code>$${product.price}</code><br>
                            Code: <code>${product.code}</code><br>
                            Status: ${product.status}<br>
                            Stock: <code>${product.stock}</code><br>
                            Category: ${product.category}<br>
                            Thumbnails: ${product.thumbnails}<br>
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
        <div class="accordion m-2" id="accordionPanelsStayOpen${product.id}">
            <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-h${product.id}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-${product.id}" aria-expanded="true"
                        aria-controls="panelsStayOpen-${product.id}">
                        <strong>ID: ${product.id} | ${product.title}</strong> 
                    </button>
                </h2>
                <div id="panelsStayOpen-${product.id}" class="accordion-collapse collapse"
                    aria-labelledby="panelsStayOpen-h${product.id}">
                    <div class="accordion-body">
                        <strong>Title: ${product.title}</strong><br>
                        Description: ${product.description}<br>
                        Price: <code>$${product.price}</code><br>
                        Code: <code>${product.code}</code><br>
                        Status: ${product.status}<br>
                        Stock: <code>${product.stock}</code><br>
                        Category: ${product.category}<br>
                        Thumbnails: ${product.thumbnails}<br>
                    </div>
                </div>
            </div>
        </div>`;
    container.innerHTML += newProduct;
});

socket.on('updateProduct', (product) => {
    let container = document.getElementById(`accordionPanelsStayOpen${product.id}`);
    let updatedProduct = `
        <div class="accordion-item">
            <h2 class="accordion-header" id="panelsStayOpen-h${product.id}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-${product.id}" aria-expanded="true"
                    aria-controls="panelsStayOpen-${product.id}">
                    <strong>ID: ${product.id} | ${product.title}</strong> 
                </button>
            </h2>
            <div id="panelsStayOpen-${product.id}" class="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-h${product.id}">
                <div class="accordion-body">
                    <strong>Title: ${product.title}</strong><br>
                    Description: ${product.description}<br>
                    Price: <code>$${product.price}</code><br>
                    Code: <code>${product.code}</code><br>
                    Status: ${product.status}<br>
                    Stock: <code>${product.stock}</code><br>
                    Category: ${product.category}<br>
                    Thumbnails: ${product.thumbnails}<br>
                </div>
            </div>
        </div>`;
    container.innerHTML = updatedProduct;
});

socket.on('deleteProduct', (pid) => {
    let container = document.getElementById('products-container');
    container.removeChild(document.getElementById(`accordionPanelsStayOpen${pid}`));
});
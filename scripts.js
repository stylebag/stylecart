const itemsPerPage = 9;
let currentPage = 1;
let products = [];

async function loadJSON() {
    const response = await fetch("products.json"); // Ensure path is correct
    products = await response.json();
    renderPage(currentPage);
    renderPagination();
}

function renderCard(product) {
    return `
    <div class="col mb-5">
        <div class="card h-100">
            <a href="" target="_blank">
                <img class="card-img-top" src="${product["img-fluid src"]}" alt="${product["product-details"]}" />
            </a>
            <div class="card-body p-4">
                <div class="text-center">
                    <h5 class="fw-bolder">${product["product-details"]}</h5>
                    <span class="text-muted text-decoration-line-through">₹${product["l-through"]}</span>
                    ₹${product["price"]}
                </div>
            </div>
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center">
                    <a class="btn btn-outline-dark mt-auto" href="${product["product-img-block href"]}" target="_blank">${product["btn"]}</a>
                </div>
            </div>
        </div>
    </div>`;
}

function renderPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = products.slice(start, end);
    const container = document.getElementById("productContainer");
    container.innerHTML = pageItems.map(renderCard).join("");
}

function renderPagination() {
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const pagination = document.getElementById("pagination");

    let html = `
    <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center">
            <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
                <a class="page-link" href="#" aria-label="Previous" onclick="goToPage(${currentPage - 1})">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>`;

    // Current Page
    html += `
            <li class="page-item active">
                <a class="page-link" href="#">${currentPage}</a>
            </li>`;

    // Next Page
    if (currentPage + 1 <= totalPages) {
        html += `
            <li class="page-item">
                <a class="page-link" href="#" onclick="goToPage(${currentPage + 1})">${currentPage + 1}</a>
            </li>`;
    }

    // Next Next Page
    if (currentPage + 2 <= totalPages) {
        html += `
            <li class="page-item">
                <a class="page-link" href="#" onclick="goToPage(${currentPage + 2})">${currentPage + 2}</a>
            </li>`;
    }

    // Next Button
    html += `
            <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
                <a class="page-link" href="#" aria-label="Next" onclick="goToPage(${currentPage + 1})">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>`;

    pagination.innerHTML = html;
}

function goToPage(page) {
    const totalPages = Math.ceil(products.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderPage(currentPage);
    renderPagination();
}


document.getElementById('subscribeForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const form = e.target;
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if (response.ok) {
      document.getElementById('subscribeMsg').style.display = 'block';
      form.reset();
    }
  });
});

window.onload = loadJSON;

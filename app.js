const API = 'https://padaria-backend-6zqw.onrender.com/api/products';

const form = document.getElementById('form');
const list = document.getElementById('list');

const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const descriptionInput = document.getElementById('description');

// carregar produtos
async function loadProducts() {
  try {
    const res = await fetch(API);

    if (!res.ok) throw new Error("Erro na API");

    const products = await res.json();

    list.innerHTML = '';

    products.forEach(p => {
      const li = document.createElement('li');

      li.innerHTML = `
        ${p.name || 'Sem nome'} - R$ ${p.price}
        <button onclick="deleteProduct('${p._id}')">Excluir</button>
      `;

      list.appendChild(li);
    });

  } catch (err) {
    console.log("Erro ao carregar:", err);
    list.innerHTML = "<li>⚠️ Erro ao carregar produtos</li>";
  }
}

// adicionar produto
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const product = {
      name: nameInput.value,
      price: Number(priceInput.value),
      description: descriptionInput.value
    };

    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });

    form.reset();
    loadProducts();

  } catch (err) {
    console.log("Erro ao adicionar:", err);
  }
});

// deletar produto
async function deleteProduct(id) {
  try {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    loadProducts();
  } catch (err) {
    console.log("Erro ao deletar:", err);
  }
}

loadProducts();

// PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
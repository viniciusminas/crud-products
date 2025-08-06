const API_URL = "http://localhost:8080/produtos";

document.addEventListener("DOMContentLoaded", () => {
    carregarProdutos();

    const form = document.getElementById("produto-form");
    const cancelBtn = document.getElementById("cancel-btn");
    const saveBtn = document.getElementById("save-btn");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!validarFormulario()) return;

        const id = document.getElementById("id").value;
        const name = document.getElementById("name").value;
        const description = document.getElementById("description").value;
        const price = parseFloat(document.getElementById("price").value);

        const produto = { name, description, price };

        try {
            if (id) {
                await fetch(`${API_URL}/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(produto)
                });
                showToast("Produto atualizado com sucesso!");
            } else {
                await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(produto)
                });
                showToast("Produto cadastrado com sucesso!");
            }

            resetForm();
            carregarProdutos();
        } catch (error) {
            console.error("Erro ao salvar produto:", error);
            showToast("Erro ao salvar produto", "error");
        }
    });

    cancelBtn.addEventListener("click", resetForm);

    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", () => {
        carregarProdutos(searchInput.value);
    });
});

function validarFormulario() {
    let isValid = true;
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;

    if (name.trim() === "") {
        document.getElementById("name-error").textContent = "Por favor, informe o nome do produto";
        document.getElementById("name-error").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("name-error").style.display = "none";
    }

    if (description.trim() === "") {
        document.getElementById("description-error").textContent = "Por favor, informe a descrição do produto";
        document.getElementById("description-error").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("description-error").style.display = "none";
    }

    if (price === "" || parseFloat(price) <= 0) {
        document.getElementById("price-error").textContent = "Por favor, informe um preço válido";
        document.getElementById("price-error").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("price-error").style.display = "none";
    }

    return isValid;
}

async function carregarProdutos(searchTerm = "") {
    try {
        const resposta = await fetch(API_URL);
        const produtos = await resposta.json();

        const produtosFiltrados = produtos.filter(produto =>
            produto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            produto.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const tbody = document.getElementById("produtos-tbody");

        if (produtosFiltrados.length === 0) {
            tbody.innerHTML = `
                <tr class="empty-state">
                    <td colspan="4">
                        <i class="fas fa-box-open"></i>
                        <p>Nenhum produto encontrado</p>
                    </td>
                </tr>
            `;
        } else {
            tbody.innerHTML = "";
            produtosFiltrados.forEach(produto => {
                const linha = document.createElement("tr");
                linha.innerHTML = `
                    <td>${produto.name}</td>
                    <td>${produto.description}</td>
                    <td>R$ ${produto.price.toFixed(2).replace(".", ",")}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="edit-button button-icon" onclick="editarProduto('${produto.id}', '${escapeString(produto.name)}', '${escapeString(produto.description)}', ${produto.price})">
                                <i class="fas fa-edit"></i> Editar
                            </button>
                            <button class="delete-button button-icon" onclick="deletarProduto('${produto.id}')">
                                <i class="fas fa-trash-alt"></i> Excluir
                            </button>
                        </div>
                    </td>
                `;
                tbody.appendChild(linha);
            });
        }

        document.getElementById("total-products").textContent =
            `${produtosFiltrados.length} ${produtosFiltrados.length === 1 ? 'produto' : 'produtos'} encontrado(s)`;
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        showToast("Erro ao carregar produtos", "error");
    }
}

function escapeString(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, '\\"');
}

function editarProduto(id, name, description, price) {
    document.getElementById("id").value = id;
    document.getElementById("name").value = name;
    document.getElementById("description").value = description;
    document.getElementById("price").value = price;

    document.getElementById("save-btn").innerHTML = '<i class="fas fa-save"></i> Atualizar Produto';
    document.getElementById("cancel-btn").style.display = "inline-flex";

    document.querySelector(".product-form-section").scrollIntoView({ behavior: 'smooth' });

    showToast("Produto carregado para edição");
}

async function deletarProduto(id) {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });
            showToast("Produto excluído com sucesso!");
            carregarProdutos();
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            showToast("Erro ao excluir produto", "error");
        }
    }
}

function resetForm() {
    document.getElementById("produto-form").reset();
    document.getElementById("id").value = "";
    document.getElementById("save-btn").innerHTML = '<i class="fas fa-save"></i> Salvar Produto';
    document.getElementById("cancel-btn").style.display = "none";

    document.querySelectorAll(".error-message").forEach(el => {
        el.style.display = "none";
    });
}

function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 10);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

const toastStyles = document.createElement("style");
toastStyles.textContent = `
.toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #333;
    color: white;
    padding: 15px 20px;
    border-radius: var(--border-radius);
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 1000;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
}

.toast.show {
    opacity: 1;
    transform: translateY(0);
}

.toast.success {
    background-color: var(--success-color);
}

.toast.error {
    background-color: var(--danger-color);
}

.toast i {
    font-size: 1.2rem;
}
`;
document.head.appendChild(toastStyles);
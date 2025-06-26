const apiURL = "http://localhost:1337/api/entries?populate=*";


//menuuuuu
document.addEventListener('DOMContentLoaded', () => {
  const openMenu = document.getElementById('openMenu');
  const closeMenu = document.getElementById('closeMenu');
  const sideMenu = document.getElementById('sideMenu');
  const overlay = document.querySelector('.menu-overlay');

  if (openMenu && closeMenu && sideMenu && overlay) {
    openMenu.addEventListener('click', function(event) {
      event.preventDefault();
      sideMenu.classList.add('open');
      overlay.classList.add('active');
    });

    closeMenu.addEventListener('click', function() {
      sideMenu.classList.remove('open');
      overlay.classList.remove('active');
    });

    overlay.addEventListener('click', function() {
      sideMenu.classList.remove('open');
      overlay.classList.remove('active');
    });
  } else {
    console.warn('Elementos do menu não encontrados no DOM.');
  }
});




// Funções do modal para mostrar imagem em grande
function openModal(src) {
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");
  if (modal && modalImg) {
    modal.style.display = "flex";
    modalImg.src = src;
  }
}

function closeModal() {
  const modal = document.getElementById("imgModal");
  if (modal) {
    modal.style.display = "none";
  }
}

// Função para carregar imagens do backend (Strapi)
async function loadImages() {
  try {
    const res = await fetch(apiURL);
    const data = await res.json();

    console.log("Dados recebidos da API:", data);

    const container = document.getElementById("imageGrid");
    if (!container) {
      console.warn("Elemento #imageGrid não encontrado.");
      return;
    }

    container.innerHTML = ""; // limpa conteúdo anterior

    // Percorre os dados receb  idos da API
  data.data.forEach(item => {
  const attr = item.attributes;

  const imageUrl = attr.image?.data?.attributes?.url;
  const authorName = attr.authorName || "Desconhecido";
  const authorLink = attr.authorLink || "#";

  if (!imageUrl) {
    console.warn("Imagem em falta para item:", item);
    return;
  }

  const div = document.createElement("div");
  div.className = "img-container";

  div.innerHTML = `
    <img src="http://localhost:1337${imageUrl}" alt="${authorName}" onclick="openModal(this.src)" style="cursor: pointer;">
    <a href="${authorLink}" target="_blank" class="overlay-link">
      <div class="overlay">
        <span class="author">${authorName} ↗</span>
      </div>
    </a>
  `;

  container.appendChild(div);
});

  } catch (err) {
    console.error("Erro ao carregar dados da API:", err);
  }
}

// Chama a função para carregar imagens ao iniciar o script
loadImages();

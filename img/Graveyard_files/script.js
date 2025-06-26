const openBtn = document.querySelector('.menu-toggle');
const closeBtn = document.getElementById('closeMenu');
const menu = document.getElementById('sideMenu');
const overlay = document.getElementById('menuOverlay');

openBtn.addEventListener('click', (e) => {
  e.preventDefault();
  menu.classList.add('open');
  overlay.classList.add('active');
});

function closeMenu() {
  menu.classList.remove('open');
  overlay.classList.remove('active');
}

closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

// Modal
function openModal(src) {
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");
  modal.style.display = "flex";
  modalImg.src = src;
}

function closeModal() {
  const modal = document.getElementById("imgModal");
  modal.style.display = "none";
}

// API fetch
const apiURL = "http://localhost:1337/api/entry?populate=*";

async function loadImages() {
  try {
    const res = await fetch(apiURL);
    const data = await res.json();

    const grid = document.getElementById('imageGrid');
    grid.innerHTML = ''; // limpa conteúdo

    data.data.forEach(item => {
      const attr = item.attributes;
      const imageUrl = attr.image?.data?.attributes?.url || '';
      const authorName = attr.authorName || 'Desconhecido';
      const authorLink = attr.authorLink || '#';

      const container = document.createElement('div');
      container.classList.add('img-container');

      container.innerHTML = `
        <img src="http://localhost:1337${imageUrl}" alt="${authorName}" onclick="openModal(this.src)">
        <a href="${authorLink}" target="_blank" class="overlay-link">
          <span class="author">${authorName} ↗</span>
        </a>
      `;

      grid.appendChild(container);
    });

  } catch (error) {
    console.error('Erro ao carregar dados da API:', error);
  }
}

loadImages();

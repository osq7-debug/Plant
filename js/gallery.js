// Tallennetaan kaikki kasvit muistiin suodatusta varten
let allPlants = [];

fetch('/plants')
  .then(response => response.json())
  .then(plants => {
    allPlants = plants;
    showPlants(plants);
  })
  .catch(error => {
    console.error('Virhe JSON-tiedoston latauksessa:', error);
  });

// GALLERY
function showPlants(plants) {
  const kasviMaara = document.getElementById('kasvi-maara');

  if (plants.length === 0) {
    kasviMaara.textContent = 'No plants found with these filters';
    document.getElementById('gallery-grid').innerHTML = '';
    return;
  }

  kasviMaara.style.color = '';
  kasviMaara.textContent = `Showing ${plants.length} plants`;

  const grid = document.getElementById('gallery-grid');
  grid.innerHTML = '';

  plants.forEach(plant => {
    const card = document.createElement('div');
    card.classList.add('plant-card');

    //  toimii sekä vanhalla että uudella datalla
    const img = plant.image || plant.topImages?.plant;

    card.innerHTML = `
      <img src="${img}">
      <div class="plant-info">
        <h3>${plant.name}</h3>
        <p><em>${plant.latin}</em></p>
        <p>Color: ${plant.color}</p>
        <p>Material: ${plant.material}</p>
      </div>
    `;

    card.onclick = () => openModal(plant);

    grid.appendChild(card);
  });
}

// MODAL
function openModal(plant) {
  const existing = document.getElementById('plant-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'plant-modal';

  //  fallback jos uusi data puuttuu
  const sections = plant.sections || [
    { title: "Description", text: plant.description || "" },
    { title: "Material", text: plant.material || "" },
    { title: "Extra", text: plant.extra || "" }
  ];

  const topImages = plant.topImages || {
    plant: plant.image,
    use: plant.image,
    material: plant.image
  };

  const bottomImages = plant.bottomImages || [];

  modal.innerHTML = `
    <div class="modal-overlay"></div>

    <div class="modal-content">

      <div class="modal-header" style="background:${plant.heroColor || '#c8d8a0'}">
    <button class="modal-close" aria-label="Close">&times;</button>
    <h1>${plant.name}</h1>
    <p class="modal-latin">${plant.latin}</p>
</div>

      <div class="modal-top">
        <div>
          <img src="${topImages.plant}">
          <h3>${sections[0]?.title}</h3>
          <p>${sections[0]?.text}</p>
        </div>

        <div>
          <img src="${topImages.use}">
          <h3>${sections[1]?.title}</h3>
          <p>${sections[1]?.text}</p>
        </div>

        <div>
          <img src="${topImages.material}">
          <h3>${sections[2]?.title}</h3>
          <p>${sections[2]?.text}</p>
        </div>
      </div>

      <div class="modal-bottom">
        ${bottomImages.map(img => `
          <div>
            <img src="${img.src}">
            <p>${img.title}</p>
          </div>
        `).join('')}
      </div>

    </div>
  `;

  document.body.appendChild(modal);
  modal.querySelector('.modal-close').addEventListener('click', closeModal);

  modal.querySelector('.modal-overlay').onclick = () => modal.remove();
}
function closeModal() {
    const modal = document.getElementById('plant-modal');
    if (!modal) return;

    modal.remove();
    document.body.style.overflow = '';
}
// FILTERS 
function filterByColor() {
    const valittuVari = document.getElementById('color-filter').value;
    const valittuMateriaali = document.getElementById('material-filter').value;

    let filteroitu = allPlants;

    if (valittuVari !== 'all') {
        filteroitu = filteroitu.filter(plant =>
            plant.color.toLowerCase().includes(valittuVari)
        );
    }

    if (valittuMateriaali !== 'all') {
        filteroitu = filteroitu.filter(plant =>
            plant.material.toLowerCase().includes(valittuMateriaali)
        );
    }

    showPlants(filteroitu);
}

function filterByMaterial() {
    filterByColor();
}

function resetFilters() {
    document.getElementById('color-filter').value = 'all';
    document.getElementById('material-filter').value = 'all';
    showPlants(allPlants);
}
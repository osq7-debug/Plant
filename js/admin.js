// Kun sivu latautuu, haetaan heti kasvit listaan
loadPlants();

let searchValue = "";

document.getElementById("plantSearch").addEventListener("input", (e) => {
    searchValue = e.target.value.toLowerCase();
    loadPlants();
});
// Tämä funktio hakee kaikki kasvit palvelimelta ja näyttää ne sivulla
function loadPlants() {
    // Lähetetään pyyntö palvelimelle osoitteeseen /plants
    fetch('/plants')
        .then(res => res.json()) // Muutetaan vastaus JavaScript-objektiksi
        .then(plants => {
            // Haetaan se div johon lista tulee
            const list = document.getElementById('plant-list');
            
            // Tyhjennetään lista ensin jotta ei tule duplikaatteja
            list.innerHTML = '';

            // Käydään jokainen kasvi läpi yksi kerrallaan
            plants.forEach(plant => {
                if (!plant.name.toLowerCase().includes(searchValue)) return;
                // Luodaan uusi div jokaiselle kasville
                const item = document.createElement('div');
                item.classList.add('plant-item');

                // Lisätään kasvin nimi ja poisto-nappi
                // plant.id menee napin onclick funktioon jotta tiedetään mikä kasvi poistetaan
                item.innerHTML = `
                    <span>${plant.name}</span>
                    <button onclick="deletePlant(${plant.id}, '${plant.name}')">Delete</button>
                `;

                // Lisätään kortti listaan
                list.appendChild(item);
            });
        });
}

// Tämä funktio lisää uuden kasvin kun admin painaa "Add Plant" nappia
function addPlant() {
    const formData = new FormData();

    // VANHAT (pidetään)
    formData.append('name', document.getElementById('name').value);
    formData.append('latin', document.getElementById('latin').value);
    formData.append('color', document.getElementById('color').value);
    formData.append('material', document.getElementById('material').value);
    //formData.append('description', document.getElementById('description').value);
    //formData.append('extra', document.getElementById('extra').value);

    formData.append('image', document.getElementById('image').files[0]);

    //  UUDET (modalia varten)
    formData.append('heroColor', document.getElementById('heroColor')?.value || '');

    formData.append('s1title', document.getElementById('s1title')?.value || '');
    formData.append('s1text', document.getElementById('s1text')?.value || '');

    formData.append('s2title', document.getElementById('s2title')?.value || '');
    formData.append('s2text', document.getElementById('s2text')?.value || '');

    formData.append('s3title', document.getElementById('s3title')?.value || '');
    formData.append('s3text', document.getElementById('s3text')?.value || '');

    // top images
    const plantImg = document.getElementById('plantImage')?.files[0];
    const useImg = document.getElementById('useImage')?.files[0];
    const materialImg = document.getElementById('materialImage')?.files[0];

    if (plantImg) formData.append('plantImage', plantImg);
    if (useImg) formData.append('useImage', useImg);
    if (materialImg) formData.append('materialImage', materialImg);

    // bottom images
    const img1 = document.getElementById('img1')?.files[0];
    const img2 = document.getElementById('img2')?.files[0];
    const img3 = document.getElementById('img3')?.files[0];
    const img4 = document.getElementById('img4')?.files[0];

    if (img1) formData.append('img1', img1);
    if (img2) formData.append('img2', img2);
    if (img3) formData.append('img3', img3);
    if (img4) formData.append('img4', img4);

    formData.append('img1title', document.getElementById('img1title')?.value || '');
    formData.append('img2title', document.getElementById('img2title')?.value || '');
    formData.append('img3title', document.getElementById('img3title')?.value || '');
    formData.append('img4title', document.getElementById('img4title')?.value || '');

    // Lähetys
    fetch('/plants', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(() => {
        const msg = document.getElementById('add-message');
        msg.textContent = 'Plant added successfully!';
        msg.style.color = 'green';

        // reset (vain vanhat varmasti)
        document.getElementById('name').value = '';
        document.getElementById('latin').value = '';
        document.getElementById('color').value = '';
        document.getElementById('material').value = '';
        //document.getElementById('description').value = '';
        //document.getElementById('extra').value = '';
        document.getElementById('image').value = '';

        loadPlants();
    });
}

// Tämä funktio poistaa kasvin sen id:n perusteella
// id tulee parametrina kun nappia painetaan, esim. deletePlant(3) poistaa kasvin jonka id on 3
function deletePlant(id, name) {
    // Lähetetään DELETE-pyyntö palvelimelle, id laitetaan URL:iin
    const vahvistaPoisto = confirm(`Are you sure you want to delete ${name}? This cant be undone.`);
    
        if(!vahvistaPoisto) return;

    fetch('/plants/' + id, { method: 'DELETE' })
    .then(res => res.json())
    .then(() => {
        // Näytetään poistamisviesti
        const msg = document.getElementById('delete-message');
        msg.textContent = 'Plant deleted!';
        msg.style.color = 'red';

        // Päivitetään lista jotta poistettu kasvi katoaa heti
        loadPlants();
    });
}


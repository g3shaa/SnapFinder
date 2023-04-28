const apiKey = 'YOUR-API-PEXELS-KEY';

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const container = document.getElementById('photos-container');

// добавяме event listeners за категории
const categories = document.querySelectorAll('.category');
categories.forEach(category => {
    category.addEventListener('click', (e) => {
        e.preventDefault();
        const query = category.dataset.category;
        searchPhotos(query);
    });
});

// добавяме event listener за търсене
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const query = input.value;

    searchPhotos(query);
});

// функция за търсене на снимки
function searchPhotos(query) {
    fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=24`, {
            headers: {
                Authorization: apiKey
            }
        })
        .then(response => response.json())
        .then(data => {
            const photos = data.photos;
            if (photos.length > 0) {
                const resultsHTML = photos.map(photo => `
          <div class="photo">
          <img src="${photo.src.medium}" alt="${photo.photographer}">
          </div>
        `).join('');
                container.innerHTML = resultsHTML;

                // добавяме event listener за кликване върху снимките
                const images = document.querySelectorAll('#photos-container img');
                images.forEach(img => {
                    img.addEventListener('click', () => {
                        const overlay = document.createElement('div');
                        overlay.classList.add('overlay');
                        const imgOverlay = document.createElement('img');
                        imgOverlay.src = img.src;
                        overlay.appendChild(imgOverlay);
                        container.appendChild(overlay);
                        // добавяме event listener за затваряне на оверлея
                        overlay.addEventListener('click', () => {
                            overlay.remove();
                        });
                    });
                });
            } else {
                container.innerHTML = '<p>No results found</p>';
            }
        })
        .catch(error => console.log(error));
}
const apiKey = 'YOUR-PEXELS-API';

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const container = document.getElementById('photos-container');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const query = input.value;

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
                        const imgElement = document.createElement('img');
                        const imgUrl = img.getAttribute('src').replace('/medium/', '/large/');
                        imgElement.setAttribute('src', imgUrl);
                        overlay.appendChild(imgElement);
                        document.body.appendChild(overlay);
                        overlay.addEventListener('click', () => {
                            overlay.remove();
                        });
                    });
                });
            } else {
                alert('No results found. Please try again with a different keyword.');
            }
        })
        .catch(error => console.error(error));
});

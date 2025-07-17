// Display saved trends on page load
document.addEventListener('DOMContentLoaded', displayFavorites);

// Save button logic
function saveTrend(button) {
    const trend = button.closest('.trend');
    const name = trend.querySelector('h3').innerText;
    const desc = trend.querySelector('p').innerText;
    const image = trend.querySelector('img').src;

    let saved = JSON.parse(localStorage.getItem('favorites')) || [];
    if (saved.some(t => t.name === name)) {
        alert("Already saved.");
        return;
    }

    saved.push({ name, description: desc, image });
    localStorage.setItem('favorites', JSON.stringify(saved));
    displayFavorites();
}

// Display saved items
function displayFavorites() {
    const container = document.getElementById('favorite-list');
    container.innerHTML = '';

    let saved = JSON.parse(localStorage.getItem('favorites')) || [];

    saved.forEach((trend, index) => {
        const div = document.createElement('div');
        div.classList.add('favorite-item');
        div.innerHTML = `
            <img src="${trend.image}" alt="${trend.name}">
            <div>
                <h4>${trend.name}</h4>
                <p>${trend.description}</p>
            </div>
            <button onclick="removeFavorite(${index})">Delete</button>
        `;
        container.appendChild(div);
    });
}

// Remove favorite
function removeFavorite(index) {
    let saved = JSON.parse(localStorage.getItem('favorites')) || [];
    saved.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(saved));
    displayFavorites();
}

// Share logic
function shareTrend(name) {
    const trends = document.querySelectorAll('.trend');
    let selected;

    trends.forEach(trend => {
        if (trend.querySelector('h3').innerText === name) {
            selected = trend;
        }
    });

    if (!selected) return;

    const text = selected.querySelector('p').innerText;
    const url = window.location.href;

    const shareData = {
        title: name,
        text,
        url
    };

    if (navigator.share) {
        navigator.share(shareData)
            .then(() => console.log("Shared"))
            .catch(err => console.error("Error sharing:", err));
    } else {
        alert(`Share this trend:\n${name}\n${text}\n${url}`);
    }
}

// Modal popup
function openModal(imgElement) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modalImg.src = imgElement.src;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}

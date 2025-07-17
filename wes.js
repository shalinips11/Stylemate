function openFullscreen(imgElement) {
    const modal = document.getElementById('fullscreenModal');
    const modalImg = document.getElementById('fullscreenImage');
    modalImg.src = imgElement.src;
    modal.style.display = 'flex';
}

function closeFullscreen() {
    document.getElementById('fullscreenModal').style.display = 'none';
}

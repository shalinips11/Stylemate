// Function to Apply Theme
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        document.querySelector('.settings-container').classList.add('dark-mode');
        document.querySelectorAll('select').forEach(select => select.classList.add('dark-mode'));
        document.querySelector('button').classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
        document.querySelector('.settings-container').classList.remove('dark-mode');
        document.querySelectorAll('select').forEach(select => select.classList.remove('dark-mode'));
        document.querySelector('button').classList.remove('dark-mode');
    }
}

// Function to Apply Font Size
function applyFontSize(size) {
    document.body.style.fontSize = size === 'small' ? '14px' : size === 'large' ? '18px' : '16px';
}

// Function to Apply Language (Placeholder Example)
function applyLanguage(language) {
    const translations = {
        en: { title: "Display and Appearance", save: "Save Changes" },
        es: { title: "Pantalla y Apariencia", save: "Guardar Cambios" },
        fr: { title: "Affichage et Apparence", save: "Enregistrer les Changements" },
        de: { title: "Anzeige und Erscheinung", save: "Änderungen Speichern" }
    };
    const selected = translations[language] || translations.en;
    document.querySelector('h1').innerText = selected.title;
    document.getElementById('saveSettings').innerText = selected.save;
}

// Save Settings Handler
document.getElementById('saveSettings').addEventListener('click', function () {
    // Get Selected Theme
    const selectedTheme = document.getElementById('darkTheme').checked ? 'dark' : 'light';
    localStorage.setItem('theme', selectedTheme);

    // Get Selected Font Size
    const fontSize = document.getElementById('fontSizeSelector').value;
    localStorage.setItem('fontSize', fontSize);

    // Get Selected Language
    const language = document.getElementById('languageSelector').value;
    localStorage.setItem('language', language);

    // Apply Settings Immediately
    applyTheme(selectedTheme);
    applyFontSize(fontSize);
    applyLanguage(language);

    alert("Settings Saved!");
});

// Apply Saved Settings on Page Load
window.addEventListener('load', function () {
    // Apply Saved Theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.getElementById(savedTheme === 'dark' ? 'darkTheme' : 'lightTheme').checked = true;
    applyTheme(savedTheme);

    // Apply Saved Font Size
    const savedFontSize = localStorage.getItem('fontSize') || 'medium';
    document.getElementById('fontSizeSelector').value = savedFontSize;
    applyFontSize(savedFontSize);

    // Apply Saved Language
    const savedLanguage = localStorage.getItem('language') || 'en';
    document.getElementById('languageSelector').value = savedLanguage;
    applyLanguage(savedLanguage);
});

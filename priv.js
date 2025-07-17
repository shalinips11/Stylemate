// Save Privacy Settings Button Handler
document.getElementById('savePrivacySettings').addEventListener('click', function() {
    // Get Profile Visibility Setting
    const publicProfile = document.getElementById('publicProfile').checked;
    const privateProfile = document.getElementById('privateProfile').checked;
    let profileVisibility = publicProfile ? 'Public' : privateProfile ? 'Private' : 'Not Set';

    // Get Data Sharing Setting
    const dataSharing = document.getElementById('dataSharing').checked;

    // Get Ad Personalization Setting
    const adPersonalization = document.getElementById('adPersonalization').checked;

    // Display Settings (You can replace this with a server API call)
    alert(`Privacy Settings Updated:
    - Profile Visibility: ${profileVisibility}
    - Data Sharing: ${dataSharing ? 'Enabled' : 'Disabled'}
    - Ad Personalization: ${adPersonalization ? 'Enabled' : 'Disabled'}`);
    
    // Example of how to send this data to a server
    /*
    fetch('/save-privacy-settings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            profileVisibility,
            dataSharing,
            adPersonalization,
        }),
    }).then(response => {
        if (response.ok) {
            alert('Settings saved successfully!');
        } else {
            alert('Failed to save settings. Please try again.');
        }
    });
    */
});

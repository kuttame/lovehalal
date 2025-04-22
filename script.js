document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-music');
    const playButton = document.getElementById('playButton');

    // Function to attempt playing audio
    const attemptPlay = () => {
        audio.play().then(() => {
            // Autoplay started successfully (or play started via button)
            console.log("Audio playback started.");
            playButton.style.display = 'none'; // Hide button if playing
        }).catch(error => {
            // Autoplay was prevented or another error occurred.
            console.log("Audio playback prevented/failed:", error);
            // Show the button only if it's an autoplay issue that requires user interaction.
            // Some errors might be unrelated (e.g., file not found).
            // A common reason is the browser restricting autoplay.
            playButton.style.display = 'block'; // Show button to allow user interaction
        });
    };

    // --- Autoplay Attempt ---
    // Browsers often require user interaction first. We try anyway.
    attemptPlay();

    // --- Button Interaction ---
    // If autoplay failed, this button allows the user to start the music.
    playButton.addEventListener('click', () => {
        attemptPlay(); // Try playing again when the button is clicked
    });

    // --- Optional: Pause/Play on Visibility Change ---
    // Pause music if the tab becomes hidden, resume when visible again.
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Only pause if audio was successfully playing
            if (!audio.paused) {
                audio.pause();
                console.log("Audio paused due to tab becoming hidden.");
            }
        } else {
            // Only play if audio is currently paused AND was playing before
            // (or attempt to play if it failed initially and tab becomes visible)
            // Check if audio is ready to play to avoid errors
           if (audio.paused && audio.readyState >= 2) { // readyState 2 (HAVE_CURRENT_DATA) or higher is usually enough
               // We might still need user interaction if it wasn't granted before.
               // Re-attempting play might show the button again if needed.
               attemptPlay();
               console.log("Audio resumed/attempted on tab becoming visible.");
           }
        }
    });

});
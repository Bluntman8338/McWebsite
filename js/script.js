/**
 * Light/Dark Mode Toggle
 */

// Initialize canvas and context for light/dark mode toggle
const canvas = document.getElementById("toggleCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 50;
canvas.height = 50;

// Draw light mode icon (sun)
function drawSun() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FFA500";
    ctx.beginPath();
    ctx.arc(25, 25, 10, 0, 2 * Math.PI);
    ctx.fill();
}

// Draw dark mode icon (moon)
function drawMoon() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(25, 25, 10, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "#121212";
    ctx.beginPath();
    ctx.arc(20, 20, 8, 0, 2 * Math.PI);
    ctx.fill();
}

// Apply saved theme preference on page load
function applySavedPreference() {
    const savedMode = localStorage.getItem("theme");
    const body = document.body;
    const label = document.getElementById("toggleLabel");

    if (savedMode === "dark-mode") {
        body.classList.replace("light-mode", "dark-mode");
        label.textContent = "Dark Mode";
        drawMoon();
    } else {
        body.classList.replace("dark-mode", "light-mode");
        label.textContent = "Light Mode";
        drawSun();
    }
}

// Toggle between light and dark modes
document.getElementById("toggle-container").addEventListener("click", () => {
    const body = document.body;
    const label = document.getElementById("toggleLabel");

    if (body.classList.contains("light-mode")) {
        body.classList.replace("light-mode", "dark-mode");
        label.textContent = "Dark Mode";
        drawMoon();
        localStorage.setItem("theme", "dark-mode");
    } else {
        body.classList.replace("dark-mode", "light-mode");
        label.textContent = "Light Mode";
        drawSun();
        localStorage.setItem("theme", "light-mode");
    }
});

// Apply theme preference on page load
applySavedPreference();

/**
 * Server Status Fetch
 */

// Fetch server status and update the DOM
async function fetchServerStatus() {
    try {
        const response = await fetch("https://api.mcsrvstat.us/2/McServer8338.enderman.cloud :33518"); // Replace with your server IP or hostname
        const data = await response.json();

        const statusElement = document.getElementById("status");
        const playersElement = document.getElementById("players");

        // Update status
        if (data.online) {
            statusElement.innerHTML = "🟢 Online";
        } else {
            statusElement.innerHTML = "🔴 Offline";
        }

        // Display current/maximum players in the format 1/20
        const currentPlayers = data.players.online || 0;
        const maxPlayers = data.players.max || 0;
        playersElement.textContent = `${currentPlayers}/${maxPlayers}`;
    } catch (error) {
        document.getElementById("status").innerHTML = "🔴 Error fetching data";
        document.getElementById("players").textContent = "N/A";
    }
}

// Fetch server status on page load
fetchServerStatus();

/**
 * Navbar Toggle
 */

// Toggle the visibility of the navigation menu
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");

    menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("hidden");
    });
});


async function fetchServerStatus() {
    try {
        const response = await fetch("https://api.mcsrvstat.us/2/snoogans.enderman.cloud:33518");
        const data = await response.json();

        // Update status
        document.getElementById("status").textContent = data.online ? "🟢 Online" : "🔴 Offline";
        
        // Display current/maximum players
        const currentPlayers = data.players.online || 0;
        const maxPlayers = data.players.max || 0;
        document.getElementById("players").textContent = `${currentPlayers}/${maxPlayers}`;

        // Update player list
        const playersListElement = document.getElementById("players-list");
        playersListElement.innerHTML = ""; // Clear the list before adding new players

        if (data.players.list && data.players.list.length > 0) {
            data.players.list.forEach(player => {
                const listItem = document.createElement("li");

                // Add the icon
                listItem.innerHTML = `👤 ${player}`;
                playersListElement.appendChild(listItem);
            });
        } else {
            playersListElement.innerHTML = "<li>No players online</li>";
        }
    } catch (error) {
        document.getElementById("status").textContent = "🔴 Error fetching data";
        document.getElementById("players").textContent = "N/A";
    }
}


// Run Server Status Fetch
fetchServerStatus();
setInterval(fetchServerStatus, 60000); // Refresh every 60 seconds

// Example list of players with icons (this could be dynamic based on your server data)
const players = [
    { name: 'Player1', iconUrl: 'https://example.com/player1_icon.png' },
    { name: 'Player2', iconUrl: 'https://example.com/player2_icon.png' },
    { name: 'Player3', iconUrl: 'https://example.com/player3_icon.png' },
];

// Function to populate the players list
function loadPlayers() {
    const playersList = document.getElementById('players-list');
    playersList.innerHTML = ''; // Clear the list first
    
    players.forEach(player => {
        const listItem = document.createElement('li');
        
        // Create player icon element
        const icon = document.createElement('img');
        icon.src = player.iconUrl;
        icon.alt = `${player.name}'s icon`;
        icon.classList.add('player-icon');
        
        // Create player name element
        const playerName = document.createElement('span');
        playerName.textContent = player.name;
        playerName.classList.add('player-name');
        
        // Append icon and name to list item
        listItem.appendChild(icon);
        listItem.appendChild(playerName);
        
        // Add list item to the players list
        playersList.appendChild(listItem);
    });
}

// Call the function to load players
loadPlayers();


if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered with scope:", registration.scope);
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}

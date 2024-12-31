/**
 * Light/Dark Mode Toggle
 */
const canvas = document.getElementById("toggleCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 50;
canvas.height = 50;

// Functions to draw light/dark mode icons
function drawSun() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FFA500";
    ctx.beginPath();
    ctx.arc(25, 25, 10, 0, 2 * Math.PI);
    ctx.fill();
}

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

// Apply saved theme preference
function applySavedPreference() {
    const savedMode = localStorage.getItem("theme") || "light-mode";
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

// Toggle theme
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

// Apply theme on load
applySavedPreference();

/**
 * Server Status Fetch
 */
async function fetchServerStatus() {
    try {
        const response = await fetch("https://api.mcsrvstat.us/2/McServer8338.enderman.cloud:33518");
        const data = await response.json();

        const statusElement = document.getElementById("status");
        const playersElement = document.getElementById("players");
        const playersListElement = document.getElementById("players-list");

        statusElement.textContent = data.online ? "🟢 Online" : "🔴 Offline";
        const currentPlayers = data.players?.online || 0;
        const maxPlayers = data.players?.max || 0;
        playersElement.textContent = `${currentPlayers}/${maxPlayers}`;

        playersListElement.innerHTML = "";
        if (data.players?.list?.length > 0) {
            data.players.list.forEach(player => {
                const listItem = document.createElement("li");
                listItem.textContent = player; // No icon, just player name
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

// Fetch server status on load and refresh every 60 seconds
fetchServerStatus();
setInterval(fetchServerStatus, 60000);

/**
 * Navbar Toggle
 */
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");

    menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("hidden");
    });
});

/**
 * Commands Link Dropdown Toggle
 */
document.getElementById('commands-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('active');
});

async function updateServerButtons() {
    try {
        const response = await fetch("https://api.mcsrvstat.us/2/McServer8338.enderman.cloud:33518");
        const data = await response.json();

        const startButton = document.getElementById("start-button");
        const renewButton = document.getElementById("renew-button");
        const serverButtons = document.getElementById("server-buttons");

        if (data.online) {
            // Server is online - hide Start button
            startButton.style.display = "none";
            // Center the Renew button
            renewButton.style.marginLeft = "0";
        } else {
            // Server is offline - show Start button
            startButton.style.display = "inline-block";
            // Adjust Renew button to the right
            renewButton.style.marginLeft = "10px";
        }
    } catch (error) {
        console.error("Error fetching server status:", error);
    }
}

// Call the function and update every 60 seconds
updateServerButtons();
setInterval(updateServerButtons, 60000);

/**
 * Players List Render with Xbox Profile Images (Using OpenXBL)
 */
const API_KEY = "e3d9df18-dd44-456f-92ee-bb9a690eb75c"; // Your API Key

async function getPlayerXUID(playerName) {
    const apiUrl = `https://xbl.io/api/v2/account/${playerName}`; // API to fetch player data

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-Authorization': `Bearer ${API_KEY}`, // Add API key in the Authorization header
                'Accept': 'application/json' // Ensure the response is in JSON format
            }
        });
        const playerData = await response.json();

        if (response.ok) {
            return playerData?.displayPicRaw; // Return the display picture URL
        } else {
            console.error(`Failed to fetch data for ${playerName}:`, playerData);
            return null;
        }
    } catch (error) {
        console.error(`Error fetching data for ${playerName}:`, error);
        return null;
    }
}

async function renderPlayers() {
    const playerListElement = document.getElementById("players-list");
    playerListElement.innerHTML = ""; // Clear previous content

    const playerNames = ["PhillipJFry8504"]; // Hardcoded player name for now (replace with actual list)

    // Add promises to fetch profile image for each player
    const playerPromises = playerNames.map(async playerName => {
        const displayPicUrl = await getPlayerXUID(playerName);
        
        if (!displayPicUrl) {
            return null; // If no image found, skip
        }

        return {
            name: playerName,
            displayPicRaw: displayPicUrl // The URL for the player's display picture
        };
    });

    const players = await Promise.all(playerPromises);

    // Filter out players who failed to load
    const validPlayers = players.filter(player => player !== null);

    if (validPlayers.length === 0) {
        playerListElement.innerHTML = "<p>No players online currently.</p>";
        return;
    }

    // Render the player list with Xbox profile images
    validPlayers.forEach(player => {
        const listItem = document.createElement("li");
        listItem.style.marginBottom = "10px";
        listItem.style.display = "flex";
        listItem.style.alignItems = "center";

        // Create and append Xbox profile image
        const imgElement = document.createElement("img");
        imgElement.src = player.displayPicRaw; // The URL for the player's display picture
        imgElement.alt = `${player.name} Xbox profile image`;
        imgElement.style.width = "30px";  // Adjust size as needed
        imgElement.style.height = "30px"; // Adjust size as needed
        imgElement.style.borderRadius = "50%"; // Circular image

        // Create player name element
        const spanElement = document.createElement("span");
        spanElement.textContent = player.name;
        spanElement.style.marginLeft = "10px"; // Space between image and name

        listItem.appendChild(imgElement);
        listItem.appendChild(spanElement);
        playerListElement.appendChild(listItem);
    });
}

renderPlayers();

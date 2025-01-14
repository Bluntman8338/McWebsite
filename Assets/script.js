        // Apply the saved light/dark mode
        const savedTheme = localStorage.getItem('theme') || 'light-mode';
        document.body.classList.add(savedTheme);

        // Menu toggle
        const menuToggle = document.getElementById('menu-toggle');
        const navbar = document.getElementById('navbar');
        const commandsLink = document.getElementById('commands-link');
        const commandsContainer = document.getElementById('commands-container');

        menuToggle.addEventListener('click', (event) => {
          event.stopPropagation();
          navbar.classList.toggle('hidden');
        });

        commandsLink.addEventListener('click', (event) => {
          event.stopPropagation();
          commandsContainer.classList.toggle('hidden');
        });

        document.addEventListener('click', () => {
          navbar.classList.add('hidden');
          commandsContainer.classList.add('hidden');
        });


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
         * Update Server Buttons
         */
        async function updateServerButtons() {
          try {
            const response = await fetch("https://api.mcsrvstat.us/2/McServer8338.enderman.cloud:33518");
            const data = await response.json();

            const startButton = document.getElementById("start-button");
            const renewButton = document.getElementById("renew-button");

            if (data.online) {
              startButton.style.display = "none";
              renewButton.style.marginLeft = "0";
            } else {
              startButton.style.display = "inline-block";
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


        // PWA SERVICE WORKER //
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
              console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((error) => {
              console.error('Service Worker registration failed:', error);
            });

          // Dynamically load the header
          fetch('/header.html')
            .then(response => response.text())
            .then(data => {
              document.getElementById('header-container').innerHTML = data;
            })
            .catch(error => console.error('Error loading header:', error));
          </script>
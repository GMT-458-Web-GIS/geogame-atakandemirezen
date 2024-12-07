const countries = [
    { name: "Türkiye", coords: [39.9334, 32.8597] },
    { name: "Germany", coords: [51.1657, 10.4515] },
    { name: "France", coords: [46.6034, 1.8883] },
    { name: "Italy", coords: [41.8719, 12.5674] },
    { name: "Spain", coords: [40.4637, -3.7492] },
    { name: "USA", coords: [37.0902, -95.7129] },
    { name: "Brazil", coords: [-14.2350, -51.9253] },
    { name: "Canada", coords: [56.1304, -106.3468] },
    { name: "Russia", coords: [61.5240, 105.3188] },
    { name: "Japan", coords: [36.2048, 138.2529] },
    { name: "China", coords: [35.8617, 104.1954] },
    { name: "India", coords: [20.5937, 78.9629] },
    { name: "Australia", coords: [-25.2744, 133.7751] },
    { name: "South Africa", coords: [-30.5595, 22.9375] },
    { name: "Mexico", coords: [23.6345, -102.5528] },
    { name: "Argentina", coords: [-38.4161, -63.6167] },
    { name: "Sweden", coords: [60.1282, 18.6435] },
    { name: "Norway", coords: [60.4720, 8.4689] },
    { name: "Finland", coords: [61.9241, 25.7482] },
    { name: "Greece", coords: [39.0742, 21.8243] },
    { name: "Holland", coords: [52.3676, 4.9041] },
    { name: "Belgium", coords: [50.8503, 4.3517] },
    { name: "Austria", coords: [47.5162, 14.5501] },
    { name: "Ireland", coords: [53.4129, -8.2439] },
    { name: "Switzerland", coords: [46.8182, 8.2275] },
    { name: "Denmark", coords: [56.2639, 9.5018] },
    { name: "Portugal", coords: [39.3999, -8.2245] },
    { name: "Czech Republic", coords: [49.8175, 15.4730] },
    { name: "Poland", coords: [51.9194, 19.1451] },
    { name: "Hungary", coords: [47.1625, 19.5033] },
    { name: "Romania", coords: [45.9432, 24.9668] },
    { name: "Serbia", coords: [44.0165, 21.0059] },
    { name: "Bulgaria", coords: [42.7339, 25.4858] },
    { name: "Ukraine", coords: [48.3794, 31.1656] },
    { name: "Egypt", coords: [26.8206, 30.8025] },
    { name: "Saudi Arabia", coords: [23.8859, 45.0792] },
    { name: "United Arab Emirates", coords: [23.4241, 53.8478] },
    { name: "Indonesia", coords: [-0.7893, 113.9213] },
    { name: "Malaysia", coords: [4.2105, 101.9758] },
    { name: "Philippines", coords: [12.8797, 121.7740] },
    { name: "Thailand", coords: [15.8700, 100.9925] },
    { name: "Vietnam", coords: [14.0583, 108.2772] },
    { name: "New Zealand", coords: [-40.9006, 174.8860] },
    { name: "Colombia", coords: [4.5709, -74.2973] },
    { name: "Chile", coords: [-35.6751, -71.5375] },
    { name: "Peru", coords: [-9.1899, -75.0152] },
    { name: "Costa Rika", coords: [9.7489, -83.7534] },
    { name: "Panama", coords: [8.9824, -79.5199] },
    { name: "Guatemala", coords: [15.7835, -90.2308] },
    { name: "Honduras", coords: [15.1999, -86.2419] }
];

let currentScore = 0;
let currentCountry;
let map;
let askedCountries = []; // Sorulan ülkeleri tutacak dizi
let lastMarker; // Son işaretçiyi tutmak için
let timer; // Zamanlayıcı
let timeLeft = 100; // Başlangıç süresi (saniye)
let difficulty = "easy"; // Varsayılan zorluk seviyesi
let countriesList; // Ülke listesini tutacak
let isPaused = false; // Zamanlayıcının duraklatılıp duraklatılmadığını kontrol etmek için

// Zorluk seçimi menüsüne tıklama olayları
document.getElementById('easy').addEventListener('click', () => setDifficulty("easy"));
document.getElementById('hard').addEventListener('click', () => setDifficulty("hard"));

// Duraklat butonunu almak
let pauseButton = document.getElementById('pauseButton'); // Duraklat butonunu al

// Duraklat butonunun işlevini tanımla
pauseButton.addEventListener('click', togglePause);

// Zorluk seviyesini ayarlamak
function setDifficulty(level) {
    difficulty = level;
    document.getElementById('difficulty-selection').style.display = 'none'; // Seçim menüsünü gizle
    startGame(); // Oyunu başlat
}

// Ülkeleri zorluk seviyesine göre seç
function getCountryList() {
    if (difficulty === "easy") {
        return countries.slice(0, 20); // İlk 20 ülke
    } else if (difficulty === "hard") {
        return countries; // Tüm 50 ülke
    }
    return countries.slice(0, 20); // Varsayılan olarak 20 ülke
}

// Oyunu başlat
function startGame() {
    countriesList = getCountryList(); // Zorluk seviyesine göre ülke listesini güncelle
    initMap();
    newQuestion(); // İlk soruyu başlat
    startTimer(); // Zamanlayıcıyı başlat
}

// Harita başlatma
function initMap() {
    // Haritayı başlatma, minimum ve maksimum zoom seviyelerini ayarlama
    map = L.map('map', {
        zoomControl: false, // Zoom kontrolünü kaldır
        maxZoom: 2, // En fazla zoom seviyesi
        minZoom: 2 // En az zoom seviyesi
    }).setView([20, 0], 2); // Başlangıç noktası ve zoom seviyesi

    // OpenStreetMap tile katmanını ekleme
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19, // Harita katmanının izin verdiği maksimum zoom
    }).addTo(map);
}


// Ülkeleri harita üzerinde vurgula
function highlightCountry(coords, color) {
    if (lastMarker) {
        map.removeLayer(lastMarker); 
    }

    lastMarker = L.circleMarker(coords, {
        color: color,
        radius: 10
    }).addTo(map);
    map.setView(coords, 3); 
}

function showOptions(correctCountryName) {
    let options = [];
    let correctCountry = countriesList.find(country => country.name === correctCountryName);

    options.push(correctCountry.name);

    
    while (options.length < 4) {
        let wrongAnswer = countriesList[Math.floor(Math.random() * countriesList.length)].name;
        if (!options.includes(wrongAnswer)) {
            options.push(wrongAnswer);
        }
    }

    options = options.sort(() => Math.random() - 0.5);

    let optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = "";
    options.forEach(option => {
        let button = document.createElement('button');
        button.innerText = option;
        button.addEventListener('click', () => checkAnswer(option, correctCountryName));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selected, correctAnswer) {
    if (selected === correctAnswer) {
        currentScore += 10;
        document.getElementById('score').innerText = `Puan: ${currentScore}`;
    }
    newQuestion(); 
}

function newQuestion() {
    if (askedCountries.length === countriesList.length) {
        alert("You have answered all the questions! The game is resetting.");
        resetGame();
    }

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * countriesList.length);
    } while (askedCountries.includes(countriesList[randomIndex].name)); 

    currentCountry = countriesList[randomIndex];
    askedCountries.push(currentCountry.name); 
    highlightCountry(currentCountry.coords, 'red'); 
    showOptions(currentCountry.name);
}

function startTimer() {
    timer = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            document.getElementById('timer').innerText = `Time: ${timeLeft} seconds`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                alert("Time's up! Game over.");
                resetGame();
            }
        }
    }, 1000);
}

// Cevap kontrolü
function checkAnswer(selected, correctAnswer) {
    if (selected === correctAnswer) {
        currentScore += 10;
        document.getElementById('score').innerText = `Points: ${currentScore}`;
        newQuestion(); // Yeni soru sor
    } else {
        // Başkent sorusu sayfasına yönlendir
        window.location.href = `capital_question.html?country=${encodeURIComponent(correctAnswer)}`;
    }
}

function loadGameState() {
    const queryParams = new URLSearchParams(window.location.search);
    const scoreFromURL = parseInt(queryParams.get("score"));
    if (!isNaN(scoreFromURL)) {
        currentScore = scoreFromURL;
        document.getElementById("score").innerText = `Points: ${currentScore}`;
    }
}

// Sayfa yüklendiğinde oyunun durumunu yükle
window.addEventListener("load", loadGameState);

// Duraklat ve devam et işlevi
function togglePause() {
    isPaused = !isPaused; // Duraklatma durumunu değiştir
    pauseButton.innerText = isPaused ? "Continue" : "Pause"; // Buton metnini güncelle
    toggleButtons(isPaused); // Butonları devre dışı bırak / etkinleştir
}

// Butonları devre dışı bırak / etkinleştir
function toggleButtons(disabled) {
    let buttons = document.querySelectorAll('#options button');
    buttons.forEach(button => {
        button.disabled = disabled; // Butonları devre dışı bırak
    });
}

// Oyun sıfırlama
function resetGame() {
    askedCountries = [];
    currentScore = 0;
    timeLeft = 100;
    clearInterval(timer); // Zamanlayıcıyı durdur
    document.getElementById('score').innerText = 'Points: ' + currentScore;
    document.getElementById('timer').innerText = `Time: ${timeLeft} saniye`;
    document.getElementById('difficulty-selection').style.display = 'block'; // Zorluk seçimini tekrar göster
    initMap(); // Haritayı yeniden başlat
}









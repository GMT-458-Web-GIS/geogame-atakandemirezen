const countries = [
    { name: "Türkiye", coords: [39.9334, 32.8597] },
    { name: "Almanya", coords: [51.1657, 10.4515] },
    { name: "Fransa", coords: [46.6034, 1.8883] },
    { name: "İtalya", coords: [41.8719, 12.5674] },
    { name: "İspanya", coords: [40.4637, -3.7492] },
    { name: "ABD", coords: [37.0902, -95.7129] },
    { name: "Brezilya", coords: [-14.2350, -51.9253] },
    { name: "Kanada", coords: [56.1304, -106.3468] },
    { name: "Rusya", coords: [61.5240, 105.3188] },
    { name: "Japonya", coords: [36.2048, 138.2529] },
    { name: "Çin", coords: [35.8617, 104.1954] },
    { name: "Hindistan", coords: [20.5937, 78.9629] },
    { name: "Avustralya", coords: [-25.2744, 133.7751] },
    { name: "Güney Afrika", coords: [-30.5595, 22.9375] },
    { name: "Meksika", coords: [23.6345, -102.5528] },
    { name: "Arjantin", coords: [-38.4161, -63.6167] },
    { name: "İsveç", coords: [60.1282, 18.6435] },
    { name: "Norveç", coords: [60.4720, 8.4689] },
    { name: "Finlandiya", coords: [61.9241, 25.7482] },
    { name: "Yunanistan", coords: [39.0742, 21.8243] },
    { name: "Hollanda", coords: [52.3676, 4.9041] },
    { name: "Belçika", coords: [50.8503, 4.3517] },
    { name: "Avusturya", coords: [47.5162, 14.5501] },
    { name: "İrlanda", coords: [53.4129, -8.2439] },
    { name: "İsviçre", coords: [46.8182, 8.2275] },
    { name: "Danimarka", coords: [56.2639, 9.5018] },
    { name: "Portekiz", coords: [39.3999, -8.2245] },
    { name: "Çek Cumhuriyeti", coords: [49.8175, 15.4730] },
    { name: "Polonya", coords: [51.9194, 19.1451] },
    { name: "Macaristan", coords: [47.1625, 19.5033] },
    { name: "Romanya", coords: [45.9432, 24.9668] },
    { name: "Sırbistan", coords: [44.0165, 21.0059] },
    { name: "Bulgaristan", coords: [42.7339, 25.4858] },
    { name: "Ukrayna", coords: [48.3794, 31.1656] },
    { name: "Mısır", coords: [26.8206, 30.8025] },
    { name: "Suudi Arabistan", coords: [23.8859, 45.0792] },
    { name: "Birleşik Arap Emirlikleri", coords: [23.4241, 53.8478] },
    { name: "Endonezya", coords: [-0.7893, 113.9213] },
    { name: "Malezya", coords: [4.2105, 101.9758] },
    { name: "Filipinler", coords: [12.8797, 121.7740] },
    { name: "Tayland", coords: [15.8700, 100.9925] },
    { name: "Vietnam", coords: [14.0583, 108.2772] },
    { name: "Yeni Zelanda", coords: [-40.9006, 174.8860] },
    { name: "Kolombiya", coords: [4.5709, -74.2973] },
    { name: "Şili", coords: [-35.6751, -71.5375] },
    { name: "Peru", coords: [-9.1899, -75.0152] },
    { name: "Kosta Rika", coords: [9.7489, -83.7534] },
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


function initMap() {
    map = L.map('map').setView([20, 0], 2); // Harita merkezi

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    startTimer(); // Zamanlayıcıyı başlat
    newQuestion();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Süre: ${timeLeft} saniye`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Süre doldu! Oyun sona erdi.');
            resetGame(); // Oyunu sıfırla
        }
    }, 1000);
}

function newQuestion() {
    if (askedCountries.length === countries.length) {
        alert("Tüm ülkeleri sordunuz! Oyun sıfırlanıyor.");
        resetGame();
    }

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * countries.length);
    } while (askedCountries.includes(countries[randomIndex].name)); // Aynı ülke kontrolü

    currentCountry = countries[randomIndex];
    askedCountries.push(currentCountry.name); // Sorulan ülkeyi ekle
    highlightCountry(currentCountry.coords, 'red'); // Doğru ülkeyi kırmızı ile işaretle
    showOptions(currentCountry.name);
}

function highlightCountry(coords, color) {
    if (lastMarker) {
        map.removeLayer(lastMarker); // Önceki işaretçiyi kaldır
    }

    lastMarker = L.marker(coords, {
        icon: L.divIcon({
            className: 'highlight',
            html: `<div style="background: ${color}; width: 20px; height: 20px; border-radius: 50%;"></div>`,
            iconSize: [20, 20]
        })
    }).addTo(map);
}

function showOptions(correctCountry) {
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = ''; // Önceki seçenekleri temizle

    // Doğru ülkeden 3 yanlış seçenek al
    const incorrectCountries = countries.filter(country => country.name !== correctCountry);
    const shuffledIncorrect = incorrectCountries.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    // Seçenekleri karıştırıp gösteriyoruz
    const options = [...shuffledIncorrect, currentCountry]; // Doğru ülkeyi ekliyoruz
    options.sort(() => Math.random() - 0.5); // Tüm seçenekleri karıştırıyoruz

    options.forEach(country => {
        const button = document.createElement('button');
        button.innerText = country.name;
        button.onclick = () => checkAnswer(country.name === correctCountry);
        optionsDiv.appendChild(button);
    });
}

function checkAnswer(isCorrect) {
    if (isCorrect) {
        currentScore += 5; // Her doğru cevapta 5 puan ekle
        timeLeft += 3; // Her doğru cevapta 3 saniye ekle
        alert('Doğru! Puan: ' + currentScore);
        highlightCountry(currentCountry.coords, 'green'); // Doğru cevapta yeşil ile işaretle
        if (currentScore >= 100) {
            alert('Tebrikler! 100 puana ulaştınız!');
            resetGame(); // Oyunu sıfırla
        }
    } else {
        alert('Yanlış! Doğru ülke: ' + currentCountry.name);
        highlightCountry(currentCountry.coords, 'red'); // Yanlış cevapta kırmızı ile işaretle
    }
    document.getElementById('score').innerText = 'Puan: ' + currentScore;
    newQuestion(); // Yeni soru oluştur
}


function resetGame() {
    askedCountries = [];
    currentScore = 0;
    timeLeft = 100;
    clearInterval(timer); // Zamanlayıcıyı durdur
    document.getElementById('score').innerText = 'Puan: ' + currentScore;
    document.getElementById('timer').innerText = `Süre: ${timeLeft} saniye`;
    initMap(); // Haritayı yeniden başlat
}

let isPaused = false; // Duraklatma durumu


function togglePause() {
    isPaused = !isPaused; // Duraklatma durumunu tersine çevir
    if (isPaused) {
        clearInterval(timer); // Zamanlayıcıyı durdur
        document.getElementById('pauseButton').innerText = 'Devam Et'; // Buton metnini değiştir
    } else {
        startTimer(); // Zamanlayıcıyı başlat
        document.getElementById('pauseButton').innerText = 'Duraklat'; // Buton metnini değiştir
    }
}

document.getElementById('pauseButton').addEventListener('click', togglePause);

function startTimer() {
    timer = setInterval(() => {
        if (!isPaused) { // Sadece oyun duraklatılmadıysa zamanlayıcıyı çalıştır
            timeLeft--;
            document.getElementById('timer').innerText = `Süre: ${timeLeft} saniye`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                alert('Süre doldu! Oyun sona erdi.');
                resetGame();
            }
        }
    }, 1000);
}

function resetGame() {
    askedCountries = [];
    currentScore = 0;
    timeLeft = 100;
    clearInterval(timer);
    document.getElementById('score').innerText = 'Puan: ' + currentScore;
    document.getElementById('timer').innerText = `Süre: ${timeLeft} saniye`;
    initMap(); // Haritayı yeniden başlat
}



// Haritayı başlat
initMap();


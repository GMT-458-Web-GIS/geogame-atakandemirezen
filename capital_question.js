const urlParams = new URLSearchParams(window.location.search);
const country = urlParams.get('country');

const capitals = {
    "Türkiye": "Ankara",
    "France": "Paris",
    "Germany": "Berlin",
    "USA": "Washington D.C.",
    "Italy": "Roma",
    "Spain": "Madrid",
    "Brazil": "Rio",
    "Canada": "Ottawa",
    "Russia": "Moskova",
    "Japan": "Tokyo",
    "China": "Pekin",
    "India": "Delhi",
    "Australia": "Sidney",
    "South Africa": "Cape Town",
    "Mexico": "Meksiko",
    "Argentina": "Buenos Aires",
    "Sweden": "Stokholm",
    "Norway": "Oslo",
    "Finland": "Helsinki",
    "Greece": "Atina",
    "Holland": "Amsterdam",
    "Belgium": "Brüksel",
    "Austria": "Viyana",
    "Ireland": "Dublin",
    "Switzerland": "Bern",
    "Denmark": "Kopenhag",
    "Portugal": "Lizbon",
    "Czech Republic": "Prag",
    "Poland": "Varşova",
    "Hungary": "Budapeşte",
    "Romania": "Bükreş",
    "Serbia": "Belgrad",
    "Bulgaria": "Sofya",
    "Ukraine": "Kiev",
    "Egypt": "Kahire",
    "Saudi Arabia": "Riyad",
    "United Arab Emirates": "Abu Dabi",
    "Indonesia": "Cakarta",
    "Malaysia": "Kuala Lumpur",
    "Philippines": "Manila",
    "Thailand": "Bangkok",
    "Vietnam": "Hanoi",
    "New Zealand": "Wellington",
    "Colombiya": "Bogota",
    "Chile": "Santiago",
    "Peru": "Lima",
    "Costa Rika": "San Hose",
    "Panama": "Panama",
    "Guatemala": "Guatemala",
    "Honduras": "Tegusigalpa"
};



document.getElementById('question').innerText = `${country} ... capital of ?`;

document.getElementById('submitAnswer').addEventListener('click', () => {
    const userAnswer = document.getElementById('capitalInput').value.trim();
    if (userAnswer.toLowerCase() === capitals[country]?.toLowerCase()) {
        alert("Correct answer! You're back in the game. At least you know that.");
        window.location.href = 'index.html';
    } else {
        alert("Wrong answer! Game over. Go and explore this country a little more and then come back.");
        window.location.href = 'game_over.html'; 
    }
});



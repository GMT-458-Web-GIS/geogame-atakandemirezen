const urlParams = new URLSearchParams(window.location.search);
const country = urlParams.get('country');

const capitals = {
    "Türkiye": "Ankara",
    "Fransa": "Paris",
    "Almanya": "Berlin",
    "ABD": "Washington D.C.",
    "İtalya": "Roma",
    "İspanya": "Madrid",
    "Brezilya": "Rio",
    "Kanada": "Ottawa",
    "Rusya": "Moskova",
    "Japonya": "Tokyo",
    "Çin": "Pekin",
    "Hindistan": "Delhi",
    "Avustralya": "Sidney",
    "Güney Afrika": "Cape Town",
    "Meksika": "Meksiko",
    "Arjantin": "Buenos Aires",
    "İsveç": "Stokholm",
    "Norveç": "Oslo",
    "Finlandiya": "Helsinki",
    "Yunanistan": "Atina",
    "Hollanda": "Amsterdam",
    "Belçika": "Brüksel",
    "Avusturya": "Viyana",
    "İrlanda": "Dublin",
    "İsviçre": "Bern",
    "Danimarka": "Kopenhag",
    "Portekiz": "Lizbon",
    "Çek Cumhuriyeti": "Prag",
    "Polonya": "Varşova",
    "Macaristan": "Budapeşte",
    "Romanya": "Bükreş",
    "Sırbistan": "Belgrad",
    "Bulgaristan": "Sofya",
    "Ukrayna": "Kiev",
    "Mısır": "Kahire",
    "Suudi Arabistan": "Riyad",
    "Birleşik Arap Emirlikleri": "Abu Dabi",
    "Endonezya": "Cakarta",
    "Malezya": "Kuala Lumpur",
    "Filipinler": "Manila",
    "Tayland": "Bangkok",
    "Vietnam": "Hanoi",
    "Yeni Zelanda": "Wellington",
    "Kolombiya": "Bogota",
    "Şili": "Santiago",
    "Peru": "Lima",
    "Kosta Rika": "San Hose",
    "Panama": "Panama",
    "Guatemala": "Guatemala",
    "Honduras": "Tegusigalpa"
};


document.getElementById('question').innerText = `${country} ülkesinin başkenti nedir?`;

document.getElementById('submitAnswer').addEventListener('click', () => {
    const userAnswer = document.getElementById('capitalInput').value.trim();
    if (userAnswer.toLowerCase() === capitals[country]?.toLowerCase()) {
        alert("Doğru cevap! Oyuna geri dönüyorsunuz. En azından bunu biliyorsun.");
        window.location.href = 'index.html';
    } else {
        alert("Yanlış cevap! Oyun sona erdi. Git ve bu ülkeyi biraz daha araştır öyle gel.");
        window.location.href = 'game_over.html'; 
    }
});

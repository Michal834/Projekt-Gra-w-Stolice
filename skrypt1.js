const API_URL = "https://restcountries.com/v3.1/region/europe";
let countries = [];
let currentCountry = null;
let score = 0;
let remainingChances = 5;

document.addEventListener("DOMContentLoaded", () => {
    fetchCountries();
    document.getElementById("check-btn").addEventListener("click", checkAnswer);
});

async function fetchCountries() {
    try {
        const response = await fetch(API_URL);
        countries = await response.json();
        loadNewCountry();
    } catch (error) {
        console.error("Błąd pobierani danych", error);
    }
}

function loadNewCountry() {
    const randomIndex = Math.floor(Math.random() * countries.length);
    currentCountry = countries[randomIndex];

    document.getElementById("flag").src = currentCountry.flags.svg;
    document.getElementById("country-name").textContent = `Kraj: ${currentCountry.name.common}`;
    document.getElementById("capital-input").value = "";
    document.getElementById("result").textContent = "";
}

function checkAnswer() {
    const userAnswer = document.getElementById("capital-input").value.trim().toLowerCase();
    const correctAnswer = currentCountry.capital ? currentCountry.capital[0].toLowerCase() : "";

    if (userAnswer === correctAnswer) {
        score++;
        document.getElementById("result").textContent = "Dobrze!";
        document.getElementById("result").style.color = "green";
        document.querySelector(".container").style.boxShadow = "10px 20px 30px green";
        document.getElementById("score").textContent = `Punkty: ${score}`;
        loadNewCountry();
    } else {
        remainingChances--;
        document.getElementById("result").textContent = "Źle! Spróbuj jeszcze raz.";
        document.getElementById("result").style.color = "red";
        document.querySelector(".container").style.boxShadow = "10px 20px 30px red";
        document.getElementById("chances").textContent = `Pozostałe szanse: ${remainingChances}`;

        if (remainingChances === 0) {
            endGame();
        }
    }
}

function endGame() {
document.getElementById("result").textContent = `Gratulacje (prawie) wygrales nowego iPhone 17,5 pro max, uzyskales taki wnik w zgadywaniu flag:${score}pkt`;
    document.getElementById("quiz").style.display = "none";
}

function reset() {
    
    document.getElementById("resetuj").addEventListener("click", checkAnswer);
}

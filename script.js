const pots = {
  1: [
    "Paris Saint-Germain",
    "Real Madrid",
    "Manchester City",
    "Bayern Munich",
    "Liverpool",
    "Inter Milan",
    "Chelsea",
    "Borussia Dortmund",
    "Barcelona"
  ],
  2: [
    "Arsenal",
    "Bayer Leverkusen",
    "Atlético Madrid",
    "Benfica",
    "Atalanta",
    "Villarreal",
    "Juventus",
    "Eintracht Frankfurt",
    "Club Brugge"
  ],
  3: [
    "Tottenham Hotspur",
    "PSV Eindhoven",
    "Ajax",
    "Napoli",
    "Sporting CP",
    "Olympiacos",
    "Slavia Prague",
    "Bodø/Glimt",
    "Marseille"
  ],
  4: [
    "Copenhagen",
    "Monaco",
    "Galatasaray",
    "Union Saint-Gilloise",
    "Qarabağ",
    "Athletic Club",
    "Newcastle United",
    "Pafos",
    "Kairat Almaty"
  ]
};

const teams = Object.values(pots).flat();

function pickRandom(array, count) {
  return [...array].sort(() => Math.random() - 0.5).slice(0, count);
}

function drawFixtures() {
  const container = document.getElementById("teams");
  container.innerHTML = "";

  teams.forEach(team => {
    let fixtures = [];

    Object.values(pots).forEach(pot => {
      const possible = pot.filter(t => t !== team);
      const selected = pickRandom(possible, 2);
      selected.forEach(opponent => {
        fixtures.push(opponent);
      });
    });

    const div = document.createElement("div");
    div.className = "team";
    div.innerHTML = `
      <h3>${team}</h3>
      ${fixtures.map(f => `<p>${f}</p>`).join("")}
    `;
    container.appendChild(div);
  });
}

document
  .getElementById("drawBtn")
  .addEventListener("click", drawFixtures);

const teamThemes = {
  "Paris Saint-Germain": { bg: "#004170", fg: "#FFFFFF", slogan: "Allez Paris!" },
  "Real Madrid": { bg: "#FFFFFF", fg: "#FEBE10", slogan: "Hala Madrid!" },
  "Manchester City": { bg: "#6CABDD", fg: "#006B8F", slogan: "City 'Til I Die" },
  "Bayern Munich": { bg: "#D00A25", fg: "#FFFFFF", slogan: "Mia san Mia" },
  "Liverpool": { bg: "#C8102E", fg: "#FFFFFF", slogan: "You'll Never Walk Alone" },
  "Inter Milan": { bg: "#0058A3", fg: "#FFFFFF", slogan: "Nerazzurri" },
  "Chelsea": { bg: "#034694", fg: "#FFFFFF", slogan: "Keep the Blue Flag Flying High" },
  "Borussia Dortmund": { bg: "#F7E600", fg: "#000000", slogan: "Echte Liebe" },
  "Barcelona": { bg: "#00205B", fg: "#FF4B55", slogan: "Més que un club" },

  "Arsenal": { bg: "#EF4135", fg: "#FFFFFF", slogan: "Victoria Concordia Crescit" },
  "Bayer Leverkusen": { bg: "#E30B17", fg: "#000000", slogan: "Neverkusen" },
  "Atlético Madrid": { bg: "#A50033", fg: "#FFFFFF", slogan: "¡A por ellos!" },
  "Benfica": { bg: "#E60012", fg: "#FFFFFF", slogan: "E Pluribus Unum" },
  "Atalanta": { bg: "#0033A0", fg: "#000000", slogan: "La Dea!" },
  "Villarreal": { bg: "#F5E100", fg: "#2A1B61", slogan: "Força Villarreal" },
  "Juventus": { bg: "#000000", fg: "#FFFFFF", slogan: "Fino Alla Fine" },
  "Eintracht Frankfurt": { bg: "#000000", fg: "#E70010", slogan: "Hunt Together, Fight Together" },
  "Club Brugge": { bg: "#003D73", fg: "#F4F4F4", slogan: "No Surrender" },

  "Tottenham Hotspur": { bg: "#0066B1", fg: "#FFFFFF", slogan: "To Dare Is To Do" },
  "PSV Eindhoven": { bg: "#D80032", fg: "#FFFFFF", slogan: "Ik weet wat je zoekt" },
  "Ajax": { bg: "#FF0000", fg: "#FFFFFF", slogan: "Wij zijn Ajax" },
  "Napoli": { bg: "#4B92DB", fg: "#FFFFFF", slogan: "Forza Napoli Sempre" },
  "Sporting CP": { bg: "#009639", fg: "#FFFFFF", slogan: "Esforço, Dedicação, Devoção, Glória" },
  "Olympiacos": { bg: "#D00032", fg: "#FFFFFF", slogan: "Bournova Ole" },
  "Slavia Prague": { bg: "#D30030", fg: "#FFFFFF", slogan: "For Slavia, For Prague" },
  "Bodø/Glimt": { bg: "#FFCC00", fg: "#000000", slogan: "Glimt til toppen!" },
  "Marseille": { bg: "#005BA6", fg: "#FFFFFF", slogan: "Droit au But" }
};

const pots = {
  1: ["Paris Saint-Germain","Real Madrid","Manchester City","Bayern Munich","Liverpool","Inter Milan","Chelsea","Borussia Dortmund","Barcelona"],
  2: ["Arsenal","Bayer Leverkusen","Atlético Madrid","Benfica","Atalanta","Villarreal","Juventus","Eintracht Frankfurt","Club Brugge"],
  3: ["Tottenham Hotspur","PSV Eindhoven","Ajax","Napoli","Sporting CP","Olympiacos","Slavia Prague","Bodø/Glimt","Marseille"]
};

let fixtures = {};

function pickRandom(arr, n) {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

function drawFixtures() {
  fixtures = {};
  const container = document.getElementById("teams");
  container.innerHTML = "";

  Object.values(pots).flat().forEach(team => {
    fixtures[team] = [];
    Object.values(pots).forEach(pot => {
      const possible = pot.filter(t => t !== team);
      const [home, away] = pickRandom(possible, 2);
      fixtures[team].push({ team: home, venue: "H" });
      fixtures[team].push({ team: away, venue: "A" });
    });

    const theme = teamThemes[team];
    const div = document.createElement("div");
    div.className = "team";
    div.style.background = theme.bg;
    div.style.color = theme.fg;
    div.innerText = team;
    div.onclick = () => openModal(team);
    container.appendChild(div);
  });
}

function openModal(team) {
  const modal = document.getElementById("modal");
  const title = document.getElementById("modalTitle");
  const slogan = document.getElementById("modalSlogan");
  const list = document.getElementById("modalFixtures");

  const theme = teamThemes[team];
  title.innerText = team;
  slogan.innerText = `"${theme.slogan}"`;

  list.innerHTML = fixtures[team]
    .map(f => `<p>${f.team} (${f.venue})</p>`)
    .join("");

  document.getElementById("modalContent").style.background = theme.bg;
  document.getElementById("modalContent").style.color = theme.fg;

  modal.classList.remove("hidden");
}

document.getElementById("closeBtn").onclick = () =>
  document.getElementById("modal").classList.add("hidden");

document.getElementById("drawBtn").onclick = drawFixtures;


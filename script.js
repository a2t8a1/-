const teamThemes = {
  "Paris Saint-Germain": { bg:"#004170", fg:"#fff", slogan:"Allez Paris!" },
  "Real Madrid": { bg:"#ffffff", fg:"#111", slogan:"Hala Madrid!" },
  "Manchester City": { bg:"#6CABDD", fg:"#003A8F", slogan:"City 'Til I Die" },
  "Bayern Munich": { bg:"#D00A25", fg:"#fff", slogan:"Mia san Mia" },
  "Liverpool": { bg:"#C8102E", fg:"#fff", slogan:"You'll Never Walk Alone" },
  "Inter Milan": { bg:"#0058A3", fg:"#fff", slogan:"Nerazzurri" },
  "Chelsea": { bg:"#034694", fg:"#fff", slogan:"Keep the Blue Flag Flying High" },
  "Borussia Dortmund": { bg:"#F7E600", fg:"#000", slogan:"Echte Liebe" },
  "Barcelona": { bg:"#00205B", fg:"#FF4B55", slogan:"Més que un club" },

  "Arsenal": { bg:"#EF4135", fg:"#fff", slogan:"Victoria Concordia Crescit" },
  "Juventus": { bg:"#000", fg:"#fff", slogan:"Fino Alla Fine" },
  "Galatasaray": { bg:"#A32638", fg:"#F6B500", slogan:"Cim Bom Bom!" },
  "Napoli": { bg:"#4B92DB", fg:"#fff", slogan:"Forza Napoli Sempre" }
};

const pots = {
  1: ["Paris Saint-Germain","Real Madrid","Manchester City","Bayern Munich","Liverpool","Inter Milan","Chelsea","Borussia Dortmund","Barcelona"],
  2: ["Arsenal","Juventus"],
  3: ["Napoli","Galatasaray"]
};

let fixtures = {};

function randomPick(arr, n) {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

function drawFixtures() {
  const container = document.getElementById("teams");
  container.innerHTML = "";
  fixtures = {};

  Object.values(pots).flat().forEach(team => {
    fixtures[team] = [];

    Object.values(pots).forEach(pot => {
      const possible = pot.filter(t => t !== team);
      if (possible.length >= 2) {
        const [h,a] = randomPick(possible, 2);
        fixtures[team].push({team:h, venue:"H"});
        fixtures[team].push({team:a, venue:"A"});
      }
    });

    const theme = teamThemes[team] || {bg:"#333", fg:"#fff", slogan:""};
    const card = document.createElement("div");
    card.className = "team-card";
    card.style.background = theme.bg;
    card.style.color = theme.fg;
    card.innerHTML = `<h3>${team}</h3>`;
    card.onclick = () => openModal(team);
    container.appendChild(card);
  });
}

function openModal(team) {
  const modal = document.getElementById("modal");
  const theme = teamThemes[team];

  document.getElementById("modalTitle").innerText = team;
  document.getElementById("modalSlogan").innerText = `"${theme.slogan}"`;

  const list = document.getElementById("modalFixtures");
  list.innerHTML = fixtures[team]
    .map(f => `<div class="fixture">${f.team} (${f.venue})</div>`)
    .join("");

  const card = document.getElementById("modalContent");
  card.style.background = theme.bg;
  card.style.color = theme.fg;

  modal.classList.remove("hidden");
}

document.getElementById("closeBtn").onclick =
  () => document.getElementById("modal").classList.add("hidden");

document.getElementById("drawBtn").onclick = drawFixtures;



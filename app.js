const formatRp = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });

const tileTypes = {
  start: { label: "Start", color: "#f1b743" },
  city: { label: "Kota", color: "#2b6aa7" },
  tourism: { label: "Wisata", color: "#3b8f52" },
  infrastructure: { label: "Infrastruktur", color: "#0b8c85" },
  resource: { label: "SDA", color: "#7a4da3" },
  bumn: { label: "BUMN", color: "#cf3e35" },
  event: { label: "Event", color: "#e98b3d" },
  tax: { label: "Pajak", color: "#294555" },
  prison: { label: "Penjara", color: "#8b2f2b" },
  parking: { label: "Parkir", color: "#f1b743" },
};

const iconFiles = [
  "apple-svgrepo-com.svg",
  "avocado-svgrepo-com.svg",
  "banana-svgrepo-com.svg",
  "boxing-svgrepo-com.svg",
  "cherry-svgrepo-com.svg",
  "coffee-svgrepo-com.svg",
  "dumbbel-svgrepo-com.svg",
  "fish-svgrepo-com.svg",
  "grape-svgrepo-com.svg",
  "kiwi-fruit-svgrepo-com.svg",
  "lemon-svgrepo-com.svg",
  "milk-svgrepo-com.svg",
  "peach-svgrepo-com.svg",
  "poached-eggs-svgrepo-com.svg",
  "running-svgrepo-com.svg",
  "soda-water-svgrepo-com.svg",
  "steak-svgrepo-com.svg",
  "watermelon-svgrepo-com.svg",
  "weighing-scale-svgrepo-com.svg",
  "yogurt-svgrepo-com.svg",
];

const iconImages = new Map();
iconFiles.forEach((file) => {
  const image = new Image();
  image.src = `icon/${file}`;
  image.onload = () => {
    if (players) render();
  };
  iconImages.set(file, image);
});

const tiles = [
  { name: "Gerbang Nusantara", type: "start", effect: "Lewat start mendapat Rp2.000.000." },
  { name: "Aceh", region: "Sumatera", type: "city", price: 1800000, rent: 350000, upgrade: 900000 },
  { name: "Medan", region: "Sumatera", type: "city", price: 2400000, rent: 480000, upgrade: 1100000 },
  { name: "Kartu Nasional", type: "event", effect: "Ambil kebijakan nasional." },
  { name: "Padang", region: "Sumatera", type: "tourism", price: 2200000, rent: 460000, upgrade: 1000000 },
  { name: "Pelabuhan Tanjung Priok", type: "infrastructure", price: 3200000, rent: 620000, upgrade: 1400000 },
  { name: "Jakarta", region: "Jawa", type: "city", price: 5200000, rent: 1050000, upgrade: 2200000 },
  { name: "Pajak Penghasilan", type: "tax", effect: "Bayar 8% dari kas saat ini." },
  { name: "Bandung", region: "Jawa", type: "city", price: 3600000, rent: 720000, upgrade: 1600000 },
  { name: "Borobudur", region: "Jawa", type: "tourism", price: 3400000, rent: 760000, upgrade: 1500000 },
  { name: "Surabaya", region: "Jawa", type: "city", price: 4200000, rent: 880000, upgrade: 1800000 },
  { name: "MRT Jakarta", type: "infrastructure", price: 3000000, rent: 610000, upgrade: 1300000 },
  { name: "Penjara KPK", type: "prison", effect: "Masuk kasus hukum dan kehilangan satu giliran." },
  { name: "IKN Nusantara", region: "Kalimantan", type: "city", price: 4700000, rent: 980000, upgrade: 2100000 },
  { name: "Tambang Batu Bara", region: "Kalimantan", type: "resource", price: 3800000, rent: 820000, upgrade: 1700000 },
  { name: "Kartu Budaya", type: "event", effect: "Ambil event budaya." },
  { name: "Makassar", region: "Sulawesi", type: "city", price: 3300000, rent: 690000, upgrade: 1450000 },
  { name: "Nikel Sulawesi", region: "Sulawesi", type: "resource", price: 4100000, rent: 920000, upgrade: 1900000 },
  { name: "Bebas Parkir", type: "parking", effect: "Ambil seluruh dana parkir bebas dari pajak dan denda." },
  { name: "Bandara Soekarno-Hatta", type: "infrastructure", price: 4400000, rent: 940000, upgrade: 2000000 },
  { name: "Bali", region: "Bali & Nusa Tenggara", type: "tourism", price: 5000000, rent: 1120000, upgrade: 2300000 },
  { name: "Pertamina", type: "bumn", price: 4300000, rent: 880000, upgrade: 1900000, effect: "Bonus energi nasional." },
  { name: "Timika", region: "Papua", type: "resource", price: 4600000, rent: 1080000, upgrade: 2200000 },
  { name: "Raja Ampat", region: "Papua", type: "tourism", price: 4500000, rent: 1020000, upgrade: 2100000 },
];

const events = [
  { title: "Festival Budaya Sukses", text: "Semua aset wisata menghasilkan bonus Rp700.000 untuk pemiliknya.", kind: "tourismBonus" },
  { title: "Harga BBM Naik", text: "Infrastruktur makin penting. Pemilik infrastruktur mendapat Rp600.000.", kind: "infraBonus" },
  { title: "Rupiah Melemah", text: "Semua pemain membayar biaya impor Rp450.000.", kind: "allPay" },
  { title: "Investasi Asing Masuk", text: "Pemain aktif mendapat suntikan modal Rp1.200.000.", kind: "activeGain" },
  { title: "Banjir Jakarta", text: "Pemilik Jakarta membayar mitigasi Rp900.000.", kind: "jakartaFlood" },
  { title: "Ramadan Market", text: "Semua kota UMKM mendapat bonus Rp500.000.", kind: "cityBonus" },
  { title: "Investigasi KPK", text: "Pemain aktif membayar denda Rp750.000.", kind: "activeFine" },
];

const playersTemplate = [
  { name: "Ayu", role: "Raja Pariwisata", color: "#ffd15a", bonus: "tourism", icon: "apple-svgrepo-com.svg", position: 0, cash: 15000000, inCase: false },
  { name: "Bima", role: "Menteri Infrastruktur", color: "#38c6b8", bonus: "infrastructure", icon: "avocado-svgrepo-com.svg", position: 0, cash: 15000000, inCase: false },
  { name: "Citra", role: "Sultan Tambang", color: "#e65b4f", bonus: "resource", icon: "banana-svgrepo-com.svg", position: 0, cash: 15000000, inCase: false },
  { name: "Damar", role: "Pengusaha Properti", color: "#67a4ff", bonus: "city", icon: "coffee-svgrepo-com.svg", position: 0, cash: 15000000, inCase: false },
];

const setupOverlay = document.querySelector("#setupOverlay");
const setupForm = document.querySelector("#setupForm");
const playerCountSelect = document.querySelector("#playerCountSelect");
const setupPlayers = document.querySelector("#setupPlayers");
const turnNotification = document.querySelector("#turnNotification");
const canvas = document.querySelector("#boardCanvas");
const ctx = canvas.getContext("2d");
const rollButton = document.querySelector("#rollButton");
const endTurnButton = document.querySelector("#endTurnButton");
const newGameButton = document.querySelector("#newGameButton");
const diceValue = document.querySelector("#diceValue");
const playersList = document.querySelector("#playersList");
const tileDetails = document.querySelector("#tileDetails");
const buyButton = document.querySelector("#buyButton");
const upgradeButton = document.querySelector("#upgradeButton");
const eventCard = document.querySelector("#eventCard");
const gameLog = document.querySelector("#gameLog");
const currentPlayerName = document.querySelector("#currentPlayerName");
const currentPlayerCash = document.querySelector("#currentPlayerCash");

let players;
let ownedTiles;
let currentPlayerIndex;
let selectedTileIndex;
let rolling;
let hasRolled;
let diceTimer;
let activeTokenMove;
let notificationTimer;
let freeParkingFund;

function freshPlayers(config = playersTemplate) {
  return config.map((player) => ({
    ...player,
    position: 0,
    cash: 15000000,
    inCase: false,
  }));
}

function startGame(config) {
  players = freshPlayers(config);
  ownedTiles = tiles.map(() => null);
  currentPlayerIndex = 0;
  selectedTileIndex = 0;
  rolling = false;
  hasRolled = false;
  activeTokenMove = null;
  freeParkingFund = 1000000;
  clearInterval(diceTimer);
  diceValue.classList.remove("rolling");
  diceValue.textContent = "2";
  gameLog.innerHTML = "";
  eventCard.innerHTML = "<span>Belum ada event.</span>";
  setupOverlay.classList.add("hidden");
  addLog(`Permainan dimulai. ${players[0].name} membuka langkah dari Gerbang Nusantara.`);
  showTurnNotification(`Giliran ${players[0].name}`);
  render();
}

function showSetup() {
  setupOverlay.classList.remove("hidden");
  renderSetupPlayers();
}

function getCurrentPlayer() {
  return players[currentPlayerIndex];
}

function getRent(tile, owner) {
  if (!tile.price) return 0;
  const level = ownedTiles[selectedTileIndex]?.level ?? 0;
  const typeBonus = owner?.bonus === tile.type ? 1.25 : 1;
  const levelBonus = 1 + level * 0.72;
  return Math.round(tile.rent * levelBonus * typeBonus);
}

function canBuy(tile) {
  const player = getCurrentPlayer();
  return Boolean(
    hasRolled &&
      selectedTileIndex === player.position &&
      tile.price &&
      !ownedTiles[selectedTileIndex] &&
      player.cash >= tile.price,
  );
}

function canUpgrade(tile) {
  const owner = ownedTiles[selectedTileIndex];
  const player = getCurrentPlayer();
  if (!owner || owner.player !== currentPlayerIndex || owner.level >= 5 || !tile.upgrade) return false;
  const discount = player.role === "Pengusaha Properti" ? 0.8 : 1;
  return player.cash >= Math.round(tile.upgrade * discount);
}

function addLog(message) {
  const item = document.createElement("li");
  item.textContent = message;
  gameLog.prepend(item);
  while (gameLog.children.length > 8) gameLog.lastElementChild.remove();
}

function applyTileEffect(tile) {
  const player = getCurrentPlayer();
  selectedTileIndex = player.position;

  if (tile.type === "tax") {
    const tax = Math.round(player.cash * 0.08);
    player.cash -= tax;
    freeParkingFund += tax;
    addLog(`${player.name} membayar pajak penghasilan ${formatRp(tax)}.`);
  }

  if (tile.type === "prison") {
    const fine = Math.min(850000, player.cash);
    player.cash -= fine;
    freeParkingFund += fine;
    player.inCase = true;
    addLog(`${player.name} masuk Penjara KPK dan membayar pengacara ${formatRp(fine)}.`);
  }

  if (tile.type === "parking") {
    const payout = freeParkingFund;
    player.cash += payout;
    freeParkingFund = 0;
    addLog(`${player.name} mendapat dana Bebas Parkir ${formatRp(payout)}.`);
  }

  if (tile.type === "event") {
    drawEvent();
  }

  const ownership = ownedTiles[player.position];
  if (ownership && ownership.player !== currentPlayerIndex) {
    const owner = players[ownership.player];
    const rent = getRent(tile, owner);
    player.cash -= rent;
    owner.cash += rent;
    addLog(`${player.name} membayar ${formatRp(rent)} ke ${owner.name} untuk ${tile.name}.`);
  }
}

function drawEvent() {
  const event = events[Math.floor(Math.random() * events.length)];
  const player = getCurrentPlayer();
  eventCard.innerHTML = `<strong>${event.title}</strong><span>${event.text}</span>`;
  addLog(`Event: ${event.title}.`);

  if (event.kind === "allPay") {
    players.forEach((target) => {
      target.cash -= 450000;
      freeParkingFund += 450000;
    });
  }

  if (event.kind === "activeGain") player.cash += 1200000;
  if (event.kind === "activeFine") {
    player.cash -= 750000;
    freeParkingFund += 750000;
  }

  if (event.kind === "jakartaFlood") {
    const jakartaIndex = tiles.findIndex((tile) => tile.name === "Jakarta");
    const owner = ownedTiles[jakartaIndex];
    if (owner) {
      players[owner.player].cash -= 900000;
      freeParkingFund += 900000;
    }
  }

  const bonusType = {
    tourismBonus: "tourism",
    infraBonus: "infrastructure",
    cityBonus: "city",
  }[event.kind];

  if (bonusType) {
    ownedTiles.forEach((owner, index) => {
      if (owner && tiles[index].type === bonusType) {
        players[owner.player].cash += event.kind === "infraBonus" ? 600000 : event.kind === "cityBonus" ? 500000 : 700000;
      }
    });
  }
}

function buyCurrentTile() {
  const tile = tiles[selectedTileIndex];
  const player = getCurrentPlayer();
  if (!canBuy(tile)) return;
  player.cash -= tile.price;
  ownedTiles[selectedTileIndex] = { player: currentPlayerIndex, level: 0 };
  addLog(`${player.name} membeli ${tile.name} seharga ${formatRp(tile.price)}.`);
  render();
}

function upgradeCurrentTile() {
  const tile = tiles[selectedTileIndex];
  const player = getCurrentPlayer();
  if (!canUpgrade(tile)) return;
  const discount = player.role === "Pengusaha Properti" ? 0.8 : 1;
  const cost = Math.round(tile.upgrade * discount);
  player.cash -= cost;
  ownedTiles[selectedTileIndex].level += 1;
  addLog(`${player.name} mengembangkan ${tile.name} ke tier ${ownedTiles[selectedTileIndex].level}.`);
  render();
}

function nextTurn() {
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  hasRolled = false;
  const player = getCurrentPlayer();
  if (player.cash <= 0) {
    addLog(`${player.name} bangkrut dan melewatkan giliran.`);
    nextTurn();
    return;
  }
  showTurnNotification(`Giliran ${player.name}`);
}

function showTurnNotification(message) {
  clearTimeout(notificationTimer);
  turnNotification.textContent = message;
  turnNotification.classList.add("show");
  notificationTimer = setTimeout(() => {
    turnNotification.classList.remove("show");
  }, 1700);
}

function rollDice() {
  if (rolling || hasRolled) return;
  const player = getCurrentPlayer();
  rolling = true;
  rollButton.disabled = true;
  endTurnButton.disabled = true;

  if (player.inCase) {
    player.inCase = false;
    addLog(`${player.name} menjalani giliran Penjara KPK dan baru bebas ronde berikutnya.`);
    nextTurn();
    rolling = false;
    rollButton.disabled = false;
    render();
    return;
  }

  diceValue.classList.add("rolling");
  diceTimer = setInterval(() => {
    diceValue.textContent = Math.ceil(Math.random() * 6);
  }, 90);

  setTimeout(async () => {
    clearInterval(diceTimer);
    const dice = Math.ceil(Math.random() * 6);
    diceValue.textContent = dice;
    diceValue.classList.remove("rolling");
    const crossedStart = await animatePlayerMove(currentPlayerIndex, dice);
    if (crossedStart) {
      player.cash += 2000000;
      addLog(`${player.name} melewati Gerbang Nusantara dan menerima Rp2.000.000.`);
    }

    applyTileEffect(tiles[player.position]);
    addLog(`${player.name} bergerak ${dice} langkah ke ${tiles[player.position].name}.`);
    hasRolled = true;
    rolling = false;
    render();
  }, 850);
}

function animatePlayerMove(playerIndex, steps) {
  return new Promise((resolve) => {
    const player = players[playerIndex];
    let remainingSteps = steps;
    let crossedStart = false;

    function moveOneTile() {
      if (remainingSteps <= 0) {
        activeTokenMove = null;
        selectedTileIndex = player.position;
        render();
        resolve(crossedStart);
        return;
      }

      const from = player.position;
      const to = (from + 1) % tiles.length;
      const startedAt = performance.now();
      const duration = 260;
      activeTokenMove = { playerIndex, from, to, progress: 0 };
      selectedTileIndex = to;

      function frame(now) {
        const elapsed = now - startedAt;
        activeTokenMove.progress = Math.min(1, elapsed / duration);
        render();

        if (activeTokenMove.progress < 1) {
          requestAnimationFrame(frame);
          return;
        }

        player.position = to;
        if (to === 0) crossedStart = true;
        remainingSteps -= 1;
        activeTokenMove = null;
        render();
        setTimeout(moveOneTile, 80);
      }

      requestAnimationFrame(frame);
    }

    moveOneTile();
  });
}

function endTurn() {
  if (!hasRolled) return;
  nextTurn();
  selectedTileIndex = getCurrentPlayer().position;
  render();
}

function getTilePosition(index) {
  const size = canvas.width;
  const margin = 112;
  const max = size - margin;
  const min = margin;
  const side = Math.floor(index / 6);
  const offset = index % 6;
  const t = offset / 6;

  if (side === 0) return { x: max - (max - min) * t, y: max, rotation: 0 };
  if (side === 1) return { x: min, y: max - (max - min) * t, rotation: Math.PI / 2 };
  if (side === 2) return { x: min + (max - min) * t, y: min, rotation: Math.PI };
  return { x: max, y: min + (max - min) * t, rotation: -Math.PI / 2 };
}

function drawIndonesiaSilhouette() {
  ctx.save();
  ctx.globalAlpha = 0.22;
  ctx.fillStyle = "#ffd15a";
  const islands = [
    [255, 585, 165, 46, -0.35],
    [410, 650, 245, 34, 0.08],
    [560, 475, 142, 112, -0.16],
    [690, 510, 122, 70, 0.2],
    [765, 663, 142, 34, 0.06],
    [855, 480, 172, 82, -0.12],
  ];
  islands.forEach(([x, y, w, h, rot]) => {
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.ellipse(0, 0, w / 2, h / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  });
  ctx.restore();
}

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const gradient = ctx.createLinearGradient(80, 80, 980, 980);
  gradient.addColorStop(0, "#0d6f76");
  gradient.addColorStop(0.55, "#17536a");
  gradient.addColorStop(1, "#9d3e38");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawIndonesiaSilhouette();

  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,.28)";
  ctx.lineWidth = 12;
  ctx.strokeRect(112, 112, 876, 876);
  ctx.restore();

  tiles.forEach((tile, index) => {
    const pos = getTilePosition(index);
    const type = tileTypes[tile.type];
    const owner = ownedTiles[index];
    ctx.save();
    ctx.translate(pos.x, pos.y);
    ctx.rotate(pos.rotation);
    ctx.fillStyle = selectedTileIndex === index ? "#fff7ec" : "rgba(255,255,255,.9)";
    ctx.strokeStyle = owner ? players[owner.player].color : "rgba(16,32,43,.2)";
    ctx.lineWidth = owner ? 6 : 2;
    roundRect(ctx, -58, -42, 116, 84, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = type.color;
    roundRect(ctx, -58, -42, 116, 16, 8);
    ctx.fill();
    ctx.fillStyle = "#10202b";
    ctx.font = "800 13px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(shortName(tile.name), 0, -2);
    ctx.font = "700 11px Inter, sans-serif";
    ctx.fillStyle = "#5f6c73";
    ctx.fillText(type.label, 0, 18);
    if (owner) {
      ctx.fillStyle = players[owner.player].color;
      ctx.beginPath();
      ctx.arc(43, 28, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#10202b";
      ctx.font = "900 10px Inter, sans-serif";
      ctx.fillText(owner.level, 43, 32);
    }
    ctx.restore();
  });

  players.forEach((player, playerIndex) => {
    const pos = getPlayerDrawPosition(player, playerIndex);
    const angle = (Math.PI * 2 * playerIndex) / players.length;
    const x = pos.x + Math.cos(angle) * 31;
    const hop = activeTokenMove?.playerIndex === playerIndex ? Math.sin(activeTokenMove.progress * Math.PI) * 18 : 0;
    const y = pos.y + Math.sin(angle) * 31 - hop;
    ctx.save();
    ctx.fillStyle = player.color;
    ctx.strokeStyle = "#10202b";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    const icon = iconImages.get(player.icon);
    if (icon?.complete) {
      ctx.drawImage(icon, x - 10, y - 10, 20, 20);
    } else {
      ctx.fillStyle = "#10202b";
      ctx.font = "950 12px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(player.name[0], x, y + 4);
    }
    ctx.restore();
  });
}

function getPlayerDrawPosition(player, playerIndex) {
  if (!activeTokenMove || activeTokenMove.playerIndex !== playerIndex) {
    return getTilePosition(player.position);
  }

  const from = getTilePosition(activeTokenMove.from);
  const to = getTilePosition(activeTokenMove.to);
  const eased = easeInOutCubic(activeTokenMove.progress);
  return {
    x: from.x + (to.x - from.x) * eased,
    y: from.y + (to.y - from.y) * eased,
  };
}

function easeInOutCubic(value) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function roundRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.arcTo(x + width, y, x + width, y + height, radius);
  context.arcTo(x + width, y + height, x, y + height, radius);
  context.arcTo(x, y + height, x, y, radius);
  context.arcTo(x, y, x + width, y, radius);
  context.closePath();
}

function shortName(name) {
  if (name.length <= 15) return name;
  return `${name.slice(0, 13)}...`;
}

function renderPlayers() {
  playersList.innerHTML = "";
  players.forEach((player, index) => {
    const card = document.createElement("article");
    card.className = `player-card ${index === currentPlayerIndex ? "active" : ""}`;
    card.innerHTML = `
      <span class="player-token-dot" style="background:${player.color}">
        <img src="icon/${player.icon}" alt="" />
      </span>
      <span>
        <span class="player-name">${escapeHtml(player.name)}</span>
        <span class="player-role">${player.role}</span>
      </span>
      <span class="player-cash">${formatRp(player.cash)}</span>
    `;
    playersList.append(card);
  });
}

function renderTileDetails() {
  const tile = tiles[selectedTileIndex];
  const ownership = ownedTiles[selectedTileIndex];
  const type = tileTypes[tile.type];
  const owner = ownership ? players[ownership.player] : null;
  const levelNames = ["Kosong", "UMKM", "Mall", "Kawasan Bisnis", "Smart City", "Mega Metropolitan"];
  const rent = tile.price ? getRent(tile, owner || getCurrentPlayer()) : 0;
  const parkingFundText =
    tile.type === "parking" ? `<span class="stat-pill">Dana ${formatRp(freeParkingFund)}</span>` : "";

  tileDetails.innerHTML = `
    <div>
      <div class="tile-name">${tile.name}</div>
      <div class="tile-meta">${type.label}${tile.region ? ` - ${tile.region}` : ""}</div>
    </div>
    <div class="tile-price">
      ${tile.price ? `<span class="stat-pill">Harga ${formatRp(tile.price)}</span>` : ""}
      ${tile.rent ? `<span class="stat-pill">Pendapatan ${formatRp(rent)}</span>` : ""}
      ${tile.upgrade ? `<span class="stat-pill">Upgrade ${formatRp(tile.upgrade)}</span>` : ""}
      ${parkingFundText}
    </div>
    <div class="tile-owner">${owner ? `Pemilik: ${owner.name} - ${levelNames[ownership.level]}` : "Belum dimiliki."}</div>
    <div class="tile-effect">${tile.effect || "Aset strategis yang bisa dibeli, ditingkatkan, dan dinegosiasikan."}</div>
  `;
  buyButton.disabled = !canBuy(tile);
  upgradeButton.disabled = !canUpgrade(tile);
}

function renderHeader() {
  const player = getCurrentPlayer();
  currentPlayerName.textContent = player.name;
  currentPlayerCash.textContent = formatRp(player.cash);
  rollButton.disabled = rolling || hasRolled;
  endTurnButton.disabled = rolling || !hasRolled;
}

function render() {
  if (!players) return;
  renderHeader();
  renderPlayers();
  renderTileDetails();
  drawBoard();
}

function renderSetupPlayers() {
  const count = Number(playerCountSelect.value);
  setupPlayers.innerHTML = "";
  for (let index = 0; index < count; index += 1) {
    const player = playersTemplate[index];
    const article = document.createElement("article");
    article.className = "setup-player";
    article.innerHTML = `
      <div class="setup-player-head">
        <label>
          <span>Nama Pemain ${index + 1}</span>
          <input name="player-name-${index}" value="${player.name}" maxlength="18" autocomplete="off" />
        </label>
        <div class="role-preview">
          <span>Role</span>
          <strong>${player.role}</strong>
        </div>
      </div>
      <div class="logo-grid">
        ${iconFiles
          .map(
            (file, iconIndex) => `
              <label class="logo-option" title="${getIconLabel(file)}">
                <input
                  type="radio"
                  name="player-icon-${index}"
                  value="${file}"
                  ${iconIndex === index ? "checked" : ""}
                />
                <span><img src="icon/${file}" alt="${getIconLabel(file)}" /></span>
              </label>
            `,
          )
          .join("")}
      </div>
    `;
    setupPlayers.append(article);
  }
}

function getIconLabel(file) {
  return file.replace("-svgrepo-com.svg", "").replaceAll("-", " ");
}

function collectSetupPlayers() {
  const count = Number(playerCountSelect.value);
  return Array.from({ length: count }, (_, index) => {
    const template = playersTemplate[index];
    const nameInput = setupForm.elements[`player-name-${index}`];
    const iconInput = setupForm.elements[`player-icon-${index}`];
    const name = nameInput.value.trim() || `Pemain ${index + 1}`;
    return {
      ...template,
      name,
      icon: iconInput.value,
    };
  });
}

canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const scale = canvas.width / rect.width;
  const x = (event.clientX - rect.left) * scale;
  const y = (event.clientY - rect.top) * scale;
  let closest = 0;
  let closestDistance = Infinity;
  tiles.forEach((_, index) => {
    const pos = getTilePosition(index);
    const distance = Math.hypot(pos.x - x, pos.y - y);
    if (distance < closestDistance) {
      closest = index;
      closestDistance = distance;
    }
  });
  if (closestDistance < 76) {
    selectedTileIndex = closest;
    render();
  }
});

rollButton.addEventListener("click", rollDice);
endTurnButton.addEventListener("click", endTurn);
newGameButton.addEventListener("click", showSetup);
buyButton.addEventListener("click", buyCurrentTile);
upgradeButton.addEventListener("click", upgradeCurrentTile);
playerCountSelect.addEventListener("change", renderSetupPlayers);
setupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  startGame(collectSetupPlayers());
});

showSetup();

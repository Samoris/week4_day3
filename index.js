const logDiv = document.getElementById("log");

function log(message) {
  console.log(message);
  logDiv.textContent += message + "\n";
  logDiv.scrollTop = logDiv.scrollHeight;
}

/* =========================
   CHARACTER BASE CLASS
========================= */

class Character {
  constructor(name, hp, dmg, mana) {
    this.name = name;
    this.hp = hp;
    this.dmg = dmg;
    this.mana = mana;
    this.status = "playing";
    this.shield = false;
  }

  takeDamage(amount) {
    if (this.shield) {
      log(`${this.name} blocks all damage!`);
      this.shield = false;
      return;
    }

    this.hp -= amount;

    if (this.hp <= 0) {
      this.hp = 0;
      this.status = "loser";
      log(`${this.name} has been killed 💀`);
    }
  }

  dealDamage(target) {
    if (this.status !== "playing" || target.status !== "playing") return;

    log(`${this.name} attacks ${target.name} for ${this.dmg} damage`);
    target.takeDamage(this.dmg);

    if (target.status === "loser") {
      this.mana += 20;
      log(`${this.name} gains 20 mana 🪄`);
    }
  }
}

/* =========================
   CLASSES
========================= */

class Fighter extends Character {
  constructor(name) {
    super(name, 12, 4, 40);
  }

  darkVision(target) {
    if (this.mana < 20) return this.dealDamage(target);
    this.mana -= 20;
    log(`${this.name} uses Dark Vision`);
    target.takeDamage(5);
    this.shield = true;
  }
}

class Paladin extends Character {
  constructor(name) {
    super(name, 16, 3, 160);
  }

  healingLighting(target) {
    if (this.mana < 40) return this.dealDamage(target);
    this.mana -= 40;
    log(`${this.name} uses Healing Lighting`);
    target.takeDamage(4);
    this.hp += 5;
  }
}

class Monk extends Character {
  constructor(name) {
    super(name, 8, 2, 200);
  }

  heal() {
    if (this.mana < 25) return;
    this.mana -= 25;
    this.hp += 8;
    log(`${this.name} heals himself (+8 HP)`);
  }
}

class Berzerker extends Character {
  constructor(name) {
    super(name, 8, 4, 0);
  }

  rage() {
    this.dmg += 1;
    this.hp -= 1;
    log(`${this.name} uses Rage (+1 dmg, -1 HP)`);

    if (this.hp <= 0) {
      this.hp = 0;
      this.status = "loser";
    }
  }
}

class Assassin extends Character {
  constructor(name) {
    super(name, 6, 6, 20);
  }

  shadowHit(target) {
    if (this.mana < 20) return this.dealDamage(target);
    this.mana -= 20;
    this.shield = true;
    log(`${this.name} uses Shadow Hit`);
    target.takeDamage(7);

    if (target.status !== "loser") {
      this.takeDamage(7);
    }
  }
}

/* =========================
   GAME CLASS
========================= */

class Game {
  constructor() {
    this.turnLeft = 10;
    this.turn = 1;
    this.started = false;

    this.players = [
      new Fighter("Grace"),
      new Paladin("Ulder"),
      new Monk("Moana"),
      new Berzerker("Draven"),
      new Assassin("Carl"),
    ];
  }

  startGame() {
    if (this.started) return;
    this.started = true;
    log("🔥 Game started!");
    log(`🕒 Turn ${this.turn}`);
  }

  nextTurn() {
    if (!this.started) {
      log("⚠️ Start the game first!");
      return;
    }

    if (this.turnLeft <= 0 || this.alivePlayers().length <= 1) {
      this.endGame();
      return;
    }

    let order = this.shuffle(this.alivePlayers());

    for (let player of order) {
      log(`➡️ ${player.name}'s turn`);

      let enemies = this.alivePlayers().filter(p => p !== player);
      if (enemies.length === 0) break;

      let target = enemies[Math.floor(Math.random() * enemies.length)];

      if (player instanceof Monk && player.hp <= 4) {
        player.heal();
      } else if (player instanceof Fighter && player.mana >= 20) {
        player.darkVision(target);
      } else if (player instanceof Paladin && player.mana >= 40) {
        player.healingLighting(target);
      } else if (player instanceof Berzerker) {
        player.rage();
      } else if (player instanceof Assassin && player.mana >= 20) {
        player.shadowHit(target);
      } else {
        player.dealDamage(target);
      }
    }

    this.watchStats();

    this.turn++;
    this.turnLeft--;

    log(`🕒 Turn ${this.turn}`);
  }

  alivePlayers() {
    return this.players.filter(p => p.status === "playing");
  }

  shuffle(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  watchStats() {
    log("\n📊 Stats:");
    this.players.forEach(p => {
      log(`${p.name} | HP: ${p.hp} | Mana: ${p.mana} | ${p.status}`);
    });
    log("");
  }

  endGame() {
    let alive = this.alivePlayers();

    if (alive.length === 1) {
      alive[0].status = "winner";
      log(`🏆 ${alive[0].name} wins the game!`);
    } else {
      alive.forEach(p => (p.status = "winner"));
      log("🏆 Game over — multiple winners!");
    }

    this.started = false;
  }
}

const game = new Game();

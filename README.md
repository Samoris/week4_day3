# 🗡️ RPG Gladiator Game (JavaScript OOP)

This project is a **turn-based RPG game** built in **vanilla JavaScript** using **ES6 classes** and **Object-Oriented Programming (OOP)** principles.

Five characters fight in a gladiator-style arena. Each character belongs to a different class with unique stats and special abilities. The game is played **turn by turn** via a simple HTML interface.

---

## 🎯 Project Goals

- Practice **ES6 classes & inheritance**
- Apply **OOP concepts** (encapsulation, polymorphism)
- Build a **turn-based game system**
- Display game progress in the **browser console & UI**

---

## 🗂 Project Structure

```
rpg-gladiator-game/
│
├── index.html      # Main HTML interface
├── index.js         # Game logic (characters, classes, turns)
└── README.md       # Project documentation
```



---

## ⚔️ Characters & Classes

Each character has:
- **HP** (health points)
- **DMG** (damage)
- **Mana**
- **Status** (`playing`, `loser`, `winner`)

If a character’s HP reaches **0**, they are eliminated.  
When a character kills another, they **gain 20 mana**.

---

## 🧙‍♂️ Available Classes

| Class      | HP | DMG | Mana | Special Ability |
|------------|----|-----|------|-----------------|
| Fighter    | 12 | 4   | 40   | Dark Vision (damage + shield) |
| Paladin   | 16 | 3   | 160  | Healing Lighting |
| Monk      | 8  | 2   | 200  | Heal |
| Berzerker | 8  | 4   | 0    | Rage (permanent dmg boost) |
| Assassin  | 6  | 6   | 20   | Shadow Hit |

---

## 🧑‍🤝‍🧑 Characters in Game

- **Grace** → Fighter  
- **Ulder** → Paladin  
- **Moana** → Monk  
- **Draven** → Berzerker  
- **Carl** → Assassin  

---

## 🎮 Game Rules

- The game lasts **up to 10 turns**
- Each turn:
  - Characters play in a **random order**
  - Each character attacks or uses a special ability
- The game ends when:
  - Only **one character is alive**, or
  - **10 turns** have passed
- The character with the **highest remaining HP** wins

---

## 🖥 Interface & Controls

The game runs in the browser using a simple UI.

### Buttons

- **Start Game** – Initializes the game
- **Next Turn** – Plays exactly one turn
- **Watch Stats** – Displays all characters’ stats

All actions and events are logged in:
- The **browser console**
- The **on-page log panel**

---

## ▶️ How to Run the Game

1. Download or clone the project
2. Open `index.html` in a web browser
3. Click **Start Game**
4. Click **Next Turn** to advance the game turn by turn

No installation or dependencies required.

---

## 🧠 Technical Notes

- Uses **ES6 classes and inheritance**
- No blocking `while` loops for turns
- Turn-based logic handled via user interaction
- Easily extendable (items, UI, player input, etc.)

---

## 🚀 Possible Improvements

- Manual target selection
- Health bars & animations
- Automatic turns with timers
- Inventory & items
- Save / reset functionality

---

## 📜 License

This project is for **educational purposes only**.

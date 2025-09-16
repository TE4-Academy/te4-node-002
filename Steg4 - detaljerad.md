# Steg 4: Uppdatera server.js för POST-hantering

## Mål

Lära din server att ta emot och hantera formulärdata från kontaktsidan.

## Vad vi ska lägga till

Din nuvarande `server.js` kan bara hantera GET requests (hämta filer). Nu ska vi lägga till POST-hantering för formulärdata.

## Steg för steg

### 1. Förstå request-typer

```javascript
// Nuvarande kod hanterar bara GET (hämta filer)
// Vi behöver lägga till hantering för POST (skicka data)

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method; // <- NY: Kolla vilken typ av request

  // Här lägger vi till POST-hantering...
});
```

### 2. Lägg till POST-hantering FÖRE din befintliga kod

```javascript
// NYTT: Hantera POST requests
if (method === "POST" && url === "/submit-contact") {
  // Här hanterar vi formulärdata
  // Detta körs INNAN vi försöker läsa filer
}

// DIN BEFINTLIGA KOD för att läsa filer kommer EFTER
let filePath = path.join(__dirname, url === "/" ? "index.html" : url);
```

### 3. Läs POST-data (kommer i bitar)

POST-data kommer inte på en gång, utan i små "chunks" (bitar). Du måste samla ihop dem:

```javascript
if (method === "POST" && url === "/submit-contact") {
  let body = ""; // Tom sträng för att samla data

  req.on("data", (chunk) => {
    body += chunk.toString(); // Lägg till varje bit
  });

  req.on("end", () => {
    // Nu har vi all data - här bearbetar vi den
  });
}
```

### 4. Bearbeta JSON-data

Formulärdata kommer som JSON-sträng. Omvandla till JavaScript-objekt:

```javascript
req.on("end", () => {
  const contactData = JSON.parse(body); // JSON-sträng -> objekt
  saveContactData(contactData); // Spara till fil

  // Skicka svar tillbaka till webbläsaren
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ success: true }));
});
```

### 5. Skapa saveContactData-funktionen

Lägg till denna funktion UTANFÖR server.createServer():

```javascript
function saveContactData(data) {
  // 1. Bestäm var data ska sparas
  // 2. Skapa mapp om den inte finns
  // 3. Läs befintlig data (om fil finns)
  // 4. Lägg till ny data
  // 5. Spara tillbaka till fil
}
```

## Komplett struktur

Din `server.js` ska ha denna struktur:

```javascript
// Imports längst upp
import http from "http";
import fs from "fs";
// ... etc

// Server-funktionen
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  // 1. FÖRST: Hantera POST requests
  if (method === "POST" && url === "/submit-contact") {
    // POST-hantering här
    return; // VIKTIGT: Avsluta funktionen här
  }

  // 2. SEDAN: Hantera GET requests (din befintliga kod)
  let filePath = path.join(__dirname, url === "/" ? "index.html" : url);
  // ... resten av din befintliga kod
});

// saveContactData-funktionen UTANFÖR server.createServer
function saveContactData(data) {
  // Spara-logik här
}

// Starta servern
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
```

## Viktiga detaljer

### Content-Type headers

Berätta för webbläsaren vad du skickar:

```javascript
res.writeHead(200, { "Content-Type": "application/json" }); // För JSON
res.writeHead(200, { "Content-Type": "text/css" }); // För CSS
```

### Mappar och filer

```javascript
const dataDir = path.join(__dirname, "data"); // Skapa sökväg till data-mapp
const filePath = path.join(dataDir, "contacts.json"); // Skapa sökväg till fil

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir); // Skapa mapp om den inte finns
}
```

### JSON array-hantering

```javascript
let contacts = []; // Tom array först

if (fs.existsSync(filePath)) {
  const fileContent = fs.readFileSync(filePath, "utf8");
  contacts = JSON.parse(fileContent); // Läs befintliga kontakter
}

contacts.push(data); // Lägg till ny kontakt

fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2)); // Spara tillbaka
```

## Testa din kod

1. Starta servern: `node server.js`
2. Öppna Developer Tools i webbläsaren (F12)
3. Gå till Network-fliken
4. Skicka formuläret
5. Se att POST request skickas till `/submit-contact`
6. Kontrollera att `data/contacts.json` skapas

## Felsökning

### Server kraschar?

- Kontrollera att du har `return;` efter POST-hanteringen
- Kolla att alla { } och () stämmer

### POST data kommer inte fram?

- Kontrollera att formuläret har `method="POST"`
- Se till att JavaScript använder rätt URL i fetch()

### JSON-fel?

- Använd `console.log(body)` för att se vad som kommer in
- Kontrollera att data är giltig JSON

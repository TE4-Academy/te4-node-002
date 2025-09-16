# Uppgift: Lägg till About, Contact och Formulärhantering

## Mål

Utöka din Node.js server med flera sidor och ett formulär som sparar data.

## Steg 1: Skapa About-sida

- [ ] Skapa `about.html` med information om projektet
- [ ] Lägg till navigation som länkar till alla sidor
- [ ] Använd samma CSS som index.html

## Steg 2: Skapa Contact-sida

- [ ] Skapa `contact.html` med ett formulär
- [ ] Formuläret ska ha: namn, email, meddelande
- [ ] Lägg till en "Skicka" knapp

## Steg 3: Uppdatera CSS

- [ ] Lägg till styling för navigation (bakgrund, padding)
- [ ] Styla formuläret (bakgrund, padding, input-fält)
- [ ] Lägg till hover-effekt på länkar

## Steg 4: Uppdatera server.js

- [ ] Lägg till hantering för POST requests till `/submit-contact`
- [ ] Läs formulärdata från request body
- [ ] Spara data till `data/contacts.json`
- [ ] Skicka tillbaka ett success-meddelande

## Steg 5: JavaScript för formulär

- [ ] Skapa `contact.js` för formulärhantering
- [ ] Förhindra vanlig form submit med `preventDefault()`
- [ ] Skicka data med `fetch()` till servern
- [ ] Visa bekräftelsemeddelande när det fungerar

## Tips

### Om File System (fs)

- `fs` är Node.js inbyggda modul för att hantera filer och mappar
- `fs.existsSync()` kollar om en fil/mapp finns (returnerar true/false)
- `fs.readFileSync()` läser innehållet från en fil
- `fs.writeFileSync()` skriver data till en fil (skapar filen om den inte finns)
- `fs.mkdirSync()` skapar en ny mapp

### Om JSON och Data

- JSON = JavaScript Object Notation (sätt att lagra data som text)
- `JSON.parse()` omvandlar JSON-text till JavaScript objekt
- `JSON.stringify()` omvandlar JavaScript objekt till JSON-text
- Vi sparar formulärdata som en array av objekt i JSON-filen
- Varje nytt meddelande läggs till i arrayen

### Om POST requests

- GET = hämta data från servern (vanliga webbsidor)
- POST = skicka data till servern (formulär)
- `req.method` berättar om det är GET eller POST
- `req.url` berättar vilken sida som begärs
- POST-data kommer i "bitar" via `req.on('data')` och `req.on('end')`

### Om fetch() i JavaScript

- `fetch()` skickar HTTP requests från webbläsaren till servern
- `preventDefault()` stoppar formulärets vanliga submit-beteende
- Du kan skicka JSON-data med `body: JSON.stringify(data)`
- Servern svarar med status (200 = OK, 404 = hittades inte, etc.)

### Grundläggande struktur

```
data/
└── contacts.json    <- Här sparas alla meddelanden

Workflow:
1. Användare fyller i formulär
2. JavaScript preventDefault() och fetch()
3. Server tar emot POST request
4. Server läser befintlig JSON-fil
5. Server lägger till nytt meddelande
6. Server sparar uppdaterad JSON-fil
```

## Testa

1. Starta servern
2. Navigera mellan sidorna
3. Skicka ett meddelande
4. Kontrollera att `data/contacts.json` skapas

## Resurser

- W3Schools Forms: https://www.w3schools.com/html/html_forms.asp
- W3Schools JSON: https://www.w3schools.com/js/js_json.asp
- Node.js fs: https://www.w3schools.com/nodejs/nodejs_filesystem.asp

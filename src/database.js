const sqlite3 = require('sqlite3').verbose();

// Connexion à la base de données SQLite
const db = new sqlite3.Database('./maBaseDeDonnees.sqlite', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
 if (err) {
   console.error(err.message);
 } else {
   console.log('Connecté à la base de données SQLite.');
   db.run(`CREATE TABLE IF NOT EXISTS personnes (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     nom TEXT NOT NULL,
     adresse TEXT,
     image BLOB
   )`, (err) => {
     if (err) {
       console.error(err.message);
     } else {
       // Insertion de données initiales avec adresses et images (BLOB)
       const personnes = [
         { nom: 'Bob', adresse: 'AdresseBob', image: 'base64encodedimage' },
         { nom: 'Alice', adresse: 'AdresseAlice', image: 'base64encodedimage' },
         { nom: 'Charlie', adresse: 'AdresseCharlie', image: 'base64encodedimage' }
       ];

       personnes.forEach(({ nom, adresse, image }) => {
         db.run(`INSERT INTO personnes (nom, adresse, image) VALUES (?, ?, ?)`, [nom, adresse, image]);
       });
     }
   });
 }
});

module.exports = db;

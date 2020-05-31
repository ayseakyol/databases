/*
  user input: table name, column name, search string, number of entries
  logged data: return a given number of rows matching the search parameter
*/

const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const DB_PATH = path.join(__dirname, "..", "chinook.sqlite");

const db = new sqlite3.Database(DB_PATH);

const userInput = {
  table: process.argv[2],
  column: process.argv[3],
  string: process.argv[4],
  numberOfEntries: process.argv[5],
};

const queryString = `
SELECT *
FROM ${userInput.table} 
WHERE ${userInput.column} = '${userInput.string}'
LIMIT ${userInput.numberOfEntries}`;

db.all(queryString, (err, rows) => {
  if (err) {
    console.error(err);
  } else {
    console.table(rows);
  }

  db.close();
});

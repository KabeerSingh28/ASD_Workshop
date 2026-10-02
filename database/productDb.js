const fs = require("fs").promises;
const path = require("path");
const filePath = path.join(__dirname, "..", "db.json");

async function readFileDelay() {
    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        let data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        throw err;
    }
}

async function writeFile(data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    } catch (err) {
        throw err;
    }
}

module.exports = {
    readFileDelay,
    writeFile
};

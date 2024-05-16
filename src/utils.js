const fs = require('fs');

async function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            const list = data.split('\n').filter(Boolean);
            resolve(list);
        });
    });
}

module.exports = {
    readFile
};

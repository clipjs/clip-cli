
const { readFile, writeFile } = require('fs');
const { promisify } = require('util')
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Log {

    constructor() {
        this.FILE = `${__dirname}/../clip.log`;
        this.TIME = 1000;
        this.ENCODED = 'utf8'

        this.clear();
    }

    async watching() {
        setInterval(async function(){
            const LEITURA_LOG = await readFileAsync(this.FILE, this.ENCODED);
            console.log(LEITURA_LOG);
        }, this.TIME);
    }

    async clear() { await writeFileAsync(this.FILE, '') }

}



module.exports = new Log();
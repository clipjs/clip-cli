
const { readFile, writeFile, createReadStream } = require('fs');


const { promisify } = require('util')
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Log {

    constructor() {
        this.FILE = `${__dirname}/../clip.log`;
        this.TIME = 1000;
        this.ENCODED = 'utf8';

        this.clear();
    }


    async readLog() {
        const LEITURA_LOG = await readFileAsync(this.FILE, this.ENCODED).catch(e => console.error(e));
        console.log(LEITURA_LOG);
    }

    async watching() {
        const self = this;
        setInterval(async function () { self.readLog() }, this.TIME);
    }

    async clear() { await writeFileAsync(this.FILE, '') }


}



module.exports = new Log();
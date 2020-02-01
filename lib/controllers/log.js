
const { readFile, writeFile, createReadStream } = require('fs');


const { promisify } = require('util')
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Log {

    constructor() {
        this.FILE = `${__dirname}/../clip.log`;
        this.TIME = 800;
        this.ENCODED = 'utf8';
        this.LOG;
        this.clear();
    }


    async readLog() {
        const LEITURA_LOG = await readFileAsync(this.FILE, this.ENCODED).catch(e => console.error(e));
        if (LEITURA_LOG) {

            if (this.LOG !== LEITURA_LOG)
                console.log(LEITURA_LOG);
                this.LOG = LEITURA_LOG;

        } else {
            console.log('Sem registros de log');
        }
    }

    async watching() {
        const self = this;
        setInterval(async function () { self.readLog() }, this.TIME);
    }

    async clear() { await writeFileAsync(this.FILE, '') }


}



module.exports = new Log();

const { readFile, writeFile, createReadStream } = require('fs');


const { promisify } = require('util')
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Log {

    constructor() {
        this.FILE = `${__dirname}/../clip.log`;
        this.TIME = 1000;
        this.ENCODED = 'utf8'

    }


    async readLog() {
        const LEITURA_LOG = await readFileAsync(this.FILE, this.ENCODED).catch(e => console.error(e));
        console.log(LEITURA_LOG);
    }

    async watching() {
        setInterval(this.readLog(), this.TIME);
       /*
        var data = '';
        var readStream = createReadStream(this.FILE, 'utf8');

        readStream.on('data', function(chunk) {
            data += chunk;
        }).on('end', function() {
            console.log(data);
        });
        */
    }

     async clear() { await writeFileAsync(this.FILE, '') }


}



module.exports = new Log();
const exec = require('child_process').exec;
const Log = require('./log');

class Run {
    constructor() {
        this.LOG = `${__dirname}/../clip.log`;
    }

    async start(scripts) {
        scripts.map(function (script) {
            exec(`cd ${script.diretorio} && ${script.comando} >> ${this.LOG}`, function (error, stdout, stderr) {
                if (error !== null) console.log(`exec error: ${error}\n`)
            })
        },this)
        
        Log.watching();
    }

}


module.exports = new Run()
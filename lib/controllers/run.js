const exec = require('child_process').exec;

class Run {
    constructor() {
        this.LOG = `${__dirname}/../clip.log`;
    }

    async start(scripts) {
        scripts.map(function (script) {
            exec(`cd ${script.diretorio} && ${script.comando} >> ${this.LOG}`, function (error, stdout, stderr) {
                if (error !== null) console.log(`exec error: ${error}\n`)
            })
        })
    }
}


module.exports = new Run()
const exec = require('child_process').exec;

class Run {
    constructor() {
        this.LOG = `${__dirname}/../clip.log`;
    }

    start = (scripts) => scripts.map(script => exec(`cd ${script.diretorio} && ${script.comando} >> ${this.LOG}`, (error, stdout, stderr) => {
        if (error !== null) console.log(`exec error: ${error}\n`)
    }))
}


module.exports = new Run()
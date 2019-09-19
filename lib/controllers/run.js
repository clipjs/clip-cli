const exec = require('child_process').exec;
const Log = require('./log');

class Run {
    constructor() {
        this.LOG = `${__dirname}/../clip.log`;
    }

    async openEditor(editor, diretorios) {
        diretorios.map(function (diretorio) {
            exec(`cd ${diretorio} && ${editor} .`, function (error, stdout, stderr) {
                if (error !== null) console.log(`exec error: ${error}\n`)
            })
        }, this)
    }

    async start(scripts, editor) {
        scripts.map(function (script) {
            exec(`cd ${script.diretorio} && ${script.comando} >> ${this.LOG}`, function (error, stdout, stderr) {
                if (error !== null) console.log(`exec error: ${error}\n`)
            })
        }, this)


        let diretorios = scripts.map(function (script) { return script.diretorio });
        diretorios = diretorios.filter(function (este, i) { return diretorios.indexOf(este) === i });

        await this.openEditor(editor, diretorios);
        await Log.watching();
    }

}


module.exports = new Run()
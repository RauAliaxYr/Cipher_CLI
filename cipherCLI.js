import * as fs from 'fs'
import stream from 'stream'
import {caesarShift} from './caesarAlg.js'
import {enAtbash} from "./AtbashAlg.js";


class Caesar extends stream.Transform {

    constructor(shift, opts = {}) {
        opts = Object.assign({}, opts, {decodeStrings: false})
        super(opts);
        this.shift = shift
    }

    _transform(chunk, encoding, callback) {
        if (encoding !== 'utf8') {
            this.emit('error', new Error())
            return callback()
        }
        this.push(caesarShift(chunk, this.shift))
        callback()
    }
}

class ROT_8 extends stream.Transform {

    constructor(shift, opts = {}) {
        opts = Object.assign({}, opts, {decodeStrings: false})
        super(opts);
        this.shift = shift
    }

    _transform(chunk, encoding, callback) {
        if (encoding !== 'utf8') {
            this.emit('error', new Error())
            return callback()
        }
        this.push(caesarShift(chunk, this.shift))
        callback()
    }
}

class Atbash extends stream.Transform {

    constructor(opts = {}) {
        opts = Object.assign({}, opts, {decodeStrings: false})
        super(opts);
    }

    _transform(chunk, encoding, callback) {
        if (encoding !== 'utf8') {
            this.emit('error', new Error('Wrong encoding!!! \n(Supported only utf8)'))
            return callback()
        }
        this.push(enAtbash(chunk))
        callback()
    }
}

function cipher(CipherModel) {


    let streams = addStreamsByConfig(CipherModel)

    let writeStream = createWriteStream(CipherModel)
    let readStream = createReadStream(CipherModel)

    createPipeline(readStream,writeStream,streams)

}

function createReadStream(CipherModel) {

    if (CipherModel.input === 'console') {
        return process.stdin
    } else {
        fs.access(CipherModel.input, function (error) {
            if (error) {
                process.stderr.write(error.message);
                process.exit(1)
            }
        })
        return fs.createReadStream(CipherModel.input, 'utf8')
    }
}

function createWriteStream(CipherModel) {
    if (CipherModel.output === 'console') {
        return  process.stdout
    } else {
        fs.access(CipherModel.output, function (error) {
            if (error) {
                process.stderr.write(error.message);
                process.exit(1)
            }
        })
        return  fs.createWriteStream(CipherModel.output, 'utf8')
    }
}

function addStreamsByConfig(CipherModel) {
    let streams =[]
    let args = CipherModel.config.split('-')

console.log(args)
    for (let arg of args) {
        if (arg[0] === 'C') {

            if (arg[1] === '1') {
                streams.push(new Caesar(1).setEncoding('utf8'))
            }
            else if (arg[1] === '0') {
                streams.push(new Caesar(-1).setEncoding('utf8'))
            } else {
                process.stderr.write("Wrong config parameter for " + arg[0] + " #" + arg[1] + "# ")
                process.exit(1)
            }
        } else if (arg[0] === 'R') {
            if (arg[1] === '1') {
                streams.push(new ROT_8(8).setEncoding('utf8'))
            }
            else if (arg[1] === '0') {
                streams.push(new ROT_8(-8).setEncoding('utf8'))
            } else {
                process.stderr.write("Wrong config parameter for " + arg[0] + " #" + arg[1] + "# ")
                process.exit(1)
            }


        } else if (arg[0] === 'A') {
            streams.push(new Atbash().setEncoding('utf8'))
        } else {
            process.stderr.write("Wrong config parameter " + arg[0])
            process.exit(1)
        }

    }
    return streams
}

function createPipeline(readStream, writeStream, streams) {
    stream.pipeline(
        readStream,
        ...streams,
        writeStream,
        (err) => {
            if (err) {
                console.error(err)
                process.exit(1)
            }
        }
    )
}


export {cipher}


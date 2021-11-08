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

function chip(CipherModel) {
    let readStream
    let writeStream

    if (CipherModel.input === 'console') {
        readStream = process.stdin.setEncoding('utf8')
    } else {
        readStream = fs.createReadStream(CipherModel.input, 'utf8')
    }
    if (CipherModel.output === 'console') {
        writeStream = process.stdout
    } else {
        writeStream = fs.createWriteStream(CipherModel.output, 'utf8')
    }


    let args = CipherModel.config.split('-')
    let streams = []

    for (let arg of args) {
        if (arg[0] === 'C') {

            if (arg[1] === '1') {
                streams.push(new Caesar(1).setEncoding('utf8'))
            }
            if (arg[1] === '0') {
                streams.push(new Caesar(-1).setEncoding('utf8'))
            }
        }
        if (arg[0] === 'R') {
            if (arg[1] === '1') {
                streams.push(new Caesar(8).setEncoding('utf8'))
            }
            if (arg[1] === '0') {
                streams.push(new Caesar(-8).setEncoding('utf8'))
            }
        }
        if (arg[0] === 'A') {
            streams.push(new Atbash().setEncoding('utf8'))
        } else {
            new Error("Wrong config parameter")
        }
    }

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


export {chip}


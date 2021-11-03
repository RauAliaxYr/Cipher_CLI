import {CipherModel} from "./model.js";

function argsService() {

    let config
    let input
    let output

    getValue('-c')
    if ((getValue('-c'))) {
        config = getValue('-c')
        if ((getValue('-i'))) {
            input = getValue('-i')
        } else input = 'console'
        if ((getValue('-o'))) {
            output = getValue('-o')
        } else output = 'console'
    } else {
        console.error("ERROR: Please check u config!\n(example: -c (--config) [pattern])")
        process.exit(1)
    }

    let model = new CipherModel(input, output, config)
    return model

}


function getValue(flag) {
    const flagIndex = process.argv.indexOf(flag);
    return flagIndex !== -1 ? process.argv[flagIndex + 1] : null;
}


export {argsService}
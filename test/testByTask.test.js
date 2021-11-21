import * as child_process from 'child_process'
import * as fs from 'fs'
import pkg from '@jest/globals'
const { afterEach, beforeEach, describe, expect } = pkg

const options = {
    cwd: process.cwd()
}

describe("tests by task", () => {
    beforeEach(() => {
        fs.writeFileSync('./input.txt', "This is secret. Message about \"_\" symbol!")
        fs.writeFileSync("./output.txt", "")
    })
    afterEach(() => {
        fs.unlinkSync('./input.txt')
        fs.unlinkSync("./output.txt")
    })

    test("first test", () => {
        child_process.execSync("node index -c \"C1-C1-R0-A\" -i \"./input.txt\" -o \"./output.txt", options)
        const result = fs.readFileSync("./output.txt", {encoding: 'utf-8'})
        expect(result).toBe("Myxn xn nbdobm. Tbnnfzb ferlm \"_\" nhteru!")
    })
    test("second test", () => {
            child_process.execSync("node index -c \"C1-C0-A-R1-R0-A-R0-R0-C1-A\" -i \"./input.txt\" -o \"./output.txt")
            const result = fs.readFileSync("./output.txt", {encoding: 'utf-8'})
            expect(result).toBe("Vhgw gw wkmxkv. Ckwwoik onauv \"_\" wqcnad!")
    })
    test("third test", () => {
        child_process.execSync("node index -c \"A-A-A-R1-R0-R0-R0-C1-C1-A\" -i \"./input.txt\" -o \"./output.txt", options)
        const result = fs.readFileSync("./output.txt", {encoding: 'utf-8'})
        expect(result).toBe("Hvwg wg gsqfsh. Asggous opcih \"_\" gmapcz!")
    })
    test("fourth test", () => {
        child_process.execSync("node index -c \"C1-R1-C0-C0-A-R0-R1-R1-A-C1\" -i \"./input.txt\" -o \"./output.txt", options)
        const result = fs.readFileSync("./output.txt", {encoding: 'utf-8'})
        expect(result).toBe("This is secret. Message about \"_\" symbol!")
    })
})
import {CipherModel} from '../src/model'
import {expect} from "@jest/globals"

test('model test', () => {
    let testModel = new CipherModel('asd','asd' ,'asd')
    expect(new CipherModel('asd','asd','asd')).toEqual(testModel)
})
// I dont know how
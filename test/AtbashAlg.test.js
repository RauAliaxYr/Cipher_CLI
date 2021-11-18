import {enAtbash} from '../src/AtbashAlg'
import {expect} from "@jest/globals"

test('atbash algorithm is working', () => {
    expect(enAtbash("aaaA---фыв")).toEqual("zzzZ---фыв")
})
test('return string', () => {
    const arg = 'aaa'
    expect(enAtbash(arg)).toBeDefined()
});
How to start

CLI tool should accept 3 options (short alias and full name):

1.  **-c, --config**: config for ciphers
Config is a string with pattern `{XY(-)}n`, where:
  * `X` is a cipher mark:
    * `C` is for Caesar cipher (with shift 1)
    * `A` is for Atbash cipher
    * `R` is for ROT-8 cipher
  * `Y` is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
    * `1` is for encoding
    * `0` is for decoding
2.  **-i, --input**: a path to input file
3.  **-o, --output**: a path to output file

For example, config `"C1-C1-R0-A"` means "encode by Caesar cipher => encode by Caesar cipher => decode by ROT-8 => use Atbash"
s "encode by Caesar cipher => encode by Caesar cipher => decode by ROT-8 => use Atbash"

Examples:
node index -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"
```bash
> input.txt
> `This is secret. Message about "_" symbol!`
> output.txt
> `Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!`
```

node index -c "C1-C0-A-R1-R0-A-R0-R0-C1-A" -i "./input.txt" -o "./output.txt"
```bash
> input.txt
> `This is secret. Message about "_" symbol!`
> output.txt
> `Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!`
```

For testing

First of all u need
```bash
> npm install
```
Start tests
```bash
> npm test
```
Test coverage
```bash
> jest --coverage
```
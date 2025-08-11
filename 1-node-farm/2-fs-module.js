//* = for heading
//! = for subheading


const Fs = require('fs') // this 'fs' module use to read and write data, fs stands for file system 
// [const FS = require('fs') ] like this u can import any module

//*Reading  file
//!syntax:
// fs.readFileSync(path, options);
//!parameters
//path = a path to the file you want to read.
//options =  An object or string that specifies the encoding and flag. If not provided, it defaults to null for encoding (returning a buffer) and 'r' for the flag (open for reading).
//!code
const Read = Fs.readFileSync('./starter/txt/input.txt','utf-8');
console.log(Read);

// ---------------------------------------------------------------------

//*writing file
//!syntax//
// fs.writeFileSync(file, data, options)

// !Parameters:
// 1)file (string | Buffer | URL | integer)
// Path to the file(path to create a output file).

// 2)data (string | Buffer | TypedArray | DataView)
// The data you want to write.

// 3)options (optional) (string | object)
// Can be an object or a string specifying the encoding, mode, and flag:
// encoding (default: 'utf8')
// mode (default: 0o666)
// flag (default: 'w' - write and truncate)
//!code
const textOut = "'writing the file'"
 Fs.writeFileSync('./starter/txt/output.txt',textOut)

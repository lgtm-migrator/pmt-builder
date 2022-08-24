var varint = require('varint')
var bytes = varint.encode(38);
 bytes = varint.encode(38, bytes, 4);

console.log("bytes ", Buffer.from(bytes).toString('hex')); // 2600000026


web3.utils.toHex('38'); // 0x26
web3.utils.padLeft('0x26', 10); // 0x0000000026

// console.log("leaves ", leaves.length); // 6, 38
// console.log("leaves 16 ", leaves.length.toString(16)); // 6, 26
// console.log("lpad ", lpad(leaves.length.toString(16), 2)); // 06, 26

// console.log("hashes ", hashes.length); // 6, 38 decimal
// console.log("hashes 16 ", hashes.length.toString(16)); // 6, 26 hex
// console.log("lpad ", lpad(hashes.length.toString(16), 8)); // 00000006, 00000026


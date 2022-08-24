const sha256 = require('bitcoinjs-lib').crypto.hash256;

const lpad = (number, length) => number.toString().padStart(length, '0');

const reverseHex = (hexString) => Buffer.from(hexString, 'hex').reverse().toString('hex');

/**
 * @returns Hex format of the number with a left padding using zeros '0'
 */
function formatHex(number, len) {
    let hexString = number.toString(16);
    while (hexString.length < len) {
        hexString = '0' + hexString;
    }
    return hexString;
}

const combineLeftAndRight = (left, right) => {
    const bufLeft = Buffer.from(left, 'hex');
    const bufRight = Buffer.from(right, 'hex');
    bufLeft.reverse();
    bufRight.reverse();

    const bufCombined = Buffer.concat([bufLeft,bufRight]);
    const bufHashed = sha256(sha256(bufCombined));
    bufHashed.reverse();
    return bufHashed.toString('hex');
};

const buildPMT = (leaves, filteredHash) => {
    const matches = [];
    let filteredInLeaves = false;

    for (const hash of leaves) {
        if (filteredHash == hash) {
            filteredInLeaves = true;
            matches.push(1);
        } else {
            // Although this doesn't make much sense, setting this to 0 produces a PMT that doesn't compute the right merkle root
            // TODO: investigate why we need to push a 1 here instead of a 0
            matches.push(1);
        }
    }

    if (!filteredInLeaves) {
        throw new Error('Filtered hash provided is not part of the leaves');
    }

    const bits = [];
    const hashes = [];
    let height = 0;

    const width = (height) => {
        return (leaves.length + (1 << height) - 1) >>> height;
    };

    const hash = (height, pos, leaves) => {
        if (height === 0)
            return leaves[pos];
    
        const left = hash(height - 1, pos * 2, leaves);
        let right;
    
        if (pos * 2 + 1 < width(height - 1))
            right = hash(height - 1, pos * 2 + 1, leaves);
        else
            right = left;
    
        return combineLeftAndRight(left, right);
    };
    
    const traverse = (height, pos, leaves, matches) => {
        let parent = 0;
        
        for (let p = pos << height; p < ((pos + 1) << height) && p < leaves.length; p++)
            parent |= matches[p];
        
        bits.push(parent);
        
        if (height === 0 || !parent) {
            hashes.push(hash(height, pos, leaves));
            return;
        }
        
        traverse(height - 1, pos * 2, leaves, matches);
        
        if (pos * 2 + 1 < width(height - 1))
            traverse(height - 1, pos * 2 + 1, leaves, matches);
    };
        
    while (width(height) > 1) {
        height += 1;
    }

    if (leaves.length > 1) {
        traverse(height, 0, leaves, matches);
    } else {
        // If there is only one hash, use that hash as the only value without performing any other operation
        hashes.push(reverseHex(filteredHash));
        bits.push(1);
    }

    const flags = Buffer.allocUnsafe((bits.length + 7) / 8 | 0);
    flags.fill(0);

    for (let p = 0; p < bits.length; p++)
        flags[p / 8 | 0] |= bits[p] << (p % 8);

    return {
        totalTX : leaves.length,
        hashes : hashes,
        flags : parseInt(flags.toString('hex'), 16),
        hex: `${formatHex(leaves.length, 2)}${formatHex(hashes.length, 8)}${hashes.map(reverseHex).join('')}${formatHex(flags.length, 2)}${flags.toString('hex')}`
    };
};

module.exports = { buildPMT };

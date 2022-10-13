/**
  * 
  * @param leaves array of transaction hashes in a block
  * @param filteredHash transaction hash
  */
export function buildPMT(leaves: string[], filteredHash: string): { totalTX: number, hashes: string[], flags: number, hex: string }

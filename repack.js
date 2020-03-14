function repack(inDigits, inBases, outBases) {
  var digits = inDigits.slice(0),
    digitsLeft = digits.length,
    result = [],
    inPos = 0,
    outPos = 0,
    remainder,
    inBase,
    outBase,
    maxBase = 94906265;
  while (digitsLeft) {
    remainder = 0;
    inBase = inBases[inBases.length - 1];
    outBase = Math.min(
      Math.max(outBases[outPos] || outBase, 2), 
      maxBase
    );
    for (inPos = digitsLeft - 1; inPos >= 0; inPos--) {
      inBase = Math.min(
        Math.max(inBases[inPos] || inBase, 2), 
        maxBase
      );
      remainder = +digits[inPos] + remainder * inBase;
      digits[inPos] = Math.floor(remainder / outBase);
      remainder -= digits[inPos] * outBase;
      if (digitsLeft == inPos + 1 && digits[inPos] == 0) {
        digitsLeft--;
      }
    }
    result[outPos++] = remainder;
  }
  while (result.length < outBases.length) {
    result.push(0);
  }
  return result;
}

function repack_msd(a, b, c) {
  return pack(
    a.slice().reverse(),
    b.slice().reverse(),
    c.slice().reverse()
  ).reverse();
}

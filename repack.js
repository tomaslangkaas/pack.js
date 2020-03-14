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
    outBase = outBases[outPos] || outBase;
    if (outBase > maxBase) {
      outBase = maxBase;
    }
    inBase = inBases[inBases.length - 1];
    for (inPos = digitsLeft - 1; inPos >= 0; inPos--) {
      inBase = inBases[inPos] || inBase;
      if (inBase > maxBase) {
        inBase = maxBase;
      }
      remainder = +digits[inPos] + remainder * inBase;
      digits[inPos] = Math.floor(remainder / outBase);
      remainder -= digits[inPos] * outBase;
      if (digitsLeft == inPos + 1 && digits[inPos] == 0) {
        digitsLeft--;
      }
    }
    result[outPos++] = remainder;
  }
  return result;
}

function repack_msd(a, b, c) {
  return repack(
    a.slice().reverse(),
    b.slice().reverse(),
    c.slice().reverse()
  ).reverse();
}

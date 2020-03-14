# repack.js
Conversion of arbitrarily large mixed base integers in JavaScript

```javascript
repack(mixedBaseValues, inputBases, outputBases)
```

* Accepts large mixed base integers represented as arrays, least significant value first
* The convenience wrapper `repack_msd()` accepts input arrays with most significant value first
* Accepts bases in the range 1&ndash;94906265
* Converts directly from one mixed base to another

## Example 1: Mixed base conversion

Converting 372 hours, 34 minutes, and 15 seconds to days and seconds:

> 372<sub>&infin;</sub>34<sub>60</sub>15<sub>60</sub> = 15<sub>&infin;</sub>45255<sub>86400</sub>

This gives 15 days and 45255 seconds, or about 15.5 days.

```javascript
repack(
  [15, 34, 372], 
  [60, 60, Infinity], 
  [86400, Infinity]
);
> [45255, 15]

repack_msd(
  [372, 34, 15], 
  [Infinity, 60, 60], 
  [Infinity, 86400]
);
> [15, 45255]
```
## Example 2: Normal base conversion

Converting a large integer from one base to another (base 2 to base 9):

> 11101110010000111110010011100000011011011011011100011110111100010101110<sub>2</sub> = 22067434162858645566804<sub>9</sub>

```javascript
repack(
  "11101110010000111110010011100000011011011011011100011110111100010101110"
    .split("")
    .reverse(),
  [2],
  [9]
);
> [4, 0, 8, 6, 6, 5, 5, 4, 6, 8, 5, 8,
   2, 6, 1, 4, 3, 4, 7, 6, 0, 2, 2]
   
repack_msd(
  "11101110010000111110010011100000011011011011011100011110111100010101110".split(""),
  [2],
  [9]
);
> [2, 2, 0, 6, 7, 4, 3, 4, 1, 6, 2, 8, 
   5, 8, 6, 4, 5, 5, 6, 6, 8, 0, 4]
```

## Example 3: Storing configuration data

A configuration has five settings. Setting *a* has five levels, setting *b* has ten levels, setting *c* and *d* have eleven levels, and setting *e* has nine levels. We want to store the settings efficiently as an array of bytes. We can treat the settings as a mixed base integer, *a*<sub>5</sub>*b*<sub>10</sub>*c*<sub>11</sub>*d*<sub>11</sub>*e*<sub>9</sub>, then convert it to base 256.


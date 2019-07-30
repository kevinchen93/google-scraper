/*
`Mode 2`: output all the lines from input.txt that contain a match from patterns.txt somewhere in the line.

`input.txt`

Hello.  This is line 1 of text.
and this is another.
line 3 here
the end


`patterns.txt`

the end
matches
line 3
and this is anoother.

`Mode 2 outputs:`

line 3 here
the end
*/
const fs = require('fs');

const isPartialMatch = (a, b) => a.includes(b);

fs.readFile('./inputs.txt', (error, inputData) => {
  if (error) throw error;
  const inputArray = inputData.toString().split('\n');
  fs.readFile('./patterns.txt', (error, patternData) => {
    if (error) throw error;
    const patternArray = patternData.toString().split('\n');
    const partialMatches = [];

    for (const input of inputArray) {
      for (const pattern of patternArray) {
        if (input.indexOf(pattern) > -1) partialMatches.push(input);
      }
    }

    console.log(`Partial Matches:\n${partialMatches.join('\n')}`);
  });
});
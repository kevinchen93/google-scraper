/*
Mode 1: output all the lines from input.txt that match exactly any pattern in patterns.txt

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


`Mode 1 outputs:`

the end
*/
const fs = require('fs');

const isExactMatch = (a, b) => a === b;

fs.readFile('./inputs.txt', (error, inputData) => {
  if (error) throw error;
  const inputArray = inputData.toString().split('\n');
  fs.readFile('./patterns.txt', (error, patternData) => {
    if (error) throw error;
    const patternArray = patternData.toString().split('\n');

    const exactMatches = [];

    for (const input of inputArray) {
      for (const pattern of patternArray) {
        if (input === pattern) exactMatches.push(input);
      }
    }

    console.log(`Exact Matches:\n${exactMatches.join('\n')}`);
  });
});
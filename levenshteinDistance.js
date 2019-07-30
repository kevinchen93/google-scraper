/*
`Mode 3`: output all the lines from input.txt that contain a match with edit distance <= 1 patterns.txt

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

`Mode 3 outputs:`

and this is another.  
the end  

*/
const fs = require('fs');

const calculateLevenshteinDistance = (a, b) => {
  const aLen = a.length;
  const bLen = b.length;
  const distanceMatrix = Array(bLen + 1).fill(null).map(() => Array(aLen + 1).fill(null));

  for (let i = 0; i <= aLen; i++) {
    distanceMatrix[0][i] = i;
  }

  for (let j = 0; j <= bLen; j++) {
    distanceMatrix[j][0] = j;
  }

  for (let j = 1; j <= bLen; j++) {
    for (let i = 1; i <= aLen; i++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      distanceMatrix[j][i] = Math.min(
        distanceMatrix[j][i - 1] + 1,
        distanceMatrix[j - 1][i] + 1,
        distanceMatrix[j - 1][i - 1] + cost,
      );
    }
  }

  return distanceMatrix[bLen][aLen];
}

fs.readFile('./inputs.txt', (error, inputData) => {
  if (error) throw error;
  const inputArray = inputData.toString().split('\n');
  fs.readFile('./patterns.txt', (error, patternData) => {
    if (error) throw error;
    const patternArray = patternData.toString().split('\n');

    const editDistanceMatches = [];

    for (const input of inputArray) {
      for (const pattern of patternArray) {
        if (calculateLevenshteinDistance(input, pattern) <= 1) editDistanceMatches.push(input);
      }
    }

    console.log(`Edit Distance (<= 1) Matches:\n${editDistanceMatches.join('\n')}`);
  });
});
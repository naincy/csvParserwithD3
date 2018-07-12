const fs = require('fs');
const lr = require('readline');
const fstream = fs.createReadStream('assets/Crimes_backup.csv', 'UTF-8');
const freadLine = lr.createInterface({
  input: fstream,
});
const ftstream = fs.createWriteStream('assets/theft.json', {
  flags: 'a',
});
const fastream = fs.createWriteStream('assets/assault.json', {
  flags: 'a',
});
let i = 0;
let j = 0;
let headers = []; 
const theftData = {}; 
const assaultData = {}; 
const yearRange = {
  start: 2001,
  end: 2018,
};

function processAssault(data) {
  j += 1;
  if (j % 100000 === 0) {
    process.stdout.write('assault');
  }
  const yr = data.Year;
  if (yr >= yearRange.start && yr <= yearRange.end) {
    if (!assaultData[yr]) {
      assaultData[yr] = {
        arrestCount: 0,
        nonArrestCount: 0,
        year: yr,
      };
    }
    if (data.Arrest === 'false') {
      assaultData[yr].nonArrestCount += 1;
    } else {
      assaultData[yr].arrestCount += 1;
    }
  }
}

function processTheft(data) {
  i += 1;
  if (i % 100000 === 0) {
    process.stdout.write('theft');
  }
  const yr = data.Year;
  if (yr >= yearRange.start && yr <= yearRange.end) {
    if (!theftData[yr]) {
      theftData[yr] = {
        over500: 0,
        under500: 0,
        year: yr,
      };
    }
    if (data.Description == '$500 AND UNDER') {
      theftData[yr].under500 += 1;
    } else if (data.Description == 'OVER $500') {
      theftData[yr].over500 += 1;
    }
  }
}

freadLine.on('line', (input) => {
  i += 1;
  if (i === 1) {
    headers = input.split(',');
  } else {
    freadLine.pause();
    const dobj = {};
    const dataEl = input.split(',');
    for (let j = 0; j < headers.length; j += 1) {
      dobj[headers[j]] = dataEl[j];
    }
    if (dobj['Primary Type'] === 'THEFT') {
      processTheft(dobj);
    }
    if (dobj['Primary Type'] === 'ASSAULT') {
      processAssault(dobj);
    }
    freadLine.resume();
  }
});


freadLine.on('close', () => {
  ftstream.on('finish', () => {
    ftstream.close();
  });

  ftstream.write(JSON.stringify(theftData));
  fastream.on('finish', () => {
    fastream.close();
  });

  fastream.write(JSON.stringify(assaultData));
});
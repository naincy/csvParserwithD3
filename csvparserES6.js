const fs = require('fs');
let jsonData = [];
var readCSVFile = async function (file) {
    return new Promise(resolve => {
      let header, rowData = [];
      const stream = fs.createReadStream(file, {encoding: 'utf8'});
      stream.pipe(split());
      stream.on('data', data => {
        rowData = data.split("\n");

        // Get first row for column headers
        header = rowData.shift().split(",");

        rowData.forEach(function(d){
            // Loop through each row
            tmp = {}
            row = d.split(",")
            for(var i = 0; i < header.length; i++){
                tmp[header[i]] = row[i];
            }
            // Add object to list
            jsonData.push(tmp);
        });
        stream.destroy();
      });
      stream.on('end', () => {
        //console.log(header);
        console.log('Promise done');
        resolve();
      });
      console.log('Data Ready');
    },
    reject => {
        console.log('error in promise');
        reject();
    });
}
var reader = async function(file) {
    await readCSVFile(file);
    console.log('all Done');
}

var pi = 3.14;
module.exports.reader = reader ;
module.exports.bi = pi;
module.exports.jsonData = jsonData;

//startReader(filename);
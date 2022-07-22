const config = require('./config.json');
const fs = require('fs');
const path = require('path');
const Storage = require('@google-cloud/storage');

const serviceAccount = String(Buffer.from(process.env.GCP_SERVICE_ACCOUNT, 'base64'));

fs.writeFile('./service_account.json', serviceAccount, (err) => {
  if (err) {
    console.log(err);
    throw err;
  }

  // Instantiates a client
  const storage = Storage({
    projectId: config.PROJECT_ID,
    keyFilename: './service_account.json',
  });

  let walk = (dir, done) => {
    let results = [];
    fs.readdir(dir, (err, list) => {
      if (err) return done(err);
      let i = 0;
      (function next() {
        let file = list[i++];
        if (!file) return done(null, results);
        file = dir + '/' + file;
        fs.stat(file, (err, stat) => {
          if (stat && stat.isDirectory()) {
            walk(file, (err, res) => {
              results = results.concat(res);
              next();
            });
          } else {
            results.push(file);
            next();
          }
        });
      })();
    });
  };

  walk('./build', (err, results) => {
    if (err) throw err;
    console.log('Found files');
    // Upload every file to bucket
    results.map((file) => {
      const shortPath = file.substring(7);
      const fileName = path.basename(shortPath);
      const filePath = shortPath.substring(1, (shortPath.length - path.basename(shortPath).length));
      storage
        .bucket(config.BUCKET)
        .upload(file, {
          destination: filePath + fileName,
        }, (error) => {
          if (error) {
            console.error('ERROR:', error);
          } else {
            console.log(`${file} uploaded to ${config.BUCKET}.`);
          }
        });
    });
  });
});

const http = require('http');
const fs = require('fs');

const PDF_PATH = "C:\\Users\\TEJA\\Desktop\\maths\\MATHS UNIT 1.pdf";

const body = Buffer.concat([
  Buffer.from('--' + '----WebKitFormBoundary' + Date.now() + '\r\n'),
  Buffer.from('Content-Disposition: form-data; name="file"; filename="test.pdf"\r\nContent-Type: application/pdf\r\n\r\n'),
  fs.readFileSync(PDF_PATH),
  Buffer.from('\r\n--' + '----WebKitFormBoundary' + Date.now() + '--\r\n')
]);

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/compress',
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary' + Date.now(),
    'Content-Length': body.length
  }
};

const req = http.request(options, (res) => {
  console.log('Status:', res.statusCode);
  res.on('data', () => {});
  res.on('end', () => {
    console.log('Done');
  });
});

req.on('error', (e) => {
  console.log('Error:', e.message);
});

req.write(body);
req.end();
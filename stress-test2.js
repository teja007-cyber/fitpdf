const fs = require('fs');
const https = require('http');

const PDF_PATH = "C:\\Users\\TEJA\\Desktop\\maths\\MATHS UNIT 1.pdf";
const API_URL = "http://127.0.0.1:3000/api/compress";
const CONCURRENT = 10;
const TOTAL = 50;

function getFileBuffer() {
  return fs.readFileSync(PDF_PATH);
}

function makeRequest() {
  return new Promise((resolve) => {
    const start = Date.now();
    const boundary = '----FormBoundary' + Date.now();
    const fileBuffer = getFileBuffer();
    
    const postData = [
      `--${boundary}`,
      `Content-Disposition: form-data; name="file"; filename="test.pdf"`,
      'Content-Type: application/pdf',
      '',
      '',
    ];
    
    const parts = postData.join('\r\n');
    const header1 = Buffer.from(parts, 'utf-8');
    const footer = Buffer.from(`\r\n--${boundary}--\r\n`, 'utf-8');
    const body = Buffer.concat([header1, fileBuffer, footer]);
    
    const options = {
      hostname: '127.0.0.1',
      port: 3000,
      path: '/api/compress',
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': body.length
      }
    };
    
    const req = https.request(options, (res) => {
      const data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => {
        const duration = Date.now() - start;
        const success = res.statusCode === 200;
        const size = parseInt(res.headers['content-length'] || '0');
        resolve({ success, duration, size, status: res.statusCode });
      });
    });
    
    req.on('error', (err) => {
      resolve({ success: false, duration: Date.now() - start, error: err.message });
    });
    
    req.write(body);
    req.end();
  });
}

async function stressTest() {
  console.log(`\n📊 PDF Compressor Stress Test`);
  console.log(`Target: ${API_URL}`);
  console.log(`Concurrent: ${CONCURRENT}`);
  console.log(`Total: ${TOTAL}\n`);

  const results = [];
  let completed = 0;
  const startTime = Date.now();

  for (let i = 0; i < TOTAL; i += CONCURRENT) {
    const batch = [];
    for (let j = 0; j < CONCURRENT && i + j < TOTAL; j++) {
      batch.push(makeRequest());
    }
    const batchResults = await Promise.all(batch);
    results.push(...batchResults);
    completed += batchResults.length;
    const successCount = batchResults.filter(r => r.success).length;
    console.log(`Progress: ${completed}/${TOTAL} | Success: ${successCount}/${batchResults.length}`);
  }

  const totalTime = Date.now() - startTime;
  const success = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`\n📈 Results:`);
  console.log(`  Total: ${results.length}`);
  console.log(`  Success: ${success.length}`);
  console.log(`  Failed: ${failed.length}`);
  console.log(`  Time: ${(totalTime/1000).toFixed(2)}s`);
  console.log(`  RPS: ${(results.length/(totalTime/1000)).toFixed(2)}`);

  if (success.length > 0) {
    const avg = success.reduce((a, b) => a + b.duration, 0) / success.length;
    console.log(`\n⏱️  Latency: avg=${avg.toFixed(0)}ms min=${Math.min(...success.map(r => r.duration))}ms max=${Math.max(...success.map(r => r.duration))}ms`);
  }
  console.log(`\n✅ Done\n`);
}

stressTest().catch(console.error);
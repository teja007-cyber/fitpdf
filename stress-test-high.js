const http = require('http');
const fs = require('fs');

const PDF_PATH = "C:\\Users\\TEJA\\Desktop\\maths\\MATHS UNIT 1.pdf";
const API_URL = "http://localhost:3000/api/compress";
const CONCURRENT = 20;
const TOTAL = 100;

function makeRequest() {
  return new Promise((resolve) => {
    const start = Date.now();
    const boundary = '----FormBoundary' + Math.random().toString(36).substring(2);
    const fileBuffer = fs.readFileSync(PDF_PATH);
    
    const body = Buffer.concat([
      Buffer.from(`--${boundary}\r\n`),
      Buffer.from(`Content-Disposition: form-data; name="file"; filename="test.pdf"\r\n`),
      Buffer.from(`Content-Type: application/pdf\r\n\r\n`),
      fileBuffer,
      Buffer.from(`\r\n--${boundary}\r\n`),
      Buffer.from(`Content-Disposition: form-data; name="targetSize"\r\n\r\n2\r\n`),
      Buffer.from(`--${boundary}--\r\n`)
    ]);
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/compress',
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': body.length
      }
    };

    const req = http.request(options, (res) => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
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
  console.log(`\n📊 PDF Compressor Stress Test (HIGH LOAD)`);
  console.log(`Target: ${API_URL}`);
  console.log(`Concurrent: ${CONCURRENT}`);
  console.log(`Total: ${TOTAL}\n`);

  const results = [];
  const startTime = Date.now();

  for (let i = 0; i < TOTAL; i += CONCURRENT) {
    const batch = [];
    for (let j = 0; j < CONCURRENT && i + j < TOTAL; j++) {
      batch.push(makeRequest());
    }
    const batchResults = await Promise.all(batch);
    results.push(...batchResults);
    const successCount = batchResults.filter(r => r.success).length;
    console.log(`Progress: ${Math.min(i + CONCURRENT, TOTAL)}/${TOTAL} | Success: ${successCount}/${batchResults.length}`);
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
    const min = Math.min(...success.map(r => r.duration));
    const max = Math.max(...success.map(r => r.duration));
    const avgSize = success.reduce((a, b) => a + b.size, 0) / success.length;
    console.log(`\n⏱️  Latency:`);
    console.log(`  Avg: ${avg.toFixed(0)}ms`);
    console.log(`  Min: ${min}ms`);
    console.log(`  Max: ${max}ms`);
    console.log(`\n📦 Avg response size: ${(avgSize/1024).toFixed(1)}KB`);
  }

  if (failed.length > 0) {
    console.log(`\n❌ Errors:`);
    const errors = {};
    failed.forEach(r => {
      const key = r.error || `HTTP ${r.status}`;
      errors[key] = (errors[key] || 0) + 1;
    });
    Object.entries(errors).forEach(([err, count]) => console.log(`  ${err}: ${count}`));
  }

  console.log(`\n✅ Stress test complete!\n`);
}

stressTest().catch(console.error);
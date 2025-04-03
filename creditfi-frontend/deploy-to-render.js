const https = require('https');

// Replace with your actual Render service ID and deploy key
const serviceId = 'srv-cuhql0t2ng1s73catml0';
const deployKey = 'jFrKGrYRk40';

// Construct the deployment URL
const deployUrl = `https://api.render.com/deploy/${serviceId}?key=${deployKey}`;

// Make the request
console.log(`Deploying to Render at ${deployUrl}`);

https.get(deployUrl, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log('Deployment triggered successfully!');
      console.log('Response:', data);
    } else {
      console.error(`Failed to deploy. Status code: ${res.statusCode}`);
      console.error('Response:', data);
    }
  });
}).on('error', (err) => {
  console.error('Error triggering deployment:', err.message);
}); 
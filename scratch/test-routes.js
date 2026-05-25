const http = require('http');

const routes = [
  '/en',
  '/th',
  '/en/new-release',
  '/th/new-release',
  '/en/company-profile',
  '/en/contact',
  '/en/it-system',
  '/en/e-tax',
  '/en/marketing',
  '/en/my-log-star',
  '/en/non-existent-page-404'
];

async function testRoutes() {
  console.log("Starting Route Tests on http://localhost:3000 ...\n");
  
  let hasErrors = false;
  
  for (const route of routes) {
    try {
      const res = await fetch(`http://localhost:3000${route}`);
      const text = await res.text();
      
      let statusStr = res.status === 200 ? `✅ 200 OK` : (res.status === 404 ? `⚠️ 404 Not Found` : `❌ ${res.status}`);
      
      // Check for common error strings in development mode
      if (text.includes("Error:") && res.status === 500) {
        statusStr += ` - Contains Error Trace`;
        hasErrors = true;
      }

      console.log(`${route.padEnd(30, ' ')} -> ${statusStr}`);
    } catch (e) {
      console.log(`${route.padEnd(30, ' ')} -> ❌ Fetch Failed: ${e.message}`);
      hasErrors = true;
    }
  }

  console.log("\nFinished testing.");
  if (hasErrors) {
    console.log("❌ Some pages failed to load correctly.");
  } else {
    console.log("✅ All pages loaded successfully (200s and expected 404s).");
  }
}

testRoutes();

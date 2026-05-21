const STRAPI_URL = "https://authentic-chocolate-641291934d.strapiapp.com";

async function testConnection() {
  console.log("🔍 Testing Strapi connection...\n");
  console.log(`URL: ${STRAPI_URL}\n`);

  try {
    // Test 1: Check basic connection
    console.log("Test 1: Basic connection to Strapi...");
    const res1 = await fetch(`${STRAPI_URL}/api/homepage`);
    console.log(`Status: ${res1.status} ${res1.statusText}`);
    const data1 = await res1.json();
    console.log(`Response: ${JSON.stringify(data1, null, 2)}\n`);

    // Test 2: Check if error is CORS or auth
    if (!res1.ok) {
      console.log("❌ API returned error. Checking response headers...");
      console.log("Headers:", Object.fromEntries(res1.headers));
    } else {
      console.log("✅ API returned success!");
    }
  } catch (err) {
    console.error("❌ Error:", err.message);
    console.error("\nPossible issues:");
    console.error("1. Strapi server is down");
    console.error("2. URL is incorrect");
    console.error("3. CORS is blocked");
    console.error("4. Network connectivity issue");
  }
}

testConnection();

const fs = require('fs');

let code = fs.readFileSync('src/lib/strapi.ts', 'utf-8');

if (!code.includes('unstable_cache')) {
  code = code.replace(
    'import { cache } from "react";',
    'import { cache } from "react";\nimport { unstable_cache } from "next/cache";'
  );
}

const functionNames = [
  { name: 'getBlogPosts', key: 'blog-posts' },
  { name: 'getBlogPost', key: 'blog-post' },
  { name: 'getBlogCategories', key: 'blog-categories' },
  { name: 'getHomepageData', key: 'homepage-data' },
  { name: 'getNewReleaseData', key: 'new-release-data' },
  { name: 'getCompanyData', key: 'company-data' },
  { name: 'getContactData', key: 'contact-data' },
  { name: 'getItSystemData', key: 'it-system-data' },
  { name: 'getETaxData', key: 'etax-data' },
  { name: 'getMarketingData', key: 'marketing-data' },
  { name: 'getMyLogStarData', key: 'mylogstar-data' },
];

for (const fn of functionNames) {
  const regex = new RegExp(`export const ${fn.name} = cache\\(async \\((.*?)\\)(:.*?)? => \\{`, 'g');
  
  code = code.replace(regex, (match, args, returnType) => {
    // Add the cache options at the end of the function block later, but for now we just wrap it
    return `export const ${fn.name} = unstable_cache(async (${args})${returnType || ''} => {`;
  });
  
  // We need to replace the ending `});` of the cache wrapper with the `], { revalidate: 2592000 });`
  // To be safe, we will just rely on the fact that every exported function ends with `});`
}

fs.writeFileSync('src/lib/strapi_mod.js', code);

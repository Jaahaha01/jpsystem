import type { SchemaTypeDefinition } from "sanity";
import { siteImage } from "./siteImage";
import { sharedContent, homePage, companyPage, itSystemPage, eTaxPage, marketingPage } from "./pages";
import { myLogStarPage, newReleasePage, contactPage } from "./pages2";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteImage,
    sharedContent,
    homePage,
    companyPage,
    itSystemPage,
    eTaxPage,
    marketingPage,
    myLogStarPage,
    newReleasePage,
    contactPage,
  ],
};

import * as vanta from "@pulumi/vanta";

const page = new vanta.StaticPage("page", {
  indexContent: "<html><body><p>Hello world!</p></body></html>",
});

export const bucket = page.bucket;
export const url = page.websiteUrl;

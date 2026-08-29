import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const openNextDir = fileURLToPath(new URL("../.open-next/", import.meta.url));
const distDir = fileURLToPath(new URL("../dist/", import.meta.url));
const serverDir = fileURLToPath(new URL("../dist/server/", import.meta.url));
const serverBundleDir = fileURLToPath(
  new URL("../dist/server/.open-next/", import.meta.url),
);
const assetsDir = fileURLToPath(new URL("../dist/assets/", import.meta.url));

await rm(distDir, { recursive: true, force: true });
await mkdir(serverDir, { recursive: true });
await cp(openNextDir, serverBundleDir, { recursive: true });
await rm(`${serverBundleDir}assets`, { recursive: true, force: true });
await cp(`${openNextDir}assets`, assetsDir, { recursive: true });
await writeFile(
  `${serverDir}index.js`,
  'export { default } from "./.open-next/worker.js";\nexport * from "./.open-next/worker.js";\n',
);

console.log(`Prepared Sites build output in ${projectRoot}dist`);

import { faker } from "@faker-js/faker";
import { writeFileSync } from "fs";
import { resolve } from "path";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

function main() {
  const data = [];

  for (let i = 1; i <= 1000; i++) {
    const id = i;
    data.push({
      name: faker.name.firstName(),
      description: faker.lorem.paragraph(),
      thumbnail: `https://placedog.net/100/100?id=${id}`,
      postImage: `https://placedog.net/600/600?id=${id}`,
      id,
    });
  }

  writeFileSync(resolve(__dirname, "../fixtures/data.json"), JSON.stringify(data));
}

main();

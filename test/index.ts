import { srctest as sleep } from "../src/index";

async function main() {
  console.log(1);
  await sleep(1000);
  console.log(2);
}

main();

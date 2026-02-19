const readline = require("readline");
const Escrow = require("./escrowEngine");

const escrow = new Escrow();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function dashboard() {
  console.clear();
  console.log("\n🌟 STAR ESCROW FINANCE TERMINAL\n");
  console.log("Commands:");
  console.log("open      - create new escrow");
  console.log("approve   - approve contract");
  console.log("release   - release funds");
  console.log("inspect   - view contract");
  console.log("ledger    - show all contracts");
  console.log("shutdown  - exit system\n");
}

dashboard();

function ask() {
  rl.question("escrow$ ", (cmd) => {

    if (cmd === "open") {
      rl.question("contract id: ", (id) => {
        rl.question("buyer: ", (buyer) => {
          rl.question("seller: ", (seller) => {
            rl.question("amount: ", (amount) => {

              const data = escrow.create(id, buyer, seller, amount);

              console.log("\n★ ESCROW CREATED");
              console.log(data, "\n");
              ask();
            });
          });
        });
      });

    } else if (cmd === "approve") {
      rl.question("contract id: ", (id) => {
        const data = escrow.approve(id);
        console.log("\n✓ APPROVED\n", data, "\n");
        ask();
      });

    } else if (cmd === "release") {
      rl.question("contract id: ", (id) => {
        const data = escrow.release(id);
        console.log("\n🚀 FUNDS RELEASED\n", data, "\n");
        ask();
      });

    } else if (cmd === "inspect") {
      rl.question("contract id: ", (id) => {
        const data = escrow.view(id);
        console.log("\n🔎 CONTRACT DETAILS\n", data, "\n");
        ask();
      });

    } else if (cmd === "ledger") {
      console.log("\n📘 ESCROW LEDGER\n", escrow.all(), "\n");
      ask();

    } else if (cmd === "shutdown") {
      console.log("\nSystem offline.\n");
      rl.close();

    } else {
      console.log("\nUnknown command.\n");
      ask();
    }

  });
}

ask();

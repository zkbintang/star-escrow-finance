import readline from "readline";
import crypto from "crypto";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const FEE_PERCENT = 0.5;

let escrows = [];
let treasuryPool = 0;

function header() {
  console.clear();
  console.log("STAR ESCROW FINANCE // ADVANCED ENGINE");
  console.log("════════════════════════════════════════════");
  console.log("");
}

function generateId() {
  return crypto.randomBytes(4).toString("hex");
}

function generateHash(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

function calculateFee(amount) {
  const fee = (amount * FEE_PERCENT) / 100;
  const net = amount - fee;
  return { fee, net };
}

function render() {
  header();

  console.log("TREASURY POOL:", treasuryPool.toFixed(4));
  console.log("");

  if (escrows.length === 0) {
    console.log("No active escrows.\n");
  }

  escrows.forEach(e => {
    console.log("ID:", e.id);
    console.log("Buyer:", e.buyer);
    console.log("Seller:", e.seller);
    console.log("Amount:", e.amount);
    console.log("Status:", e.status);
    console.log("Created:", new Date(e.createdAt).toLocaleString());
    console.log("TxHash:", e.txHash);
    console.log("────────────────────────────────────────");
  });

  console.log("");
  console.log("COMMANDS");
  console.log("────────────");
  console.log("create");
  console.log("fund");
  console.log("release");
  console.log("dispute");
  console.log("refund");
  console.log("list");
  console.log("exit");
  console.log("");
}

function prompt() {
  rl.question("escrow> ", handle);
}

function createEscrow() {
  rl.question("Buyer: ", buyer => {
    rl.question("Seller: ", seller => {
      rl.question("Amount: ", amt => {
        const amount = parseFloat(amt);
        const id = generateId();
        const txHash = generateHash(buyer + seller + Date.now());

        escrows.push({
          id,
          buyer,
          seller,
          amount,
          status: "CREATED",
          createdAt: Date.now(),
          txHash
        });

        render();
        prompt();
      });
    });
  });
}

function fundEscrow() {
  rl.question("Escrow ID: ", id => {
    const escrow = escrows.find(e => e.id === id);

    if (!escrow || escrow.status !== "CREATED") {
      console.log("Invalid escrow\n");
      return prompt();
    }

    escrow.status = "FUNDED";
    render();
    prompt();
  });
}

function releaseEscrow() {
  rl.question("Escrow ID: ", id => {
    const escrow = escrows.find(e => e.id === id);

    if (!escrow || escrow.status !== "FUNDED") {
      console.log("Escrow not funded\n");
      return prompt();
    }

    const { fee, net } = calculateFee(escrow.amount);
    treasuryPool += fee;

    escrow.status = "RELEASED";
    escrow.releasedAmount = net;

    render();
    prompt();
  });
}

function disputeEscrow() {
  rl.question("Escrow ID: ", id => {
    const escrow = escrows.find(e => e.id === id);

    if (!escrow || escrow.status !== "FUNDED") {
      console.log("Cannot dispute\n");
      return prompt();
    }

    escrow.status = "DISPUTED";
    render();
    prompt();
  });
}

function refundEscrow() {
  rl.question("Escrow ID: ", id => {
    const escrow = escrows.find(e => e.id === id);

    if (!escrow || escrow.status !== "DISPUTED") {
      console.log("Refund not allowed\n");
      return prompt();
    }

    escrow.status = "REFUNDED";
    render();
    prompt();
  });
}

function handle(cmd) {
  switch (cmd.trim()) {
    case "create":
      createEscrow();
      break;
    case "fund":
      fundEscrow();
      break;
    case "release":
      releaseEscrow();
      break;
    case "dispute":
      disputeEscrow();
      break;
    case "refund":
      refundEscrow();
      break;
    case "list":
      render();
      prompt();
      break;
    case "exit":
      console.log("Star Escrow Engine Shutdown");
      rl.close();
      break;
    default:
      render();
      prompt();
  }
}

render();
prompt();

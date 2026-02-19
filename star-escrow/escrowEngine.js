class StarEscrow {
  constructor() {
    this.contracts = {};
  }

  create(id, buyer, seller, amount) {
    this.contracts[id] = {
      buyer,
      seller,
      amount,
      status: "LOCKED"
    };
    return this.contracts[id];
  }

  approve(id) {
    if (!this.contracts[id]) return null;
    this.contracts[id].status = "APPROVED";
    return this.contracts[id];
  }

  release(id) {
    if (!this.contracts[id]) return null;
    this.contracts[id].status = "RELEASED";
    return this.contracts[id];
  }

  view(id) {
    return this.contracts[id] || null;
  }

  all() {
    return this.contracts;
  }
}

module.exports = StarEscrow;

# ⭐ Star Escrow Finance Skill

## 🧠 Skill Overview

Star Escrow Finance introduces a deterministic CLI-based escrow engine  
built for peer-to-peer financial contract simulation inside the Intercom ecosystem.

This skill demonstrates:

- Structured contract state transitions
- Approval validation logic
- Controlled fund release execution
- Transparent ledger inspection
- Clean CLI-based workflow

---

## ⚙️ Core Commands

### 1️⃣ open
Create a new escrow contract.

Inputs:
- contract id
- buyer
- seller
- amount

Result:
- Contract initialized
- Status set to PENDING

---

### 2️⃣ approve
Approve an existing contract.

Inputs:
- contract id

Result:
- Status changes to APPROVED

---

### 3️⃣ release
Release funds for an approved contract.

Inputs:
- contract id

Result:
- Status transitions to RELEASED

---

### 4️⃣ inspect
View a specific contract’s details.

Inputs:
- contract id

Result:
- Full contract state display

---

### 5️⃣ ledger
Display all contracts and their current state.

Result:
- Complete escrow ledger overview

---

### 6️⃣ shutdown
Terminate the escrow terminal safely.

---

## 🔄 Contract State Machine

PENDING → APPROVED → RELEASED

Rules:
- Cannot release without approval
- Cannot approve non-existing contract
- Ledger always reflects latest state

---

## 🛡️ Deterministic Logic

- In-memory contract storage
- Explicit state validation
- Clear output formatting
- Error-safe command handling

---

## 🧩 Architecture

- Node.js CLI Engine
- Modular command handling
- State-driven contract transitions
- Lightweight & portable

---

## 🎯 Purpose

This skill demonstrates how escrow logic  
can be modeled in a transparent and deterministic CLI system  
before integration into decentralized agent networks.

---

Built by: @zkbintang  
Project: Star Escrow Finance

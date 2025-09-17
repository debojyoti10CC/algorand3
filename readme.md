# 🔒 Freelance Escrow Vault on Algorand

## 🌐 Overview
Freelancers and clients often face the risk of scams:
- Clients fear losing money if freelancers don’t deliver.
- Freelancers fear working without guaranteed payment.
- Web2 platforms charge high fees while still failing to prevent fraud.

**Freelance Escrow Vault** solves this by using an **Algorand smart contract** that locks project funds in escrow until completion.  
Payments are **visible but untouchable** until released, eliminating scams and ensuring fair collaboration.

---

## ✨ Features
- **Escrow Vault:** Funds locked securely in Algorand smart contract.  
- **Proof of Funds:** Freelancer can verify money is deposited before starting work.  
- **Completion-based Release:** Freelancer (or arbiter) can unlock funds only when project is done.  
- **Auto Refund:** If the deadline passes without delivery, client can reclaim funds.  
- **Arbiter Support:** Neutral arbiter can settle disputes fairly.  
- **Low Fees:** Algorand ensures lightning-fast, low-cost transactions.  
- **Wallet Integration:** Works seamlessly with **Lute Wallet** for signing transactions.  

---

## 🛠 Tech Stack
- **Blockchain:** Algorand (AVM v6)  
- **Smart Contract:** [PyTeal](https://pyteal.readthedocs.io/) (compiled to TEAL)  
- **Frontend:** React + TailwindCSS  
- **Wallet:** [Lute Wallet](https://lute.algo.xyz/) for transaction signing and user onboarding  
- **Backend (optional):** Algorand Indexer API for session tracking  

---

## 🚀 How It Works
1. **Client funds escrow**
   - Creates a new session with provider address, amount, and expiry.  
   - Payment is grouped with app call to deposit funds into the escrow smart contract.  

2. **Freelancer sees funds**
   - Verifies funds are locked in contract before starting work.  

3. **Completion & release**
   - Freelancer (or arbiter) calls `end_session` → contract releases funds to provider.  

4. **Refund**
   - If work isn’t delivered and expiry passes, client can call `refund` to reclaim funds.  

5. **Dispute resolution**
   - Arbiter can resolve by releasing funds either to freelancer or client.  

---

## 📜 Smart Contract Functions
- `create_session(provider, amount, expiry)` → Locks funds in escrow.  
- `end_session()` → Releases escrow funds to freelancer (provider).  
- `refund()` → Refunds funds to client after expiry.  
- `arbiter_release(to_provider|to_user)` → Arbiter resolves dispute.  
- `set_arbiter(address)` → App creator sets arbiter address.  

---

## 📂 Project Structure

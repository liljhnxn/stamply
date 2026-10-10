# Stamply - On-Chain Digital Certificate Recorder

> **Stamp It. Store It. Verify It.**  
> Create a permanent, publicly verifiable digital certificate record on the Botchain blockchain.

---

## 1. What Stamply Does

Stamply allows anyone to create a simple, permanent digital certificate record on the blockchain. A user enters a certificate title and an optional description, connects their Web3 wallet, and stamps the record on-chain.

Each certificate receives a unique, auto-incrementing ID that is stored permanently and can be looked up and verified by anyone at any time.

> **Important Notice:** Stamping records certificate information on-chain with an immutable timestamp and creator address, but does not prove that a certificate's claims are authentic. Stamply is a public certificate-recording tool, not an official certificate authority.

---

## 2. Features

- **Decentralized Stamping:** Permanently write certificate metadata (ID, title, description, creator address, and block timestamp) to the Botchain blockchain.
- **Public Verification:** Anyone can query and verify any Certificate ID directly on-chain without needing a wallet connected.
- **Botchain Testnet Native:** Fully configured for the Botchain Testnet (Chain ID `968`).
- **Interactive Web3 Interface:** Built with Next.js, Tailwind CSS, Wagmi, and Viem, featuring a modern dark navy aesthetic, real-time transaction tracking, and direct block explorer links.
- **Smart Contract Security:** Strict validation enforcing non-empty titles, maximum character limits (100 for title, 1000 for description), and safe ID management.
- **100% On-Chain Truth:** No mock data, no fake receipts, and no centralized databases.

---

## 3. Technology Stack

- **Smart Contract:** Solidity `^0.8.20`
- **Smart Contract Development & Testing:** Hardhat, ethers.js, Chai
- **Frontend Framework:** Next.js 14 (App Router) with TypeScript
- **Styling:** Tailwind CSS (Dark navy Web3 theme)
- **Web3 Integrations:** Wagmi v2, Viem, TanStack React Query
- **Icons:** Lucide React

---

## 4. Blockchain Network Details (Botchain Testnet)

| Parameter | Value |
|---|---|
| **Network Name** | Botchain Testnet |
| **Chain ID** | `968` |
| **RPC URL** | `https://rpc.bohr.life` |
| **Block Explorer** | `https://scan.bohr.life` |
| **Currency Symbol** | `BOT` |
| **Deployed Contract** | [`0xEF2E6b3Da075ab4648f190A6CdBd58893DF1E688`](https://scan.bohr.life/address/0xEF2E6b3Da075ab4648f190A6CdBd58893DF1E688) |

---

## 5. Getting Started & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)
- A Web3 wallet browser extension (e.g. MetaMask, Rabby, Coinbase Wallet)

### Installation
Clone or navigate into the repository:
```bash
cd "c:\Users\PROGRESSIVE\Documents\Isaac work\Stamply"
npm install
```

### Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in the values:
```env
# Your private key (only required if deploying the contract)
PRIVATE_KEY=your_private_key_here

# Deployed contract address (Chain ID: 968)
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourDeployedContractAddressHere

# Botchain Testnet RPC and Explorer
NEXT_PUBLIC_RPC_URL=https://rpc.bohr.life
NEXT_PUBLIC_EXPLORER_URL=https://scan.bohr.life
```

---

## 6. Running Contract Tests

Stamply includes a full suite of Hardhat tests verifying:
- Successful certificate creation
- Sequential ID incrementation
- Exact metadata persistence (title, description, creator, timestamp)
- Rejection of empty titles
- Rejection of overly long titles (> 100 chars)
- Rejection of overly long descriptions (> 1000 chars)
- Correct verification of existing IDs
- Proper handling of non-existent IDs
- Emission of the `CertificateStamped` event

Run tests:
```bash
npm run test
```
Or directly:
```bash
npx hardhat test
```

---

## 7. Deploying the Smart Contract to Botchain Testnet

### Step 1: Fund your deployer wallet
Ensure the wallet corresponding to `PRIVATE_KEY` has native `BOT` testnet tokens from the Botchain faucet or testnet bridge.

### Step 2: Run the deployment script
```bash
npm run deploy:testnet
```
Or:
```bash
npx hardhat run scripts/deploy.ts --network botchainTestnet
```

### Step 3: Configure Contract Address
The deployment output will display your new contract address:
```
SUCCESS! Stamply contract deployed to: 0x...
```
Copy that address and set it in your `.env`:
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

---

## 8. Running the Frontend Locally

Start the Next.js development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

1. Connect your wallet (make sure your network is set to **Botchain Testnet - Chain ID 968**).
2. Fill in the **Certificate Title** and **Description**.
3. Click **Stamp Certificate** and confirm the transaction in your wallet.
4. Once confirmed, you will see your **Certificate ID**, creator address, timestamp, and a direct link to the transaction on BohrScan!
5. Test the **Public Verification** section by searching for the Certificate ID to see live on-chain data.

---

## 9. Building for Production

Test and create the production bundle:
```bash
npm run build
```

---

## 10. Deploying to Vercel

1. Push your code to a Git repository (e.g. GitHub, GitLab).
2. Go to [Vercel Dashboard](https://vercel.com/) and click **Add New Project**.
3. Import your Stamply repository.
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_CONTRACT_ADDRESS` = `0x...` (your deployed contract address)
   - `NEXT_PUBLIC_RPC_URL` = `https://rpc.bohr.life`
   - `NEXT_PUBLIC_EXPLORER_URL` = `https://scan.bohr.life`
5. Click **Deploy**. Vercel will build and host your dApp with global CDN edge routing.

---

## License
MIT

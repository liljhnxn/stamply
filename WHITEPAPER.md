# 📜 Stamply: Whitepaper & Pitch Deck

> **Decentralized On-Chain Certificate Recorder & Public Verification Protocol on Botchain Mainnet**  
> *Contract Address*: `0x15E4F4cC5094797fdc9a0857f30763edE70dD786` (Botchain Mainnet, Chain ID: 677)  
> *Explorer*: [https://scan.botchain.ai/address/0x15E4F4cC5094797fdc9a0857f30763edE70dD786](https://scan.botchain.ai/address/0x15E4F4cC5094797fdc9a0857f30763edE70dD786)  
> *Repository*: [GitHub / Stamply](https://github.com/liljhnxn/stamply)  

---

# PART 1: 📊 PITCH DECK (Slide-by-Slide)

### Slide 1: Title & Vision
* **Title**: **Stamply**
* **Tagline**: Stamp It. Store It. Verify It.
* **Mission**: Providing open, decentralized, and immutable proof-of-existence and public verification for digital records, achievements, and milestones.
* **Ecosystem**: Built natively for **Botchain** (High-throughput, EVM-compatible decentralized infrastructure).

---

### Slide 2: The Problem
1. **Fragility of Web2 Records**: Traditional certificates and achievement logs rely on centralized cloud databases, proprietary SaaS platforms, or PDF attachments vulnerable to data loss, link rot, and silent tampering.
2. **Friction in Public Verification**: Validating a credential or document timestamp typically requires account registrations, paid API keys, or contacting the original issuer.
3. **Lack of Cryptographic Proof of Existence**: Digital claims lack immutable timestamps directly tied to the creator's cryptographic identity without expensive enterprise notarization setups.

---

### Slide 3: The Solution — Stamply
* **100% On-Chain Persistence**: Every certificate record (Title, Description, Creator Address, Block Timestamp) is directly anchored into the Botchain blockchain.
* **Open & Permissionless Verification**: Anyone in the world can instantly verify any Certificate ID on-chain with zero wallet connection, zero paywalls, and zero KYC.
* **Immutable Timestamping**: Leveraging native EVM block timestamps (`block.timestamp`) to guarantee tamper-proof historical proof of existence.
* **Lightweight & Cost-Effective**: Highly optimized Solidity smart contract keeping gas overhead minimal while guaranteeing data immutability.

---

### Slide 4: How It Works (User Journey)
1. **Connect & Compose**: The user connects their Web3 wallet (MetaMask, Rabby, etc.) and inputs a certificate title (up to 100 bytes) and optional description (up to 1000 bytes).
2. **On-Chain Stamping**: A single transaction executes `stampCertificate()`. The contract assigns an incremental unique ID and permanently records the block timestamp and creator address.
3. **Receipt & Sharing**: The creator receives their permanent Certificate ID and can share the direct verification link or ID with employers, students, or community members.
4. **Universal Verification**: Anyone enters the ID into the Stamply portal or queries the smart contract directly to read raw, verifiable on-chain metadata.

---

### Slide 5: Market Opportunity & Target Verticals
* **Educational & Workshop Credentials**: Independent educators, hackathons, and bootcamps issuing verifiable proof of participation.
* **Open-Source & DAO Contributions**: Milestone attestations, task completions, and governance contributions recorded transparently.
* **Copyright & Creative Proof-of-Concept**: Authors, designers, and researchers stamping project releases or discovery timestamps prior to public unveiling.
* **Personal & Professional Milestones**: Individual users archiving key life events and career achievements to their sovereign Web3 identity.

---

### Slide 6: Technology Architecture
* **Smart Contract Layer**: Solidity `^0.8.20` compiled with Hardhat, featuring input bounds checking, strict storage management, and indexed EVM events.
* **Application Frontend**: Next.js 14 App Router, TypeScript, Tailwind CSS with custom Web3 dark-navy aesthetic.
* **Web3 Integration Layer**: Wagmi v2 & Viem for robust RPC communication, reactive contract reads/writes, and TanStack React Query caching.
* **Network Infrastructure**: Botchain Mainnet (Chain ID `677`, RPC: `https://rpc.botchain.ai`, Explorer: `https://scan.botchain.ai`).

---

### Slide 7: Competitive Advantages
| Feature | Traditional Web2 (Credly/PDFs) | Centralized Web3 Notaries | **Stamply on Botchain** |
| :--- | :--- | :--- | :--- |
| **Data Storage** | Centralized Database / AWS | Proprietary Off-chain IPFS Gateway | **100% On-Chain Smart Contract** |
| **Verification Barrier** | Requires login / Paywall | Requires proprietary API keys | **Universal 1-Click Public Lookup** |
| **Permanence** | Dependent on company survival | Dependent on server availability | **Permanent as long as Botchain runs** |
| **Interoperability** | Siloed API | Semi-closed | **Composable Open EVM Standard** |

---

### Slide 8: Roadmap & Future Expansion
* **Phase 1 (Completed)**: Core smart contract deployment on Botchain Mainnet, full frontend integration, and public verification lookup engine.
* **Phase 2**: Soulbound Token (SBT / ERC-5192) optional minting alongside the on-chain certificate record.
* **Phase 3**: Batch stamping for institutions and hackathons, plus automated IPFS/Arweave document hash attachment support.
* **Phase 4**: QR Code generator integration for physical certificates and credential cards.

---

# PART 2: 📜 TECHNICAL WHITEPAPER

## 1. Abstract
Stamply is a decentralized, on-chain digital certificate recording and verification protocol engineered for the Botchain ecosystem. Addressing the fragility, tampering vulnerability, and access barriers inherent in centralized credential management systems, Stamply introduces a trust-minimized architecture where certificate metadata is permanently committed to the blockchain. Each certificate is cryptographically anchored with an auto-incremented identifier, the creator’s wallet address, and the EVM block timestamp. By removing intermediaries and central databases, Stamply delivers verifiable proof of existence, permissionless public querying, and durable data sovereignty.

---

## 2. Problem Statement
The modern internet lacks an open, ubiquitous standard for establishing the chronological proof of existence and creator attribution of digital accomplishments. 

Current credentialing models suffer from structural weaknesses:
* **Centralization Risk**: Certifying authorities and SaaS repositories are subject to domain expiration, hosting bankruptcy, and malicious alteration.
* **Verification Friction**: Third parties attempting to authenticate credentials must frequently navigate proprietary portals, submit requests, or pay access fees.
* **Absence of Sovereign Proof**: Individuals who achieve milestones rarely hold cryptographic control over their credentials; they remain tethered to the issuing entity’s infrastructure.

---

## 3. Protocol Architecture & System Design

Stamply operates as a dual-layer protocol combining a minimalist on-chain state engine with an interactive client interface:

```
[ User / Creator Wallet ]
          │ (stampCertificate tx)
          ▼
┌────────────────────────────────────────────────────────┐
│               Stamply Smart Contract                   │
│   - Increments certificateCount                        │
│   - Bounds verification (Title <= 100B, Desc <= 1000B) │
│   - Stores Certificate struct in mapping               │
│   - Emits CertificateStamped Event                     │
└────────────────────────────────────────────────────────┘
          ▲
          │ (getCertificate / certificateExists view call)
[ Public Verifier (Zero Wallet Required) ]
```

### 3.1 On-Chain State Model
All protocol state resides within the deployed `Stamply` contract on Botchain Mainnet:
* **`certificateCount`** (`uint256`): Monotonically increasing counter serving as the primary index and total count of all issued certificates.
* **`certificates`** (`mapping(uint256 => Certificate)`): Hash table mapping each unique ID to its corresponding data struct.

### 3.2 Data Struct Specification
```solidity
struct Certificate {
    uint256 id;           // Unique sequential certificate identifier
    string title;         // Certificate title (1 - 100 bytes)
    string description;   // Certificate description (0 - 1000 bytes)
    address creator;      // Ethereum address of the creator/issuer
    uint256 timestamp;    // Block timestamp of creation
}
```

---

## 4. Smart Contract Specifications

### 4.1 Invariants & Security Boundaries
* **Title Length Enforcement**: `titleBytes.length > 0` and `titleBytes.length <= MAX_TITLE_LENGTH (100 bytes)`. Prevents zero-length spam and excessive gas usage.
* **Description Length Enforcement**: `descBytes.length <= MAX_DESCRIPTION_LENGTH (1000 bytes)`. Protects contract storage against unbounded calldata exploitation.
* **Immutable State**: Once written, certificate records cannot be modified, deleted, or transferred by any party, including the contract deployer.
* **Ownerless Independence**: The contract contains no privileged administrative keys, pauses, or upgrade proxies, ensuring absolute censorship resistance.

### 4.2 Core Interface Functions
* **`stampCertificate(string calldata _title, string calldata _description) external returns (uint256)`**
  * Validates calldata byte lengths.
  * Increments `certificateCount`.
  * Writes state to storage mapping.
  * Emits `CertificateStamped(uint256 indexed id, address indexed creator, string title, uint256 timestamp)`.
* **`certificateExists(uint256 _id) external view returns (bool)`**
  * Returns `true` if `_id > 0` and `_id <= certificateCount`.
* **`getCertificate(uint256 _id) external view returns (uint256, string memory, string memory, address, uint256)`**
  * Reverts if `_id` is invalid.
  * Returns all record attributes directly from contract storage.

---

## 5. Network Deployment & Operational Parameters

Stamply is officially deployed on the **Botchain Mainnet**:

| Parameter | Specification |
| :--- | :--- |
| **Network Name** | Botchain Mainnet |
| **Chain ID** | `677` |
| **RPC Endpoint** | `https://rpc.botchain.ai` |
| **Block Explorer** | `https://scan.botchain.ai` |
| **Native Asset** | BOT (18 Decimals, 150 Million Total Supply) |
| **Contract Address** | `0x15E4F4cC5094797fdc9a0857f30763edE70dD786` |
| **Compiler Version** | Solidity `0.8.20` |
| **Optimization Runs** | 200 |

---

## 6. Security Analysis & Threat Model

* **Reentrancy**: Not applicable. The contract performs no external ETH/token transfers and invokes no untrusted external contracts.
* **Timestamp Dependence**: Relies on block timestamp (`block.timestamp`). For the purpose of digital certificate issuance and proof-of-existence, miner/validator drift (typically seconds) has negligible impact on integrity.
* **Access Control & Censorship**: By deliberately omitting `onlyOwner` routines, no single point of failure exists. No authority can confiscate or delete an issued certificate.
* **Front-Running / Denial of Service**: The auto-incrementing ID mechanism ensures state conflicts do not block sequential transactions.

---

## 7. Conclusion
Stamply establishes a lightweight, trustworthy, and decentralized standard for digital credential archiving. By utilizing Botchain’s high-performance EVM architecture, Stamply eliminates the reliance on fragile Web2 databases, providing users and institutions worldwide with permanent, publicly verifiable proof of existence.

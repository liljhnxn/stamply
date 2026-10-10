import { expect } from "chai";
import hre from "hardhat";
import { Stamply } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

const { ethers } = hre;

describe("Stamply Contract", function () {
  let stamply: Stamply;
  let owner: HardhatEthersSigner;
  let addr1: HardhatEthersSigner;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    const StamplyFactory = await ethers.getContractFactory("Stamply");
    stamply = (await StamplyFactory.deploy()) as unknown as Stamply;
    await stamply.waitForDeployment();
  });

  describe("Certificate Creation", function () {
    it("Should start with 0 certificates", async function () {
      expect(await stamply.certificateCount()).to.equal(0);
    });

    it("Should successfully create a certificate with title and description", async function () {
      const title = "Bachelor of Science in Computer Science";
      const description = "Issued by Tech University with honors.";

      const tx = await stamply.connect(owner).stampCertificate(title, description);
      await tx.wait();

      expect(await stamply.certificateCount()).to.equal(1);

      const cert = await stamply.getCertificate(1);
      expect(cert.id).to.equal(1);
      expect(cert.title).to.equal(title);
      expect(cert.description).to.equal(description);
      expect(cert.creator).to.equal(owner.address);
      expect(cert.timestamp).to.be.greaterThan(0);
    });

    it("Should increment certificate IDs correctly", async function () {
      await stamply.connect(owner).stampCertificate("Cert 1", "Desc 1");
      await stamply.connect(addr1).stampCertificate("Cert 2", "Desc 2");

      expect(await stamply.certificateCount()).to.equal(2);

      const cert1 = await stamply.getCertificate(1);
      const cert2 = await stamply.getCertificate(2);

      expect(cert1.id).to.equal(1);
      expect(cert1.creator).to.equal(owner.address);

      expect(cert2.id).to.equal(2);
      expect(cert2.creator).to.equal(addr1.address);
    });

    it("Should emit CertificateStamped event with correct parameters", async function () {
      const title = "Web3 Developer Certification";
      const description = "Completed advanced blockchain curriculum.";

      await expect(stamply.connect(addr1).stampCertificate(title, description))
        .to.emit(stamply, "CertificateStamped")
        .withArgs(1, addr1.address, title, (timestamp: bigint) => timestamp > 0n);
    });
  });

  describe("Validation & Rejections", function () {
    it("Should reject empty titles", async function () {
      await expect(
        stamply.connect(owner).stampCertificate("", "A valid description")
      ).to.be.revertedWith("Title cannot be empty");
    });

    it("Should reject titles that exceed maximum length (100 characters)", async function () {
      const longTitle = "A".repeat(101);
      await expect(
        stamply.connect(owner).stampCertificate(longTitle, "Valid description")
      ).to.be.revertedWith("Title exceeds maximum length");
    });

    it("Should reject descriptions that exceed maximum length (1000 characters)", async function () {
      const longDescription = "D".repeat(1001);
      await expect(
        stamply.connect(owner).stampCertificate("Valid Title", longDescription)
      ).to.be.revertedWith("Description exceeds maximum length");
    });

    it("Should allow empty description", async function () {
      await expect(stamply.connect(owner).stampCertificate("Title Only", "")).to.not.be.reverted;
      const cert = await stamply.getCertificate(1);
      expect(cert.title).to.equal("Title Only");
      expect(cert.description).to.equal("");
    });
  });

  describe("Verification & Retrieval", function () {
    beforeEach(async function () {
      await stamply.connect(owner).stampCertificate("Verified Award", "Details here");
    });

    it("Should verify existing certificate IDs correctly", async function () {
      expect(await stamply.certificateExists(1)).to.true;
    });

    it("Should return false for non-existent certificate IDs", async function () {
      expect(await stamply.certificateExists(0)).to.false;
      expect(await stamply.certificateExists(2)).to.false;
      expect(await stamply.certificateExists(999)).to.false;
    });

    it("Should revert getCertificate for non-existent certificate IDs", async function () {
      await expect(stamply.getCertificate(0)).to.be.revertedWith("Certificate does not exist");
      await expect(stamply.getCertificate(2)).to.be.revertedWith("Certificate does not exist");
    });
  });
});

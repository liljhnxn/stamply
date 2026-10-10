// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Stamply
 * @notice A lightweight on-chain digital certificate recorder.
 * @dev Stamping records certificate data permanently on-chain.
 * It provides proof of existence and timestamping, but does not guarantee the authenticity of external claims.
 */
contract Stamply {
    struct Certificate {
        uint256 id;
        string title;
        string description;
        address creator;
        uint256 timestamp;
    }

    // Maximum character/byte length boundaries
    uint256 public constant MAX_TITLE_LENGTH = 100;
    uint256 public constant MAX_DESCRIPTION_LENGTH = 1000;

    // Total number of certificates stamped
    uint256 public certificateCount;

    // Mapping from Certificate ID to Certificate details
    mapping(uint256 => Certificate) private certificates;

    // Event emitted upon successful certificate stamping
    event CertificateStamped(
        uint256 indexed id,
        address indexed creator,
        string title,
        uint256 timestamp
    );

    /**
     * @notice Stamps a new certificate on-chain.
     * @param _title Title of the certificate (required, 1-100 bytes).
     * @param _description Optional description of the certificate (0-1000 bytes).
     * @return id The assigned unique certificate ID.
     */
    function stampCertificate(
        string calldata _title,
        string calldata _description
    ) external returns (uint256) {
        bytes memory titleBytes = bytes(_title);
        bytes memory descBytes = bytes(_description);

        require(titleBytes.length > 0, "Title cannot be empty");
        require(titleBytes.length <= MAX_TITLE_LENGTH, "Title exceeds maximum length");
        require(descBytes.length <= MAX_DESCRIPTION_LENGTH, "Description exceeds maximum length");

        certificateCount++;
        uint256 newId = certificateCount;

        certificates[newId] = Certificate({
            id: newId,
            title: _title,
            description: _description,
            creator: msg.sender,
            timestamp: block.timestamp
        });

        emit CertificateStamped(newId, msg.sender, _title, block.timestamp);

        return newId;
    }

    /**
     * @notice Checks if a certificate ID exists.
     * @param _id The certificate ID to check.
     * @return exists True if the certificate exists, false otherwise.
     */
    function certificateExists(uint256 _id) external view returns (bool) {
        return (_id > 0 && _id <= certificateCount);
    }

    /**
     * @notice Retrieves certificate details by ID.
     * @param _id The certificate ID to retrieve.
     * @return id The certificate ID.
     * @return title The certificate title.
     * @return description The certificate description.
     * @return creator The creator wallet address.
     * @return timestamp The on-chain block timestamp when created.
     */
    function getCertificate(uint256 _id)
        external
        view
        returns (
            uint256 id,
            string memory title,
            string memory description,
            address creator,
            uint256 timestamp
        )
    {
        require(_id > 0 && _id <= certificateCount, "Certificate does not exist");
        Certificate storage cert = certificates[_id];
        return (cert.id, cert.title, cert.description, cert.creator, cert.timestamp);
    }
}

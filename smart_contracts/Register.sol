// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract UserRegistration {
    struct User {
        address userAddress;
        string passport;
        string singPass;
        string addressInfo;
        bool passportVerified;
        bool singPassVerified;
        bool addressVerified;
        uint256 registrationTime;
        bool isRegistered;
    }

    address public passportVerifier;
    address public singPassVerifier;
    address public addressVerifier;
    uint256 public verificationTimeout = 100 minutes; // 认证超时时间

    mapping(address => User) public users;

    event UserRegistered(address indexed user, string passport, string singPass, string addressInfo);
    event VerificationRequested(address indexed user, string dataType);
    event VerificationConfirmed(address indexed verifier, address indexed user, string dataType);
    event RegistrationFailed(address indexed user, string reason);

    modifier onlyVerifier(address _verifier) {
        require(
            msg.sender == _verifier,
            "Only the assigned verifier can confirm this data"
        );
        _;
    }

    constructor(address _passportVerifier, address _singPassVerifier, address _addressVerifier) {
        passportVerifier = _passportVerifier;
        singPassVerifier = _singPassVerifier;
        addressVerifier = _addressVerifier;
    }

    function register(string memory _passport, string memory _singPass, string memory _addressInfo) external {
        require(bytes(_passport).length > 0, "Passport is required");
        require(bytes(_singPass).length > 0, "SingPass is required");
        require(bytes(_addressInfo).length > 0, "Address is required");
        //require(users[msg.sender].userAddress == address(0), "User already registered");

        users[msg.sender] = User({
            userAddress: msg.sender,
            passport: _passport,
            singPass: _singPass,
            addressInfo: _addressInfo,
            passportVerified: false,
            singPassVerified: false,
            addressVerified: false,
            registrationTime: block.timestamp,
            isRegistered: false
        });

        emit VerificationRequested(msg.sender, "Passport");
        emit VerificationRequested(msg.sender, "SingPass");
        emit VerificationRequested(msg.sender, "Address");

        emit UserRegistered(msg.sender, _passport, _singPass, _addressInfo);
    }

    function confirmVerification(address _user, string memory _dataType) external {
        require(users[_user].userAddress != address(0), "User not found");
        require(block.timestamp <= users[_user].registrationTime + verificationTimeout, "Verification timeout");

        if (msg.sender == passportVerifier && keccak256(abi.encodePacked(_dataType)) == keccak256("Passport")) {
            users[_user].passportVerified = true;
        } else if (msg.sender == singPassVerifier && keccak256(abi.encodePacked(_dataType)) == keccak256("SingPass")) {
            users[_user].singPassVerified = true;
        } else if (msg.sender == addressVerifier && keccak256(abi.encodePacked(_dataType)) == keccak256("Address")) {
            users[_user].addressVerified = true;
        } else {
            revert("Unauthorized verification attempt");
        }

        emit VerificationConfirmed(msg.sender, _user, _dataType);

        if (users[_user].passportVerified && users[_user].singPassVerified && users[_user].addressVerified) {
            users[_user].isRegistered = true;
            emit UserRegistered(_user, users[_user].passport, users[_user].singPass, users[_user].addressInfo);
        }
    }

    function checkRegistrationStatus(address _user) external view returns (string memory) {
        User memory user = users[_user];

        if (user.userAddress == address(0)) {
            return "User not registered.";
        }
        if (block.timestamp > user.registrationTime + verificationTimeout) {
            return "Registration failed: Verification timeout.";
        }
        if (!user.passportVerified) {
            return "Registration pending: Passport verification required.";
        }
        if (!user.singPassVerified) {
            return "Registration pending: SingPass verification required.";
        }
        if (!user.addressVerified) {
            return "Registration pending: Address verification required.";
        }
        return "User successfully registered.";
    }
}

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@arbitrum/nitro-contracts/src/precompiles/ArbSys.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract DimeSchedule is Ownable {
    using SafeMath for uint256;

    mapping(address => uint256) public balances;
    constructor(address initialOwner) Ownable(initialOwner) {}

    // Struct to represent a bill payment
    struct Bill {
        address payable recipient; // Address of the bill recipient
        uint256 amount; // Amount to be paid
        bool paid; // Flag to track if the bill has been paid
        uint256 lockDuration; // Duration in seconds for which the amount will be locked
        uint256 lockReleaseTime; // Timestamp when the locked amount will be released
    }

    // Mapping to store bill payments
    mapping(uint256 => Bill) public bills;

    // Counter to keep track of bill IDs
    uint256 public billCount;

    // Event emitted when a bill is paid
    event BillPaid(
        uint256 indexed billId,
        address indexed recipient,
        uint256 amount
    );

    // Event emitted when a bill is added
    event BillAdded(
        uint256 indexed billId,
        address indexed recipient,
        uint256 amount,
        uint256 lockReleaseTime
    );

    // Modifier to ensure that the contract is funded for bill payments
    modifier sufficientFunds(uint256 amount) {
        require(
            address(this).balance >= amount,
            "Insufficient funds in the contract"
        );
        _;
    }

    // Function to deposit funds into the piggy bank
    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than 0.");
        balances[msg.sender] += msg.value;
    }

    // Function to withdraw funds from the piggy bank
    function withdraw(uint256 amount) external onlyOwner {
        require(amount <= address(this).balance, "Insufficient balance");
        payable(owner()).transfer(amount);
    }

    // Function to add a bill payment
    function addBill(
        address payable recipient,
        uint256 amount,
        uint256 lockDurationMins
    ) external payable  {
        // Increment the bill count
        billCount++;


        // Calculate lock duration in seconds
        uint256 lockDurationSeconds = lockDurationMins.mul(60);

        // Calculate lock release time
        uint256 lockReleaseTime = block.timestamp.add(lockDurationSeconds);

        // Add the bill to the mapping
        bills[billCount] = Bill(
            recipient,
            amount,
            false,
            lockDurationSeconds,
            lockReleaseTime
        );

        // Emit the event
        emit BillAdded(billCount, recipient, amount, lockReleaseTime);
    }

    // Function to pay a bill 
    function payBill(uint256 billId) external payable onlyOwner sufficientFunds(bills[billId].amount) {
        require(billId <= billCount, "Invalid bill ID");
        require(!bills[billId].paid, "Bill has already been paid");
        require(block.timestamp >= bills[billId].lockReleaseTime, "Lock duration has not been reached");

        // Deduct the paid amount from the owner's balance
        balances[owner()] = balances[owner()].sub(bills[billId].amount);

        // Mark the bill as paid
        bills[billId].paid = true;

        // Emit the event
        emit BillPaid(billId, bills[billId].recipient, bills[billId].amount);
    }

    // Function to check the remaining time until the lock release for a bill
    function getLockCountdown(uint256 billId) public view returns (uint256) {
        require(billId <= billCount, "Invalid bill ID");
        require(!bills[billId].paid, "Bill has already been paid");

        if (block.timestamp >= bills[billId].lockReleaseTime) {
            return 0;
        } else {
            return bills[billId].lockReleaseTime.sub(block.timestamp);
        }
    }

    // Function to check the contract balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Function to get the lock details of a bill payment
    function getLockDetails(
        uint256 billId
    ) external view returns (uint256, uint256) {
        require(billId <= billCount, "Invalid bill ID");

        Bill storage bill = bills[billId];
        return (bill.amount, bill.lockReleaseTime);
    }
}
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@arbitrum/nitro-contracts/src/bridge/IInbox.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract PiggyBank is Ownable {
    using SafeMath for uint256;

    constructor(address initialOwner) Ownable(initialOwner) {}

    // Struct to represent a bill payment
    struct Bill {
        address payable recipient; // Address of the bill recipient
        uint256 amount; // Amount to be paid
        bool paid; // Flag to track if the bill has been paid
        uint256 lockPercentage; // Percentage of saved amount to be locked for the bill payment
        uint256 lockDuration; // Duration in seconds for which the amount will be locked
        uint256 lockReleaseTime; // Timestamp when the locked amount will be released
    }

    // Mapping to store bill payments
    mapping(uint256 => Bill) public bills;

    // Counter to keep track of bill IDs
    uint256 public billCount;

    // Address of the Arbitrum L2 Inbox contract
    address constant ARB_INBOX = 0xFeE9b8E1C8721C67386F7cBb3639d9694e6C6E0e;

    // Event emitted when a bill is paid
    event BillPaid(
        uint256 indexed billId,
        address indexed recipient,
        uint256 amount
    );

    // Event emitted when a bill payment is locked
    event BillLocked(
        uint256 indexed billId,
        uint256 lockAmount,
        uint256 releaseTime
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
        // No additional logic required
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
        uint256 lockPercentage,
        uint256 lockDurationDays
    ) external onlyOwner {
        // Increment the bill count
        billCount++;

        // Calculate lock duration in seconds
        uint256 lockDurationSeconds = lockDurationDays.mul(86400);

        // Add the bill to the mapping
        bills[billCount] = Bill(
            recipient,
            amount,
            false,
            lockPercentage,
            lockDurationSeconds,
            0
        );
    }

    // Function to pay a bill using Arbitrum L2
    function payBill(
        uint256 billId
    ) external payable onlyOwner sufficientFunds(bills[billId].amount) {
        // Retrieve the L2 Inbox contract
        IInbox inbox = IInbox(ARB_INBOX);

        // Encode the call data for the payment
        bytes memory messageData = abi.encodeWithSignature(
            "sendTxToL1(address,uint256)",
            bills[billId].recipient,
            bills[billId].amount
        );

        // Send the message to L2 Inbox
        inbox.createRetryableTicket{value: msg.value}(
            address(this),
            0,
            0,
            msg.sender,
            msg.sender,
            0,
            0,
            messageData
        );

        // Mark the bill as paid
        bills[billId].paid = true;

        // Emit the event
        emit BillPaid(billId, bills[billId].recipient, bills[billId].amount);
    }

    // Function to lock a percentage of saved amount for a bill payment
    function lockBillPayment(
        uint256 billId,
        uint256 lockDurationDays
    ) external onlyOwner {
        require(billId <= billCount, "Invalid bill ID");

        Bill storage bill = bills[billId];

        // Calculate the amount to be locked
        uint256 lockAmount = address(this).balance.mul(bill.lockPercentage).div(
            100
        );

        // Ensure the saved amount is sufficient for the lock
        require(
            address(this).balance >= lockAmount,
            "Insufficient funds for locking"
        );

        // Calculate lock duration in seconds
        uint256 lockDurationSeconds = lockDurationDays.mul(86400);

        // Set the lock release time
        bill.lockReleaseTime = block.timestamp.add(lockDurationSeconds);

        // Emit the event
        emit BillLocked(billId, lockAmount, bill.lockReleaseTime);
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
        return (bill.lockPercentage, bill.lockReleaseTime);
    }
}

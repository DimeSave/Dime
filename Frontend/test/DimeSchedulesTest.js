import {expect} from "chai";
import ethers from "hardhat";

describe("Test DimeSchedule Contract", function () {
    let DimeSchedule;
    let dimeSchedule;
    let owner;
    let recipient;
    const billAmount = ethers.utils.parseEther("0.5"); // 0.5 ether
    const lockDurationMins = 10;

    before("Deploy Contract First", async function () {
        [owner] = await ethers.getSigners();
        DimeSchedule = await ethers.getContractFactory("DimeSchedule");
        dimeSchedule = await DimeSchedule.deploy(owner.address);
        await dimeSchedule.deployed();
        await dimeSchedule.addBill(recipient.address, billAmount, lockDurationMins);
    });

    it("Should deposit funds into the piggy bank", async function () {
        const initialBalance = await dimeSchedule.balances(owner.address);
        await dimeSchedule.deposit({ value: depositAmount });
        const finalBalance = await dimeSchedule.balances(owner.address);

        // Check if the balance increased by the deposit amount
        expect(finalBalance).to.equal(initialBalance.add(depositAmount));
    });

    it("Should revert if deposit amount is zero", async function () {
        // Attempt to deposit zero amount
        await expect(dimeSchedule.deposit({ value: 0 })).to.be.revertedWith(
            "Deposit amount must be greater than 0."
        );
    });

    it("Should emit a Deposit event", async function () {
        await expect(dimeSchedule.deposit({ value: depositAmount }))
            .to.emit(dimeSchedule, "Deposit")
            .withArgs(owner.address, depositAmount);
    });

    it("Should add a bill payment", async function () {
        const initialBillCount = await dimeSchedule.billCount();
        await dimeSchedule.addBill(recipient.address, billAmount, lockDurationMins);
        const finalBillCount = await dimeSchedule.billCount();

        // Check if the bill count increased by one
        expect(finalBillCount).to.equal(initialBillCount.add(1));

        // Check if the bill details are correct
        const bill = await dimeSchedule.bills(finalBillCount);
        expect(bill.recipient).to.equal(recipient.address);
        expect(bill.amount).to.equal(billAmount);
        expect(bill.paid).to.equal(false);
        expect(bill.lockDuration).to.equal(lockDurationMins * 60); // Convert minutes to seconds
        // Lock release time should be roughly `block.timestamp + lockDurationMins * 60`
        expect(bill.lockReleaseTime).to.be.closeTo(
            (await ethers.provider.getBlock("latest")).timestamp + lockDurationMins * 60,
            5 // Allow a 5-second deviation due to block timestamp fluctuations
        );
    });

    it("Should revert if deposit amount is zero", async function () {
        // Attempt to add a bill with zero amount
        await expect(dimeSchedule.addBill(recipient.address, 0, lockDurationMins)).to.be.revertedWith(
            "Deposit amount must be greater than 0."
        );
    });

    it("Should emit a BillAdded event", async function () {
        await expect(dimeSchedule.addBill(recipient.address, billAmount, lockDurationMins))
            .to.emit(dimeSchedule, "BillAdded")
            .withArgs(await dimeSchedule.billCount(), recipient.address, billAmount, ethers.BigNumber);
        // The last argument (lock release time) is dynamic, so we use ethers.BigNumber to match any value
    });

    beforeEach("Add a bill payment before each test", async function () {
        await dimeSchedule.addBill(recipient.address, billAmount, lockDurationMins);
    });

    it("Should pay a bill", async function () {
        const initialBalance = await ethers.provider.getBalance(owner.address);
        const initialBillCount = await dimeSchedule.billCount();

        await dimeSchedule.payBill(initialBillCount);

        const finalBalance = await ethers.provider.getBalance(owner.address);
        const finalBillCount = await dimeSchedule.billCount();

        // Check if the bill count decreased by one
        expect(finalBillCount).to.equal(initialBillCount.sub(1));

        // Check if the owner's balance increased by the bill amount
        expect(finalBalance).to.equal(initialBalance.add(billAmount));

        // Check if the bill is marked as paid
        const bill = await dimeSchedule.bills(finalBillCount);
        expect(bill.paid).to.equal(true);
    });

    it("Should revert if bill ID is invalid", async function () {
        // Attempt to pay a bill with an invalid ID
        await expect(dimeSchedule.payBill(0)).to.be.revertedWith("Invalid bill ID");
    });

    it("Should revert if bill has already been paid", async function () {
        // Mark the bill as paid before attempting to pay it again
        await dimeSchedule.payBill(1);

        // Attempt to pay the same bill again
        await expect(dimeSchedule.payBill(1)).to.be.revertedWith("Bill has already been paid");
    });

    it("Should revert if lock duration has not been reached", async function () {
        // Increase lock duration to avoid reaching it
        await ethers.provider.send("evm_increaseTime", [lockDurationMins * 60 - 1]);

        // Attempt to pay the bill before the lock duration has been reached
        await expect(dimeSchedule.payBill(1)).to.be.revertedWith("Lock duration has not been reached");
    });

    it("Should emit a BillPaid event", async function () {
        await expect(dimeSchedule.payBill(1)).to.emit(dimeSchedule, "BillPaid").withArgs(1, recipient.address, billAmount);
    });
});

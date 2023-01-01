const { devNetworks } = require("../helper-hardhat-config")
const { network, ethers, deployments } = require("hardhat")
const { expect } = require("chai")



!devNetworks.includes(network.name) ? describe.skip

: describe("Testing BoxV2 Contract", () => {

    let deployer, box

    beforeEach("Deploying BoxV2 Contract...", async() => {

        const accounts = await ethers.getSigners()

        deployer = accounts[0]

        await deployments.fixture(["all"])

        box = await ethers.getContract("BoxV2", deployer)
    })

    describe("setValue", () => {

        it("It should set the value", async() => {

            const value = 100

            await box.setValue(value)

            expect(await box.retrieve()).to.equal(value)
        })

        it("It should emit an event upon setting the value", async() => {

            const value = 100

            await expect(box.setValue(value)).to.emit(box, "ValueChanged")
        })
    })

    describe("version", () => {

        it("It should return the version of the contract", async() => {

            expect(await box.version()).to.equal(2)
        })
    })

    describe("increment", () => {

        it("It should increment the value", async() => {

            const value = 100

            await box.setValue(value)

            await box.increment()

            expect(await box.retrieve()).to.equal(value + 5)
        })

        it("It should emit an event upon incrementing the value", async() => {

            await expect(box.increment()).to.emit(box, "ValueChanged")
        })
    })
})
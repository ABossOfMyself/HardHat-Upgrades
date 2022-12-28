const { ethers } = require("hardhat")



const main = async() => {

    const boxProxyAdmin = await ethers.getContract("BoxProxyAdmin")



    const transparentProxy = await ethers.getContract("Box_Proxy")  // "Box_Proxy" is our "Transparent Upgradable Proxy".



    const accounts = await ethers.getSigners()

    const deployer = accounts[0]



    const proxyBoxV1 = await ethers.getContractAt("Box", transparentProxy.address, deployer)  // Before the upgrade our "transparent proxy" is pointing on the "ABI" of the "Box" contract.

    const beforeUpgradeVersion = await proxyBoxV1.version()

    console.log(`Version : ${beforeUpgradeVersion.toString()}`)



    const boxV2 = await ethers.getContract("BoxV2")



    console.log("Upgrading...")

    const upgradeTx = await boxProxyAdmin.upgrade(transparentProxy.address, boxV2.address)  // By upgrading we are changing "Implementation contract" from "Box" --> to "BoxV2" by pointing our "transparent proxy" to the "BoxV2" contract address.

    await upgradeTx.wait(1)
    
    console.log("Upgraded!")



    const proxyBoxV2 = await ethers.getContractAt("BoxV2", transparentProxy.address, deployer)  // As we upgraded the "ABI" from "Box" --> to "BoxV2" | Now, Our "transparent proxy" is pointing on the "ABI" of the "BoxV2" contract.

    const afterUpgradeVersion = await proxyBoxV2.version()  // The version of our "transparent proxy" should be updated as well.

    console.log(`Version : ${afterUpgradeVersion.toString()}`)
}



main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
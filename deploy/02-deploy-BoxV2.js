const { network } = require("hardhat")
const { devNetworks } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")



module.exports = async({ getNamedAccounts, deployments }) => {

    const { deploy, log } = deployments

    const { deployer } = await getNamedAccounts()


    const boxV2 = await deploy("BoxV2", {

        from: deployer,

        args: [],

        log: true,

        waitConfirmations: network.config.blockConfirmations || 1
    })


    log("BoxV2 Deployed!")

    log("-------------------------------------------------")



    if(!devNetworks.includes(network.name) && process.env.ETHERSCAN_API_KEY) {

        await verify(boxV2.address, [])
    }
}



module.exports.tags = ["all", "boxV2"]
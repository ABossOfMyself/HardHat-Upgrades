const { network } = require("hardhat")
const { devNetworks } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")



module.exports = async({ getNamedAccounts, deployments }) => {

    const { deploy, log } = deployments

    const { deployer } = await getNamedAccounts()
    

    const box = await deploy("Box", {

        from: deployer,

        args: [],

        log: true,

        waitConfirmations: network.config.blockConfirmations || 1,

        proxy: {

            proxyContract: "OpenZeppelinTransparentProxy",

            viaAdminContract: {

                name: "BoxProxyAdmin",

                artifact: "BoxProxyAdmin"
            }
        }
    })


    log("Box Deployed!")

    log("-------------------------------------------------")



    if(!devNetworks.includes(network.name) && process.env.ETHERSCAN_API_KEY) {

        await verify(box.address, [])
    }
}



module.exports.tags = ["all", "box"]
// const LocalToken = artifacts.require('LocalToken');
// const LocalTokenDistribution = artifacts.require('LocalTokenDistribution');
const VestingVault = artifacts.require('VestingVault');
const Web3 = require('web3');

module.exports = function (deployer, network) {
    if (network === 'remote') {
        const provider = new Web3.providers.HttpProvider(
            "https://" + process.env.GETH_REMOTE_URL,
            5000,
            process.env.GETH_USER,
            process.env.GETH_PASSWORD
        );

        const web3 = new Web3(provider);
        web3.personal.unlockAccount(web3.eth.accounts[0], process.env.PASSWORD);
    } else if (network === 'local') {
        const provider = new Web3.providers.HttpProvider("http://localhost:8545");
        const web3 = new Web3(provider);
        web3.personal.unlockAccount(web3.eth.accounts[0], process.env.PASSWORD);
    }

    deployer.deploy(VestingVault, '0x11f6ecc9e2658627e0876212f1078b9f84d3196e').then(() => {
        console.log('--------------------------------------------------------');
        console.log('[VestingVault] contract deployed: ', '0x11f6ecc9e2658627e0876212f1078b9f84d3196e');
        // return deployer.deploy(LocalTokenDistribution, LocalToken.address, VestingVault.address).then(() => {
        //     console.log('--------------------------------------------------------');
        //     console.log('[LocalTokenDistribution] contract deployed: ', LocalTokenDistribution.address);
        // });
    });
};

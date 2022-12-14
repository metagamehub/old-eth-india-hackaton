const { Wallet, Contract, providers } = require("ethers");

const provider = providers.getDefaultProvider(process.env.RPC_URL);
const signer = new Wallet(process.env.ADMIN_WALLET_PRIVATE_KEY, provider);

const mlp_contract_address = process.env.MLP_CONTRACT_ADDRESS;
const badges_contract_address = process.env.BADGES_CONTRACT_ADDRESS;

const mlp_abi = ["function addPoints(address who, uint256 amount, bytes signature)"];
const badges_abi = [
	"function mintBadge(address recipient, uint256 id)",
	"function balanceOfBatch(address[] accounts, uint256[] ids) view returns(uint256[])",
];

const mlp_contract = new Contract(mlp_contract_address, mlp_abi, signer);
const badges_contract = new Contract(badges_contract_address, badges_abi, signer);

const mintTokens = async (address, token_amount) => {
	try {
		console.log(address);
		console.log(">>>>>>>> gas price:", await signer.getGasPrice());
		tx = await mlp_contract.addPoints(address, token_amount, "0x", {
			gasPrice: (await signer.getGasPrice())*1.5,
		});
		result = await tx.wait();

		console.log(">>>>>>>> result:", result.events);
		return;
	} catch (err) {
		console.log(err);
	}
};

const mintBadges = async (address, id) => {
	try {
		await badges_contract.mintBadge(address, id, {
			gasPrice: signer.getGasPrice(),
		});
	} catch (err) {
		console.log(err);
	}
};

const balanceOfBatch = async (walletAddress) => {
	return await badges_contract.balanceOfBatch(
		[walletAddress, walletAddress, walletAddress, walletAddress, walletAddress],
		[1, 2, 3, 4, 5]
	);
};

module.exports.mintTokens = mintTokens;

module.exports.mintBadges = mintBadges;

module.exports.balanceOfBatch = balanceOfBatch;

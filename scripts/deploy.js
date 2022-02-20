const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  const domainContract = await domainContractFactory.deploy("snk");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  let txn = await domainContract.register("jhordy", { value: hre.ethers.utils.parseEther('0.1') });
  await txn.wait();
  console.log("Minted domain jhordy.snk");

  txn = await domainContract.setRecord("jhordy", "Am I a jhordy or a snk??");
  await txn.wait();
  console.log("Set record for jhordy.snk");

  const address = await domainContract.getAddress("jhordy");
  console.log("Owner of domain jhordy:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
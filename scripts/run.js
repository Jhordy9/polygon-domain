const main = async () => {
  const [owner, superCoder] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  // We pass in "snk" to the constructor when deploying
  const domainContract = await domainContractFactory.deploy("snk");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  // We're passing in a second variable - value. This is the moneyyyyyyyyyy
  let txn = await domainContract.register("jhordy", { value: hre.ethers.utils.parseEther('0.1') });
  await txn.wait();

  const address = await domainContract.getAddress("jhordy");
  console.log("Owner of domain:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

  try {
    txn = await domainContract.connect(superCoder).withdraw();
    await txn.wait();
  } catch (err) {
    console.log("Could not rob contract");
  }

  let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
  console.log("Balance of owner before withdraw:", hre.ethers.utils.formatEther(ownerBalance));

  txn = await domainContract.connect(owner).withdraw();
  await txn.wait();

  ownerBalance = await hre.ethers.provider.getBalance(owner.address);
  console.log("Balance of owner after withdraw:", hre.ethers.utils.formatEther(ownerBalance));
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

runMain();
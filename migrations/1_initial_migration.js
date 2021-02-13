const Migrations = artifacts.require("Migrations");
const IkaCoin = artifacts.require("IkaCoin");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(IkaCoin);
};

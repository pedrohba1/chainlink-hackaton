const Paper = artifacts.require("Paper");

contract("Testes do paperNFT", async accounts => {
    it("O deploy do contrato deveria ser feito", async () => {
        const instance = await Paper.deployed();
        console.log(instance.address);
    });

    it("O deploy do contrato deveria ser feito", async () => {
        const instance = await Paper.deployed();
        const res = await instance.mintItem(accounts[1],'{"name":"algum item"}');
        console.log(res);




        
   
    });

});
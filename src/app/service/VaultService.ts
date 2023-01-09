import { Token } from "../models/Token";
import { Vault } from "../models/Vault";
import { YieldPool } from "../models/YieldPool";

export class VaultService {
    private vaults: Vault[];

    constructor() {
        this.vaults = [];
        this.addSampleVaultData();
    }

    addSampleVaultData() {
        const vault1 = new Vault("USDC", "", "Ethereum", "3.81-6.78%", "75", "213,341 USD", "usdc");
        const pool1: YieldPool = new YieldPool("Yearn", new Token("USDC", "usdc", true), "yfi", 5.21);
        const pool2: YieldPool = new YieldPool("Hop", new Token("USDC", "usdc", true), "hop", 6.78);
        const pool3: YieldPool = new YieldPool("AAVE V3", new Token("USDC", "usdc", true), "aave", 3.52);
        const pool4: YieldPool = new YieldPool("Balancer", new Token("USDC", "usdc", true), "bal", 4.17);
        const pool5: YieldPool = new YieldPool("Compound", new Token("USDC", "usdc", true), "comp", 3.81);
        vault1.pools.push(pool1);
        vault1.pools.push(pool2);
        vault1.pools.push(pool3);
        vault1.pools.push(pool4);
        vault1.pools.push(pool5);
        this.vaults.push(vault1);

        const vault2 = new Vault("DAI", "", "Ethereum", "3.88-7.18%", "45", "716,889 USD", "dai");
        const pool6: YieldPool = new YieldPool("Yearn", new Token("DAI", "dai", true), "yfi", 7.18);
        const pool7: YieldPool = new YieldPool("Hop", new Token("DAI", "dai", true), "hop", 4.27);
        const pool8: YieldPool = new YieldPool("AAVE V3", new Token("DAI", "dai", true), "aave", 4.12);
        const pool9: YieldPool = new YieldPool("Balancer", new Token("DAI", "dai", true), "bal", 3.88);
        const pool10: YieldPool = new YieldPool("Compound", new Token("DAI", "dai", true), "comp", 6.02);
        vault2.pools.push(pool6);
        vault2.pools.push(pool7);
        vault2.pools.push(pool8);
        vault2.pools.push(pool9);
        vault2.pools.push(pool10);
        this.vaults.push(vault2);

        const vault3: Vault = new Vault("USDT", "", "Arbitrum", "5.21% - 7.09%", "45", "1,231,092 USD", "usdt");
        const vault4: Vault = new Vault("WBTC", "USDT", "Optimism", "13.38%", "75", "213,341 USD", "wbtc");
        const vault5: Vault = new Vault("ETH", "USDC", "Ethereum", "9.02%", "75", "105,625 USD", "eth");
        vault4.img2 = "usdt";
        vault4.id = 4;
        vault5.img2 = "usdc";
        vault5.id = 5;
        this.vaults.push(vault3);
        this.vaults.push(vault4);
        this.vaults.push(vault5);
    }

    public getVaultData(token: string): Vault {
        const vaultSearch = this.vaults.filter((vault) => {
            if (vault.token1 == token) {
                return true;
            }
            return false;
        });
        return vaultSearch.at(0) as Vault;
    }

    public getAllVaults(): Vault[] {
        return this.vaults;
    }
}

import { YieldPool } from "./YieldPool";

export class Vault {
  public id: number = 2;
  public token1: string;
  public token2: string;
  public network: string;
  public apy: string;
  public fee: string;
  public tvum: string;
  public img: string;
  public img2: string = "";
  public pools: YieldPool[];

  constructor(_token1: string, _token2: string, _network: string, _apy: string, _fee: string, _tvum: string, _img: string) {
    this.token1 = _token1;
    this.token2 = _token2;
    this.network = _network;
    this.apy = _apy;
    this.fee = _fee;
    this.tvum = _tvum;
    this.img = _img;
    this.pools = [];
  }
}
  
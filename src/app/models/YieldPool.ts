import { Token } from "./Token";

export class YieldPool {
    public project: string;
    public token: Token;
    public icon: string;
    public apy: number;

    constructor(_project: string, _token: Token, _icon: string, _apy: number) {
        this.project = _project;
        this.token = _token;
        this.icon = _icon;
        this.apy = _apy;
    }
}
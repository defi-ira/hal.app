export class Token {
    public name: string;
    public icon: string;
    public stable: boolean;

    constructor(_name: string, _icon: string, _stable: boolean) {
        this.name = _name;
        this.icon = _icon;
        this.stable = _stable;
    }
}
export class CausaBeneficaDto {
    readonly id: number;
    readonly nombre: string;
    readonly wallet: string;
    readonly fondosRecibidos: string;
    readonly cantidad: number;

    constructor(
        nombre: string,
        wallet: string,
        fondosRecibidos: string
    ) {
        this.nombre = nombre;
        this.wallet = wallet;
        this.fondosRecibidos = fondosRecibidos;
    }
}
import { EventEmitter } from "events";
export declare class Minuteur extends EventEmitter {
    private durée;
    private secondes;
    private intervalId?;
    constructor(durée: number);
    on(event: "tick", listener: (secondes: number) => void): this;
    on(event: "terminé", listener: () => void): this;
    on(event: "erreur", listener: (err: Error) => void): this;
    emit(event: "tick", secondes: number): boolean;
    emit(event: "terminé"): boolean;
    emit(event: "erreur", err: Error): boolean;
    démarrer(): void;
    private stop;
}
//# sourceMappingURL=Minuteur.d.ts.map
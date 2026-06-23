import { EventEmitter } from "events";
export declare class FileDePriorite<T> extends EventEmitter {
    private items;
    ajouter(élément: T, priorité: number): void;
    traiterProchain(): T | undefined;
    taille(): number;
}
//# sourceMappingURL=FileDePriorite.d.ts.map
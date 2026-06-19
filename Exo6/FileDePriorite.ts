import { EventEmitter } from "events";

export class FileDePriorite<T> extends EventEmitter {
    private items: { value: T; priority: number }[] = [];

    ajouter(élément: T, priorité: number): void {
        this.items.push({ value: élément, priority: priorité });
        this.emit("ajout", élément, priorité);
    }

    traiterProchain(): T | undefined {
        if (this.items.length === 0) {
            this.emit("vide");
            return undefined;
        }

        this.items.sort((a, b) => b.priority - a.priority);

        const item = this.items.shift()!;
        this.emit("traitement", item.value);

        return item.value;
    }

    taille(): number {
        return this.items.length;
    }
}
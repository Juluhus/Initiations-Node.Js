import { EventEmitter } from "events";
export class FileDePriorite extends EventEmitter {
    items = [];
    ajouter(élément, priorité) {
        this.items.push({ value: élément, priority: priorité });
        this.emit("ajout", élément, priorité);
    }
    traiterProchain() {
        if (this.items.length === 0) {
            this.emit("vide");
            return undefined;
        }
        this.items.sort((a, b) => b.priority - a.priority);
        const item = this.items.shift();
        this.emit("traitement", item.value);
        return item.value;
    }
    taille() {
        return this.items.length;
    }
}
//# sourceMappingURL=FileDePriorite.js.map
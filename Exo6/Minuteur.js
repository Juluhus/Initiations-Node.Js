import { EventEmitter } from "events";
import { ÉvénementsMinuteur } from "./eventMinuteur";
export class Minuteur extends EventEmitter {
    durée;
    secondes = 0;
    intervalId;
    constructor(durée) {
        super();
        this.durée = durée;
    }
    on(event, listener) {
        return super.on(event, listener);
    }
    emit(event, ...args) {
        return super.emit(event, ...args);
    }
    démarrer() {
        if (this.durée <= 0) {
            this.emit("erreur", new Error("Durée invalide"));
            return;
        }
        this.secondes = 0;
        this.intervalId = setInterval(() => {
            this.secondes++;
            this.emit("tick", this.secondes);
            if (this.secondes >= this.durée) {
                this.stop();
                this.emit("terminé");
            }
        }, 1000);
    }
    stop() {
        if (this.intervalId)
            clearInterval(this.intervalId);
    }
}
//# sourceMappingURL=Minuteur.js.map
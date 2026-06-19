import { EventEmitter } from "events";
import { ÉvénementsMinuteur } from "./eventMinuteur";

export class Minuteur extends EventEmitter {
    private durée: number;
    private secondes = 0;
    private intervalId?: NodeJS.Timeout;

    constructor(durée: number) {
        super();
        this.durée = durée;
    }

    on(event: "tick", listener: (secondes: number) => void): this;
    on(event: "terminé", listener: () => void): this;
    on(event: "erreur", listener: (err: Error) => void): this;
    on(event: keyof ÉvénementsMinuteur, listener: (...args: any[]) => void): this {
        return super.on(event, listener);
    }

    emit(event: "tick", secondes: number): boolean;
    emit(event: "terminé"): boolean;
    emit(event: "erreur", err: Error): boolean;
    emit(event: keyof ÉvénementsMinuteur, ...args: any[]): boolean {
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

    private stop() {
        if (this.intervalId) clearInterval(this.intervalId);
    }
}
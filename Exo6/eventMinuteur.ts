export interface ÉvénementsMinuteur {
    tick: (secondes: number) => void;
    terminé: () => void;
    erreur: (err: Error) => void;
}
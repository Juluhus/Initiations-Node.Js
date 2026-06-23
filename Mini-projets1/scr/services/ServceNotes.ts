import { lireNotes, sauvegarderNotes } from "../storage";
import { Note, Priorité, StatutNote } from "../types";

export class ServiceNotes {
  async charger(): Promise<Note[]> {
    return lireNotes();
  }

  async sauvegarder(
    notes: Note[]
  ): Promise<void> {
    await sauvegarderNotes(notes);
  }

  async ajouter(
    contenu: string,
    tags: string[],
    priorité: Priorité
  ): Promise<Note> {
    const notes = await this.charger();

    const nouvelId =
      notes.length === 0
        ? 1
        : Math.max(
            ...notes.map(n => n.id)
          ) + 1;

    const maintenant =
      new Date().toISOString();

    const note: Note = {
      id: nouvelId,
      contenu,
      tags,
      priorité,
      statut: "active",
      créeÀ: maintenant,
      modifiéeÀ: maintenant,
    };

    notes.push(note);

    await this.sauvegarder(notes);

    return note;
  }

  async lister(filtres?: {
    tag?: string;
    priorité?: Priorité;
    statut?: StatutNote;
  }): Promise<Note[]> {
    let notes = await this.charger();

    if (filtres?.tag) {
      notes = notes.filter(note =>
        note.tags.includes(
          filtres.tag!
        )
      );
    }

    if (filtres?.priorité) {
      notes = notes.filter(
        note =>
          note.priorité ===
          filtres.priorité
      );
    }

    if (filtres?.statut) {
      notes = notes.filter(
        note =>
          note.statut ===
          filtres.statut
      );
    }

    return notes;
  }

  async chercher(
    requête: string
  ): Promise<Note[]> {
    const notes =
      await this.charger();

    const recherche =
      requête.toLowerCase();

    return notes.filter(note => {
      const contenu =
        note.contenu.toLowerCase();

      const tags = note.tags.some(
        tag =>
          tag
            .toLowerCase()
            .includes(recherche)
      );

      return (
        contenu.includes(
          recherche
        ) || tags
      );
    });
  }

  async terminer(
    id: number
  ): Promise<Note> {
    const notes =
      await this.charger();

    const note = notes.find(
      n => n.id === id
    );

    if (!note) {
      throw new Error(
        "Note introuvable"
      );
    }

    note.statut = "terminée";
    note.modifiéeÀ =
      new Date().toISOString();

    await this.sauvegarder(notes);

    return note;
  }

  async supprimer(
    id: number
  ): Promise<void> {
    const notes =
      await this.charger();

    const index =
      notes.findIndex(
        n => n.id === id
      );

    if (index === -1) {
      throw new Error(
        "Note introuvable"
      );
    }

    notes.splice(index, 1);

    await this.sauvegarder(notes);
  }

  async exporter(
    format: "json" | "csv"
  ): Promise<string> {
    const notes =
      await this.charger();

    if (format === "json") {
      return JSON.stringify(
        notes,
        null,
        2
      );
    }

    const lignes = [
      "id,contenu,tags,priorité,statut",
    ];

    for (const note of notes) {
      lignes.push(
        [
          note.id,
          `"${note.contenu}"`,
          `"${note.tags.join(";")}"`,
          note.priorité,
          note.statut,
        ].join(",")
      );
    }

    return lignes.join("\n");
  }

  async stats(): Promise<{
    total: number;
    terminées: number;
    parPriorité: Record<
      Priorité,
      number
    >;
  }> {
    const notes =
      await this.charger();

    return {
      total: notes.length,

      terminées: notes.filter(
        n =>
          n.statut ===
          "terminée"
      ).length,

      parPriorité: {
        basse: notes.filter(
          n =>
            n.priorité ===
            "basse"
        ).length,

        normale: notes.filter(
          n =>
            n.priorité ===
            "normale"
        ).length,

        haute: notes.filter(
          n =>
            n.priorité ===
            "haute"
        ).length,
      },
    };
  }
}
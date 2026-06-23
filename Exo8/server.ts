import { createServer } from "http";
import { parse } from "url";

import { Router } from "./router";
import { lireBody } from "./utils/body";
import { creerUtilisateur } from "./data/utilisateurs";

import { auth } from "./middlewares/auth";
import { cors } from "./middlewares/cors";
import { logger } from "./middlewares/logger";

const router = new Router();

const middlewares = [
  cors,
  auth,
  logger,
];

function json(
  res: any,
  status: number,
  data: unknown
) {
  res.statusCode = status;
  res.setHeader(
    "Content-Type",
    "application/json"
  );

  res.end(JSON.stringify(data));
}

// Étape 1 

router.get("/", (req, res) => {
  json(res, 200, {
    message: "Bienvenue",
  });
});

router.get("/santé", (req, res) => {
  json(res, 200, {
    statut: "ok",
    timestamp: Date.now(),
  });
});

// Étape 2

router.get(
  "/utilisateurs/:id",
  (req, res, params) => {
    json(res, 200, {
      id: params.id,
      nom: "Alice",
    });
  }
);

router.get(
  "/recherche",
  (req, res, params, query) => {
    json(res, 200, {
      résultats: [],
      requête: query.q ?? "",
    });
  }
);

// Étape 3

router.post(
  "/utilisateurs",
  async (req, res) => {
    try {
      const body = await lireBody(req) as {
        nom?: string;
        email?: string;
      };

      if (!body.nom || !body.email) {
        json(res, 400, {
          erreur:
            "nom et email sont requis",
        });

        return;
      }

      const utilisateur =
        creerUtilisateur(
          body.nom,
          body.email
        );

      json(res, 201, utilisateur);
    } catch {
      json(res, 400, {
        erreur: "JSON invalide",
      });
    }
  }
);

const server = createServer(
  async (req, res) => {
    const parsedUrl = parse(
      req.url || "",
      true
    );

    const pathname =
      parsedUrl.pathname || "/";

    const query: Record<
      string,
      string
    > = {};

    for (const [key, value] of Object.entries(
      parsedUrl.query
    )) {
      if (typeof value === "string") {
        query[key] = value;
      }
    }

    let index = -1;

    const execute =
      async (): Promise<void> => {
        index++;

        if (
          index < middlewares.length
        ) {
          await middlewares[index](
            req,
            res,
            execute
          );

          return;
        }

        const route =
          router.match(
            req.method || "GET",
            pathname
          );

        if (!route) {
          json(res, 404, {
            erreur:
              "Route introuvable",
          });

          return;
        }

        await route.handler(
          req,
          res,
          route.params,
          query
        );
      };

    try {
      await execute();
    } catch {
      json(res, 500, {
        erreur:
          "Erreur interne du serveur",
      });
    }
  }
);

server.listen(3000, () => {
  console.log(
    "Serveur démarré sur http://localhost:3000"
  );
});
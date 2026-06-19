// Etape 1
export function parserArgs(argv: string[]) {
  const flags: Record<string, string | boolean> = {};
  const positionnels: string[] = [];

  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];

    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = argv[i + 1];

      if (next && !next.startsWith("--")) {
        flags[key] = next;
        i++;
      } else {
        flags[key] = true;
      }
    } else {
      positionnels.push(arg);
    }
  }

  return { flags, positionnels };
}

// Etape 2

type FlagsResult<S> = {
  [K in keyof S]?: S[K];
};

export function parserArgsTyped<S extends Record<string, any>>(
  argv: string[]
): {
  flags: FlagsResult<S>;
  positionnels: string[];
} {
  const flags: Record<string, any> = {};
  const positionnels: string[] = [];

  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];

    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = argv[i + 1];

      if (next && !next.startsWith("--")) {
        flags[key] = next;
        i++;
      } else {
        flags[key] = true;
      }
    } else {
      positionnels.push(arg);
    }
  }

  return {
    flags: flags as FlagsResult<S>,
    positionnels,
  };
}

// Etape 3
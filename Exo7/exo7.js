// Etape 1
export function parserArgs(argv) {
    const flags = {};
    const positionnels = [];
    for (let i = 2; i < argv.length; i++) {
        const arg = argv[i];
        if (arg.startsWith("--")) {
            const key = arg.slice(2);
            const next = argv[i + 1];
            if (next && !next.startsWith("--")) {
                flags[key] = next;
                i++;
            }
            else {
                flags[key] = true;
            }
        }
        else {
            positionnels.push(arg);
        }
    }
    return { flags, positionnels };
}
export function parserArgsTyped(argv) {
    const flags = {};
    const positionnels = [];
    for (let i = 2; i < argv.length; i++) {
        const arg = argv[i];
        if (arg.startsWith("--")) {
            const key = arg.slice(2);
            const next = argv[i + 1];
            if (next && !next.startsWith("--")) {
                flags[key] = next;
                i++;
            }
            else {
                flags[key] = true;
            }
        }
        else {
            positionnels.push(arg);
        }
    }
    return {
        flags: flags,
        positionnels,
    };
}
// Etape 3
//# sourceMappingURL=exo7.js.map
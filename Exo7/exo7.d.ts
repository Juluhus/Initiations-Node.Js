export declare function parserArgs(argv: string[]): {
    flags: Record<string, string | boolean>;
    positionnels: string[];
};
type FlagsResult<S> = {
    [K in keyof S]?: S[K];
};
export declare function parserArgsTyped<S extends Record<string, any>>(argv: string[]): {
    flags: FlagsResult<S>;
    positionnels: string[];
};
export {};
//# sourceMappingURL=exo7.d.ts.map
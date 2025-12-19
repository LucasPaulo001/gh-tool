
export function getFlag(flag: string): string | null{
    const index = process.argv.indexOf(flag)
    return index !== -1 ? process.argv[index + 1] : null
}

export function hasFlag(flag: string): boolean{
    return process.argv.includes(flag);
}


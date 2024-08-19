export function snakeCaseToTitleCase(s: string) {
    return s.replace(/^_*(.)|_+(.)/g, (s, c, d) => (c ? c.toUpperCase() : ' ' + d.toUpperCase()));
}

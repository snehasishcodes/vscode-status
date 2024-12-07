export default function uid() {
    const p1 = `${Date.now()}`;
    const p2 = `${Math.floor(Math.random() * 100000000)}`;

    return `${p2}${p1}`;
}
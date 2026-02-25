export async function getFactoryStatus() {
    const res = await fetch('http://localhost:3000/status');
    return res.text();
}
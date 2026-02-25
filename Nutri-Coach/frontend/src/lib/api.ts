export async function getCoachAdvice() {
    const response = await fetch('http://localhost:8080/api/coach/suggestion');
    return await response.json();
}
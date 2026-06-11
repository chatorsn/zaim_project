export async function calculateLoan(amount: number, term: number) {
  const res = await fetch('/api/calculator', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, term })
  });
  return res.json();
}

let primes : number[] | null = null;

async function fetchPrimes() : Promise<number[]> {
	let data = await fetch('primes.json');
	let json = await data.json();
	return Object.values(json);
}

export async function getRandomPrime() : Promise<number> {
	if(primes === null) {
		primes = await fetchPrimes();
	}
	const randomIndex = Math.floor(Math.random() * primes.length);
	return primes[randomIndex];
}
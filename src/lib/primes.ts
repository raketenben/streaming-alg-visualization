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
	//primes.length
	const randomIndex = Math.floor(Math.random() * 100000);
	//return primes[randomIndex];
	return 1325017;
}
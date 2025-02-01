import { getRandomPrime } from '$lib/primes';

const get_random = () => {
	let rnd = Math.random() * 0xFFFFFFFFFFFFFFFF;
	rnd |= 8000000000000008;
	return rnd;
}

const isPrime = (num : number) => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if(num % i === 0) return false;
    }
    return num > 1;
}

const generate_prime = () => {
	let num = Math.floor(Math.random() * 1e10);
	while(!isPrime(num)) {
		num = Math.floor(Math.random() * 1e10);
	}
	return num;
}


class Predictor {
	p3! : number;
	p2! : number;
	p1! : number;
	p0! : number;
	bp! : number;

	counter = 0;

	constructor() {
		//this.bp = generate_prime();

		//console.log("Prime: ", this.bp," Coefficients: ", this.p3, this.p2, this.p1, this.p0);
	}

	async init() {
		//this.bp = await getRandomPrime();
		//this.bp = 1325017;
		//this.bp = 1741;
		//this.bp = 503;
		this.bp = 251;

		this.p3 = Math.floor(Math.random() * this.bp);
		this.p2 = Math.floor(Math.random() * this.bp);
		this.p1 = Math.floor(Math.random() * this.bp);
		this.p0 = Math.floor(Math.random() * this.bp);
	}

	hash(x: number) {
		return (this.p3 * Math.pow(x, 3) + this.p2 * Math.pow(x, 2) + this.p1 * x + this.p0) % this.bp % 2 == 0 ? 1 : -1;
	}

	predict(value: number) {
		let hashed = this.hash(value);
		this.counter += hashed;
		return Math.pow(this.counter, 2);
	}

	clear() {
		this.p3 = Math.floor(Math.random() * this.bp);
		this.p2 = Math.floor(Math.random() * this.bp);
		this.p1 = Math.floor(Math.random() * this.bp);
		this.p0 = Math.floor(Math.random() * this.bp);

		this.counter = 0;
	}
}

export default Predictor;
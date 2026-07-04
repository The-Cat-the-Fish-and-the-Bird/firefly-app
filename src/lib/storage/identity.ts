const STORAGE_KEY = 'firefly-identity';

export interface Identity {
	publicKey: JsonWebKey;
	privateKey: JsonWebKey;
}

export function saveIdentity(identity: Identity): void {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(identity));
}

export function loadIdentity(): Identity | null {
	const raw = localStorage.getItem(STORAGE_KEY);
	if (!raw) return null;
	return JSON.parse(raw) as Identity;
}

export function clearIdentity(): void {
	localStorage.removeItem(STORAGE_KEY);
}

export function hasIdentity(): boolean {
	return localStorage.getItem(STORAGE_KEY) !== null;
}

<script lang="ts">
	import { onMount } from 'svelte';
	import { generateKeyPair } from '$lib/crypto/keypair';
	import { saveIdentity, loadIdentity, type Identity } from '$lib/storage/identity';

	let identity = $state<Identity | null>(null);
	let loading = $state(false);

	onMount(() => {
		identity = loadIdentity();
	});

	async function handleGenerate() {
		loading = true;
		try {
			const keyPair = await generateKeyPair();
			saveIdentity(keyPair);
			identity = keyPair;
		} finally {
			loading = false;
		}
	}
</script>

<main>
	<h1>Firefly Identity</h1>

	{#if identity}
		<p>Identity exists</p>
		<h3>Public Key</h3>
		<pre>{JSON.stringify(identity.publicKey, null, 2)}</pre>
	{:else}
		<p>No identity yet.</p>
		<button onclick={handleGenerate} disabled={loading}>
			{loading ? 'Generating…' : 'Generate Identity'}
		</button>
	{/if}
</main>

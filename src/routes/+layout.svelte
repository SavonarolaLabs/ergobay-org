<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { reconnectErgoWallet } from '$lib/common/wallet';
	import { NotificationDisplay } from '@beyonk/svelte-notifications';
	import Navbar from '$lib/Navbar.svelte';
	import Footer from '$lib/Footer.svelte';

	onMount(async() => {
		await reconnectErgoWallet();
	});
</script>

<NotificationDisplay />
<Navbar />
<slot />
<Footer />
<script lang="ts">
	export let showModal:boolean; // boolean
	export let onBtnClick:Function|undefined;

	let dialog: HTMLDialogElement;


	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => {showModal = false}}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div 
		class="backdrop-blur-md bg-opacity-10 shadow-sm"
		on:click|stopPropagation>
		<slot />
		<!-- svelte-ignore a11y-autofocus -->
		<div class="flex justify-end mt-8">
			<button 
				class="btn w-full"
				autofocus on:click={() => {dialog.close(); onBtnClick?onBtnClick():'';}}>
				<slot name="btn"/>
			</button>
		</div>
	</div>
</dialog>

<style>
	dialog {
		border-radius: 0.2em;
		border: none;
		padding: 0;
		background: rgba(16, 16, 16, 0.2);
		color: #d1d1d1;
		border: 1px solid #80808045
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(2px);

	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>

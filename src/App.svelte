<script>
import Grid from './Grid.svelte';
import Confetti from './Confetti.svelte';
import {randomize, isWinner} from './logic.js';
import { fade } from 'svelte/transition';
</script>
<style>
.app {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
}
button {
	margin-top: 2rem;
	border: 0;
	background: hsl(313, 80%, 40%);
	color: #fff;
	padding: 1rem 2rem;
	border-radius: 0.5rem;
	font-weight: bold;
	font-size: 1.5rem;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 10px 20px rgba(0, 0, 0, 0.2);
	z-index: 100;
}
h1 {
	margin: 0;
}
p {
	max-width: 100%;
	width: 20rem;
	text-align: center;
}

.celebrate {
	position: absolute;
	inset: 0;
}
</style>
{#if $isWinner}
<div class="celebrate" out:fade><Confetti/></div>
{/if}
<div class="app">
	<h1>Number Squares</h1>
	<p>Click/tap a number to move it into the empty square</p>
	<Grid/>
	<button type="button" on:click={randomize}>Scramble</button>
</div>

<script>
import Grid from './Grid.svelte';
import {randomize} from './logic.js';
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
}
</style>

<div class="app">
	<Grid/>
	<button type="button" on:click={randomize}>Scramble</button>
</div>

<script>
import {board, clickCell, isWinner} from './logic.js';
</script>
<style>
.grid {
  position: relative;
  max-width: 100%;
  width: 20rem;
  height: 20rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 10px 20px rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  background-color: #fff;
  border: 0.5rem solid #fff;
}
.grid-square {
  background: #069;
  border: 2px solid #fff;
  border-radius: 0.5rem;
  color: #fff;
  font-size: 2.5rem;
  line-height: 90%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: 25%;
  text-align: center;
  position: absolute;
  transition: transform 100ms linear;
  cursor: pointer;
}
.grid-square > span {
  position: relative;
  top: -2px;
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none;
}
.grid-square:empty {
  background: transparent;
}
.winner {
  border-color: hsl(45, 100%, 50%);
  background-color: hsl(45, 100%, 50%);
}
.winner .grid-square {
  border-color: hsl(45, 100%, 50%);  
}
</style>
<div class="grid" class:winner={$isWinner}>
  {#each $board as {label, x, y}, i (label)}
    <div class="grid-square" style={`transform: translate(${x * 100}%, ${y * 100}%)`} on:click={() => clickCell(x, y)}>{#if label}<span>{label}</span>{/if}</div>
  {/each}
</div>
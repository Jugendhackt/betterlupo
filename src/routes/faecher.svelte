<script>

    import {goto} from '@sapper/app';
    import { onMount } from 'svelte';
    import questions from '../../static/questions.json';
    let currentAnswer = '';
    let currentQuestion = 0;
    let done = [];
    let currentFach = '';
    let points = {};
    
    for (let fach in questions['faecher']) {
        points[fach] = 0;
    }

    onMount( () => {
        const reihenfolge = JSON.parse(localStorage.getItem('reihenfolge'));
        currentFach = reihenfolge[0][0];
    });

    const getNextFach = () => {
        const reihenfolge = JSON.parse(localStorage.getItem('reihenfolge'));
        for (let i = 0; i < reihenfolge.length; i++) {
            if (!done.includes(reihenfolge[i])) {
                return reihenfolge[i];
            }
        }
        return undefined;
    };
    
    const handleNextFach = () => {
        done.push(currentFach);
        currentFach = getNextFach();
        currentQuestion = 0;
        currentAnswer = '';
        if(!currentFach) {
            localStorage.setItem('tableData', JSON.stringify(points));
            goto('/tables');
        }
    };

    const handleSelbeFach = (questionsUnterrichtsfachPunkte, questionsUnterrichtsfach) => {
        if (currentAnswer !== '') {
            currentQuestion++;
            currentAnswer = '';
        } else {
            alert('Bitte wähle mindestens eine Antwort aus!');
        }
    };

    

    const nextQuestion = () => {
        const questionsFachBereich = questions['faecher'][currentFach]['questions'];
        const nochInDerSelbenKategorie = currentQuestion < questionsFachBereich.length - 1;
        const questionsUnterrichtsfach = questionsFachBereich[currentQuestion];
        const questionsUnterrichtsfachPunkte = questionsUnterrichtsfach['points'];
        if(nochInDerSelbenKategorie) {
            handleSelbeFach(questionsUnterrichtsfachPunkte, questionsUnterrichtsfach, "fach");
        } else {
            handleNaechstesFach(questionsUnterrichtsfachPunkte, questionsUnterrichtsfach, "fach");
        }
        // if (currentAnswer !== '') {
        //     currentQuestion++;
        //     currentAnswer = '';
        // } else {
        //     alert('Bitte wähle mindestens eine Antwort aus!');
        // }
    };
</script>

<style>
    .container {
        display: flex;
    }

    h1 {
        font-size: 2em;
        font-weight: 400;
        margin: 0;
        text-align: center;
    }

    .left {
        transform: rotate(-180deg);
    }

    .arrow:hover {
        cursor: pointer;
        width: 60px;
        height: 60px;
    }

    .arrow {
        width: 50px;
        height: 50px;
        margin: 0 80px;
        align-self: center;
        transition: all 0.2s ease-in-out;
    }

    .answers {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    li {
        list-style: none;
        margin: 10px 0;
        font-size: 1.2em;
    }

    input[type="radio"] {
        background-color: rgb(255, 255, 255);
        margin: 0;
        padding: 0;
        font: inherit;
        color: black;
        width: 1em;
        height: 1em;
        border-radius: 50%;
    }


</style>


<div class="container">

  <img on:click={() => backQuestion()} class="arrow left" src="icons/arrow_forward.svg" alt="icon für questions" draggable="false">

  <div class="Question">
    <div class="col-12">

        {#if currentFach}
            <h1>{questions["faecher"][currentFach]["questions"][currentQuestion]["question"]}</h1>
        {:else}
            <h1>Es konnte keine neue Frage generiert werden -> Leite weiter</h1>
        {/if}


      
    </div>
    <div class="answers">
      <form>
        <ul>
        {#if currentFach}
            {#each questions["faecher"][currentFach]["questions"][currentQuestion]["answer"] as answer}
                {#if questions["faecher"][currentFach]["questions"][currentQuestion]["multiple"]}
                    <li>
                    <input type="checkbox" name="answer" bind:group={currentAnswer} value={answer} draggable="false">
                    <label for="answer">{answer}</label>
                    </li>
                {:else}
                    <li>
                    <input type="radio" name="answer" bind:group={currentAnswer} value={answer} draggable="false">
                    <label for="answer">{answer}</label>
                    </li>
                {/if}
            {/each}
        {:else}
          <h1>Es konnte keine neue Frage generiert werden -> Leite weiter</h1>
        {/if}
        </ul>
      </form>
      {#if currentAnswer}
        <p>Deine Antwort: {currentAnswer}</p>
      {:else}
        <p>Du musst min. 1 Antwort ausgewählt haben!</p>
      {/if}
    </div>
  </div>
  <img on:click={() => nextQuestion()} class="arrow right" src="icons/arrow_forward.svg" alt="icon für questions" draggable="false">

</div>
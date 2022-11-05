<script>

    import questions from '../../static/questions.json';

    // import goto
    import {goto} from '@sapper/app';

    let currentAnswer = '';

    let currentQuestion = 0;
    let done = [];
    let bereiche = questions['allebereiche'];
    let points = {};

    bereiche.forEach(bereich => {
        points[bereich] = 0;
    });

    let currentBereich = bereiche[0];


    const handleSelbeKategorie = (questionsUnterrichtsfachPunkte, questionsUnterrichtsfach) => {
        if (currentAnswer !== '') {
            points[currentBereich] += questionsUnterrichtsfachPunkte[questionsUnterrichtsfach.answer.indexOf(currentAnswer)];
            currentQuestion++;
            currentAnswer = '';
        } else {
            alert('Bitte wähle mindestens eine Antwort aus!');
        }
    };

    const handelKategorieReady = (questionsUnterrichtsfachPunkte, questionsUnterrichtsfach) => {
        currentQuestion = 0;
        done.push(currentBereich);
        if (currentAnswer) {
            points[currentBereich] += questionsUnterrichtsfachPunkte[questionsUnterrichtsfach.answer.indexOf(currentAnswer)];
        }
    };

    const findeNaechstenBereich = () => {
        for (let i = 1; i < bereiche.length; i++) {
            if (!done.includes(bereiche[i])) {
                return bereiche[i];
            }
        }
        return undefined;
    };

    const handleNaechsteKategorie = (questionsUnterrichtsfachPunkte, questionsUnterrichtsfach) => {
        handelKategorieReady(questionsUnterrichtsfachPunkte, questionsUnterrichtsfach);
        currentBereich = findeNaechstenBereich();
        currentAnswer = '';
        if (!currentBereich) {
            alert('Du hast alle Bereiche durchlaufen!');
            console.log(currentBereich);
            goto('/');
        }

    };

    const nextQuestion = () => {
        const questionsFachBereich = questions['bereiche'][currentBereich]['questions'];
        const nochInDerSelbenKategorie = currentQuestion < questionsFachBereich.length - 1;
        const questionsUnterrichtsfach = questionsFachBereich[currentQuestion];
        const questionsUnterrichtsfachPunkte = questionsUnterrichtsfach['points'];
        if (nochInDerSelbenKategorie) {
            handleSelbeKategorie(questionsUnterrichtsfachPunkte, questionsUnterrichtsfach);
        } else {
            handleNaechsteKategorie(questionsUnterrichtsfachPunkte, questionsUnterrichtsfach);
        }
    };

    const backQuestion = () => {
        if (currentQuestion > 0) {
            currentQuestion--;
        } else {
            alert('Du bist bereits bei der ersten Frage angekommen.');
        }
    };

    // onload().addEventListener("close", function() { UNFUNKTIONAL
    //     alert("Willst du das wirklich tun?")

    // });
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
      <h1>{questions["bereiche"][currentBereich]["questions"][currentQuestion]["question"]}</h1>
    </div>
    <div class="answers">
      <form>
        <ul>
          {#each questions["bereiche"][currentBereich]["questions"][currentQuestion]["answer"] as answer}
            {#if questions["bereiche"][currentBereich]["questions"][currentQuestion]["multiple"]}
              <li>
                <input type="checkbox" name="answer" bind:group={currentAnswer} value={answer}>
                <label for="answer">{answer}</label>
              </li>
            {:else}
              <li>
                <input type="radio" name="answer" bind:group={currentAnswer} value={answer}>
                <label for="answer">{answer}</label>
              </li>
            {/if}
          {/each}
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
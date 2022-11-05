<script>

    let currentAnswer = "";
    let currentQuestion = 0;
    // Informationen zur Erstellung von Fragen und Antworten
    // ['FRAGE', ['ANTWORT 1', 'ANTWORT 2', 'ANTWORT 3'], Mehrere Antworten?, [['FÄCHER', 'FÄCHER'], PUNKTE]],
    // Frage ist logischerweise immer die Frage
    // Antworten werden hier in einem Array nach der Reihenfolge angegeben
    // Mehrere Antworten? ist ein Boolean, der angibt, ob mehrere Antworten möglich sind
    // FÄCHER sind die Fächer denen die Punkte für die Frage zugeordnet werden sollen
    let questions =  [
        ['Was ist 1+1', ['2', '8', '23'], true, [['mathe'], 3]],
        ['Magst du Mathe?', ['Ja', 'Nein'], false, [['mathe'], 3]],
        ['Schreibst du gerne Aufsätze?', ['Ja', 'Nein'], false, [['deutsch, sowi, english, musik'], 2]],
    ]

    function nextQuestion() {
        if (currentQuestion < questions.length - 1) {
            // alert("Deine Antwort wird überprüft");
            // if(questions[currentQuestion][3] == currentAnswer) {
            //     alert("Richtig");
            // } else {
            //     alert("Falsch");
            // }
            currentQuestion++;
            currentAnswer = "";
        } else {
            alert("Du hast alle Fragen beatnwortet. Du wirst nun weitergeleitet.");
        }
    }

    function backQuestion() {
        if (currentQuestion > 0) {
            currentQuestion--;
        } else {
            alert("Du bist bereits bei der ersten Frage angekommen.");
        }
    }
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
        /* appearance: none; */
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
            <h1>{questions[currentQuestion][0]}</h1>
        </div>
        <div class="answers">
            <form>
                <ul>
                    {#each questions[currentQuestion][1] as answer}
                        {#if questions[currentQuestion][2]}
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
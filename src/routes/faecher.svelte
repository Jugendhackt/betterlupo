<script>
    import { goto } from "@sapper/app";
    import { onMount } from "svelte";
    import questions from "../../static/questions.json";
    let currentAnswer = "";
    let currentQuestion = 0;
    let done = [];
    let currentFach = "";
    let currentBereich = "";
    let points = {};

    for (let fach in questions["faecher"]) {
        points[fach] = 0;
    }

    onMount(() => {
        const reihenfolge = JSON.parse(
            localStorage.getItem("sortPointsdataStore")
        );
        
        if(reihenfolge) {
            currentBereich = Object.keys(reihenfolge)[0];
            currentFach = questions["bereiche"][currentBereich]["faecher"][0];
        } else {
            alert("Bitte fange am Anfang der Umfrage an!");
            goto("/questions");
        }


    });

    const getNextBereich = () => {
        const reihenfolge = JSON.parse(
            localStorage.getItem("sortPointsdataStore")
        );
        const keys = Object.keys(reihenfolge);
        done.push(currentBereich)
        for (let i = 0; i < keys.length; i++) {
            if (!done.includes(keys[i])) {
                currentFach = questions["bereiche"][keys[i]]["faecher"][0];
                return keys[i];
            }
        }
        return undefined;
    };

    const getNextFach = () => {

        done.push(currentFach);

        for (let i = 0; i < questions["bereiche"][currentBereich]["faecher"].length; i++) {
            if (!done.includes(questions["bereiche"][currentBereich]["faecher"][i])) {
                return questions["bereiche"][currentBereich]["faecher"][i];
            }
        }
        return undefined;
    }

    const handleNaechstesFach = () => {
        done.push(currentFach);
        currentQuestion = 0;
        currentFach = getNextFach();
        currentAnswer = "";
        if (!currentFach) {
            currentBereich = getNextBereich();
            if (!currentBereich) {
                console.log("done" + JSON.stringify(points));
                localStorage.setItem("sortPointsdataStore", undefined);
                //localStorage.setItem("UmfrageDataStore", JSON.stringify(sortPoints()));
                //goto("/tables");
            }
        }
    };

    const handleSelbeFach = (
        questionsUnterrichtsfachPunkte,
        questionsUnterrichtsfach
    ) => {
        // addtributes are for Point
        if (currentAnswer !== "") {
            currentQuestion++;
            currentAnswer = "";
            points[currentFach] +=
                questionsUnterrichtsfachPunkte[
                    questionsUnterrichtsfach.answer.indexOf(currentAnswer)
                ];
        } else {
            alert("Bitte wähle mindestens eine Antwort aus!");
        }
    };

    const nextQuestion = () => {
        const questionsFachBereich =
            questions["faecher"][currentFach]["questions"];
        const nochInDerSelbenKategorie =
            currentQuestion < questionsFachBereich.length - 1;
        const questionsUnterrichtsfach = questionsFachBereich[currentQuestion];
        const questionsUnterrichtsfachPunkte =
            questionsUnterrichtsfach["points"];
        console.log(currentFach + " " + currentBereich);
        if (nochInDerSelbenKategorie) {
            handleSelbeFach(
                questionsUnterrichtsfachPunkte,
                questionsUnterrichtsfach,
                "fach"
            );
        } else {
            handleNaechstesFach(
                questionsUnterrichtsfachPunkte,
                questionsUnterrichtsfach,
                "fach"
            );
        }
    };

    function BeforeUnload(Event) {
        if(currentBereich) {
            Event.preventDefault();
            Event.returnValue =
                "Bist du sicher das du die Seite verlassen möchtest?";

            return "Bist du sicher das du die Seite verlassen möchtest?";
        }

    }
</script>

<svelte:window on:beforeunload={BeforeUnload} />

<div class="container">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore missing-declaration -->
    <img
        on:click={() => backQuestion()}
        class="arrow left"
        src="icons/arrow_forward.svg"
        alt="icon für questions"
        draggable="false"
    />

    <div class="Question">
        <div class="col-12">
            {#if currentFach}
                <h1>
                    {questions["faecher"][currentFach]["questions"][
                        currentQuestion
                    ]["question"]}
                </h1>
            {:else}
                <h1>
                    Es konnte keine neue Frage generiert werden -> Leite weiter
                </h1>
            {/if}
        </div>
        <div class="answers">
            <form>
                <ul>
                    {#if currentFach}
                        {#each questions["faecher"][currentFach]["questions"][currentQuestion]["answer"] as answer}
                            {#if questions["faecher"][currentFach]["questions"][currentQuestion]["multiple"]}
                                <li>
                                    <input
                                        type="radio"
                                        name="answer"
                                        bind:group={currentAnswer}
                                        value={answer}
                                        draggable="false"
                                    />
                                    <label for="answer">{answer}</label>
                                </li>
                            {:else}
                                <li>
                                    <input
                                        type="radio"
                                        name="answer"
                                        bind:group={currentAnswer}
                                        value={answer}
                                        draggable="false"
                                    />
                                    <label for="answer">{answer}</label>
                                </li>
                            {/if}
                        {/each}
                    {:else}
                        <h1>
                            Es konnte keine neue Frage generiert werden -> Leite
                            weiter
                        </h1>
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
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <img
        on:click={() => nextQuestion()}
        class="arrow right"
        src="icons/arrow_forward.svg"
        alt="icon für questions"
        draggable="false"
    />
</div>

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

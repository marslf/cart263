window.onload = run;

function run() {
  document.querySelector("#stepOneButton").addEventListener("click", fetchText);


  /****** PART A:: FETCH */
  async function fetchText() {
    console.log("in fetch");

    try {
      // Fetch the text file
      const response = await fetch("files/rainbow.txt");

      // Check fetch was successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Convert response to text and store in raw_rainbow_text
      let raw_rainbow_text = await response.text();

      // Hide the button
      document.querySelector("#stepOneButton").style.display = "none";

      // Display the div with id inputDiv
      document.querySelector("#inputDiv").style.display = "block";

      // Display fetched text
      document.querySelector("#rainbow_text").innerText = raw_rainbow_text;

      // Run runPartB once everything else works
      runPartB(raw_rainbow_text);
    } catch (error) {
      console.error("Error fetching rainbow.txt:", error);
    }
  }

  /****** PART B:: TEXT PROCESSING  */
  function runPartB(originalRainBowText) {
    document
      .querySelector("#produce-poem")
      .addEventListener("click", producePoem);

    /* FILL IN HERE */
    function producePoem() {
      console.log(originalRainBowText)
      //SR
      runPartC(rainbow_tokens, phrase_as_array);

    }
  }


  /****** PART C:: POEM CREATION  */
  function runPartC(rainbow_words, seed_phrase_array) {
    console.log(rainbow_words);
    console.log(seed_phrase_array);

    //to next stage
    runPartD(poem_sentence);
  }


  /****** PART D:: VISUALIZE  */
  function runPartD(new_sentence) {

  }

  /****** PART E:: RESET  */
  function resetPoem() {
    /*** TO FILL IN */

  }
} //window onload



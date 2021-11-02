import { useState } from "react";
import '../App.css'
export default function Main() {
  const [input, setInput] = useState("")
  const [codes, setCodes] = useState([]);
  const [formattedCodes, setFormattedCodes] = useState("");

  const generateLetterCodes = () => {
    const number= input

    //setting the numbers as phone display
    if (!number) {
      // just logging the error for now
      console.error("no number provided")
    }

    if (number) {
      const mappings = {
        1: [""],
        2: ["A", "B", "C"],
        3: ["D", "E", "F"],
        4: ["G", "H", "I"],
        5: ["J", "K", "L"],
        6: ["M", "N", "O"],
        7: ["P", "R", "S"],
        8: ["T", "U", "V"],
        9: ["W", "X", "Y"],
        0: [""],
      };

      //splitting the combinations and mapping alphabets
      const allCombinations = number
        .split("")
        .map((digit) => mappings[digit])
        //consolidating into one array
        .reduce((accComb, currentComb) => {
          let combinations = [];
          for (let letter of accComb) for (let letter2 of currentComb) combinations.push(letter + letter2); //letter=a, letter2= def
          return combinations;
        });
      setCodes(allCombinations);

      //transforming array of combinations to display directly instead of using map in render which might cause our program to lag because of infinte number of combinations.
      let html = "";
      allCombinations.forEach((comb, i) => {
        if (i && i % 3 === 0) html += "<br/>";
        html += comb + "&nbsp; &nbsp;";
      });
      setFormattedCodes(html);
    }
  };
  const onChangeInput = event => {
    setInput(input  + event.target.id)
    validateNumericInput(event)

  };
  //Validating Input to be accept only numeric values
  const validateNumericInput = (e) => !/[\d]/.test(e.key) && e.preventDefault();

  return (
    <>
      <div className="container">
        <p>Pass in any number and get the resulting rotary phone letter code combinations.</p>
        <div class="dial-pad" onClick={onChangeInput}>
          <a href="#" class="one" id="1">1<div> &nbsp;</div></a>
          <a href="#" class="two" id="2">2<div>abc</div></a>
          <a href="#" class="three" id="3">3<div>def</div></a>
          <br />
          <a href="#" class="four" id="4">4<div>ghi</div></a>
          <a href="#" class="five" id="5">5<div>jkl</div></a>
          <a href="#" class="six" id="6">6<div>mno</div></a>
          <br />
          <a href="#" class="seven" id="7">7<div>pqrs</div></a>
          <a href="#" class="eight" id="8">8<div>tuv</div></a>
          <a href="#" class="nine" id="9">9<div>wxyz</div></a>
          <br />
          <a href="#">*</a>
          <a href="#" class="zero">0</a>
          <a href="#">#</a>
        </div>
        <div className="userInput">{input} </div>
        <button type="submit" onClick={generateLetterCodes} data-testid="button">
        Generate Letter Codes
        </button>        
      </div>
      {!!codes.length && formattedCodes && (
        <div className="result">
          <h2>Result ({codes.length.toLocaleString()} combinations) :</h2>
          <span dangerouslySetInnerHTML={{ __html: formattedCodes }} className="output" />
        </div>
      )}
    </>
  );
}

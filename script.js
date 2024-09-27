const keys = document.querySelectorAll(".key");
const display = document.querySelector(".display");
const clearFull = document.querySelector(".clear-full");
const clearOne = document.querySelector(".clear-one");
const equals = document.querySelector(".equals");
const last = document.querySelector(".last");

let keyResult;

for (let key of keys) {
    key.onclick = () => {
        if (
            display.textContent === "0" ||
            (display.textContent === String(keyResult) &&
                last.textContent !== "")
        ) {
            display.textContent = "";
            last.textContent = "";
        }

        const array = display.textContent.split("");
        array.length > 23
            ? (alert("Выражение слишком длинное!"), (display.textContent = "0"))
            : (display.textContent += key.textContent);
    };
}

clearFull.onclick = () => {
    display.textContent = "";
    last.textContent = "";
};

clearOne.onclick = () => {
    const array = display.textContent.split("");
    array.pop();
    display.textContent = array.join("");
};

equals.onclick = () => {
    const array = display.textContent.split("");
    let operator;
    let i = 0;

    while (i < array.length) {
        if (
            array[i] === "÷" ||
            array[i] === "×" ||
            array[i] === "−" ||
            array[i] === "+"
        ) {
            operator = array[i];

            switch (operator) {
                case "÷":
                    const stringDivision = array.join("");
                    last.textContent = stringDivision;
                    const numbersDivision = stringDivision.split("÷");
                    const numberOneDivision = numbersDivision[0];
                    const numberTwoDivision = numbersDivision[1];
                    const resultDivision =
                        numberOneDivision / numberTwoDivision;
                    keyResult = resultDivision;
                    display.textContent = resultDivision;
                    break;
                case "×":
                    const stringMultiplication = array.join("");
                    last.textContent = stringMultiplication;
                    const numbersMultiplication =
                        stringMultiplication.split("×");
                    const numberOneMultiplication = numbersMultiplication[0];
                    const numberTwoMultiplication = numbersMultiplication[1];
                    const resultMultiplication =
                        numberOneMultiplication * numberTwoMultiplication;
                    keyResult = resultMultiplication;
                    display.textContent = resultMultiplication;
                    break;
                case "−":
                    let stringSubtraction = array.join("");
                    last.textContent = stringSubtraction;
                    const numbersSubtraction = stringSubtraction.split("−");
                    const numberOneSubtraction = numbersSubtraction[0];
                    const numberTwoSubtraction = numbersSubtraction[1];
                    const resultSubtraction =
                        numberOneSubtraction - numberTwoSubtraction;
                    keyResult = resultSubtraction;
                    display.textContent = resultSubtraction;
                    break;
                case "+":
                    let stringAddition = array.join("");
                    last.textContent = stringAddition;
                    const numbersAddition = stringAddition.split("+");
                    const numberOneAddition = numbersAddition[0];
                    const numberTwoAddition = numbersAddition[1];
                    const resultAddition =
                        Number(numberOneAddition) + Number(numberTwoAddition);
                    keyResult = resultAddition;
                    display.textContent = resultAddition;
                    break;
            }

            break;
        } else {
            i++;
        }
    }
};

const keys = document.querySelectorAll(".key");
const display = document.querySelector(".display");
const clearFull = document.querySelector(".clear-full");
const clearOne = document.querySelector(".clear-one");
const equals = document.querySelector(".equals");
const last = document.querySelector(".last");

let keyResult = "";

for (let key of keys) {
    key.onclick = () => {
        if (
            display.textContent === "0" ||
            (display.textContent === keyResult && last.textContent !== "")
        ) {
            display.textContent = "";
            last.textContent = "";
        }

        if (
            display.textContent === "" &&
            (key.textContent === "×" ||
                key.textContent === "−" ||
                key.textContent === "+")
        ) {
            display.textContent = "0";
        }

        if (display.textContent === "0" && key.textContent === "÷") {
            display.textContent = "0";
        }

        const array = display.textContent.split("");

        if (
            (key.textContent === "÷" ||
                key.textContent === "×" ||
                key.textContent === "−" ||
                key.textContent === "+") &&
            (array[array.length - 1] === "÷" ||
                array[array.length - 1] === "×" ||
                array[array.length - 1] === "−" ||
                array[array.length - 1] === "+")
        ) {
            array.pop();
            array.pop();
            display.textContent = array.join("");
        }

        if (
            display.textContent === "" &&
            (key.textContent === "÷" ||
                key.textContent === "×" ||
                key.textContent === "−" ||
                key.textContent === "+")
        ) {
            display.textContent = "0";
        } else {
            const array = display.textContent.split("");
            array.length > 20
                ? (display.textContent = "0")
                : (display.textContent += key.textContent);

            const addSpace = () => {
                const array = display.textContent.split("");
                array.pop();
                array.push(" ");
                array.push(key.textContent);
                display.textContent = array.join("");
            };

            if (
                key.textContent === "÷" ||
                key.textContent === "×" ||
                key.textContent === "−" ||
                key.textContent === "+"
            ) {
                addSpace();
            }

            if (
                (key.textContent !== "÷" ||
                    key.textContent !== "×" ||
                    key.textContent !== "−" ||
                    key.textContent !== "+") &&
                (array[array.length - 1] === "÷" ||
                    array[array.length - 1] === "×" ||
                    array[array.length - 1] === "−" ||
                    array[array.length - 1] === "+")
            ) {
                addSpace();
            }
        }
    };
}

clearFull.onclick = () => {
    display.textContent = "";
    last.textContent = "";
};

clearOne.onclick = () => {
    const array = display.textContent.split("");

    if (array[array.length - 1] === " ") {
        array.pop();
        array.pop();
        array.pop();
    }
    if (
        array[array.length - 1] === "÷" ||
        array[array.length - 1] === "×" ||
        array[array.length - 1] === "−" ||
        array[array.length - 1] === "+"
    ) {
        array.pop();
        array.pop();
    } else {
        array.pop();
    }
    display.textContent = array.join("");
};

equals.onclick = () => {
    const array = display.textContent.split(" ");
    let result = Number(array[0]);
    const subArray = display.textContent.split("");
    let i = 1;

    if (
        array[array.length - 1] === "÷" ||
        array[array.length - 1] === "×" ||
        array[array.length - 1] === "−" ||
        array[array.length - 1] === "+"
    ) {
        array.pop();
        display.textContent = array.join("");
    }

    for (let j = 0; j < subArray.length; j++) {
        // ----------------------------------> Скобки (https://habr.com/ru/articles/724750/)
        if (subArray[j] === "(") {
            console.log("Brackets!");
            console.log(subArray, subArray.join(""), typeof subArray.join(""));

            const calc = document.createElement("calc");

            calc.style["opacity"] = `calc(${subArray.join("")})`;

            result = parseFloat(
                calc.style["opacity"].replace("calc(", "").replace(")", "")
            );

            calc.remove();

            last.textContent = subArray.join("");
            display.textContent = result;
            keyResult = String(result);

            console.log(result, typeof result);
            // ------------------------------------------------------------------------------!
        } else {
            while (i < array.length) {
                const operator = array[i];
                const nextNumber = Number(array[i + 1]);

                last.textContent = array.join(" ");

                switch (operator) {
                    case "÷":
                        result /= nextNumber;
                        break;
                    case "×":
                        result *= nextNumber;
                        break;
                    case "−":
                        result -= nextNumber;
                        break;
                    case "+":
                        result += nextNumber;
                        break;
                }

                display.textContent = result;
                keyResult = String(result);

                i += 2;
            }
        }
    }
};

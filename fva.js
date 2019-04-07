function validateForm(inputs) {
    let result = true;
    Object.keys(inputs).map(id => {
        let valid = setInputRule(id, inputs[id]);
        if (!valid) result = false;
    });
    return new Promise((resolve, reject) => {
        if (result) {
            resolve();
        } else {
            reject(new Error("Form is not valid."));
        }
    });
}


function setInputRule(inputId, rules, debug = false) {
    let valid = 0;

    rules = rules || {
        required: false,
        min: 0,
        max: undefined,
        email: false,
        number: false,
        containsIgnoreCase: undefined
    };

    const input = document.querySelector("#" + inputId);
    let invalidLabel = document.querySelector("#" + inputId + "-invalid");

    /**
     * Set an element with id `${inputId}-debug` to debug an specific set of rules
     * Example: <p id="myForm-debug"></p>
     */
    if (debug) {
        document.querySelector("#" + inputId + "-debug").innerHTML =
            "<b>debugging <span style='background:rgba(0,0,0,0.8);padding:3px;margin:3px;color: white;'>#" +
            inputId +
            "</span></b><br><br>" +
            JSON.stringify(rules);
        document.querySelector("#" + inputId + "-debug").style.display = "block";
    }

    if ("number" in rules) {
        rules.number && typeof Number(input.value) == "number"
            ? null
            : (valid++ ,
                (invalidLabel.innerHTML = "This field accepts only numbers.<br>"),
                (invalidLabel.style.display = "block"));
    }

    if ("required" in rules) {
        rules.required && input.value.length > 0
            ? null
            : (valid++ ,
                (invalidLabel.innerHTML = "This input field is required.<br>"),
                (invalidLabel.style.display = "block"));
    }

    if ("min" in rules) {
        input.value.length >= rules.min
            ? null
            : (valid++ ,
                (invalidLabel.innerHTML =
                    "You have to insert at least " + rules.min + " characteres."),
                (invalidLabel.style.display = "block"));
    }

    if ("max" in rules) {
        input.value.length <= rules.max
            ? null
            : (valid++ ,
                (invalidLabel.innerHTML = "Limit of " + rules.max + " chars reached."),
                (invalidLabel.style.display = "block"));
    }

    if ("containsIgnoreCase" in rules) {
        input.value.toLowerCase().includes(rules.containsIgnoreCase.toLowerCase())
            ? null
            : (valid++ ,
                (invalidLabel.innerHTML =
                    "It must include <u>" + rules.containsIgnoreCase + "</u>"),
                (invalidLabel.style.display = "block"));
    }

    if ("email" in rules) {
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)
            ? null
            : (valid++ ,
                (invalidLabel.style.display = "block"),
                (invalidLabel.innerHTML = "Invalid email."));
    }

    //Valid => number of times the input is invalid
    if (valid == 0) {
        invalidLabel.textContent = "";
        invalidLabel.style.display = "none";
        document.querySelector("#" + inputId + "-debug").style.display = "none";
        input.classList.remove("fva-invalid");
        return true;
    } else {
        input.classList.add("fva-invalid");
        return false;
    }
}

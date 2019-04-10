function validateForm(inputs, messages = {}) {
    let result = true;
    Object.keys(inputs).map(id => {
        let valid = setInputRule(id, inputs[id], messages[id]);
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


function setInputRule(inputId, rules, customErrorMessages, debug = false) {
    let valid = 0;

    rules = rules || {
        required: false,
        min: 0,
        max: undefined,
        email: false,
        number: false,
        containsIgnoreCase: undefined
    };

    customErrorMessages = customErrorMessages || {
        required: "This field is required.",
        min: "You have to insert at least " + rules.min + " characteres.",
        max: "Limit of " + rules.max + " chars reached.",
        email: "Invalid email.",
        number: "This field accepts only numbers.",
        containsIgnoreCase: "It must include <u>" + rules.containsIgnoreCase + "</u>."
    }

    const input = document.querySelector("#" + inputId);
    let invalidLabel = document.querySelector("#" + inputId + "-invalid");
    let labelExists = invalidLabel ? true : false;

    /**
     * Set an element with id `${inputId}-debug` to debug an specific set of rules
     * Example: <p id="myInput-debug"></p>
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
        rules.number && typeof Number(input.value) == "number" && input.value > 0
            ? null
            : (valid++ ,
                labelExists ? (
                    (invalidLabel.innerHTML = customErrorMessages.number),
                    (invalidLabel.style.display = "block")) : null);
    }

    if ("required" in rules) {
        rules.required && input.value.length > 0
            ? null
            : (valid++ ,
                labelExists ? (
                    (invalidLabel.innerHTML = customErrorMessages.required),
                    (invalidLabel.style.display = "block")) : null);
    }

    if ("min" in rules) {
        input.value.length >= rules.min
            ? null
            : (valid++ ,
                labelExists ? (
                    (invalidLabel.innerHTML = customErrorMessages.min),
                    (invalidLabel.style.display = "block")) : null);
    }

    if ("max" in rules) {
        input.value.length <= rules.max
            ? null
            : (valid++ ,
                labelExists ? (
                    (invalidLabel.innerHTML = customErrorMessages.max),
                    (invalidLabel.style.display = "block")) : null);
    }

    if ("containsIgnoreCase" in rules) {
        input.value.toLowerCase().includes(rules.containsIgnoreCase.toLowerCase())
            ? null
            : (valid++ ,
                labelExists ? (
                    (invalidLabel.innerHTML = customErrorMessages.containsIgnoreCase),
                    (invalidLabel.style.display = "block")) : null);
    }

    if ("email" in rules) {
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)
            ? null
            : (valid++ ,
                labelExists ? (
                    (invalidLabel.innerHTML = customErrorMessages.email),
                    (invalidLabel.style.display = "block")) : null);
    }

    //var valid: number of times the input is invalid
    if (valid == 0) {
        if (labelExists) {
            invalidLabel.textContent = "";
            invalidLabel.style.display = "none";
            input.classList.remove("fva-invalid");
            if (debug)
                document.querySelector("#" + inputId + "-debug").style.display = "none";
        }
        return true;
    } else {
        if (labelExists)
            input.classList.add("fva-invalid");
        return false;
    }
}
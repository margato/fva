function setInputRule(inputId, rules, debug = false) {
    let valid = 0;

    rules = rules || {
        required: false,
        min: 0,
        max: undefined,
        email: false,
        substringIgnoreCase: undefined
    };

    const input = document.querySelector("#" + inputId);
    let invalidLabel = document.querySelector("#" + inputId + "-invalid");

    /** 
     * Use for debug
     */
    if (debug) {
        document.querySelector("#" + inputId + "-rules").innerHTML = "<b><span style='background:rgba(0,0,0,0.8);padding:3px;margin:3px;color: white;'>#" + inputId + "</span></b><br><br>" + JSON.stringify(rules);
        document.querySelector("#" + inputId + "-rules").style.display = 'block';
    }

    if ("required" in rules) {
        rules.required && input.value.length > 0 ?
            null :
            (valid++,
                (invalidLabel.innerHTML = "Esse campo é obrigatório<br>"),
                (invalidLabel.style.display = "block"));
    }

    if ("min" in rules) {
        input.value.length >= rules.min ?
            null :
            (valid++,
                (invalidLabel.innerHTML =
                    "Mínimo de caracteres: " + rules.min),
                (invalidLabel.style.display = "block"));
    }

    if ("max" in rules) {
        input.value.length <= rules.max ?
            null :
            (valid++,
                (invalidLabel.innerHTML =
                    "Máximo de caracteres: " + rules.max),
                (invalidLabel.style.display = "block"));
    }


    if ("substringIgnoreCase" in rules) {
        input.value
            .toLowerCase()
            .includes(rules.substringIgnoreCase.toLowerCase()) ?
            null :
            (valid++,
                (invalidLabel.innerHTML =
                    "Deve conter <u>" + rules.substringIgnoreCase + "</u>"),
                (invalidLabel.style.display = "block"));
    }

    if ("email" in rules) {
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value) ?
            null :
            (valid++,
                (invalidLabel.style.display = "block"),
                invalidLabel.innerHTML = "Email inválido");
    }

    if (valid == 0) {
        invalidLabel.textContent = "";
        invalidLabel.style.display = "none";
        document.querySelector("#" + inputId + "-rules").style.display = 'none';
    }
    console.log(valid);
}
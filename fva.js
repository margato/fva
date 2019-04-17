const validate = (data, rules, messages = {}) => {
    
    let result = true
    let globalErrors = []

    Object.keys(data).map(key => {
        let response = checkRule(key, data[key], rules[key], messages[key])
        if (!response.success) {
            result = false
            response.errors.map(err => globalErrors.push(err))
        }
    })

    return new Promise((resolve, reject) => {
        if (result) 
            resolve(JSON.stringify({message: "Data is valid.", errors: globalErrors}, null, 2))
        else 
            reject(JSON.stringify({message: "Data is invalid.", errors: globalErrors}, null, 2))
    })
}


const checkRule = (keyReference, value, rules, customErrorMessages) => {
    let invalid = 0
    let errors = [];
    
    if (rules == undefined) {
        errors.push(`${keyReference}: Undefined rules.`)
        return { success: false, errors}
    }

    rules = rules || {
        required: false,
        min: 0,
        max: undefined,
        email: false,
        number: false,
        containsIgnoreCase: value[0]
    }

    customErrorMessages = customErrorMessages || {
        required: keyReference + ": This field is required.",
        min: keyReference + ": You have to insert at least " + rules.min + " characteres.",
        max: keyReference + ": Limit of " + rules.max + " chars reached.",
        email: keyReference + ": Invalid email.",
        number: keyReference + ": This field accepts only numbers.",
        containsIgnoreCase: keyReference + ": It must include <u>" + rules.containsIgnoreCase + "</u>."
    }

    if ("number" in rules) {
        (rules.number && isNaN(value))
            ? (invalid++,
               errors.push(customErrorMessages.number))
            : null
    }

    if ("required" in rules) {
        rules.required && value.length === 0
            ? (invalid++,
               errors.push(customErrorMessages.required))
            : null
    }

    if ("min" in rules) {
        value.length >= rules.min
            ? null
            : (invalid++,
               errors.push(customErrorMessages.min))
    }

    if ("max" in rules) {
        value.length <= rules.max
            ? null
            : (invalid++,
               errors.push(customErrorMessages.max))
    }

    if ("containsIgnoreCase" in rules) {
        value.toLowerCase().includes(rules.containsIgnoreCase.toLowerCase())
            ? null
            : (invalid++,
               errors.push(customErrorMessages.containsIgnoreCase))
    }

    if ("email" in rules) {
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? null
            : (invalid++,
               errors.push(customErrorMessages.email))
    }
    //var valid: number of times the value is invalid
    if (invalid == 0) 
        return { success: true, errors}
    else 
        return { success: false, errors}
}


module.exports = { validate }


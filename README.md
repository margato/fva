# fva - Form VAlidator

A module to validate your data.

<hr>

# Installation

In order to use this module, run


```bash
$ npm install fva
```

# Usage

```javascript
const fva = require("fva")
const data = require("../data.json")

const jsonRules = {
    title: { required: true },
    description: { required: false },
    author: { required: true },
    authorEmail: { email: true }, 
    authorAge: { number: true }
}

const customErrorMessages = {
    title: { required: "This is a required field" },
    description: { required: "This is a required field" },
    author: { required: "This is a required field" },
    authorEmail: { email: "This is an email field" }, 
    authorAge: { number: "This is a number field" }
}
                              //The third parameter is not required
fva.validate(data, jsonRules, customErrorMessages) 
    .then(res => {
        //Do something...
    })
    .catch(err => {
        //Handle error...
    })
``` 

# Preview
See a live preview [here](https://repl.it/@Margato/fvaExample).

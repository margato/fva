const fva = require("./../fva")

const json = require("./data.json")
const jsonRules = require("./dataRules")


console.clear()

console.log("Data:")
console.log(JSON.stringify(json, null, 2))

console.log("\nRules:")
console.log(JSON.stringify(jsonRules, null, 2))
console.log("\n...\n")

fva.validate(json, jsonRules)
    .then(res => console.log(res))
    .catch(err => console.log(err))

const fs = require("fs");
eval(fs.readFileSync("engine.js", "utf8"));
const exp = JSON.parse(fs.readFileSync("expected.json", "utf8"));
const fns = { cover: coverTruth, rota: rotaTruth, pay: payTruth };
let fail = 0;
for (const c of exp.cases) {
  const got = fns[c.fn](...c.args);
  if (got !== c.expect) { fail++; console.log("MISMATCH", c.fn, c.args, "\n got:", got, "\n exp:", c.expect); }
}
const ERRS = ["the open hours must be from 1 to 168 with no decimal places",
  "the shift length must be from 1 to 24 hours with no decimal places",
  "the staff a shift must be from 1 to 1000 with no decimal places",
  "the shifts of work must be from 1 to 100000 with no decimal places",
  "the shifts a person must be from 1 to 100 with no decimal places",
  "the hourly rate must be from 0.01 to 1000 dollars with at most two decimal places"];
for (const [fn, args] of exp.errors) {
  let threw = null;
  try { fns[fn](...args); } catch (e) { threw = e.message; }
  if (!threw || !ERRS.includes(threw)) { fail++; console.log("ERRCASE FAIL", fn, args, "->", threw); }
}
console.log(fail ? `${fail} FAILURES` : "all green");
process.exit(fail ? 1 : 0);

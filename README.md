# Shift Math

Work shift, rota and pay arithmetic. The 14 open hours in shifts of 4 hours take 4 shifts, covering 16 hours with 2 over, and with 3 staff a shift that is 12 shifts of work.

## Named constants

None. Every number is the owner's own entry.

## What it computes

- **The cover truth** - the open hours (1 to 168) divided by the shift length (1 to 24 hours), rounded up, with the hours over and the shifts of work at the staff a shift (1 to 1000).
- **The rota truth** - the shifts of work (1 to 100000) divided by the shifts a person works (1 to 100), rounded up, with the shifts spare.
- **The pay truth** - the shifts times the shift length gives the hours, and the hours times the hourly rate (0.01 to 1000 dollars) gives the pay.

## Boundary

Arithmetic only. Counting applied as written. It has not met any staff and does not know availability, breaks, contracts, wage or labor rules, and it gives no verdict that a rota is legal, fair or enough cover. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers, half-up on display).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/shiftmath/
Repo: https://github.com/iLanis-agent/shiftmath

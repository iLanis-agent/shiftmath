// Shift Math engine: the shifts an opening time takes, the people a rota takes, and the hours and pay. Exact integers, half-up on display only. No named constants; every number is the owner's own entry.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _dec(v, places) {
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _pl(n, one, many) { return n + (n === 1 ? one : many); }
var _OH = "the open hours must be from 1 to 168 with no decimal places";
var _SL = "the shift length must be from 1 to 24 hours with no decimal places";
var _ST = "the staff a shift must be from 1 to 1000 with no decimal places";
var _WK = "the shifts of work must be from 1 to 100000 with no decimal places";
var _PP = "the shifts a person must be from 1 to 100 with no decimal places";
var _RATE = "the hourly rate must be from 0.01 to 1000 dollars with at most two decimal places";
function _money(c) { return Math.floor(c / 100) + "." + String(c % 100).padStart(2, "0"); }

function coverTruth(open, len, staff) {
  var o = _i(open, _OH, 3, 1, 168), l = _i(len, _SL, 2, 1, 24), s = _i(staff, _ST, 4, 1, 1000);
  var k = Math.floor((o + l - 1) / l), cov = k * l, over = cov - o, w = k * s;
  return "The " + _pl(o, " open hour", " open hours") + " in shifts of " + _pl(l, " hour", " hours") + " take " + _pl(k, " shift", " shifts") + ", covering " + _pl(cov, " hour", " hours") + " with " + over + " over, and with " + s + " staff a shift that is " + _pl(w, " shift", " shifts") + " of work.";
}
function rotaTruth(work, per) {
  var w = _i(work, _WK, 6, 1, 100000), p = _i(per, _PP, 3, 1, 100);
  var k = Math.floor((w + p - 1) / p), spare = k * p - w;
  return "The " + _pl(w, " shift", " shifts") + " of work at " + _pl(p, " shift", " shifts") + " a person take " + _pl(k, " person", " people") + ", leaving " + _pl(spare, " shift", " shifts") + " spare.";
}
function payTruth(shifts, len, rate) {
  var k = _i(shifts, _WK, 6, 1, 100000), l = _i(len, _SL, 2, 1, 24), r = _p(rate, _RATE, 4, 2, 1, 100000);
  var h = k * l;
  return "The " + _pl(k, " shift", " shifts") + " of " + _pl(l, " hour", " hours") + " at $" + _money(r) + " an hour come to " + _pl(h, " hour", " hours") + " and $" + _money(h * r) + ".";
}

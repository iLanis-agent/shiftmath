import json, random
def dec(n, p=2):
    b = 10**p
    w, f = divmod(n, b)
    fs = str(f).zfill(p).rstrip("0")
    return str(w) + "." + fs if fs else str(w)
def money(c): return str(c//100) + "." + str(c%100).zfill(2)
def pl(n, one, many): return f"{n}" + (one if n == 1 else many)
def cover(o, l, s):
    k = -(-o//l); cov = k*l
    return f"The {pl(o,' open hour',' open hours')} in shifts of {pl(l,' hour',' hours')} take {pl(k,' shift',' shifts')}, covering {pl(cov,' hour',' hours')} with {cov-o} over, and with {s} staff a shift that is {pl(k*s,' shift',' shifts')} of work."
def rota(w, p):
    k = -(-w//p)
    return f"The {pl(w,' shift',' shifts')} of work at {pl(p,' shift',' shifts')} a person take {pl(k,' person',' people')}, leaving {pl(k*p-w,' shift',' shifts')} spare."
def pay(k, l, r):
    h = k*l
    return f"The {pl(k,' shift',' shifts')} of {pl(l,' hour',' hours')} at ${money(r)} an hour come to {pl(h,' hour',' hours')} and ${money(h*r)}."
random.seed(767)
R=random.randint
cases = [
 dict(fn="cover", args=["14","4","3"], expect=cover(14,4,3)),
 dict(fn="rota", args=["12","5"], expect=rota(12,5)),
 dict(fn="pay", args=["12","4","15.50"], expect=pay(12,4,1550)),
 dict(fn="cover", args=["1","1","1"], expect=cover(1,1,1)),
 dict(fn="rota", args=["1","1"], expect=rota(1,1)),
 dict(fn="pay", args=["1","1","0.01"], expect=pay(1,1,1)),
]
for _ in range(25):
    o,l,s=R(1,168),R(1,24),R(1,1000); cases.append(dict(fn="cover", args=[str(o),str(l),str(s)], expect=cover(o,l,s)))
for _ in range(25):
    w,p=R(1,100000),R(1,100); cases.append(dict(fn="rota", args=[str(w),str(p)], expect=rota(w,p)))
for _ in range(25):
    k,l,r=R(1,100000),R(1,24),R(1,100000); cases.append(dict(fn="pay", args=[str(k),str(l),dec(r)], expect=pay(k,l,r)))
errs=[["cover",["0","4","3"]],["cover",["169","4","3"]],["cover",["14","0","3"]],["cover",["14","25","3"]],["cover",["14","4","0"]],["cover",["14","4","1001"]],["cover",["14.5","4","3"]],
 ["rota",["0","5"]],["rota",["100001","5"]],["rota",["12","0"]],["rota",["12","101"]],
 ["pay",["0","4","15.5"]],["pay",["12","0","15.5"]],["pay",["12","25","15.5"]],["pay",["12","4","0"]],["pay",["12","4","1000.01"]],["pay",["12","4","15.555"]]]
json.dump(dict(cases=cases, errors=errs), open("expected.json","w"), indent=1)
print(len(cases),"cases,",len(errs),"errcases")

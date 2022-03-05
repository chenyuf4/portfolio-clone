/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable no-undef */
/* eslint-disable no-redeclare */
(window.R = {}),
  (R.M = class {
    constructor(t) {
      R.BM(this, ["gRaf", "run", "uSvg", "uLine", "uProp"]),
        (this.v = this.vInit(t)),
        (this.raf = new R.RafR(this.run));
    }
    vInit(r) {
      const i = {
        el: R.Select.el(r.el),
        e: {
          curve: r.e || "linear",
        },
        d: {
          origin: r.d || 0,
          curr: 0,
        },
        delay: r.delay || 0,
        cb: r.cb || !1,
        r: r.r || 2,
        prog: 0,
        progE: 0,
        elapsed: 0,
      };
      (i.elL = i.el.length),
        R.Has(r, "update")
          ? (i.up = (t) => {
              r.update(i);
            })
          : R.Has(r, "svg")
          ? (i.up = this.uSvg)
          : R.Has(r, "line")
          ? (i.up = this.uLine)
          : (i.up = this.uProp);
      var s = r.p || !1,
        t = r.svg || !1,
        a = r.line || !1;
      let e = !1;
      if (s) {
        (i.prop = {}), (i.propI = []);
        var n = Object.keys(s);
        i.propL = n.length;
        for (let t = 0; t < i.propL; t++) {
          const h = n[t];
          i.prop[t] = {
            name: h,
            origin: {
              start: s[h][0],
              end: s[h][1],
            },
            curr: s[h][0],
            start: s[h][0],
            end: s[h][1],
            unit: s[h][2] || "%",
          };
          var o = h.charAt(0),
            d = "r" === o && e ? "r2" : o;
          (e = "r" === o), (i.propI[d] = t);
        }
      } else if (t)
        (i.svg = {
          type: t.type,
          attr: "polygon" === t.type ? "points" : "d",
          end: t.end,
          originArr: {},
          arr: {},
          val: [],
        }),
          (i.svg.start = t.start || i.el[0].getAttribute(i.svg.attr)),
          (i.svg.curr = i.svg.start),
          (i.svg.originArr.start = R.Svg.split(i.svg.start)),
          (i.svg.originArr.end = R.Svg.split(i.svg.end)),
          (i.svg.arr.start = i.svg.originArr.start),
          (i.svg.arr.end = i.svg.originArr.end),
          (i.svg.arrL = i.svg.arr.start.length);
      else if (a) {
        i.line = {
          dashed: a.dashed,
          coeff: {
            start: R.Is.def(a.start) ? (100 - a.start) / 100 : 1,
            end: R.Is.def(a.end) ? (100 - a.end) / 100 : 0,
          },
          shapeL: [],
          origin: {
            start: [],
            end: [],
          },
          curr: [],
          start: [],
          end: [],
        };
        for (let e = 0; e < i.elL; e++) {
          var v = a.elWL || i.el[e];
          i.line.shapeL[e] = R.Svg.shapeL(v);
          let t;
          if (i.line.dashed) {
            const l = i.line.dashed;
            let r = 0;
            var u = l.split(/[\s,]/),
              p = u.length;
            for (let t = 0; t < p; t++) r += parseFloat(u[t]) || 0;
            let s = "";
            var c = Math.ceil(i.line.shapeL[e] / r);
            for (let t = 0; t < c; t++) s += l + " ";
            t = s + "0 " + i.line.shapeL[e];
          } else t = i.line.shapeL[e];
          (i.el[e].style.strokeDasharray = t),
            (i.line.origin.start[e] = i.line.coeff.start * i.line.shapeL[e]),
            (i.line.origin.end[e] = i.line.coeff.end * i.line.shapeL[e]),
            (i.line.curr[e] = i.line.origin.start[e]),
            (i.line.start[e] = i.line.origin.start[e]),
            (i.line.end[e] = i.line.origin.end[e]);
        }
      }
      return i;
    }
    play(t) {
      this.pause(), this.vUpd(t), this.delay.run();
    }
    pause() {
      this.raf.stop(), this.delay && this.delay.stop();
    }
    vUpd(t) {
      var r = t || {},
        s = R.Has(r, "reverse") ? "start" : "end";
      if (R.Has(this.v, "prop"))
        for (let t = 0; t < this.v.propL; t++)
          (this.v.prop[t].end = this.v.prop[t].origin[s]),
            (this.v.prop[t].start = this.v.prop[t].curr),
            R.Has(r, "p") &&
              R.Has(r.p, this.v.prop[t].name) &&
              (R.Has(r.p[this.v.prop[t].name], "newEnd") &&
                (this.v.prop[t].end = r.p[this.v.prop[t].name].newEnd),
              R.Has(r.p[this.v.prop[t].name], "newStart") &&
                (this.v.prop[t].start = r.p[this.v.prop[t].name].newStart));
      else if (R.Has(this.v, "svg"))
        R.Has(r, "svg") && R.Has(r.svg, "start")
          ? (this.v.svg.arr.start = r.svg.start)
          : (this.v.svg.arr.start = R.Svg.split(this.v.svg.curr)),
          R.Has(r, "svg") && R.Has(r.svg, "end")
            ? (this.v.svg.arr.end = r.svg.end)
            : (this.v.svg.arr.end = this.v.svg.originArr[s]);
      else if (R.Has(this.v, "line")) {
        for (let t = 0; t < this.v.elL; t++)
          this.v.line.start[t] = this.v.line.curr[t];
        if (R.Has(r, "line") && R.Has(r.line, "end")) {
          this.v.line.coeff.end = (100 - r.line.end) / 100;
          for (let t = 0; t < this.v.elL; t++)
            this.v.line.end[t] = this.v.line.coeff.end * this.v.line.shapeL[t];
        } else
          for (let t = 0; t < this.v.elL; t++)
            this.v.line.end[t] = this.v.line.origin[s][t];
      }
      (this.v.d.curr = R.Has(r, "d")
        ? r.d
        : R.R(this.v.d.origin - this.v.d.curr + this.v.elapsed)),
        (this.v.e.curve = r.e || this.v.e.curve),
        (this.v.e.calc = R.Is.str(this.v.e.curve)
          ? R.Ease[this.v.e.curve]
          : R.Ease4(this.v.e.curve)),
        (this.v.delay = (R.Has(r, "delay") ? r : this.v).delay),
        (this.v.cb = (R.Has(r, "cb") ? r : this.v).cb),
        (this.v.prog = this.v.progE = 0 === this.v.d.curr ? 1 : 0),
        (this.delay = new R.Delay(this.gRaf, this.v.delay));
    }
    gRaf() {
      this.raf.run();
    }
    run(t) {
      1 === this.v.prog
        ? (this.pause(), this.v.up(), this.v.cb && this.v.cb())
        : ((this.v.elapsed = R.Clamp(t, 0, this.v.d.curr)),
          (this.v.prog = R.Clamp(this.v.elapsed / this.v.d.curr, 0, 1)),
          (this.v.progE = this.v.e.calc(this.v.prog)),
          this.v.up());
    }
    uProp() {
      const r = this.v.prop;
      var t = this.v.propI;
      for (let t = 0; t < this.v.propL; t++)
        r[t].curr = this.lerp(r[t].start, r[t].end);
      var s = R.Has(t, "x") ? r[t.x].curr + r[t.x].unit : 0,
        e = R.Has(t, "y") ? r[t.y].curr + r[t.y].unit : 0;
      const i = s + e === 0 ? 0 : "translate3d(" + s + "," + e + ",0)",
        a = R.Has(t, "r") ? r[t.r].name + "(" + r[t.r].curr + "deg)" : 0,
        n = R.Has(t, "r2") ? r[t.r2].name + "(" + r[t.r2].curr + "deg)" : 0,
        o = R.Has(t, "s") ? r[t.s].name + "(" + r[t.s].curr + ")" : 0;
      var h =
          i + a + n + o === 0
            ? 0
            : [i, a, n, o].filter((t) => 0 !== t).join(" "),
        l = R.Has(t, "o") ? r[t.o].curr : -1;
      for (let t = 0; t < this.v.elL && !R.Is.und(this.v.el[t]); t++)
        0 !== h && (this.v.el[t].style.transform = h),
          0 <= l && (this.v.el[t].style.opacity = l);
    }
    uSvg() {
      const r = this.v.svg;
      r.currTemp = "";
      for (let t = 0; t < r.arrL; t++)
        (r.val[t] = isNaN(r.arr.start[t])
          ? r.arr.start[t]
          : this.lerp(r.arr.start[t], r.arr.end[t])),
          (r.currTemp += r.val[t] + " "),
          (r.curr = r.currTemp.trim());
      for (let t = 0; t < this.v.elL && !R.Is.und(this.v.el[t]); t++)
        this.v.el[t].setAttribute(r.attr, r.curr);
    }
    uLine() {
      const r = this.v.line;
      for (let t = 0; t < this.v.elL; t++) {
        const s = this.v.el[t].style;
        (r.curr[t] = this.lerp(r.start[t], r.end[t])),
          (s.strokeDashoffset = r.curr[t]),
          0 === this.v.prog && (s.opacity = 1);
      }
    }
    lerp(t, r) {
      return R.R(R.Lerp(t, r, this.v.progE), this.v.r);
    }
  }),
  (R.TL = class {
    constructor() {
      (this.arr = []), (this.del = 0);
    }
    from(t) {
      (this.del += R.Has(t, "delay") ? t.delay : 0),
        (t.delay = this.del),
        this.arr.push(new R.M(t));
    }
    play(t) {
      this.run("play", t);
    }
    pause() {
      this.run("pause");
    }
    run(r, t) {
      var s = this.arr.length,
        e = t || void 0;
      for (let t = 0; t < s; t++) this.arr[t][r](e);
    }
  }),
  (R.BM = (r, s) => {
    var e = s.length;
    for (let t = 0; t < e; t++) r[s[t]] = r[s[t]].bind(r);
  }),
  (R.Clamp = (t, r, s) => Math.min(Math.max(t, r), s)),
  (R.Delay = class {
    constructor(t, r) {
      (this.cb = t),
        (this.d = r),
        R.BM(this, ["loop"]),
        (this.raf = new R.RafR(this.loop));
    }
    run() {
      0 === this.d ? this.cb() : this.raf.run();
    }
    stop() {
      this.raf.stop();
    }
    loop(t) {
      t = R.Clamp(t, 0, this.d);
      1 === R.Clamp(t / this.d, 0, 1) && (this.stop(), this.cb());
    }
  }),
  (R.Ease = {
    linear: (t) => t,
    i1: (t) => 1 - Math.cos(t * (0.5 * Math.PI)),
    o1: (t) => Math.sin(t * (0.5 * Math.PI)),
    io1: (t) => -0.5 * (Math.cos(Math.PI * t) - 1),
    i2: (t) => t * t,
    o2: (t) => t * (2 - t),
    io2: (t) => (t < 0.5 ? 2 * t * t : (4 - 2 * t) * t - 1),
    i3: (t) => t * t * t,
    o3: (t) => --t * t * t + 1,
    io3: (t) =>
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    i4: (t) => t * t * t * t,
    o4: (t) => 1 - --t * t * t * t,
    io4: (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),
    i5: (t) => t * t * t * t * t,
    o5: (t) => 1 + --t * t * t * t * t,
    io5: (t) =>
      t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
    i6: (t) => (0 === t ? 0 : 2 ** (10 * (t - 1))),
    o6: (t) => (1 === t ? 1 : 1 - 2 ** (-10 * t)),
    io6: (t) =>
      0 === t
        ? 0
        : 1 === t
        ? 1
        : (t /= 0.5) < 1
        ? 0.5 * 2 ** (10 * (t - 1))
        : 0.5 * (2 - 2 ** (-10 * --t)),
  }),
  (R.r0 = (t, r) => 1 - 3 * r + 3 * t),
  (R.r1 = (t, r) => 3 * r - 6 * t),
  (R.r2 = (t, r, s) => ((R.r0(r, s) * t + R.r1(r, s)) * t + 3 * r) * t),
  (R.r3 = (t, r, s) => 3 * R.r0(r, s) * t * t + 2 * R.r1(r, s) * t + 3 * r),
  (R.r4 = (t, r, s, e, i) => {
    let a,
      n,
      o = 0;
    for (
      ;
      (n = r + 0.5 * (s - r)),
        0 < (a = R.r2(n, e, i) - t) ? (s = n) : (r = n),
        1e-7 < Math.abs(a) && ++o < 10;

    );
    return n;
  }),
  (R.r5 = (r, s, e, i) => {
    for (let t = 0; t < 4; ++t) {
      var a = R.r3(s, e, i);
      if (0 === a) return s;
      s -= (R.r2(s, e, i) - r) / a;
    }
    return s;
  }),
  (R.Ease4 = (t) => {
    const a = t[0],
      r = t[1],
      n = t[2],
      s = t[3];
    let o = new Float32Array(11);
    if (a !== r || n !== s)
      for (let t = 0; t < 11; ++t) o[t] = R.r2(0.1 * t, a, n);
    return (t) =>
      a === r && n === s
        ? t
        : 0 === t
        ? 0
        : 1 === t
        ? 1
        : R.r2(
            (function (t) {
              let r = 0;
              for (var s = 1; 10 !== s && o[s] <= t; ++s) r += 0.1;
              --s;
              var e = (t - o[s]) / (o[s + 1] - o[s]),
                e = r + 0.1 * e,
                i = R.r3(e, a, n);
              return 0.001 <= i
                ? R.r5(t, e, a, n)
                : 0 === i
                ? e
                : R.r4(t, i, i + 0.1, a, n);
            })(t),
            r,
            s
          );
  }),
  (R.Fetch = (r) => {
    var t = "json" === r.type;
    const s = t ? "json" : "text",
      e = {
        method: t ? "POST" : "GET",
        headers: new Headers({
          "Content-type": t ? "application/x-www-form-urlencoded" : "text/html",
        }),
        mode: "same-origin",
      };
    t && (e.body = r.body),
      fetch(r.url, e)
        .then((t) => (t.ok ? t[s]() : void (r.error && r.error())))
        .then((t) => {
          r.success(t);
        });
  }),
  (R.Has = (t, r) => t.hasOwnProperty(r)),
  (R.Is = {
    str: (t) => "string" == typeof t,
    obj: (t) => t === Object(t),
    arr: (t) => t.constructor === Array,
    def: (t) => void 0 !== t,
    und: (t) => void 0 === t,
  }),
  (R.Lerp = (t, r, s) => t * (1 - s) + r * s),
  (R.PCurve = (t, r, s) => {
    return ((r + s) ** (r + s) / (r ** r * s ** s)) * t ** r * (1 - t) ** s;
  }),
  (R.R = (t, r) => {
    r = R.Is.und(r) ? 100 : 10 ** r;
    return Math.round(t * r) / r;
  }),
  (R.Select = {
    el: (t) => {
      let r = [];
      var s;
      return (
        R.Is.str(t)
          ? ((s = t.substring(1)),
            "#" === t.charAt(0) ? (r[0] = R.G.id(s)) : (r = R.G.class(s)))
          : (r[0] = t),
        r
      );
    },
    type: (t) => ("#" === t.charAt(0) ? "id" : "class"),
    name: (t) => t.substring(1),
  }),
  (R.L = (t, r, s, e) => {
    var i = document;
    const a = R.Select.el(t);
    var n = a.length;
    let o = s;
    var t = "wheel",
      h = "mouse";
    const l = [h + "Wheel", h + "move", "touchmove", "touchstart"];
    var d = -1 !== l.indexOf(s) && {
        passive: !1,
      },
      v =
        (s === l[0]
          ? (o =
              "on" + t in i
                ? t
                : R.Is.def(i.onmousewheel)
                ? h + t
                : "DOMMouseScroll")
          : "focusOut" === s && (o = R.Snif.isFirefox ? "blur" : "focusout"),
        "a" === r ? "add" : "remove");
    for (let t = 0; t < n; t++) a[t][v + "EventListener"](o, e, d);
  });
const Tab = class {
    constructor() {
      (this.arr = []),
        (this.pause = 0),
        R.BM(this, ["v"]),
        R.L(document, "a", "visibilitychange", this.v);
    }
    add(t) {
      this.arr.push(t);
    }
    v() {
      var t = performance.now();
      let r, s;
      s = document.hidden
        ? ((this.pause = t), "stop")
        : ((r = t - this.pause), "start");
      for (let t = this.l(); 0 <= t; t--) this.arr[t][s](r);
    }
    l() {
      return this.arr.length - 1;
    }
  },
  Raf =
    ((R.Tab = new Tab()),
    (R.Raf = class {
      constructor() {
        (this.arr = []),
          (this.on = !0),
          R.BM(this, ["loop", "tOff", "tOn"]),
          R.Tab.add({
            stop: this.tOff,
            start: this.tOn,
          }),
          this.raf();
      }
      tOff() {
        this.on = !1;
      }
      tOn(r) {
        for (let t = this.l(); 0 <= t; t--) this.arr[t].sT += r;
        this.on = !0;
      }
      add(t) {
        this.arr.push(t);
      }
      remove(r) {
        for (let t = this.l(); 0 <= t; t--)
          if (this.arr[t].id === r) return void this.arr.splice(t, 1);
      }
      loop(r) {
        var s;
        if (this.on)
          for (let t = this.l(); 0 <= t; t--) {
            const e = this.arr[t];
            R.Is.def(e) && (e.sT || (e.sT = r), (s = r - e.sT), e.cb(s));
          }
        this.raf();
      }
      raf() {
        requestAnimationFrame(this.loop);
      }
      l() {
        return this.arr.length - 1;
      }
    }),
    new R.Raf());
let RafId = 0;
(R.RafR = class {
  constructor(t) {
    (this.cb = t), (this.on = !1), (this.id = RafId), RafId++;
  }
  run() {
    this.on ||
      (Raf.add({
        id: this.id,
        cb: this.cb,
      }),
      (this.on = !0));
  }
  stop() {
    this.on && (Raf.remove(this.id), (this.on = !1));
  }
}),
  (R.Rand = {
    range: (t, r, s) => R.R(Math.random() * (r - t) + t, s),
    uniq: (r) => {
      const s = [];
      for (let t = 0; t < r; t++) s[t] = t;
      let t = r;
      for (var e, i; t--; )
        (e = ~~(Math.random() * (t + 1))),
          (i = s[t]),
          (s[t] = s[e]),
          (s[e] = i);
      return s;
    },
  }),
  (R.Snif = {
    uA: navigator.userAgent.toLowerCase(),
    get iPadIOS13() {
      return "MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints;
    },
    get isMobile() {
      return /mobi|android|tablet|ipad|iphone/.test(this.uA) || this.iPadIOS13;
    },
    get isMobileAndroid() {
      return /android.*mobile/.test(this.uA);
    },
    get isIOS() {
      return (
        (/ipad|iphone/.test(this.uA) || this.iPadIOS13) && !window.MSStream
      );
    },
    get isAndroid() {
      return (
        this.isMobileAndroid ||
        (!this.isMobileAndroid && /android/i.test(this.uA))
      );
    },
    get isFirefox() {
      return -1 < this.uA.indexOf("firefox");
    },
    get safari() {
      return this.uA.match(/version\/[\d.]+.*safari/);
    },
    get isSafari() {
      return !!this.safari && !this.isAndroid;
    },
    get isSafariOlderThan8() {
      let t = 8;
      if (this.isSafari) {
        const r = this.safari[0].match(/version\/\d{1,2}/);
        t = +r[0].split("/")[1];
      }
      return t < 8;
    },
    get isIEolderThan11() {
      return -1 < this.uA.indexOf("msie");
    },
    get isIE11() {
      return 0 < navigator.appVersion.indexOf("Trident/");
    },
    get isEdge() {
      return -1 < this.uA.indexOf("edge");
    },
  }),
  (R.Svg = {
    shapeL: (e) => {
      var t, r, s, i;
      if ("circle" === e.tagName) return 2 * e.getAttribute("r") * Math.PI;
      if ("line" === e.tagName)
        return (
          (t = e.getAttribute("x1")),
          (r = e.getAttribute("x2")),
          (s = e.getAttribute("y1")),
          (i = e.getAttribute("y2")),
          Math.sqrt((r -= t) * r + (i -= s) * i)
        );
      if ("polyline" !== e.tagName) return e.getTotalLength();
      {
        let r = 0,
          s;
        var a = e.points.numberOfItems;
        for (let t = 0; t < a; t++) {
          var n = e.points.getItem(t);
          0 < t && (r += Math.sqrt((n.x - s.x) ** 2 + (n.y - s.y) ** 2)),
            (s = n);
        }
        return r;
      }
    },
    split: (t) => {
      const s = [],
        r = t.split(" ");
      var e = r.length;
      for (let t = 0; t < e; t++) {
        var i = r[t].split(","),
          a = i.length;
        for (let r = 0; r < a; r++) {
          let t = i[r];
          (t = isNaN(t) ? t : +t), s.push(t);
        }
      }
      return s;
    },
  }),
  (R.Timer = class {
    constructor(t) {
      this.timer = new R.Delay(t.cb, t.delay);
    }
    run() {
      this.timer.stop(), this.timer.run();
    }
  }),
  (R.ZL = (t) => (9 < t ? t : "0" + t)),
  (R.Cr = (t) => document.createElement(t)),
  (R.g = (t, r, s) => {
    const e = t || document;
    return e["getElement" + r](s);
  }),
  (R.G = {
    id: (t, r) => R.g(r, "ById", t),
    class: (t, r) => R.g(r, "sByClassName", t),
    tag: (t, r) => R.g(r, "sByTagName", t),
  }),
  (R.index = (r, s) => {
    var e = s.length;
    for (let t = 0; t < e; t++) if (r === s[t]) return t;
    return -1;
  }),
  (R.Index = {
    list: (t) => R.index(t, t.parentNode.children),
    class: (t, r, s) => R.index(t, R.G.class(r, s)),
  }),
  (R.PD = (t) => {
    t.cancelable && t.preventDefault();
  }),
  (R.RO = class {
    constructor() {
      (this.eT = R.Snif.isMobile ? "orientationchange" : "resize"),
        (this.tick = !1),
        (this.arr = []),
        R.BM(this, ["fn", "gRaf", "run"]),
        (this.t = new R.Timer({
          delay: 100,
          cb: this.gRaf,
        })),
        (this.raf = new R.RafR(this.run)),
        R.L(window, "a", this.eT, this.fn);
    }
    add(t) {
      this.arr.push(t);
    }
    remove(r) {
      for (let t = this.l(); 0 <= t; t--)
        if (this.arr[t].id === r) return void this.arr.splice(t, 1);
    }
    fn(t) {
      (this.e = t), this.t.run();
    }
    gRaf() {
      this.tick || ((this.tick = !0), this.raf.run());
    }
    run() {
      for (let t = this.l(); 0 <= t; t--) this.arr[t].cb(this.e);
      this.raf.stop(), (this.tick = !1);
    }
    l() {
      return this.arr.length - 1;
    }
  });
const Ro = new R.RO();
let RoId = 0;
(R.ROR = class {
  constructor(t) {
    (this.cb = t), (this.id = RoId), RoId++;
  }
  on() {
    Ro.add({
      id: this.id,
      cb: this.cb,
    });
  }
  off() {
    Ro.remove(this.id);
  }
}),
  (R.TopReload = (t) => {
    "scrollRestoration" in history
      ? (history.scrollRestoration = "manual")
      : (window.onbeforeunload = (t) => {
          window.scrollTo(0, 0);
        });
  }),
  (R.O = (t, r) => {
    t.style.opacity = r;
  }),
  (R.pe = (t, r) => {
    t.style.pointerEvents = r;
  }),
  (R.PE = {
    all: (t) => {
      R.pe(t, "all");
    },
    none: (t) => {
      R.pe(t, "none");
    },
  }),
  (R.T = (t, r, s, e) => {
    e = R.Is.und(e) ? "%" : e;
    t.style.transform = "translate3d(" + r + e + "," + s + e + ",0)";
  });
!(function () {
  "use strict";
  class i {
    constructor() {
      _A.config.serviceWorker &&
        !_A.is[404] &&
        "serviceWorker" in navigator &&
        navigator.serviceWorker.register("/sw.js");
    }
  }
  class s {
    mutation(t) {
      const i = _A;
      let e = i.config.routes[t];
      e = R.Is.und(e) ? "404" : e;
      var s = i.route.old,
        r = i.route.new;
      (i.route.old = r),
        (i.route.new = {
          url: t,
          page: e,
        }),
        (i.is[r.page] = !1),
        (i.is[e] = !0),
        (i.was[s.page] = !1),
        (i.was[r.page] = !0);
    }
  }
  class r {
    constructor(t) {
      this.data = t;
    }
    get() {
      let t = this.data[_A.route.new.url];
      return R.Is.und(t) && (t = this.data.p404), t;
    }
  }
  class e {
    constructor(t) {
      const i = _A;
      if (
        ((i.mutating = !0),
        (i.main = {}),
        (i.fromBack = !1),
        (this.app = R.G.id("app")),
        (this.device = t.device),
        (this.isD = "d" === this.device),
        !i.is[404])
      )
        if (this.isD) {
          (this.crtlMutation = t.transition.mutation),
            R.BM(this, ["eD"]),
            (this.router = new s());
          const e = t.engine;
          (i.engine = new e()),
            this.onPopstate(),
            R.L(document.body, "a", "click", this.eD),
            new t.transition.intro((t) => {
              this.introXhr(t);
            });
        } else this.introXhr();
    }
    onPopstate() {
      const i = document,
        e = "complete";
      let s = i.readyState !== e;
      (onload = (t) => {
        setTimeout((t) => {
          s = !1;
        }, 0);
      }),
        (onpopstate = (t) => {
          s && i.readyState === e && (R.PD(t), t.stopImmediatePropagation()),
            R.Is.und(_A.config.routes) ||
              ((t = location.pathname), this.out(t, "back"));
        });
    }
    eD(t) {
      const i = _A;
      let e = t.target,
        s = !1,
        r = !1;
      for (; e; ) {
        var o = e.tagName;
        if ("A" === o) {
          s = !0;
          break;
        }
        if (("INPUT" === o || "BUTTON" === o) && "submit" === e.type) {
          r = !0;
          break;
        }
        e = e.parentNode;
      }
      if (s) {
        const h = e.href;
        if (
          !e.hasAttribute("target") &&
          "mai" !== h.substring(0, 3) &&
          (R.PD(t), !i.mutating)
        ) {
          let t = h.replace(/^.*\/\/[^/]+/, "");
          "w" === _A.modePrev && "n1-1" === e.id && (t = i.route.old.url),
            t !== i.route.new.url && ((i.mutating = !0), this.out(t, e));
        }
      } else r && R.PD(t);
    }
    introXhr(e) {
      this.xhrRq((t) => {
        const i = _A.config;
        (i.data = t.data),
          (i.js = t.js),
          (i.routes = t.routes),
          (this.cache = new r(t.cache)),
          this.add(this.app, t.app),
          this.isD && ((this.mutation = new this.crtlMutation()), e());
      });
    }
    introXhr(e) {
      var t = _A;
      R.Fetch({
        url:
          t.route.new.url +
          "?xhr=true&device=" +
          this.device +
          "&webp=" +
          t.webp,
        type: "html",
        success: (t) => {
          t = JSON.parse(t);
          const i = _A.config;
          (i.data = t.data),
            (i.js = t.js),
            (i.routes = t.routes),
            (this.cache = new r(t.cache)),
            this.add(this.app, t.app),
            this.isD && ((this.mutation = new this.crtlMutation()), e());
        },
      });
    }
    out(t, i) {
      this.router.mutation(t);
      const e = _A;
      (e.target = i),
        (e.fromBack = "back" === i),
        (e.main.getData = (t) => {
          var i = this.cache.get();
          this.in({
            data: i,
          });
        }),
        this.mutation.out();
    }
    in(t) {
      document.title = t.data.title;
      var t = _A;
      "back" !== t.target &&
        ((t = t.route.new.url),
        history.pushState(
          {
            page: t,
          },
          "",
          t
        )),
        this.mutation.in();
    }
    add(t, i) {
      t.insertAdjacentHTML("beforeend", i);
    }
  }
  class o {
    constructor() {
      const t = _A;
      (t.resizeRq = !1),
        (t.win = {
          w: 0,
          h: 0,
        });
    }
    resize() {
      const t = _A;
      var i = innerWidth,
        e = innerHeight;
      if (((t.resizeRq = i !== t.win.w || e !== t.win.h), t.resizeRq)) {
        (t.win = {
          w: i,
          h: e,
        }),
          (t.winSemi = {
            w: 0.5 * i,
            h: 0.5 * e,
          }),
          (t.winRatio = {
            wh: i / e,
            hw: e / i,
          });
        var s = t.config.js.psd;
        (t.psd = {
          h: s.h,
          w: s.w,
        }),
          (t.winWpsdW = i / t.psd.w),
          (t.winHpsdH = e / t.psd.h),
          (t.psdWwinW = t.psd.w / i),
          (t.psdHwinH = t.psd.h / e),
          (t.ratio =
            t.winRatio.wh > t.psd.w / t.psd.h ? t.winHpsdH : t.winWpsdW);
        const r = t.engine.gl.planeBg.bg;
        (r.tr.w = i), (r.tr.h = e);
      }
    }
  }
  var n = {
    vertex:
      "precision highp float;attribute vec2 a;attribute vec2 b;varying vec2 c;varying float d;uniform mat4 e;uniform mat4 f;uniform float g;uniform float h;float i(float m){return m<.5?2.*m*m:-1.+(4.-2.*m)*m;}void main(){vec4 j=f*vec4(a,0.,1.);float z=0.;float k=abs(distance(j.x,0.));if(k<h){z=(h-i(k/h)*h)*g;}gl_Position=e*vec4(j.xy,j.z+z,j.w);c=b;d=min(z*.005,0.7);}",
    fragment:
      "precision highp float;varying float d;varying vec2 c;uniform sampler2D tex;uniform vec2 m;uniform int n;uniform float o;uniform vec3 p;uniform float q;uniform float r;uniform float y;void main(){vec4 s=vec4(p.r,p.g,p.b,1);vec4 t=s;if(n==1){vec4 u=texture2D(tex,vec2((c.x-.5)*m.x+.5,(c.y-.5)*m.y+.5+y));float v=(u.r+u.g+u.b)/3.;t=mix(vec4(v,v,v,.4),u,d+o);t=mix(t,t*s,q);t=vec4(t.rgb,t.a*r);}gl_FragColor = t;}",
  };
  function h() {
    const t = new Float32Array(16);
    return (t[0] = 1), (t[5] = 1), (t[10] = 1), (t[15] = 1), t;
  }
  function q(t) {
    return (
      (t[0] = 1),
      (t[1] = 0),
      (t[2] = 0),
      (t[3] = 0),
      (t[4] = 0),
      (t[5] = 1),
      (t[6] = 0),
      (t[7] = 0),
      (t[8] = 0),
      (t[9] = 0),
      (t[10] = 1),
      (t[11] = 0),
      (t[12] = 0),
      (t[13] = 0),
      (t[14] = 0),
      (t[15] = 1),
      t
    );
  }
  function B(t, i) {
    var e,
      s,
      r,
      o,
      h,
      d,
      p,
      c,
      g,
      u,
      w,
      m,
      a = t,
      n = (i = i)[0],
      l = i[1],
      i = i[2];
    return (
      t === a
        ? ((a[12] = t[0] * n + t[4] * l + t[8] * i + t[12]),
          (a[13] = t[1] * n + t[5] * l + t[9] * i + t[13]),
          (a[14] = t[2] * n + t[6] * l + t[10] * i + t[14]),
          (a[15] = t[3] * n + t[7] * l + t[11] * i + t[15]))
        : ((e = t[0]),
          (s = t[1]),
          (r = t[2]),
          (o = t[3]),
          (h = t[4]),
          (d = t[5]),
          (p = t[6]),
          (c = t[7]),
          (g = t[8]),
          (u = t[9]),
          (w = t[10]),
          (m = t[11]),
          (a[0] = e),
          (a[1] = s),
          (a[2] = r),
          (a[3] = o),
          (a[4] = h),
          (a[5] = d),
          (a[6] = p),
          (a[7] = c),
          (a[8] = g),
          (a[9] = u),
          (a[10] = w),
          (a[11] = m),
          (a[12] = e * n + h * l + g * i + t[12]),
          (a[13] = s * n + d * l + u * i + t[13]),
          (a[14] = r * n + p * l + w * i + t[14]),
          (a[15] = o * n + c * l + m * i + t[15])),
      a
    );
  }
  function z(t, i, e) {
    var s = t,
      r = (e = e)[0],
      o = e[1],
      e = e[2],
      h = Math.hypot(r, o, e);
    if (Math.abs(h) < 1e-6) return null;
    (r *= h = 1 / h), (o *= h), (e *= h);
    var h = Math.sin(i),
      a = 1 - (i = Math.cos(i)),
      d = t[0],
      p = t[1],
      c = t[2],
      g = t[3],
      u = t[4],
      w = t[5],
      m = t[6],
      v = t[7],
      f = t[8],
      x = t[9],
      y = t[10],
      R = t[11],
      n = r * r * a + i,
      l = o * r * a + e * h,
      A = e * r * a - o * h,
      b = r * o * a - e * h,
      T = o * o * a + i,
      k = e * o * a + r * h,
      _ = r * e * a + o * h,
      o = o * e * a - r * h,
      r = e * e * a + i;
    return (
      (s[0] = d * n + u * l + f * A),
      (s[1] = p * n + w * l + x * A),
      (s[2] = c * n + m * l + y * A),
      (s[3] = g * n + v * l + R * A),
      (s[4] = d * b + u * T + f * k),
      (s[5] = p * b + w * T + x * k),
      (s[6] = c * b + m * T + y * k),
      (s[7] = g * b + v * T + R * k),
      (s[8] = d * _ + u * o + f * r),
      (s[9] = p * _ + w * o + x * r),
      (s[10] = c * _ + m * o + y * r),
      (s[11] = g * _ + v * o + R * r),
      t !== s &&
        ((s[12] = t[12]), (s[13] = t[13]), (s[14] = t[14]), (s[15] = t[15])),
      s
    );
  }
  class l {
    constructor(t, i) {
      (this.gl = t),
        (this.near = i.near || 1),
        (this.far = i.far || 2e3),
        (this.fov = i.fov || 45),
        (this.aspect = i.aspect || 1),
        (this.left = i.left),
        (this.right = i.right),
        (this.top = i.top),
        (this.bottom = i.bottom),
        (this.type = i.type),
        (this.projectionMatrix = h()),
        (this.matrixCamera = h());
    }
    resize(t) {
      "perspective" === this.type ? this.perspective(t) : this.orthographic(t),
        this.gl.renderer.uProjectionMatrix(this.projectionMatrix);
    }
    perspective(t) {
      t && (this.aspect = t.aspect);
      var i,
        e,
        s,
        r,
        t = this.fov * (Math.PI / 180),
        o =
          ((this.projectionMatrix =
            ((i = this.projectionMatrix),
            (t = t),
            (o = this.aspect),
            (e = this.near),
            (s = this.far),
            (t = 1 / Math.tan(0.5 * t)),
            (r = 1 / (e - s)),
            (i[0] = t / o),
            (i[1] = 0),
            (i[2] = 0),
            (i[3] = 0),
            (i[4] = 0),
            (i[5] = t),
            (i[6] = 0),
            (i[7] = 0),
            (i[8] = 0),
            (i[9] = 0),
            (i[10] = (s + e) * r),
            (i[11] = -1),
            (i[12] = 0),
            (i[13] = 0),
            (i[14] = 2 * s * e * r),
            (i[15] = 0),
            i)),
          _A.winSemi);
      this.posOrigin = {
        x: o.w,
        y: -o.h,
        z: o.h / Math.tan((Math.PI * this.fov) / 360),
      };
    }
    orthographic(t) {
      var i, e, s, r, o, h, a, n, l;
      t && ((this.right = t.right), (this.bottom = t.bottom)),
        (this.projectionMatrix =
          ((t = this.projectionMatrix),
          (i = this.left),
          (e = this.right),
          (s = this.bottom),
          (r = this.top),
          (o = this.near),
          (h = this.far),
          (a = 1 / (i - e)),
          (n = 1 / (s - r)),
          (l = 1 / (o - h)),
          (t[0] = -2 * a),
          (t[1] = 0),
          (t[2] = 0),
          (t[3] = 0),
          (t[4] = 0),
          (t[5] = -2 * n),
          (t[6] = 0),
          (t[7] = 0),
          (t[8] = 0),
          (t[9] = 0),
          (t[10] = 2 * l),
          (t[11] = 0),
          (t[12] = (i + e) * a),
          (t[13] = (r + s) * n),
          (t[14] = (h + o) * l),
          (t[15] = 1),
          t));
    }
    render(t) {
      var i,
        e,
        s,
        r,
        d,
        o,
        h,
        p,
        c,
        a,
        g,
        u,
        w,
        n,
        l,
        m,
        v,
        f,
        x,
        y,
        R,
        A,
        b,
        T,
        k,
        _,
        L,
        C,
        I,
        P,
        O,
        E,
        W,
        X,
        S,
        D,
        G,
        M,
        j,
        F,
        z,
        H;
      return (
        (this.matrixCamera = q(this.matrixCamera)),
        (this.matrixCamera = B(this.matrixCamera, [
          this.posOrigin.x + t.x,
          this.posOrigin.y + t.y,
          this.posOrigin.z + t.z,
        ])),
        (t = this.matrixCamera),
        (i = this.matrixCamera),
        (e = i[0]),
        (s = i[1]),
        (r = i[2]),
        (d = i[3]),
        (o = i[4]),
        (h = i[5]),
        (p = i[6]),
        (c = i[7]),
        (a = i[8]),
        (g = i[9]),
        (u = i[10]),
        (w = i[11]),
        (n = i[12]),
        (l = i[13]),
        (m = i[14]),
        (i = i[15]),
        (I = a * l),
        (P = n * g),
        (O = o * l),
        (E = n * h),
        (W = o * g),
        (X = a * h),
        (S = e * l),
        (D = n * s),
        (G = e * g),
        (M = a * s),
        (j = e * h),
        (F = o * s),
        (h =
          1 /
          (e *
            (z =
              (v = u * i) * h +
              (y = m * c) * g +
              (R = p * w) * l -
              ((f = m * w) * h + (x = p * i) * g + (A = u * c) * l)) +
            o *
              (H =
                f * s +
                (b = r * i) * g +
                (_ = u * d) * l -
                (v * s + (T = m * d) * g + (k = r * w) * l)) +
            a *
              (l =
                x * s +
                T * h +
                (L = r * c) * l -
                (y * s + b * h + (C = p * d) * l)) +
            n * (s = A * s + k * h + C * g - (R * s + _ * h + L * g)))),
        (t[0] = h * z),
        (t[1] = h * H),
        (t[2] = h * l),
        (t[3] = h * s),
        (t[4] = h * (f * o + x * a + A * n - (v * o + y * a + R * n))),
        (t[5] = h * (v * e + T * a + k * n - (f * e + b * a + _ * n))),
        (t[6] = h * (y * e + b * o + C * n - (x * e + T * o + L * n))),
        (t[7] = h * (R * e + _ * o + L * a - (A * e + k * o + C * a))),
        (t[8] = h * (I * c + E * w + W * i - (P * c + O * w + X * i))),
        (t[9] = h * (P * d + S * w + M * i - (I * d + D * w + G * i))),
        (t[10] = h * (O * d + D * c + j * i - (E * d + S * c + F * i))),
        (t[11] = h * (X * d + G * c + F * w - (W * d + M * c + j * w))),
        (t[12] = h * (O * u + X * m + P * p - (W * m + I * p + E * u))),
        (t[13] = h * (G * m + I * r + D * u - (S * u + M * m + P * r))),
        (t[14] = h * (S * p + F * m + E * r - (j * m + O * r + D * p))),
        (t[15] = h * (j * u + W * r + M * p - (G * p + F * u + X * r))),
        t
      );
    }
  }
  class p {
    constructor(t, i) {
      var e = _A,
        t = ((this.gl = t), (this.cb = i), e.config),
        s = "." + (e.webp ? "webp" : "jpg"),
        i = ((this.version = "?" + t.v), t.data),
        r = i.work,
        o = i.workL;
      (this.tex = []), (this.texL = o);
      for (let t = 0; t < o; t++) {
        var h = "/static/media/" + r[t].folder + "/h/0" + s;
        this.imgSet({
          src: h,
          index: t,
        });
      }
      (this.load = R.G.id("load")),
        (this.no = 0),
        (this.prevNo = 0),
        R.BM(this, ["loop"]),
        (this.raf = new R.RafR(this.loop)),
        this.raf.run();
    }
    imgSet(t) {
      const e = t.index;
      t = t.src;
      const s = new Image();
      (s.onload = (t) => {
        var i = this.texInit(s);
        (this.tex[e] = {
          attrib: i,
          element: s,
        }),
          this.no++;
      }),
        (s.src = t + this.version);
    }
    texInit(t) {
      const i = this.gl;
      var e = i.createTexture();
      return (
        i.bindTexture(i.TEXTURE_2D, e),
        i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, i.RGBA, i.UNSIGNED_BYTE, t),
        i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE),
        i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE),
        i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, i.LINEAR),
        i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, i.LINEAR),
        e
      );
    }
    el(t, i) {
      this.load.children[t].children[0].textContent = i;
    }
    loop() {
      var t = Math.round((99 / this.texL) * this.no) + 1;
      this.no !== this.prevNo &&
        ((this.prevNo = this.no),
        t < 10
          ? this.el(2, t)
          : t < 100
          ? ((t = (t + "").split("")), this.el(1, t[0]), this.el(2, t[1]))
          : (this.el(0, 1), this.el(1, 0), this.el(2, 0))),
        this.no === this.texL && (this.raf.stop(), this.cb(this.tex));
    }
  }
  class c {
    constructor(i) {
      this.dpr = i.dpr;
      const t = R.G.id("gl");
      (this.gl =
        t.getContext("webgl", {
          antialias: !0,
          alpha: !0,
        }) || t.getContext("experimental-webgl")),
        (this.state = {
          depthTest: null,
          cullFace: null,
        }),
        this.setBlendFunc();
      const e = (this.gl.renderer = this).gl.getExtension(
        "OES_vertex_array_object"
      );
      var s = ["create", "bind"];
      this.vertexArray = {};
      for (let t = 0; t < 2; t++) {
        var r = s[t];
        this.vertexArray[r] = e[r + "VertexArrayOES"].bind(e);
      }
      (this.programCurrId = null),
        (this.viewport = {
          width: null,
          height: null,
        }),
        (this.camera = new l(this.gl, i.camera)),
        new p(this.gl, (t) => {
          (this.tex = t), i.cb();
        });
    }
    setFaceCulling(t) {
      this.state.cullFace !== t &&
        ((this.state.cullFace = t),
        this.gl.enable(this.gl.CULL_FACE),
        this.gl.cullFace(this.gl[t]));
    }
    setBlendFunc() {
      this.gl.enable(this.gl.BLEND),
        this.gl.blendFuncSeparate(
          this.gl.SRC_ALPHA,
          this.gl.ONE_MINUS_SRC_ALPHA,
          this.gl.ONE,
          this.gl.ONE_MINUS_SRC_ALPHA
        );
    }
    clear() {
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
    resize() {
      (this.win = _A.win),
        (this.width = this.win.w),
        (this.height = this.win.h),
        (this.gl.canvas.width = this.width * this.dpr),
        (this.gl.canvas.height = this.height * this.dpr),
        this.camera.resize({
          aspect: this.gl.canvas.width / this.gl.canvas.height,
        }),
        this.setViewport();
    }
    setViewport() {
      var t = this.width * this.dpr,
        i = this.height * this.dpr;
      (this.viewport.width === t && this.viewport.height === i) ||
        ((this.viewport.width = t),
        (this.viewport.height = i),
        this.gl.viewport(0, 0, t, i),
        (this.viewMatrix = this.camera.render({
          x: 0,
          y: 0,
          z: 0,
        })));
    }
    render(t, i) {
      i.draw(), t.draw();
    }
  }
  let g = 1;
  class u {
    constructor(t, i) {
      (this.gl = t),
        (this.uniform = i.uniform || {}),
        (this.id = g++),
        (this.program = this.crP(i.shader));
      const e = this.uniform;
      (e.e = {
        type: "Matrix4fv",
      }),
        (e.f = {
          type: "Matrix4fv",
        }),
        this.getL(e, "Uniform"),
        (this.gl.renderer.uProjectionMatrix = (t) => {
          e.e.value = t;
        });
    }
    crP(t) {
      const i = this.gl;
      var e = this.crS(t.vertex, i.VERTEX_SHADER),
        t = this.crS(t.fragment, i.FRAGMENT_SHADER),
        s = i.createProgram();
      return (
        i.attachShader(s, e),
        i.attachShader(s, t),
        i.linkProgram(s),
        i.deleteShader(e),
        i.deleteShader(t),
        s
      );
    }
    crS(t, i) {
      i = this.gl.createShader(i);
      return this.gl.shaderSource(i, t), this.gl.compileShader(i), i;
    }
    getL(t, i) {
      for (const e in t)
        R.Has(t, e) &&
          (t[e].location = this.gl["get" + i + "Location"](this.program, e));
    }
    setUniform() {
      for (const e in this.uniform)
        if (R.Has(this.uniform, e)) {
          const s = this.uniform[e];
          var t = s.location,
            i = "uniform" + s.type;
          "Matrix" === s.type.substring(0, 6)
            ? this.gl[i](t, !1, s.value)
            : this.gl[i](t, s.value);
        }
    }
    run() {
      this.gl.renderer.programCurrId === this.id ||
        (this.gl.useProgram(this.program),
        (this.gl.renderer.programCurrId = this.id));
    }
  }
  class d {
    constructor(t, i) {
      (this.gl = t),
        (this.index = i.index),
        (this.program = i.program),
        (this.mode = i.mode),
        (this.face = i.face),
        (this.attrib = i.attrib),
        (this.speed = i.speed),
        (this.hasTex = i.hasTex),
        this.gl.renderer.vertexArray.bind(null),
        this.program.getL(this.attrib, "Attrib"),
        (this.modelMatrix = h());
    }
    setVAO() {
      const t = this.gl.renderer;
      (this.vao = t.vertexArray.create()),
        t.vertexArray.bind(this.vao),
        this.setAttrib(),
        t.vertexArray.bind(null);
    }
    setAttrib() {
      const t = this.gl;
      for (const s in this.attrib)
        if (R.Has(this.attrib, s)) {
          const r = this.attrib[s];
          var i = "index" === s,
            e = r.data.constructor;
          e === Float32Array
            ? (r.type = t.FLOAT)
            : e === Uint16Array
            ? (r.type = t.UNSIGNED_SHORT)
            : (r.type = t.UNSIGNED_INT),
            (r.count = r.data.length / r.size),
            (r.target = i ? t.ELEMENT_ARRAY_BUFFER : t.ARRAY_BUFFER),
            (r.normalize = !1),
            t.bindBuffer(r.target, t.createBuffer()),
            t.bufferData(r.target, r.data, t.STATIC_DRAW),
            i ||
              (t.enableVertexAttribArray(r.location),
              t.vertexAttribPointer(
                r.location,
                r.size,
                r.type,
                r.normalize,
                0,
                0
              ));
        }
    }
    draw(d) {
      const p = this.gl,
        c = p.renderer;
      c.setFaceCulling(this.face),
        this.program.run(),
        (this.modelMatrix = q(this.modelMatrix));
      var t,
        i,
        g,
        u,
        w,
        m,
        v,
        f,
        x,
        y,
        A,
        b,
        T,
        k,
        _,
        e = c.viewMatrix;
      (t = this.modelMatrix),
        (i = t = t),
        (C = (e = e = e)[0]),
        (l = e[1]),
        (I = e[2]),
        (P = e[3]),
        (O = e[4]),
        (E = e[5]),
        (S = e[6]),
        (D = e[7]),
        (G = e[8]),
        (M = e[9]),
        (j = e[10]),
        (r = e[11]),
        (g = e[12]),
        (u = e[13]),
        (w = e[14]),
        (e = e[15]),
        (h = i[0]),
        (F = i[1]),
        (m = i[2]),
        (v = i[3]),
        (o = i[4]),
        (f = i[5]),
        (x = i[6]),
        (y = i[7]),
        (a = i[8]),
        (A = i[9]),
        (b = i[10]),
        (T = i[11]),
        (n = i[12]),
        (k = i[13]),
        (_ = i[14]),
        (i = i[15]),
        (t[0] = C * h + l * o + I * a + P * n),
        (t[1] = C * F + l * f + I * A + P * k),
        (t[2] = C * m + l * x + I * b + P * _),
        (t[3] = C * v + l * y + I * T + P * i),
        (t[4] = O * h + E * o + S * a + D * n),
        (t[5] = O * F + E * f + S * A + D * k),
        (t[6] = O * m + E * x + S * b + D * _),
        (t[7] = O * v + E * y + S * T + D * i),
        (t[8] = G * h + M * o + j * a + r * n),
        (t[9] = G * F + M * f + j * A + r * k),
        (t[10] = G * m + M * x + j * b + r * _),
        (t[11] = G * v + M * y + j * T + r * i),
        (t[12] = g * h + u * o + w * a + e * n),
        (t[13] = g * F + u * f + w * A + e * k),
        (t[14] = g * m + u * x + w * b + e * _),
        (t[15] = g * v + u * y + w * T + e * i);
      let s = t;
      const L = this.program.uniform;
      var r,
        o,
        h,
        a,
        n,
        C = _A,
        l = d.tr,
        I = l.x,
        P = l.y,
        O = l.w,
        E = l.h;
      let W = 1,
        X = 0;
      if (this.hasTex) {
        var S = 1 + l.scale,
          D = ((W = l.light), (X = l.pY), I + 0.5 * O),
          G =
            ((s = B(s, [D, 0, 0])),
            (s = z(s, -0.4 * C.latency.rotate, [0, 1, 0])),
            (s = B(s, [-D, 0, 0])),
            d.media);
        if (this.hasTex) {
          var M = O / E,
            j = M / G.ratio.wh;
          let t = 1,
            i = M;
          1 < j && ((i /= j), (t /= j)), (L.m.value = [i / S, t / S]);
        }
      }
      (s = B(s, [I, -P, 0])),
        (s =
          ((r = s),
          (h = r = r),
          (a = (o = o = [O, E, 1])[0]),
          (n = o[1]),
          (o = o[2]),
          (r[0] = h[0] * a),
          (r[1] = h[1] * a),
          (r[2] = h[2] * a),
          (r[3] = h[3] * a),
          (r[4] = h[4] * n),
          (r[5] = h[5] * n),
          (r[6] = h[6] * n),
          (r[7] = h[7] * n),
          (r[8] = h[8] * o),
          (r[9] = h[9] * o),
          (r[10] = h[10] * o),
          (r[11] = h[11] * o),
          (r[12] = h[12]),
          (r[13] = h[13]),
          (r[14] = h[14]),
          (r[15] = h[15]),
          r)),
        (L.f.value = s),
        (L.n.value = this.hasTex),
        (L.o.value = W),
        (L.q.value = l.multiply),
        (L.r.value = R.R(l.o)),
        (L.g.value = C.latency.x),
        (L.y.value = X),
        this.program.setUniform(),
        this.hasTex && p.bindTexture(p.TEXTURE_2D, this.attrib.b.tex),
        c.vertexArray.bind(this.vao);
      var F = this.attrib.index;
      p.drawElements(p[this.mode], F.count, F.type, 0);
    }
  }
  class w {
    constructor(i, t) {
      this.gl = i;
      var e = t.program,
        s = this.gl.renderer.tex;
      (this.workL = _A.config.data.workL), (this.plane = []);
      for (let t = 0; t < this.workL; t++) {
        var r = s[t],
          o = r.element,
          h = o.width,
          a = o.height;
        this.plane[t] = {
          tr: {
            x: 0,
            y: 0,
            w: 1,
            h: 1,
            o: 1,
            light: 0,
            multiply: 0,
            pY: 0,
            scale: 0,
          },
          pts: {
            hori: 20,
            vert: 2,
          },
          tex: r,
          media: {
            obj: o,
            dimension: {
              width: h,
              height: a,
            },
            ratio: {
              wh: h / a,
              hw: a / h,
            },
          },
        };
        const n = this.plane[t];
        n.geo = new d(i, {
          hasTex: 1,
          index: t,
          speed: n.speed,
          program: e,
          mode: "TRIANGLE_STRIP",
          face: "FRONT",
          attrib: {
            a: {
              size: 2,
            },
            index: {
              size: 1,
            },
            b: {
              size: 2,
              tex: n.tex.attrib,
            },
          },
        });
        r = this.planeSetup(n);
        const l = n.geo.attrib;
        (l.a.data = new Float32Array(r.pos)),
          (l.index.data = new Uint16Array(r.index)),
          (l.b.data = new Float32Array(r.texture)),
          n.geo.setVAO();
      }
    }
    draw() {
      var t = _A,
        i = t.win.w,
        e = t.win.h;
      for (let t = 0; t < this.workL; t++) {
        const a = this.plane[t];
        var s = a.tr,
          r = s.x < i,
          o = 0 < s.x + s.w,
          h = s.y < e,
          s = 0 < s.y + s.h;
        h && s && r && o
          ? (a.isOut && (a.isOut = !1), a.geo.draw(a))
          : a.isOut || ((a.isOut = !0), a.geo.draw(a));
      }
    }
    planeSetup(t) {
      t.isOut = !1;
      const e = t.pts.hori,
        i = t.pts.vert,
        s = e - 1,
        r = i - 1,
        d = 1 / s,
        p = 1 / r;
      const o = [];
      let c = 0;
      for (let t = 0; t < i; t++) {
        var g = t * p - 1;
        for (let t = 0; t < e; t++) (o[c++] = t * d), (o[c++] = g);
      }
      const h = [];
      let a = 0;
      var u = i - 1,
        w = i - 2,
        m = e - 1;
      for (let i = 0; i < u; i++) {
        var v = e * i,
          f = v + e;
        for (let t = 0; t < e; t++) {
          var x = f + t;
          (h[a++] = v + t),
            (h[a++] = x),
            t === m && i < w && ((h[a++] = x), (h[a++] = e * (i + 1)));
        }
      }
      t = t.media.ratio.wh;
      const n = {};
      1 < t ? ((n.w = t), (n.h = 1)) : ((n.w = 1), (n.h = 1 / t));
      var y = 0.5 * (1 - 1 / n.w),
        R = 0.5 * (1 - 1 / n.h);
      const l = [];
      let A = 0;
      for (let t = 0; t < i; t++) {
        var b = 1 - (t / r / n.h + R);
        for (let t = 0; t < e; t++) (l[A++] = t / s / n.w + y), (l[A++] = b);
      }
      return {
        pos: o,
        index: h,
        texture: l,
      };
    }
  }
  class m {
    constructor(t, i) {
      this.gl = t;
      i = i.program;
      (this.bg = {
        tr: {
          x: 0,
          y: 0,
        },
      }),
        (this.bg.geo = new d(t, {
          hasTex: 0,
          index: 0,
          program: i,
          mode: "TRIANGLE_STRIP",
          face: "FRONT",
          attrib: {
            a: {
              size: 2,
            },
            index: {
              size: 1,
            },
          },
        }));
      const e = this.bg.geo.attrib;
      (e.a.data = new Float32Array([0, -1, 1, -1, 0, 0, 1, 0])),
        (e.index.data = new Uint16Array([0, 2, 1, 3])),
        this.bg.geo.setVAO();
    }
    draw() {
      this.bg.geo.draw(this.bg);
    }
  }
  class v {
    constructor(t) {
      (this.renderer = new c({
        camera: {
          type: "perspective",
        },
        dpr: 1.5,
        cb: t,
      })),
        (this.gl = this.renderer.gl),
        (this.program = new u(this.gl, {
          shader: n,
          uniform: {
            m: {
              type: "2fv",
              value: [1, 1],
            },
            n: {
              type: "1i",
              value: 0,
            },
            g: {
              type: "1f",
              value: 0,
            },
            h: {
              type: "1f",
              value: 0,
            },
            o: {
              type: "1f",
              value: 0,
            },
            q: {
              type: "1f",
              value: 0,
            },
            p: {
              type: "3fv",
              value: [0, 0, 0],
            },
            r: {
              type: "1f",
              value: 0,
            },
            y: {
              type: "1f",
              value: 0,
            },
          },
        }));
    }
    intro() {
      this.renderer.clear();
      var t = {
        program: this.program,
      };
      (this.planeTex = new w(this.gl, t)), (this.planeBg = new m(this.gl, t));
    }
    resize() {
      var t = _A;
      t.resizeRq &&
        (this.renderer.resize(),
        (this.program.uniform.h.value = 500 * t.winWpsdW));
    }
    loop() {
      (this.program.uniform.p.value = _A.color.gl),
        this.renderer.render(this.planeTex, this.planeBg);
    }
  }
  class f {
    constructor(t) {
      (this.cb = t.cb),
        (this.isOn = !1),
        (this.isFF = R.Snif.isFirefox),
        R.BM(this, ["fn"]),
        R.L(document, "a", "mouseWheel", this.fn);
    }
    on() {
      (this.tick = !1), (this.isOn = !0);
    }
    off() {
      this.isOn = !1;
    }
    fn(t) {
      (this.e = t),
        R.PD(t),
        this.isOn && (this.tick || ((this.tick = !0), this.run()));
    }
    run() {
      var t = this.e.wheelDeltaX || -1 * this.e.deltaX,
        i = this.e.wheelDeltaY || -1 * this.e.deltaY;
      let e = Math.abs(t) >= Math.abs(i) ? t : i;
      this.isFF && 1 === this.e.deltaMode ? (e *= 0.75) : (e *= 0.556),
        this.cb(-e),
        (this.tick = !1);
    }
  }
  class x {
    constructor(t) {
      (this.cb = t.cb),
        (this.el = R.Has(t, "el") ? R.Select.el(t.el)[0] : document),
        R.BM(this, ["run"]);
    }
    on() {
      this.l("a");
    }
    off() {
      this.l("r");
    }
    l(t) {
      R.L(this.el, t, "mousemove", this.run);
    }
    run(t) {
      this.cb(t.pageX, t.pageY, t);
    }
  }
  class y {
    constructor() {
      const t = _A,
        i =
          (R.BM(this, [
            "sXFn",
            "move",
            "down",
            "up",
            "leave",
            "modeOut",
            "key",
            "morphFn",
          ]),
          (this.sX = new f({
            cb: this.sXFn,
          })),
          (this.mm = new x({
            cb: this.move,
          })),
          (this.isRunning = !1),
          (this.timer = new R.Delay((t) => {
            this.isRunning = !1;
          }, 300)),
          (this.prop = t.prop),
          (this.propL = t.propL),
          (this.pCurr = []),
          (this.pTarg = []),
          (t.x = 0),
          (this.x = {
            curr: 0,
            targ: 0,
            currLatency: 0,
          }),
          t.color.bg.rgbNorm);
      (this.colorBase = i.slice()),
        (this.color = {}),
        (t.color.gl = this.colorBase.slice()),
        (this.sensi = 1.2),
        (this.latency = 0),
        (this.indexOver = 0),
        (this.isDown = !1),
        (this.isDragging = !1),
        (this.prev = 0),
        (this.morphA = []);
    }
    intro() {
      var t = _A,
        i = t.config.data;
      (this.work = i.work),
        (this.workL = i.workL),
        (this.limit = this.workL - 1),
        (this.plane = t.engine.gl.planeTex.plane);
    }
    init() {
      const t = _A;
      var i,
        e = t.is,
        s = t.was;
      (this.isHome = e.home),
        (this.isHA = e.about || e.home),
        (this.reset = !0),
        this.isHA &&
          (this.morph({
            d: 0,
            e: "o5",
            shape: "cross",
          }),
          (i = t.mode),
          e.about
            ? ("in" === i
                ? (t.pgn.up(),
                  t.fx.title({
                    a: "hide",
                    d: 500,
                    delay: 0,
                    r: !1,
                  }),
                  t.fx.info({
                    a: "hide",
                    d: 500,
                    delay: 0,
                  }),
                  t.fx.explore({
                    a: "hide",
                    d: 500,
                    delay: 0,
                  }))
                : "w" === i &&
                  (t.fx.title({
                    a: "hide",
                    d: 500,
                    delay: 0,
                    r: !1,
                  }),
                  t.fx.info({
                    a: "hide",
                    d: 500,
                    delay: 0,
                  }),
                  t.fx.project({
                    a: "hide",
                    d: 500,
                    delay: 0,
                  })),
              "out" !== i &&
                t.nav.colorFix({
                  default: !0,
                }),
              t.aFx.play({
                a: "show",
                d: 1600,
                delay: 100,
              }),
              (t.mode = "a"))
            : s.about
            ? (t.aFx.play({
                a: "hide",
                d: 500,
                delay: 0,
              }),
              "in" === t.modePrev
                ? (t.fx.title({
                    a: "show",
                    d: 1600,
                    delay: 0,
                    r: !1,
                  }),
                  t.fx.info({
                    a: "show",
                    d: 1600,
                    delay: 400,
                  }),
                  t.fx.explore({
                    a: "show",
                    d: 1600,
                    delay: 600,
                  }))
                : "w" === t.modePrev &&
                  (t.fx.title({
                    a: "show",
                    d: 1600,
                    delay: 0,
                    r: !1,
                  }),
                  t.fx.info({
                    a: "show",
                    d: 1600,
                    delay: 400,
                  }),
                  t.fx.project({
                    a: "show",
                    d: 1600,
                    delay: 400,
                  })),
              "out" !== t.modePrev &&
                t.nav.colorFix({
                  default: !1,
                }),
              (t.mode = t.modePrev))
            : s.work
            ? ((t.mode = "in"),
              t.fx.project({
                a: "hide",
                d: 500,
                delay: 0,
              }),
              t.fx.explore({
                a: "show",
                d: 1600,
                delay: 400,
              }),
              t.letter.move({
                start: "work",
                end: "home",
                d: 1200,
              }),
              t.pgn.up(),
              t.pgnX.show({
                r: !1,
                out: !1,
                d: 0,
              }))
            : (t.mode = "out"),
          (t.modePrev = i));
    }
    resize() {
      const e = _A;
      if (this.isHA) {
        var i = e.index,
          s = e.mode,
          r = e.resizeRq || this.reset,
          o =
            this.reset &&
            (("a" !== e.modePrev && "a" !== e.mode) || R.Is.und(this.min));
        if (
          ((e.resizeRq || o) && ((this.min = 0), this.gMax()),
          (e.resizeRq || o) && this.xUp(this.x.targ),
          r)
        ) {
          let i;
          "a" === s
            ? "out" === e.modePrev
              ? (i = e.data.modeOut())
              : "in" === e.modePrev
              ? (i = e.data.modeIn())
              : "w" === e.modePrev && (i = e.data.modeW())
            : "out" === s
            ? (i = e.data.modeOut())
            : "in" === s
            ? (i = e.data.modeIn())
            : "w" === s && (i = e.data.modeW()),
            R.Is.def(this.delay) && this.delay.stop();
          o = e.isIntro && "out" === e.mode;
          e.resizeRq
            ? o
              ? ((r = e.data.modeOutIntro()),
                this.pSet(this.pCurr, r),
                this.pSet(this.pTarg, r),
                (this.delay = new R.Delay((t) => {
                  this.pSet(this.pTarg, i, !0);
                }, 400)),
                this.delay.run())
              : this.pSet(this.pCurr, i)
            : this.reset &&
              ("w" === e.modePrev
                ? ((r = e.data["a" === s ? "modeW" : "wToH"]()),
                  this.pSet(this.pCurr, r))
                : "a" !== s &&
                  "a" !== e.modePrev &&
                  ((r = e.data.modeOut()), this.pSet(this.pCurr, r))),
            o || this.pSet(this.pTarg, i);
        }
        let t;
        (t = (
          "out" === s || "a" === s ? this.colorBase : this.work[i].color.bg
        ).slice()),
          (this.color.targ = t),
          e.resizeRq
            ? ((this.color.curr = t), (e.color.gl = t))
            : this.reset && (this.color.curr = e.color.gl),
          e.resizeRq || e.pgn.pageChange(),
          this.render(),
          (this.reset = !1);
      }
    }
    gMax() {
      const t = _A;
      (this.gapXW = t.data.outGapXW()),
        (this.max = R.R(this.limit * this.gapXW)),
        (this.x.targ = t.index * this.gapXW);
    }
    xUp(t) {
      (this.x.targ = t), (this.x.curr = t), (this.x.currLatency = t);
    }
    timerReset() {
      this.timer.stop(),
        this.isRunning || (this.isRunning = !0),
        this.timer.run();
    }
    sXFn(t) {
      var i;
      this.isDown ||
        (this.timerReset(),
        "in" === (i = _A.mode)
          ? this.modeOut()
          : "out" === i && this.xTargUp(this.x.targ + t));
    }
    down(t) {
      var i = t.target;
      t.ctrlKey || "A" === i.tagName || 0 !== t.button
        ? t.preventDefault()
        : ((this.isDown = !0),
          (this.start = t.pageX),
          (this.targ = this.x.targ),
          (this.targPrev = this.targ));
    }
    move(t, i) {
      const e = _A;
      (e.cursor.x = t),
        (e.cursor.y = i),
        this.isDown &&
          ((i = this.sensi),
          t > this.prev && this.targ === this.min
            ? (this.start = t - (this.targPrev - this.min) / i)
            : t < this.prev &&
              this.targ === this.max &&
              (this.start = t - (this.targPrev - this.max) / i),
          (this.prev = t),
          (this.targ = -(t - this.start) * i + this.targPrev),
          (this.isDragging = this.isDraggingUp()),
          this.isDragging && this.timerReset(),
          "in" === (t = e.mode)
            ? this.isDragging && ((this.targPrev = this.targ), this.modeOut())
            : "out" === t && this.xTargUp(this.targ));
    }
    leave() {
      _A.cursor = {
        x: -1,
        y: -1,
      };
    }
    isDraggingUp() {
      return 6 < Math.abs(this.targ - this.targPrev) / this.sensi;
    }
    up(t) {
      0 === t.button &&
        this.isDown &&
        ((t = _A),
        (this.isDown = !1),
        (this.isDragging = this.isDraggingUp()),
        this.isDragging ||
          (-1 < this.indexOver
            ? this.modeIn(this.indexOver)
            : -1 < t.pOver &&
              ("out" === t.mode
                ? (this.x.targ = t.pOver * this.gapXW)
                : this.modeIn(t.pOver))));
    }
    modeIn(t) {
      const i = _A;
      var e = "out" === i.mode,
        s = t;
      let r = !(i.mode = "in");
      !e && s > i.index && (r = !0),
        i.li.run({
          index: t,
        }),
        e ||
          (i.fx.title({
            a: "hide",
            d: 500,
            delay: 0,
            r: r,
          }),
          i.fx.info({
            a: "hide",
            d: 500,
            delay: 0,
          }),
          i.fx.explore({
            a: "hide",
            d: 500,
            delay: 0,
          }),
          i.pgnX.hideCurr({
            r: r,
            out: e,
          })),
        (i.index = s),
        this.gMax();
      t = i.data.modeIn();
      this.pSet(this.pTarg, t),
        (this.color.targ = this.work[i.index].color.bg.slice()),
        (i.color.gl = this.color.curr),
        i.nav.color({
          default: !1,
        }),
        i.fx.title({
          a: "show",
          d: 1600,
          delay: 0,
          r: r,
        }),
        i.fx.info({
          a: "show",
          d: 1600,
          delay: 400,
        }),
        i.fx.explore({
          a: "show",
          d: 1600,
          delay: 600,
        }),
        i.pgnX.show({
          r: r,
          out: e,
          d: 1200,
        }),
        i.pgn.up();
    }
    modeOut(t) {
      const i = _A;
      R.Is.def(t) &&
        "n0" === t.target.id &&
        "out" === i.mode &&
        (location.href = "/"),
        (i.mode = "out"),
        this.gMax();
      t = i.data.modeOut();
      this.pSet(this.pTarg, t),
        (this.color.targ = this.colorBase),
        i.nav.color({
          default: !0,
        }),
        i.pgn.up(),
        i.fx.title({
          a: "hide",
          d: 500,
          delay: 0,
          r: !1,
        }),
        i.fx.info({
          a: "hide",
          d: 500,
          delay: 0,
        }),
        i.fx.explore({
          a: "hide",
          d: 500,
          delay: 0,
        }),
        i.pgnX.hideCurr({
          r: !1,
          out: !0,
        });
    }
    over() {
      var i = _A,
        e = "out" === i.mode,
        s = i.index,
        r = this.work[s].inOverLight;
      (this.needOver = !1), (this.indexOver = -1);
      for (let t = 0; t < this.workL; t++)
        if (t !== s || e) {
          var o = this.pCurr[t];
          const n = this.pTarg[t];
          var h = o.x - this.x.curr,
            h = i.cursor.x >= h && i.cursor.x <= h + o.w,
            a = i.cursor.y >= o.y && i.cursor.y <= o.y + o.h;
          h && a
            ? e
              ? t === this.indexOver ||
                this.isRunning ||
                ((this.indexOver = t), (n.light = 1))
              : ((n.light = r), (this.indexOver = t))
            : 0 !== n.light && (n.light = 0),
            this.needOver || (this.needOver = R.R(o.light) !== R.R(n.light));
        }
    }
    needGl() {
      const t = _A;
      var i = t.index;
      let e = !1;
      for (
        let t = 0;
        t < 3 &&
        ((e = R.R(this.color.curr[t]) !== R.R(this.color.targ[t])), !e);
        t++
      );
      var s = this.pCurr[i],
        i = this.pTarg[i],
        r = R.R(s.o) !== R.R(i.o),
        o = R.R(s.h) !== R.R(i.h),
        h = R.R(s.w) !== R.R(i.w),
        a = R.R(s.y) !== R.R(i.y),
        s = R.R(s.x) !== R.R(i.x),
        i = R.R(this.x.curr) !== R.R(this.x.targ);
      t.needGL = o || h || a || s || r || e || i || this.needOver;
    }
    loop() {
      if (this.isHA) {
        const o = _A;
        var i = o.mode,
          e = o.index,
          s = "out" === i || "a" === i;
        if ((this.over(), this.needGl(), o.needGL)) {
          (this.x.curr += (this.x.targ - this.x.curr) * o.lerp.scroll[i]),
            (o.x = this.x.curr / this.max);
          let t = this.x.targ - this.x.currLatency;
          //chenyu (this.x.currLatency += t * o.lerp.latency[i]),
          s || (t = 0),
            (this.latency += (t - this.latency) * o.lerp.latency[i]);
          var i = s ? 1 : 0.6,
            r = 500 / i,
            r =
              ((o.latency.x = Math.min(Math.abs(this.latency) / r, i)),
              s ? 1.7 : 2);
          o.latency.rotate = R.Clamp(this.latency / (500 / r), -r, r);
          for (let t = 0; t < 3; t++)
            this.color.curr[t] +=
              0.05 * (this.color.targ[t] - this.color.curr[t]);
          (o.color.gl = this.color.curr),
            !s ||
              ((i = R.R(this.x.curr / this.gapXW, 0)) !== e && (o.index = i)),
            this.render();
        }
      }
    }
    render() {
      var t = _A,
        i = t.mode,
        e = t.lerp.tr[i],
        s = this.x.curr,
        r = t.prop,
        o = t.propL;
      for (let t = 0; t < this.workL; t++) {
        const n = this.pCurr[t];
        var h = this.pTarg[t];
        const l = this.plane[t];
        for (let i = 0; i < o; i++) {
          var a = r[i];
          let t = e;
          "light" === a
            ? (t = 0.1)
            : "o" === a && (t = 0 === h[a] ? 0.23 : 0.07),
            (n[a] += (h[a] - n[a]) * t),
            (l.tr[a] = n[a]),
            "x" === a && (l.tr[a] -= s);
        }
      }
    }
    xTargUp(t) {
      t = this.clamp(t);
      (this.x.targ = t), (this.targ = t);
    }
    pSet(e, s) {
      var t = _A;
      let r;
      var o =
          "in" === t.mode ||
          "in" === t.modePrev ||
          "w" === t.mode ||
          ("w" === t.modePrev && "a" === t.mode),
        h = t.prop,
        a = t.propL;
      for (let i = 0; i < this.workL; i++) {
        e[i] = {};
        for (let t = 0; t < a; t++) {
          var n = h[t];
          (r = 0),
            "x" === n && o && (r = this.x.targ),
            (e[i][n] = R.R(s[i][n] + r));
        }
      }
    }
    key(t) {
      var i = t.key;
      if ("Tab" === i) R.PD(t);
      else {
        var e,
          s = _A,
          r = "ArrowRight" === i || " " === i,
          o = "ArrowLeft" === i,
          h = "Enter" === i || "ArrowDown" === i,
          a = "Escape" === i || "ArrowUp" === i;
        if ("a" === i) R.G.id("n1-0").click();
        else if ("out" === s.mode)
          if (r || o) {
            let t = s.index + 7 * (r ? 1 : -1);
            t < 0 ? (t = 0) : t > this.limit && (t = this.limit),
              (this.x.targ = t * this.gapXW);
          } else
            h &&
              (R.PD(t),
              (e = -1 < this.indexOver ? this.indexOver : s.index),
              this.modeIn(e));
        else if ("in" === s.mode)
          if (r || o) {
            let t = s.index + (r ? 1 : -1);
            t < 0 ? (t = 0) : t > this.limit && (t = this.limit),
              this.modeIn(t);
          } else
            a
              ? this.modeOut()
              : (!h && "e" !== i) || (R.PD(t), R.G.class("e")[s.index].click());
      }
    }
    morphFn(t) {
      t = "mouseenter" === t.type ? "arrow" : "cross";
      this.morph({
        d: 700,
        e: "o5",
        shape: t,
      });
    }
    morph(t) {
      var i = _A.index,
        e = R.G.class("e-s-p")[i];
      R.Is.def(this.morphA[i]) && this.morphA[i].pause(),
        (this.morphA[i] = new R.M({
          el: e,
          svg: {
            type: "polygon",
            end: {
              cross:
                "7,11.042 6.08,11.042 6.08,7.889 2.958,7.889 2.958,6.096 6.08,6.096 6.08,2.958 7.921,2.958 7.921,6.096 11.042,6.096 11.042,7.889 7.921,7.889 7.921,11.042",
              arrow:
                "7,11.042 6.499,10.542 4.958,9 3.462,7.503 4.724,6.241 6.08,7.597 6.08,2.958 7.921,2.958 7.923,7.593 9.277,6.24 10.539,7.502 9.041,9 7.5,10.542",
            }[t.shape],
          },
          d: t.d,
          e: t.e,
        })),
        this.morphA[i].play();
    }
    l(t) {
      var i = document;
      R.L(i, t, "mousedown", this.down),
        R.L(i, t, "mouseup", this.up),
        R.L(i, t, "mouseleave", this.leave),
        R.L("#n0", t, "click", this.modeOut),
        R.L(i, t, "keydown", this.key),
        R.L(".e", t, "mouseenter", this.morphFn),
        R.L(".e", t, "mouseleave", this.morphFn);
    }
    on() {
      this.isHome && (this.sX.on(), this.mm.on(), this.l("a"));
    }
    off() {
      this.isHome && (this.sX.off(), this.mm.off(), this.l("r"));
    }
    clamp(t) {
      return R.R(R.Clamp(t, this.min, this.max));
    }
  }
  class A {
    constructor() {
      (this.pCurr = []), (this.pTarg = []);
    }
    intro() {
      var t = _A,
        i = t.config.data;
      (this.work = i.work),
        (this.workL = i.workL),
        (this.color = {}),
        (this.plane = t.engine.gl.planeTex.plane);
    }
    init() {
      const t = _A;
      var i = t.is;
      (this.isWork = i.work),
        (this.reset = !0),
        this.isWork &&
          ((i = t.mode),
          t.indexSet.run(),
          (t.mode = "w"),
          (t.modePrev = i),
          t.nav.color({
            default: !1,
          }),
          t.isIntro &&
            (t.fx.info({
              a: "show",
              d: 1600,
              delay: 200,
            }),
            t.fx.project({
              a: "show",
              d: 1600,
              delay: 200,
            }),
            t.fx.title({
              a: "show",
              d: 1600,
              delay: 200,
              r: !1,
            })));
    }
    resize() {
      const t = _A;
      var i, e;
      this.isWork &&
        ((e = t.data.modeW()),
        t.resizeRq
          ? this.pSet(this.pCurr, e)
          : this.reset && ((i = t.data.hToW()), this.pSet(this.pCurr, i)),
        this.pSet(this.pTarg, e),
        (i = t.index),
        (e = t.indexPrev),
        t.resizeRq ||
          ("in" === t.modePrev &&
            e !== i &&
            (t.pgnX.hide({
              index: e,
              reverse: !1,
              out: !0,
            }),
            t.li.run({
              index: i,
              indexPrev: e,
            }),
            t.fx.explore({
              a: "hide",
              d: 500,
              delay: 0,
              index: e,
            }),
            t.fx.title({
              a: "hide",
              d: 500,
              delay: 0,
              r: !1,
              index: e,
            }),
            t.fx.info({
              a: "hide",
              d: 500,
              delay: 0,
              r: !1,
              index: e,
            }),
            t.fx.title({
              a: "show",
              d: 1600,
              delay: 0,
              r: !1,
            }),
            t.fx.info({
              a: "show",
              d: 1600,
              delay: 0,
              r: !1,
            })),
          ("in" !== t.modePrev && "out" !== t.modePrev) ||
            (t.fx.project({
              a: "show",
              d: 1600,
              delay: 400,
            }),
            t.fx.explore({
              a: "hide",
              d: 500,
              delay: 0,
            }),
            t.letter.move({
              start: "home",
              end: "work",
              d: 1200,
            }),
            t.pgn.pageChange()),
          "out" === t.modePrev &&
            (t.fx.info({
              a: "show",
              d: 1600,
              delay: 0,
            }),
            t.fx.title({
              a: "show",
              d: 1600,
              delay: 0,
              r: !1,
            })),
          "a" === t.modePrev &&
            (t.aFx.play({
              a: "hide",
              d: 500,
              delay: 0,
            }),
            t.fx.project({
              a: "show",
              d: 1600,
              delay: 400,
            }),
            t.fx.info({
              a: "show",
              d: 1600,
              delay: 0,
            }),
            t.fx.title({
              a: "show",
              d: 1600,
              delay: 0,
              r: !1,
            }))),
        (e = this.work[i].color.bg.slice()),
        t.resizeRq
          ? ((this.color.curr = t.color.bg.rgbNorm), (this.color.targ = e))
          : this.reset &&
            ((this.color.curr = t.color.gl), (this.color.targ = e)),
        this.render(),
        (this.reset = !1));
    }
    needGl() {
      const t = _A;
      var i = t.index;
      let e = !1;
      for (
        let t = 0;
        t < 3 &&
        ((e = R.R(this.color.curr[t]) !== R.R(this.color.targ[t])), !e);
        t++
      );
      var s = this.pCurr[i],
        i = this.pTarg[i],
        r = R.R(s.h) !== R.R(i.h),
        o = R.R(s.w) !== R.R(i.w),
        h = R.R(s.y) !== R.R(i.y),
        s = R.R(s.x) !== R.R(i.x);
      t.needGL = r || o || h || s || e;
    }
    loop() {
      if (this.isWork) {
        this.needGl();
        for (let t = 0; t < 3; t++)
          this.color.curr[t] +=
            0.05 * (this.color.targ[t] - this.color.curr[t]);
        (_A.color.gl = this.color.curr), this.render();
      }
    }
    render() {
      var t = _A,
        i = t.mode,
        e = t.lerp.tr[i],
        s = t.prop,
        r = t.propL;
      for (let t = 0; t < this.workL; t++) {
        const a = this.pCurr[t];
        var o = this.pTarg[t];
        const n = this.plane[t];
        for (let i = 0; i < r; i++) {
          var h = s[i];
          let t = e;
          "light" === h ? (t = 0.1) : "o" === h && (t = 0.25),
            (a[h] += (o[h] - a[h]) * t),
            (n.tr[h] = a[h]);
        }
      }
    }
    pSet(e, s) {
      var t = _A,
        r = t.prop,
        o = t.propL;
      for (let i = 0; i < this.workL; i++) {
        e[i] = {};
        for (let t = 0; t < o; t++) {
          var h = r[t];
          e[i][h] = R.R(s[i][h]);
        }
      }
    }
  }
  class b {
    constructor() {
      (_A.wIndex = 0),
        R.BM(this, ["click", "key", "morphFn"]),
        (this.lT3d = []),
        (this.sT3d = []),
        (this.imgVisible = {
          l: [],
          s: [],
        }),
        (this.imgDelay = {
          l: [],
          s: [],
        });
    }
    intro() {
      var t = _A,
        i = t.config,
        e = i.data,
        t = t.webp ? "webp" : "jpg";
      (this.version = "." + t + "?" + i.v),
        (this.work = e.work),
        (this.workL = e.workL),
        (this.l = R.G.id("w-l").children),
        (this.qty = this.l.length),
        (this.lBg = R.G.class("w-l-bg"));
      for (let t = 0; t < this.qty; t++) this.lT3d[t] = {};
      (this.sW = R.G.id("w-s-w")), (this.s = R.G.class("w-s"));
      for (let t = 0; t < this.qty; t++) this.sT3d[t] = {};
      (this.sDelay = []), (this.a = R.G.id("w-a")), (this.aY = {});
    }
    init() {
      const t = _A;
      (this.isWork = t.is.work),
        this.isWork &&
          this.morph({
            d: 0,
            e: "o5",
            shape: "cross",
          });
      var i = this.work[t.index];
      (this.media = i.media),
        (this.mediaL = i.mediaL),
        (this.base = "/static/media/" + i.folder + "/w/"),
        this.isWork && (t.wIndex = this.media[0]);
      let e = 0;
      (this.no = {}), (this.pos = []);
      for (let i = 0; i < this.qty; i++) {
        this.pos[i] = !1;
        for (let t = 0; t < this.mediaL; t++) {
          var s = this.media[t] === i;
          s && ((this.pos[i] = s), (this.no[i] = e), e++);
        }
      }
      if ((this.color(), this.isWork)) {
        var r = ["l", "s"];
        for (let i = 0; i < this.qty; i++) {
          for (let t = 0; t < 2; t++) {
            var o = r[t],
              h = "w-" + o + "-img";
            const a = R.G.class(h)[i];
            R.Is.def(this.imgDelay[o][i]) && this.imgDelay[o][i].stop(),
              (a.className = h),
              "l" === o && (this.lBg[i].className = "w-l-bg"),
              (a.src = "data:,"),
              (this.imgVisible[o][i] = !1);
          }
          this.pos[i] && this.imgLoad(i, "s");
        }
        this.imgLoad(_A.wIndex, "l");
      }
    }
    imgLoad(e, s) {
      if (!this.imgVisible[s][e]) {
        var t = this.no[e];
        let i;
        const r = "l" === s,
          o = ((i = r ? 100 : 80 * t), "w-" + s + "-img"),
          h = R.G.class(o)[e],
          a = this.base + s + "/" + t + this.version,
          n = new Image();
        (n.src = a),
          n.decode().then((t) => {
            (h.src = a),
              (this.imgDelay[s][e] = new R.Delay((t) => {
                (h.className = o + " fx"),
                  r && (this.lBg[e].className = "w-l-bg fx"),
                  (this.imgVisible[s][e] = !0);
              }, i)),
              this.imgDelay[s][e].run();
          });
      }
    }
    resize() {
      const s = _A;
      if (s.resizeRq) {
        var i = s.win.h,
          e = this.l[0].offsetHeight,
          r = s.data.inGap(),
          o =
            ((this.lTarg = R.R(0.5 * (i - e) + e + r)),
            0.2 * this.s[0].offsetHeight),
          p = i + r - this.sW.getBoundingClientRect().top;
        this.sTarg = [];
        for (let t = 0; t < this.qty; t++) this.sTarg[t] = p + o * t;
        this.aYTarg = 80 * s.winHpsdH;
      }
      var h = s.wIndex;
      if (s.resizeRq) {
        for (let e = 0; e < this.qty; e++) {
          let t, i;
          var c = this.isWork && e === h;
          (i = c
            ? ((t = 0), s.isIntro ? this.lTarg : 0)
            : ((t = e > h || !this.isWork ? this.lTarg : -this.lTarg), t)),
            (this.lT3d[e].targ = t),
            (this.lT3d[e].curr = i),
            (this.lT3d[e].currR = i);
        }
        let t = 0;
        for (let i = 0; i < this.qty; i++) {
          var a = this.isWork && this.pos[i];
          const l = a ? 0 : this.sTarg[i];
          var n = s.isIntro ? this.sTarg[i] : l,
            n =
              ((this.sT3d[i].curr = n),
              (this.sT3d[i].currR = n),
              (this.sT3d[i].targ = n),
              R.Is.def(this.sDelay[i]) && this.sDelay[i].stop(),
              s.isIntro ? 30 * t : 0);
          (this.sDelay[i] = new R.Delay((t) => {
            this.sT3d[i].targ = l;
          }, n)),
            this.sDelay[i].run(),
            a && t++;
        }
        e = this.sTarg[s.wIndex] + this.aYTarg * s.wIndex;
        this.isWork
          ? ((i = this.aYTarg * s.wIndex),
            (r = s.isIntro ? e : i),
            (this.aY.targ = i),
            (this.aY.curr = r),
            (this.aY.currR = r))
          : ((this.aY.targ = e), (this.aY.curr = e), (this.aY.currR = e));
      } else {
        if (this.isWork)
          for (let t = 0; t < this.qty; t++)
            (this.lT3d[t].curr = this.lTarg),
              (this.lT3d[t].currR = this.lTarg),
              (this.lT3d[t].targ = t === h ? 0 : this.lTarg);
        else this.lT3d[h].targ = this.lTarg;
        let e = 0;
        for (let i = 0; i < this.qty; i++) {
          const d = this.isWork && this.pos[i];
          let t = 0;
          d && ((t = 30 * e), e++),
            R.Is.def(this.sDelay[i]) && this.sDelay[i].stop(),
            (this.sDelay[i] = new R.Delay((t) => {
              this.sT3d[i].targ = d ? 0 : this.sTarg[i];
            }, t)),
            this.sDelay[i].run();
        }
        i = this.sTarg[s.wIndex] + this.aYTarg * s.wIndex;
        this.isWork
          ? (this.aY.targ = this.aYTarg * s.wIndex)
          : (this.aY.targ = i),
          (this.aY.curr = i),
          (this.aY.currR = i);
      }
      (this.aLerp = 0.08),
        this.render(),
        s.isIntro && R.O(this.a, this.work[s.index].info.opacity);
    }
    arrow(t, i) {
      var e = _A,
        s = this.mediaL - 1;
      let r = 0;
      for (let t = 0; t < this.mediaL; t++)
        if (this.media[t] === e.wIndex) {
          r = t;
          break;
        }
      (r += t), r < 0 ? ((r = 0), i && this.close()) : r > s && (r = s);
      t = this.media[r];
      this.up(t);
    }
    click(t) {
      t = R.Index.class(t.target, "w-s");
      this.up(t);
    }
    up(t) {
      var i;
      const e = _A;
      t !== e.wIndex &&
        ((i = t > e.wIndex ? -1 : 1),
        (this.lT3d[e.wIndex].targ = this.lTarg * i),
        (this.lT3d[t].currR = this.lTarg * i * -1),
        (this.lT3d[t].curr = this.lTarg * i * -1),
        (this.lT3d[t].targ = 0),
        (this.aLerp = 0.13),
        (this.aY.targ = this.aYTarg * t),
        (e.wIndex = t),
        this.imgLoad(t, "l"));
    }
    loop() {
      for (let t = 0; t < this.qty; t++)
        (this.lT3d[t].curr += 0.08 * (this.lT3d[t].targ - this.lT3d[t].curr)),
          (this.lT3d[t].currR = R.R(this.lT3d[t].curr));
      for (let t = 0; t < this.qty; t++)
        (this.sT3d[t].curr += 0.08 * (this.sT3d[t].targ - this.sT3d[t].curr)),
          (this.sT3d[t].currR = R.R(this.sT3d[t].curr));
      (this.aY.curr += (this.aY.targ - this.aY.curr) * this.aLerp),
        (this.aY.currR = R.R(this.aY.curr));
      let i = !1;
      for (let t = 0; t < this.qty; t++)
        if (this.lT3d[t].currR !== this.lT3d[t].targ) {
          i = !0;
          break;
        }
      let e = !1;
      if (!i)
        for (let t = 0; t < this.qty; t++)
          if (this.sT3d[t].currR !== this.sT3d[t].targ) {
            e = !0;
            break;
          }
      var t = this.aY.currR !== this.aY.targ;
      (i || e || t) && this.render();
    }
    render() {
      for (let t = 0; t < this.qty; t++)
        R.T(this.l[t], 0, this.lT3d[t].currR, "px");
      for (let t = 0; t < this.qty; t++)
        R.T(this.s[t], 0, this.sT3d[t].currR, "px");
      R.T(this.a, 0, this.aY.currR, "px");
    }
    color() {
      if (this.isWork) {
        var t = this.work[_A.index].color,
          i = t.work;
        for (let t = 0; t < this.qty; t++)
          this.lBg[t].style.backgroundColor = i;
        for (let t = 0; t < this.qty; t++) this.s[t].style.backgroundColor = i;
        this.a.style.borderColor = t.txt.rgb;
      }
    }
    key(t) {
      var i,
        e,
        s = t.key;
      "Tab" === s
        ? R.PD(t)
        : ((t = "ArrowDown" === s || "ArrowRight" === s || " " === s),
          (e = (i = "ArrowUp" === s) || "ArrowLeft" === s),
          "a" === s
            ? R.G.id("n1-0").click()
            : t || e
            ? this.arrow(t ? 1 : -1, i)
            : ("Escape" !== s && "p" !== s) || this.close());
    }
    close() {
      R.G.id("p").click();
    }
    morphFn(t) {
      t = "mouseenter" === t.type ? "arrow" : "cross";
      this.morph({
        d: 700,
        e: "o5",
        shape: t,
      });
    }
    morph(t) {
      var i = R.G.id("p-s-p");
      R.Is.def(this.morphA) && this.morphA.pause(),
        (this.morphA = new R.M({
          el: i,
          svg: {
            type: "polygon",
            end: {
              cross:
                "9.207,10.508 10.509,9.207 8.28,6.977 10.487,4.77 9.219,3.502 7.012,5.709 4.793,3.491 3.492,4.793 5.71,7.011 3.502,9.219 4.77,10.487 6.077,9.179 6.083,9.173 6.978,8.279 7.871,9.172 7.878,9.179",
              arrow:
                "9.277,7.759 10.539,6.497 8.298,4.256 8.298,4.256 7.001,2.958 7.001,2.958 7.001,2.958 5.703,4.256 5.703,4.256 3.462,6.498 4.724,7.76 6.077,6.407 6.077,11.042 7.001,11.042 7.921,11.042 7.921,6.403",
            }[t.shape],
          },
          d: t.d,
          e: t.e,
        })),
        this.morphA.play();
    }
    li(t) {
      R.L(".w-s", t, "click", this.click),
        R.L(document, t, "keydown", this.key),
        R.L("#p", t, "mouseenter", this.morphFn),
        R.L("#p", t, "mouseleave", this.morphFn);
    }
    on() {
      this.isWork && this.li("a");
    }
    off() {
      this.isWork && this.li("r");
    }
  }
  class T {
    constructor(t) {
      var i = t.index,
        e = t.delay;
      (this.start = t.start),
        (this.end = t.end),
        (this.prop = {}),
        (this.prog = {
          show: {
            start: i * e,
            end: 1 - (t.length - 1 - i) * e,
          },
          hide: {
            start: 0,
            end: 1,
          },
        }),
        (this.curr = this.start);
    }
    prepare(t) {
      var i = t.isShow,
        e = t.isRunning,
        t =
          (i
            ? ((this.prop.start = e ? this.curr : t.start), (this.prop.end = 0))
            : ((this.prop.start = this.curr),
              (this.prop.end = t.propEndIsEnd ? t.end : t.start)),
          i && !e ? this.prog.show : this.prog.hide);
      (this.prog.start = t.start), (this.prog.end = t.end);
    }
    loop(t) {
      var i = t.el,
        e = t.elL;
      const s = [0, 0];
      var r =
        (R.Clamp(t.prog, this.prog.start, this.prog.end) - this.prog.start) /
        t.lineProgEndFirst;
      (this.curr = R.Lerp(this.prop.start, this.prop.end, t.rEase(r))),
        t.isTx ? (s[0] = this.curr) : (s[1] = this.curr);
      for (let t = 0; t < e; t++) R.T(i[t], s[0], s[1]);
    }
  }
  class k {
    constructor(t) {
      this.a = _A;
      var i = t.delay,
        e = t.el,
        s = t.objChildren,
        r = t.prop,
        o = r[0],
        h = r[1],
        a = r[2],
        n = t.indexStart;
      (this.random = t.random),
        (this.isTx = "x" === o),
        (this.element = []),
        (this.elementL = []),
        (this.obj = []),
        (this.objL = e.length),
        (this.randUniq = []),
        (this.progEndMinShow = 1);
      for (let t = 0; t < this.objL; t++) {
        (this.element[t] = s ? e[t].children : [e[t]]),
          (this.elementL[t] = this.element[t].length),
          (this.obj[t] = new T({
            index: n + t,
            length: this.objL,
            delay: i,
            start: h,
            end: a,
          }));
        var l = this.obj[t].prog;
        0 === t &&
          (this.lineProgEndFirst = {
            show: l.show.end,
            hide: l.hide.end,
          }),
          l.show.end < this.progEndMinShow &&
            (this.progEndMinShow = l.show.end),
          (this.randUniq[t] = t);
      }
    }
    prepare(i) {
      !i.isRunning && this.random && (this.randUniq = R.Rand.uniq(this.objL));
      for (let t = 0; t < this.objL; t++) this.obj[t].prepare(i);
    }
    loop(t) {
      var i = t.prog,
        e = t.lineProgEndFirst,
        s = t.rEase;
      for (let t = 0; t < this.objL; t++)
        this.obj[t].loop({
          el: this.element[this.randUniq[t]],
          elL: this.elementL[t],
          prog: i,
          lineProgEndFirst: e,
          isTx: this.isTx,
          rEase: s,
        });
    }
  }
  class a {
    constructor(t) {
      this.a = _A;
      var i = t.delay,
        e = t.lineStartTogether || !1,
        s = t.objChildren,
        r = t.random || !1;
      let o = t.el;
      R.Is.und(o.length) && (o = [o]), (this.lineL = o.length);
      var h = t.prop;
      (this.start = h[1]),
        (this.end = h[2]),
        (this.progEndMin = {
          show: 1,
          hide: 1,
        }),
        (this.line = []);
      let a = 0;
      for (let t = 0; t < this.lineL; t++) {
        this.line[t] = new k({
          indexStart: a,
          objChildren: s,
          el: o[t].children,
          prop: h,
          delay: i,
          random: r,
        });
        var n = this.line[t].progEndMinShow;
        n < this.progEndMin.show && (this.progEndMin.show = n),
          e || (a += this.line[t].objL);
      }
    }
    motion(t) {
      R.Is.def(this.letterAnim) && this.letterAnim.pause();
      let i = this.start,
        e = this.end;
      t.reverse && ((i = this.end), (e = this.start));
      const s = t.action;
      var r = "show" === s,
        o = t.d;
      const d = R.Ease[t.e],
        h = this.line,
        a = this.lineL;
      var n = h[0].obj[0].curr;
      let l = !1,
        p =
          (r ||
            (l =
              (i < 0 && 0 < n) ||
              (0 < i && n < 0) ||
              Math.abs(n) < Math.abs(0.3 * i)),
          0);
      Math.abs(n) === Math.abs(i) && (p = t.delay);
      for (let t = 0; t < a; t++)
        h[t].prepare({
          isShow: r,
          isRunning: this.isRunning,
          propEndIsEnd: l,
          start: i,
          end: e,
        });
      n = o + o * (1 - this.progEndMin[s]);
      return (
        (this.letterAnim = new R.M({
          delay: p,
          d: n,
          update: (t) => {
            var i = t.prog;
            for (let t = 0; t < a; t++)
              h[t].loop({
                prog: i,
                lineProgEndFirst: h[t].lineProgEndFirst[s],
                rEase: d,
              });
          },
          cb: (t) => {
            this.isRunning = !1;
          },
        })),
        {
          play: (t) => {
            (this.isRunning = !0), this.letterAnim.play();
          },
        }
      );
    }
  }
  class _ {
    intro() {
      var t = _A.config.data,
        i = ((this.work = t.work), t.workL);
      (this.v = R.G.id("v")),
        (this.e = R.G.class("e")),
        (this.p = R.G.id("p")),
        (this.pT = this.p.children[2].children[0]),
        (this.pPoly = R.G.id("p-s-p")),
        (this.t = []),
        (this.iL = []),
        (this.iR = []),
        (this.eA = []),
        (this.eL = []),
        (this.eS = []),
        (this.vVisible = !1),
        (this.pS = new a({
          objChildren: !1,
          el: this.p.children[0],
          prop: ["y", 110, 110],
          delay: 0,
        })),
        (this.pL = new a({
          objChildren: !1,
          el: this.p.children[1],
          prop: ["y", 110, -110],
          delay: 0,
        })),
        (this.pA = new a({
          objChildren: !1,
          el: this.p.children[2],
          prop: ["y", 101, 101],
          delay: 0,
        })),
        (this.vT = new a({
          objChildren: !1,
          el: this.v.children[0],
          prop: ["y", 101, 101],
          delay: 0,
        })),
        (this.vB = new a({
          objChildren: !1,
          el: this.v.children[1],
          prop: ["y", 101, 101],
          delay: 0,
        }));
      for (let t = 0; t < i; t++) {
        var e = this.work[t].title;
        (this.t[t] = new a({
          objChildren: !0,
          el: R.G.class("t" + t),
          prop: ["x", -101, 101],
          delay: e.delay,
          lineStartTogether: e.lineStartTogether,
        })),
          (this.iL[t] = new a({
            objChildren: !0,
            el: R.G.class("i-l")[t],
            prop: ["y", 101, -101],
            delay: 0.04,
          })),
          (this.iR[t] = new a({
            objChildren: !0,
            el: R.G.class("i-r")[t],
            prop: ["y", 101, -101],
            delay: 0.04,
          })),
          (this.eA[t] = new a({
            objChildren: !1,
            el: this.e[t].children[0],
            prop: ["y", 101, -101],
            delay: 0,
          })),
          (this.eL[t] = new a({
            objChildren: !1,
            el: R.G.class("e-l")[t],
            prop: ["y", -110, 110],
            delay: 0,
          })),
          (this.eS[t] = new a({
            objChildren: !1,
            el: R.G.class("e-s")[t],
            prop: ["y", 110, -110],
            delay: 0,
          }));
      }
    }
    project(t) {
      var i = this.value(t.a),
        e = this.work[_A.index],
        s = i.isShow && e.visit,
        r = 1600 === t.d ? 1400 : t.d,
        o = 1600 === t.d ? 1200 : t.d;
      const d = this.pA.motion({
          action: t.a,
          d: r,
          e: i.e,
          delay: t.delay,
        }),
        p = this.pL.motion({
          action: t.a,
          d: o,
          e: i.e,
          delay: t.delay + 200,
        }),
        c = this.pS.motion({
          action: t.a,
          d: r,
          e: i.e,
          delay: t.delay + 200,
        });
      let h, a;
      if (
        ((s || this.vVisible) &&
          ((h = this.vB.motion({
            action: t.a,
            d: t.d,
            e: i.e,
            delay: t.delay + 100,
          })),
          (a = this.vT.motion({
            action: t.a,
            d: t.d,
            e: i.e,
            delay: t.delay + 200,
          }))),
        i.isShow)
      ) {
        var n = e.color.txt.rgb;
        const l = this.pT.children[0];
        for (let t = 0; t < 2; t++) l.children[t].style.background = n;
        if (
          ((this.pT.style.color = n),
          (this.pPoly.style.fill = n),
          (this.p.children[1].children[0].style.borderRightColor = n),
          s)
        ) {
          this.v.href = e.visit;
          for (let t = 0; t < 2; t++)
            this.v.children[t].children[0].style.color = n;
          this.v.children[1].children[0].children[0].style.background = n;
        }
      }
      R.PE[i.pe](this.p),
        (s || this.vVisible) && (R.PE[i.pe](this.v), a.play(), h.play()),
        s ? (this.vVisible = !0) : this.vVisible && (this.vVisible = !1),
        d.play(),
        p.play(),
        c.play();
    }
    explore(t) {
      var i = this.value(t.a),
        e = this.gIndex(t.index),
        s = 1600 === t.d ? 1400 : t.d,
        r = 1600 === t.d ? 1200 : t.d;
      const o = this.eA[e].motion({
          action: t.a,
          d: s,
          e: i.e,
          delay: t.delay,
        }),
        h = this.eL[e].motion({
          action: t.a,
          d: r,
          e: i.e,
          delay: t.delay + 200,
        }),
        a = this.eS[e].motion({
          action: t.a,
          d: s,
          e: i.e,
          delay: t.delay + 200,
        });
      R.PE[i.pe](this.e[e]), o.play(), h.play(), a.play();
    }
    info(t) {
      var i = this.value(t.a),
        e = this.gIndex(t.index);
      const s = this.iL[e].motion({
          action: t.a,
          d: t.d,
          e: i.e,
          delay: t.delay,
        }),
        r = this.iR[e].motion({
          action: t.a,
          d: t.d,
          e: i.e,
          delay: t.delay,
        });
      s.play(), r.play();
    }
    title(t) {
      var i = this.value(t.a),
        e = this.gIndex(t.index);
      const s = this.t[e].motion({
        action: t.a,
        d: t.d,
        e: i.e,
        delay: t.delay,
        reverse: t.r,
      });
      s.play();
    }
    gIndex(t) {
      return R.Is.def(t) ? t : _A.index;
    }
    value(t) {
      t = "show" === t;
      return {
        isShow: t,
        e: t ? "o6" : "o3",
        pe: t ? "all" : "none",
        cn: t ? "add" : "remove",
      };
    }
  }
  class L {
    intro() {
      var t = _A.config.data;
      (this.work = t.work),
        (this.workL = t.workL),
        (this.x = []),
        (this.xCurr = []);
    }
    resize() {
      var t = _A;
      if (t.resizeRq) {
        var c = t.index,
          i = R.G.class("t")[0],
          r = i.offsetWidth,
          o = parseFloat(
            getComputedStyle(i.children[0].children[0]).getPropertyValue(
              "padding-right"
            )
          ),
          g = t.is.home || (t.is.about && "w" !== t.modePrev) ? "home" : "work";
        for (let s = 0; s < this.workL; s++) {
          var e = R.G.class("t" + s),
            h = this.work[s].title,
            a =
              ((this.x[s] = {
                home: [],
                work: [],
              }),
              e),
            u = a.length;
          for (let e = 0; e < u; e++) {
            var n = a[e].children,
              w = n.length;
            (this.x[s].home[e] = []), (this.x[s].work[e] = []);
            let i = 0;
            const d = [];
            for (let t = 0; t < w; t++) {
              d[t] =
                n[t].offsetWidth - 2 * o * (1 - h.x.workLetterSpacing[e][t]);
              const p = {
                home: (h.x.home[e][t] * r) / 100,
              };
              0 < t ? ((i += d[t - 1]), (p.work = i)) : (p.work = 0),
                0 < t &&
                  ((l = this.x[s].home[e][t - 1] + d[t - 1]),
                  p.home < l && (p.home = l)),
                t === w - 1 &&
                  ((l = r - (n[t].offsetWidth - 1.8 * o)),
                  p.home > l && (p.home = l));
              var l,
                m = s === c ? g : "home";
              R.T(n[t], p[m], 0, "px"),
                (this.x[s].home[e][t] = p.home),
                (this.x[s].work[e][t] = p.work);
            }
          }
        }
      }
    }
    move(t) {
      var r = t.start;
      const w = t.end;
      var o = "home" === t.end,
        t = t.d;
      const n = _A.index,
        l = R.G.class("t" + n),
        d = l.length,
        p = this.x[n];
      R.Is.def(this.letterAnim) && this.letterAnim.pause();
      const c = [];
      var e = R.Is.und(this.xCurr[n]);
      e && (this.xCurr[n] = []);
      const g = [],
        u = [];
      for (let i = 0; i < d; i++) {
        var s,
          h = l[i].children.length;
        (c[i] = []), e && (this.xCurr[n][i] = []), (g[i] = []), (u[i] = []);
        for (let t = 0; t < h; t++)
          e
            ? ((s = p[r][i][t]), (this.xCurr[n][i][t] = s), (c[i][t] = s))
            : (c[i][t] = this.xCurr[n][i][t]),
            o
              ? ((g[i][t] = 0.01 * t), (u[i][t] = 1 - 0.01 * (h - 1 - t)))
              : ((g[i][t] = 0), (u[i][t] = 1));
      }
      t += t * (1 - u[0][0]);
      (this.letterAnim = new R.M({
        d: t,
        update: (t) => {
          var e = t.prog;
          for (let i = 0; i < d; i++) {
            var s = l[i].children,
              r = s.length;
            for (let t = 0; t < r; t++) {
              var o = c[i][t],
                h = p[w][i][t],
                a = (R.Clamp(e, g[i][t], u[i][t]) - g[i][t]) / u[i][0],
                o = R.Lerp(o, h, R.Ease.o6(a));
              (this.xCurr[n][i][t] = o), R.T(s[t], o, 0, "px");
            }
          }
        },
      })),
        this.letterAnim.play();
    }
  }
  class C {
    constructor() {
      (this.dpr = 2), (_A.pOver = -1), (this.first = !0);
    }
    intro() {
      (this.c = R.G.id("c2d")),
        (this.pgn = R.G.class("pgn")),
        (this.pgnA = R.G.class("pgn-a")),
        (this.pgnB = R.G.class("pgn-b")),
        (this.ctx = this.c.getContext("2d", {
          antialias: !1,
          depth: !1,
        })),
        (this.cW = 0),
        (this.cH = 0);
      var t = _A.config.data;
      (this.work = t.work),
        (this.workL = t.workL),
        (this.ease = R.Ease.io2),
        (this.color = {
          curr: [],
          targ: [],
        }),
        (this.pW = {
          curr: [],
          targ: [],
        }),
        (this.pLeft = {
          curr: [],
          targ: [],
        }),
        (this.pO = {
          curr: [],
          targ: [],
        }),
        (this.dom = {
          y: {
            curr: 0,
            targ: 0,
          },
          o: {
            curr: 0,
            targ: 0,
          },
        }),
        (this.pH = {}),
        (this.pTop = {}),
        (this.pOTarg = []),
        (this.needDraw = !1);
    }
    init() {
      var t = _A;
      (this.isAbout = t.is.about), (this.isWork = t.is.work);
    }
    resize() {
      var e = _A;
      if (((this.first = !0), e.resizeRq)) {
        var i = this.dpr,
          t = e.win.w,
          d = e.win.h;
        this.pTopPx = 49;
        (this.p = {
          h: 14 * i,
          gapX: 8 * i,
        }),
          (this.p.top = this.pTopPx * i),
          (this.p.letterSpace = 4 * this.p.gapX),
          (this.p.w = {
            out: 1,
            in: (16 / 9) * 14 * i,
          }),
          (this.p.left = {
            out: t - 0.5 * this.workL * this.p.gapX,
          }),
          (this.p.left.in =
            this.p.left.out - 0.5 * this.p.w.in - 0.5 * this.p.gapX + 2),
          (this.cW = t * i),
          (this.cH = d * i),
          (this.c.width = this.cW),
          (this.c.height = this.cH),
          (this.ctx.lineWidth = 2),
          (this.cursor = {
            top: this.pTopPx - 5,
            bottom: this.pTopPx + 14 + 5,
            gapX: 4 * i,
          });
        const o = [],
          h = [];
        for (let t = 0; t < this.workL; t++)
          (o[t] = (this.p.left.in + t * (this.p.gapX + this.p.w.out)) / i),
            (h[t] = o[t] + (this.p.w.in - 2) / i);
        const u = this.pTopPx,
          w = 14,
          a = 0.4,
          m = o,
          v = h;
        for (let t = 0; t < this.workL; t++) {
          const n = this.pgn[t].style,
            l =
              ((n.top = u + "px"),
              (n.height = w + "px"),
              (n.fontSize = "12px"),
              (n.lineHeight = "14px"),
              this.pgnA[t]),
            f = this.pgnB[t];
          (l.style.left = m[t] - l.offsetWidth * (1 + a) + "px"),
            (f.style.left = v[t] + f.offsetWidth * a + "px");
        }
        var p = this.colorFn();
        for (let t = 0; t < 3; t++)
          (this.color.targ[t] = p[t]), (this.color.curr[t] = p[t]);
        t = this.propTopH();
        (this.pH.curr = t.h),
          (this.pTop.curr = t.top),
          (this.pH.targ = t.h),
          (this.pTop.targ = t.top);
        for (let t = 0; t < this.workL; t++) {
          var s = this.propLeftW(t),
            c = this.propO(t);
          (this.pW.targ[t] = s.w),
            (this.pLeft.targ[t] = s.left),
            (this.pO.targ[t] = e.isIntro ? 0 : c),
            (this.pW.curr[t] = s.w),
            (this.pLeft.curr[t] = s.left),
            (this.pO.curr[t] = e.isIntro ? 0 : c);
        }
      }
      R.Is.def(this.delay) && this.delay.stop(),
        e.isIntro &&
          ((this.delay = new R.Delay((t) => {
            for (let t = 0; t < this.workL; t++) {
              var i = this.propO(t);
              this.pO.targ[t] = i;
            }
          }, 400)),
          this.delay.run());
      var g = ["y", "o"];
      for (let i = 0; i < 2; i++) {
        var r = g[i];
        let t;
        (t =
          "y" === r
            ? this.isWork || (this.isAbout && _A.was.work)
              ? this.pTopPx
              : 0
            : this.isAbout
            ? 0
            : 1),
          e.resizeRq && (this.dom[r].curr = t),
          (this.dom[r].targ = t);
      }
    }
    up() {
      for (let t = 0; t < this.workL; t++) {
        var i = this.propLeftW(t),
          e = this.propO(t);
        (this.pW.targ[t] = i.w),
          (this.pLeft.targ[t] = i.left),
          (this.pO.targ[t] = e);
      }
      var s = this.colorFn();
      for (let t = 0; t < 3; t++) this.color.targ[t] = s[t];
    }
    loop() {
      const i = _A;
      i.pOver = -1;
      var t = i.index,
        e = i.indexPrev;
      const r = this.ctx;
      var d = R.R(i.x * this.workL),
        p = 30 * i.latency.x,
        s = i.cursor,
        c = s.y > this.cursor.top && s.y < this.cursor.bottom,
        o = s.x * this.dpr,
        g = ["y", "o"];
      for (let t = 0; t < 2; t++) {
        var h = g[t],
          a = "y" === h;
        if (
          ((this.dom[h].curr +=
            (this.dom[h].targ - this.dom[h].curr) * (a ? 0.1 : 0.2)),
          R.R(this.dom[h].curr, 4) !== R.R(this.dom[h].targ, 4))
        ) {
          var n = a ? R.R(-this.dom.y.curr) : R.R(this.dom.o.curr, 4);
          for (let t = 0; t < this.workL; t++)
            a
              ? (R.T(this.pgnA[t], 0, n, "px"), R.T(this.pgnB[t], 0, n, "px"))
              : (R.O(this.pgnA[t].children[0], n),
                R.O(this.pgnB[t].children[0], n));
        }
      }
      (s =
        R.R(this.pO.curr[t]) !== R.R(this.pO.targ[t]) ||
        0 !== R.R(this.pO.curr[t])),
        (t =
          R.R(this.pO.curr[e]) !== R.R(this.pO.targ[e]) ||
          0 !== R.R(this.pO.curr[e]));
      if (s || t) {
        for (let t = 0; t < 3; t++)
          this.color.curr[t] += 0.1 * (this.color.targ[t] - this.color.curr[t]);
        var u =
          "rgba(" +
          this.color.curr[0] +
          "," +
          this.color.curr[1] +
          "," +
          this.color.curr[2] +
          ",";
        for (let t = 0; t < this.workL; t++) {
          (this.pW.curr[t] += 0.1 * (this.pW.targ[t] - this.pW.curr[t])),
            (this.pLeft.curr[t] +=
              0.1 * (this.pLeft.targ[t] - this.pLeft.curr[t]));
          var w,
            m = R.R(this.pW.curr[t]),
            l = R.R(this.pLeft.curr[t]);
          (this.pOTarg[t] = 0),
            c &&
              ((w = l - this.cursor.gapX),
              (l = l + m + this.cursor.gapX),
              w < o &&
                o < l &&
                ((this.pOTarg[t] = "in" === i.mode ? 1 : 0.6), (i.pOver = t)));
        }
        if (i.needGL || this.first || this.needDraw) {
          (this.pH.curr += 0.1 * (this.pH.targ - this.pH.curr)),
            (this.pTop.curr += 0.1 * (this.pTop.targ - this.pTop.curr));
          var v = this.pTop.curr + (this.p.h - this.pH.curr);
          r.clearRect(0, 0, this.cW, this.cH);
          for (let s = 0; s < this.workL; s++) {
            var f = R.R(this.pLeft.curr[s]),
              x = R.R(this.pW.curr[s]);
            let t = 0.06,
              i =
                ((x > this.p.w.out || this.isAbout || this.isWork) &&
                  (t = 0.25),
                (this.pO.curr[s] += (this.pO.targ[s] - this.pO.curr[s]) * t),
                0),
              e = 0;
            var y = Math.abs(s - d);
            y < 6 && ((i = this.ease(1 - y / 6) * p), (e = 0.5 * i)),
              (r.strokeStyle =
                u + Math.min(R.R(this.pO.curr[s]) + this.pOTarg[s], 1) + ")"),
              r.beginPath(),
              r.rect(f, R.R(v - e), x, R.R(this.pH.curr + i)),
              r.closePath(),
              r.stroke();
          }
          this.needDraw = !1;
        }
        -1 !== i.pOver && (this.needDraw = !0), (this.first = !1);
      }
    }
    pageChange() {
      for (let t = 0; t < this.workL; t++) this.pO.targ[t] = this.propO(t);
      var t = this.propTopH();
      (this.pH.targ = t.h), (this.pTop.targ = t.top);
    }
    colorFn() {
      var t = _A,
        i = t.index;
      const e = [];
      i = this.pgnIsOpen() ? this.work[i].color.txt[255] : t.color.txt.rgb255;
      return (e[0] = i[0]), (e[1] = i[1]), (e[2] = i[2]), e;
    }
    propTopH() {
      var t = !_A.is.home && "a" !== _A.mode,
        i = this.p;
      let e = i.h;
      return (
        t && (e *= 0.5),
        {
          top: t ? 0 : i.top,
          h: e,
        }
      );
    }
    propO(t) {
      var i = _A,
        t = i.index === t,
        i = !i.is.home,
        e = this.pgnIsOpen();
      let s;
      return (s = i ? 0 : e && t ? 1 : 0.2), s;
    }
    propLeftW(t) {
      var i = _A.index,
        e = i === t,
        s = this.pgnIsOpen(),
        r = this.p;
      let o = (s ? r.left.in : r.left.out) + t * (r.gapX + r.w.out);
      s &&
        (t < i ? (o -= r.letterSpace) : i < t && (o += r.w.in + r.letterSpace));
      i = s && e ? r.w.in : r.w.out;
      return {
        left: o,
        w: i,
      };
    }
    pgnIsOpen() {
      var t = _A,
        i = t.mode,
        t = t.modePrev;
      return (
        "in" === i || "w" === i || ("a" === i && ("in" === t || "w" === t))
      );
    }
  }
  class I {
    intro() {
      this.workL = _A.config.data.workL;
      var i = R.G.class("pgn");
      (this._a = []), (this._b = []);
      for (let t = 0; t < this.workL; t++)
        (this._a[t] = new a({
          objChildren: !1,
          el: R.G.class("pgn-a", i[t]),
          prop: ["x", -101, 101],
          delay: 0,
          random: !0,
        })),
          (this._b[t] = new a({
            objChildren: !1,
            el: R.G.class("pgn-b", i[t]),
            prop: ["x", -101, 101],
            delay: 0,
            random: !0,
          }));
    }
    show(t) {
      var i = _A.index,
        e = t.r,
        s = t.d;
      let r = e,
        o = e;
      t.out && ((r = !0), (o = !1));
      const h = this._a[i].motion({
          action: "show",
          d: s,
          e: "o6",
          delay: 100,
          reverse: r,
        }),
        a = this._b[i].motion({
          action: "show",
          d: s,
          e: "o6",
          delay: 100,
          reverse: o,
        });
      h.play(), a.play();
    }
    hideCurr(t) {
      this.hide({
        index: _A.index,
        reverse: t.r,
        out: t.out,
      });
    }
    hide(t) {
      var i = t.index,
        e = t.r;
      let s = e,
        r = e;
      t.out && ((s = !1), (r = !0));
      const o = this._a[i].motion({
          action: "hide",
          d: 200,
          e: "o3",
          delay: 0,
          reverse: s,
        }),
        h = this._b[i].motion({
          action: "hide",
          d: 200,
          e: "o3",
          delay: 0,
          reverse: r,
        });
      o.play(), h.play();
    }
  }
  class P {
    resize() {
      var t = _A,
        i = t.config.data,
        i = ((this.work = i.work), (this.workL = i.workL), t.win),
        i = ((this.winW = i.w), (this.winH = i.h), t.winWpsdW);
      (this.mode = {
        out: {
          gapX: 20 * t.ratio,
          w: 100 * t.ratio,
          h: 370 * t.ratio,
        },
        in: {
          w: 1054 * t.ratio,
          h: 602 * t.ratio,
          gapX: 152 * i,
        },
      }),
        (this.mode.out.x = 0.5 * (this.winW - this.mode.out.w)),
        (this.mode.out.y = 0.5 * (this.winH - this.mode.out.h)),
        (this.mode.in.x = 0.5 * (this.winW - this.mode.in.w)),
        (this.mode.in.y = 0.5 * (this.winH - this.mode.in.h));
    }
    inGap() {
      return this.mode.in.gapX;
    }
    outGapXW() {
      return this.mode.out.w + this.mode.out.gapX;
    }
    modeOut() {
      var i,
        e = _A,
        s = e.isIntro,
        r = this.mode.out,
        o = "a" === e.mode,
        h = o ? 0 : 1;
      const a = [];
      for (let t = 0; t < this.workL; t++) {
        const n = (a[t] = {});
        (n.y = r.y),
          (n.h = r.h),
          (n.w = r.w),
          !s && o
            ? ((i = t - e.index),
              (n.x = r.x + (r.gapX + r.w) * t + (r.gapX + r.w) * i * 0.2))
            : (n.x = r.x + (r.gapX + r.w) * t),
          (n.light = 0),
          (n.multiply = 0),
          (n.o = h),
          (n.pY = 0),
          (n.scale = 0);
      }
      return a;
    }
    modeOutIntro() {
      var i = this.mode.out;
      const e = this.modeOut();
      for (let t = 0; t < this.workL; t++)
        e[t].x = this.winW + (i.gapX + i.w) * t * 3;
      return e;
    }
    modeIn() {
      var t = _A,
        i = this.mode.in,
        e = this.mode.out,
        s = t.index,
        r = this.work[s].multiply,
        o = "a" === t.mode,
        d = o ? 0 : 1;
      const h = [];
      for (let t = 0; t < this.workL; t++) {
        var a = t - s;
        const l = (h[t] = {});
        if (0 == a) (l.w = i.w), (l.x = i.x);
        else {
          var n = 0.5 * i.w;
          let t = 0.5 * (this.winW - (i.w + 2 * i.gapX));
          t < n && (t = n),
            0 < a
              ? 1 == a
                ? ((l.w = t),
                  (l.x = o
                    ? i.x + (i.gapX + i.w) + i.gapX
                    : i.x + (i.gapX + i.w)))
                : ((l.w = e.w),
                  (l.x =
                    i.x +
                    (i.gapX + i.w) +
                    (i.gapX + t) +
                    (i.gapX + e.w) * (a - 2) +
                    i.gapX * (a - 1) * (a - 1) * 0.1))
              : a < 0 &&
                (-1 == a
                  ? ((l.w = t),
                    (l.x = o
                      ? i.x - (i.gapX + t) - i.gapX
                      : i.x - (i.gapX + t)))
                  : ((l.w = e.w),
                    (l.x =
                      i.x -
                      (i.gapX + t) +
                      (i.gapX + e.w) * (1 + a) +
                      i.gapX * (1 + a) * -(1 + a) * 0.1)));
        }
        (l.y = i.y),
          (l.h = i.h),
          (l.light = t === s ? 1 : 0),
          (l.multiply = t === s ? 0 : r),
          (l.o = d),
          (l.pY = 0),
          (l.scale = o ? 0.15 : 0);
      }
      return h;
    }
    modeW() {
      var t = _A,
        i = this.mode.out,
        e = this.mode.in,
        s = t.index,
        r = this.work[s].multiply,
        d = "a" === t.mode ? 0 : 1;
      const o = [];
      for (let t = 0; t < this.workL; t++) {
        var h = t - s;
        const l = (o[t] = {});
        var a = 0 == h;
        if (a)
          (l.x = e.x),
            (l.w = e.w),
            (l.y = 0.8 * -(e.h + e.gapX)),
            (l.h = 0.8 * e.h);
        else {
          var n = 0.5 * e.w;
          let t = 0.5 * (this.winW - (e.w + 2 * e.gapX));
          t < n && (t = n),
            0 < h
              ? 1 == h
                ? ((l.w = t), (l.x = this.winW + e.gapX))
                : ((l.w = i.w),
                  (l.x =
                    e.x +
                    (e.gapX + e.w) +
                    (e.gapX + t) +
                    (e.gapX + i.w) * (h - 2) +
                    e.gapX * (h - 1) * (h - 1) * 0.1))
              : h < 0 &&
                (-1 == h
                  ? ((l.w = t), (l.x = -(t + e.gapX)))
                  : ((l.w = i.w),
                    (l.x =
                      e.x -
                      (e.gapX + t) +
                      (e.gapX + i.w) * (1 + h) +
                      e.gapX * (1 + h) * -(1 + h) * 0.1))),
            (l.y = e.y),
            (l.h = e.h);
        }
        (l.light = a ? 1 : 0),
          (l.multiply = a ? 0 : r),
          (l.o = d),
          (l.pY = a ? -0.1 : 0),
          (l.scale = 0);
      }
      return o;
    }
    hToW() {
      var t = _A,
        i = "in" === t.mode ? 0 : t.index * this.outGapXW();
      const e = t.h.pCurr;
      for (let t = 0; t < this.workL; t++) e[t].x -= i;
      return e;
    }
    wToH() {
      var t = _A,
        i = "in" === t.mode ? 0 : t.index * this.outGapXW();
      const e = t.w.pCurr;
      for (let t = 0; t < this.workL; t++) e[t].x -= i;
      return e;
    }
  }
  class O {
    constructor() {
      var t = _A.config.data;
      (this.work = t.work), (this.workL = t.workL), this.run();
    }
    run() {
      const i = _A;
      var t = i.is;
      if ((t.home || t.about) && R.Is.und(i.index)) i.index = 0;
      else
        for (let t = 0; t < this.workL; t++)
          if (this.work[t].url === i.route.new.url) {
            i.index = t;
            break;
          }
    }
  }
  class E {
    constructor() {
      (this.workL = _A.config.data.workL), (this.li = R.G.id("li"));
    }
    reset() {
      for (let t = 0; t < this.workL; t++)
        this.li.children[t].style.display = "block";
    }
    run(t) {
      var i = R.Is.def(t.indexPrev) ? t.indexPrev : -1,
        t = t.index;
      const e = t + 2,
        s = t - 2;
      for (let t = 0; t < this.workL; t++) {
        var r = ((r = t) > s && r < e) || i === t ? "block" : "none";
        this.li.children[t].style.display = r;
      }
    }
  }
  class W {
    intro() {
      this.work = _A.config.data.work;
      var t = _A.color.txt.rgb255;
      (this.rgbBase = "rgb(" + t[0] + "," + t[1] + "," + t[2] + ")"),
        (this.n0 = R.G.id("n0")),
        (this.n0L = this.n0.children.length),
        (this.n1 = R.G.class("n1")),
        (this.n1_0 = R.G.id("n1-0")),
        (this.n1_0C = this.n1_0.children[0]),
        (this.n1_1 = R.G.id("n1-1")),
        (this.n2W = R.G.id("n2")),
        (this.n2 = R.G.class("n2")),
        (this.n3 = R.G.class("n3")),
        (this.n0A = new a({
          objChildren: !0,
          el: this.n0,
          prop: ["x", -110, 110],
          delay: 0.02,
        })),
        (this.n10A = new a({
          objChildren: !1,
          el: this.n1[0],
          prop: ["y", 110, -110],
          delay: 0,
        })),
        (this.n11A = new a({
          objChildren: !1,
          el: this.n1[1],
          prop: ["y", 110, -110],
          delay: 0,
        })),
        (this.n2A = new a({
          objChildren: !1,
          el: this.n2W.children,
          prop: ["y", 110, -110],
          delay: 0,
        })),
        (this.n3A = new a({
          objChildren: !1,
          el: R.G.id("n3").children,
          prop: ["y", 110, -110],
          delay: 0.02,
        }));
    }
    init() {
      const t = _A;
      var i = t.is,
        d = t.was,
        e = t.isIntro;
      if (e) {
        t.load
          .motion({
            action: "hide",
            d: 500,
            e: "o3",
            delay: 0,
            reverse: !1,
          })
          .play(),
          R.PE.all(this.n2W);
        var p = i.about ? 700 : 200;
        const s = this.n2A.motion({
          action: "show",
          d: 1600,
          e: "o6",
          delay: p,
          reverse: !1,
        });
        s.play();
      }
      if (i.about) {
        R.PE.none(this.n0), R.PE.none(this.n1_0), R.PE.all(this.n1_1);
        const r = this.n11A.motion({
          action: "show",
          d: 1600,
          e: "o6",
          delay: 500,
          reverse: !1,
        });
        if (!e) {
          const a = this.n10A.motion({
            action: "hide",
            d: 500,
            e: "o3",
            delay: 0,
            reverse: !1,
          });
          a.play();
        }
        const o = this.n0A.motion({
            action: "hide",
            d: 500,
            e: "o3",
            delay: 0,
            reverse: !1,
          }),
          h = this.n3A.motion({
            action: "hide",
            d: 500,
            e: "o3",
            delay: 0,
            reverse: !1,
          });
        o.play(), h.play(), r.play();
      } else {
        if (
          (R.PE.none(this.n1_1), R.PE.all(this.n0), R.PE.all(this.n1_0), !e)
        ) {
          const n = this.n11A.motion({
            action: "hide",
            d: 500,
            e: "o3",
            delay: 0,
            reverse: !1,
          });
          n.play();
        }
        if (d.about || e) {
          const l = this.n0A.motion({
            action: "show",
            d: 1600,
            e: "o6",
            delay: e ? 200 : 0,
            reverse: !1,
          });
          let t;
          t = e || i.home ? 200 : 500;
          const c = this.n10A.motion({
              action: "show",
              d: 1600,
              e: "o6",
              delay: t,
              reverse: !1,
            }),
            g = this.n3A.motion({
              action: "show",
              d: 1600,
              e: "o6",
              delay: e ? 200 : 0,
              reverse: !1,
            });
          l.play(), c.play(), g.play();
        }
      }
    }
    colorFix(t) {
      var i = this.gColor(t.default);
      for (let t = 0; t < 2; t++) this.sC(this.n2[t], i);
    }
    color(t) {
      var i = this.gColor(t.default);
      for (let t = 0; t < this.n0L; t++)
        this.sC(this.n0.children[t].children[0], i);
      this.sC(this.n1_0, i);
      for (let t = 0; t < 2; t++)
        (this.n1_0C.children[0].style.backgroundColor = i),
          (this.n1_0C.children[1].style.backgroundColor = i);
      for (let t = 0; t < 2; t++) this.sC(this.n2[t], i);
      for (let t = 0; t < 3; t++) this.sC(this.n3[t], i);
    }
    gColor(t) {
      return t ? this.rgbBase : this.work[_A.index].color.txt.rgb;
    }
    sC(t, i) {
      t.style.color = i;
    }
  }
  class X {
    intro() {
      (this.nif = new a({
        objChildren: !0,
        el: R.G.class("a-nif"),
        prop: ["x", -101, 101],
        delay: 0.02,
        lineStartTogether: !0,
        random: !0,
      })),
        (this.social = new a({
          objChildren: !0,
          el: R.G.id("a-social"),
          prop: ["y", 110, -110],
          delay: 0.02,
        })),
        (this.p = new a({
          objChildren: !1,
          el: R.G.id("a-p").children,
          prop: ["y", 110, -110],
          delay: 0.04,
        })),
        (this.li = new a({
          objChildren: !0,
          el: R.G.class("a-li"),
          prop: ["y", 110, -110],
          delay: 0.02,
          lineStartTogether: !0,
        })),
        (this.designA = new a({
          objChildren: !1,
          el: R.G.id("a-design"),
          prop: ["y", 110, -110],
          delay: 0,
        })),
        (this.rightsA = new a({
          objChildren: !1,
          el: R.G.id("a-rights").children,
          prop: ["y", 110, -110],
          delay: 0,
        }));
    }
    play(t) {
      var i = "show" === t.a ? "o6" : "o3",
        e = 0 < t.delay ? 1 : 0;
      const s = this.nif.motion({
          action: t.a,
          d: t.d,
          e: i,
          delay: t.delay,
          reverse: !1,
        }),
        r = this.p.motion({
          action: t.a,
          d: t.d,
          e: i,
          delay: t.delay + 200 * e,
          reverse: !1,
        }),
        o = this.li.motion({
          action: t.a,
          d: t.d,
          e: i,
          delay: t.delay + 300 * e,
          reverse: !1,
        }),
        h = this.social.motion({
          action: t.a,
          d: t.d,
          e: i,
          delay: t.delay + 400 * e,
          reverse: !1,
        }),
        a = this.designA.motion({
          action: t.a,
          d: t.d,
          e: i,
          delay: t.delay + 600 * e,
          reverse: !1,
        }),
        n = this.rightsA.motion({
          action: t.a,
          d: t.d,
          e: i,
          delay: t.delay + 600 * e,
          reverse: !1,
        });
      s.play(), h.play(), r.play(), o.play(), a.play(), n.play();
    }
  }
  class S {
    constructor() {
      R.BM(this, ["key"]);
    }
    init() {
      this.isAbout = _A.is.about;
    }
    key(t) {
      var i = t.key;
      "Tab" === i
        ? R.PD(t)
        : ("Escape" !== i && "c" !== i) || R.G.id("n1-1").click();
    }
    l(t) {
      R.L(document, t, "keydown", this.key);
    }
    on() {
      this.isAbout && this.l("a");
    }
    off() {
      this.isAbout && this.l("r");
    }
  }
  new (class {
    constructor(t) {
      new i(), new e(t);
    }
  })({
    device: "d",
    engine: class {
      constructor() {
        const t = _A;
        (t.isIntro = !0),
          (t.needGL = !0),
          (t.prop = [
            "x",
            "y",
            "w",
            "h",
            "light",
            "multiply",
            "o",
            "pY",
            "scale",
          ]),
          (t.propL = t.prop.length),
          (t.mode = "out"),
          (t.modePrev = t.mode),
          (t.lerp = {
            tr: {
              out: 0.07,
              in: 0.07,
              w: 0.07,
              a: 0.07,
            },
            scroll: {
              out: 0.08,
              in: 0.07,
              w: 0.07,
              a: 0.08,
            },
            latency: {
              out: 0.08,
              in: 0.3,
              w: 0.07,
              a: 0.08,
            },
          }),
          (t.cursor = {
            x: 0,
            y: 0,
          }),
          (t.latency = {
            x: 0,
            rotate: 0,
          }),
          R.BM(this, ["resize", "loop"]),
          (this.ro = new R.ROR(this.resize)),
          (this.raf = new R.RafR(this.loop)),
          (this.win = new o()),
          (t.pgnX = new I()),
          (t.pgn = new C()),
          (t.h = new y()),
          (t.fx = new _()),
          (t.letter = new L()),
          (t.w = new A()),
          (t.wFx = new b()),
          (t.data = new P()),
          (t.nav = new W()),
          (t.aFx = new X()),
          (t.a = new S());
      }
      glInit(t) {
        this.gl = new v(t);
      }
      intro() {
        const t = _A;
        (t.indexSet = new O()),
          (t.li = new E()),
          this.gl.intro(),
          t.pgnX.intro(),
          t.pgn.intro(),
          t.h.intro(),
          t.w.intro(),
          t.fx.intro(),
          t.letter.intro(),
          t.wFx.intro(),
          t.nav.intro(),
          t.aFx.intro(),
          this.raf.run();
      }
      init() {
        const t = _A;
        t.h.init(),
          t.w.init(),
          t.a.init(),
          t.pgn.init(),
          t.nav.init(),
          t.wFx.init(),
          this.resize(),
          this.ro.on(),
          (t.isIntro = !1);
      }
      resize() {
        const t = _A;
        this.win.resize(),
          t.data.resize(),
          this.gl.resize(),
          t.h.resize(),
          t.w.resize(),
          t.wFx.resize(),
          t.li.reset(),
          t.pgn.resize(),
          t.letter.resize(),
          t.li.run({
            index: t.index,
          }),
          this.gl.loop();
      }
      on() {
        const t = _A;
        t.h.on(), t.a.on(), t.wFx.on();
      }
      loop() {
        const t = _A;
        t.w.loop(),
          t.h.loop(),
          t.pgn.loop(),
          t.wFx.loop(),
          t.needGL && this.gl.loop();
      }
      off() {
        const t = _A;
        this.ro.off(), t.h.off(), t.a.off(), t.wFx.off();
      }
    },
    transition: {
      intro: class {
        constructor(t) {
          const i = _A;
          (i.load = new a({
            objChildren: !0,
            el: R.G.id("load"),
            prop: ["x", -110, 110],
            delay: 0.03,
          })),
            i.load
              .motion({
                action: "show",
                d: 0,
                e: "o6",
                delay: 0,
                reverse: !1,
              })
              .play(),
            t((t) => {
              i.engine.glInit((t) => {
                i.engine.intro(),
                  i.engine.init(),
                  i.engine.on(),
                  (i.mutating = !1);
              });
            });
        }
      },
      mutation: class {
        constructor() {
          this.a = _A;
        }
        out() {
          const t = this.a;
          t.engine.off(), t.main.getData();
        }
        in() {
          const t = this.a;
          (t.indexPrev = t.index),
            t.engine.init(),
            t.engine.on(),
            (t.mutating = !1);
        }
      },
    },
  });
})();

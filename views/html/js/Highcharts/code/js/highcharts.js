/*
 Highcharts JS v5.0.2 (2016-10-26)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
 */
(function (L, a) {
    "object" === typeof module && module.exports ? module.exports = L.document ? a(L) : a : L.Highcharts = a(L)
})("undefined" !== typeof window ? window : this, function (L) {
    L = function () {
        var a = window, C = a.document, B = a.navigator && a.navigator.userAgent || "", E = C && C.createElementNS && !!C.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, H = /(edge|msie|trident)/i.test(B) && !window.opera, l = !E, d = /Firefox/.test(B), h = d && 4 > parseInt(B.split("Firefox/")[1], 10);
        return a.Highcharts ? a.Highcharts.error(16, !0) : {
            product: "Highcharts",
            version: "5.0.2",
            deg2rad: 2 * Math.PI / 360,
            doc: C,
            hasBidiBug: h,
            hasTouch: C && void 0 !== C.documentElement.ontouchstart,
            isMS: H,
            isWebKit: /AppleWebKit/.test(B),
            isFirefox: d,
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(B),
            SVG_NS: "http://www.w3.org/2000/svg",
            idCounter: 0,
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: E,
            vml: l,
            win: a,
            charts: [],
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function () {
            }
        }
    }();
    (function (a) {
        var C = [], B = a.charts, E = a.doc, H = a.win;
        a.error = function (a, d) {
            a = "Highcharts error #" +
                a + ": www.highcharts.com/errors/" + a;
            if (d)throw Error(a);
            H.console && console.log(a)
        };
        a.Fx = function (a, d, h) {
            this.options = d;
            this.elem = a;
            this.prop = h
        };
        a.Fx.prototype = {
            dSetter: function () {
                var a = this.paths[0], d = this.paths[1], h = [], g = this.now, t = a.length, m;
                if (1 === g)h = this.toD; else if (t === d.length && 1 > g)for (; t--;)m = parseFloat(a[t]), h[t] = isNaN(m) ? a[t] : g * parseFloat(d[t] - m) + m; else h = d;
                this.elem.attr("d", h)
            }, update: function () {
                var a = this.elem, d = this.prop, h = this.now, g = this.options.step;
                if (this[d + "Setter"])this[d + "Setter"]();
                else a.attr ? a.element && a.attr(d, h) : a.style[d] = h + this.unit;
                g && g.call(a, h, this)
            }, run: function (a, d, h) {
                var g = this, l = function (a) {
                    return l.stopped ? !1 : g.step(a)
                }, m;
                this.startTime = +new Date;
                this.start = a;
                this.end = d;
                this.unit = h;
                this.now = this.start;
                this.pos = 0;
                l.elem = this.elem;
                l() && 1 === C.push(l) && (l.timerId = setInterval(function () {
                    for (m = 0; m < C.length; m++)C[m]() || C.splice(m--, 1);
                    C.length || clearInterval(l.timerId)
                }, 13))
            }, step: function (a) {
                var d = +new Date, l, g = this.options;
                l = this.elem;
                var t = g.complete, m = g.duration,
                    c = g.curAnim, e;
                if (l.attr && !l.element)l = !1; else if (a || d >= m + this.startTime) {
                    this.now = this.end;
                    this.pos = 1;
                    this.update();
                    a = c[this.prop] = !0;
                    for (e in c)!0 !== c[e] && (a = !1);
                    a && t && t.call(l);
                    l = !1
                } else this.pos = g.easing((d - this.startTime) / m), this.now = this.start + (this.end - this.start) * this.pos, this.update(), l = !0;
                return l
            }, initPath: function (l, d, h) {
                function g(a) {
                    for (q = a.length; q--;)"M" !== a[q] && "L" !== a[q] || a.splice(q + 1, 0, a[q + 1], a[q + 2], a[q + 1], a[q + 2])
                }

                function t(a, f) {
                    for (; a.length < b;) {
                        a[0] = f[b - a.length];
                        var c = a.slice(0,
                            A);
                        [].splice.apply(a, [0, 0].concat(c));
                        w && (c = a.slice(a.length - A), [].splice.apply(a, [a.length, 0].concat(c)), q--)
                    }
                    a[0] = "M"
                }

                function m(a, c) {
                    for (var e = (b - a.length) / A; 0 < e && e--;)f = a.slice().splice(a.length / G - A, A * G), f[0] = c[b - A - e * A], x && (f[A - 6] = f[A - 2], f[A - 5] = f[A - 1]), [].splice.apply(a, [a.length / G, 0].concat(f)), w && e--
                }

                d = d || "";
                var c, e = l.startX, p = l.endX, x = -1 < d.indexOf("C"), A = x ? 7 : 3, b, f, q;
                d = d.split(" ");
                h = h.slice();
                var w = l.isArea, G = w ? 2 : 1, n;
                x && (g(d), g(h));
                if (e && p) {
                    for (q = 0; q < e.length; q++)if (e[q] === p[0]) {
                        c = q;
                        break
                    } else if (e[0] ===
                        p[p.length - e.length + q]) {
                        c = q;
                        n = !0;
                        break
                    }
                    void 0 === c && (d = [])
                }
                d.length && a.isNumber(c) && (b = h.length + c * G * A, n ? (t(d, h), m(h, d)) : (t(h, d), m(d, h)));
                return [d, h]
            }
        };
        a.extend = function (a, d) {
            var l;
            a || (a = {});
            for (l in d)a[l] = d[l];
            return a
        };
        a.merge = function () {
            var l, d = arguments, h, g = {}, t = function (d, c) {
                var e, p;
                "object" !== typeof d && (d = {});
                for (p in c)c.hasOwnProperty(p) && (e = c[p], a.isObject(e, !0) && "renderTo" !== p && "number" !== typeof e.nodeType ? d[p] = t(d[p] || {}, e) : d[p] = c[p]);
                return d
            };
            !0 === d[0] && (g = d[1], d = Array.prototype.slice.call(d,
                2));
            h = d.length;
            for (l = 0; l < h; l++)g = t(g, d[l]);
            return g
        };
        a.pInt = function (a, d) {
            return parseInt(a, d || 10)
        };
        a.isString = function (a) {
            return "string" === typeof a
        };
        a.isArray = function (a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a
        };
        a.isObject = function (l, d) {
            return l && "object" === typeof l && (!d || !a.isArray(l))
        };
        a.isNumber = function (a) {
            return "number" === typeof a && !isNaN(a)
        };
        a.erase = function (a, d) {
            for (var l = a.length; l--;)if (a[l] === d) {
                a.splice(l, 1);
                break
            }
        };
        a.defined = function (a) {
            return void 0 !==
                a && null !== a
        };
        a.attr = function (l, d, h) {
            var g, t;
            if (a.isString(d))a.defined(h) ? l.setAttribute(d, h) : l && l.getAttribute && (t = l.getAttribute(d)); else if (a.defined(d) && a.isObject(d))for (g in d)l.setAttribute(g, d[g]);
            return t
        };
        a.splat = function (l) {
            return a.isArray(l) ? l : [l]
        };
        a.syncTimeout = function (a, d, h) {
            if (d)return setTimeout(a, d, h);
            a.call(0, h)
        };
        a.pick = function () {
            var a = arguments, d, h, g = a.length;
            for (d = 0; d < g; d++)if (h = a[d], void 0 !== h && null !== h)return h
        };
        a.css = function (l, d) {
            a.isMS && !a.svg && d && void 0 !== d.opacity && (d.filter =
                "alpha(opacity\x3d" + 100 * d.opacity + ")");
            a.extend(l.style, d)
        };
        a.createElement = function (l, d, h, g, t) {
            l = E.createElement(l);
            var m = a.css;
            d && a.extend(l, d);
            t && m(l, {padding: 0, border: "none", margin: 0});
            h && m(l, h);
            g && g.appendChild(l);
            return l
        };
        a.extendClass = function (l, d) {
            var h = function () {
            };
            h.prototype = new l;
            a.extend(h.prototype, d);
            return h
        };
        a.pad = function (a, d, h) {
            return Array((d || 2) + 1 - String(a).length).join(h || 0) + a
        };
        a.relativeLength = function (a, d) {
            return /%$/.test(a) ? d * parseFloat(a) / 100 : parseFloat(a)
        };
        a.wrap = function (a,
                           d, h) {
            var g = a[d];
            a[d] = function () {
                var a = Array.prototype.slice.call(arguments);
                a.unshift(g);
                return h.apply(this, a)
            }
        };
        a.getTZOffset = function (l) {
            var d = a.Date;
            return 6E4 * (d.hcGetTimezoneOffset && d.hcGetTimezoneOffset(l) || d.hcTimezoneOffset || 0)
        };
        a.dateFormat = function (l, d, h) {
            if (!a.defined(d) || isNaN(d))return a.defaultOptions.lang.invalidDate || "";
            l = a.pick(l, "%Y-%m-%d %H:%M:%S");
            var g = a.Date, t = new g(d - a.getTZOffset(d)), m, c = t[g.hcGetHours](), e = t[g.hcGetDay](), p = t[g.hcGetDate](), x = t[g.hcGetMonth](), A = t[g.hcGetFullYear](),
                b = a.defaultOptions.lang, f = b.weekdays, q = b.shortWeekdays, w = a.pad, g = a.extend({
                    a: q ? q[e] : f[e].substr(0, 3),
                    A: f[e],
                    d: w(p),
                    e: w(p, 2, " "),
                    w: e,
                    b: b.shortMonths[x],
                    B: b.months[x],
                    m: w(x + 1),
                    y: A.toString().substr(2, 2),
                    Y: A,
                    H: w(c),
                    k: c,
                    I: w(c % 12 || 12),
                    l: c % 12 || 12,
                    M: w(t[g.hcGetMinutes]()),
                    p: 12 > c ? "AM" : "PM",
                    P: 12 > c ? "am" : "pm",
                    S: w(t.getSeconds()),
                    L: w(Math.round(d % 1E3), 3)
                }, a.dateFormats);
            for (m in g)for (; -1 !== l.indexOf("%" + m);)l = l.replace("%" + m, "function" === typeof g[m] ? g[m](d) : g[m]);
            return h ? l.substr(0, 1).toUpperCase() + l.substr(1) :
                l
        };
        a.formatSingle = function (l, d) {
            var h = /\.([0-9])/, g = a.defaultOptions.lang;
            /f$/.test(l) ? (h = (h = l.match(h)) ? h[1] : -1, null !== d && (d = a.numberFormat(d, h, g.decimalPoint, -1 < l.indexOf(",") ? g.thousandsSep : ""))) : d = a.dateFormat(l, d);
            return d
        };
        a.format = function (l, d) {
            for (var h = "{", g = !1, t, m, c, e, p = [], x; l;) {
                h = l.indexOf(h);
                if (-1 === h)break;
                t = l.slice(0, h);
                if (g) {
                    t = t.split(":");
                    m = t.shift().split(".");
                    e = m.length;
                    x = d;
                    for (c = 0; c < e; c++)x = x[m[c]];
                    t.length && (x = a.formatSingle(t.join(":"), x));
                    p.push(x)
                } else p.push(t);
                l = l.slice(h +
                    1);
                h = (g = !g) ? "}" : "{"
            }
            p.push(l);
            return p.join("")
        };
        a.getMagnitude = function (a) {
            return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
        };
        a.normalizeTickInterval = function (l, d, h, g, t) {
            var m, c = l;
            h = a.pick(h, 1);
            m = l / h;
            d || (d = [1, 2, 2.5, 5, 10], !1 === g && (1 === h ? d = [1, 2, 5, 10] : .1 >= h && (d = [1 / h])));
            for (g = 0; g < d.length && !(c = d[g], t && c * h >= l || !t && m <= (d[g] + (d[g + 1] || d[g])) / 2); g++);
            return c * h
        };
        a.stableSort = function (a, d) {
            var h = a.length, g, t;
            for (t = 0; t < h; t++)a[t].safeI = t;
            a.sort(function (a, c) {
                g = d(a, c);
                return 0 === g ? a.safeI - c.safeI : g
            });
            for (t =
                     0; t < h; t++)delete a[t].safeI
        };
        a.arrayMin = function (a) {
            for (var d = a.length, h = a[0]; d--;)a[d] < h && (h = a[d]);
            return h
        };
        a.arrayMax = function (a) {
            for (var d = a.length, h = a[0]; d--;)a[d] > h && (h = a[d]);
            return h
        };
        a.destroyObjectProperties = function (a, d) {
            for (var h in a)a[h] && a[h] !== d && a[h].destroy && a[h].destroy(), delete a[h]
        };
        a.discardElement = function (l) {
            var d = a.garbageBin;
            d || (d = a.createElement("div"));
            l && d.appendChild(l);
            d.innerHTML = ""
        };
        a.correctFloat = function (a, d) {
            return parseFloat(a.toPrecision(d || 14))
        };
        a.setAnimation =
            function (l, d) {
                d.renderer.globalAnimation = a.pick(l, d.options.chart.animation, !0)
            };
        a.animObject = function (l) {
            return a.isObject(l) ? a.merge(l) : {duration: l ? 500 : 0}
        };
        a.timeUnits = {
            millisecond: 1,
            second: 1E3,
            minute: 6E4,
            hour: 36E5,
            day: 864E5,
            week: 6048E5,
            month: 24192E5,
            year: 314496E5
        };
        a.numberFormat = function (l, d, h, g) {
            l = +l || 0;
            d = +d;
            var t = a.defaultOptions.lang, m = (l.toString().split(".")[1] || "").length, c, e, p = Math.abs(l);
            -1 === d ? d = Math.min(m, 20) : a.isNumber(d) || (d = 2);
            c = String(a.pInt(p.toFixed(d)));
            e = 3 < c.length ? c.length % 3 :
                0;
            h = a.pick(h, t.decimalPoint);
            g = a.pick(g, t.thousandsSep);
            l = (0 > l ? "-" : "") + (e ? c.substr(0, e) + g : "");
            l += c.substr(e).replace(/(\d{3})(?=\d)/g, "$1" + g);
            d && (g = Math.abs(p - c + Math.pow(10, -Math.max(d, m) - 1)), l += h + g.toFixed(d).slice(2));
            return l
        };
        Math.easeInOutSine = function (a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        };
        a.getStyle = function (l, d) {
            return "width" === d ? Math.min(l.offsetWidth, l.scrollWidth) - a.getStyle(l, "padding-left") - a.getStyle(l, "padding-right") : "height" === d ? Math.min(l.offsetHeight, l.scrollHeight) - a.getStyle(l,
                "padding-top") - a.getStyle(l, "padding-bottom") : (l = H.getComputedStyle(l, void 0)) && a.pInt(l.getPropertyValue(d))
        };
        a.inArray = function (a, d) {
            return d.indexOf ? d.indexOf(a) : [].indexOf.call(d, a)
        };
        a.grep = function (a, d) {
            return [].filter.call(a, d)
        };
        a.map = function (a, d) {
            for (var h = [], g = 0, t = a.length; g < t; g++)h[g] = d.call(a[g], a[g], g, a);
            return h
        };
        a.offset = function (a) {
            var d = E.documentElement;
            a = a.getBoundingClientRect();
            return {
                top: a.top + (H.pageYOffset || d.scrollTop) - (d.clientTop || 0),
                left: a.left + (H.pageXOffset || d.scrollLeft) -
                (d.clientLeft || 0)
            }
        };
        a.stop = function (a) {
            for (var d = C.length; d--;)C[d].elem === a && (C[d].stopped = !0)
        };
        a.each = function (a, d, h) {
            return Array.prototype.forEach.call(a, d, h)
        };
        a.addEvent = function (a, d, h) {
            function g(d) {
                d.target = d.srcElement || H;
                h.call(a, d)
            }

            var t = a.hcEvents = a.hcEvents || {};
            a.addEventListener ? a.addEventListener(d, h, !1) : a.attachEvent && (a.hcEventsIE || (a.hcEventsIE = {}), a.hcEventsIE[h.toString()] = g, a.attachEvent("on" + d, g));
            t[d] || (t[d] = []);
            t[d].push(h)
        };
        a.removeEvent = function (l, d, h) {
            function g(a, c) {
                l.removeEventListener ?
                    l.removeEventListener(a, c, !1) : l.attachEvent && (c = l.hcEventsIE[c.toString()], l.detachEvent("on" + a, c))
            }

            function t() {
                var a, e;
                if (l.nodeName)for (e in d ? (a = {}, a[d] = !0) : a = c, a)if (c[e])for (a = c[e].length; a--;)g(e, c[e][a])
            }

            var m, c = l.hcEvents, e;
            c && (d ? (m = c[d] || [], h ? (e = a.inArray(h, m), -1 < e && (m.splice(e, 1), c[d] = m), g(d, h)) : (t(), c[d] = [])) : (t(), l.hcEvents = {}))
        };
        a.fireEvent = function (l, d, h, g) {
            var t;
            t = l.hcEvents;
            var m, c;
            h = h || {};
            if (E.createEvent && (l.dispatchEvent || l.fireEvent))t = E.createEvent("Events"), t.initEvent(d, !0,
                !0), a.extend(t, h), l.dispatchEvent ? l.dispatchEvent(t) : l.fireEvent(d, t); else if (t)for (t = t[d] || [], m = t.length, h.target || a.extend(h, {
                preventDefault: function () {
                    h.defaultPrevented = !0
                }, target: l, type: d
            }), d = 0; d < m; d++)(c = t[d]) && !1 === c.call(l, h) && h.preventDefault();
            g && !h.defaultPrevented && g(h)
        };
        a.animate = function (l, d, h) {
            var g, t = "", m, c, e;
            a.isObject(h) || (g = arguments, h = {duration: g[2], easing: g[3], complete: g[4]});
            a.isNumber(h.duration) || (h.duration = 400);
            h.easing = "function" === typeof h.easing ? h.easing : Math[h.easing] ||
            Math.easeInOutSine;
            h.curAnim = a.merge(d);
            for (e in d)c = new a.Fx(l, h, e), m = null, "d" === e ? (c.paths = c.initPath(l, l.d, d.d), c.toD = d.d, g = 0, m = 1) : l.attr ? g = l.attr(e) : (g = parseFloat(a.getStyle(l, e)) || 0, "opacity" !== e && (t = "px")), m || (m = d[e]), m.match && m.match("px") && (m = m.replace(/px/g, "")), c.run(g, m, t)
        };
        a.seriesType = function (l, d, h, g, t) {
            var m = a.getOptions(), c = a.seriesTypes;
            m.plotOptions[l] = a.merge(m.plotOptions[d], h);
            c[l] = a.extendClass(c[d] || function () {
                }, g);
            c[l].prototype.type = l;
            t && (c[l].prototype.pointClass = a.extendClass(a.Point,
                t));
            return c[l]
        };
        H.jQuery && (H.jQuery.fn.highcharts = function () {
            var l = [].slice.call(arguments);
            if (this[0])return l[0] ? (new (a[a.isString(l[0]) ? l.shift() : "Chart"])(this[0], l[0], l[1]), this) : B[a.attr(this[0], "data-highcharts-chart")]
        });
        E && !E.defaultView && (a.getStyle = function (l, d) {
            var h = {width: "clientWidth", height: "clientHeight"}[d];
            if (l.style[d])return a.pInt(l.style[d]);
            "opacity" === d && (d = "filter");
            if (h)return l.style.zoom = 1, Math.max(l[h] - 2 * a.getStyle(l, "padding"), 0);
            l = l.currentStyle[d.replace(/\-(\w)/g,
                function (a, d) {
                    return d.toUpperCase()
                })];
            "filter" === d && (l = l.replace(/alpha\(opacity=([0-9]+)\)/, function (a, d) {
                return d / 100
            }));
            return "" === l ? 1 : a.pInt(l)
        });
        Array.prototype.forEach || (a.each = function (a, d, h) {
            for (var g = 0, t = a.length; g < t; g++)if (!1 === d.call(h, a[g], g, a))return g
        });
        Array.prototype.indexOf || (a.inArray = function (a, d) {
            var h, g = 0;
            if (d)for (h = d.length; g < h; g++)if (d[g] === a)return g;
            return -1
        });
        Array.prototype.filter || (a.grep = function (a, d) {
            for (var h = [], g = 0, t = a.length; g < t; g++)d(a[g], g) && h.push(a[g]);
            return h
        })
    })(L);
    (function (a) {
        var C = a.each, B = a.isNumber, E = a.map, H = a.merge, l = a.pInt;
        a.Color = function (d) {
            if (!(this instanceof a.Color))return new a.Color(d);
            this.init(d)
        };
        a.Color.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function (a) {
                    return [l(a[1]), l(a[2]), l(a[3]), parseFloat(a[4], 10)]
                }
            }, {
                regex: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/, parse: function (a) {
                    return [l(a[1], 16), l(a[2], 16), l(a[3], 16), 1]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function (a) {
                    return [l(a[1]), l(a[2]), l(a[3]), 1]
                }
            }], names: {white: "#ffffff", black: "#000000"}, init: function (d) {
                var h, g, t, m;
                if ((this.input = d = this.names[d] || d) && d.stops)this.stops = E(d.stops, function (c) {
                    return new a.Color(c[1])
                }); else for (t = this.parsers.length; t-- && !g;)m = this.parsers[t], (h = m.regex.exec(d)) && (g = m.parse(h));
                this.rgba = g || []
            }, get: function (a) {
                var d = this.input, g = this.rgba, t;
                this.stops ? (t = H(d), t.stops = [].concat(t.stops), C(this.stops, function (d, c) {
                    t.stops[c] = [t.stops[c][0], d.get(a)]
                })) : t = g &&
                B(g[0]) ? "rgb" === a || !a && 1 === g[3] ? "rgb(" + g[0] + "," + g[1] + "," + g[2] + ")" : "a" === a ? g[3] : "rgba(" + g.join(",") + ")" : d;
                return t
            }, brighten: function (a) {
                var d, g = this.rgba;
                if (this.stops)C(this.stops, function (d) {
                    d.brighten(a)
                }); else if (B(a) && 0 !== a)for (d = 0; 3 > d; d++)g[d] += l(255 * a), 0 > g[d] && (g[d] = 0), 255 < g[d] && (g[d] = 255);
                return this
            }, setOpacity: function (a) {
                this.rgba[3] = a;
                return this
            }
        };
        a.color = function (d) {
            return new a.Color(d)
        }
    })(L);
    (function (a) {
        var C, B, E = a.addEvent, H = a.animate, l = a.attr, d = a.charts, h = a.color, g = a.css, t = a.createElement,
            m = a.defined, c = a.deg2rad, e = a.destroyObjectProperties, p = a.doc, x = a.each, A = a.extend, b = a.erase, f = a.grep, q = a.hasTouch, w = a.isArray, G = a.isFirefox, n = a.isMS, D = a.isObject, K = a.isString, y = a.isWebKit, I = a.merge, r = a.noop, z = a.pick, F = a.pInt, N = a.removeEvent, k = a.splat, v = a.stop, Q = a.svg, R = a.SVG_NS, P = a.symbolSizes, M = a.win;
        C = a.SVGElement = function () {
            return this
        };
        C.prototype = {
            opacity: 1,
            SVG_NS: R,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textDecoration textOverflow textShadow".split(" "),
            init: function (a, b) {
                this.element = "span" === b ? t(b) : p.createElementNS(this.SVG_NS, b);
                this.renderer = a
            },
            animate: function (a, b, k) {
                b = z(b, this.renderer.globalAnimation, !0);
                v(this);
                b ? (k && (b.complete = k), H(this, a, b)) : this.attr(a, null, k);
                return this
            },
            colorGradient: function (u, b, k) {
                var v = this.renderer, J, f, c, e, r, q, O, d, n, z, p, g = [], M;
                u.linearGradient ? f = "linearGradient" : u.radialGradient && (f = "radialGradient");
                if (f) {
                    c = u[f];
                    r = v.gradients;
                    O = u.stops;
                    z = k.radialReference;
                    w(c) && (u[f] = c = {x1: c[0], y1: c[1], x2: c[2], y2: c[3], gradientUnits: "userSpaceOnUse"});
                    "radialGradient" === f && z && !m(c.gradientUnits) && (e = c, c = I(c, v.getRadialAttr(z, e), {gradientUnits: "userSpaceOnUse"}));
                    for (p in c)"id" !== p && g.push(p, c[p]);
                    for (p in O)g.push(O[p]);
                    g = g.join(",");
                    r[g] ? z = r[g].attr("id") : (c.id = z = "highcharts-" + a.idCounter++, r[g] = q = v.createElement(f).attr(c).add(v.defs), q.radAttr = e, q.stops = [], x(O, function (u) {
                        0 === u[1].indexOf("rgba") ? (J = a.color(u[1]), d = J.get("rgb"), n = J.get("a")) : (d = u[1], n = 1);
                        u = v.createElement("stop").attr({offset: u[0], "stop-color": d, "stop-opacity": n}).add(q);
                        q.stops.push(u)
                    }));
                    M = "url(" + v.url + "#" + z + ")";
                    k.setAttribute(b, M);
                    k.gradient = g;
                    u.toString = function () {
                        return M
                    }
                }
            },
            applyTextShadow: function (a) {
                var u = this.element, b, k = -1 !== a.indexOf("contrast"), v = {}, f = this.renderer.forExport, c = this.renderer.forExport || void 0 !== u.style.textShadow && !n;
                k && (v.textShadow = a = a.replace(/contrast/g, this.renderer.getContrast(u.style.fill)));
                if (y || f)v.textRendering = "geometricPrecision";
                c ? this.css(v) : (this.fakeTS = !0, this.ySetter = this.xSetter, b = [].slice.call(u.getElementsByTagName("tspan")), x(a.split(/\s?,\s?/g),
                    function (a) {
                        var k = u.firstChild, v, J;
                        a = a.split(" ");
                        v = a[a.length - 1];
                        (J = a[a.length - 2]) && x(b, function (a, b) {
                            0 === b && (a.setAttribute("x", u.getAttribute("x")), b = u.getAttribute("y"), a.setAttribute("y", b || 0), null === b && u.setAttribute("y", 0));
                            a = a.cloneNode(1);
                            l(a, {
                                "class": "highcharts-text-shadow",
                                fill: v,
                                stroke: v,
                                "stroke-opacity": 1 / Math.max(F(J), 3),
                                "stroke-width": J,
                                "stroke-linejoin": "round"
                            });
                            u.insertBefore(a, k)
                        })
                    }))
            },
            attr: function (a, b, k) {
                var u, v = this.element, J, f = this, c;
                "string" === typeof a && void 0 !== b && (u = a, a =
                {}, a[u] = b);
                if ("string" === typeof a)f = (this[a + "Getter"] || this._defaultGetter).call(this, a, v); else {
                    for (u in a)b = a[u], c = !1, this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(u) && (J || (this.symbolAttr(a), J = !0), c = !0), !this.rotation || "x" !== u && "y" !== u || (this.doTransform = !0), c || (c = this[u + "Setter"] || this._defaultSetter, c.call(this, b, u, v));
                    this.doTransform && (this.updateTransform(), this.doTransform = !1)
                }
                k && k();
                return f
            },
            addClass: function (a, b) {
                var u = this.attr("class") || "";
                -1 === u.indexOf(a) &&
                (b || (a = (u + (u ? " " : "") + a).replace("  ", " ")), this.attr("class", a));
                return this
            },
            hasClass: function (a) {
                return -1 !== l(this.element, "class").indexOf(a)
            },
            removeClass: function (a) {
                l(this.element, "class", (l(this.element, "class") || "").replace(a, ""));
                return this
            },
            symbolAttr: function (a) {
                var u = this;
                x("x y r start end width height innerR anchorX anchorY".split(" "), function (b) {
                    u[b] = z(a[b], u[b])
                });
                u.attr({d: u.renderer.symbols[u.symbolName](u.x, u.y, u.width, u.height, u)})
            },
            clip: function (a) {
                return this.attr("clip-path",
                    a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            },
            crisp: function (a, b) {
                var u, k = {}, v;
                b = b || a.strokeWidth || 0;
                v = Math.round(b) % 2 / 2;
                a.x = Math.floor(a.x || this.x || 0) + v;
                a.y = Math.floor(a.y || this.y || 0) + v;
                a.width = Math.floor((a.width || this.width || 0) - 2 * v);
                a.height = Math.floor((a.height || this.height || 0) - 2 * v);
                m(a.strokeWidth) && (a.strokeWidth = b);
                for (u in a)this[u] !== a[u] && (this[u] = k[u] = a[u]);
                return k
            },
            css: function (a) {
                var u = this.styles, b = {}, k = this.element, v, f, c = "";
                v = !u;
                a && a.color && (a.fill = a.color);
                if (u)for (f in a)a[f] !==
                u[f] && (b[f] = a[f], v = !0);
                if (v) {
                    v = this.textWidth = a && a.width && "text" === k.nodeName.toLowerCase() && F(a.width) || this.textWidth;
                    u && (a = A(u, b));
                    this.styles = a;
                    v && !Q && this.renderer.forExport && delete a.width;
                    if (n && !Q)g(this.element, a); else {
                        u = function (a, u) {
                            return "-" + u.toLowerCase()
                        };
                        for (f in a)c += f.replace(/([A-Z])/g, u) + ":" + a[f] + ";";
                        l(k, "style", c)
                    }
                    this.added && v && this.renderer.buildText(this)
                }
                return this
            },
            getStyle: function (a) {
                return M.getComputedStyle(this.element || this, "").getPropertyValue(a)
            },
            strokeWidth: function () {
                var a =
                    this.getStyle("stroke-width"), b;
                a.indexOf("px") === a.length - 2 ? a = F(a) : (b = p.createElementNS(R, "rect"), l(b, {
                    width: a,
                    "stroke-width": 0
                }), this.element.parentNode.appendChild(b), a = b.getBBox().width, b.parentNode.removeChild(b));
                return a
            },
            on: function (a, b) {
                var u = this, k = u.element;
                q && "click" === a ? (k.ontouchstart = function (a) {
                    u.touchEventFired = Date.now();
                    a.preventDefault();
                    b.call(k, a)
                }, k.onclick = function (a) {
                    (-1 === M.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (u.touchEventFired || 0)) && b.call(k, a)
                }) : k["on" +
                a] = b;
                return this
            },
            setRadialReference: function (a) {
                var u = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                u && u.radAttr && u.animate(this.renderer.getRadialAttr(a, u.radAttr));
                return this
            },
            translate: function (a, b) {
                return this.attr({translateX: a, translateY: b})
            },
            invert: function (a) {
                this.inverted = a;
                this.updateTransform();
                return this
            },
            updateTransform: function () {
                var a = this.translateX || 0, b = this.translateY || 0, k = this.scaleX, v = this.scaleY, f = this.inverted, c = this.rotation, e = this.element;
                f && (a += this.attr("width"), b += this.attr("height"));
                a = ["translate(" + a + "," + b + ")"];
                f ? a.push("rotate(90) scale(-1,1)") : c && a.push("rotate(" + c + " " + (e.getAttribute("x") || 0) + " " + (e.getAttribute("y") || 0) + ")");
                (m(k) || m(v)) && a.push("scale(" + z(k, 1) + " " + z(v, 1) + ")");
                a.length && e.setAttribute("transform", a.join(" "))
            },
            toFront: function () {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function (a, k, v) {
                var u, f, c, e, J = {};
                f = this.renderer;
                c = f.alignedObjects;
                var r, q;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate =
                            k, !v || K(v))this.alignTo = u = v || "renderer", b(c, this), c.push(this), v = null
                } else a = this.alignOptions, k = this.alignByTranslate, u = this.alignTo;
                v = z(v, f[u], f);
                u = a.align;
                f = a.verticalAlign;
                c = (v.x || 0) + (a.x || 0);
                e = (v.y || 0) + (a.y || 0);
                "right" === u ? r = 1 : "center" === u && (r = 2);
                r && (c += (v.width - (a.width || 0)) / r);
                J[k ? "translateX" : "x"] = Math.round(c);
                "bottom" === f ? q = 1 : "middle" === f && (q = 2);
                q && (e += (v.height - (a.height || 0)) / q);
                J[k ? "translateY" : "y"] = Math.round(e);
                this[this.placed ? "animate" : "attr"](J);
                this.placed = !0;
                this.alignAttr = J;
                return this
            },
            getBBox: function (a, b) {
                var u, k = this.renderer, v, f = this.element, e = this.styles, r, J = this.textStr, q, d = f.style, g, p = k.cache, w = k.cacheKeys, M;
                b = z(b, this.rotation);
                v = b * c;
                r = f && C.prototype.getStyle.call(f, "font-size");
                void 0 !== J && (M = J.toString().replace(/[0-9]/g, "0") + ["", b || 0, r, f.style.width].join());
                M && !a && (u = p[M]);
                if (!u) {
                    if (f.namespaceURI === this.SVG_NS || k.forExport) {
                        try {
                            g = this.fakeTS && function (a) {
                                    x(f.querySelectorAll(".highcharts-text-shadow"), function (b) {
                                        b.style.display = a
                                    })
                                }, G && d.textShadow ? (q = d.textShadow,
                                d.textShadow = "") : g && g("none"), u = f.getBBox ? A({}, f.getBBox()) : {
                                width: f.offsetWidth,
                                height: f.offsetHeight
                            }, q ? d.textShadow = q : g && g("")
                        } catch (U) {
                        }
                        if (!u || 0 > u.width)u = {width: 0, height: 0}
                    } else u = this.htmlGetBBox();
                    k.isSVG && (a = u.width, k = u.height, n && e && "11px" === e.fontSize && "16.9" === k.toPrecision(3) && (u.height = k = 14), b && (u.width = Math.abs(k * Math.sin(v)) + Math.abs(a * Math.cos(v)), u.height = Math.abs(k * Math.cos(v)) + Math.abs(a * Math.sin(v))));
                    if (M && 0 < u.height) {
                        for (; 250 < w.length;)delete p[w.shift()];
                        p[M] || w.push(M);
                        p[M] =
                            u
                    }
                }
                return u
            },
            show: function (a) {
                return this.attr({visibility: a ? "inherit" : "visible"})
            },
            hide: function () {
                return this.attr({visibility: "hidden"})
            },
            fadeOut: function (a) {
                var b = this;
                b.animate({opacity: 0}, {
                    duration: a || 150, complete: function () {
                        b.attr({y: -9999})
                    }
                })
            },
            add: function (a) {
                var b = this.renderer, u = this.element, k;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && b.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex)k = this.zIndexSetter();
                k || (a ? a.element : b.box).appendChild(u);
                if (this.onAdd)this.onAdd();
                return this
            },
            safeRemoveChild: function (a) {
                var b = a.parentNode;
                b && b.removeChild(a)
            },
            destroy: function () {
                var a = this.element || {}, k = this.renderer.isSVG && "SPAN" === a.nodeName && this.parentGroup, f, c;
                a.onclick = a.onmouseout = a.onmouseover = a.onmousemove = a.point = null;
                v(this);
                this.clipPath && (this.clipPath = this.clipPath.destroy());
                if (this.stops) {
                    for (c = 0; c < this.stops.length; c++)this.stops[c] = this.stops[c].destroy();
                    this.stops = null
                }
                for (this.safeRemoveChild(a); k && k.div && 0 === k.div.childNodes.length;)a =
                    k.parentGroup, this.safeRemoveChild(k.div), delete k.div, k = a;
                this.alignTo && b(this.renderer.alignedObjects, this);
                for (f in this)delete this[f];
                return null
            },
            xGetter: function (a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            },
            _defaultGetter: function (a) {
                a = z(this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            },
            dSetter: function (a, b, k) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                k.setAttribute(b, a);
                this[b] = a
            },
            alignSetter: function (a) {
                this.element.setAttribute("text-anchor", {left: "start", center: "middle", right: "end"}[a])
            },
            opacitySetter: function (a, b, k) {
                this[b] = a;
                k.setAttribute(b, a)
            },
            titleSetter: function (a) {
                var b = this.element.getElementsByTagName("title")[0];
                b || (b = p.createElementNS(this.SVG_NS, "title"), this.element.appendChild(b));
                b.firstChild && b.removeChild(b.firstChild);
                b.appendChild(p.createTextNode(String(z(a), "").replace(/<[^>]*>/g, "")))
            },
            textSetter: function (a) {
                a !== this.textStr &&
                (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
            },
            fillSetter: function (a, b, k) {
                "string" === typeof a ? k.setAttribute(b, a) : a && this.colorGradient(a, b, k)
            },
            visibilitySetter: function (a, b, k) {
                "inherit" === a ? k.removeAttribute(b) : k.setAttribute(b, a)
            },
            zIndexSetter: function (a, b) {
                var k = this.renderer, u = this.parentGroup, v = (u || k).element || k.box, f, c = this.element, e;
                f = this.added;
                var r;
                m(a) && (c.zIndex = a, a = +a, this[b] === a && (f = !1), this[b] = a);
                if (f) {
                    (a = this.zIndex) && u && (u.handleZ = !0);
                    b = v.childNodes;
                    for (r = 0; r < b.length && !e; r++)u = b[r], f = u.zIndex, u !== c && (F(f) > a || !m(a) && m(f) || 0 > a && !m(f) && v !== k.box) && (v.insertBefore(c, u), e = !0);
                    e || v.appendChild(c)
                }
                return e
            },
            _defaultSetter: function (a, b, k) {
                k.setAttribute(b, a)
            }
        };
        C.prototype.yGetter = C.prototype.xGetter;
        C.prototype.translateXSetter = C.prototype.translateYSetter = C.prototype.rotationSetter = C.prototype.verticalAlignSetter = C.prototype.scaleXSetter = C.prototype.scaleYSetter = function (a, b) {
            this[b] = a;
            this.doTransform = !0
        };
        B = a.SVGRenderer = function () {
            this.init.apply(this,
                arguments)
        };
        B.prototype = {
            Element: C, SVG_NS: R, init: function (a, b, k, v, f, c) {
                var u;
                v = this.createElement("svg").attr({version: "1.1", "class": "highcharts-root"});
                u = v.element;
                a.appendChild(u);
                -1 === a.innerHTML.indexOf("xmlns") && l(u, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = u;
                this.boxWrapper = v;
                this.alignedObjects = [];
                this.url = (G || y) && p.getElementsByTagName("base").length ? M.location.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(p.createTextNode("Created with Highcharts 5.0.2"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = c;
                this.forExport = f;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(b, k, !1);
                var e;
                G && a.getBoundingClientRect && (this.subPixelFix = b = function () {
                    g(a, {left: 0, top: 0});
                    e = a.getBoundingClientRect();
                    g(a, {left: Math.ceil(e.left) - e.left + "px", top: Math.ceil(e.top) - e.top + "px"})
                }, b(), E(M, "resize", b))
            }, definition: function (a) {
                function b(a, v) {
                    var f;
                    x(k(a), function (a) {
                        var k = u.createElement(a.tagName), c, e = {};
                        for (c in a)"tagName" !==
                        c && "children" !== c && "textContent" !== c && (e[c] = a[c]);
                        k.attr(e);
                        k.add(v || u.defs);
                        a.textContent && k.element.appendChild(p.createTextNode(a.textContent));
                        b(a.children || [], k);
                        f = k
                    });
                    return f
                }

                var u = this;
                return b(a)
            }, isHidden: function () {
                return !this.boxWrapper.getBBox().width
            }, destroy: function () {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                e(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.subPixelFix && N(M, "resize", this.subPixelFix);
                return this.alignedObjects =
                    null
            }, createElement: function (a) {
                var b = new this.Element;
                b.init(this, a);
                return b
            }, draw: r, getRadialAttr: function (a, b) {
                return {cx: a[0] - a[2] / 2 + b.cx * a[2], cy: a[1] - a[2] / 2 + b.cy * a[2], r: b.r * a[2]}
            }, buildText: function (a) {
                for (var b = a.element, k = this, v = k.forExport, u = z(a.textStr, "").toString(), c = -1 !== u.indexOf("\x3c"), e = b.childNodes, r, q, d, n, w = l(b, "x"), M = a.styles, m = a.textWidth, y = M && M.lineHeight, t = M && M.textShadow, h = M && "ellipsis" === M.textOverflow, A = e.length, D = m && !a.added && this.box, G = function (a) {
                    return y ? F(y) : k.fontMetrics(void 0,
                        a).h
                }; A--;)b.removeChild(e[A]);
                c || t || h || m || -1 !== u.indexOf(" ") ? (r = /<.*class="([^"]+)".*>/, q = /<.*style="([^"]+)".*>/, d = /<.*href="(http[^"]+)".*>/, D && D.appendChild(b), u = c ? u.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [u], u = f(u, function (a) {
                    return "" !== a
                }), x(u, function (u, f) {
                    var c, e = 0;
                    u = u.replace(/^\s+|\s+$/g, "").replace(/<span/g,
                        "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
                    c = u.split("|||");
                    x(c, function (u) {
                        if ("" !== u || 1 === c.length) {
                            var z = {}, J = p.createElementNS(k.SVG_NS, "tspan"), x, y;
                            r.test(u) && (x = u.match(r)[1], l(J, "class", x));
                            q.test(u) && (y = u.match(q)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), l(J, "style", y));
                            d.test(u) && !v && (l(J, "onclick", 'location.href\x3d"' + u.match(d)[1] + '"'), g(J, {cursor: "pointer"}));
                            u = (u.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e");
                            if (" " !== u) {
                                J.appendChild(p.createTextNode(u));
                                e ? z.dx = 0 : f && null !== w && (z.x = w);
                                l(J, z);
                                b.appendChild(J);
                                !e && f && (!Q && v && g(J, {display: "block"}), l(J, "dy", G(J)));
                                if (m) {
                                    z = u.replace(/([^\^])-/g, "$1- ").split(" ");
                                    x = "nowrap" === M.whiteSpace;
                                    for (var t = 1 < c.length || f || 1 < z.length && !x, O, F, D = [], A = G(J), K = a.rotation, N = u, I = N.length; (t || h) && (z.length || D.length);)a.rotation = 0, O = a.getBBox(!0), F = O.width, !Q && k.forExport && (F = k.measureSpanWidth(J.firstChild.data, a.styles)), O = F > m, void 0 === n && (n = O), h && n ? (I /= 2, "" === N || !O && .5 > I ? z = [] : (N = u.substring(0, N.length + (O ? -1 : 1) * Math.ceil(I)),
                                        z = [N + (3 < m ? "\u2026" : "")], J.removeChild(J.firstChild))) : O && 1 !== z.length ? (J.removeChild(J.firstChild), D.unshift(z.pop())) : (z = D, D = [], z.length && !x && (J = p.createElementNS(R, "tspan"), l(J, {
                                        dy: A,
                                        x: w
                                    }), y && l(J, "style", y), b.appendChild(J)), F > m && (m = F)), z.length && J.appendChild(p.createTextNode(z.join(" ").replace(/- /g, "-")));
                                    a.rotation = K
                                }
                                e++
                            }
                        }
                    })
                }), n && a.attr("title", a.textStr), D && D.removeChild(b), t && a.applyTextShadow && a.applyTextShadow(t)) : b.appendChild(p.createTextNode(u.replace(/&lt;/g, "\x3c").replace(/&gt;/g,
                    "\x3e")))
            }, getContrast: function (a) {
                a = h(a).rgba;
                return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
            }, button: function (a, b, k, v, f, c, e, r, q) {
                var u = this.label(a, b, k, q, null, null, null, null, "button"), d = 0;
                u.attr(I({padding: 8, r: 2}, f));
                E(u.element, n ? "mouseover" : "mouseenter", function () {
                    3 !== d && u.setState(1)
                });
                E(u.element, n ? "mouseout" : "mouseleave", function () {
                    3 !== d && u.setState(d)
                });
                u.setState = function (a) {
                    1 !== a && (u.state = d = a);
                    u.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" +
                        ["normal", "hover", "pressed", "disabled"][a || 0])
                };
                return u.on("click", function (a) {
                    3 !== d && v.call(u, a)
                })
            }, crispLine: function (a, b) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - b % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + b % 2 / 2);
                return a
            }, path: function (a) {
                var b = {};
                w(a) ? b.d = a : D(a) && A(b, a);
                return this.createElement("path").attr(b)
            }, circle: function (a, b, k) {
                a = D(a) ? a : {x: a, y: b, r: k};
                b = this.createElement("circle");
                b.xSetter = b.ySetter = function (a, b, k) {
                    k.setAttribute("c" + b, a)
                };
                return b.attr(a)
            }, arc: function (a, b, k, v,
                              f, c) {
                D(a) && (b = a.y, k = a.r, v = a.innerR, f = a.start, c = a.end, a = a.x);
                a = this.symbol("arc", a || 0, b || 0, k || 0, k || 0, {innerR: v || 0, start: f || 0, end: c || 0});
                a.r = k;
                return a
            }, rect: function (a, b, k, v, f, c) {
                f = D(a) ? a.r : f;
                c = this.createElement("rect");
                a = D(a) ? a : void 0 === a ? {} : {x: a, y: b, width: Math.max(k, 0), height: Math.max(v, 0)};
                f && (a.r = f);
                c.rSetter = function (a, b, k) {
                    l(k, {rx: a, ry: a})
                };
                return c.attr(a)
            }, setSize: function (a, b, k) {
                var v = this.alignedObjects, u = v.length;
                this.width = a;
                this.height = b;
                for (this.boxWrapper.animate({width: a, height: b},
                    {
                        step: function () {
                            this.attr({viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")})
                        }, duration: z(k, !0) ? void 0 : 0
                    }); u--;)v[u].align()
            }, g: function (a) {
                var b = this.createElement("g");
                return a ? b.attr({"class": "highcharts-" + a}) : b
            }, image: function (a, b, k, v, f) {
                var u = {preserveAspectRatio: "none"};
                1 < arguments.length && A(u, {x: b, y: k, width: v, height: f});
                u = this.createElement("image").attr(u);
                u.element.setAttributeNS ? u.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : u.element.setAttribute("hc-svg-href",
                    a);
                return u
            }, symbol: function (a, b, k, v, f, c) {
                var u = this, e, r = this.symbols[a], q = m(b) && r && r(Math.round(b), Math.round(k), v, f, c), n = /^url\((.*?)\)$/, w, M;
                r ? (e = this.path(q), A(e, {
                    symbolName: a,
                    x: b,
                    y: k,
                    width: v,
                    height: f
                }), c && A(e, c)) : n.test(a) && (w = a.match(n)[1], e = this.image(w), e.imgwidth = z(P[w] && P[w].width, c && c.width), e.imgheight = z(P[w] && P[w].height, c && c.height), M = function () {
                    e.attr({width: e.width, height: e.height})
                }, x(["width", "height"], function (a) {
                    e[a + "Setter"] = function (a, b) {
                        var k = {}, v = this["img" + b], u = "width" ===
                        b ? "translateX" : "translateY";
                        this[b] = a;
                        m(v) && (this.element && this.element.setAttribute(b, v), this.alignByTranslate || (k[u] = ((this[b] || 0) - v) / 2, this.attr(k)))
                    }
                }), m(b) && e.attr({
                    x: b,
                    y: k
                }), e.isImg = !0, m(e.imgwidth) && m(e.imgheight) ? M() : (e.attr({width: 0, height: 0}), t("img", {
                    onload: function () {
                        var a = d[u.chartIndex];
                        0 === this.width && (g(this, {position: "absolute", top: "-999em"}), p.body.appendChild(this));
                        P[w] = {width: this.width, height: this.height};
                        e.imgwidth = this.width;
                        e.imgheight = this.height;
                        e.element && M();
                        this.parentNode &&
                        this.parentNode.removeChild(this);
                        u.imgCount--;
                        if (!u.imgCount && a && a.onload)a.onload()
                    }, src: w
                }), this.imgCount++));
                return e
            }, symbols: {
                circle: function (a, b, k, v) {
                    var f = .166 * k;
                    return ["M", a + k / 2, b, "C", a + k + f, b, a + k + f, b + v, a + k / 2, b + v, "C", a - f, b + v, a - f, b, a + k / 2, b, "Z"]
                }, square: function (a, b, k, v) {
                    return ["M", a, b, "L", a + k, b, a + k, b + v, a, b + v, "Z"]
                }, triangle: function (a, b, k, v) {
                    return ["M", a + k / 2, b, "L", a + k, b + v, a, b + v, "Z"]
                }, "triangle-down": function (a, b, k, v) {
                    return ["M", a, b, "L", a + k, b, a + k / 2, b + v, "Z"]
                }, diamond: function (a, b, k, v) {
                    return ["M",
                        a + k / 2, b, "L", a + k, b + v / 2, a + k / 2, b + v, a, b + v / 2, "Z"]
                }, arc: function (a, b, k, v, f) {
                    var c = f.start;
                    k = f.r || k || v;
                    var u = f.end - .001;
                    v = f.innerR;
                    var e = f.open, r = Math.cos(c), q = Math.sin(c), d = Math.cos(u), u = Math.sin(u);
                    f = f.end - c < Math.PI ? 0 : 1;
                    return ["M", a + k * r, b + k * q, "A", k, k, 0, f, 1, a + k * d, b + k * u, e ? "M" : "L", a + v * d, b + v * u, "A", v, v, 0, f, 0, a + v * r, b + v * q, e ? "" : "Z"]
                }, callout: function (a, b, k, v, f) {
                    var c = Math.min(f && f.r || 0, k, v), e = c + 6, u = f && f.anchorX;
                    f = f && f.anchorY;
                    var r;
                    r = ["M", a + c, b, "L", a + k - c, b, "C", a + k, b, a + k, b, a + k, b + c, "L", a + k, b + v - c, "C", a + k, b + v, a + k,
                        b + v, a + k - c, b + v, "L", a + c, b + v, "C", a, b + v, a, b + v, a, b + v - c, "L", a, b + c, "C", a, b, a, b, a + c, b];
                    u && u > k && f > b + e && f < b + v - e ? r.splice(13, 3, "L", a + k, f - 6, a + k + 6, f, a + k, f + 6, a + k, b + v - c) : u && 0 > u && f > b + e && f < b + v - e ? r.splice(33, 3, "L", a, f + 6, a - 6, f, a, f - 6, a, b + c) : f && f > v && u > a + e && u < a + k - e ? r.splice(23, 3, "L", u + 6, b + v, u, b + v + 6, u - 6, b + v, a + c, b + v) : f && 0 > f && u > a + e && u < a + k - e && r.splice(3, 3, "L", u - 6, b, u, b - 6, u + 6, b, k - c, b);
                    return r
                }
            }, clipRect: function (b, k, v, f) {
                var c = "highcharts-" + a.idCounter++, e = this.createElement("clipPath").attr({id: c}).add(this.defs);
                b = this.rect(b,
                    k, v, f, 0).add(e);
                b.id = c;
                b.clipPath = e;
                b.count = 0;
                return b
            }, text: function (a, b, k, v) {
                var f = !Q && this.forExport, c = {};
                if (v && (this.allowHTML || !this.forExport))return this.html(a, b, k);
                c.x = Math.round(b || 0);
                k && (c.y = Math.round(k));
                if (a || 0 === a)c.text = a;
                a = this.createElement("text").attr(c);
                f && a.css({position: "absolute"});
                v || (a.xSetter = function (a, b, k) {
                    var v = k.getElementsByTagName("tspan"), f, c = k.getAttribute(b), e;
                    for (e = 0; e < v.length; e++)f = v[e], f.getAttribute(b) === c && f.setAttribute(b, a);
                    k.setAttribute(b, a)
                });
                return a
            },
            fontMetrics: function (a, b) {
                a = b && C.prototype.getStyle.call(b, "font-size");
                a = /px/.test(a) ? F(a) : /em/.test(a) ? 12 * parseFloat(a) : 12;
                b = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {h: b, b: Math.round(.8 * b), f: a}
            }, rotCorr: function (a, b, k) {
                var v = a;
                b && k && (v = Math.max(v * Math.cos(b * c), 4));
                return {x: -a / 3 * Math.sin(b * c), y: v}
            }, label: function (a, b, k, v, f, c, e, r, q) {
                var u = this, d = u.g("button" !== q && "label"), n = d.text = u.text("", 0, 0, e).attr({zIndex: 1}), z, g, p = 0, w = 3, M = 0, y, t, h, F, D, G = {}, R, K = /^url\((.*?)\)$/.test(v), Q = K, J, l, O, P;
                q && d.addClass("highcharts-" +
                    q);
                Q = !0;
                J = function () {
                    return z.strokeWidth() % 2 / 2
                };
                l = function () {
                    var a = n.element.style, b = {};
                    g = (void 0 === y || void 0 === t || D) && m(n.textStr) && n.getBBox();
                    d.width = (y || g.width || 0) + 2 * w + M;
                    d.height = (t || g.height || 0) + 2 * w;
                    R = w + u.fontMetrics(a && a.fontSize, n).b;
                    Q && (z || (d.box = z = u.symbols[v] || K ? u.symbol(v) : u.rect(), z.addClass(("button" === q ? "" : "highcharts-label-box") + (q ? " highcharts-" + q + "-box" : "")), z.add(d), a = J(), b.x = a, b.y = (r ? -R : 0) + a), b.width = Math.round(d.width), b.height = Math.round(d.height), z.attr(A(b, G)), G = {})
                };
                O = function () {
                    var a =
                        M + w, b;
                    b = r ? 0 : R;
                    m(y) && g && ("center" === D || "right" === D) && (a += {center: .5, right: 1}[D] * (y - g.width));
                    if (a !== n.x || b !== n.y)n.attr("x", a), void 0 !== b && n.attr("y", b);
                    n.x = a;
                    n.y = b
                };
                P = function (a, b) {
                    z ? z.attr(a, b) : G[a] = b
                };
                d.onAdd = function () {
                    n.add(d);
                    d.attr({text: a || 0 === a ? a : "", x: b, y: k});
                    z && m(f) && d.attr({anchorX: f, anchorY: c})
                };
                d.widthSetter = function (a) {
                    y = a
                };
                d.heightSetter = function (a) {
                    t = a
                };
                d["text-alignSetter"] = function (a) {
                    D = a
                };
                d.paddingSetter = function (a) {
                    m(a) && a !== w && (w = d.padding = a, O())
                };
                d.paddingLeftSetter = function (a) {
                    m(a) &&
                    a !== M && (M = a, O())
                };
                d.alignSetter = function (a) {
                    a = {left: 0, center: .5, right: 1}[a];
                    a !== p && (p = a, g && d.attr({x: h}))
                };
                d.textSetter = function (a) {
                    void 0 !== a && n.textSetter(a);
                    l();
                    O()
                };
                d["stroke-widthSetter"] = function (a, b) {
                    a && (Q = !0);
                    this["stroke-width"] = a;
                    P(b, a)
                };
                d.rSetter = function (a, b) {
                    P(b, a)
                };
                d.anchorXSetter = function (a, b) {
                    f = a;
                    P(b, Math.round(a) - J() - h)
                };
                d.anchorYSetter = function (a, b) {
                    c = a;
                    P(b, a - F)
                };
                d.xSetter = function (a) {
                    d.x = a;
                    p && (a -= p * ((y || g.width) + 2 * w));
                    h = Math.round(a);
                    d.attr("translateX", h)
                };
                d.ySetter = function (a) {
                    F =
                        d.y = Math.round(a);
                    d.attr("translateY", F)
                };
                var T = d.css;
                return A(d, {
                    css: function (a) {
                        if (a) {
                            var b = {};
                            a = I(a);
                            x(d.textProps, function (k) {
                                void 0 !== a[k] && (b[k] = a[k], delete a[k])
                            });
                            n.css(b)
                        }
                        return T.call(d, a)
                    }, getBBox: function () {
                        return {width: g.width + 2 * w, height: g.height + 2 * w, x: g.x - w, y: g.y - w}
                    }, destroy: function () {
                        N(d.element, "mouseenter");
                        N(d.element, "mouseleave");
                        n && (n = n.destroy());
                        z && (z = z.destroy());
                        C.prototype.destroy.call(d);
                        d = u = l = O = P = null
                    }
                })
            }
        };
        a.Renderer = B
    })(L);
    (function (a) {
        var C = a.attr, B = a.createElement,
            E = a.css, H = a.defined, l = a.each, d = a.extend, h = a.isFirefox, g = a.isMS, t = a.isWebKit, m = a.pInt, c = a.SVGRenderer, e = a.win, p = a.wrap;
        d(a.SVGElement.prototype, {
            htmlCss: function (a) {
                var c = this.element;
                if (c = a && "SPAN" === c.tagName && a.width)delete a.width, this.textWidth = c, this.updateTransform();
                a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
                this.styles = d(this.styles, a);
                E(this.element, a);
                return this
            }, htmlGetBBox: function () {
                var a = this.element;
                "text" === a.nodeName && (a.style.position = "absolute");
                return {x: a.offsetLeft, y: a.offsetTop, width: a.offsetWidth, height: a.offsetHeight}
            }, htmlUpdateTransform: function () {
                if (this.added) {
                    var a = this.renderer, c = this.element, b = this.x || 0, f = this.y || 0, e = this.textAlign || "left", d = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[e], g = this.styles;
                    E(c, {marginLeft: this.translateX || 0, marginTop: this.translateY || 0});
                    this.inverted && l(c.childNodes, function (b) {
                        a.invertChild(b, c)
                    });
                    if ("SPAN" === c.tagName) {
                        var n = this.rotation, p = m(this.textWidth), h = g && g.whiteSpace, y = [n, e, c.innerHTML, this.textWidth, this.textAlign].join();
                        y !== this.cTT && (g = a.fontMetrics(c.style.fontSize).b, H(n) && this.setSpanRotation(n, d, g), E(c, {
                            width: "",
                            whiteSpace: h || "nowrap"
                        }), c.offsetWidth > p && /[ \-]/.test(c.textContent || c.innerText) && E(c, {
                            width: p + "px",
                            display: "block",
                            whiteSpace: h || "normal"
                        }), this.getSpanCorrection(c.offsetWidth, g, d, n, e));
                        E(c, {left: b + (this.xCorr || 0) + "px", top: f + (this.yCorr || 0) + "px"});
                        t && (g = c.offsetHeight);
                        this.cTT = y
                    }
                } else this.alignOnAdd = !0
            }, setSpanRotation: function (a, c, b) {
                var f = {}, d = g ? "-ms-transform" : t ? "-webkit-transform" : h ? "MozTransform" :
                    e.opera ? "-o-transform" : "";
                f[d] = f.transform = "rotate(" + a + "deg)";
                f[d + (h ? "Origin" : "-origin")] = f.transformOrigin = 100 * c + "% " + b + "px";
                E(this.element, f)
            }, getSpanCorrection: function (a, c, b) {
                this.xCorr = -a * b;
                this.yCorr = -c
            }
        });
        d(c.prototype, {
            html: function (a, c, b) {
                var f = this.createElement("span"), e = f.element, g = f.renderer, m = g.isSVG, n = function (a, b) {
                    l(["opacity", "visibility"], function (f) {
                        p(a, f + "Setter", function (a, f, c, e) {
                            a.call(this, f, c, e);
                            b[c] = f
                        })
                    })
                };
                f.textSetter = function (a) {
                    a !== e.innerHTML && delete this.bBox;
                    e.innerHTML =
                        this.textStr = a;
                    f.htmlUpdateTransform()
                };
                m && n(f, f.element.style);
                f.xSetter = f.ySetter = f.alignSetter = f.rotationSetter = function (a, b) {
                    "align" === b && (b = "textAlign");
                    f[b] = a;
                    f.htmlUpdateTransform()
                };
                f.attr({text: a, x: Math.round(c), y: Math.round(b)}).css({position: "absolute"});
                e.style.whiteSpace = "nowrap";
                f.css = f.htmlCss;
                m && (f.add = function (a) {
                    var b, c = g.box.parentNode, q = [];
                    if (this.parentGroup = a) {
                        if (b = a.div, !b) {
                            for (; a;)q.push(a), a = a.parentGroup;
                            l(q.reverse(), function (a) {
                                var f, e = C(a.element, "class");
                                e && (e = {className: e});
                                b = a.div = a.div || B("div", e, {
                                        position: "absolute",
                                        left: (a.translateX || 0) + "px",
                                        top: (a.translateY || 0) + "px",
                                        display: a.display,
                                        opacity: a.opacity,
                                        pointerEvents: a.styles && a.styles.pointerEvents
                                    }, b || c);
                                f = b.style;
                                d(a, {
                                    translateXSetter: function (b, k) {
                                        f.left = b + "px";
                                        a[k] = b;
                                        a.doTransform = !0
                                    }, translateYSetter: function (b, k) {
                                        f.top = b + "px";
                                        a[k] = b;
                                        a.doTransform = !0
                                    }
                                });
                                n(a, f)
                            })
                        }
                    } else b = c;
                    b.appendChild(e);
                    f.added = !0;
                    f.alignOnAdd && f.htmlUpdateTransform();
                    return f
                });
                return f
            }
        })
    })(L);
    (function (a) {
        function C() {
            var h = a.defaultOptions.global,
                g, t = h.useUTC, m = t ? "getUTC" : "get", c = t ? "setUTC" : "set";
            a.Date = g = h.Date || d.Date;
            g.hcTimezoneOffset = t && h.timezoneOffset;
            g.hcGetTimezoneOffset = t && h.getTimezoneOffset;
            g.hcMakeTime = function (a, c, d, m, b, f) {
                var e;
                t ? (e = g.UTC.apply(0, arguments), e += E(e)) : e = (new g(a, c, l(d, 1), l(m, 0), l(b, 0), l(f, 0))).getTime();
                return e
            };
            B("Minutes Hours Day Date Month FullYear".split(" "), function (a) {
                g["hcGet" + a] = m + a
            });
            B("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "), function (a) {
                g["hcSet" + a] = c + a
            })
        }

        var B = a.each, E =
            a.getTZOffset, H = a.merge, l = a.pick, d = a.win;
        a.defaultOptions = {
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {useUTC: !0},
            chart: {
                borderRadius: 0,
                colorCount: 10,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {theme: {zIndex: 20}, position: {align: "right", x: -10, y: 10}},
                width: null,
                height: null
            },
            defs: {
                dropShadow: {
                    tagName: "filter",
                    id: "drop-shadow",
                    opacity: .5,
                    children: [{tagName: "feGaussianBlur", in: "SourceAlpha", stdDeviation: 1}, {
                        tagName: "feOffset",
                        dx: 1,
                        dy: 1
                    }, {tagName: "feComponentTransfer", children: [{tagName: "feFuncA", type: "linear", slope: .3}]}, {
                        tagName: "feMerge",
                        children: [{tagName: "feMergeNode"}, {tagName: "feMergeNode", in: "SourceGraphic"}]
                    }]
                }, style: {tagName: "style", textContent: ".highcharts-tooltip{filter:url(#drop-shadow)}"}
            },
            title: {text: "Chart title", align: "center", margin: 15, widthAdjust: -44},
            subtitle: {text: "", align: "center", widthAdjust: -44},
            plotOptions: {},
            labels: {style: {position: "absolute", color: "#333333"}},
            legend: {
                enabled: !0,
                align: "center",
                layout: "horizontal",
                labelFormatter: function () {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {},
                itemCheckboxStyle: {position: "absolute", width: "13px", height: "13px"},
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {}
            },
            loading: {},
            tooltip: {
                enabled: !0,
                animation: a.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: a.isTouchDevice ? 25 : 10,
                headerFormat: '\x3cspan class\x3d"highcharts-header"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: '\x3cspan class\x3d"highcharts-color-{point.colorIndex}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e'
            },
            credits: {
                enabled: !0,
                href: "http://www.highcharts.com",
                position: {align: "right", x: -10, verticalAlign: "bottom", y: -5},
                text: "Highcharts.com"
            }
        };
        a.setOptions = function (d) {
            a.defaultOptions = H(!0, a.defaultOptions, d);
            C();
            return a.defaultOptions
        };
        a.getOptions = function () {
            return a.defaultOptions
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        C()
    })(L);
    (function (a) {
        var C =
            a.arrayMax, B = a.arrayMin, E = a.defined, H = a.destroyObjectProperties, l = a.each, d = a.erase, h = a.merge, g = a.pick;
        a.PlotLineOrBand = function (a, d) {
            this.axis = a;
            d && (this.options = d, this.id = d.id)
        };
        a.PlotLineOrBand.prototype = {
            render: function () {
                var a = this, d = a.axis, c = d.horiz, e = a.options, p = e.label, x = a.label, A = e.to, b = e.from, f = e.value, q = E(b) && E(A), w = E(f), G = a.svgElem, n = !G, D = [], K, y = g(e.zIndex, 0), l = e.events, D = {"class": "highcharts-plot-" + (q ? "band " : "line ") + (e.className || "")}, r = {}, z = d.chart.renderer, F = q ? "bands" : "lines", N;
                N =
                    d.log2lin;
                d.isLog && (b = N(b), A = N(A), f = N(f));
                r.zIndex = y;
                F += "-" + y;
                (N = d[F]) || (d[F] = N = z.g("plot-" + F).attr(r).add());
                n && (a.svgElem = G = z.path().attr(D).add(N));
                if (w)D = d.getPlotLinePath(f, G.strokeWidth()); else if (q)D = d.getPlotBandPath(b, A, e); else return;
                if (n && D && D.length) {
                    if (G.attr({d: D}), l)for (K in e = function (b) {
                        G.on(b, function (k) {
                            l[b].apply(a, [k])
                        })
                    }, l)e(K)
                } else G && (D ? (G.show(), G.animate({d: D})) : (G.hide(), x && (a.label = x = x.destroy())));
                p && E(p.text) && D && D.length && 0 < d.width && 0 < d.height && !D.flat ? (p = h({
                    align: c &&
                    q && "center",
                    x: c ? !q && 4 : 10,
                    verticalAlign: !c && q && "middle",
                    y: c ? q ? 16 : 10 : q ? 6 : -4,
                    rotation: c && !q && 90
                }, p), this.renderLabel(p, D, q, y)) : x && x.hide();
                return a
            }, renderLabel: function (a, d, c, e) {
                var g = this.label, x = this.axis.chart.renderer;
                g || (g = {
                    align: a.textAlign || a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (c ? "band" : "line") + "-label " + (a.className || "")
                }, g.zIndex = e, this.label = g = x.text(a.text, 0, 0, a.useHTML).attr(g).add());
                e = [d[1], d[4], c ? d[6] : d[1]];
                d = [d[2], d[5], c ? d[7] : d[2]];
                c = B(e);
                x = B(d);
                g.align(a, !1, {
                    x: c, y: x,
                    width: C(e) - c, height: C(d) - x
                });
                g.show()
            }, destroy: function () {
                d(this.axis.plotLinesAndBands, this);
                delete this.axis;
                H(this)
            }
        };
        a.AxisPlotLineOrBandExtension = {
            getPlotBandPath: function (a, d) {
                d = this.getPlotLinePath(d, null, null, !0);
                (a = this.getPlotLinePath(a, null, null, !0)) && d ? (a.flat = a.toString() === d.toString(), a.push(d[4], d[5], d[1], d[2])) : a = null;
                return a
            }, addPlotBand: function (a) {
                return this.addPlotBandOrLine(a, "plotBands")
            }, addPlotLine: function (a) {
                return this.addPlotBandOrLine(a, "plotLines")
            }, addPlotBandOrLine: function (d,
                                            g) {
                var c = (new a.PlotLineOrBand(this, d)).render(), e = this.userOptions;
                c && (g && (e[g] = e[g] || [], e[g].push(d)), this.plotLinesAndBands.push(c));
                return c
            }, removePlotBandOrLine: function (a) {
                for (var g = this.plotLinesAndBands, c = this.options, e = this.userOptions, p = g.length; p--;)g[p].id === a && g[p].destroy();
                l([c.plotLines || [], e.plotLines || [], c.plotBands || [], e.plotBands || []], function (c) {
                    for (p = c.length; p--;)c[p].id === a && d(c, c[p])
                })
            }
        }
    })(L);
    (function (a) {
        var C = a.correctFloat, B = a.defined, E = a.destroyObjectProperties, H = a.isNumber,
            l = a.pick, d = a.stop, h = a.deg2rad;
        a.Tick = function (a, d, h, c) {
            this.axis = a;
            this.pos = d;
            this.type = h || "";
            this.isNew = !0;
            h || c || this.addLabel()
        };
        a.Tick.prototype = {
            addLabel: function () {
                var a = this.axis, d = a.options, h = a.chart, c = a.categories, e = a.names, p = this.pos, x = d.labels, A = a.tickPositions, b = p === A[0], f = p === A[A.length - 1], e = c ? l(c[p], e[p], p) : p, c = this.label, A = A.info, q;
                a.isDatetimeAxis && A && (q = d.dateTimeLabelFormats[A.higherRanks[p] || A.unitName]);
                this.isFirst = b;
                this.isLast = f;
                d = a.labelFormatter.call({
                    axis: a, chart: h, isFirst: b,
                    isLast: f, dateTimeLabelFormat: q, value: a.isLog ? C(a.lin2log(e)) : e
                });
                B(c) ? c && c.attr({text: d}) : (this.labelLength = (this.label = c = B(d) && x.enabled ? h.renderer.text(d, 0, 0, x.useHTML).add(a.labelGroup) : null) && c.getBBox().width, this.rotation = 0)
            }, getLabelSize: function () {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            }, handleOverflow: function (a) {
                var d = this.axis, g = a.x, c = d.chart.chartWidth, e = d.chart.spacing, p = l(d.labelLeft, Math.min(d.pos, e[3])), e = l(d.labelRight, Math.max(d.pos + d.len, c - e[1])),
                    x = this.label, A = this.rotation, b = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[d.labelAlign], f = x.getBBox().width, q = d.getSlotWidth(), w = q, G = 1, n, D = {};
                if (A)0 > A && g - b * f < p ? n = Math.round(g / Math.cos(A * h) - p) : 0 < A && g + b * f > e && (n = Math.round((c - g) / Math.cos(A * h))); else if (c = g + (1 - b) * f, g - b * f < p ? w = a.x + w * (1 - b) - p : c > e && (w = e - a.x + w * b, G = -1), w = Math.min(q, w), w < q && "center" === d.labelAlign && (a.x += G * (q - w - b * (q - Math.min(f, w)))), f > w || d.autoRotation && (x.styles || {}).width)n = w;
                n && (D.width = n, (d.options.labels.style || {}).textOverflow || (D.textOverflow = "ellipsis"),
                    x.css(D))
            }, getPosition: function (a, d, h, c) {
                var e = this.axis, g = e.chart, x = c && g.oldChartHeight || g.chartHeight;
                return {
                    x: a ? e.translate(d + h, null, null, c) + e.transB : e.left + e.offset + (e.opposite ? (c && g.oldChartWidth || g.chartWidth) - e.right - e.left : 0),
                    y: a ? x - e.bottom + e.offset - (e.opposite ? e.height : 0) : x - e.translate(d + h, null, null, c) - e.transB
                }
            }, getLabelPosition: function (a, d, m, c, e, p, x, A) {
                var b = this.axis, f = b.transA, q = b.reversed, g = b.staggerLines, G = b.tickRotCorr || {
                        x: 0,
                        y: 0
                    }, n = e.y;
                B(n) || (n = 0 === b.side ? m.rotation ? -8 : -m.getBBox().height :
                    2 === b.side ? G.y + 8 : Math.cos(m.rotation * h) * (G.y - m.getBBox(!1, 0).height / 2));
                a = a + e.x + G.x - (p && c ? p * f * (q ? -1 : 1) : 0);
                d = d + n - (p && !c ? p * f * (q ? 1 : -1) : 0);
                g && (m = x / (A || 1) % g, b.opposite && (m = g - m - 1), d += b.labelOffset / g * m);
                return {x: a, y: Math.round(d)}
            }, getMarkPath: function (a, d, h, c, e, p) {
                return p.crispLine(["M", a, d, "L", a + (e ? 0 : -h), d + (e ? h : 0)], c)
            }, render: function (a, h, m) {
                var c = this.axis, e = c.options, g = c.chart.renderer, x = c.horiz, A = this.type, b = this.label, f = this.pos, q = e.labels, w = this.gridLine, G = c.tickSize(A ? A + "Tick" : "tick"), n = this.mark,
                    D = !n, K = q.step, y = {}, t = !0, r = c.tickmarkOffset, z = this.getPosition(x, f, r, h), F = z.x, z = z.y, N = x && F === c.pos + c.len || !x && z === c.pos ? -1 : 1;
                m = l(m, 1);
                this.isActive = !0;
                w || (A || (y.zIndex = 1), h && (y.opacity = 0), this.gridLine = w = g.path().attr(y).addClass("highcharts-" + (A ? A + "-" : "") + "grid-line").add(c.gridGroup));
                if (!h && w && (f = c.getPlotLinePath(f + r, w.strokeWidth() * N, h, !0)))w[this.isNew ? "attr" : "animate"]({
                    d: f,
                    opacity: m
                });
                G && (c.opposite && (G[0] = -G[0]), D && (this.mark = n = g.path().addClass("highcharts-" + (A ? A + "-" : "") + "tick").add(c.axisGroup)),
                    n[D ? "attr" : "animate"]({
                        d: this.getMarkPath(F, z, G[0], n.strokeWidth() * N, x, g),
                        opacity: m
                    }));
                b && H(F) && (b.xy = z = this.getLabelPosition(F, z, b, x, q, r, a, K), this.isFirst && !this.isLast && !l(e.showFirstLabel, 1) || this.isLast && !this.isFirst && !l(e.showLastLabel, 1) ? t = !1 : !x || c.isRadial || q.step || q.rotation || h || 0 === m || this.handleOverflow(z), K && a % K && (t = !1), t && H(z.y) ? (z.opacity = m, b[this.isNew ? "attr" : "animate"](z)) : (d(b), b.attr("y", -9999)), this.isNew = !1)
            }, destroy: function () {
                E(this, this.axis)
            }
        }
    })(L);
    (function (a) {
        var C = a.addEvent,
            B = a.animObject, E = a.arrayMax, H = a.arrayMin, l = a.AxisPlotLineOrBandExtension, d = a.correctFloat, h = a.defaultOptions, g = a.defined, t = a.deg2rad, m = a.destroyObjectProperties, c = a.each, e = a.error, p = a.extend, x = a.fireEvent, A = a.format, b = a.getMagnitude, f = a.grep, q = a.inArray, w = a.isArray, G = a.isNumber, n = a.isString, D = a.merge, K = a.normalizeTickInterval, y = a.pick, I = a.PlotLineOrBand, r = a.removeEvent, z = a.splat, F = a.syncTimeout, N = a.Tick;
        a.Axis = function () {
            this.init.apply(this, arguments)
        };
        a.Axis.prototype = {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: "%H:%M:%S.%L",
                    second: "%H:%M:%S",
                    minute: "%H:%M",
                    hour: "%H:%M",
                    day: "%e. %b",
                    week: "%e. %b",
                    month: "%b '%y",
                    year: "%Y"
                },
                endOnTick: !1,
                labels: {enabled: !0, x: 0},
                minPadding: .01,
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickmarkPlacement: "between",
                tickPixelInterval: 100,
                tickPosition: "outside",
                title: {align: "middle"},
                type: "linear"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {x: -8},
                maxPadding: .05,
                minPadding: .05,
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    enabled: !1, formatter: function () {
                        return a.numberFormat(this.total, -1)
                    }
                }
            },
            defaultLeftAxisOptions: {labels: {x: -15}, title: {rotation: 270}},
            defaultRightAxisOptions: {labels: {x: 15}, title: {rotation: 90}},
            defaultBottomAxisOptions: {labels: {autoRotation: [-45], x: 0}, title: {rotation: 0}},
            defaultTopAxisOptions: {labels: {autoRotation: [-45], x: 0}, title: {rotation: 0}},
            init: function (a, b) {
                var k = b.isX;
                this.chart = a;
                this.horiz = a.inverted ? !k : k;
                this.isXAxis = k;
                this.coll = this.coll || (k ? "xAxis" : "yAxis");
                this.opposite = b.opposite;
                this.side = b.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3);
                this.setOptions(b);
                var v = this.options, f = v.type;
                this.labelFormatter = v.labels.formatter || this.defaultLabelFormatter;
                this.userOptions = b;
                this.minPixelPadding = 0;
                this.reversed = v.reversed;
                this.visible = !1 !== v.visible;
                this.zoomEnabled = !1 !== v.zoomEnabled;
                this.hasNames = "category" === f || !0 === v.categories;
                this.categories = v.categories || this.hasNames;
                this.names = this.names || [];
                this.isLog = "logarithmic" === f;
                this.isDatetimeAxis =
                    "datetime" === f;
                this.isLinked = g(v.linkedTo);
                this.ticks = {};
                this.labelEdge = [];
                this.minorTicks = {};
                this.plotLinesAndBands = [];
                this.alternateBands = {};
                this.len = 0;
                this.minRange = this.userMinRange = v.minRange || v.maxZoom;
                this.range = v.range;
                this.offset = v.offset || 0;
                this.stacks = {};
                this.oldStacks = {};
                this.stacksTouched = 0;
                this.min = this.max = null;
                this.crosshair = y(v.crosshair, z(a.options.tooltip.crosshairs)[k ? 0 : 1], !1);
                var c;
                b = this.options.events;
                -1 === q(this, a.axes) && (k ? a.axes.splice(a.xAxis.length, 0, this) : a.axes.push(this),
                    a[this.coll].push(this));
                this.series = this.series || [];
                a.inverted && k && void 0 === this.reversed && (this.reversed = !0);
                this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
                for (c in b)C(this, c, b[c]);
                this.isLog && (this.val2lin = this.log2lin, this.lin2val = this.lin2log)
            },
            setOptions: function (a) {
                this.options = D(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side],
                    D(h[this.coll], a))
            },
            defaultLabelFormatter: function () {
                var b = this.axis, v = this.value, f = b.categories, c = this.dateTimeLabelFormat, d = h.lang.numericSymbols, e = d && d.length, u, r = b.options.labels.format, b = b.isLog ? v : b.tickInterval;
                if (r)u = A(r, this); else if (f)u = v; else if (c)u = a.dateFormat(c, v); else if (e && 1E3 <= b)for (; e-- && void 0 === u;)f = Math.pow(1E3, e + 1), b >= f && 0 === 10 * v % f && null !== d[e] && 0 !== v && (u = a.numberFormat(v / f, -1) + d[e]);
                void 0 === u && (u = 1E4 <= Math.abs(v) ? a.numberFormat(v, -1) : a.numberFormat(v, -1, void 0, ""));
                return u
            },
            getSeriesExtremes: function () {
                var a = this, b = a.chart;
                a.hasVisibleSeries = !1;
                a.dataMin = a.dataMax = a.threshold = null;
                a.softThreshold = !a.isXAxis;
                a.buildStacks && a.buildStacks();
                c(a.series, function (k) {
                    if (k.visible || !b.options.chart.ignoreHiddenSeries) {
                        var v = k.options, c = v.threshold, d;
                        a.hasVisibleSeries = !0;
                        a.isLog && 0 >= c && (c = null);
                        if (a.isXAxis)v = k.xData, v.length && (k = H(v), G(k) || k instanceof Date || (v = f(v, function (a) {
                            return G(a)
                        }), k = H(v)), a.dataMin = Math.min(y(a.dataMin, v[0]), k), a.dataMax = Math.max(y(a.dataMax, v[0]),
                            E(v))); else if (k.getExtremes(), d = k.dataMax, k = k.dataMin, g(k) && g(d) && (a.dataMin = Math.min(y(a.dataMin, k), k), a.dataMax = Math.max(y(a.dataMax, d), d)), g(c) && (a.threshold = c), !v.softThreshold || a.isLog)a.softThreshold = !1
                    }
                })
            },
            translate: function (a, b, f, c, d, e) {
                var k = this.linkedParent || this, v = 1, r = 0, q = c ? k.oldTransA : k.transA;
                c = c ? k.oldMin : k.min;
                var n = k.minPixelPadding;
                d = (k.isOrdinal || k.isBroken || k.isLog && d) && k.lin2val;
                q || (q = k.transA);
                f && (v *= -1, r = k.len);
                k.reversed && (v *= -1, r -= v * (k.sector || k.len));
                b ? (a = (a * v + r - n) / q + c, d &&
                (a = k.lin2val(a))) : (d && (a = k.val2lin(a)), "between" === e && (e = .5), a = v * (a - c) * q + r + v * n + (G(e) ? q * e * k.pointRange : 0));
                return a
            },
            toPixels: function (a, b) {
                return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
            },
            toValue: function (a, b) {
                return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function (a, b, f, c, d) {
                var k = this.chart, v = this.left, e = this.top, r, q, n = f && k.oldChartHeight || k.chartHeight, g = f && k.oldChartWidth || k.chartWidth, z;
                r = this.transB;
                var w = function (a, b, k) {
                    if (a < b || a > k)c ? a = Math.min(Math.max(b,
                        a), k) : z = !0;
                    return a
                };
                d = y(d, this.translate(a, null, null, f));
                a = f = Math.round(d + r);
                r = q = Math.round(n - d - r);
                G(d) ? this.horiz ? (r = e, q = n - this.bottom, a = f = w(a, v, v + this.width)) : (a = v, f = g - this.right, r = q = w(r, e, e + this.height)) : z = !0;
                return z && !c ? null : k.renderer.crispLine(["M", a, r, "L", f, q], b || 1)
            },
            getLinearTickPositions: function (a, b, f) {
                var k, v = d(Math.floor(b / a) * a), c = d(Math.ceil(f / a) * a), e = [];
                if (b === f && G(b))return [b];
                for (b = v; b <= c;) {
                    e.push(b);
                    b = d(b + a);
                    if (b === k)break;
                    k = b
                }
                return e
            },
            getMinorTickPositions: function () {
                var a = this.options,
                    b = this.tickPositions, f = this.minorTickInterval, c = [], d, e = this.pointRangePadding || 0;
                d = this.min - e;
                var e = this.max + e, r = e - d;
                if (r && r / f < this.len / 3)if (this.isLog)for (e = b.length, d = 1; d < e; d++)c = c.concat(this.getLogTickPositions(f, b[d - 1], b[d], !0)); else if (this.isDatetimeAxis && "auto" === a.minorTickInterval)c = c.concat(this.getTimeTicks(this.normalizeTimeTickInterval(f), d, e, a.startOfWeek)); else for (b = d + (b[0] - d) % f; b <= e; b += f)c.push(b);
                0 !== c.length && this.trimTicks(c, a.startOnTick, a.endOnTick);
                return c
            },
            adjustForMinRange: function () {
                var a =
                    this.options, b = this.min, f = this.max, d, e = this.dataMax - this.dataMin >= this.minRange, r, u, q, n, z, w;
                this.isXAxis && void 0 === this.minRange && !this.isLog && (g(a.min) || g(a.max) ? this.minRange = null : (c(this.series, function (a) {
                    n = a.xData;
                    for (u = z = a.xIncrement ? 1 : n.length - 1; 0 < u; u--)if (q = n[u] - n[u - 1], void 0 === r || q < r)r = q
                }), this.minRange = Math.min(5 * r, this.dataMax - this.dataMin)));
                f - b < this.minRange && (w = this.minRange, d = (w - f + b) / 2, d = [b - d, y(a.min, b - d)], e && (d[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), b = E(d), f = [b + w, y(a.max,
                    b + w)], e && (f[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), f = H(f), f - b < w && (d[0] = f - w, d[1] = y(a.min, f - w), b = E(d)));
                this.min = b;
                this.max = f
            },
            getClosest: function () {
                var a;
                this.categories ? a = 1 : c(this.series, function (b) {
                    var k = b.closestPointRange;
                    !b.noSharedTooltip && g(k) && (a = g(a) ? Math.min(a, k) : k)
                });
                return a
            },
            nameToX: function (a) {
                var b = w(this.categories), k = b ? this.categories : this.names, f = a.options.x, c;
                a.series.requireSorting = !1;
                g(f) || (f = !1 === this.options.uniqueNames ? a.series.autoIncrement() : q(a.name, k));
                -1 ===
                f ? b || (c = k.length) : c = f;
                this.names[c] = a.name;
                return c
            },
            updateNames: function () {
                var a = this;
                0 < this.names.length && (this.names.length = 0, this.minRange = void 0, c(this.series || [], function (b) {
                    if (!b.points || b.isDirtyData)b.processData(), b.generatePoints();
                    c(b.points, function (k, f) {
                        var c;
                        k.options && void 0 === k.options.x && (c = a.nameToX(k), c !== k.x && (k.x = c, b.xData[f] = c))
                    })
                }))
            },
            setAxisTranslation: function (a) {
                var b = this, k = b.max - b.min, f = b.axisPointRange || 0, d, e = 0, r = 0, q = b.linkedParent, g = !!b.categories, z = b.transA, w = b.isXAxis;
                if (w || g || f)q ? (e = q.minPointOffset, r = q.pointRangePadding) : (d = b.getClosest(), c(b.series, function (a) {
                    var k = g ? 1 : w ? y(a.options.pointRange, d, 0) : b.axisPointRange || 0;
                    a = a.options.pointPlacement;
                    f = Math.max(f, k);
                    b.single || (e = Math.max(e, n(a) ? 0 : k / 2), r = Math.max(r, "on" === a ? 0 : k))
                })), q = b.ordinalSlope && d ? b.ordinalSlope / d : 1, b.minPointOffset = e *= q, b.pointRangePadding = r *= q, b.pointRange = Math.min(f, k), w && (b.closestPointRange = d);
                a && (b.oldTransA = z);
                b.translationSlope = b.transA = z = b.len / (k + r || 1);
                b.transB = b.horiz ? b.left : b.bottom;
                b.minPixelPadding = z * e
            },
            minFromRange: function () {
                return this.max - this.range
            },
            setTickInterval: function (a) {
                var k = this, f = k.chart, r = k.options, q = k.isLog, n = k.log2lin, u = k.isDatetimeAxis, z = k.isXAxis, w = k.isLinked, p = r.maxPadding, h = r.minPadding, F = r.tickInterval, D = r.tickPixelInterval, m = k.categories, A = k.threshold, N = k.softThreshold, l, t, I, C;
                u || m || w || this.getTickAmount();
                I = y(k.userMin, r.min);
                C = y(k.userMax, r.max);
                w ? (k.linkedParent = f[k.coll][r.linkedTo], f = k.linkedParent.getExtremes(), k.min = y(f.min, f.dataMin), k.max = y(f.max,
                    f.dataMax), r.type !== k.linkedParent.options.type && e(11, 1)) : (!N && g(A) && (k.dataMin >= A ? (l = A, h = 0) : k.dataMax <= A && (t = A, p = 0)), k.min = y(I, l, k.dataMin), k.max = y(C, t, k.dataMax));
                q && (!a && 0 >= Math.min(k.min, y(k.dataMin, k.min)) && e(10, 1), k.min = d(n(k.min), 15), k.max = d(n(k.max), 15));
                k.range && g(k.max) && (k.userMin = k.min = I = Math.max(k.min, k.minFromRange()), k.userMax = C = k.max, k.range = null);
                x(k, "foundExtremes");
                k.beforePadding && k.beforePadding();
                k.adjustForMinRange();
                !(m || k.axisPointRange || k.usePercentage || w) && g(k.min) && g(k.max) &&
                (n = k.max - k.min) && (!g(I) && h && (k.min -= n * h), !g(C) && p && (k.max += n * p));
                G(r.floor) ? k.min = Math.max(k.min, r.floor) : G(r.softMin) && (k.min = Math.min(k.min, r.softMin));
                G(r.ceiling) ? k.max = Math.min(k.max, r.ceiling) : G(r.softMax) && (k.max = Math.max(k.max, r.softMax));
                N && g(k.dataMin) && (A = A || 0, !g(I) && k.min < A && k.dataMin >= A ? k.min = A : !g(C) && k.max > A && k.dataMax <= A && (k.max = A));
                k.tickInterval = k.min === k.max || void 0 === k.min || void 0 === k.max ? 1 : w && !F && D === k.linkedParent.options.tickPixelInterval ? F = k.linkedParent.tickInterval : y(F, this.tickAmount ?
                (k.max - k.min) / Math.max(this.tickAmount - 1, 1) : void 0, m ? 1 : (k.max - k.min) * D / Math.max(k.len, D));
                z && !a && c(k.series, function (a) {
                    a.processData(k.min !== k.oldMin || k.max !== k.oldMax)
                });
                k.setAxisTranslation(!0);
                k.beforeSetTickPositions && k.beforeSetTickPositions();
                k.postProcessTickInterval && (k.tickInterval = k.postProcessTickInterval(k.tickInterval));
                k.pointRange && !F && (k.tickInterval = Math.max(k.pointRange, k.tickInterval));
                a = y(r.minTickInterval, k.isDatetimeAxis && k.closestPointRange);
                !F && k.tickInterval < a && (k.tickInterval =
                    a);
                u || q || F || (k.tickInterval = K(k.tickInterval, null, b(k.tickInterval), y(r.allowDecimals, !(.5 < k.tickInterval && 5 > k.tickInterval && 1E3 < k.max && 9999 > k.max)), !!this.tickAmount));
                this.tickAmount || (k.tickInterval = k.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function () {
                var a = this.options, b, f = a.tickPositions, c = a.tickPositioner, d = a.startOnTick, e = a.endOnTick, r;
                this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === a.minorTickInterval &&
                this.tickInterval ? this.tickInterval / 5 : a.minorTickInterval;
                this.tickPositions = b = f && f.slice();
                !b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0], b.pop()]), this.tickPositions = b, c && (c = c.apply(this, [this.min,
                    this.max]))) && (this.tickPositions = b = c);
                this.isLinked || (this.trimTicks(b, d, e), this.min === this.max && g(this.min) && !this.tickAmount && (r = !0, this.min -= .5, this.max += .5), this.single = r, f || c || this.adjustTickAmount())
            },
            trimTicks: function (a, b, f) {
                var k = a[0], c = a[a.length - 1], d = this.minPointOffset || 0;
                if (b)this.min = k; else for (; this.min - d > a[0];)a.shift();
                if (f)this.max = c; else for (; this.max + d < a[a.length - 1];)a.pop();
                0 === a.length && g(k) && a.push((c + k) / 2)
            },
            alignToOthers: function () {
                var a = {}, b, f = this.options;
                !1 !== this.chart.options.chart.alignTicks &&
                !1 !== f.alignTicks && c(this.chart[this.coll], function (k) {
                    var f = k.options, f = [k.horiz ? f.left : f.top, f.width, f.height, f.pane].join();
                    k.series.length && (a[f] ? b = !0 : a[f] = 1)
                });
                return b
            },
            getTickAmount: function () {
                var a = this.options, b = a.tickAmount, f = a.tickPixelInterval;
                !g(a.tickInterval) && this.len < f && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
                !b && this.alignToOthers() && (b = Math.ceil(this.len / f) + 1);
                4 > b && (this.finalTickAmt = b, b = 5);
                this.tickAmount = b
            },
            adjustTickAmount: function () {
                var a = this.tickInterval,
                    b = this.tickPositions, f = this.tickAmount, c = this.finalTickAmt, e = b && b.length;
                if (e < f) {
                    for (; b.length < f;)b.push(d(b[b.length - 1] + a));
                    this.transA *= (e - 1) / (f - 1);
                    this.max = b[b.length - 1]
                } else e > f && (this.tickInterval *= 2, this.setTickPositions());
                if (g(c)) {
                    for (a = f = b.length; a--;)(3 === c && 1 === a % 2 || 2 >= c && 0 < a && a < f - 1) && b.splice(a, 1);
                    this.finalTickAmt = void 0
                }
            },
            setScale: function () {
                var a, b;
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                b = this.len !== this.oldAxisLength;
                c(this.series,
                    function (b) {
                        if (b.isDirtyData || b.isDirty || b.xAxis.isDirty)a = !0
                    });
                b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks()
            },
            setExtremes: function (a, b, f, d, e) {
                var k =
                    this, r = k.chart;
                f = y(f, !0);
                c(k.series, function (a) {
                    delete a.kdTree
                });
                e = p(e, {min: a, max: b});
                x(k, "setExtremes", e, function () {
                    k.userMin = a;
                    k.userMax = b;
                    k.eventArgs = e;
                    f && r.redraw(d)
                })
            },
            zoom: function (a, b) {
                var k = this.dataMin, f = this.dataMax, c = this.options, d = Math.min(k, y(c.min, k)), c = Math.max(f, y(c.max, f));
                if (a !== this.min || b !== this.max)this.allowZoomOutside || (g(k) && a <= d && (a = d), g(f) && b >= c && (b = c)), this.displayBtn = void 0 !== a || void 0 !== b, this.setExtremes(a, b, !1, void 0, {trigger: "zoom"});
                return !0
            },
            setAxisSize: function () {
                var a =
                    this.chart, b = this.options, f = b.offsetLeft || 0, c = this.horiz, d = y(b.width, a.plotWidth - f + (b.offsetRight || 0)), e = y(b.height, a.plotHeight), r = y(b.top, a.plotTop), b = y(b.left, a.plotLeft + f), f = /%$/;
                f.test(e) && (e = Math.round(parseFloat(e) / 100 * a.plotHeight));
                f.test(r) && (r = Math.round(parseFloat(r) / 100 * a.plotHeight + a.plotTop));
                this.left = b;
                this.top = r;
                this.width = d;
                this.height = e;
                this.bottom = a.chartHeight - e - r;
                this.right = a.chartWidth - d - b;
                this.len = Math.max(c ? d : e, 0);
                this.pos = c ? b : r
            },
            getExtremes: function () {
                var a = this.isLog, b =
                    this.lin2log;
                return {
                    min: a ? d(b(this.min)) : this.min,
                    max: a ? d(b(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function (a) {
                var b = this.isLog, k = this.lin2log, f = b ? k(this.min) : this.min, b = b ? k(this.max) : this.max;
                null === a ? a = f : f > a ? a = f : b < a && (a = b);
                return this.translate(a, 0, 1, 0, 1)
            },
            autoLabelAlign: function (a) {
                a = (y(a, 0) - 90 * this.side + 720) % 360;
                return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
            },
            tickSize: function (a) {
                var b = this.options, k = b[a +
                "Length"], f = y(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
                if (f && k)return "inside" === b[a + "Position"] && (k = -k), [k, f]
            },
            labelMetrics: function () {
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[0] && this.ticks[0].label)
            },
            unsquish: function () {
                var a = this.options.labels, b = this.horiz, f = this.tickInterval, d = f, e = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / f), r, q = a.rotation, n = this.labelMetrics(), z, w = Number.MAX_VALUE, p, h = function (a) {
                    a /= e || 1;
                    a = 1 <
                    a ? Math.ceil(a) : 1;
                    return a * f
                };
                b ? (p = !a.staggerLines && !a.step && (g(q) ? [q] : e < y(a.autoRotationLimit, 80) && a.autoRotation)) && c(p, function (a) {
                    var b;
                    if (a === q || a && -90 <= a && 90 >= a)z = h(Math.abs(n.h / Math.sin(t * a))), b = z + Math.abs(a / 360), b < w && (w = b, r = a, d = z)
                }) : a.step || (d = h(n.h));
                this.autoRotation = p;
                this.labelRotation = y(r, q);
                return d
            },
            getSlotWidth: function () {
                var a = this.chart, b = this.horiz, f = this.options.labels, c = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1), d = a.margin[3];
                return b && 2 > (f.step || 0) && !f.rotation &&
                    (this.staggerLines || 1) * a.plotWidth / c || !b && (d && d - a.spacing[3] || .33 * a.chartWidth)
            },
            renderUnsquish: function () {
                var a = this.chart, b = a.renderer, f = this.tickPositions, d = this.ticks, e = this.options.labels, r = this.horiz, q = this.getSlotWidth(), z = Math.max(1, Math.round(q - 2 * (e.padding || 5))), g = {}, w = this.labelMetrics(), p = e.style && e.style.textOverflow, h, y = 0, x, F;
                n(e.rotation) || (g.rotation = e.rotation || 0);
                c(f, function (a) {
                    (a = d[a]) && a.labelLength > y && (y = a.labelLength)
                });
                this.maxLabelLength = y;
                if (this.autoRotation)y > z && y > w.h ?
                    g.rotation = this.labelRotation : this.labelRotation = 0; else if (q && (h = {width: z + "px"}, !p))for (h.textOverflow = "clip", x = f.length; !r && x--;)if (F = f[x], z = d[F].label)z.styles && "ellipsis" === z.styles.textOverflow ? z.css({textOverflow: "clip"}) : d[F].labelLength > q && z.css({width: q + "px"}), z.getBBox().height > this.len / f.length - (w.h - w.f) && (z.specCss = {textOverflow: "ellipsis"});
                g.rotation && (h = {width: (y > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight) + "px"}, p || (h.textOverflow = "ellipsis"));
                if (this.labelAlign = e.align || this.autoLabelAlign(this.labelRotation))g.align =
                    this.labelAlign;
                c(f, function (a) {
                    var b = (a = d[a]) && a.label;
                    b && (b.attr(g), h && b.css(D(h, b.specCss)), delete b.specCss, a.rotation = g.rotation)
                });
                this.tickRotCorr = b.rotCorr(w.b, this.labelRotation || 0, 0 !== this.side)
            },
            hasData: function () {
                return this.hasVisibleSeries || g(this.min) && g(this.max) && !!this.tickPositions
            },
            getOffset: function () {
                var a = this, b = a.chart, f = b.renderer, d = a.options, e = a.tickPositions, r = a.ticks, q = a.horiz, n = a.side, z = b.inverted ? [1, 0, 3, 2][n] : n, w, p, h = 0, x, F = 0, D = d.title, A = d.labels, G = 0, m = a.opposite, K = b.axisOffset,
                    b = b.clipOffset, l = [-1, 1, 1, -1][n], t, I = d.className, C = a.axisParent, B = this.tickSize("tick");
                w = a.hasData();
                a.showAxis = p = w || y(d.showEmpty, !0);
                a.staggerLines = a.horiz && A.staggerLines;
                a.axisGroup || (a.gridGroup = f.g("grid").attr({zIndex: d.gridZIndex || 1}).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (I || "")).add(C), a.axisGroup = f.g("axis").attr({zIndex: d.zIndex || 2}).addClass("highcharts-" + this.coll.toLowerCase() + " " + (I || "")).add(C), a.labelGroup = f.g("axis-labels").attr({zIndex: A.zIndex || 7}).addClass("highcharts-" +
                    a.coll.toLowerCase() + "-labels " + (I || "")).add(C));
                if (w || a.isLinked)c(e, function (b) {
                    r[b] ? r[b].addLabel() : r[b] = new N(a, b)
                }), a.renderUnsquish(), !1 === A.reserveSpace || 0 !== n && 2 !== n && {
                    1: "left",
                    3: "right"
                }[n] !== a.labelAlign && "center" !== a.labelAlign || c(e, function (a) {
                    G = Math.max(r[a].getLabelSize(), G)
                }), a.staggerLines && (G *= a.staggerLines, a.labelOffset = G * (a.opposite ? -1 : 1)); else for (t in r)r[t].destroy(), delete r[t];
                D && D.text && !1 !== D.enabled && (a.axisTitle || ((t = D.textAlign) || (t = (q ? {
                    low: "left",
                    middle: "center",
                    high: "right"
                } :
                {
                    low: m ? "right" : "left",
                    middle: "center",
                    high: m ? "left" : "right"
                })[D.align]), a.axisTitle = f.text(D.text, 0, 0, D.useHTML).attr({
                    zIndex: 7,
                    rotation: D.rotation || 0,
                    align: t
                }).addClass("highcharts-axis-title").add(a.axisGroup), a.axisTitle.isNew = !0), p && (h = a.axisTitle.getBBox()[q ? "height" : "width"], x = D.offset, F = g(x) ? 0 : y(D.margin, q ? 5 : 10)), a.axisTitle[p ? "show" : "hide"](!0));
                a.renderLine();
                a.offset = l * y(d.offset, K[n]);
                a.tickRotCorr = a.tickRotCorr || {x: 0, y: 0};
                f = 0 === n ? -a.labelMetrics().h : 2 === n ? a.tickRotCorr.y : 0;
                F = Math.abs(G) +
                    F;
                G && (F = F - f + l * (q ? y(A.y, a.tickRotCorr.y + 8 * l) : A.x));
                a.axisTitleMargin = y(x, F);
                K[n] = Math.max(K[n], a.axisTitleMargin + h + l * a.offset, F, w && e.length && B ? B[0] : 0);
                d = d.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                b[z] = Math.max(b[z], d)
            },
            getLinePath: function (a) {
                var b = this.chart, f = this.opposite, k = this.offset, c = this.horiz, d = this.left + (f ? this.width : 0) + k, k = b.chartHeight - this.bottom - (f ? this.height : 0) + k;
                f && (a *= -1);
                return b.renderer.crispLine(["M", c ? this.left : d, c ? k : this.top, "L", c ? b.chartWidth - this.right : d, c ? k : b.chartHeight -
                this.bottom], a)
            },
            renderLine: function () {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup))
            },
            getTitlePosition: function () {
                var a = this.horiz, b = this.left, f = this.top, c = this.len, d = this.options.title, e = a ? b : f, r = this.opposite, q = this.offset, n = d.x || 0, z = d.y || 0, g = this.chart.renderer.fontMetrics(d.style && d.style.fontSize, this.axisTitle).f, c = {
                    low: e + (a ? 0 : c),
                    middle: e + c / 2,
                    high: e + (a ? c : 0)
                }[d.align], b = (a ? f + this.height : b) + (a ? 1 : -1) * (r ? -1 : 1) * this.axisTitleMargin +
                    (2 === this.side ? g : 0);
                return {
                    x: a ? c + n : b + (r ? this.width : 0) + q + n,
                    y: a ? b + z - (r ? this.height : 0) + q : c + z
                }
            },
            render: function () {
                var a = this, b = a.chart, f = b.renderer, d = a.options, e = a.isLog, r = a.lin2log, q = a.isLinked, n = a.tickPositions, z = a.axisTitle, g = a.ticks, w = a.minorTicks, p = a.alternateBands, h = d.stackLabels, y = d.alternateGridColor, x = a.tickmarkOffset, D = a.axisLine, A = b.hasRendered && G(a.oldMin), m = a.showAxis, K = B(f.globalAnimation), l, t;
                a.labelEdge.length = 0;
                a.overlap = !1;
                c([g, w, p], function (a) {
                    for (var b in a)a[b].isActive = !1
                });
                if (a.hasData() ||
                    q)a.minorTickInterval && !a.categories && c(a.getMinorTickPositions(), function (b) {
                    w[b] || (w[b] = new N(a, b, "minor"));
                    A && w[b].isNew && w[b].render(null, !0);
                    w[b].render(null, !1, 1)
                }), n.length && (c(n, function (b, f) {
                    if (!q || b >= a.min && b <= a.max)g[b] || (g[b] = new N(a, b)), A && g[b].isNew && g[b].render(f, !0, .1), g[b].render(f)
                }), x && (0 === a.min || a.single) && (g[-1] || (g[-1] = new N(a, -1, null, !0)), g[-1].render(-1))), y && c(n, function (f, c) {
                    t = void 0 !== n[c + 1] ? n[c + 1] + x : a.max - x;
                    0 === c % 2 && f < a.max && t <= a.max + (b.polar ? -x : x) && (p[f] || (p[f] = new I(a)),
                        l = f + x, p[f].options = {
                        from: e ? r(l) : l,
                        to: e ? r(t) : t,
                        color: y
                    }, p[f].render(), p[f].isActive = !0)
                }), a._addedPlotLB || (c((d.plotLines || []).concat(d.plotBands || []), function (b) {
                    a.addPlotBandOrLine(b)
                }), a._addedPlotLB = !0);
                c([g, w, p], function (a) {
                    var f, c, k = [], d = K.duration;
                    for (f in a)a[f].isActive || (a[f].render(f, !1, 0), a[f].isActive = !1, k.push(f));
                    F(function () {
                        for (c = k.length; c--;)a[k[c]] && !a[k[c]].isActive && (a[k[c]].destroy(), delete a[k[c]])
                    }, a !== p && b.hasRendered && d ? d : 0)
                });
                D && (D[D.isPlaced ? "animate" : "attr"]({d: this.getLinePath(D.strokeWidth())}),
                    D.isPlaced = !0, D[m ? "show" : "hide"](!0));
                z && m && (z[z.isNew ? "attr" : "animate"](a.getTitlePosition()), z.isNew = !1);
                h && h.enabled && a.renderStackTotals();
                a.isDirty = !1
            },
            redraw: function () {
                this.visible && (this.render(), c(this.plotLinesAndBands, function (a) {
                    a.render()
                }));
                c(this.series, function (a) {
                    a.isDirty = !0
                })
            },
            destroy: function (a) {
                var b = this, f = b.stacks, d, k = b.plotLinesAndBands, e;
                a || r(b);
                for (d in f)m(f[d]), f[d] = null;
                c([b.ticks, b.minorTicks, b.alternateBands], function (a) {
                    m(a)
                });
                if (k)for (a = k.length; a--;)k[a].destroy();
                c("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "), function (a) {
                    b[a] && (b[a] = b[a].destroy())
                });
                k = "extKey hcEvents names series userMax userMin".split(" ");
                for (e in b)b.hasOwnProperty(e) && -1 === q(e, k) && delete b[e]
            },
            drawCrosshair: function (a, b) {
                var f, c = this.crosshair, d = y(c.snap, !0), k, e = this.cross;
                a || (a = this.cross && this.cross.e);
                this.crosshair && !1 !== (g(b) || !d) ? (d ? g(b) && (k = this.isXAxis ? b.plotX : this.len - b.plotY) : k = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos),
                g(k) && (f = this.getPlotLinePath(b && (this.isXAxis ? b.x : y(b.stackY, b.y)), null, null, null, k) || null), g(f) ? (b = this.categories && !this.isRadial, e || (this.cross = e = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (b ? "category " : "thin ") + c.className).attr({zIndex: y(c.zIndex, 2)}).add()), e.show().attr({d: f}), b && !c.width && e.attr({"stroke-width": this.transA}), this.cross.e = a) : this.hideCrosshair()) : this.hideCrosshair()
            },
            hideCrosshair: function () {
                this.cross && this.cross.hide()
            }
        };
        p(a.Axis.prototype,
            l)
    })(L);
    (function (a) {
        var C = a.Axis, B = a.Date, E = a.dateFormat, H = a.defaultOptions, l = a.defined, d = a.each, h = a.extend, g = a.getMagnitude, t = a.getTZOffset, m = a.normalizeTickInterval, c = a.pick, e = a.timeUnits;
        C.prototype.getTimeTicks = function (a, g, A, b) {
            var f = [], q = {}, w = H.global.useUTC, p, n = new B(g - t(g)), x, m = B.hcMakeTime, y = a.unitRange, I = a.count, r;
            if (l(g)) {
                n[B.hcSetMilliseconds](y >= e.second ? 0 : I * Math.floor(n.getMilliseconds() / I));
                if (y >= e.second)n[B.hcSetSeconds](y >= e.minute ? 0 : I * Math.floor(n.getSeconds() / I));
                if (y >= e.minute)n[B.hcSetMinutes](y >=
                e.hour ? 0 : I * Math.floor(n[B.hcGetMinutes]() / I));
                y >= e.hour && (n[B.hcSetHours](y >= e.day ? 0 : I * Math.floor(n[B.hcGetHours]() / I)), x = n[B.hcGetHours]());
                if (y >= e.day)n[B.hcSetDate](y >= e.month ? 1 : I * Math.floor(n[B.hcGetDate]() / I));
                y >= e.month && (n[B.hcSetMonth](y >= e.year ? 0 : I * Math.floor(n[B.hcGetMonth]() / I)), p = n[B.hcGetFullYear]());
                if (y >= e.year)n[B.hcSetFullYear](p - p % I);
                if (y === e.week)n[B.hcSetDate](n[B.hcGetDate]() - n[B.hcGetDay]() + c(b, 1));
                b = 1;
                if (B.hcTimezoneOffset || B.hcGetTimezoneOffset)r = (!w || !!B.hcGetTimezoneOffset) &&
                    (A - g > 4 * e.month || t(g) !== t(A)), n = n.getTime(), n = new B(n + t(n));
                p = n[B.hcGetFullYear]();
                g = n.getTime();
                w = n[B.hcGetMonth]();
                for (n = n[B.hcGetDate](); g < A;)f.push(g), g = y === e.year ? m(p + b * I, 0) : y === e.month ? m(p, w + b * I) : !r || y !== e.day && y !== e.week ? r && y === e.hour ? m(p, w, n, x + b * I) : g + y * I : m(p, w, n + b * I * (y === e.day ? 1 : 7)), b++;
                f.push(g);
                y <= e.hour && d(f, function (a) {
                    "000000000" === E("%H%M%S%L", a) && (q[a] = "day")
                })
            }
            f.info = h(a, {higherRanks: q, totalRange: y * I});
            return f
        };
        C.prototype.normalizeTimeTickInterval = function (a, c) {
            var d = c || [["millisecond",
                    [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]];
            c = d[d.length - 1];
            var b = e[c[0]], f = c[1], q;
            for (q = 0; q < d.length && !(c = d[q], b = e[c[0]], f = c[1], d[q + 1] && a <= (b * f[f.length - 1] + e[d[q + 1][0]]) / 2); q++);
            b === e.year && a < 5 * b && (f = [1, 2, 5]);
            a = m(a / b, f, "year" === c[0] ? Math.max(g(a / b), 1) : 1);
            return {unitRange: b, count: a, unitName: c[0]}
        }
    })(L);
    (function (a) {
        var C = a.Axis, B = a.getMagnitude, E = a.map, H = a.normalizeTickInterval,
            l = a.pick;
        C.prototype.getLogTickPositions = function (a, h, g, t) {
            var d = this.options, c = this.len, e = this.lin2log, p = this.log2lin, x = [];
            t || (this._minorAutoInterval = null);
            if (.5 <= a)a = Math.round(a), x = this.getLinearTickPositions(a, h, g); else if (.08 <= a)for (var c = Math.floor(h), A, b, f, q, w, d = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; c < g + 1 && !w; c++)for (b = d.length, A = 0; A < b && !w; A++)f = p(e(c) * d[A]), f > h && (!t || q <= g) && void 0 !== q && x.push(q), q > g && (w = !0), q = f; else h = e(h), g = e(g), a = d[t ? "minorTickInterval" : "tickInterval"], a = l("auto" ===
            a ? null : a, this._minorAutoInterval, d.tickPixelInterval / (t ? 5 : 1) * (g - h) / ((t ? c / this.tickPositions.length : c) || 1)), a = H(a, null, B(a)), x = E(this.getLinearTickPositions(a, h, g), p), t || (this._minorAutoInterval = a / 5);
            t || (this.tickInterval = a);
            return x
        };
        C.prototype.log2lin = function (a) {
            return Math.log(a) / Math.LN10
        };
        C.prototype.lin2log = function (a) {
            return Math.pow(10, a)
        }
    })(L);
    (function (a) {
        var C = a.dateFormat, B = a.each, E = a.extend, H = a.format, l = a.isNumber, d = a.map, h = a.merge, g = a.pick, t = a.splat, m = a.stop, c = a.syncTimeout, e = a.timeUnits;
        a.Tooltip = function () {
            this.init.apply(this, arguments)
        };
        a.Tooltip.prototype = {
            init: function (a, c) {
                this.chart = a;
                this.options = c;
                this.crosshairs = [];
                this.now = {x: 0, y: 0};
                this.isHidden = !0;
                this.split = c.split && !a.inverted;
                this.shared = c.shared || this.split
            }, cleanSplit: function (a) {
                B(this.chart.series, function (c) {
                    var d = c && c.tt;
                    d && (!d.isActive || a ? c.tt = d.destroy() : d.isActive = !1)
                })
            }, getLabel: function () {
                var a = this.chart.renderer, c = this.options;
                this.label || (this.label = this.split ? a.g("tooltip") : a.label("", 0, 0, c.shape ||
                    "callout", null, null, c.useHTML, null, "tooltip").attr({
                    padding: c.padding,
                    r: c.borderRadius
                }), this.label.attr({zIndex: 8}).add());
                return this.label
            }, update: function (a) {
                this.destroy();
                this.init(this.chart, h(!0, this.options, a))
            }, destroy: function () {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                clearTimeout(this.hideTimer);
                clearTimeout(this.tooltipTimeout)
            }, move: function (a, c, d, b) {
                var f = this, e = f.now, g = !1 !== f.options.animation && !f.isHidden &&
                    (1 < Math.abs(a - e.x) || 1 < Math.abs(c - e.y)), p = f.followPointer || 1 < f.len;
                E(e, {
                    x: g ? (2 * e.x + a) / 3 : a,
                    y: g ? (e.y + c) / 2 : c,
                    anchorX: p ? void 0 : g ? (2 * e.anchorX + d) / 3 : d,
                    anchorY: p ? void 0 : g ? (e.anchorY + b) / 2 : b
                });
                f.getLabel().attr(e);
                g && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
                    f && f.move(a, c, d, b)
                }, 32))
            }, hide: function (a) {
                var d = this;
                clearTimeout(this.hideTimer);
                a = g(a, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = c(function () {
                    d.getLabel()[a ? "fadeOut" : "hide"]();
                    d.isHidden = !0
                }, a))
            }, getAnchor: function (a,
                                    c) {
                var e, b = this.chart, f = b.inverted, q = b.plotTop, g = b.plotLeft, p = 0, n = 0, h, m;
                a = t(a);
                e = a[0].tooltipPos;
                this.followPointer && c && (void 0 === c.chartX && (c = b.pointer.normalize(c)), e = [c.chartX - b.plotLeft, c.chartY - q]);
                e || (B(a, function (a) {
                    h = a.series.yAxis;
                    m = a.series.xAxis;
                    p += a.plotX + (!f && m ? m.left - g : 0);
                    n += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!f && h ? h.top - q : 0)
                }), p /= a.length, n /= a.length, e = [f ? b.plotWidth - n : p, this.shared && !f && 1 < a.length && c ? c.chartY - q : f ? b.plotHeight - p : n]);
                return d(e, Math.round)
            }, getPosition: function (a,
                                      c, d) {
                var b = this.chart, f = this.distance, e = {}, w = d.h || 0, p, n = ["y", b.chartHeight, c, d.plotY + b.plotTop, b.plotTop, b.plotTop + b.plotHeight], h = ["x", b.chartWidth, a, d.plotX + b.plotLeft, b.plotLeft, b.plotLeft + b.plotWidth], m = !this.followPointer && g(d.ttBelow, !b.inverted === !!d.negative), y = function (a, b, c, d, r, n) {
                    var k = c < d - f, g = d + f + c < b, q = d - f - c;
                    d += f;
                    if (m && g)e[a] = d; else if (!m && k)e[a] = q; else if (k)e[a] = Math.min(n - c, 0 > q - w ? q : q - w); else if (g)e[a] = Math.max(r, d + w + c > b ? d : d + w); else return !1
                }, x = function (a, b, c, d) {
                    var k;
                    d < f || d > b - f ? k = !1 :
                        e[a] = d < c / 2 ? 1 : d > b - c / 2 ? b - c - 2 : d - c / 2;
                    return k
                }, r = function (a) {
                    var b = n;
                    n = h;
                    h = b;
                    p = a
                }, z = function () {
                    !1 !== y.apply(0, n) ? !1 !== x.apply(0, h) || p || (r(!0), z()) : p ? e.x = e.y = 0 : (r(!0), z())
                };
                (b.inverted || 1 < this.len) && r();
                z();
                return e
            }, defaultFormatter: function (a) {
                var c = this.points || t(this), d;
                d = [a.tooltipFooterHeaderFormatter(c[0])];
                d = d.concat(a.bodyFormatter(c));
                d.push(a.tooltipFooterHeaderFormatter(c[0], !0));
                return d
            }, refresh: function (a, c) {
                var d = this.chart, b = this.getLabel(), f, e, w = {}, h, n = [];
                h = this.options.formatter || this.defaultFormatter;
                var w = d.hoverPoints, p = this.shared;
                clearTimeout(this.hideTimer);
                this.followPointer = t(a)[0].series.tooltipOptions.followPointer;
                e = this.getAnchor(a, c);
                c = e[0];
                f = e[1];
                !p || a.series && a.series.noSharedTooltip ? w = a.getLabelConfig() : (d.hoverPoints = a, w && B(w, function (a) {
                    a.setState()
                }), B(a, function (a) {
                    a.setState("hover");
                    n.push(a.getLabelConfig())
                }), w = {x: a[0].category, y: a[0].y}, w.points = n, this.len = n.length, a = a[0]);
                h = h.call(w, this);
                w = a.series;
                this.distance = g(w.tooltipOptions.distance, 16);
                !1 === h ? this.hide() : (this.isHidden &&
                (m(b), b.attr({opacity: 1}).show()), this.split ? this.renderSplit(h, d.hoverPoints) : (b.attr({text: h.join ? h.join("") : h}), b.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + g(a.colorIndex, w.colorIndex)), this.updatePosition({
                    plotX: c,
                    plotY: f,
                    negative: a.negative,
                    ttBelow: a.ttBelow,
                    h: e[2] || 0
                })), this.isHidden = !1)
            }, renderSplit: function (c, d) {
                var e = this, b = [], f = this.chart, q = f.renderer, w = !0, h = this.options, n, p = this.getLabel();
                B(c.slice(0, c.length - 1), function (a, c) {
                    c = d[c - 1] || {isHeader: !0, plotX: d[0].plotX};
                    var y = c.series || e, r = y.tt, z = "highcharts-color-" + g(c.colorIndex, (c.series || {}).colorIndex, "none");
                    r || (y.tt = r = q.label(null, null, null, c.isHeader && "callout").addClass("highcharts-tooltip-box " + z).attr({
                        padding: h.padding,
                        r: h.borderRadius
                    }).add(p), c.series && (r.connector = q.path().addClass("highcharts-tooltip-connector " + z).add(r)));
                    r.isActive = !0;
                    r.attr({text: a});
                    a = r.getBBox();
                    z = a.width + r.strokeWidth();
                    c.isHeader ? (n = a.height, z = Math.max(0, Math.min(c.plotX + f.plotLeft - z / 2, f.chartWidth - z))) : z = c.plotX + f.plotLeft -
                        g(h.distance, 16) - z;
                    0 > z && (w = !1);
                    a = (c.series && c.series.yAxis && c.series.yAxis.pos) + (c.plotY || 0);
                    a -= f.plotTop;
                    b.push({
                        target: c.isHeader ? f.plotHeight + n : a,
                        rank: c.isHeader ? 1 : 0,
                        size: y.tt.getBBox().height + 1,
                        point: c,
                        x: z,
                        tt: r
                    })
                });
                this.cleanSplit();
                a.distribute(b, f.plotHeight + n);
                B(b, function (a) {
                    var b = a.point, c = a.tt, d;
                    d = {
                        visibility: void 0 === a.pos ? "hidden" : "inherit",
                        x: w || b.isHeader ? a.x : b.plotX + f.plotLeft + g(h.distance, 16),
                        y: a.pos + f.plotTop
                    };
                    b.isHeader && (d.anchorX = b.plotX + f.plotLeft, d.anchorY = d.y - 100);
                    c.attr(d);
                    b.isHeader || c.connector.attr({d: ["M", b.plotX + f.plotLeft - d.x, b.plotY + b.series.yAxis.pos - d.y, "L", (w ? -1 : 1) * g(h.distance, 16) + b.plotX + f.plotLeft - d.x, a.pos + f.plotTop + c.getBBox().height / 2 - d.y]})
                })
            }, updatePosition: function (a) {
                var c = this.chart, d = this.getLabel(), d = (this.options.positioner || this.getPosition).call(this, d.width, d.height, a);
                this.move(Math.round(d.x), Math.round(d.y || 0), a.plotX + c.plotLeft, a.plotY + c.plotTop)
            }, getXDateFormat: function (a, c, d) {
                var b;
                c = c.dateTimeLabelFormats;
                var f = d && d.closestPointRange,
                    g, w = {millisecond: 15, second: 12, minute: 9, hour: 6, day: 3}, h, n = "millisecond";
                if (f) {
                    h = C("%m-%d %H:%M:%S.%L", a.x);
                    for (g in e) {
                        if (f === e.week && +C("%w", a.x) === d.options.startOfWeek && "00:00:00.000" === h.substr(6)) {
                            g = "week";
                            break
                        }
                        if (e[g] > f) {
                            g = n;
                            break
                        }
                        if (w[g] && h.substr(w[g]) !== "01-01 00:00:00.000".substr(w[g]))break;
                        "week" !== g && (n = g)
                    }
                    g && (b = c[g])
                } else b = c.day;
                return b || c.year
            }, tooltipFooterHeaderFormatter: function (a, c) {
                var d = c ? "footer" : "header";
                c = a.series;
                var b = c.tooltipOptions, f = b.xDateFormat, e = c.xAxis, g = e && "datetime" ===
                    e.options.type && l(a.key), d = b[d + "Format"];
                g && !f && (f = this.getXDateFormat(a, b, e));
                g && f && (d = d.replace("{point.key}", "{point.key:" + f + "}"));
                return H(d, {point: a, series: c})
            }, bodyFormatter: function (a) {
                return d(a, function (a) {
                    var c = a.series.tooltipOptions;
                    return (c.pointFormatter || a.point.tooltipFormatter).call(a.point, c.pointFormat)
                })
            }
        }
    })(L);
    (function (a) {
        var C = a.addEvent, B = a.attr, E = a.charts, H = a.css, l = a.defined, d = a.doc, h = a.each, g = a.extend, t = a.fireEvent, m = a.offset, c = a.pick, e = a.removeEvent, p = a.splat, x = a.Tooltip,
            A = a.win;
        a.Pointer = function (a, c) {
            this.init(a, c)
        };
        a.Pointer.prototype = {
            init: function (a, f) {
                this.options = f;
                this.chart = a;
                this.runChartClick = f.chart.events && !!f.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                x && f.tooltip.enabled && (a.tooltip = new x(a, f.tooltip), this.followTouchMove = c(f.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            }, zoomOption: function () {
                var a = this.chart, c = a.options.chart.zoomType, d = /x/.test(c), c = /y/.test(c), a = a.inverted;
                this.zoomX = d;
                this.zoomY = c;
                this.zoomHor = d && !a || c && a;
                this.zoomVert =
                    c && !a || d && a;
                this.hasZoom = d || c
            }, normalize: function (a, c) {
                var b, f;
                a = a || A.event;
                a.target || (a.target = a.srcElement);
                f = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
                c || (this.chartPosition = c = m(this.chart.container));
                void 0 === f.pageX ? (b = Math.max(a.x, a.clientX - c.left), c = a.y) : (b = f.pageX - c.left, c = f.pageY - c.top);
                return g(a, {chartX: Math.round(b), chartY: Math.round(c)})
            }, getCoordinates: function (a) {
                var b = {xAxis: [], yAxis: []};
                h(this.chart.axes, function (c) {
                    b[c.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: c,
                        value: c.toValue(a[c.horiz ? "chartX" : "chartY"])
                    })
                });
                return b
            }, runPointActions: function (b) {
                var f = this.chart, e = f.series, g = f.tooltip, p = g ? g.shared : !1, n = !0, D = f.hoverPoint, m = f.hoverSeries, y, l, r, z = [], F;
                if (!p && !m)for (y = 0; y < e.length; y++)if (e[y].directTouch || !e[y].options.stickyTracking)e = [];
                m && (p ? m.noSharedTooltip : m.directTouch) && D ? z = [D] : (p || !m || m.options.stickyTracking || (e = [m]), h(e, function (a) {
                    l = a.noSharedTooltip && p;
                    r = !p && a.directTouch;
                    a.visible && !l && !r && c(a.options.enableMouseTracking, !0) && (F = a.searchPoint(b,
                        !l && 1 === a.kdDimensions)) && F.series && z.push(F)
                }), z.sort(function (a, b) {
                    var c = a.distX - b.distX, f = a.dist - b.dist;
                    return 0 !== c && p ? c : 0 !== f ? f : a.series.group.zIndex > b.series.group.zIndex ? -1 : 1
                }));
                if (p)for (y = z.length; y--;)(z[y].x !== z[0].x || z[y].series.noSharedTooltip) && z.splice(y, 1);
                if (z[0] && (z[0] !== this.prevKDPoint || g && g.isHidden)) {
                    if (p && !z[0].series.noSharedTooltip) {
                        for (y = 0; y < z.length; y++)z[y].onMouseOver(b, z[y] !== (m && m.directTouch && D || z[0]));
                        z.length && g && g.refresh(z.sort(function (a, b) {
                            return a.series.index -
                                b.series.index
                        }), b)
                    } else if (g && g.refresh(z[0], b), !m || !m.directTouch)z[0].onMouseOver(b);
                    this.prevKDPoint = z[0];
                    n = !1
                }
                n && (e = m && m.tooltipOptions.followPointer, g && e && !g.isHidden && (e = g.getAnchor([{}], b), g.updatePosition({
                    plotX: e[0],
                    plotY: e[1]
                })));
                this._onDocumentMouseMove || (this._onDocumentMouseMove = function (b) {
                    if (E[a.hoverChartIndex])E[a.hoverChartIndex].pointer.onDocumentMouseMove(b)
                }, C(d, "mousemove", this._onDocumentMouseMove));
                h(p ? z : [c(D, z[0])], function (a) {
                    h(f.axes, function (c) {
                        (!a || a.series && a.series[c.coll] ===
                        c) && c.drawCrosshair(b, a)
                    })
                })
            }, reset: function (a, c) {
                var b = this.chart, f = b.hoverSeries, g = b.hoverPoint, n = b.hoverPoints, m = b.tooltip, l = m && m.shared ? n : g;
                a && l && h(p(l), function (b) {
                    b.series.isCartesian && void 0 === b.plotX && (a = !1)
                });
                if (a)m && l && (m.refresh(l), g && (g.setState(g.state, !0), h(b.axes, function (a) {
                    a.crosshair && a.drawCrosshair(null, g)
                }))); else {
                    if (g)g.onMouseOut();
                    n && h(n, function (a) {
                        a.setState()
                    });
                    if (f)f.onMouseOut();
                    m && m.hide(c);
                    this._onDocumentMouseMove && (e(d, "mousemove", this._onDocumentMouseMove), this._onDocumentMouseMove =
                        null);
                    h(b.axes, function (a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = this.prevKDPoint = b.hoverPoints = b.hoverPoint = null
                }
            }, scaleGroups: function (a, c) {
                var b = this.chart, f;
                h(b.series, function (d) {
                    f = a || d.getPlotBox();
                    d.xAxis && d.xAxis.zoomEnabled && d.group && (d.group.attr(f), d.markerGroup && (d.markerGroup.attr(f), d.markerGroup.clip(c ? b.clipRect : null)), d.dataLabelsGroup && d.dataLabelsGroup.attr(f))
                });
                b.clipRect.attr(c || b.clipBox)
            }, dragStart: function (a) {
                var b = this.chart;
                b.mouseIsDown = a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX =
                    a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY
            }, drag: function (a) {
                var b = this.chart, c = b.options.chart, d = a.chartX, e = a.chartY, g = this.zoomHor, h = this.zoomVert, p = b.plotLeft, m = b.plotTop, l = b.plotWidth, r = b.plotHeight, z, F = this.selectionMarker, t = this.mouseDownX, k = this.mouseDownY, v = c.panKey && a[c.panKey + "Key"];
                F && F.touch || (d < p ? d = p : d > p + l && (d = p + l), e < m ? e = m : e > m + r && (e = m + r), this.hasDragged = Math.sqrt(Math.pow(t - d, 2) + Math.pow(k - e, 2)), 10 < this.hasDragged && (z = b.isInsidePlot(t - p, k - m), b.hasCartesianSeries && (this.zoomX || this.zoomY) &&
                z && !v && !F && (this.selectionMarker = F = b.renderer.rect(p, m, g ? 1 : l, h ? 1 : r, 0).attr({
                    "class": "highcharts-selection-marker",
                    zIndex: 7
                }).add()), F && g && (d -= t, F.attr({
                    width: Math.abs(d),
                    x: (0 < d ? 0 : d) + t
                })), F && h && (d = e - k, F.attr({
                    height: Math.abs(d),
                    y: (0 < d ? 0 : d) + k
                })), z && !F && c.panning && b.pan(a, c.panning)))
            }, drop: function (a) {
                var b = this, c = this.chart, d = this.hasPinched;
                if (this.selectionMarker) {
                    var e = {
                        originalEvent: a,
                        xAxis: [],
                        yAxis: []
                    }, n = this.selectionMarker, p = n.attr ? n.attr("x") : n.x, m = n.attr ? n.attr("y") : n.y, y = n.attr ? n.attr("width") :
                        n.width, x = n.attr ? n.attr("height") : n.height, r;
                    if (this.hasDragged || d)h(c.axes, function (c) {
                        if (c.zoomEnabled && l(c.min) && (d || b[{xAxis: "zoomX", yAxis: "zoomY"}[c.coll]])) {
                            var f = c.horiz, g = "touchend" === a.type ? c.minPixelPadding : 0, k = c.toValue((f ? p : m) + g), f = c.toValue((f ? p + y : m + x) - g);
                            e[c.coll].push({axis: c, min: Math.min(k, f), max: Math.max(k, f)});
                            r = !0
                        }
                    }), r && t(c, "selection", e, function (a) {
                        c.zoom(g(a, d ? {animation: !1} : null))
                    });
                    this.selectionMarker = this.selectionMarker.destroy();
                    d && this.scaleGroups()
                }
                c && (H(c.container, {cursor: c._cursor}),
                    c.cancelClick = 10 < this.hasDragged, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            }, onContainerMouseDown: function (a) {
                a = this.normalize(a);
                this.zoomOption();
                a.preventDefault && a.preventDefault();
                this.dragStart(a)
            }, onDocumentMouseUp: function (b) {
                E[a.hoverChartIndex] && E[a.hoverChartIndex].pointer.drop(b)
            }, onDocumentMouseMove: function (a) {
                var b = this.chart, c = this.chartPosition;
                a = this.normalize(a, c);
                !c || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY -
                    b.plotTop) || this.reset()
            }, onContainerMouseLeave: function (b) {
                var c = E[a.hoverChartIndex];
                c && (b.relatedTarget || b.toElement) && (c.pointer.reset(), c.pointer.chartPosition = null)
            }, onContainerMouseMove: function (b) {
                var c = this.chart;
                l(a.hoverChartIndex) && E[a.hoverChartIndex] && E[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = c.index);
                b = this.normalize(b);
                b.returnValue = !1;
                "mousedown" === c.mouseIsDown && this.drag(b);
                !this.inClass(b.target, "highcharts-tracker") && !c.isInsidePlot(b.chartX - c.plotLeft, b.chartY - c.plotTop) ||
                c.openMenu || this.runPointActions(b)
            }, inClass: function (a, c) {
                for (var b; a;) {
                    if (b = B(a, "class")) {
                        if (-1 !== b.indexOf(c))return !0;
                        if (-1 !== b.indexOf("highcharts-container"))return !1
                    }
                    a = a.parentNode
                }
            }, onTrackerMouseOut: function (a) {
                var b = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                if (!(!b || !a || b.options.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker")))b.onMouseOut()
            }, onContainerClick: function (a) {
                var b = this.chart,
                    c = b.hoverPoint, d = b.plotLeft, e = b.plotTop;
                a = this.normalize(a);
                b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (t(c.series, "click", g(a, {point: c})), b.hoverPoint && c.firePointEvent("click", a)) : (g(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - d, a.chartY - e) && t(b, "click", a)))
            }, setDOMEvents: function () {
                var b = this, c = b.chart.container;
                c.onmousedown = function (a) {
                    b.onContainerMouseDown(a)
                };
                c.onmousemove = function (a) {
                    b.onContainerMouseMove(a)
                };
                c.onclick = function (a) {
                    b.onContainerClick(a)
                };
                C(c, "mouseleave",
                    b.onContainerMouseLeave);
                1 === a.chartCount && C(d, "mouseup", b.onDocumentMouseUp);
                a.hasTouch && (c.ontouchstart = function (a) {
                    b.onContainerTouchStart(a)
                }, c.ontouchmove = function (a) {
                    b.onContainerTouchMove(a)
                }, 1 === a.chartCount && C(d, "touchend", b.onDocumentTouchEnd))
            }, destroy: function () {
                var b;
                e(this.chart.container, "mouseleave", this.onContainerMouseLeave);
                a.chartCount || (e(d, "mouseup", this.onDocumentMouseUp), e(d, "touchend", this.onDocumentTouchEnd));
                clearInterval(this.tooltipTimeout);
                for (b in this)this[b] = null
            }
        }
    })(L);
    (function (a) {
        var C = a.charts, B = a.each, E = a.extend, H = a.map, l = a.noop, d = a.pick;
        E(a.Pointer.prototype, {
            pinchTranslate: function (a, d, l, m, c, e) {
                (this.zoomHor || this.pinchHor) && this.pinchTranslateDirection(!0, a, d, l, m, c, e);
                (this.zoomVert || this.pinchVert) && this.pinchTranslateDirection(!1, a, d, l, m, c, e)
            }, pinchTranslateDirection: function (a, d, l, m, c, e, p, x) {
                var g = this.chart, b = a ? "x" : "y", f = a ? "X" : "Y", h = "chart" + f, w = a ? "width" : "height", t = g["plot" + (a ? "Left" : "Top")], n, D, K = x || 1, y = g.inverted, I = g.bounds[a ? "h" : "v"], r = 1 === d.length,
                    z = d[0][h], F = l[0][h], N = !r && d[1][h], k = !r && l[1][h], v;
                l = function () {
                    !r && 20 < Math.abs(z - N) && (K = x || Math.abs(F - k) / Math.abs(z - N));
                    D = (t - F) / K + z;
                    n = g["plot" + (a ? "Width" : "Height")] / K
                };
                l();
                d = D;
                d < I.min ? (d = I.min, v = !0) : d + n > I.max && (d = I.max - n, v = !0);
                v ? (F -= .8 * (F - p[b][0]), r || (k -= .8 * (k - p[b][1])), l()) : p[b] = [F, k];
                y || (e[b] = D - t, e[w] = n);
                e = y ? 1 / K : K;
                c[w] = n;
                c[b] = d;
                m[y ? a ? "scaleY" : "scaleX" : "scale" + f] = K;
                m["translate" + f] = e * t + (F - e * z)
            }, pinch: function (a) {
                var g = this, h = g.chart, m = g.pinchDown, c = a.touches, e = c.length, p = g.lastValidTouch, x = g.hasZoom,
                    A = g.selectionMarker, b = {}, f = 1 === e && (g.inClass(a.target, "highcharts-tracker") && h.runTrackerClick || g.runChartClick), q = {};
                1 < e && (g.initiated = !0);
                x && g.initiated && !f && a.preventDefault();
                H(c, function (a) {
                    return g.normalize(a)
                });
                "touchstart" === a.type ? (B(c, function (a, b) {
                    m[b] = {chartX: a.chartX, chartY: a.chartY}
                }), p.x = [m[0].chartX, m[1] && m[1].chartX], p.y = [m[0].chartY, m[1] && m[1].chartY], B(h.axes, function (a) {
                    if (a.zoomEnabled) {
                        var b = h.bounds[a.horiz ? "h" : "v"], c = a.minPixelPadding, f = a.toPixels(d(a.options.min, a.dataMin)),
                            e = a.toPixels(d(a.options.max, a.dataMax)), g = Math.max(f, e);
                        b.min = Math.min(a.pos, Math.min(f, e) - c);
                        b.max = Math.max(a.pos + a.len, g + c)
                    }
                }), g.res = !0) : m.length && (A || (g.selectionMarker = A = E({
                    destroy: l,
                    touch: !0
                }, h.plotBox)), g.pinchTranslate(m, c, b, A, q, p), g.hasPinched = x, g.scaleGroups(b, q), !x && g.followTouchMove && 1 === e ? this.runPointActions(g.normalize(a)) : g.res && (g.res = !1, this.reset(!1, 0)))
            }, touch: function (h, g) {
                var l = this.chart, m;
                a.hoverChartIndex = l.index;
                1 === h.touches.length ? (h = this.normalize(h), l.isInsidePlot(h.chartX -
                    l.plotLeft, h.chartY - l.plotTop) && !l.openMenu ? (g && this.runPointActions(h), "touchmove" === h.type && (g = this.pinchDown, m = g[0] ? 4 <= Math.sqrt(Math.pow(g[0].chartX - h.chartX, 2) + Math.pow(g[0].chartY - h.chartY, 2)) : !1), d(m, !0) && this.pinch(h)) : g && this.reset()) : 2 === h.touches.length && this.pinch(h)
            }, onContainerTouchStart: function (a) {
                this.zoomOption();
                this.touch(a, !0)
            }, onContainerTouchMove: function (a) {
                this.touch(a)
            }, onDocumentTouchEnd: function (d) {
                C[a.hoverChartIndex] && C[a.hoverChartIndex].pointer.drop(d)
            }
        })
    })(L);
    (function (a) {
        var C =
            a.addEvent, B = a.charts, E = a.css, H = a.doc, l = a.extend, d = a.noop, h = a.Pointer, g = a.removeEvent, t = a.win, m = a.wrap;
        if (t.PointerEvent || t.MSPointerEvent) {
            var c = {}, e = !!t.PointerEvent, p = function () {
                var a, b = [];
                b.item = function (a) {
                    return this[a]
                };
                for (a in c)c.hasOwnProperty(a) && b.push({pageX: c[a].pageX, pageY: c[a].pageY, target: c[a].target});
                return b
            }, x = function (c, b, f, e) {
                "touch" !== c.pointerType && c.pointerType !== c.MSPOINTER_TYPE_TOUCH || !B[a.hoverChartIndex] || (e(c), e = B[a.hoverChartIndex].pointer, e[b]({
                    type: f, target: c.currentTarget,
                    preventDefault: d, touches: p()
                }))
            };
            l(h.prototype, {
                onContainerPointerDown: function (a) {
                    x(a, "onContainerTouchStart", "touchstart", function (a) {
                        c[a.pointerId] = {pageX: a.pageX, pageY: a.pageY, target: a.currentTarget}
                    })
                }, onContainerPointerMove: function (a) {
                    x(a, "onContainerTouchMove", "touchmove", function (a) {
                        c[a.pointerId] = {pageX: a.pageX, pageY: a.pageY};
                        c[a.pointerId].target || (c[a.pointerId].target = a.currentTarget)
                    })
                }, onDocumentPointerUp: function (a) {
                    x(a, "onDocumentTouchEnd", "touchend", function (a) {
                        delete c[a.pointerId]
                    })
                },
                batchMSEvents: function (a) {
                    a(this.chart.container, e ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, e ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(H, e ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            m(h.prototype, "init", function (a, b, c) {
                a.call(this, b, c);
                this.hasZoom && E(b.container, {"-ms-touch-action": "none", "touch-action": "none"})
            });
            m(h.prototype, "setDOMEvents", function (a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(C)
            });
            m(h.prototype, "destroy", function (a) {
                this.batchMSEvents(g);
                a.call(this)
            })
        }
    })(L);
    (function (a) {
        var C, B = a.addEvent, E = a.css, H = a.discardElement, l = a.defined, d = a.each, h = a.extend, g = a.isFirefox, t = a.marginNames, m = a.merge, c = a.pick, e = a.setAnimation, p = a.stableSort, x = a.win, A = a.wrap;
        C = a.Legend = function (a, c) {
            this.init(a, c)
        };
        C.prototype = {
            init: function (a, c) {
                this.chart = a;
                this.setOptions(c);
                c.enabled && (this.render(), B(this.chart, "endResize", function () {
                    this.legend.positionCheckboxes()
                }))
            }, setOptions: function (a) {
                var b =
                    c(a.padding, 8);
                this.options = a;
                this.itemMarginTop = a.itemMarginTop || 0;
                this.initialItemX = this.padding = b;
                this.initialItemY = b - 5;
                this.itemHeight = this.maxItemWidth = 0;
                this.symbolWidth = c(a.symbolWidth, 16);
                this.pages = []
            }, update: function (a, d) {
                var b = this.chart;
                this.setOptions(m(!0, this.options, a));
                this.destroy();
                b.isDirtyLegend = b.isDirtyBox = !0;
                c(d, !0) && b.redraw()
            }, colorizeItem: function (a, c) {
                a.legendGroup[c ? "removeClass" : "addClass"]("highcharts-legend-item-hidden")
            }, positionItem: function (a) {
                var b = this.options,
                    c = b.symbolPadding, b = !b.rtl, d = a._legendItemPos, e = d[0], d = d[1], g = a.checkbox;
                (a = a.legendGroup) && a.element && a.translate(b ? e : this.legendWidth - e - 2 * c - 4, d);
                g && (g.x = e, g.y = d)
            }, destroyItem: function (a) {
                var b = a.checkbox;
                d(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (b) {
                    a[b] && (a[b] = a[b].destroy())
                });
                b && H(a.checkbox)
            }, destroy: function () {
                var a = this.group, c = this.box;
                c && (this.box = c.destroy());
                d(this.getAllItems(), function (a) {
                    d(["legendItem", "legendGroup"], function (b) {
                        a[b] && (a[b] = a[b].destroy())
                    })
                });
                a && (this.group = a.destroy())
            }, positionCheckboxes: function (a) {
                var b = this.group.alignAttr, c, e = this.clipHeight || this.legendHeight, g = this.titleHeight;
                b && (c = b.translateY, d(this.allItems, function (d) {
                    var f = d.checkbox, n;
                    f && (n = c + g + f.y + (a || 0) + 3, E(f, {
                        left: b.translateX + d.checkboxOffset + f.x - 20 + "px",
                        top: n + "px",
                        display: n > c - 6 && n < c + e - 6 ? "" : "none"
                    }))
                }))
            }, renderTitle: function () {
                var a = this.padding, c = this.options.title, d = 0;
                c.text && (this.title || (this.title = this.chart.renderer.label(c.text, a - 3, a - 4, null, null, null, null, null,
                    "legend-title").attr({zIndex: 1}).add(this.group)), a = this.title.getBBox(), d = a.height, this.offsetWidth = a.width, this.contentGroup.attr({translateY: d}));
                this.titleHeight = d
            }, setText: function (b) {
                var c = this.options;
                b.legendItem.attr({text: c.labelFormat ? a.format(c.labelFormat, b) : c.labelFormatter.call(b)})
            }, renderItem: function (a) {
                var b = this.chart, d = b.renderer, e = this.options, g = "horizontal" === e.layout, n = this.symbolWidth, h = e.symbolPadding, p = this.padding, m = g ? c(e.itemDistance, 20) : 0, l = !e.rtl, r = e.width, z = e.itemMarginBottom ||
                    0, F = this.itemMarginTop, x = this.initialItemX, k = a.legendItem, v = !a.series, t = !v && a.series.drawLegendSymbol ? a.series : a, A = t.options, A = this.createCheckboxForItem && A && A.showCheckbox, C = e.useHTML;
                k || (a.legendGroup = d.g("legend-item").addClass("highcharts-" + t.type + "-series highcharts-color-" + a.colorIndex + " " + (a.options.className || "") + (v ? "highcharts-series-" + a.index : "")).attr({zIndex: 1}).add(this.scrollGroup), a.legendItem = k = d.text("", l ? n + h : -h, this.baseline || 0, C).attr({
                    align: l ? "left" : "right",
                    zIndex: 2
                }).add(a.legendGroup),
                this.baseline || (this.fontMetrics = d.fontMetrics(12, k), this.baseline = this.fontMetrics.f + 3 + F, k.attr("y", this.baseline)), t.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, k, C), A && this.createCheckboxForItem(a));
                this.colorizeItem(a, a.visible);
                this.setText(a);
                d = k.getBBox();
                n = a.checkboxOffset = e.itemWidth || a.legendItemWidth || n + h + d.width + m + (A ? 20 : 0);
                this.itemHeight = h = Math.round(a.legendItemHeight || d.height);
                g && this.itemX - x + n > (r || b.chartWidth - 2 * p - x - e.x) && (this.itemX = x, this.itemY += F + this.lastLineHeight +
                    z, this.lastLineHeight = 0);
                this.maxItemWidth = Math.max(this.maxItemWidth, n);
                this.lastItemY = F + this.itemY + z;
                this.lastLineHeight = Math.max(h, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                g ? this.itemX += n : (this.itemY += F + h + z, this.lastLineHeight = h);
                this.offsetWidth = r || Math.max((g ? this.itemX - x - m : n) + p, this.offsetWidth)
            }, getAllItems: function () {
                var a = [];
                d(this.chart.series, function (b) {
                    var d = b && b.options;
                    b && c(d.showInLegend, l(d.linkedTo) ? !1 : void 0, !0) && (a = a.concat(b.legendItems || ("point" === d.legendType ?
                            b.data : b)))
                });
                return a
            }, adjustMargins: function (a, e) {
                var b = this.chart, f = this.options, g = f.align.charAt(0) + f.verticalAlign.charAt(0) + f.layout.charAt(0);
                f.floating || d([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function (d, h) {
                    d.test(g) && !l(a[h]) && (b[t[h]] = Math.max(b[t[h]], b.legend[(h + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][h] * f[h % 2 ? "x" : "y"] + c(f.margin, 12) + e[h]))
                })
            }, render: function () {
                var a = this, c = a.chart, e = c.renderer, g = a.group, m, n, l, x, y = a.box, t = a.options, r = a.padding;
                a.itemX = a.initialItemX;
                a.itemY = a.initialItemY;
                a.offsetWidth = 0;
                a.lastItemY = 0;
                g || (a.group = g = e.g("legend").attr({zIndex: 7}).add(), a.contentGroup = e.g().attr({zIndex: 1}).add(g), a.scrollGroup = e.g().add(a.contentGroup));
                a.renderTitle();
                m = a.getAllItems();
                p(m, function (a, b) {
                    return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                });
                t.reversed && m.reverse();
                a.allItems = m;
                a.display = n = !!m.length;
                a.lastLineHeight = 0;
                d(m, function (b) {
                    a.renderItem(b)
                });
                l = (t.width || a.offsetWidth) + r;
                x = a.lastItemY + a.lastLineHeight + a.titleHeight;
                x = a.handleOverflow(x);
                x += r;
                y || (a.box = y = e.rect().addClass("highcharts-legend-box").attr({r: t.borderRadius}).add(g), y.isNew = !0);
                0 < l && 0 < x && (y[y.isNew ? "attr" : "animate"](y.crisp({
                    x: 0,
                    y: 0,
                    width: l,
                    height: x
                }, y.strokeWidth())), y.isNew = !1);
                y[n ? "show" : "hide"]();
                "none" === g.getStyle("display") && (l = x = 0);
                a.legendWidth = l;
                a.legendHeight = x;
                d(m, function (b) {
                    a.positionItem(b)
                });
                n && g.align(h({width: l, height: x}, t), !0, "spacingBox");
                c.isResizing || this.positionCheckboxes()
            }, handleOverflow: function (a) {
                var b = this, e = this.chart,
                    g = e.renderer, h = this.options, n = h.y, n = e.spacingBox.height + ("top" === h.verticalAlign ? -n : n) - this.padding, p = h.maxHeight, m, l = this.clipRect, x = h.navigation, r = c(x.animation, !0), z = x.arrowSize || 12, F = this.nav, t = this.pages, k = this.padding, v, A = this.allItems, R = function (a) {
                        l.attr({height: a});
                        b.contentGroup.div && (b.contentGroup.div.style.clip = "rect(" + k + "px,9999px," + (k + a) + "px,0)")
                    };
                "horizontal" === h.layout && (n /= 2);
                p && (n = Math.min(n, p));
                t.length = 0;
                a > n && !1 !== x.enabled ? (this.clipHeight = m = Math.max(n - 20 - this.titleHeight - k,
                    0), this.currentPage = c(this.currentPage, 1), this.fullHeight = a, d(A, function (a, b) {
                    var c = a._legendItemPos[1];
                    a = Math.round(a.legendItem.getBBox().height);
                    var d = t.length;
                    if (!d || c - t[d - 1] > m && (v || c) !== t[d - 1])t.push(v || c), d++;
                    b === A.length - 1 && c + a - t[d - 1] > m && t.push(c);
                    c !== v && (v = c)
                }), l || (l = b.clipRect = g.clipRect(0, k, 9999, 0), b.contentGroup.clip(l)), R(m), F || (this.nav = F = g.g().attr({zIndex: 1}).add(this.group), this.up = g.symbol("triangle", 0, 0, z, z).on("click", function () {
                    b.scroll(-1, r)
                }).add(F), this.pager = g.text("", 15, 10).addClass("highcharts-legend-navigation").add(F),
                    this.down = g.symbol("triangle-down", 0, 0, z, z).on("click", function () {
                        b.scroll(1, r)
                    }).add(F)), b.scroll(0), a = n) : F && (R(e.chartHeight), F.hide(), this.scrollGroup.attr({translateY: 1}), this.clipHeight = 0);
                return a
            }, scroll: function (a, c) {
                var b = this.pages, d = b.length;
                a = this.currentPage + a;
                var f = this.clipHeight, g = this.pager, h = this.padding;
                a > d && (a = d);
                0 < a && (void 0 !== c && e(c, this.chart), this.nav.attr({
                    translateX: h,
                    translateY: f + this.padding + 7 + this.titleHeight,
                    visibility: "visible"
                }), this.up.attr({
                    "class": 1 === a ? "highcharts-legend-nav-inactive" :
                        "highcharts-legend-nav-active"
                }), g.attr({text: a + "/" + d}), this.down.attr({
                    x: 18 + this.pager.getBBox().width,
                    "class": a === d ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                }), c = -b[a - 1] + this.initialItemY, this.scrollGroup.animate({translateY: c}), this.currentPage = a, this.positionCheckboxes(c))
            }
        };
        a.LegendSymbolMixin = {
            drawRectangle: function (a, d) {
                var b = a.options, e = b.symbolHeight || a.fontMetrics.f, b = b.squareSymbol;
                d.legendSymbol = this.chart.renderer.rect(b ? (a.symbolWidth - e) / 2 : 0, a.baseline - e + 1, b ? e :
                    a.symbolWidth, e, c(a.options.symbolRadius, e / 2)).addClass("highcharts-point").attr({zIndex: 3}).add(d.legendGroup)
            }, drawLineMarker: function (a) {
                var b = this.options.marker, c = a.symbolWidth, d = this.chart.renderer, e = this.legendGroup, g = a.baseline - Math.round(.3 * a.fontMetrics.b);
                this.legendLine = d.path(["M", 0, g, "L", c, g]).addClass("highcharts-graph").attr({}).add(e);
                b && !1 !== b.enabled && (a = 0 === this.symbol.indexOf("url") ? 0 : b.radius, this.legendSymbol = b = d.symbol(this.symbol, c / 2 - a, g - a, 2 * a, 2 * a, b).addClass("highcharts-point").add(e),
                    b.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(x.navigator.userAgent) || g) && A(C.prototype, "positionItem", function (a, c) {
            var b = this, d = function () {
                c._legendItemPos && a.call(b, c)
            };
            d();
            setTimeout(d)
        })
    })(L);
    (function (a) {
        var C = a.addEvent, B = a.animObject, E = a.attr, H = a.doc, l = a.Axis, d = a.createElement, h = a.defaultOptions, g = a.discardElement, t = a.charts, m = a.css, c = a.defined, e = a.each, p = a.error, x = a.extend, A = a.fireEvent, b = a.getStyle, f = a.grep, q = a.isNumber, w = a.isObject, G = a.isString, n = a.Legend, D = a.marginNames, K = a.merge, y = a.Pointer,
            I = a.pick, r = a.pInt, z = a.removeEvent, F = a.seriesTypes, N = a.splat, k = a.svg, v = a.syncTimeout, Q = a.win, R = a.Renderer, P = a.Chart = function () {
                this.getArgs.apply(this, arguments)
            };
        a.chart = function (a, b, c) {
            return new P(a, b, c)
        };
        P.prototype = {
            callbacks: [], getArgs: function () {
                var a = [].slice.call(arguments);
                if (G(a[0]) || a[0].nodeName)this.renderTo = a.shift();
                this.init(a[0], a[1])
            }, init: function (b, c) {
                var d, e = b.series;
                b.series = null;
                d = K(h, b);
                d.series = b.series = e;
                this.userOptions = b;
                this.respRules = [];
                b = d.chart;
                e = b.events;
                this.margin =
                    [];
                this.spacing = [];
                this.bounds = {h: {}, v: {}};
                this.callback = c;
                this.isResizing = 0;
                this.options = d;
                this.axes = [];
                this.series = [];
                this.hasCartesianSeries = b.showAxes;
                var f;
                this.index = t.length;
                t.push(this);
                a.chartCount++;
                if (e)for (f in e)C(this, f, e[f]);
                this.xAxis = [];
                this.yAxis = [];
                this.pointCount = this.colorCounter = this.symbolCounter = 0;
                this.firstRender()
            }, initSeries: function (a) {
                var b = this.options.chart;
                (b = F[a.type || b.type || b.defaultSeriesType]) || p(17, !0);
                b = new b;
                b.init(this, a);
                return b
            }, isInsidePlot: function (a,
                                       b, c) {
                var d = c ? b : a;
                a = c ? a : b;
                return 0 <= d && d <= this.plotWidth && 0 <= a && a <= this.plotHeight
            }, redraw: function (b) {
                var c = this.axes, d = this.series, f = this.pointer, k = this.legend, g = this.isDirtyLegend, r, n, z = this.hasCartesianSeries, h = this.isDirtyBox, p = d.length, m = p, v = this.renderer, l = v.isHidden(), F = [];
                a.setAnimation(b, this);
                l && this.cloneRenderTo();
                for (this.layOutTitles(); m--;)if (b = d[m], b.options.stacking && (r = !0, b.isDirty)) {
                    n = !0;
                    break
                }
                if (n)for (m = p; m--;)b = d[m], b.options.stacking && (b.isDirty = !0);
                e(d, function (a) {
                    a.isDirty &&
                    "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), g = !0);
                    a.isDirtyData && A(a, "updatedData")
                });
                g && k.options.enabled && (k.render(), this.isDirtyLegend = !1);
                r && this.getStacks();
                z && e(c, function (a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                z && (e(c, function (a) {
                    a.isDirty && (h = !0)
                }), e(c, function (a) {
                    var b = a.min + "," + a.max;
                    a.extKey !== b && (a.extKey = b, F.push(function () {
                        A(a, "afterSetExtremes", x(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (h || r) && a.redraw()
                }));
                h && this.drawChartBox();
                e(d,
                    function (a) {
                        (h || a.isDirty) && a.visible && a.redraw()
                    });
                f && f.reset(!0);
                v.draw();
                A(this, "redraw");
                l && this.cloneRenderTo(!0);
                e(F, function (a) {
                    a.call()
                })
            }, get: function (a) {
                var b = this.axes, c = this.series, d, e;
                for (d = 0; d < b.length; d++)if (b[d].options.id === a)return b[d];
                for (d = 0; d < c.length; d++)if (c[d].options.id === a)return c[d];
                for (d = 0; d < c.length; d++)for (e = c[d].points || [], b = 0; b < e.length; b++)if (e[b].id === a)return e[b];
                return null
            }, getAxes: function () {
                var a = this, b = this.options, c = b.xAxis = N(b.xAxis || {}), b = b.yAxis = N(b.yAxis ||
                    {});
                e(c, function (a, b) {
                    a.index = b;
                    a.isX = !0
                });
                e(b, function (a, b) {
                    a.index = b
                });
                c = c.concat(b);
                e(c, function (b) {
                    new l(a, b)
                })
            }, getSelectedPoints: function () {
                var a = [];
                e(this.series, function (b) {
                    a = a.concat(f(b.points || [], function (a) {
                        return a.selected
                    }))
                });
                return a
            }, getSelectedSeries: function () {
                return f(this.series, function (a) {
                    return a.selected
                })
            }, setTitle: function (a, b, c) {
                var d = this, f = d.options, k;
                k = f.title = K(f.title, a);
                f = f.subtitle = K(f.subtitle, b);
                e([["title", a, k], ["subtitle", b, f]], function (a, b) {
                    var c = a[0], e = d[c],
                        f = a[1];
                    a = a[2];
                    e && f && (d[c] = e = e.destroy());
                    a && a.text && !e && (d[c] = d.renderer.text(a.text, 0, 0, a.useHTML).attr({
                        align: a.align,
                        "class": "highcharts-" + c,
                        zIndex: a.zIndex || 4
                    }).add(), d[c].update = function (a) {
                        d.setTitle(!b && a, b && a)
                    })
                });
                d.layOutTitles(c)
            }, layOutTitles: function (a) {
                var b = 0, c, d = this.renderer, f = this.spacingBox;
                e(["title", "subtitle"], function (a) {
                    var c = this[a], e = this.options[a], k;
                    c && (k = d.fontMetrics(k, c).b, c.css({width: (e.width || f.width + e.widthAdjust) + "px"}).align(x({y: b + k + ("title" === a ? -3 : 2)}, e), !1, "spacingBox"),
                    e.floating || e.verticalAlign || (b = Math.ceil(b + c.getBBox().height)))
                }, this);
                c = this.titleOffset !== b;
                this.titleOffset = b;
                !this.isDirtyBox && c && (this.isDirtyBox = c, this.hasRendered && I(a, !0) && this.isDirtyBox && this.redraw())
            }, getChartSize: function () {
                var a = this.options.chart, d = a.width, a = a.height, e = this.renderToClone || this.renderTo;
                c(d) || (this.containerWidth = b(e, "width"));
                c(a) || (this.containerHeight = b(e, "height"));
                this.chartWidth = Math.max(0, d || this.containerWidth || 600);
                this.chartHeight = Math.max(0, I(a, 19 < this.containerHeight ?
                    this.containerHeight : 400))
            }, cloneRenderTo: function (a) {
                var b = this.renderToClone, c = this.container;
                if (a) {
                    if (b) {
                        for (; b.childNodes.length;)this.renderTo.appendChild(b.firstChild);
                        g(b);
                        delete this.renderToClone
                    }
                } else c && c.parentNode === this.renderTo && this.renderTo.removeChild(c), this.renderToClone = b = this.renderTo.cloneNode(0), m(b, {
                    position: "absolute",
                    top: "-9999px",
                    display: "block"
                }), b.style.setProperty && b.style.setProperty("display", "block", "important"), H.body.appendChild(b), c && b.appendChild(c)
            }, setClassName: function (a) {
                this.container.className =
                    "highcharts-container " + (a || "")
            }, getContainer: function () {
                var b, c = this.options, e = c.chart, f, k;
                b = this.renderTo;
                var g = "highcharts-" + a.idCounter++, n;
                b || (this.renderTo = b = e.renderTo);
                G(b) && (this.renderTo = b = H.getElementById(b));
                b || p(13, !0);
                f = r(E(b, "data-highcharts-chart"));
                q(f) && t[f] && t[f].hasRendered && t[f].destroy();
                E(b, "data-highcharts-chart", this.index);
                b.innerHTML = "";
                e.skipClone || b.offsetWidth || this.cloneRenderTo();
                this.getChartSize();
                f = this.chartWidth;
                k = this.chartHeight;
                this.container = b = d("div", {id: g},
                    void 0, this.renderToClone || b);
                this._cursor = b.style.cursor;
                this.renderer = new (a[e.renderer] || R)(b, f, k, null, e.forExport, c.exporting && c.exporting.allowHTML);
                this.setClassName(e.className);
                for (n in c.defs)this.renderer.definition(c.defs[n]);
                this.renderer.chartIndex = this.index
            }, getMargins: function (a) {
                var b = this.spacing, d = this.margin, e = this.titleOffset;
                this.resetMargins();
                e && !c(d[0]) && (this.plotTop = Math.max(this.plotTop, e + this.options.title.margin + b[0]));
                this.legend.display && this.legend.adjustMargins(d,
                    b);
                this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin);
                this.extraTopMargin && (this.plotTop += this.extraTopMargin);
                a || this.getAxisMargins()
            }, getAxisMargins: function () {
                var a = this, b = a.axisOffset = [0, 0, 0, 0], d = a.margin;
                a.hasCartesianSeries && e(a.axes, function (a) {
                    a.visible && a.getOffset()
                });
                e(D, function (e, f) {
                    c(d[f]) || (a[e] += b[f])
                });
                a.setChartSize()
            }, reflow: function (a) {
                var d = this, e = d.options.chart, f = d.renderTo, k = c(e.width), g = e.width || b(f, "width"), e = e.height || b(f, "height"), f = a ? a.target : Q;
                if (!k && !d.isPrinting && g && e && (f === Q || f === H)) {
                    if (g !== d.containerWidth || e !== d.containerHeight)clearTimeout(d.reflowTimeout), d.reflowTimeout = v(function () {
                        d.container && d.setSize(void 0, void 0, !1)
                    }, a ? 100 : 0);
                    d.containerWidth = g;
                    d.containerHeight = e
                }
            }, initReflow: function () {
                var a = this, b = function (b) {
                    a.reflow(b)
                };
                C(Q, "resize", b);
                C(a, "destroy", function () {
                    z(Q, "resize", b)
                })
            }, setSize: function (b, c, d) {
                var f = this, k = f.renderer;
                f.isResizing += 1;
                a.setAnimation(d, f);
                f.oldChartHeight = f.chartHeight;
                f.oldChartWidth = f.chartWidth;
                void 0 !==
                b && (f.options.chart.width = b);
                void 0 !== c && (f.options.chart.height = c);
                f.getChartSize();
                f.setChartSize(!0);
                k.setSize(f.chartWidth, f.chartHeight, d);
                e(f.axes, function (a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                f.isDirtyLegend = !0;
                f.isDirtyBox = !0;
                f.layOutTitles();
                f.getMargins();
                f.setResponsive && f.setResponsive(!1);
                f.redraw(d);
                f.oldChartHeight = null;
                A(f, "resize");
                v(function () {
                    f && A(f, "endResize", null, function () {
                        --f.isResizing
                    })
                }, B(void 0).duration)
            }, setChartSize: function (a) {
                var b = this.inverted, c = this.renderer, d = this.chartWidth,
                    f = this.chartHeight, k = this.options.chart, g = this.spacing, r = this.clipOffset, n, z, h, p;
                this.plotLeft = n = Math.round(this.plotLeft);
                this.plotTop = z = Math.round(this.plotTop);
                this.plotWidth = h = Math.max(0, Math.round(d - n - this.marginRight));
                this.plotHeight = p = Math.max(0, Math.round(f - z - this.marginBottom));
                this.plotSizeX = b ? p : h;
                this.plotSizeY = b ? h : p;
                this.plotBorderWidth = k.plotBorderWidth || 0;
                this.spacingBox = c.spacingBox = {x: g[3], y: g[0], width: d - g[3] - g[1], height: f - g[0] - g[2]};
                this.plotBox = c.plotBox = {x: n, y: z, width: h, height: p};
                d = 2 * Math.floor(this.plotBorderWidth / 2);
                b = Math.ceil(Math.max(d, r[3]) / 2);
                c = Math.ceil(Math.max(d, r[0]) / 2);
                this.clipBox = {
                    x: b,
                    y: c,
                    width: Math.floor(this.plotSizeX - Math.max(d, r[1]) / 2 - b),
                    height: Math.max(0, Math.floor(this.plotSizeY - Math.max(d, r[2]) / 2 - c))
                };
                a || e(this.axes, function (a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                })
            }, resetMargins: function () {
                var a = this, b = a.options.chart;
                e(["margin", "spacing"], function (c) {
                    var d = b[c], f = w(d) ? d : [d, d, d, d];
                    e(["Top", "Right", "Bottom", "Left"], function (d, e) {
                        a[c][e] = I(b[c + d], f[e])
                    })
                });
                e(D, function (b, c) {
                    a[b] = I(a.margin[c], a.spacing[c])
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = [0, 0, 0, 0]
            }, drawChartBox: function () {
                var a = this.options.chart, b = this.renderer, c = this.chartWidth, d = this.chartHeight, e = this.chartBackground, f = this.plotBackground, k = this.plotBorder, g, r, n = this.plotLeft, z = this.plotTop, h = this.plotWidth, p = this.plotHeight, m = this.plotBox, v = this.clipRect, l = this.clipBox, F = "animate";
                e || (this.chartBackground = e = b.rect().addClass("highcharts-background").add(), F = "attr");
                g = r = e.strokeWidth();
                e[F]({
                    x: r /
                    2, y: r / 2, width: c - r - g % 2, height: d - r - g % 2, r: a.borderRadius
                });
                F = "animate";
                f || (F = "attr", this.plotBackground = f = b.rect().addClass("highcharts-plot-background").add());
                f[F](m);
                v ? v.animate({width: l.width, height: l.height}) : this.clipRect = b.clipRect(l);
                F = "animate";
                k || (F = "attr", this.plotBorder = k = b.rect().addClass("highcharts-plot-border").attr({zIndex: 1}).add());
                k[F](k.crisp({x: n, y: z, width: h, height: p}, -k.strokeWidth()));
                this.isDirtyBox = !1
            }, propFromSeries: function () {
                var a = this, b = a.options.chart, c, d = a.options.series,
                    f, k;
                e(["inverted", "angular", "polar"], function (e) {
                    c = F[b.type || b.defaultSeriesType];
                    k = b[e] || c && c.prototype[e];
                    for (f = d && d.length; !k && f--;)(c = F[d[f].type]) && c.prototype[e] && (k = !0);
                    a[e] = k
                })
            }, linkSeries: function () {
                var a = this, b = a.series;
                e(b, function (a) {
                    a.linkedSeries.length = 0
                });
                e(b, function (b) {
                    var c = b.options.linkedTo;
                    G(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = I(b.options.visible, c.options.visible, b.visible))
                })
            }, renderSeries: function () {
                e(this.series,
                    function (a) {
                        a.translate();
                        a.render()
                    })
            }, renderLabels: function () {
                var a = this, b = a.options.labels;
                b.items && e(b.items, function (c) {
                    var d = x(b.style, c.style), e = r(d.left) + a.plotLeft, f = r(d.top) + a.plotTop + 12;
                    delete d.left;
                    delete d.top;
                    a.renderer.text(c.html, e, f).attr({zIndex: 2}).css(d).add()
                })
            }, render: function () {
                var a = this.axes, b = this.renderer, c = this.options, d, f, k;
                this.setTitle();
                this.legend = new n(this, c.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                c = this.plotWidth;
                d = this.plotHeight -=
                    21;
                e(a, function (a) {
                    a.setScale()
                });
                this.getAxisMargins();
                f = 1.1 < c / this.plotWidth;
                k = 1.05 < d / this.plotHeight;
                if (f || k)e(a, function (a) {
                    (a.horiz && f || !a.horiz && k) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && e(a, function (a) {
                    a.visible && a.render()
                });
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({zIndex: 3}).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            }, addCredits: function (a) {
                var b =
                    this;
                a = K(!0, this.options.credits, a);
                a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
                    a.href && (Q.location.href = a.href)
                }).attr({
                    align: a.position.align,
                    zIndex: 8
                }).add().align(a.position), this.credits.update = function (a) {
                    b.credits = b.credits.destroy();
                    b.addCredits(a)
                })
            }, destroy: function () {
                var b = this, c = b.axes, d = b.series, f = b.container, k, r = f && f.parentNode;
                A(b, "destroy");
                t[b.index] = void 0;
                a.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                z(b);
                for (k = c.length; k--;)c[k] = c[k].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (k = d.length; k--;)d[k] = d[k].destroy();
                e("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function (a) {
                    var c = b[a];
                    c && c.destroy && (b[a] = c.destroy())
                });
                f && (f.innerHTML = "", z(f), r && g(f));
                for (k in b)delete b[k]
            }, isReadyToRender: function () {
                var a = this;
                return k || Q != Q.top || "complete" ===
                H.readyState ? !0 : (H.attachEvent("onreadystatechange", function () {
                    H.detachEvent("onreadystatechange", a.firstRender);
                    "complete" === H.readyState && a.firstRender()
                }), !1)
            }, firstRender: function () {
                var a = this, b = a.options;
                if (a.isReadyToRender()) {
                    a.getContainer();
                    A(a, "init");
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    e(b.series || [], function (b) {
                        a.initSeries(b)
                    });
                    a.linkSeries();
                    A(a, "beforeRender");
                    y && (a.pointer = new y(a, b));
                    a.render();
                    a.renderer.draw();
                    if (!a.renderer.imgCount && a.onload)a.onload();
                    a.cloneRenderTo(!0)
                }
            }, onload: function () {
                e([this.callback].concat(this.callbacks), function (a) {
                    a && void 0 !== this.index && a.apply(this, [this])
                }, this);
                A(this, "load");
                !1 !== this.options.chart.reflow && this.initReflow();
                this.onload = null
            }
        }
    })(L);
    (function (a) {
        var C, B = a.each, E = a.extend, H = a.erase, l = a.fireEvent, d = a.format, h = a.isArray, g = a.isNumber, t = a.pick, m = a.removeEvent;
        C = a.Point = function () {
        };
        C.prototype = {
            init: function (a, d, g) {
                var c = a.chart.options.chart.colorCount;
                this.series = a;
                this.applyOptions(d, g);
                a.options.colorByPoint ?
                    (d = a.colorCounter, a.colorCounter++, a.colorCounter === c && (a.colorCounter = 0)) : d = a.colorIndex;
                this.colorIndex = t(this.colorIndex, d);
                a.chart.pointCount++;
                return this
            }, applyOptions: function (a, d) {
                var c = this.series, e = c.options.pointValKey || c.pointValKey;
                a = C.prototype.optionsToObject.call(this, a);
                E(this, a);
                this.options = this.options ? E(this.options, a) : a;
                a.group && delete this.group;
                e && (this.y = this[e]);
                this.isNull = t(this.isValid && !this.isValid(), null === this.x || !g(this.y, !0));
                this.selected && (this.state = "select");
                "name" in this && void 0 === d && c.xAxis && c.xAxis.hasNames && (this.x = c.xAxis.nameToX(this));
                void 0 === this.x && c && (this.x = void 0 === d ? c.autoIncrement(this) : d);
                return this
            }, optionsToObject: function (a) {
                var c = {}, d = this.series, m = d.options.keys, l = m || d.pointArrayMap || ["y"], b = l.length, f = 0, q = 0;
                if (g(a) || null === a)c[l[0]] = a; else if (h(a))for (!m && a.length > b && (d = typeof a[0], "string" === d ? c.name = a[0] : "number" === d && (c.x = a[0]), f++); q < b;)m && void 0 === a[f] || (c[l[q]] = a[f]), f++, q++; else"object" === typeof a && (c = a, a.dataLabels && (d._hasPointLabels = !0), a.marker && (d._hasPointMarkers = !0));
                return c
            }, getClassName: function () {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "")
            }, getZone: function () {
                var a = this.series, d = a.zones, a = a.zoneAxis || "y", g = 0, h;
                for (h = d[g]; this[a] >= h.value;)h = d[++g];
                h && h.color && !this.options.color && (this.color =
                    h.color);
                return h
            }, destroy: function () {
                var a = this.series.chart, d = a.hoverPoints, g;
                a.pointCount--;
                d && (this.setState(), H(d, this), d.length || (a.hoverPoints = null));
                if (this === a.hoverPoint)this.onMouseOut();
                if (this.graphic || this.dataLabel)m(this), this.destroyElements();
                this.legendItem && a.legend.destroyItem(this);
                for (g in this)this[g] = null
            }, destroyElements: function () {
                for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], d, g = 6; g--;)d = a[g], this[d] && (this[d] = this[d].destroy())
            }, getLabelConfig: function () {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            }, tooltipFormatter: function (a) {
                var c = this.series, g = c.tooltipOptions, h = t(g.valueDecimals, ""), m = g.valuePrefix || "", b = g.valueSuffix || "";
                B(c.pointArrayMap || ["y"], function (c) {
                    c = "{point." + c;
                    if (m || b)a = a.replace(c + "}", m + c + "}" + b);
                    a = a.replace(c + "}", c + ":,." + h + "f}")
                });
                return d(a, {point: this, series: this.series})
            }, firePointEvent: function (a, d, g) {
                var c = this, e = this.series.options;
                (e.point.events[a] || c.options && c.options.events && c.options.events[a]) && this.importEvents();
                "click" === a && e.allowPointSelect && (g = function (a) {
                    c.select && c.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                l(this, a, d, g)
            }, visible: !0
        }
    })(L);
    (function (a) {
        var C = a.addEvent, B = a.animObject, E = a.arrayMax, H = a.arrayMin, l = a.correctFloat, d = a.Date, h = a.defaultOptions, g = a.defined, t = a.each, m = a.erase, c = a.error, e = a.extend, p = a.fireEvent, x = a.grep, A = a.isArray, b = a.isNumber, f = a.isString, q = a.merge, w = a.pick, G = a.removeEvent, n = a.splat,
            D = a.stableSort, K = a.SVGElement, y = a.syncTimeout, I = a.win;
        a.Series = a.seriesType("line", null, {
            allowPointSelect: !1,
            showCheckbox: !1,
            animation: {duration: 1E3},
            events: {},
            marker: {radius: 4, states: {hover: {animation: {duration: 50}, enabled: !0, radiusPlus: 2}}},
            point: {events: {}},
            dataLabels: {
                align: "center", formatter: function () {
                    return null === this.y ? "" : a.numberFormat(this.y, -1)
                }, verticalAlign: "bottom", x: 0, y: 0, padding: 5
            },
            cropThreshold: 300,
            pointRange: 0,
            softThreshold: !0,
            states: {
                hover: {lineWidthPlus: 1, marker: {}, halo: {size: 10}},
                select: {marker: {}}
            },
            stickyTracking: !0,
            turboThreshold: 1E3
        }, {
            isCartesian: !0,
            pointClass: a.Point,
            sorted: !0,
            requireSorting: !0,
            directTouch: !1,
            axisTypes: ["xAxis", "yAxis"],
            colorCounter: 0,
            parallelArrays: ["x", "y"],
            coll: "series",
            init: function (a, b) {
                var c = this, d, f, g = a.series, r = function (a, b) {
                    return w(a.options.index, a._i) - w(b.options.index, b._i)
                };
                c.chart = a;
                c.options = b = c.setOptions(b);
                c.linkedSeries = [];
                c.bindAxes();
                e(c, {name: b.name, state: "", visible: !1 !== b.visible, selected: !0 === b.selected});
                f = b.events;
                for (d in f)C(c,
                    d, f[d]);
                if (f && f.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect)a.runTrackerClick = !0;
                c.getColor();
                c.getSymbol();
                t(c.parallelArrays, function (a) {
                    c[a + "Data"] = []
                });
                c.setData(b.data, !1);
                c.isCartesian && (a.hasCartesianSeries = !0);
                g.push(c);
                c._i = g.length - 1;
                D(g, r);
                this.yAxis && D(this.yAxis.series, r);
                t(g, function (a, b) {
                    a.index = b;
                    a.name = a.name || "Series " + (b + 1)
                })
            },
            bindAxes: function () {
                var a = this, b = a.options, d = a.chart, e;
                t(a.axisTypes || [], function (f) {
                    t(d[f], function (c) {
                        e = c.options;
                        if (b[f] ===
                            e.index || void 0 !== b[f] && b[f] === e.id || void 0 === b[f] && 0 === e.index)c.series.push(a), a[f] = c, c.isDirty = !0
                    });
                    a[f] || a.optionalAxis === f || c(18, !0)
                })
            },
            updateParallelArrays: function (a, c) {
                var d = a.series, e = arguments, f = b(c) ? function (b) {
                    var e = "y" === b && d.toYData ? d.toYData(a) : a[b];
                    d[b + "Data"][c] = e
                } : function (a) {
                    Array.prototype[c].apply(d[a + "Data"], Array.prototype.slice.call(e, 2))
                };
                t(d.parallelArrays, f)
            },
            autoIncrement: function () {
                var a = this.options, b = this.xIncrement, c, e = a.pointIntervalUnit, b = w(b, a.pointStart, 0);
                this.pointInterval =
                    c = w(this.pointInterval, a.pointInterval, 1);
                e && (a = new d(b), "day" === e ? a = +a[d.hcSetDate](a[d.hcGetDate]() + c) : "month" === e ? a = +a[d.hcSetMonth](a[d.hcGetMonth]() + c) : "year" === e && (a = +a[d.hcSetFullYear](a[d.hcGetFullYear]() + c)), c = a - b);
                this.xIncrement = b + c;
                return b
            },
            setOptions: function (a) {
                var b = this.chart, c = b.options.plotOptions, b = b.userOptions || {}, d = b.plotOptions || {}, e = c[this.type];
                this.userOptions = a;
                c = q(e, c.series, a);
                this.tooltipOptions = q(h.tooltip, h.plotOptions[this.type].tooltip, b.tooltip, d.series && d.series.tooltip,
                    d[this.type] && d[this.type].tooltip, a.tooltip);
                null === e.marker && delete c.marker;
                this.zoneAxis = c.zoneAxis;
                a = this.zones = (c.zones || []).slice();
                !c.negativeColor && !c.negativeFillColor || c.zones || a.push({
                    value: c[this.zoneAxis + "Threshold"] || c.threshold || 0,
                    className: "highcharts-negative"
                });
                a.length && g(a[a.length - 1].value) && a.push({});
                return c
            },
            getCyclic: function (a, b, c) {
                var d, e = this.userOptions, f = a + "Index", r = a + "Counter", n = c ? c.length : w(this.chart.options.chart[a + "Count"], this.chart[a + "Count"]);
                b || (d = w(e[f], e["_" +
                f]), g(d) || (e["_" + f] = d = this.chart[r] % n, this.chart[r] += 1), c && (b = c[d]));
                void 0 !== d && (this[f] = d);
                this[a] = b
            },
            getColor: function () {
                this.getCyclic("color")
            },
            getSymbol: function () {
                this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
            setData: function (a, d, e, g) {
                var k = this, r = k.points, n = r && r.length || 0, h, z = k.options, m = k.chart, p = null, l = k.xAxis, q = z.turboThreshold, y = this.xData, D = this.yData, x = (h = k.pointArrayMap) && h.length;
                a = a || [];
                h = a.length;
                d = w(d, !0);
                if (!1 !== g && h && n === h && !k.cropped && !k.hasGroupedData && k.visible)t(a, function (a, b) {
                    r[b].update && a !== z.data[b] && r[b].update(a, !1, null, !1)
                }); else {
                    k.xIncrement = null;
                    k.colorCounter = 0;
                    t(this.parallelArrays, function (a) {
                        k[a + "Data"].length = 0
                    });
                    if (q && h > q) {
                        for (e = 0; null === p && e < h;)p = a[e], e++;
                        if (b(p))for (e = 0; e < h; e++)y[e] = this.autoIncrement(), D[e] = a[e]; else if (A(p))if (x)for (e = 0; e < h; e++)p = a[e], y[e] = p[0], D[e] = p.slice(1, x + 1); else for (e = 0; e < h; e++)p = a[e], y[e] = p[0], D[e] = p[1]; else c(12)
                    } else for (e = 0; e < h; e++)void 0 !==
                    a[e] && (p = {series: k}, k.pointClass.prototype.applyOptions.apply(p, [a[e]]), k.updateParallelArrays(p, e));
                    f(D[0]) && c(14, !0);
                    k.data = [];
                    k.options.data = k.userOptions.data = a;
                    for (e = n; e--;)r[e] && r[e].destroy && r[e].destroy();
                    l && (l.minRange = l.userMinRange);
                    k.isDirty = m.isDirtyBox = !0;
                    k.isDirtyData = !!r;
                    e = !1
                }
                "point" === z.legendType && (this.processData(), this.generatePoints());
                d && m.redraw(e)
            },
            processData: function (a) {
                var b = this.xData, d = this.yData, e = b.length, f;
                f = 0;
                var g, r, n = this.xAxis, h, m = this.options;
                h = m.cropThreshold;
                var p = this.getExtremesFromAll || m.getExtremesFromAll, l = this.isCartesian, m = n && n.val2lin, q = n && n.isLog, y, w;
                if (l && !this.isDirty && !n.isDirty && !this.yAxis.isDirty && !a)return !1;
                n && (a = n.getExtremes(), y = a.min, w = a.max);
                if (l && this.sorted && !p && (!h || e > h || this.forceCrop))if (b[e - 1] < y || b[0] > w)b = [], d = []; else if (b[0] < y || b[e - 1] > w)f = this.cropData(this.xData, this.yData, y, w), b = f.xData, d = f.yData, f = f.start, g = !0;
                for (h = b.length || 1; --h;)e = q ? m(b[h]) - m(b[h - 1]) : b[h] - b[h - 1], 0 < e && (void 0 === r || e < r) ? r = e : 0 > e && this.requireSorting && c(15);
                this.cropped = g;
                this.cropStart = f;
                this.processedXData = b;
                this.processedYData = d;
                this.closestPointRange = r
            },
            cropData: function (a, b, c, d) {
                var e = a.length, f = 0, g = e, r = w(this.cropShoulder, 1), n;
                for (n = 0; n < e; n++)if (a[n] >= c) {
                    f = Math.max(0, n - r);
                    break
                }
                for (c = n; c < e; c++)if (a[c] > d) {
                    g = c + r;
                    break
                }
                return {xData: a.slice(f, g), yData: b.slice(f, g), start: f, end: g}
            },
            generatePoints: function () {
                var a = this.options.data, b = this.data, c, d = this.processedXData, e = this.processedYData, f = this.pointClass, g = d.length, h = this.cropStart || 0, m, p = this.hasGroupedData,
                    l, y = [], q;
                b || p || (b = [], b.length = a.length, b = this.data = b);
                for (q = 0; q < g; q++)m = h + q, p ? (y[q] = (new f).init(this, [d[q]].concat(n(e[q]))), y[q].dataGroup = this.groupMap[q]) : (b[m] ? l = b[m] : void 0 !== a[m] && (b[m] = l = (new f).init(this, a[m], d[q])), y[q] = l), y[q].index = m;
                if (b && (g !== (c = b.length) || p))for (q = 0; q < c; q++)q !== h || p || (q += g), b[q] && (b[q].destroyElements(), b[q].plotX = void 0);
                this.data = b;
                this.points = y
            },
            getExtremes: function (a) {
                var c = this.yAxis, d = this.processedXData, e, f = [], g = 0;
                e = this.xAxis.getExtremes();
                var r = e.min, n = e.max,
                    h, m, p, l;
                a = a || this.stackedYData || this.processedYData || [];
                e = a.length;
                for (l = 0; l < e; l++)if (m = d[l], p = a[l], h = (b(p, !0) || A(p)) && (!c.isLog || p.length || 0 < p), m = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (d[l + 1] || m) >= r && (d[l - 1] || m) <= n, h && m)if (h = p.length)for (; h--;)null !== p[h] && (f[g++] = p[h]); else f[g++] = p;
                this.dataMin = H(f);
                this.dataMax = E(f)
            },
            translate: function () {
                this.processedXData || this.processData();
                this.generatePoints();
                for (var a = this.options, c = a.stacking, d = this.xAxis, e = d.categories,
                         f = this.yAxis, n = this.points, h = n.length, m = !!this.modifyValue, p = a.pointPlacement, q = "between" === p || b(p), y = a.threshold, t = a.startFromThreshold ? y : 0, D, x, A, I, K = Number.MAX_VALUE, a = 0; a < h; a++) {
                    var G = n[a], C = G.x, B = G.y;
                    x = G.low;
                    var E = c && f.stacks[(this.negStacks && B < (t ? 0 : y) ? "-" : "") + this.stackKey], H;
                    f.isLog && null !== B && 0 >= B && (G.isNull = !0);
                    G.plotX = D = l(Math.min(Math.max(-1E5, d.translate(C, 0, 0, 0, 1, p, "flags" === this.type)), 1E5));
                    c && this.visible && !G.isNull && E && E[C] && (I = this.getStackIndicator(I, C, this.index), H = E[C], B = H.points[I.key],
                        x = B[0], B = B[1], x === t && I.key === E[C].base && (x = w(y, f.min)), f.isLog && 0 >= x && (x = null), G.total = G.stackTotal = H.total, G.percentage = H.total && G.y / H.total * 100, G.stackY = B, H.setOffset(this.pointXOffset || 0, this.barW || 0));
                    G.yBottom = g(x) ? f.translate(x, 0, 1, 0, 1) : null;
                    m && (B = this.modifyValue(B, G));
                    G.plotY = x = "number" === typeof B && Infinity !== B ? Math.min(Math.max(-1E5, f.translate(B, 0, 1, 0, 1)), 1E5) : void 0;
                    G.isInside = void 0 !== x && 0 <= x && x <= f.len && 0 <= D && D <= d.len;
                    G.clientX = q ? l(d.translate(C, 0, 0, 0, 1, p)) : D;
                    G.negative = G.y < (y || 0);
                    G.category =
                        e && void 0 !== e[G.x] ? e[G.x] : G.x;
                    G.isNull || (void 0 !== A && (K = Math.min(K, Math.abs(D - A))), A = D)
                }
                this.closestPointRangePx = K
            },
            getValidPoints: function (a, b) {
                var c = this.chart;
                return x(a || this.points || [], function (a) {
                    return b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ? !1 : !a.isNull
                })
            },
            setClip: function (a) {
                var b = this.chart, c = this.options, d = b.renderer, e = b.inverted, f = this.clipBox, g = f || b.clipBox, n = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, g.height, c.xAxis, c.yAxis].join(), r = b[n], h = b[n + "m"];
                r || (a &&
                (g.width = 0, b[n + "m"] = h = d.clipRect(-99, e ? -b.plotLeft : -b.plotTop, 99, e ? b.chartWidth : b.chartHeight)), b[n] = r = d.clipRect(g), r.count = {length: 0});
                a && !r.count[this.index] && (r.count[this.index] = !0, r.count.length += 1);
                !1 !== c.clip && (this.group.clip(a || f ? r : b.clipRect), this.markerGroup.clip(h), this.sharedClipKey = n);
                a || (r.count[this.index] && (delete r.count[this.index], --r.count.length), 0 === r.count.length && n && b[n] && (f || (b[n] = b[n].destroy()), b[n + "m"] && (b[n + "m"] = b[n + "m"].destroy())))
            },
            animate: function (a) {
                var b = this.chart,
                    c = B(this.options.animation), d;
                a ? this.setClip(c) : (d = this.sharedClipKey, (a = b[d]) && a.animate({width: b.plotSizeX}, c), b[d + "m"] && b[d + "m"].animate({width: b.plotSizeX + 99}, c), this.animate = null)
            },
            afterAnimate: function () {
                this.setClip();
                p(this, "afterAnimate")
            },
            drawPoints: function () {
                var a = this.points, c = this.chart, d, e, f, g, n = this.options.marker, h, m, p, l, q = this.markerGroup, y = w(n.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx > 2 * n.radius);
                if (!1 !== n.enabled || this._hasPointMarkers)for (e = a.length; e--;)f =
                    a[e], d = f.plotY, g = f.graphic, h = f.marker || {}, m = !!f.marker, p = y && void 0 === h.enabled || h.enabled, l = f.isInside, p && b(d) && null !== f.y ? (d = w(h.symbol, this.symbol), f.hasImage = 0 === d.indexOf("url"), p = this.markerAttribs(f, f.selected && "select"), g ? g[l ? "show" : "hide"](!0).animate(p) : l && (0 < p.width || f.hasImage) && (f.graphic = g = c.renderer.symbol(d, p.x, p.y, p.width, p.height, m ? h : n).add(q)), g && g.addClass(f.getClassName(), !0)) : g && (f.graphic = g.destroy())
            },
            markerAttribs: function (a, b) {
                var c = this.options.marker, d = a && a.options, e = d &&
                    d.marker || {}, d = w(e.radius, c.radius);
                b && (c = c.states[b], b = e.states && e.states[b], d = w(b && b.radius, c && c.radius, d + (c && c.radiusPlus || 0)));
                a.hasImage && (d = 0);
                a = {x: Math.floor(a.plotX) - d, y: a.plotY - d};
                d && (a.width = a.height = 2 * d);
                return a
            },
            destroy: function () {
                var a = this, b = a.chart, c = /AppleWebKit\/533/.test(I.navigator.userAgent), d, e = a.data || [], f, g, n;
                p(a, "destroy");
                G(a);
                t(a.axisTypes || [], function (b) {
                    (n = a[b]) && n.series && (m(n.series, a), n.isDirty = n.forceRedraw = !0)
                });
                a.legendItem && a.chart.legend.destroyItem(a);
                for (d = e.length; d--;)(f =
                    e[d]) && f.destroy && f.destroy();
                a.points = null;
                clearTimeout(a.animationTimeout);
                for (g in a)a[g] instanceof K && !a[g].survive && (d = c && "group" === g ? "hide" : "destroy", a[g][d]());
                b.hoverSeries === a && (b.hoverSeries = null);
                m(b.series, a);
                for (g in a)delete a[g]
            },
            getGraphPath: function (a, b, c) {
                var d = this, e = d.options, f = e.step, n, h = [], r = [], m;
                a = a || d.points;
                (n = a.reversed) && a.reverse();
                (f = {right: 1, center: 2}[f] || f && 3) && n && (f = 4 - f);
                !e.connectNulls || b || c || (a = this.getValidPoints(a));
                t(a, function (k, n) {
                    var p = k.plotX, l = k.plotY, q = a[n -
                    1];
                    (k.leftCliff || q && q.rightCliff) && !c && (m = !0);
                    k.isNull && !g(b) && 0 < n ? m = !e.connectNulls : k.isNull && !b ? m = !0 : (0 === n || m ? n = ["M", k.plotX, k.plotY] : d.getPointSpline ? n = d.getPointSpline(a, k, n) : f ? (n = 1 === f ? ["L", q.plotX, l] : 2 === f ? ["L", (q.plotX + p) / 2, q.plotY, "L", (q.plotX + p) / 2, l] : ["L", p, q.plotY], n.push("L", p, l)) : n = ["L", p, l], r.push(k.x), f && r.push(k.x), h.push.apply(h, n), m = !1)
                });
                h.xMap = r;
                return d.graphPath = h
            },
            drawGraph: function () {
                var a = this, b = (this.gappedPath || this.getGraphPath).call(this), c = [["graph", "highcharts-graph"]];
                t(this.zones, function (a, b) {
                    c.push(["zone-graph-" + b, "highcharts-graph highcharts-zone-graph-" + b + " " + (a.className || "")])
                });
                t(c, function (c, d) {
                    d = c[0];
                    var e = a[d];
                    e ? (e.endX = b.xMap, e.animate({d: b})) : b.length && (a[d] = a.chart.renderer.path(b).addClass(c[1]).attr({zIndex: 1}).add(a.group));
                    e && (e.startX = b.xMap, e.isArea = b.isArea)
                })
            },
            applyZones: function () {
                var a = this, b = this.chart, c = b.renderer, d = this.zones, e, f, g = this.clips || [], n, h = this.graph, m = this.area, p = Math.max(b.chartWidth, b.chartHeight), l = this[(this.zoneAxis ||
                "y") + "Axis"], q, y, D = b.inverted, x, A, I, G, K = !1;
                d.length && (h || m) && l && void 0 !== l.min && (y = l.reversed, x = l.horiz, h && h.hide(), m && m.hide(), q = l.getExtremes(), t(d, function (d, k) {
                    e = y ? x ? b.plotWidth : 0 : x ? 0 : l.toPixels(q.min);
                    e = Math.min(Math.max(w(f, e), 0), p);
                    f = Math.min(Math.max(Math.round(l.toPixels(w(d.value, q.max), !0)), 0), p);
                    K && (e = f = l.toPixels(q.max));
                    A = Math.abs(e - f);
                    I = Math.min(e, f);
                    G = Math.max(e, f);
                    l.isXAxis ? (n = {
                        x: D ? G : I,
                        y: 0,
                        width: A,
                        height: p
                    }, x || (n.x = b.plotHeight - n.x)) : (n = {
                        x: 0,
                        y: D ? G : I,
                        width: p,
                        height: A
                    }, x && (n.y = b.plotWidth -
                        n.y));
                    g[k] ? g[k].animate(n) : (g[k] = c.clipRect(n), h && a["zone-graph-" + k].clip(g[k]), m && a["zone-area-" + k].clip(g[k]));
                    K = d.value > q.max
                }), this.clips = g)
            },
            invertGroups: function (a) {
                function b() {
                    var b = {width: c.yAxis.len, height: c.xAxis.len};
                    t(["group", "markerGroup"], function (d) {
                        c[d] && c[d].attr(b).invert(a)
                    })
                }

                var c = this, d = c.chart;
                c.xAxis && (C(d, "resize", b), C(c, "destroy", function () {
                    G(d, "resize", b)
                }), b(a), c.invertGroups = b)
            },
            plotGroup: function (a, b, c, d, e) {
                var f = this[a], g = !f;
                g && (this[a] = f = this.chart.renderer.g(b).attr({
                    zIndex: d ||
                    .1
                }).add(e), f.addClass("highcharts-series-" + this.index + " highcharts-" + this.type + "-series highcharts-color-" + this.colorIndex + " " + (this.options.className || "")));
                f.attr({visibility: c})[g ? "attr" : "animate"](this.getPlotBox());
                return f
            },
            getPlotBox: function () {
                var a = this.chart, b = this.xAxis, c = this.yAxis;
                a.inverted && (b = c, c = this.xAxis);
                return {translateX: b ? b.left : a.plotLeft, translateY: c ? c.top : a.plotTop, scaleX: 1, scaleY: 1}
            },
            render: function () {
                var a = this, b = a.chart, c, d = a.options, e = !!a.animate && b.renderer.isSVG && B(d.animation).duration,
                    f = a.visible ? "inherit" : "hidden", g = d.zIndex, n = a.hasRendered, h = b.seriesGroup, m = b.inverted;
                c = a.plotGroup("group", "series", f, g, h);
                a.markerGroup = a.plotGroup("markerGroup", "markers", f, g, h);
                e && a.animate(!0);
                c.inverted = a.isCartesian ? m : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.drawDataLabels && a.drawDataLabels();
                a.visible && a.drawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(m);
                !1 === d.clip || a.sharedClipKey || n || c.clip(b.clipRect);
                e && a.animate();
                n || (a.animationTimeout =
                    y(function () {
                        a.afterAnimate()
                    }, e));
                a.isDirty = a.isDirtyData = !1;
                a.hasRendered = !0
            },
            redraw: function () {
                var a = this.chart, b = this.isDirty || this.isDirtyData, c = this.group, d = this.xAxis, e = this.yAxis;
                c && (a.inverted && c.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }), c.animate({translateX: w(d && d.left, a.plotLeft), translateY: w(e && e.top, a.plotTop)}));
                this.translate();
                this.render();
                b && delete this.kdTree
            },
            kdDimensions: 1,
            kdAxisArray: ["clientX", "plotY"],
            searchPoint: function (a, b) {
                var c = this.xAxis, d = this.yAxis, e = this.chart.inverted;
                return this.searchKDTree({
                    clientX: e ? c.len - a.chartY + c.pos : a.chartX - c.pos,
                    plotY: e ? d.len - a.chartX + d.pos : a.chartY - d.pos
                }, b)
            },
            buildKDTree: function () {
                function a(c, d, e) {
                    var f, g;
                    if (g = c && c.length)return f = b.kdAxisArray[d % e], c.sort(function (a, b) {
                        return a[f] - b[f]
                    }), g = Math.floor(g / 2), {
                        point: c[g],
                        left: a(c.slice(0, g), d + 1, e),
                        right: a(c.slice(g + 1), d + 1, e)
                    }
                }

                var b = this, c = b.kdDimensions;
                delete b.kdTree;
                y(function () {
                    b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c)
                }, b.options.kdNow ? 0 : 1)
            },
            searchKDTree: function (a, b) {
                function c(a,
                           b, k, h) {
                    var m = b.point, p = d.kdAxisArray[k % h], l, r, q = m;
                    r = g(a[e]) && g(m[e]) ? Math.pow(a[e] - m[e], 2) : null;
                    l = g(a[f]) && g(m[f]) ? Math.pow(a[f] - m[f], 2) : null;
                    l = (r || 0) + (l || 0);
                    m.dist = g(l) ? Math.sqrt(l) : Number.MAX_VALUE;
                    m.distX = g(r) ? Math.sqrt(r) : Number.MAX_VALUE;
                    p = a[p] - m[p];
                    l = 0 > p ? "left" : "right";
                    r = 0 > p ? "right" : "left";
                    b[l] && (l = c(a, b[l], k + 1, h), q = l[n] < q[n] ? l : m);
                    b[r] && Math.sqrt(p * p) < q[n] && (a = c(a, b[r], k + 1, h), q = a[n] < q[n] ? a : q);
                    return q
                }

                var d = this, e = this.kdAxisArray[0], f = this.kdAxisArray[1], n = b ? "distX" : "dist";
                this.kdTree || this.buildKDTree();
                if (this.kdTree)return c(a, this.kdTree, this.kdDimensions, this.kdDimensions)
            }
        })
    })(L);
    (function (a) {
        function C(a, c, d, g, h) {
            var e = a.chart.inverted;
            this.axis = a;
            this.isNegative = d;
            this.options = c;
            this.x = g;
            this.total = null;
            this.points = {};
            this.stack = h;
            this.rightCliff = this.leftCliff = 0;
            this.alignOptions = {
                align: c.align || (e ? d ? "left" : "right" : "center"),
                verticalAlign: c.verticalAlign || (e ? "middle" : d ? "bottom" : "top"),
                y: t(c.y, e ? 4 : d ? 14 : -6),
                x: t(c.x, e ? d ? -6 : 6 : 0)
            };
            this.textAlign = c.textAlign || (e ? d ? "right" : "left" : "center")
        }

        var B =
            a.Axis, E = a.Chart, H = a.correctFloat, l = a.defined, d = a.destroyObjectProperties, h = a.each, g = a.format, t = a.pick;
        a = a.Series;
        C.prototype = {
            destroy: function () {
                d(this, this.axis)
            }, render: function (a) {
                var c = this.options, d = c.format, d = d ? g(d, this) : c.formatter.call(this);
                this.label ? this.label.attr({
                    text: d,
                    visibility: "hidden"
                }) : this.label = this.axis.chart.renderer.text(d, null, null, c.useHTML).css(c.style).attr({
                    align: this.textAlign,
                    rotation: c.rotation,
                    visibility: "hidden"
                }).add(a)
            }, setOffset: function (a, c) {
                var d = this.axis,
                    g = d.chart, h = g.inverted, m = d.reversed, m = this.isNegative && !m || !this.isNegative && m, b = d.translate(d.usePercentage ? 100 : this.total, 0, 0, 0, 1), d = d.translate(0), d = Math.abs(b - d);
                a = g.xAxis[0].translate(this.x) + a;
                var f = g.plotHeight, h = {
                    x: h ? m ? b : b - d : a,
                    y: h ? f - a - c : m ? f - b - d : f - b,
                    width: h ? d : c,
                    height: h ? c : d
                };
                if (c = this.label)c.align(this.alignOptions, null, h), h = c.alignAttr, c[!1 === this.options.crop || g.isInsidePlot(h.x, h.y) ? "show" : "hide"](!0)
            }
        };
        E.prototype.getStacks = function () {
            var a = this;
            h(a.yAxis, function (a) {
                a.stacks && a.hasVisibleSeries &&
                (a.oldStacks = a.stacks)
            });
            h(a.series, function (c) {
                !c.options.stacking || !0 !== c.visible && !1 !== a.options.chart.ignoreHiddenSeries || (c.stackKey = c.type + t(c.options.stack, ""))
            })
        };
        B.prototype.buildStacks = function () {
            var a = this.series, c, d = t(this.options.reversedStacks, !0), g = a.length, h;
            if (!this.isXAxis) {
                this.usePercentage = !1;
                for (h = g; h--;)a[d ? h : g - h - 1].setStackedPoints();
                for (h = g; h--;)c = a[d ? h : g - h - 1], c.setStackCliffs && c.setStackCliffs();
                if (this.usePercentage)for (h = 0; h < g; h++)a[h].setPercentStacks()
            }
        };
        B.prototype.renderStackTotals =
            function () {
                var a = this.chart, c = a.renderer, d = this.stacks, g, h, l = this.stackTotalGroup;
                l || (this.stackTotalGroup = l = c.g("stack-labels").attr({visibility: "visible", zIndex: 6}).add());
                l.translate(a.plotLeft, a.plotTop);
                for (g in d)for (h in a = d[g], a)a[h].render(l)
            };
        B.prototype.resetStacks = function () {
            var a = this.stacks, c, d;
            if (!this.isXAxis)for (c in a)for (d in a[c])a[c][d].touched < this.stacksTouched ? (a[c][d].destroy(), delete a[c][d]) : (a[c][d].total = null, a[c][d].cum = 0)
        };
        B.prototype.cleanStacks = function () {
            var a, c,
                d;
            if (!this.isXAxis)for (c in this.oldStacks && (a = this.stacks = this.oldStacks), a)for (d in a[c])a[c][d].cum = a[c][d].total
        };
        a.prototype.setStackedPoints = function () {
            if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var a = this.processedXData, c = this.processedYData, d = [], g = c.length, h = this.options, A = h.threshold, b = h.startFromThreshold ? A : 0, f = h.stack, h = h.stacking, q = this.stackKey, w = "-" + q, G = this.negStacks, n = this.yAxis, D = n.stacks, K = n.oldStacks, y, I, r, z, F, B, k;
                n.stacksTouched +=
                    1;
                for (F = 0; F < g; F++)B = a[F], k = c[F], y = this.getStackIndicator(y, B, this.index), z = y.key, r = (I = G && k < (b ? 0 : A)) ? w : q, D[r] || (D[r] = {}), D[r][B] || (K[r] && K[r][B] ? (D[r][B] = K[r][B], D[r][B].total = null) : D[r][B] = new C(n, n.options.stackLabels, I, B, f)), r = D[r][B], null !== k && (r.points[z] = r.points[this.index] = [t(r.cum, b)], l(r.cum) || (r.base = z), r.touched = n.stacksTouched, 0 < y.index && !1 === this.singleStacks && (r.points[z][0] = r.points[this.index + "," + B + ",0"][0])), "percent" === h ? (I = I ? q : w, G && D[I] && D[I][B] ? (I = D[I][B], r.total = I.total = Math.max(I.total,
                        r.total) + Math.abs(k) || 0) : r.total = H(r.total + (Math.abs(k) || 0))) : r.total = H(r.total + (k || 0)), r.cum = t(r.cum, b) + (k || 0), null !== k && (r.points[z].push(r.cum), d[F] = r.cum);
                "percent" === h && (n.usePercentage = !0);
                this.stackedYData = d;
                n.oldStacks = {}
            }
        };
        a.prototype.setPercentStacks = function () {
            var a = this, c = a.stackKey, d = a.yAxis.stacks, g = a.processedXData, l;
            h([c, "-" + c], function (c) {
                for (var b = g.length, e, h; b--;)if (e = g[b], l = a.getStackIndicator(l, e, a.index, c), e = (h = d[c] && d[c][e]) && h.points[l.key])h = h.total ? 100 / h.total : 0, e[0] = H(e[0] *
                    h), e[1] = H(e[1] * h), a.stackedYData[b] = e[1]
            })
        };
        a.prototype.getStackIndicator = function (a, c, d, g) {
            !l(a) || a.x !== c || g && a.key !== g ? a = {x: c, index: 0, key: g} : a.index++;
            a.key = [d, c, a.index].join();
            return a
        }
    })(L);
    (function (a) {
        var C = a.addEvent, B = a.Axis, E = a.createElement, H = a.css, l = a.defined, d = a.each, h = a.erase, g = a.extend, t = a.fireEvent, m = a.inArray, c = a.isNumber, e = a.isObject, p = a.merge, x = a.pick, A = a.Point, b = a.Series, f = a.seriesTypes, q = a.setAnimation, w = a.splat;
        g(a.Chart.prototype, {
            addSeries: function (a, b, c) {
                var d, e = this;
                a && (b =
                    x(b, !0), t(e, "addSeries", {options: a}, function () {
                    d = e.initSeries(a);
                    e.isDirtyLegend = !0;
                    e.linkSeries();
                    b && e.redraw(c)
                }));
                return d
            },
            addAxis: function (a, b, c, d) {
                var e = b ? "xAxis" : "yAxis", f = this.options;
                a = p(a, {index: this[e].length, isX: b});
                new B(this, a);
                f[e] = w(f[e] || {});
                f[e].push(a);
                x(c, !0) && this.redraw(d)
            },
            showLoading: function (a) {
                var b = this, c = b.options, d = b.loadingDiv, e = function () {
                    d && H(d, {
                        left: b.plotLeft + "px",
                        top: b.plotTop + "px",
                        width: b.plotWidth + "px",
                        height: b.plotHeight + "px"
                    })
                };
                d || (b.loadingDiv = d = E("div", {className: "highcharts-loading highcharts-loading-hidden"},
                    null, b.container), b.loadingSpan = E("span", {className: "highcharts-loading-inner"}, null, d), C(b, "redraw", e));
                d.className = "highcharts-loading";
                b.loadingSpan.innerHTML = a || c.lang.loading;
                b.loadingShown = !0;
                e()
            },
            hideLoading: function () {
                var a = this.loadingDiv;
                a && (a.className = "highcharts-loading highcharts-loading-hidden");
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireUpdateSeries: ["chart.polar", "chart.ignoreHiddenSeries", "chart.type", "colors", "plotOptions"],
            update: function (a, b) {
                var e, f = {credits: "addCredits", title: "setTitle", subtitle: "setSubtitle"}, g = a.chart, h, n;
                if (g) {
                    p(!0, this.options.chart, g);
                    "className" in g && this.setClassName(g.className);
                    if ("inverted" in g || "polar" in g)this.propFromSeries(), h = !0;
                    for (e in g)g.hasOwnProperty(e) && (-1 !== m("chart." + e, this.propsRequireUpdateSeries) && (n = !0), -1 !== m(e, this.propsRequireDirtyBox) && (this.isDirtyBox = !0))
                }
                for (e in a) {
                    if (this[e] &&
                        "function" === typeof this[e].update)this[e].update(a[e], !1); else if ("function" === typeof this[f[e]])this[f[e]](a[e]);
                    "chart" !== e && -1 !== m(e, this.propsRequireUpdateSeries) && (n = !0)
                }
                a.plotOptions && p(!0, this.options.plotOptions, a.plotOptions);
                d(["xAxis", "yAxis", "series"], function (b) {
                    a[b] && d(w(a[b]), function (a) {
                        var c = l(a.id) && this.get(a.id) || this[b][0];
                        c && c.coll === b && c.update(a, !1)
                    }, this)
                }, this);
                h && d(this.axes, function (a) {
                    a.update({}, !1)
                });
                n && d(this.series, function (a) {
                    a.update({}, !1)
                });
                a.loading && p(!0, this.options.loading,
                    a.loading);
                e = g && g.width;
                g = g && g.height;
                c(e) && e !== this.chartWidth || c(g) && g !== this.chartHeight ? this.setSize(e, g) : x(b, !0) && this.redraw()
            },
            setSubtitle: function (a) {
                this.setTitle(void 0, a)
            }
        });
        g(A.prototype, {
            update: function (a, b, c, d) {
                function f() {
                    g.applyOptions(a);
                    null === g.y && n && (g.graphic = n.destroy());
                    e(a, !0) && (n && n.element && a && a.marker && a.marker.symbol && (g.graphic = n.destroy()), a && a.dataLabels && g.dataLabel && (g.dataLabel = g.dataLabel.destroy()));
                    l = g.index;
                    h.updateParallelArrays(g, l);
                    k.data[l] = e(k.data[l], !0) ?
                        g.options : a;
                    h.isDirty = h.isDirtyData = !0;
                    !h.fixedBox && h.hasCartesianSeries && (p.isDirtyBox = !0);
                    "point" === k.legendType && (p.isDirtyLegend = !0);
                    b && p.redraw(c)
                }

                var g = this, h = g.series, n = g.graphic, l, p = h.chart, k = h.options;
                b = x(b, !0);
                !1 === d ? f() : g.firePointEvent("update", {options: a}, f)
            }, remove: function (a, b) {
                this.series.removePoint(m(this, this.series.data), a, b)
            }
        });
        g(b.prototype, {
            addPoint: function (a, b, c, d) {
                var e = this.options, f = this.data, g = this.chart, h = this.xAxis && this.xAxis.names, n = e.data, l, k, p = this.xData, m, q;
                b = x(b,
                    !0);
                l = {series: this};
                this.pointClass.prototype.applyOptions.apply(l, [a]);
                q = l.x;
                m = p.length;
                if (this.requireSorting && q < p[m - 1])for (k = !0; m && p[m - 1] > q;)m--;
                this.updateParallelArrays(l, "splice", m, 0, 0);
                this.updateParallelArrays(l, m);
                h && l.name && (h[q] = l.name);
                n.splice(m, 0, a);
                k && (this.data.splice(m, 0, null), this.processData());
                "point" === e.legendType && this.generatePoints();
                c && (f[0] && f[0].remove ? f[0].remove(!1) : (f.shift(), this.updateParallelArrays(l, "shift"), n.shift()));
                this.isDirtyData = this.isDirty = !0;
                b && g.redraw(d)
            },
            removePoint: function (a, b, c) {
                var d = this, e = d.data, f = e[a], g = d.points, h = d.chart, n = function () {
                    g && g.length === e.length && g.splice(a, 1);
                    e.splice(a, 1);
                    d.options.data.splice(a, 1);
                    d.updateParallelArrays(f || {series: d}, "splice", a, 1);
                    f && f.destroy();
                    d.isDirty = !0;
                    d.isDirtyData = !0;
                    b && h.redraw()
                };
                q(c, h);
                b = x(b, !0);
                f ? f.firePointEvent("remove", null, n) : n()
            }, remove: function (a, b, c) {
                function d() {
                    e.destroy();
                    f.isDirtyLegend = f.isDirtyBox = !0;
                    f.linkSeries();
                    x(a, !0) && f.redraw(b)
                }

                var e = this, f = e.chart;
                !1 !== c ? t(e, "remove", null, d) :
                    d()
            }, update: function (a, b) {
                var c = this, e = this.chart, h = this.userOptions, n = this.type, l = a.type || h.type || e.options.chart.type, m = f[n].prototype, q = ["group", "markerGroup", "dataLabelsGroup"], w;
                if (l && l !== n || void 0 !== a.zIndex)q.length = 0;
                d(q, function (a) {
                    q[a] = c[a];
                    delete c[a]
                });
                a = p(h, {animation: !1, index: this.index, pointStart: this.xData[0]}, {data: this.options.data}, a);
                this.remove(!1, null, !1);
                for (w in m)this[w] = void 0;
                g(this, f[l || n].prototype);
                d(q, function (a) {
                    c[a] = q[a]
                });
                this.init(e, a);
                e.linkSeries();
                x(b, !0) && e.redraw(!1)
            }
        });
        g(B.prototype, {
            update: function (a, b) {
                var c = this.chart;
                a = c.options[this.coll][this.options.index] = p(this.userOptions, a);
                this.destroy(!0);
                this.init(c, g(a, {events: void 0}));
                c.isDirtyBox = !0;
                x(b, !0) && c.redraw()
            }, remove: function (a) {
                for (var b = this.chart, c = this.coll, e = this.series, f = e.length; f--;)e[f] && e[f].remove(!1);
                h(b.axes, this);
                h(b[c], this);
                b.options[c].splice(this.options.index, 1);
                d(b[c], function (a, b) {
                    a.options.index = b
                });
                this.destroy();
                b.isDirtyBox = !0;
                x(a, !0) && b.redraw()
            }, setTitle: function (a, b) {
                this.update({title: a},
                    b)
            }, setCategories: function (a, b) {
                this.update({categories: a}, b)
            }
        })
    })(L);
    (function (a) {
        var C = a.each, B = a.map, E = a.pick, H = a.Series, l = a.seriesType;
        l("area", "line", {softThreshold: !1, threshold: 0}, {
            singleStacks: !1, getStackPoints: function () {
                var a = [], h = [], g = this.xAxis, l = this.yAxis, m = l.stacks[this.stackKey], c = {}, e = this.points, p = this.index, x = l.series, A = x.length, b, f = E(l.options.reversedStacks, !0) ? 1 : -1, q, w;
                if (this.options.stacking) {
                    for (q = 0; q < e.length; q++)c[e[q].x] = e[q];
                    for (w in m)null !== m[w].total && h.push(w);
                    h.sort(function (a,
                                     b) {
                        return a - b
                    });
                    b = B(x, function () {
                        return this.visible
                    });
                    C(h, function (d, e) {
                        var n = 0, w, t;
                        if (c[d] && !c[d].isNull)a.push(c[d]), C([-1, 1], function (a) {
                            var g = 1 === a ? "rightNull" : "leftNull", n = 0, l = m[h[e + a]];
                            if (l)for (q = p; 0 <= q && q < A;)w = l.points[q], w || (q === p ? c[d][g] = !0 : b[q] && (t = m[d].points[q]) && (n -= t[1] - t[0])), q += f;
                            c[d][1 === a ? "rightCliff" : "leftCliff"] = n
                        }); else {
                            for (q = p; 0 <= q && q < A;) {
                                if (w = m[d].points[q]) {
                                    n = w[1];
                                    break
                                }
                                q += f
                            }
                            n = l.toPixels(n, !0);
                            a.push({isNull: !0, plotX: g.toPixels(d, !0), plotY: n, yBottom: n})
                        }
                    })
                }
                return a
            }, getGraphPath: function (a) {
                var d =
                    H.prototype.getGraphPath, g = this.options, l = g.stacking, m = this.yAxis, c, e, p = [], x = [], A = this.index, b, f = m.stacks[this.stackKey], q = g.threshold, w = m.getThreshold(g.threshold), G, g = g.connectNulls || "percent" === l, n = function (c, d, e) {
                    var g = a[c];
                    c = l && f[g.x].points[A];
                    var h = g[e + "Null"] || 0;
                    e = g[e + "Cliff"] || 0;
                    var n, t, g = !0;
                    e || h ? (n = (h ? c[0] : c[1]) + e, t = c[0] + e, g = !!h) : !l && a[d] && a[d].isNull && (n = t = q);
                    void 0 !== n && (x.push({
                        plotX: b,
                        plotY: null === n ? w : m.getThreshold(n),
                        isNull: g
                    }), p.push({plotX: b, plotY: null === t ? w : m.getThreshold(t), doCurve: !1}))
                };
                a = a || this.points;
                l && (a = this.getStackPoints());
                for (c = 0; c < a.length; c++)if (e = a[c].isNull, b = E(a[c].rectPlotX, a[c].plotX), G = E(a[c].yBottom, w), !e || g)g || n(c, c - 1, "left"), e && !l && g || (x.push(a[c]), p.push({
                    x: c,
                    plotX: b,
                    plotY: G
                })), g || n(c, c + 1, "right");
                c = d.call(this, x, !0, !0);
                p.reversed = !0;
                e = d.call(this, p, !0, !0);
                e.length && (e[0] = "L");
                e = c.concat(e);
                d = d.call(this, x, !1, g);
                e.xMap = c.xMap;
                this.areaPath = e;
                return d
            }, drawGraph: function () {
                this.areaPath = [];
                H.prototype.drawGraph.apply(this);
                var a = this, h = this.areaPath, g = this.options,
                    l = [["area", "highcharts-area"]];
                C(this.zones, function (a, c) {
                    l.push(["zone-area-" + c, "highcharts-area highcharts-zone-area-" + c + " " + a.className])
                });
                C(l, function (d) {
                    var c = d[0], e = a[c];
                    e ? (e.endX = h.xMap, e.animate({d: h})) : (e = a[c] = a.chart.renderer.path(h).addClass(d[1]).attr({zIndex: 0}).add(a.group), e.isArea = !0);
                    e.startX = h.xMap;
                    e.shiftUnit = g.step ? 2 : 1
                })
            }, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(L);
    (function (a) {
        var C = a.extendClass, B = a.merge, E = a.pick, H = a.Series, l = a.seriesTypes;
        a.defaultPlotOptions.spline =
            B(a.defaultPlotOptions.line);
        l.spline = C(H, {
            type: "spline", getPointSpline: function (a, h, g) {
                var d = h.plotX, l = h.plotY, c = a[g - 1];
                g = a[g + 1];
                var e, p, x, A;
                if (c && !c.isNull && !1 !== c.doCurve && g && !g.isNull && !1 !== g.doCurve) {
                    a = c.plotY;
                    x = g.plotX;
                    g = g.plotY;
                    var b = 0;
                    e = (1.5 * d + c.plotX) / 2.5;
                    p = (1.5 * l + a) / 2.5;
                    x = (1.5 * d + x) / 2.5;
                    A = (1.5 * l + g) / 2.5;
                    x !== e && (b = (A - p) * (x - d) / (x - e) + l - A);
                    p += b;
                    A += b;
                    p > a && p > l ? (p = Math.max(a, l), A = 2 * l - p) : p < a && p < l && (p = Math.min(a, l), A = 2 * l - p);
                    A > g && A > l ? (A = Math.max(g, l), p = 2 * l - A) : A < g && A < l && (A = Math.min(g, l), p = 2 * l - A);
                    h.rightContX =
                        x;
                    h.rightContY = A
                }
                h = ["C", E(c.rightContX, c.plotX), E(c.rightContY, c.plotY), E(e, d), E(p, l), d, l];
                c.rightContX = c.rightContY = null;
                return h
            }
        })
    })(L);
    (function (a) {
        var C = a.seriesTypes.area.prototype, B = a.seriesType;
        B("areaspline", "spline", a.defaultPlotOptions.area, {
            getStackPoints: C.getStackPoints,
            getGraphPath: C.getGraphPath,
            setStackCliffs: C.setStackCliffs,
            drawGraph: C.drawGraph,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(L);
    (function (a) {
        var C = a.animObject, B = a.each, E = a.extend, H = a.isNumber, l = a.merge, d =
            a.pick, h = a.Series, g = a.seriesType, t = a.stop, m = a.svg;
        g("column", "line", {
            borderRadius: 0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {hover: {halo: !1}},
            dataLabels: {align: null, verticalAlign: null, y: null},
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {distance: 6},
            threshold: 0
        }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0,
            init: function () {
                h.prototype.init.apply(this, arguments);
                var a = this, d = a.chart;
                d.hasRendered && B(d.series, function (c) {
                    c.type === a.type && (c.isDirty = !0)
                })
            },
            getColumnMetrics: function () {
                var a = this, e = a.options, g = a.xAxis, h = a.yAxis, l = g.reversed, b, f = {}, m = 0;
                !1 === e.grouping ? m = 1 : B(a.chart.series, function (c) {
                    var d = c.options, e = c.yAxis, g;
                    c.type === a.type && c.visible && h.len === e.len && h.pos === e.pos && (d.stacking ? (b = c.stackKey, void 0 === f[b] && (f[b] = m++), g = f[b]) : !1 !== d.grouping && (g = m++), c.columnIndex = g)
                });
                var w = Math.min(Math.abs(g.transA) * (g.ordinalSlope || e.pointRange || g.closestPointRange || g.tickInterval ||
                    1), g.len), t = w * e.groupPadding, n = (w - 2 * t) / m, e = Math.min(e.maxPointWidth || g.len, d(e.pointWidth, n * (1 - 2 * e.pointPadding)));
                a.columnMetrics = {
                    width: e,
                    offset: (n - e) / 2 + (t + ((a.columnIndex || 0) + (l ? 1 : 0)) * n - w / 2) * (l ? -1 : 1)
                };
                return a.columnMetrics
            },
            crispCol: function (a, d, g, h) {
                var c = this.chart, b = this.borderWidth, e = -(b % 2 ? .5 : 0), b = b % 2 ? .5 : 1;
                c.inverted && c.renderer.isVML && (b += 1);
                g = Math.round(a + g) + e;
                a = Math.round(a) + e;
                h = Math.round(d + h) + b;
                e = .5 >= Math.abs(d) && .5 < h;
                d = Math.round(d) + b;
                h -= d;
                e && h && (--d, h += 1);
                return {x: a, y: d, width: g - a, height: h}
            },
            translate: function () {
                var a = this, e = a.chart, g = a.options, l = a.dense = 2 > a.closestPointRange * a.xAxis.transA, l = a.borderWidth = d(g.borderWidth, l ? 0 : 1), m = a.yAxis, b = a.translatedThreshold = m.getThreshold(g.threshold), f = d(g.minPointLength, 5), q = a.getColumnMetrics(), w = q.width, t = a.barW = Math.max(w, 1 + 2 * l), n = a.pointXOffset = q.offset;
                e.inverted && (b -= .5);
                g.pointPadding && (t = Math.ceil(t));
                h.prototype.translate.apply(a);
                B(a.points, function (c) {
                    var g = d(c.yBottom, b), h = 999 + Math.abs(g), h = Math.min(Math.max(-h, c.plotY), m.len + h), l =
                        c.plotX + n, p = t, q = Math.min(h, g), x, D = Math.max(h, g) - q;
                    Math.abs(D) < f && f && (D = f, x = !m.reversed && !c.negative || m.reversed && c.negative, q = Math.abs(q - b) > f ? g - f : b - (x ? f : 0));
                    c.barX = l;
                    c.pointWidth = w;
                    c.tooltipPos = e.inverted ? [m.len + m.pos - e.plotLeft - h, a.xAxis.len - l - p / 2, D] : [l + p / 2, h + m.pos - e.plotTop, D];
                    c.shapeType = "rect";
                    c.shapeArgs = a.crispCol.apply(a, c.isNull ? [c.plotX, m.len / 2, 0, 0] : [l, q, p, D])
                })
            },
            getSymbol: a.noop,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            drawGraph: function () {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            },
            drawPoints: function () {
                var a = this, d = this.chart, g = d.renderer, h = a.options.animationLimit || 250, m;
                B(a.points, function (b) {
                    var c = b.graphic;
                    H(b.plotY) && null !== b.y ? (m = b.shapeArgs, c ? (t(c), c[d.pointCount < h ? "animate" : "attr"](l(m))) : b.graphic = g[b.shapeType](m).attr({"class": b.getClassName()}).add(b.group || a.group)) : c && (b.graphic = c.destroy())
                })
            },
            animate: function (a) {
                var c = this, d = this.yAxis, g = c.options, h = this.chart.inverted, b = {};
                m && (a ? (b.scaleY = .001, a = Math.min(d.pos + d.len, Math.max(d.pos, d.toPixels(g.threshold))),
                    h ? b.translateX = a - d.len : b.translateY = a, c.group.attr(b)) : (b[h ? "translateX" : "translateY"] = d.pos, c.group.animate(b, E(C(c.options.animation), {
                    step: function (a, b) {
                        c.group.attr({scaleY: Math.max(.001, b.pos)})
                    }
                })), c.animate = null))
            },
            remove: function () {
                var a = this, d = a.chart;
                d.hasRendered && B(d.series, function (c) {
                    c.type === a.type && (c.isDirty = !0)
                });
                h.prototype.remove.apply(a, arguments)
            }
        })
    })(L);
    (function (a) {
        a = a.seriesType;
        a("bar", "column", null, {inverted: !0})
    })(L);
    (function (a) {
        var C = a.Series;
        a = a.seriesType;
        a("scatter",
            "line", {
                lineWidth: 0,
                marker: {enabled: !0},
                tooltip: {
                    headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
                    pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
                }
            }, {
                sorted: !1,
                requireSorting: !1,
                noSharedTooltip: !0,
                trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
                takeOrdinalPosition: !1,
                kdDimensions: 2,
                drawGraph: function () {
                    this.options.lineWidth && C.prototype.drawGraph.call(this)
                }
            })
    })(L);
    (function (a) {
        var C = a.pick, B = a.relativeLength;
        a.CenteredSeriesMixin = {
            getCenter: function () {
                var a = this.options, H = this.chart, l = 2 * (a.slicedOffset || 0), d = H.plotWidth - 2 * l, H = H.plotHeight - 2 * l, h = a.center, h = [C(h[0], "50%"), C(h[1], "50%"), a.size || "100%", a.innerSize || 0], g = Math.min(d, H), t, m;
                for (t = 0; 4 > t; ++t)m = h[t], a = 2 > t || 2 === t && /%$/.test(m), h[t] = B(m, [d, H, g, h[2]][t]) + (a ? l : 0);
                h[3] > h[2] && (h[3] = h[2]);
                return h
            }
        }
    })(L);
    (function (a) {
        var C = a.addEvent, B = a.defined, E = a.each, H = a.extend, l = a.inArray, d = a.noop, h = a.pick, g = a.Point, t =
            a.Series, m = a.seriesType, c = a.setAnimation;
        m("pie", "line", {
            center: [null, null],
            clip: !1,
            colorByPoint: !0,
            dataLabels: {
                distance: 30, enabled: !0, formatter: function () {
                    return null === this.y ? void 0 : this.point.name
                }, x: 0
            },
            ignoreHiddenPoint: !0,
            legendType: "point",
            marker: null,
            size: null,
            showInLegend: !1,
            slicedOffset: 10,
            stickyTracking: !1,
            tooltip: {followPointer: !0}
        }, {
            isCartesian: !1,
            requireSorting: !1,
            directTouch: !0,
            noSharedTooltip: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            axisTypes: [],
            pointAttribs: a.seriesTypes.column.prototype.pointAttribs,
            animate: function (a) {
                var c = this, d = c.points, e = c.startAngleRad;
                a || (E(d, function (a) {
                    var b = a.graphic, d = a.shapeArgs;
                    b && (b.attr({r: a.startR || c.center[3] / 2, start: e, end: e}), b.animate({
                        r: d.r,
                        start: d.start,
                        end: d.end
                    }, c.options.animation))
                }), c.animate = null)
            },
            updateTotals: function () {
                var a, c = 0, d = this.points, g = d.length, b, f = this.options.ignoreHiddenPoint;
                for (a = 0; a < g; a++)b = d[a], 0 > b.y && (b.y = null), c += f && !b.visible ? 0 : b.y;
                this.total = c;
                for (a = 0; a < g; a++)b = d[a], b.percentage = 0 < c && (b.visible || !f) ? b.y / c * 100 : 0, b.total = c
            },
            generatePoints: function () {
                t.prototype.generatePoints.call(this);
                this.updateTotals()
            },
            translate: function (a) {
                this.generatePoints();
                var c = 0, d = this.options, e = d.slicedOffset, b = e + (d.borderWidth || 0), f, g, l, m = d.startAngle || 0, n = this.startAngleRad = Math.PI / 180 * (m - 90), m = (this.endAngleRad = Math.PI / 180 * (h(d.endAngle, m + 360) - 90)) - n, t = this.points, K = d.dataLabels.distance, d = d.ignoreHiddenPoint, y, I = t.length, r;
                a || (this.center = a = this.getCenter());
                this.getX = function (b, c) {
                    l = Math.asin(Math.min((b - a[1]) / (a[2] / 2 + K), 1));
                    return a[0] + (c ? -1 : 1) * Math.cos(l) * (a[2] / 2 + K)
                };
                for (y = 0; y < I; y++) {
                    r = t[y];
                    f = n + c * m;
                    if (!d || r.visible)c += r.percentage / 100;
                    g = n + c * m;
                    r.shapeType = "arc";
                    r.shapeArgs = {
                        x: a[0],
                        y: a[1],
                        r: a[2] / 2,
                        innerR: a[3] / 2,
                        start: Math.round(1E3 * f) / 1E3,
                        end: Math.round(1E3 * g) / 1E3
                    };
                    l = (g + f) / 2;
                    l > 1.5 * Math.PI ? l -= 2 * Math.PI : l < -Math.PI / 2 && (l += 2 * Math.PI);
                    r.slicedTranslation = {
                        translateX: Math.round(Math.cos(l) * e),
                        translateY: Math.round(Math.sin(l) * e)
                    };
                    f = Math.cos(l) * a[2] / 2;
                    g = Math.sin(l) * a[2] / 2;
                    r.tooltipPos = [a[0] + .7 * f, a[1] + .7 * g];
                    r.half = l < -Math.PI / 2 || l > Math.PI / 2 ? 1 : 0;
                    r.angle = l;
                    b = Math.min(b, K / 5);
                    r.labelPos = [a[0] + f + Math.cos(l) *
                    K, a[1] + g + Math.sin(l) * K, a[0] + f + Math.cos(l) * b, a[1] + g + Math.sin(l) * b, a[0] + f, a[1] + g, 0 > K ? "center" : r.half ? "right" : "left", l]
                }
            },
            drawGraph: null,
            drawPoints: function () {
                var a = this, c = a.chart.renderer, d, g, b;
                E(a.points, function (e) {
                    null !== e.y && (g = e.graphic, b = e.shapeArgs, d = e.sliced ? e.slicedTranslation : {}, g ? g.setRadialReference(a.center).animate(H(b, d)) : (e.graphic = g = c[e.shapeType](b).addClass(e.getClassName()).setRadialReference(a.center).attr(d).add(a.group), e.visible || g.attr({visibility: "hidden"})))
                })
            },
            searchPoint: d,
            sortByAngle: function (a, c) {
                a.sort(function (a, d) {
                    return void 0 !== a.angle && (d.angle - a.angle) * c
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            getCenter: a.CenteredSeriesMixin.getCenter,
            getSymbol: d
        }, {
            init: function () {
                g.prototype.init.apply(this, arguments);
                var a = this, c;
                a.name = h(a.name, "Slice");
                c = function (c) {
                    a.slice("select" === c.type)
                };
                C(a, "select", c);
                C(a, "unselect", c);
                return a
            }, setVisible: function (a, c) {
                var d = this, e = d.series, b = e.chart, f = e.options.ignoreHiddenPoint;
                c = h(c, f);
                a !== d.visible && (d.visible =
                    d.options.visible = a = void 0 === a ? !d.visible : a, e.options.data[l(d, e.data)] = d.options, E(["graphic", "dataLabel", "connector", "shadowGroup"], function (b) {
                    if (d[b])d[b][a ? "show" : "hide"](!0)
                }), d.legendItem && b.legend.colorizeItem(d, a), a || "hover" !== d.state || d.setState(""), f && (e.isDirty = !0), c && b.redraw())
            }, slice: function (a, d, g) {
                var e = this.series;
                c(g, e.chart);
                h(d, !0);
                this.sliced = this.options.sliced = a = B(a) ? a : !this.sliced;
                e.options.data[l(this, e.data)] = this.options;
                this.graphic.animate(a ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                })
            }, haloPath: function (a) {
                var c = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(c.x, c.y, c.r + a, c.r + a, {
                    innerR: this.shapeArgs.r,
                    start: c.start,
                    end: c.end
                })
            }
        })
    })(L);
    (function (a) {
        var C = a.addEvent, B = a.arrayMax, E = a.defined, H = a.each, l = a.extend, d = a.format, h = a.map, g = a.merge, t = a.noop, m = a.pick, c = a.relativeLength, e = a.Series, p = a.seriesTypes, x = a.stableSort, A = a.stop;
        a.distribute = function (a, c) {
            function b(a, b) {
                return a.target - b.target
            }

            var d, e = !0, f = a, g = [], l;
            l = 0;
            for (d =
                     a.length; d--;)l += a[d].size;
            if (l > c) {
                x(a, function (a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (l = d = 0; l <= c;)l += a[d].size, d++;
                g = a.splice(d - 1, a.length)
            }
            x(a, b);
            for (a = h(a, function (a) {
                return {size: a.size, targets: [a.target]}
            }); e;) {
                for (d = a.length; d--;)e = a[d], l = (Math.min.apply(0, e.targets) + Math.max.apply(0, e.targets)) / 2, e.pos = Math.min(Math.max(0, l - e.size / 2), c - e.size);
                d = a.length;
                for (e = !1; d--;)0 < d && a[d - 1].pos + a[d - 1].size > a[d].pos && (a[d - 1].size += a[d].size, a[d - 1].targets = a[d - 1].targets.concat(a[d].targets), a[d - 1].pos +
                a[d - 1].size > c && (a[d - 1].pos = c - a[d - 1].size), a.splice(d, 1), e = !0)
            }
            d = 0;
            H(a, function (a) {
                var b = 0;
                H(a.targets, function () {
                    f[d].pos = a.pos + b;
                    b += f[d].size;
                    d++
                })
            });
            f.push.apply(f, g);
            x(f, b)
        };
        e.prototype.drawDataLabels = function () {
            var a = this, c = a.options, e = c.dataLabels, h = a.points, l, n, p = a.hasRendered || 0, t, y, x = m(e.defer, !0), r = a.chart.renderer;
            if (e.enabled || a._hasPointLabels)a.dlProcessOptions && a.dlProcessOptions(e), y = a.plotGroup("dataLabelsGroup", "data-labels", x && !p ? "hidden" : "visible", e.zIndex || 6), x && (y.attr({opacity: +p}),
            p || C(a, "afterAnimate", function () {
                a.visible && y.show(!0);
                y[c.animation ? "animate" : "attr"]({opacity: 1}, {duration: 200})
            })), n = e, H(h, function (b) {
                var c, f = b.dataLabel, h, p, q = b.connector, w = !0;
                l = b.dlOptions || b.options && b.options.dataLabels;
                c = m(l && l.enabled, n.enabled) && null !== b.y;
                if (f && !c)b.dataLabel = f.destroy(); else if (c) {
                    e = g(n, l);
                    c = e.rotation;
                    h = b.getLabelConfig();
                    t = e.format ? d(e.format, h) : e.formatter.call(h, e);
                    if (f)E(t) ? (f.attr({text: t}), w = !1) : (b.dataLabel = f = f.destroy(), q && (b.connector = q.destroy())); else if (E(t)) {
                        f =
                        {r: e.borderRadius || 0, rotation: c, padding: e.padding, zIndex: 1};
                        for (p in f)void 0 === f[p] && delete f[p];
                        f = b.dataLabel = r[c ? "text" : "label"](t, 0, -9999, e.shape, null, null, e.useHTML, null, "data-label").attr(f);
                        f.addClass("highcharts-data-label-color-" + b.colorIndex + " " + (e.className || ""));
                        f.add(y)
                    }
                    f && a.alignDataLabel(b, f, e, null, w)
                }
            })
        };
        e.prototype.alignDataLabel = function (a, c, d, e, g) {
            var b = this.chart, f = b.inverted, h = m(a.plotX, -9999), p = m(a.plotY, -9999), q = c.getBBox(), r, t = d.rotation, w = d.align, x = this.visible && (a.series.forceDL ||
                b.isInsidePlot(h, Math.round(p), f) || e && b.isInsidePlot(h, f ? e.x + 1 : e.y + e.height - 1, f)), k = "justify" === m(d.overflow, "justify");
            x && (r = b.renderer.fontMetrics(void 0, c).b, e = l({
                x: f ? b.plotWidth - p : h,
                y: Math.round(f ? b.plotHeight - h : p),
                width: 0,
                height: 0
            }, e), l(d, {
                width: q.width,
                height: q.height
            }), t ? (k = !1, f = b.renderer.rotCorr(r, t), f = {
                x: e.x + d.x + e.width / 2 + f.x,
                y: e.y + d.y + {top: 0, middle: .5, bottom: 1}[d.verticalAlign] * e.height
            }, c[g ? "attr" : "animate"](f).attr({align: w}), h = (t + 720) % 360, h = 180 < h && 360 > h, "left" === w ? f.y -= h ? q.height : 0 :
                "center" === w ? (f.x -= q.width / 2, f.y -= q.height / 2) : "right" === w && (f.x -= q.width, f.y -= h ? 0 : q.height)) : (c.align(d, null, e), f = c.alignAttr), k ? this.justifyDataLabel(c, d, f, q, e, g) : m(d.crop, !0) && (x = b.isInsidePlot(f.x, f.y) && b.isInsidePlot(f.x + q.width, f.y + q.height)), d.shape && !t && c.attr({
                anchorX: a.plotX,
                anchorY: a.plotY
            }));
            x || (A(c), c.attr({y: -9999}), c.placed = !1)
        };
        e.prototype.justifyDataLabel = function (a, c, d, e, g, h) {
            var b = this.chart, f = c.align, n = c.verticalAlign, l, m, p = a.box ? 0 : a.padding || 0;
            l = d.x + p;
            0 > l && ("right" === f ? c.align =
                "left" : c.x = -l, m = !0);
            l = d.x + e.width - p;
            l > b.plotWidth && ("left" === f ? c.align = "right" : c.x = b.plotWidth - l, m = !0);
            l = d.y + p;
            0 > l && ("bottom" === n ? c.verticalAlign = "top" : c.y = -l, m = !0);
            l = d.y + e.height - p;
            l > b.plotHeight && ("top" === n ? c.verticalAlign = "bottom" : c.y = b.plotHeight - l, m = !0);
            m && (a.placed = !h, a.align(c, null, g))
        };
        p.pie && (p.pie.prototype.drawDataLabels = function () {
            var b = this, c = b.data, d, g = b.chart, l = b.options.dataLabels, n = m(l.connectorPadding, 10), p = m(l.connectorWidth, 1), t = g.plotWidth, y = g.plotHeight, x, r = l.distance, z = b.center,
                A = z[2] / 2, C = z[1], k = 0 < r, v, E, L, P, M = [[], []], u, J, O, T, S = [0, 0, 0, 0];
            b.visible && (l.enabled || b._hasPointLabels) && (e.prototype.drawDataLabels.apply(b), H(c, function (a) {
                a.dataLabel && a.visible && (M[a.half].push(a), a.dataLabel._pos = null)
            }), H(M, function (c, e) {
                var f, k, m = c.length, p, q, w;
                if (m)for (b.sortByAngle(c, e - .5), 0 < r && (f = Math.max(0, C - A - r), k = Math.min(C + A + r, g.plotHeight), p = h(c, function (a) {
                    if (a.dataLabel)return w = a.dataLabel.getBBox().height || 21, {
                        target: a.labelPos[1] - f + w / 2,
                        size: w,
                        rank: a.y
                    }
                }), a.distribute(p, k + w - f)), T =
                    0; T < m; T++)d = c[T], L = d.labelPos, v = d.dataLabel, O = !1 === d.visible ? "hidden" : "inherit", q = L[1], p ? void 0 === p[T].pos ? O = "hidden" : (P = p[T].size, J = f + p[T].pos) : J = q, u = l.justify ? z[0] + (e ? -1 : 1) * (A + r) : b.getX(J < f + 2 || J > k - 2 ? q : J, e), v._attr = {
                    visibility: O,
                    align: L[6]
                }, v._pos = {
                    x: u + l.x + ({left: n, right: -n}[L[6]] || 0),
                    y: J + l.y - 10
                }, L.x = u, L.y = J, null === b.options.size && (E = v.width, u - E < n ? S[3] = Math.max(Math.round(E - u + n), S[3]) : u + E > t - n && (S[1] = Math.max(Math.round(u + E - t + n), S[1])), 0 > J - P / 2 ? S[0] = Math.max(Math.round(-J + P / 2), S[0]) : J + P / 2 > y && (S[2] =
                    Math.max(Math.round(J + P / 2 - y), S[2])))
            }), 0 === B(S) || this.verifyDataLabelOverflow(S)) && (this.placeDataLabels(), k && p && H(this.points, function (a) {
                var c;
                x = a.connector;
                if ((v = a.dataLabel) && v._pos && a.visible) {
                    O = v._attr.visibility;
                    if (c = !x)a.connector = x = g.renderer.path().addClass("highcharts-data-label-connector highcharts-color-" + a.colorIndex).add(b.dataLabelsGroup);
                    x[c ? "attr" : "animate"]({d: b.connectorPath(a.labelPos)});
                    x.attr("visibility", O)
                } else x && (a.connector = x.destroy())
            }))
        }, p.pie.prototype.connectorPath =
            function (a) {
                var b = a.x, c = a.y;
                return m(this.options.softConnector, !0) ? ["M", b + ("left" === a[6] ? 5 : -5), c, "C", b, c, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", b + ("left" === a[6] ? 5 : -5), c, "L", a[2], a[3], "L", a[4], a[5]]
            }, p.pie.prototype.placeDataLabels = function () {
            H(this.points, function (a) {
                var b = a.dataLabel;
                b && a.visible && ((a = b._pos) ? (b.attr(b._attr), b[b.moved ? "animate" : "attr"](a), b.moved = !0) : b && b.attr({y: -9999}))
            })
        }, p.pie.prototype.alignDataLabel = t, p.pie.prototype.verifyDataLabelOverflow = function (a) {
            var b =
                this.center, d = this.options, e = d.center, g = d.minSize || 80, h, l;
            null !== e[0] ? h = Math.max(b[2] - Math.max(a[1], a[3]), g) : (h = Math.max(b[2] - a[1] - a[3], g), b[0] += (a[3] - a[1]) / 2);
            null !== e[1] ? h = Math.max(Math.min(h, b[2] - Math.max(a[0], a[2])), g) : (h = Math.max(Math.min(h, b[2] - a[0] - a[2]), g), b[1] += (a[0] - a[2]) / 2);
            h < b[2] ? (b[2] = h, b[3] = Math.min(c(d.innerSize || 0, h), h), this.translate(b), this.drawDataLabels && this.drawDataLabels()) : l = !0;
            return l
        });
        p.column && (p.column.prototype.alignDataLabel = function (a, c, d, h, l) {
            var b = this.chart.inverted,
                f = a.series, p = a.dlBox || a.shapeArgs, t = m(a.below, a.plotY > m(this.translatedThreshold, f.yAxis.len)), q = m(d.inside, !!this.options.stacking);
            p && (h = g(p), 0 > h.y && (h.height += h.y, h.y = 0), p = h.y + h.height - f.yAxis.len, 0 < p && (h.height -= p), b && (h = {
                x: f.yAxis.len - h.y - h.height,
                y: f.xAxis.len - h.x - h.width,
                width: h.height,
                height: h.width
            }), q || (b ? (h.x += t ? 0 : h.width, h.width = 0) : (h.y += t ? h.height : 0, h.height = 0)));
            d.align = m(d.align, !b || q ? "center" : t ? "right" : "left");
            d.verticalAlign = m(d.verticalAlign, b || q ? "middle" : t ? "top" : "bottom");
            e.prototype.alignDataLabel.call(this,
                a, c, d, h, l)
        })
    })(L);
    (function (a) {
        var C = a.Chart, B = a.each, E = a.pick, H = a.addEvent;
        C.prototype.callbacks.push(function (a) {
            function d() {
                var d = [];
                B(a.series, function (a) {
                    var g = a.options.dataLabels, h = a.dataLabelCollections || ["dataLabel"];
                    (g.enabled || a._hasPointLabels) && !g.allowOverlap && a.visible && B(h, function (c) {
                        B(a.points, function (a) {
                            a[c] && (a[c].labelrank = E(a.labelrank, a.shapeArgs && a.shapeArgs.height), d.push(a[c]))
                        })
                    })
                });
                a.hideOverlappingLabels(d)
            }

            d();
            H(a, "redraw", d)
        });
        C.prototype.hideOverlappingLabels = function (a) {
            var d =
                a.length, h, g, l, m, c, e, p, x, A, b = function (a, b, c, d, e, g, h, l) {
                return !(e > a + c || e + h < a || g > b + d || g + l < b)
            };
            for (g = 0; g < d; g++)if (h = a[g])h.oldOpacity = h.opacity, h.newOpacity = 1;
            a.sort(function (a, b) {
                return (b.labelrank || 0) - (a.labelrank || 0)
            });
            for (g = 0; g < d; g++)for (l = a[g], h = g + 1; h < d; ++h)if (m = a[h], l && m && l.placed && m.placed && 0 !== l.newOpacity && 0 !== m.newOpacity && (c = l.alignAttr, e = m.alignAttr, p = l.parentGroup, x = m.parentGroup, A = 2 * (l.box ? 0 : l.padding), c = b(c.x + p.translateX, c.y + p.translateY, l.width - A, l.height - A, e.x + x.translateX, e.y + x.translateY,
                    m.width - A, m.height - A)))(l.labelrank < m.labelrank ? l : m).newOpacity = 0;
            B(a, function (a) {
                var b, c;
                a && (c = a.newOpacity, a.oldOpacity !== c && a.placed && (c ? a.show(!0) : b = function () {
                    a.hide()
                }, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)), a.isOld = !0)
            })
        }
    })(L);
    (function (a) {
        var C = a.addEvent, B = a.Chart, E = a.createElement, H = a.css, l = a.defaultOptions, d = a.defaultPlotOptions, h = a.each, g = a.extend, t = a.fireEvent, m = a.hasTouch, c = a.inArray, e = a.isObject, p = a.Legend, x = a.merge, A = a.pick, b = a.Point, f = a.Series, q = a.seriesTypes,
            w = a.svg, G;
        G = a.TrackerMixin = {
            drawTrackerPoint: function () {
                var a = this, b = a.chart, c = b.pointer, d = function (a) {
                    for (var c = a.target, d; c && !d;)d = c.point, c = c.parentNode;
                    if (void 0 !== d && d !== b.hoverPoint)d.onMouseOver(a)
                };
                h(a.points, function (a) {
                    a.graphic && (a.graphic.element.point = a);
                    a.dataLabel && (a.dataLabel.element.point = a)
                });
                a._hasTracking || (h(a.trackerGroups, function (b) {
                    if (a[b] && (a[b].addClass("highcharts-tracker").on("mouseover", d).on("mouseout", function (a) {
                            c.onTrackerMouseOut(a)
                        }), m))a[b].on("touchstart", d)
                }),
                    a._hasTracking = !0)
            }, drawTrackerGraph: function () {
                var a = this, b = a.options.trackByArea, c = [].concat(b ? a.areaPath : a.graphPath), d = c.length, e = a.chart, f = e.pointer, g = e.renderer, l = e.options.tooltip.snap, p = a.tracker, k, q = function () {
                    if (e.hoverSeries !== a)a.onMouseOver()
                }, t = "rgba(192,192,192," + (w ? .0001 : .002) + ")";
                if (d && !b)for (k = d + 1; k--;)"M" === c[k] && c.splice(k + 1, 0, c[k + 1] - l, c[k + 2], "L"), (k && "M" === c[k] || k === d) && c.splice(k, 0, "L", c[k - 2] + l, c[k - 1]);
                p ? p.attr({d: c}) : a.graph && (a.tracker = g.path(c).attr({
                    "stroke-linejoin": "round",
                    visibility: a.visible ? "visible" : "hidden",
                    stroke: t,
                    fill: b ? t : "none",
                    "stroke-width": a.graph.strokeWidth() + (b ? 0 : 2 * l),
                    zIndex: 2
                }).add(a.group), h([a.tracker, a.markerGroup], function (a) {
                    a.addClass("highcharts-tracker").on("mouseover", q).on("mouseout", function (a) {
                        f.onTrackerMouseOut(a)
                    });
                    if (m)a.on("touchstart", q)
                }))
            }
        };
        q.column && (q.column.prototype.drawTracker = G.drawTrackerPoint);
        q.pie && (q.pie.prototype.drawTracker = G.drawTrackerPoint);
        q.scatter && (q.scatter.prototype.drawTracker = G.drawTrackerPoint);
        g(p.prototype,
            {
                setItemEvents: function (a, b, c) {
                    var d = this.chart, e = "highcharts-legend-" + (a.series ? "point" : "series") + "-active";
                    (c ? b : a.legendGroup).on("mouseover", function () {
                        a.setState("hover");
                        d.seriesGroup.addClass(e)
                    }).on("mouseout", function () {
                        d.seriesGroup.removeClass(e);
                        a.setState()
                    }).on("click", function (b) {
                        var c = function () {
                            a.setVisible && a.setVisible()
                        };
                        b = {browserEvent: b};
                        a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : t(a, "legendItemClick", b, c)
                    })
                }, createCheckboxForItem: function (a) {
                a.checkbox = E("input",
                    {
                        type: "checkbox",
                        checked: a.selected,
                        defaultChecked: a.selected
                    }, this.options.itemCheckboxStyle, this.chart.container);
                C(a.checkbox, "click", function (b) {
                    t(a.series || a, "checkboxClick", {checked: b.target.checked, item: a}, function () {
                        a.select()
                    })
                })
            }
            });
        g(B.prototype, {
            showResetZoom: function () {
                var a = this, b = l.lang, c = a.options.chart.resetZoomButton, d = c.theme, e = d.states, f = "chart" === c.relativeTo ? null : "plotBox";
                this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function () {
                    a.zoomOut()
                }, d, e && e.hover).attr({
                    align: c.position.align,
                    title: b.resetZoomTitle
                }).addClass("highcharts-reset-zoom").add().align(c.position, !1, f)
            }, zoomOut: function () {
                var a = this;
                t(a, "selection", {resetSelection: !0}, function () {
                    a.zoom()
                })
            }, zoom: function (a) {
                var b, c = this.pointer, d = !1, f;
                !a || a.resetSelection ? h(this.axes, function (a) {
                    b = a.zoom()
                }) : h(a.xAxis.concat(a.yAxis), function (a) {
                    var e = a.axis, f = e.isXAxis;
                    if (c[f ? "zoomX" : "zoomY"] || c[f ? "pinchX" : "pinchY"])b = e.zoom(a.min, a.max), e.displayBtn && (d = !0)
                });
                f = this.resetZoomButton;
                d && !f ? this.showResetZoom() : !d && e(f) && (this.resetZoomButton =
                    f.destroy());
                b && this.redraw(A(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
            }, pan: function (a, b) {
                var c = this, d = c.hoverPoints, e;
                d && h(d, function (a) {
                    a.setState()
                });
                h("xy" === b ? [1, 0] : [1], function (b) {
                    b = c[b ? "xAxis" : "yAxis"][0];
                    var d = b.horiz, f = a[d ? "chartX" : "chartY"], d = d ? "mouseDownX" : "mouseDownY", g = c[d], h = (b.pointRange || 0) / 2, l = b.getExtremes(), n = b.toValue(g - f, !0) + h, h = b.toValue(g + b.len - f, !0) - h, g = g > f;
                    b.series.length && (g || n > Math.min(l.dataMin, l.min)) && (!g || h < Math.max(l.dataMax, l.max)) && (b.setExtremes(n,
                        h, !1, !1, {trigger: "pan"}), e = !0);
                    c[d] = f
                });
                e && c.redraw(!1);
                H(c.container, {cursor: "move"})
            }
        });
        g(b.prototype, {
            select: function (a, b) {
                var d = this, e = d.series, f = e.chart;
                a = A(a, !d.selected);
                d.firePointEvent(a ? "select" : "unselect", {accumulate: b}, function () {
                    d.selected = d.options.selected = a;
                    e.options.data[c(d, e.data)] = d.options;
                    d.setState(a && "select");
                    b || h(f.getSelectedPoints(), function (a) {
                        a.selected && a !== d && (a.selected = a.options.selected = !1, e.options.data[c(a, e.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
                    })
                })
            },
            onMouseOver: function (a, b) {
                var c = this.series, d = c.chart, e = d.tooltip, f = d.hoverPoint;
                if (this.series) {
                    if (!b) {
                        if (f && f !== this)f.onMouseOut();
                        if (d.hoverSeries !== c)c.onMouseOver();
                        d.hoverPoint = this
                    }
                    !e || e.shared && !c.noSharedTooltip ? e || this.setState("hover") : (this.setState("hover"), e.refresh(this, a));
                    this.firePointEvent("mouseOver")
                }
            }, onMouseOut: function () {
                var a = this.series.chart, b = a.hoverPoints;
                this.firePointEvent("mouseOut");
                b && -1 !== c(this, b) || (this.setState(), a.hoverPoint = null)
            }, importEvents: function () {
                if (!this.hasImportedEvents) {
                    var a =
                        x(this.series.options.point, this.options).events, b;
                    this.events = a;
                    for (b in a)C(this, b, a[b]);
                    this.hasImportedEvents = !0
                }
            }, setState: function (b, c) {
                var e = Math.floor(this.plotX), f = this.plotY, g = this.series, h = g.options.states[b] || {}, l = d[g.type].marker && g.options.marker, n = l && !1 === l.enabled, m = l && l.states && l.states[b] || {}, k = !1 === m.enabled, p = g.stateMarkerGraphic, q = this.marker || {}, t = g.chart, x = g.halo, w;
                b = b || "";
                if (!(b === this.state && !c || this.selected && "select" !== b || !1 === h.enabled || b && (k || n && !1 === m.enabled) || b && q.states &&
                    q.states[b] && !1 === q.states[b].enabled)) {
                    l && g.markerAttribs && (w = g.markerAttribs(this, b));
                    if (this.graphic)this.state && this.graphic.removeClass("highcharts-point-" + this.state), b && this.graphic.addClass("highcharts-point-" + b), w && this.graphic.animate(w, A(t.options.chart.animation, m.animation, l.animation)), p && p.hide(); else {
                        if (b && m)if (l = q.symbol || g.symbol, p && p.currentSymbol !== l && (p = p.destroy()), p)p[c ? "animate" : "attr"]({
                            x: w.x,
                            y: w.y
                        }); else l && (g.stateMarkerGraphic = p = t.renderer.symbol(l, w.x, w.y, w.width, w.height).add(g.markerGroup),
                            p.currentSymbol = l);
                        p && (p[b && t.isInsidePlot(e, f, t.inverted) ? "show" : "hide"](), p.element.point = this)
                    }
                    (e = h.halo) && e.size ? (x || (g.halo = x = t.renderer.path().add(g.markerGroup || g.group)), a.stop(x), x[c ? "animate" : "attr"]({d: this.haloPath(e.size)}), x.attr({"class": "highcharts-halo highcharts-color-" + A(this.colorIndex, g.colorIndex)})) : x && x.animate({d: this.haloPath(0)});
                    this.state = b
                }
            }, haloPath: function (a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
            }
        });
        g(f.prototype,
            {
                onMouseOver: function () {
                    var a = this.chart, b = a.hoverSeries;
                    if (b && b !== this)b.onMouseOut();
                    this.options.events.mouseOver && t(this, "mouseOver");
                    this.setState("hover");
                    a.hoverSeries = this
                }, onMouseOut: function () {
                var a = this.options, b = this.chart, c = b.tooltip, d = b.hoverPoint;
                b.hoverSeries = null;
                if (d)d.onMouseOut();
                this && a.events.mouseOut && t(this, "mouseOut");
                !c || a.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
                this.setState()
            }, setState: function (a) {
                var b = this;
                a = a || "";
                b.state !== a && (h([b.group, b.markerGroup],
                    function (c) {
                        c && (b.state && c.removeClass("highcharts-series-" + b.state), a && c.addClass("highcharts-series-" + a))
                    }), b.state = a)
            }, setVisible: function (a, b) {
                var c = this, d = c.chart, e = c.legendItem, f, g = d.options.chart.ignoreHiddenSeries, l = c.visible;
                f = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !l : a) ? "show" : "hide";
                h(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function (a) {
                    if (c[a])c[a][f]()
                });
                if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c)c.onMouseOut();
                e && d.legend.colorizeItem(c,
                    a);
                c.isDirty = !0;
                c.options.stacking && h(d.series, function (a) {
                    a.options.stacking && a.visible && (a.isDirty = !0)
                });
                h(c.linkedSeries, function (b) {
                    b.setVisible(a, !1)
                });
                g && (d.isDirtyBox = !0);
                !1 !== b && d.redraw();
                t(c, f)
            }, show: function () {
                this.setVisible(!0)
            }, hide: function () {
                this.setVisible(!1)
            }, select: function (a) {
                this.selected = a = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                t(this, a ? "select" : "unselect")
            }, drawTracker: G.drawTrackerGraph
            })
    })(L);
    (function (a) {
        var C = a.Chart, B = a.each, E = a.inArray, H =
            a.isObject, l = a.pick, d = a.splat;
        C.prototype.setResponsive = function (a) {
            var d = this.options.responsive;
            d && d.rules && B(d.rules, function (d) {
                this.matchResponsiveRule(d, a)
            }, this)
        };
        C.prototype.matchResponsiveRule = function (d, g) {
            var h = this.respRules, m = d.condition, c;
            c = d.callback || function () {
                    return this.chartWidth <= l(m.maxWidth, Number.MAX_VALUE) && this.chartHeight <= l(m.maxHeight, Number.MAX_VALUE) && this.chartWidth >= l(m.minWidth, 0) && this.chartHeight >= l(m.minHeight, 0)
                };
            void 0 === d._id && (d._id = a.idCounter++);
            c = c.call(this);
            !h[d._id] && c ? d.chartOptions && (h[d._id] = this.currentOptions(d.chartOptions), this.update(d.chartOptions, g)) : h[d._id] && !c && (this.update(h[d._id], g), delete h[d._id])
        };
        C.prototype.currentOptions = function (a) {
            function g(a, c, e) {
                var h, l;
                for (h in a)if (-1 < E(h, ["series", "xAxis", "yAxis"]))for (a[h] = d(a[h]), e[h] = [], l = 0; l < a[h].length; l++)e[h][l] = {}, g(a[h][l], c[h][l], e[h][l]); else H(a[h]) ? (e[h] = {}, g(a[h], c[h] || {}, e[h])) : e[h] = c[h] || null
            }

            var h = {};
            g(a, this.options, h);
            return h
        }
    })(L);
    return L
});

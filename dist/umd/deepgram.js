!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.deepgram = t())
    : (e.deepgram = t());
})(self, () =>
  (() => {
    var e = {
        993: (e, t, r) => {
          "use strict";
          function n(e) {
            return "transcriptionData" in e;
          }
          r.r(t),
            r.d(t, {
              AssemblyAiConverter: () => d,
              DeepgramConverter: () => l,
              chunkArray: () => u,
              isConverter: () => n,
              secondsToTimestamp: () => c,
              srt: () => v,
              webvtt: () => f,
            });
          var i = r(484),
            s = r.n(i),
            o = r(576),
            a = r.n(o);
          function c(e, t = "HH:mm:ss.SSS") {
            return s()(1e3 * e)
              .utc()
              .format(t);
          }
          function u(e, t) {
            const r = [];
            for (let n = 0; n < e.length; n += t) {
              const i = e.slice(n, n + t);
              r.push(i);
            }
            return r;
          }
          s().extend(a());
          class l {
            constructor(e) {
              this.transcriptionData = e;
            }
            getLines(e = 8) {
              const { results: t } = this.transcriptionData;
              let r = [];
              if (t.utterances)
                t.utterances.forEach((t) => {
                  t.words.length > e ? r.push(...u(t.words, e)) : r.push(t.words);
                });
              else {
                const n = t.channels[0].alternatives[0].words,
                  i = "speaker" in n[0];
                let s = [],
                  o = 0;
                n.forEach((t) => {
                  var n;
                  i && t.speaker !== o && (r.push(s), (s = [])),
                    s.length === e && (r.push(s), (s = [])),
                    i && (o = null !== (n = t.speaker) && void 0 !== n ? n : 0),
                    s.push(t);
                }),
                  r.push(s);
              }
              return r;
            }
            getHeaders() {
              var e, t, r, n, i, s, o, a;
              const c = [];
              return (
                c.push("NOTE"),
                c.push("Transcription provided by Deepgram"),
                (null === (e = this.transcriptionData.metadata) || void 0 === e
                  ? void 0
                  : e.request_id) &&
                  c.push(
                    `Request Id: ${
                      null === (t = this.transcriptionData.metadata) || void 0 === t
                        ? void 0
                        : t.request_id
                    }`
                  ),
                (null === (r = this.transcriptionData.metadata) || void 0 === r
                  ? void 0
                  : r.created) &&
                  c.push(
                    `Created: ${
                      null === (n = this.transcriptionData.metadata) || void 0 === n
                        ? void 0
                        : n.created
                    }`
                  ),
                (null === (i = this.transcriptionData.metadata) || void 0 === i
                  ? void 0
                  : i.duration) &&
                  c.push(
                    `Duration: ${
                      null === (s = this.transcriptionData.metadata) || void 0 === s
                        ? void 0
                        : s.duration
                    }`
                  ),
                (null === (o = this.transcriptionData.metadata) || void 0 === o
                  ? void 0
                  : o.channels) &&
                  c.push(
                    `Channels: ${
                      null === (a = this.transcriptionData.metadata) || void 0 === a
                        ? void 0
                        : a.channels
                    }`
                  ),
                c
              );
            }
          }
          const h = (e) => ({
            word: e.text,
            start: e.start,
            end: e.end,
            confidence: e.confidence,
            punctuated_word: e.text,
            speaker: e.speaker,
          });
          class d {
            constructor(e) {
              this.transcriptionData = e;
            }
            getLines(e = 8) {
              const t = this.transcriptionData;
              let r = [];
              return (
                t.utterances
                  ? t.utterances.forEach((t) => {
                      t.words.length > e
                        ? r.push(
                            ...u(
                              t.words.map((e) => h(e)),
                              e
                            )
                          )
                        : r.push(t.words.map((e) => h(e)));
                    })
                  : r.push(
                      ...u(
                        t.words.map((e) => h(e)),
                        e
                      )
                    ),
                r
              );
            }
            getHeaders() {
              const e = [];
              return (
                e.push("NOTE"),
                e.push("Transcription provided by Assembly AI"),
                this.transcriptionData.id && e.push(`Id: ${this.transcriptionData.id}`),
                this.transcriptionData.audio_duration &&
                  e.push(`Duration: ${this.transcriptionData.audio_duration}`),
                e
              );
            }
          }
          const p = (e) => (n(e) ? e : new l(e)),
            f = (e, t = 8) => {
              const r = [];
              let n = p(e);
              r.push("WEBVTT"),
                r.push(""),
                n.getHeaders && r.push(n.getHeaders().join("\n")),
                n.getHeaders && r.push("");
              const i = n.getLines(t),
                s = "speaker" in i[0][0];
              return (
                i.forEach((e) => {
                  const t = e[0],
                    n = e[e.length - 1];
                  r.push(`${c(t.start)} --\x3e ${c(n.end)}`);
                  const i = e
                      .map((e) => {
                        var t;
                        return null !== (t = e.punctuated_word) && void 0 !== t ? t : e.word;
                      })
                      .join(" "),
                    o = s ? `<v Speaker ${t.speaker}>` : "";
                  r.push(`${o}${i}`), r.push("");
                }),
                r.join("\n")
              );
            },
            v = (e, t = 8) => {
              const r = [];
              let n = p(e).getLines(t);
              const i = "speaker" in n[0][0];
              let s,
                o = 1;
              return (
                n.forEach((e) => {
                  r.push((o++).toString());
                  const t = e[0],
                    n = e[e.length - 1];
                  r.push(`${c(t.start, "HH:mm:ss,SSS")} --\x3e ${c(n.end, "HH:mm:ss,SSS")}`);
                  const a = e
                      .map((e) => {
                        var t;
                        return null !== (t = e.punctuated_word) && void 0 !== t ? t : e.word;
                      })
                      .join(" "),
                    u = i && s !== t.speaker ? `[Speaker ${t.speaker}]\n` : "";
                  r.push(`${u}${a}`), r.push(""), (s = t.speaker);
                }),
                r.join("\n")
              );
            };
        },
        98: function (e, t) {
          var r = "undefined" != typeof self ? self : this,
            n = (function () {
              function e() {
                (this.fetch = !1), (this.DOMException = r.DOMException);
              }
              return (e.prototype = r), new e();
            })();
          !(function (e) {
            !(function (t) {
              var r = "URLSearchParams" in e,
                n = "Symbol" in e && "iterator" in Symbol,
                i =
                  "FileReader" in e &&
                  "Blob" in e &&
                  (function () {
                    try {
                      return new Blob(), !0;
                    } catch (e) {
                      return !1;
                    }
                  })(),
                s = "FormData" in e,
                o = "ArrayBuffer" in e;
              if (o)
                var a = [
                    "[object Int8Array]",
                    "[object Uint8Array]",
                    "[object Uint8ClampedArray]",
                    "[object Int16Array]",
                    "[object Uint16Array]",
                    "[object Int32Array]",
                    "[object Uint32Array]",
                    "[object Float32Array]",
                    "[object Float64Array]",
                  ],
                  c =
                    ArrayBuffer.isView ||
                    function (e) {
                      return e && a.indexOf(Object.prototype.toString.call(e)) > -1;
                    };
              function u(e) {
                if (("string" != typeof e && (e = String(e)), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e)))
                  throw new TypeError("Invalid character in header field name");
                return e.toLowerCase();
              }
              function l(e) {
                return "string" != typeof e && (e = String(e)), e;
              }
              function h(e) {
                var t = {
                  next: function () {
                    var t = e.shift();
                    return { done: void 0 === t, value: t };
                  },
                };
                return (
                  n &&
                    (t[Symbol.iterator] = function () {
                      return t;
                    }),
                  t
                );
              }
              function d(e) {
                (this.map = {}),
                  e instanceof d
                    ? e.forEach(function (e, t) {
                        this.append(t, e);
                      }, this)
                    : Array.isArray(e)
                    ? e.forEach(function (e) {
                        this.append(e[0], e[1]);
                      }, this)
                    : e &&
                      Object.getOwnPropertyNames(e).forEach(function (t) {
                        this.append(t, e[t]);
                      }, this);
              }
              function p(e) {
                if (e.bodyUsed) return Promise.reject(new TypeError("Already read"));
                e.bodyUsed = !0;
              }
              function f(e) {
                return new Promise(function (t, r) {
                  (e.onload = function () {
                    t(e.result);
                  }),
                    (e.onerror = function () {
                      r(e.error);
                    });
                });
              }
              function v(e) {
                var t = new FileReader(),
                  r = f(t);
                return t.readAsArrayBuffer(e), r;
              }
              function y(e) {
                if (e.slice) return e.slice(0);
                var t = new Uint8Array(e.byteLength);
                return t.set(new Uint8Array(e)), t.buffer;
              }
              function m() {
                return (
                  (this.bodyUsed = !1),
                  (this._initBody = function (e) {
                    var t;
                    (this._bodyInit = e),
                      e
                        ? "string" == typeof e
                          ? (this._bodyText = e)
                          : i && Blob.prototype.isPrototypeOf(e)
                          ? (this._bodyBlob = e)
                          : s && FormData.prototype.isPrototypeOf(e)
                          ? (this._bodyFormData = e)
                          : r && URLSearchParams.prototype.isPrototypeOf(e)
                          ? (this._bodyText = e.toString())
                          : o && i && (t = e) && DataView.prototype.isPrototypeOf(t)
                          ? ((this._bodyArrayBuffer = y(e.buffer)),
                            (this._bodyInit = new Blob([this._bodyArrayBuffer])))
                          : o && (ArrayBuffer.prototype.isPrototypeOf(e) || c(e))
                          ? (this._bodyArrayBuffer = y(e))
                          : (this._bodyText = e = Object.prototype.toString.call(e))
                        : (this._bodyText = ""),
                      this.headers.get("content-type") ||
                        ("string" == typeof e
                          ? this.headers.set("content-type", "text/plain;charset=UTF-8")
                          : this._bodyBlob && this._bodyBlob.type
                          ? this.headers.set("content-type", this._bodyBlob.type)
                          : r &&
                            URLSearchParams.prototype.isPrototypeOf(e) &&
                            this.headers.set(
                              "content-type",
                              "application/x-www-form-urlencoded;charset=UTF-8"
                            ));
                  }),
                  i &&
                    ((this.blob = function () {
                      var e = p(this);
                      if (e) return e;
                      if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                      if (this._bodyArrayBuffer)
                        return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                      if (this._bodyFormData)
                        throw new Error("could not read FormData body as blob");
                      return Promise.resolve(new Blob([this._bodyText]));
                    }),
                    (this.arrayBuffer = function () {
                      return this._bodyArrayBuffer
                        ? p(this) || Promise.resolve(this._bodyArrayBuffer)
                        : this.blob().then(v);
                    })),
                  (this.text = function () {
                    var e,
                      t,
                      r,
                      n = p(this);
                    if (n) return n;
                    if (this._bodyBlob)
                      return (
                        (e = this._bodyBlob), (r = f((t = new FileReader()))), t.readAsText(e), r
                      );
                    if (this._bodyArrayBuffer)
                      return Promise.resolve(
                        (function (e) {
                          for (
                            var t = new Uint8Array(e), r = new Array(t.length), n = 0;
                            n < t.length;
                            n++
                          )
                            r[n] = String.fromCharCode(t[n]);
                          return r.join("");
                        })(this._bodyArrayBuffer)
                      );
                    if (this._bodyFormData) throw new Error("could not read FormData body as text");
                    return Promise.resolve(this._bodyText);
                  }),
                  s &&
                    (this.formData = function () {
                      return this.text().then(w);
                    }),
                  (this.json = function () {
                    return this.text().then(JSON.parse);
                  }),
                  this
                );
              }
              (d.prototype.append = function (e, t) {
                (e = u(e)), (t = l(t));
                var r = this.map[e];
                this.map[e] = r ? r + ", " + t : t;
              }),
                (d.prototype.delete = function (e) {
                  delete this.map[u(e)];
                }),
                (d.prototype.get = function (e) {
                  return (e = u(e)), this.has(e) ? this.map[e] : null;
                }),
                (d.prototype.has = function (e) {
                  return this.map.hasOwnProperty(u(e));
                }),
                (d.prototype.set = function (e, t) {
                  this.map[u(e)] = l(t);
                }),
                (d.prototype.forEach = function (e, t) {
                  for (var r in this.map)
                    this.map.hasOwnProperty(r) && e.call(t, this.map[r], r, this);
                }),
                (d.prototype.keys = function () {
                  var e = [];
                  return (
                    this.forEach(function (t, r) {
                      e.push(r);
                    }),
                    h(e)
                  );
                }),
                (d.prototype.values = function () {
                  var e = [];
                  return (
                    this.forEach(function (t) {
                      e.push(t);
                    }),
                    h(e)
                  );
                }),
                (d.prototype.entries = function () {
                  var e = [];
                  return (
                    this.forEach(function (t, r) {
                      e.push([r, t]);
                    }),
                    h(e)
                  );
                }),
                n && (d.prototype[Symbol.iterator] = d.prototype.entries);
              var g = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
              function b(e, t) {
                var r,
                  n,
                  i = (t = t || {}).body;
                if (e instanceof b) {
                  if (e.bodyUsed) throw new TypeError("Already read");
                  (this.url = e.url),
                    (this.credentials = e.credentials),
                    t.headers || (this.headers = new d(e.headers)),
                    (this.method = e.method),
                    (this.mode = e.mode),
                    (this.signal = e.signal),
                    i || null == e._bodyInit || ((i = e._bodyInit), (e.bodyUsed = !0));
                } else this.url = String(e);
                if (
                  ((this.credentials = t.credentials || this.credentials || "same-origin"),
                  (!t.headers && this.headers) || (this.headers = new d(t.headers)),
                  (this.method =
                    ((n = (r = t.method || this.method || "GET").toUpperCase()),
                    g.indexOf(n) > -1 ? n : r)),
                  (this.mode = t.mode || this.mode || null),
                  (this.signal = t.signal || this.signal),
                  (this.referrer = null),
                  ("GET" === this.method || "HEAD" === this.method) && i)
                )
                  throw new TypeError("Body not allowed for GET or HEAD requests");
                this._initBody(i);
              }
              function w(e) {
                var t = new FormData();
                return (
                  e
                    .trim()
                    .split("&")
                    .forEach(function (e) {
                      if (e) {
                        var r = e.split("="),
                          n = r.shift().replace(/\+/g, " "),
                          i = r.join("=").replace(/\+/g, " ");
                        t.append(decodeURIComponent(n), decodeURIComponent(i));
                      }
                    }),
                  t
                );
              }
              function _(e, t) {
                t || (t = {}),
                  (this.type = "default"),
                  (this.status = void 0 === t.status ? 200 : t.status),
                  (this.ok = this.status >= 200 && this.status < 300),
                  (this.statusText = "statusText" in t ? t.statusText : "OK"),
                  (this.headers = new d(t.headers)),
                  (this.url = t.url || ""),
                  this._initBody(e);
              }
              (b.prototype.clone = function () {
                return new b(this, { body: this._bodyInit });
              }),
                m.call(b.prototype),
                m.call(_.prototype),
                (_.prototype.clone = function () {
                  return new _(this._bodyInit, {
                    status: this.status,
                    statusText: this.statusText,
                    headers: new d(this.headers),
                    url: this.url,
                  });
                }),
                (_.error = function () {
                  var e = new _(null, { status: 0, statusText: "" });
                  return (e.type = "error"), e;
                });
              var O = [301, 302, 303, 307, 308];
              (_.redirect = function (e, t) {
                if (-1 === O.indexOf(t)) throw new RangeError("Invalid status code");
                return new _(null, { status: t, headers: { location: e } });
              }),
                (t.DOMException = e.DOMException);
              try {
                new t.DOMException();
              } catch (e) {
                (t.DOMException = function (e, t) {
                  (this.message = e), (this.name = t);
                  var r = Error(e);
                  this.stack = r.stack;
                }),
                  (t.DOMException.prototype = Object.create(Error.prototype)),
                  (t.DOMException.prototype.constructor = t.DOMException);
              }
              function E(e, r) {
                return new Promise(function (n, s) {
                  var o = new b(e, r);
                  if (o.signal && o.signal.aborted)
                    return s(new t.DOMException("Aborted", "AbortError"));
                  var a = new XMLHttpRequest();
                  function c() {
                    a.abort();
                  }
                  (a.onload = function () {
                    var e,
                      t,
                      r = {
                        status: a.status,
                        statusText: a.statusText,
                        headers:
                          ((e = a.getAllResponseHeaders() || ""),
                          (t = new d()),
                          e
                            .replace(/\r?\n[\t ]+/g, " ")
                            .split(/\r?\n/)
                            .forEach(function (e) {
                              var r = e.split(":"),
                                n = r.shift().trim();
                              if (n) {
                                var i = r.join(":").trim();
                                t.append(n, i);
                              }
                            }),
                          t),
                      };
                    r.url = "responseURL" in a ? a.responseURL : r.headers.get("X-Request-URL");
                    var i = "response" in a ? a.response : a.responseText;
                    n(new _(i, r));
                  }),
                    (a.onerror = function () {
                      s(new TypeError("Network request failed"));
                    }),
                    (a.ontimeout = function () {
                      s(new TypeError("Network request failed"));
                    }),
                    (a.onabort = function () {
                      s(new t.DOMException("Aborted", "AbortError"));
                    }),
                    a.open(o.method, o.url, !0),
                    "include" === o.credentials
                      ? (a.withCredentials = !0)
                      : "omit" === o.credentials && (a.withCredentials = !1),
                    "responseType" in a && i && (a.responseType = "blob"),
                    o.headers.forEach(function (e, t) {
                      a.setRequestHeader(t, e);
                    }),
                    o.signal &&
                      (o.signal.addEventListener("abort", c),
                      (a.onreadystatechange = function () {
                        4 === a.readyState && o.signal.removeEventListener("abort", c);
                      })),
                    a.send(void 0 === o._bodyInit ? null : o._bodyInit);
                });
              }
              (E.polyfill = !0),
                e.fetch || ((e.fetch = E), (e.Headers = d), (e.Request = b), (e.Response = _)),
                (t.Headers = d),
                (t.Request = b),
                (t.Response = _),
                (t.fetch = E),
                Object.defineProperty(t, "__esModule", { value: !0 });
            })({});
          })(n),
            (n.fetch.ponyfill = !0),
            delete n.fetch.polyfill;
          var i = n;
          ((t = i.fetch).default = i.fetch),
            (t.fetch = i.fetch),
            (t.Headers = i.Headers),
            (t.Request = i.Request),
            (t.Response = i.Response),
            (e.exports = t);
        },
        484: function (e) {
          e.exports = (function () {
            "use strict";
            var e = 6e4,
              t = 36e5,
              r = "millisecond",
              n = "second",
              i = "minute",
              s = "hour",
              o = "day",
              a = "week",
              c = "month",
              u = "quarter",
              l = "year",
              h = "date",
              d = "Invalid Date",
              p =
                /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
              f =
                /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
              v = {
                name: "en",
                weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
                months:
                  "January_February_March_April_May_June_July_August_September_October_November_December".split(
                    "_"
                  ),
                ordinal: function (e) {
                  var t = ["th", "st", "nd", "rd"],
                    r = e % 100;
                  return "[" + e + (t[(r - 20) % 10] || t[r] || t[0]) + "]";
                },
              },
              y = function (e, t, r) {
                var n = String(e);
                return !n || n.length >= t ? e : "" + Array(t + 1 - n.length).join(r) + e;
              },
              m = {
                s: y,
                z: function (e) {
                  var t = -e.utcOffset(),
                    r = Math.abs(t),
                    n = Math.floor(r / 60),
                    i = r % 60;
                  return (t <= 0 ? "+" : "-") + y(n, 2, "0") + ":" + y(i, 2, "0");
                },
                m: function e(t, r) {
                  if (t.date() < r.date()) return -e(r, t);
                  var n = 12 * (r.year() - t.year()) + (r.month() - t.month()),
                    i = t.clone().add(n, c),
                    s = r - i < 0,
                    o = t.clone().add(n + (s ? -1 : 1), c);
                  return +(-(n + (r - i) / (s ? i - o : o - i)) || 0);
                },
                a: function (e) {
                  return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
                },
                p: function (e) {
                  return (
                    { M: c, y: l, w: a, d: o, D: h, h: s, m: i, s: n, ms: r, Q: u }[e] ||
                    String(e || "")
                      .toLowerCase()
                      .replace(/s$/, "")
                  );
                },
                u: function (e) {
                  return void 0 === e;
                },
              },
              g = "en",
              b = {};
            b[g] = v;
            var w = "$isDayjsObject",
              _ = function (e) {
                return e instanceof D || !(!e || !e[w]);
              },
              O = function e(t, r, n) {
                var i;
                if (!t) return g;
                if ("string" == typeof t) {
                  var s = t.toLowerCase();
                  b[s] && (i = s), r && ((b[s] = r), (i = s));
                  var o = t.split("-");
                  if (!i && o.length > 1) return e(o[0]);
                } else {
                  var a = t.name;
                  (b[a] = t), (i = a);
                }
                return !n && i && (g = i), i || (!n && g);
              },
              E = function (e, t) {
                if (_(e)) return e.clone();
                var r = "object" == typeof t ? t : {};
                return (r.date = e), (r.args = arguments), new D(r);
              },
              j = m;
            (j.l = O),
              (j.i = _),
              (j.w = function (e, t) {
                return E(e, { locale: t.$L, utc: t.$u, x: t.$x, $offset: t.$offset });
              });
            var D = (function () {
                function v(e) {
                  (this.$L = O(e.locale, null, !0)),
                    this.parse(e),
                    (this.$x = this.$x || e.x || {}),
                    (this[w] = !0);
                }
                var y = v.prototype;
                return (
                  (y.parse = function (e) {
                    (this.$d = (function (e) {
                      var t = e.date,
                        r = e.utc;
                      if (null === t) return new Date(NaN);
                      if (j.u(t)) return new Date();
                      if (t instanceof Date) return new Date(t);
                      if ("string" == typeof t && !/Z$/i.test(t)) {
                        var n = t.match(p);
                        if (n) {
                          var i = n[2] - 1 || 0,
                            s = (n[7] || "0").substring(0, 3);
                          return r
                            ? new Date(
                                Date.UTC(n[1], i, n[3] || 1, n[4] || 0, n[5] || 0, n[6] || 0, s)
                              )
                            : new Date(n[1], i, n[3] || 1, n[4] || 0, n[5] || 0, n[6] || 0, s);
                        }
                      }
                      return new Date(t);
                    })(e)),
                      this.init();
                  }),
                  (y.init = function () {
                    var e = this.$d;
                    (this.$y = e.getFullYear()),
                      (this.$M = e.getMonth()),
                      (this.$D = e.getDate()),
                      (this.$W = e.getDay()),
                      (this.$H = e.getHours()),
                      (this.$m = e.getMinutes()),
                      (this.$s = e.getSeconds()),
                      (this.$ms = e.getMilliseconds());
                  }),
                  (y.$utils = function () {
                    return j;
                  }),
                  (y.isValid = function () {
                    return !(this.$d.toString() === d);
                  }),
                  (y.isSame = function (e, t) {
                    var r = E(e);
                    return this.startOf(t) <= r && r <= this.endOf(t);
                  }),
                  (y.isAfter = function (e, t) {
                    return E(e) < this.startOf(t);
                  }),
                  (y.isBefore = function (e, t) {
                    return this.endOf(t) < E(e);
                  }),
                  (y.$g = function (e, t, r) {
                    return j.u(e) ? this[t] : this.set(r, e);
                  }),
                  (y.unix = function () {
                    return Math.floor(this.valueOf() / 1e3);
                  }),
                  (y.valueOf = function () {
                    return this.$d.getTime();
                  }),
                  (y.startOf = function (e, t) {
                    var r = this,
                      u = !!j.u(t) || t,
                      d = j.p(e),
                      p = function (e, t) {
                        var n = j.w(r.$u ? Date.UTC(r.$y, t, e) : new Date(r.$y, t, e), r);
                        return u ? n : n.endOf(o);
                      },
                      f = function (e, t) {
                        return j.w(
                          r
                            .toDate()
                            [e].apply(
                              r.toDate("s"),
                              (u ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(t)
                            ),
                          r
                        );
                      },
                      v = this.$W,
                      y = this.$M,
                      m = this.$D,
                      g = "set" + (this.$u ? "UTC" : "");
                    switch (d) {
                      case l:
                        return u ? p(1, 0) : p(31, 11);
                      case c:
                        return u ? p(1, y) : p(0, y + 1);
                      case a:
                        var b = this.$locale().weekStart || 0,
                          w = (v < b ? v + 7 : v) - b;
                        return p(u ? m - w : m + (6 - w), y);
                      case o:
                      case h:
                        return f(g + "Hours", 0);
                      case s:
                        return f(g + "Minutes", 1);
                      case i:
                        return f(g + "Seconds", 2);
                      case n:
                        return f(g + "Milliseconds", 3);
                      default:
                        return this.clone();
                    }
                  }),
                  (y.endOf = function (e) {
                    return this.startOf(e, !1);
                  }),
                  (y.$set = function (e, t) {
                    var a,
                      u = j.p(e),
                      d = "set" + (this.$u ? "UTC" : ""),
                      p = ((a = {}),
                      (a[o] = d + "Date"),
                      (a[h] = d + "Date"),
                      (a[c] = d + "Month"),
                      (a[l] = d + "FullYear"),
                      (a[s] = d + "Hours"),
                      (a[i] = d + "Minutes"),
                      (a[n] = d + "Seconds"),
                      (a[r] = d + "Milliseconds"),
                      a)[u],
                      f = u === o ? this.$D + (t - this.$W) : t;
                    if (u === c || u === l) {
                      var v = this.clone().set(h, 1);
                      v.$d[p](f),
                        v.init(),
                        (this.$d = v.set(h, Math.min(this.$D, v.daysInMonth())).$d);
                    } else p && this.$d[p](f);
                    return this.init(), this;
                  }),
                  (y.set = function (e, t) {
                    return this.clone().$set(e, t);
                  }),
                  (y.get = function (e) {
                    return this[j.p(e)]();
                  }),
                  (y.add = function (r, u) {
                    var h,
                      d = this;
                    r = Number(r);
                    var p = j.p(u),
                      f = function (e) {
                        var t = E(d);
                        return j.w(t.date(t.date() + Math.round(e * r)), d);
                      };
                    if (p === c) return this.set(c, this.$M + r);
                    if (p === l) return this.set(l, this.$y + r);
                    if (p === o) return f(1);
                    if (p === a) return f(7);
                    var v = ((h = {}), (h[i] = e), (h[s] = t), (h[n] = 1e3), h)[p] || 1,
                      y = this.$d.getTime() + r * v;
                    return j.w(y, this);
                  }),
                  (y.subtract = function (e, t) {
                    return this.add(-1 * e, t);
                  }),
                  (y.format = function (e) {
                    var t = this,
                      r = this.$locale();
                    if (!this.isValid()) return r.invalidDate || d;
                    var n = e || "YYYY-MM-DDTHH:mm:ssZ",
                      i = j.z(this),
                      s = this.$H,
                      o = this.$m,
                      a = this.$M,
                      c = r.weekdays,
                      u = r.months,
                      l = r.meridiem,
                      h = function (e, r, i, s) {
                        return (e && (e[r] || e(t, n))) || i[r].slice(0, s);
                      },
                      p = function (e) {
                        return j.s(s % 12 || 12, e, "0");
                      },
                      v =
                        l ||
                        function (e, t, r) {
                          var n = e < 12 ? "AM" : "PM";
                          return r ? n.toLowerCase() : n;
                        };
                    return n.replace(f, function (e, n) {
                      return (
                        n ||
                        (function (e) {
                          switch (e) {
                            case "YY":
                              return String(t.$y).slice(-2);
                            case "YYYY":
                              return j.s(t.$y, 4, "0");
                            case "M":
                              return a + 1;
                            case "MM":
                              return j.s(a + 1, 2, "0");
                            case "MMM":
                              return h(r.monthsShort, a, u, 3);
                            case "MMMM":
                              return h(u, a);
                            case "D":
                              return t.$D;
                            case "DD":
                              return j.s(t.$D, 2, "0");
                            case "d":
                              return String(t.$W);
                            case "dd":
                              return h(r.weekdaysMin, t.$W, c, 2);
                            case "ddd":
                              return h(r.weekdaysShort, t.$W, c, 3);
                            case "dddd":
                              return c[t.$W];
                            case "H":
                              return String(s);
                            case "HH":
                              return j.s(s, 2, "0");
                            case "h":
                              return p(1);
                            case "hh":
                              return p(2);
                            case "a":
                              return v(s, o, !0);
                            case "A":
                              return v(s, o, !1);
                            case "m":
                              return String(o);
                            case "mm":
                              return j.s(o, 2, "0");
                            case "s":
                              return String(t.$s);
                            case "ss":
                              return j.s(t.$s, 2, "0");
                            case "SSS":
                              return j.s(t.$ms, 3, "0");
                            case "Z":
                              return i;
                          }
                          return null;
                        })(e) ||
                        i.replace(":", "")
                      );
                    });
                  }),
                  (y.utcOffset = function () {
                    return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
                  }),
                  (y.diff = function (r, h, d) {
                    var p,
                      f = this,
                      v = j.p(h),
                      y = E(r),
                      m = (y.utcOffset() - this.utcOffset()) * e,
                      g = this - y,
                      b = function () {
                        return j.m(f, y);
                      };
                    switch (v) {
                      case l:
                        p = b() / 12;
                        break;
                      case c:
                        p = b();
                        break;
                      case u:
                        p = b() / 3;
                        break;
                      case a:
                        p = (g - m) / 6048e5;
                        break;
                      case o:
                        p = (g - m) / 864e5;
                        break;
                      case s:
                        p = g / t;
                        break;
                      case i:
                        p = g / e;
                        break;
                      case n:
                        p = g / 1e3;
                        break;
                      default:
                        p = g;
                    }
                    return d ? p : j.a(p);
                  }),
                  (y.daysInMonth = function () {
                    return this.endOf(c).$D;
                  }),
                  (y.$locale = function () {
                    return b[this.$L];
                  }),
                  (y.locale = function (e, t) {
                    if (!e) return this.$L;
                    var r = this.clone(),
                      n = O(e, t, !0);
                    return n && (r.$L = n), r;
                  }),
                  (y.clone = function () {
                    return j.w(this.$d, this);
                  }),
                  (y.toDate = function () {
                    return new Date(this.valueOf());
                  }),
                  (y.toJSON = function () {
                    return this.isValid() ? this.toISOString() : null;
                  }),
                  (y.toISOString = function () {
                    return this.$d.toISOString();
                  }),
                  (y.toString = function () {
                    return this.$d.toUTCString();
                  }),
                  v
                );
              })(),
              S = D.prototype;
            return (
              (E.prototype = S),
              [
                ["$ms", r],
                ["$s", n],
                ["$m", i],
                ["$H", s],
                ["$W", o],
                ["$M", c],
                ["$y", l],
                ["$D", h],
              ].forEach(function (e) {
                S[e[1]] = function (t) {
                  return this.$g(t, e[0], e[1]);
                };
              }),
              (E.extend = function (e, t) {
                return e.$i || (e(t, D, E), (e.$i = !0)), E;
              }),
              (E.locale = O),
              (E.isDayjs = _),
              (E.unix = function (e) {
                return E(1e3 * e);
              }),
              (E.en = b[g]),
              (E.Ls = b),
              (E.p = {}),
              E
            );
          })();
        },
        576: function (e) {
          e.exports = (function () {
            "use strict";
            var e = "minute",
              t = /[+-]\d\d(?::?\d\d)?/g,
              r = /([+-]|\d\d)/g;
            return function (n, i, s) {
              var o = i.prototype;
              (s.utc = function (e) {
                return new i({ date: e, utc: !0, args: arguments });
              }),
                (o.utc = function (t) {
                  var r = s(this.toDate(), { locale: this.$L, utc: !0 });
                  return t ? r.add(this.utcOffset(), e) : r;
                }),
                (o.local = function () {
                  return s(this.toDate(), { locale: this.$L, utc: !1 });
                });
              var a = o.parse;
              o.parse = function (e) {
                e.utc && (this.$u = !0),
                  this.$utils().u(e.$offset) || (this.$offset = e.$offset),
                  a.call(this, e);
              };
              var c = o.init;
              o.init = function () {
                if (this.$u) {
                  var e = this.$d;
                  (this.$y = e.getUTCFullYear()),
                    (this.$M = e.getUTCMonth()),
                    (this.$D = e.getUTCDate()),
                    (this.$W = e.getUTCDay()),
                    (this.$H = e.getUTCHours()),
                    (this.$m = e.getUTCMinutes()),
                    (this.$s = e.getUTCSeconds()),
                    (this.$ms = e.getUTCMilliseconds());
                } else c.call(this);
              };
              var u = o.utcOffset;
              o.utcOffset = function (n, i) {
                var s = this.$utils().u;
                if (s(n)) return this.$u ? 0 : s(this.$offset) ? u.call(this) : this.$offset;
                if (
                  "string" == typeof n &&
                  ((n = (function (e) {
                    void 0 === e && (e = "");
                    var n = e.match(t);
                    if (!n) return null;
                    var i = ("" + n[0]).match(r) || ["-", 0, 0],
                      s = i[0],
                      o = 60 * +i[1] + +i[2];
                    return 0 === o ? 0 : "+" === s ? o : -o;
                  })(n)),
                  null === n)
                )
                  return this;
                var o = Math.abs(n) <= 16 ? 60 * n : n,
                  a = this;
                if (i) return (a.$offset = o), (a.$u = 0 === n), a;
                if (0 !== n) {
                  var c = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
                  ((a = this.local().add(o + c, e)).$offset = o), (a.$x.$localOffset = c);
                } else a = this.utc();
                return a;
              };
              var l = o.format;
              (o.format = function (e) {
                var t = e || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
                return l.call(this, t);
              }),
                (o.valueOf = function () {
                  var e = this.$utils().u(this.$offset)
                    ? 0
                    : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
                  return this.$d.valueOf() - 6e4 * e;
                }),
                (o.isUTC = function () {
                  return !!this.$u;
                }),
                (o.toISOString = function () {
                  return this.toDate().toISOString();
                }),
                (o.toString = function () {
                  return this.toDate().toUTCString();
                });
              var h = o.toDate;
              o.toDate = function (e) {
                return "s" === e && this.$offset
                  ? s(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate()
                  : h.call(this);
              };
              var d = o.diff;
              o.diff = function (e, t, r) {
                if (e && this.$u === e.$u) return d.call(this, e, t, r);
                var n = this.local(),
                  i = s(e).local();
                return d.call(n, i, t, r);
              };
            };
          })();
        },
        996: (e) => {
          "use strict";
          var t = function (e) {
              return (
                (function (e) {
                  return !!e && "object" == typeof e;
                })(e) &&
                !(function (e) {
                  var t = Object.prototype.toString.call(e);
                  return (
                    "[object RegExp]" === t ||
                    "[object Date]" === t ||
                    (function (e) {
                      return e.$$typeof === r;
                    })(e)
                  );
                })(e)
              );
            },
            r = "function" == typeof Symbol && Symbol.for ? Symbol.for("react.element") : 60103;
          function n(e, t) {
            return !1 !== t.clone && t.isMergeableObject(e)
              ? a(((r = e), Array.isArray(r) ? [] : {}), e, t)
              : e;
            var r;
          }
          function i(e, t, r) {
            return e.concat(t).map(function (e) {
              return n(e, r);
            });
          }
          function s(e) {
            return Object.keys(e).concat(
              (function (e) {
                return Object.getOwnPropertySymbols
                  ? Object.getOwnPropertySymbols(e).filter(function (t) {
                      return Object.propertyIsEnumerable.call(e, t);
                    })
                  : [];
              })(e)
            );
          }
          function o(e, t) {
            try {
              return t in e;
            } catch (e) {
              return !1;
            }
          }
          function a(e, r, c) {
            ((c = c || {}).arrayMerge = c.arrayMerge || i),
              (c.isMergeableObject = c.isMergeableObject || t),
              (c.cloneUnlessOtherwiseSpecified = n);
            var u = Array.isArray(r);
            return u === Array.isArray(e)
              ? u
                ? c.arrayMerge(e, r, c)
                : (function (e, t, r) {
                    var i = {};
                    return (
                      r.isMergeableObject(e) &&
                        s(e).forEach(function (t) {
                          i[t] = n(e[t], r);
                        }),
                      s(t).forEach(function (s) {
                        (function (e, t) {
                          return (
                            o(e, t) &&
                            !(
                              Object.hasOwnProperty.call(e, t) &&
                              Object.propertyIsEnumerable.call(e, t)
                            )
                          );
                        })(e, s) ||
                          (o(e, s) && r.isMergeableObject(t[s])
                            ? (i[s] = (function (e, t) {
                                if (!t.customMerge) return a;
                                var r = t.customMerge(e);
                                return "function" == typeof r ? r : a;
                              })(s, r)(e[s], t[s], r))
                            : (i[s] = n(t[s], r)));
                      }),
                      i
                    );
                  })(e, r, c)
              : n(r, c);
          }
          a.all = function (e, t) {
            if (!Array.isArray(e)) throw new Error("first argument should be an array");
            return e.reduce(function (e, r) {
              return a(e, r, t);
            }, {});
          };
          var c = a;
          e.exports = c;
        },
        284: (e) => {
          var t = function () {
            if ("object" == typeof self && self) return self;
            if ("object" == typeof window && window) return window;
            throw new Error("Unable to resolve global `this`");
          };
          e.exports = (function () {
            if (this) return this;
            if ("object" == typeof globalThis && globalThis) return globalThis;
            try {
              Object.defineProperty(Object.prototype, "__global__", {
                get: function () {
                  return this;
                },
                configurable: !0,
              });
            } catch (e) {
              return t();
            }
            try {
              return __global__ || t();
            } finally {
              delete Object.prototype.__global__;
            }
          })();
        },
        187: (e) => {
          "use strict";
          var t,
            r = "object" == typeof Reflect ? Reflect : null,
            n =
              r && "function" == typeof r.apply
                ? r.apply
                : function (e, t, r) {
                    return Function.prototype.apply.call(e, t, r);
                  };
          t =
            r && "function" == typeof r.ownKeys
              ? r.ownKeys
              : Object.getOwnPropertySymbols
              ? function (e) {
                  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
                }
              : function (e) {
                  return Object.getOwnPropertyNames(e);
                };
          var i =
            Number.isNaN ||
            function (e) {
              return e != e;
            };
          function s() {
            s.init.call(this);
          }
          (e.exports = s),
            (e.exports.once = function (e, t) {
              return new Promise(function (r, n) {
                function i(r) {
                  e.removeListener(t, s), n(r);
                }
                function s() {
                  "function" == typeof e.removeListener && e.removeListener("error", i),
                    r([].slice.call(arguments));
                }
                v(e, t, s, { once: !0 }),
                  "error" !== t &&
                    (function (e, t, r) {
                      "function" == typeof e.on && v(e, "error", t, { once: !0 });
                    })(e, i);
              });
            }),
            (s.EventEmitter = s),
            (s.prototype._events = void 0),
            (s.prototype._eventsCount = 0),
            (s.prototype._maxListeners = void 0);
          var o = 10;
          function a(e) {
            if ("function" != typeof e)
              throw new TypeError(
                'The "listener" argument must be of type Function. Received type ' + typeof e
              );
          }
          function c(e) {
            return void 0 === e._maxListeners ? s.defaultMaxListeners : e._maxListeners;
          }
          function u(e, t, r, n) {
            var i, s, o, u;
            if (
              (a(r),
              void 0 === (s = e._events)
                ? ((s = e._events = Object.create(null)), (e._eventsCount = 0))
                : (void 0 !== s.newListener &&
                    (e.emit("newListener", t, r.listener ? r.listener : r), (s = e._events)),
                  (o = s[t])),
              void 0 === o)
            )
              (o = s[t] = r), ++e._eventsCount;
            else if (
              ("function" == typeof o
                ? (o = s[t] = n ? [r, o] : [o, r])
                : n
                ? o.unshift(r)
                : o.push(r),
              (i = c(e)) > 0 && o.length > i && !o.warned)
            ) {
              o.warned = !0;
              var l = new Error(
                "Possible EventEmitter memory leak detected. " +
                  o.length +
                  " " +
                  String(t) +
                  " listeners added. Use emitter.setMaxListeners() to increase limit"
              );
              (l.name = "MaxListenersExceededWarning"),
                (l.emitter = e),
                (l.type = t),
                (l.count = o.length),
                (u = l),
                console && console.warn && console.warn(u);
            }
            return e;
          }
          function l() {
            if (!this.fired)
              return (
                this.target.removeListener(this.type, this.wrapFn),
                (this.fired = !0),
                0 === arguments.length
                  ? this.listener.call(this.target)
                  : this.listener.apply(this.target, arguments)
              );
          }
          function h(e, t, r) {
            var n = { fired: !1, wrapFn: void 0, target: e, type: t, listener: r },
              i = l.bind(n);
            return (i.listener = r), (n.wrapFn = i), i;
          }
          function d(e, t, r) {
            var n = e._events;
            if (void 0 === n) return [];
            var i = n[t];
            return void 0 === i
              ? []
              : "function" == typeof i
              ? r
                ? [i.listener || i]
                : [i]
              : r
              ? (function (e) {
                  for (var t = new Array(e.length), r = 0; r < t.length; ++r)
                    t[r] = e[r].listener || e[r];
                  return t;
                })(i)
              : f(i, i.length);
          }
          function p(e) {
            var t = this._events;
            if (void 0 !== t) {
              var r = t[e];
              if ("function" == typeof r) return 1;
              if (void 0 !== r) return r.length;
            }
            return 0;
          }
          function f(e, t) {
            for (var r = new Array(t), n = 0; n < t; ++n) r[n] = e[n];
            return r;
          }
          function v(e, t, r, n) {
            if ("function" == typeof e.on) n.once ? e.once(t, r) : e.on(t, r);
            else {
              if ("function" != typeof e.addEventListener)
                throw new TypeError(
                  'The "emitter" argument must be of type EventEmitter. Received type ' + typeof e
                );
              e.addEventListener(t, function i(s) {
                n.once && e.removeEventListener(t, i), r(s);
              });
            }
          }
          Object.defineProperty(s, "defaultMaxListeners", {
            enumerable: !0,
            get: function () {
              return o;
            },
            set: function (e) {
              if ("number" != typeof e || e < 0 || i(e))
                throw new RangeError(
                  'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                    e +
                    "."
                );
              o = e;
            },
          }),
            (s.init = function () {
              (void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events) ||
                ((this._events = Object.create(null)), (this._eventsCount = 0)),
                (this._maxListeners = this._maxListeners || void 0);
            }),
            (s.prototype.setMaxListeners = function (e) {
              if ("number" != typeof e || e < 0 || i(e))
                throw new RangeError(
                  'The value of "n" is out of range. It must be a non-negative number. Received ' +
                    e +
                    "."
                );
              return (this._maxListeners = e), this;
            }),
            (s.prototype.getMaxListeners = function () {
              return c(this);
            }),
            (s.prototype.emit = function (e) {
              for (var t = [], r = 1; r < arguments.length; r++) t.push(arguments[r]);
              var i = "error" === e,
                s = this._events;
              if (void 0 !== s) i = i && void 0 === s.error;
              else if (!i) return !1;
              if (i) {
                var o;
                if ((t.length > 0 && (o = t[0]), o instanceof Error)) throw o;
                var a = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
                throw ((a.context = o), a);
              }
              var c = s[e];
              if (void 0 === c) return !1;
              if ("function" == typeof c) n(c, this, t);
              else {
                var u = c.length,
                  l = f(c, u);
                for (r = 0; r < u; ++r) n(l[r], this, t);
              }
              return !0;
            }),
            (s.prototype.addListener = function (e, t) {
              return u(this, e, t, !1);
            }),
            (s.prototype.on = s.prototype.addListener),
            (s.prototype.prependListener = function (e, t) {
              return u(this, e, t, !0);
            }),
            (s.prototype.once = function (e, t) {
              return a(t), this.on(e, h(this, e, t)), this;
            }),
            (s.prototype.prependOnceListener = function (e, t) {
              return a(t), this.prependListener(e, h(this, e, t)), this;
            }),
            (s.prototype.removeListener = function (e, t) {
              var r, n, i, s, o;
              if ((a(t), void 0 === (n = this._events))) return this;
              if (void 0 === (r = n[e])) return this;
              if (r === t || r.listener === t)
                0 == --this._eventsCount
                  ? (this._events = Object.create(null))
                  : (delete n[e],
                    n.removeListener && this.emit("removeListener", e, r.listener || t));
              else if ("function" != typeof r) {
                for (i = -1, s = r.length - 1; s >= 0; s--)
                  if (r[s] === t || r[s].listener === t) {
                    (o = r[s].listener), (i = s);
                    break;
                  }
                if (i < 0) return this;
                0 === i
                  ? r.shift()
                  : (function (e, t) {
                      for (; t + 1 < e.length; t++) e[t] = e[t + 1];
                      e.pop();
                    })(r, i),
                  1 === r.length && (n[e] = r[0]),
                  void 0 !== n.removeListener && this.emit("removeListener", e, o || t);
              }
              return this;
            }),
            (s.prototype.off = s.prototype.removeListener),
            (s.prototype.removeAllListeners = function (e) {
              var t, r, n;
              if (void 0 === (r = this._events)) return this;
              if (void 0 === r.removeListener)
                return (
                  0 === arguments.length
                    ? ((this._events = Object.create(null)), (this._eventsCount = 0))
                    : void 0 !== r[e] &&
                      (0 == --this._eventsCount
                        ? (this._events = Object.create(null))
                        : delete r[e]),
                  this
                );
              if (0 === arguments.length) {
                var i,
                  s = Object.keys(r);
                for (n = 0; n < s.length; ++n)
                  "removeListener" !== (i = s[n]) && this.removeAllListeners(i);
                return (
                  this.removeAllListeners("removeListener"),
                  (this._events = Object.create(null)),
                  (this._eventsCount = 0),
                  this
                );
              }
              if ("function" == typeof (t = r[e])) this.removeListener(e, t);
              else if (void 0 !== t)
                for (n = t.length - 1; n >= 0; n--) this.removeListener(e, t[n]);
              return this;
            }),
            (s.prototype.listeners = function (e) {
              return d(this, e, !0);
            }),
            (s.prototype.rawListeners = function (e) {
              return d(this, e, !1);
            }),
            (s.listenerCount = function (e, t) {
              return "function" == typeof e.listenerCount ? e.listenerCount(t) : p.call(e, t);
            }),
            (s.prototype.listenerCount = p),
            (s.prototype.eventNames = function () {
              return this._eventsCount > 0 ? t(this._events) : [];
            });
        },
        274: (e, t, r) => {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 });
          const n = r(752),
            i = r(910),
            s = r(685),
            o = r(412),
            a = r(581),
            c = r(693);
          class u extends i.AbstractClient {
            get listen() {
              return new s.ListenClient(this.key, this.options);
            }
            get manage() {
              return new o.ManageClient(this.key, this.options);
            }
            get onprem() {
              return new a.OnPremClient(this.key, this.options);
            }
            get read() {
              return new c.ReadClient(this.key, this.options);
            }
            get transcription() {
              throw new n.DeepgramVersionError();
            }
            get projects() {
              throw new n.DeepgramVersionError();
            }
            get keys() {
              throw new n.DeepgramVersionError();
            }
            get members() {
              throw new n.DeepgramVersionError();
            }
            get scopes() {
              throw new n.DeepgramVersionError();
            }
            get invitation() {
              throw new n.DeepgramVersionError();
            }
            get usage() {
              throw new n.DeepgramVersionError();
            }
            get billing() {
              throw new n.DeepgramVersionError();
            }
          }
          t.default = u;
        },
        341: function (e, t, r) {
          "use strict";
          var n =
              (this && this.__createBinding) ||
              (Object.create
                ? function (e, t, r, n) {
                    void 0 === n && (n = r);
                    var i = Object.getOwnPropertyDescriptor(t, r);
                    (i && !("get" in i ? !t.__esModule : i.writable || i.configurable)) ||
                      (i = {
                        enumerable: !0,
                        get: function () {
                          return t[r];
                        },
                      }),
                      Object.defineProperty(e, n, i);
                  }
                : function (e, t, r, n) {
                    void 0 === n && (n = r), (e[n] = t[r]);
                  }),
            i =
              (this && this.__exportStar) ||
              function (e, t) {
                for (var r in e)
                  "default" === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
              },
            s =
              (this && this.__importDefault) ||
              function (e) {
                return e && e.__esModule ? e : { default: e };
              };
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.srt = t.webvtt = t.Deepgram = t.DeepgramClient = t.createClient = void 0);
          const o = s(r(274));
          t.DeepgramClient = o.default;
          const a = r(752);
          (t.Deepgram = class {
            constructor(e, t, r) {
              throw (
                ((this.apiKey = e),
                (this.apiUrl = t),
                (this.requireSSL = r),
                new a.DeepgramVersionError())
              );
            }
          }),
            (t.createClient = (e, t) => new o.default(e, t)),
            i(r(458), t),
            i(r(475), t),
            i(r(57), t),
            i(r(678), t),
            i(r(752), t),
            i(r(610), t);
          var c = r(993);
          Object.defineProperty(t, "webvtt", {
            enumerable: !0,
            get: function () {
              return c.webvtt;
            },
          }),
            Object.defineProperty(t, "srt", {
              enumerable: !0,
              get: function () {
                return c.srt;
              },
            });
        },
        678: (e, t, r) => {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.DEFAULT_OPTIONS =
              t.DEFAULT_FETCH_OPTIONS =
              t.DEFAULT_GLOBAL_OPTIONS =
              t.DEFAULT_URL =
              t.DEFAULT_HEADERS =
                void 0);
          const n = r(610),
            i = r(506);
          (t.DEFAULT_HEADERS = {
            "Content-Type": "application/json",
            "X-Client-Info": `@deepgram/sdk; ${(0, n.isBrowser)() ? "browser" : "server"}; v${
              i.version
            }`,
            "User-Agent": `@deepgram/sdk/${i.version}`,
          }),
            (t.DEFAULT_URL = "api.deepgram.com"),
            (t.DEFAULT_GLOBAL_OPTIONS = { url: t.DEFAULT_URL }),
            (t.DEFAULT_FETCH_OPTIONS = { headers: t.DEFAULT_HEADERS }),
            (t.DEFAULT_OPTIONS = {
              global: t.DEFAULT_GLOBAL_OPTIONS,
              fetchOptions: t.DEFAULT_FETCH_OPTIONS,
            });
        },
        615: (e, t) => {
          "use strict";
          var r;
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.LiveConnectionState = void 0),
            ((r = t.LiveConnectionState || (t.LiveConnectionState = {}))[(r.CONNECTING = 0)] =
              "CONNECTING"),
            (r[(r.OPEN = 1)] = "OPEN"),
            (r[(r.CLOSING = 2)] = "CLOSING"),
            (r[(r.CLOSED = 3)] = "CLOSED");
        },
        178: (e, t) => {
          "use strict";
          var r;
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.LiveTranscriptionEvents = void 0),
            ((r = t.LiveTranscriptionEvents || (t.LiveTranscriptionEvents = {})).Open = "open"),
            (r.Close = "close"),
            (r.Transcript = "Results"),
            (r.Metadata = "Metadata"),
            (r.Error = "error"),
            (r.Warning = "warning"),
            (r.UtteranceEnd = "UtteranceEnd"),
            (r.SpeechStarted = "SpeechStarted");
        },
        57: (e, t, r) => {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.LiveTranscriptionEvents = t.LiveConnectionState = void 0);
          var n = r(615);
          Object.defineProperty(t, "LiveConnectionState", {
            enumerable: !0,
            get: function () {
              return n.LiveConnectionState;
            },
          });
          var i = r(178);
          Object.defineProperty(t, "LiveTranscriptionEvents", {
            enumerable: !0,
            get: function () {
              return i.LiveTranscriptionEvents;
            },
          });
        },
        752: (e, t) => {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.DeepgramVersionError =
              t.DeepgramUnknownError =
              t.DeepgramApiError =
              t.isDeepgramError =
              t.DeepgramError =
                void 0);
          class r extends Error {
            constructor(e) {
              super(e), (this.__dgError = !0), (this.name = "DeepgramError");
            }
          }
          (t.DeepgramError = r),
            (t.isDeepgramError = function (e) {
              return "object" == typeof e && null !== e && "__dgError" in e;
            }),
            (t.DeepgramApiError = class extends r {
              constructor(e, t) {
                super(e), (this.name = "DeepgramApiError"), (this.status = t);
              }
              toJSON() {
                return { name: this.name, message: this.message, status: this.status };
              }
            }),
            (t.DeepgramUnknownError = class extends r {
              constructor(e, t) {
                super(e), (this.name = "DeepgramUnknownError"), (this.originalError = t);
              }
            }),
            (t.DeepgramVersionError = class extends r {
              constructor() {
                super(
                  "You are attempting to use an old format for a newer SDK version. Read more here: https://dpgr.am/js-v3"
                ),
                  (this.name = "DeepgramVersionError");
              }
            });
        },
        716: function (e, t, r) {
          "use strict";
          var n =
              (this && this.__createBinding) ||
              (Object.create
                ? function (e, t, r, n) {
                    void 0 === n && (n = r);
                    var i = Object.getOwnPropertyDescriptor(t, r);
                    (i && !("get" in i ? !t.__esModule : i.writable || i.configurable)) ||
                      (i = {
                        enumerable: !0,
                        get: function () {
                          return t[r];
                        },
                      }),
                      Object.defineProperty(e, n, i);
                  }
                : function (e, t, r, n) {
                    void 0 === n && (n = r), (e[n] = t[r]);
                  }),
            i =
              (this && this.__setModuleDefault) ||
              (Object.create
                ? function (e, t) {
                    Object.defineProperty(e, "default", { enumerable: !0, value: t });
                  }
                : function (e, t) {
                    e.default = t;
                  }),
            s =
              (this && this.__importStar) ||
              function (e) {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e)
                  for (var r in e)
                    "default" !== r && Object.prototype.hasOwnProperty.call(e, r) && n(t, e, r);
                return i(t, e), t;
              },
            o =
              (this && this.__awaiter) ||
              function (e, t, r, n) {
                return new (r || (r = Promise))(function (i, s) {
                  function o(e) {
                    try {
                      c(n.next(e));
                    } catch (e) {
                      s(e);
                    }
                  }
                  function a(e) {
                    try {
                      c(n.throw(e));
                    } catch (e) {
                      s(e);
                    }
                  }
                  function c(e) {
                    var t;
                    e.done
                      ? i(e.value)
                      : ((t = e.value),
                        t instanceof r
                          ? t
                          : new r(function (e) {
                              e(t);
                            })).then(o, a);
                  }
                  c((n = n.apply(e, t || [])).next());
                });
              },
            a =
              (this && this.__importDefault) ||
              function (e) {
                return e && e.__esModule ? e : { default: e };
              };
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.resolveResponse = t.fetchWithAuth = t.resolveFetch = void 0);
          const c = a(r(98)),
            u = r(610);
          (t.resolveFetch = () => {
            let e;
            return (e = "undefined" == typeof fetch ? c.default : fetch), (...t) => e(...t);
          }),
            (t.fetchWithAuth = (e) => {
              const r = (0, t.resolveFetch)(),
                n = (0, u.resolveHeadersConstructor)();
              return (t, i) =>
                o(void 0, void 0, void 0, function* () {
                  let s = new n(null == i ? void 0 : i.headers);
                  return (
                    s.has("Authorization") || s.set("Authorization", `Token ${e}`),
                    r(t, Object.assign(Object.assign({}, i), { headers: s }))
                  );
                });
            }),
            (t.resolveResponse = () =>
              o(void 0, void 0, void 0, function* () {
                return "undefined" == typeof Response
                  ? (yield Promise.resolve().then(() => s(r(98)))).Response
                  : Response;
              }));
        },
        610: function (e, t, r) {
          "use strict";
          var n =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.CallbackUrl =
              t.isFileSource =
              t.isTextSource =
              t.isUrlSource =
              t.resolveHeadersConstructor =
              t.appendSearchParams =
              t.applySettingDefaults =
              t.isServer =
              t.isBrowser =
              t.stripTrailingSlash =
                void 0);
          const i = r(98),
            s = n(r(996));
          (t.stripTrailingSlash = function (e) {
            return e.replace(/\/$/, "");
          }),
            (t.isBrowser = () => "undefined" != typeof window),
            (t.isServer = () => "undefined" != typeof process),
            (t.applySettingDefaults = function (e, t) {
              return (0, s.default)(t, e);
            }),
            (t.appendSearchParams = function (e, t) {
              Object.keys(t).forEach((r) => {
                Array.isArray(t[r])
                  ? t[r].forEach((t) => {
                      e.append(r, String(t));
                    })
                  : e.append(r, String(t[r]));
              });
            }),
            (t.resolveHeadersConstructor = () =>
              "undefined" == typeof Headers ? i.Headers : Headers),
            (t.isUrlSource = (e) => !!e.url),
            (t.isTextSource = (e) => !!e.text),
            (t.isFileSource = (e) => !(!a(e) && !o(e)));
          const o = (e) => !!e,
            a = (e) => !!e;
          class c extends URL {
            constructor() {
              super(...arguments), (this.callbackUrl = !0);
            }
          }
          t.CallbackUrl = c;
        },
        475: (e, t) => {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 });
        },
        506: (e, t) => {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.version = void 0),
            (t.version = "0.0.0-automated");
        },
        910: (e, t, r) => {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.AbstractClient = void 0);
          const n = r(678),
            i = r(752),
            s = r(610);
          t.AbstractClient = class {
            constructor(e, t) {
              var r, o;
              if (
                ((this.key = e),
                (this.options = t),
                (this.key = e),
                e || (this.key = process.env.DEEPGRAM_API_KEY),
                !this.key)
              )
                throw new i.DeepgramError("A deepgram API key is required");
              if (
                ((this.options = (0, s.applySettingDefaults)(t, n.DEFAULT_OPTIONS)),
                !(null === (r = this.options.global) || void 0 === r ? void 0 : r.url))
              )
                throw new i.DeepgramError(
                  `An API URL is required. It should be set to ${n.DEFAULT_URL} by default. No idea what happened!`
                );
              let a,
                c = this.options.global.url;
              if (
                (c.startsWith("http") ||
                  c.startsWith("ws") ||
                  console.warn(
                    "The base URL provided does not begin with http, https, ws, or wss and will default to https as standard."
                  ),
                null === (o = this.options.restProxy) || void 0 === o ? void 0 : o.url)
              ) {
                if ("proxy" !== this.key)
                  throw new i.DeepgramError(
                    'Do not attempt to pass any other API key than the string "proxy" when making proxied REST requests. Please ensure your proxy application is responsible for writing our API key to the Authorization header.'
                  );
                (a = this.options.restProxy.url),
                  a.startsWith("http") ||
                    a.startsWith("ws") ||
                    console.warn(
                      "The proxy URL provided does not begin with http, https, ws, or wss and will default to https as standard."
                    ),
                  (c = a);
              }
              this.baseUrl = this.resolveBaseUrl(c);
            }
            resolveBaseUrl(e) {
              return (
                /^https?:\/\//i.test(e) || (e = "https://" + e),
                new URL((0, s.stripTrailingSlash)(e))
              );
            }
            willProxy() {
              var e;
              return !!(null === (e = this.options.restProxy) || void 0 === e ? void 0 : e.url);
            }
          };
        },
        207: function (e, t, r) {
          "use strict";
          var n =
            (this && this.__awaiter) ||
            function (e, t, r, n) {
              return new (r || (r = Promise))(function (i, s) {
                function o(e) {
                  try {
                    c(n.next(e));
                  } catch (e) {
                    s(e);
                  }
                }
                function a(e) {
                  try {
                    c(n.throw(e));
                  } catch (e) {
                    s(e);
                  }
                }
                function c(e) {
                  var t;
                  e.done
                    ? i(e.value)
                    : ((t = e.value),
                      t instanceof r
                        ? t
                        : new r(function (e) {
                            e(t);
                          })).then(o, a);
                }
                c((n = n.apply(e, t || [])).next());
              });
            };
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.AbstractRestfulClient = void 0);
          const i = r(752),
            s = r(716),
            o = r(910),
            a = r(610);
          class c extends o.AbstractClient {
            constructor(e, t) {
              if (
                (super(e, t),
                (this.key = e),
                (this.options = t),
                (0, a.isBrowser)() && !this._willProxy())
              )
                throw new i.DeepgramError(
                  "Due to CORS we are unable to support REST-based API calls to our API from the browser. Please consider using a proxy, and including a `restProxy: { url: ''}` in your Deepgram client options."
                );
              this.fetch = "fetch" in t ? t.fetch : (0, s.fetchWithAuth)(this.key);
            }
            _getErrorMessage(e) {
              return e.msg || e.message || e.error_description || e.error || JSON.stringify(e);
            }
            handleError(e, t) {
              return n(this, void 0, void 0, function* () {
                const r = yield (0, s.resolveResponse)();
                e instanceof r
                  ? e
                      .json()
                      .then((r) => {
                        t(new i.DeepgramApiError(this._getErrorMessage(r), e.status || 500));
                      })
                      .catch((e) => {
                        t(new i.DeepgramUnknownError(this._getErrorMessage(e), e));
                      })
                  : t(new i.DeepgramUnknownError(this._getErrorMessage(e), e));
              });
            }
            _getRequestParams(e, t, r, n) {
              const i = "fetchOptions" in this.options ? this.options.fetchOptions : {},
                s = Object.assign(Object.assign({}, i), {
                  method: e,
                  headers: Object.assign(Object.assign({}, i.headers), t) || {},
                });
              return "GET" === e
                ? s
                : ((s.body = n), (s.duplex = "half"), Object.assign(Object.assign({}, s), r));
            }
            _handleRequest(e, t, r, i, s, o) {
              return n(this, void 0, void 0, function* () {
                return new Promise((n, a) => {
                  e(r, this._getRequestParams(t, i, s, o))
                    .then((e) => {
                      if (!e.ok) throw e;
                      return e.json();
                    })
                    .then((e) => n(e))
                    .catch((e) => this.handleError(e, a));
                });
              });
            }
            get(e, t, r, i) {
              return n(this, void 0, void 0, function* () {
                return this._handleRequest(e, "GET", t, r, i);
              });
            }
            post(e, t, r, i, s) {
              return n(this, void 0, void 0, function* () {
                return this._handleRequest(e, "POST", t, i, s, r);
              });
            }
            put(e, t, r, i, s) {
              return n(this, void 0, void 0, function* () {
                return this._handleRequest(e, "PUT", t, i, s, r);
              });
            }
            patch(e, t, r, i, s) {
              return n(this, void 0, void 0, function* () {
                return this._handleRequest(e, "PATCH", t, i, s, r);
              });
            }
            delete(e, t, r, i) {
              return n(this, void 0, void 0, function* () {
                return this._handleRequest(e, "DELETE", t, r, i);
              });
            }
            _willProxy() {
              var e;
              return !!(null === (e = this.options.restProxy) || void 0 === e ? void 0 : e.url);
            }
          }
          t.AbstractRestfulClient = c;
        },
        898: (e, t, r) => {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.AbstractWsClient = void 0);
          const n = r(187),
            i = r(678),
            s = r(610);
          class o extends n.EventEmitter {
            constructor(e, t = i.DEFAULT_OPTIONS) {
              var r;
              if (
                (super(),
                (this.key = e),
                (this.options = t),
                (this.key = e),
                e || (this.key = process.env.DEEPGRAM_API_KEY),
                !this.key)
              )
                throw new Error("A deepgram API key is required");
              if (
                ((this.options = (0, s.applySettingDefaults)(t, i.DEFAULT_OPTIONS)),
                !(null === (r = this.options.global) || void 0 === r ? void 0 : r.url))
              )
                throw new Error(
                  `An API URL is required. It should be set to ${i.DEFAULT_URL} by default. No idea what happened!`
                );
              let n = this.options.global.url;
              /^https?:\/\//i.test(n) || (n = "https://" + n),
                (this.baseUrl = new URL((0, s.stripTrailingSlash)(n))),
                (this.baseUrl.protocol = this.baseUrl.protocol
                  .toLowerCase()
                  .replace(/(http)(s)?/gi, "ws$2"));
            }
          }
          t.AbstractWsClient = o;
        },
        685: (e, t, r) => {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.ListenClient = void 0);
          const n = r(910),
            i = r(118),
            s = r(524);
          class o extends n.AbstractClient {
            get prerecorded() {
              return new s.PrerecordedClient(this.key, this.options);
            }
            live(e, t = "v1/listen") {
              return new i.LiveClient(this.key, this.options, e, t);
            }
          }
          t.ListenClient = o;
        },
        118: (e, t, r) => {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.LiveClient = void 0);
          const n = r(898),
            i = r(610),
            s = r(752),
            o = r(678),
            a = r(57),
            c = r(840);
          class u extends n.AbstractWsClient {
            constructor(e, t = o.DEFAULT_OPTIONS, r = {}, n = "v1/listen") {
              super(e, t), (this.key = e), (this.options = t), (this.transcriptionOptions = r);
              const s = new URL(n, this.baseUrl);
              (s.protocol = s.protocol.toLowerCase().replace(/(http)(s)?/gi, "ws$2")),
                (0, i.appendSearchParams)(s.searchParams, this.transcriptionOptions),
                (this._socket = new c.w3cwebsocket(s.toString(), ["token", this.key])),
                (this._socket.onopen = () => {
                  this.emit(a.LiveTranscriptionEvents.Open, this);
                }),
                (this._socket.onclose = (e) => {
                  this.emit(a.LiveTranscriptionEvents.Close, e);
                }),
                (this._socket.onerror = (e) => {
                  this.emit(a.LiveTranscriptionEvents.Error, e);
                }),
                (this._socket.onmessage = (e) => {
                  try {
                    const t = JSON.parse(e.data.toString());
                    t.type === a.LiveTranscriptionEvents.Metadata &&
                      this.emit(a.LiveTranscriptionEvents.Metadata, t),
                      t.type === a.LiveTranscriptionEvents.Transcript &&
                        this.emit(a.LiveTranscriptionEvents.Transcript, t),
                      t.type === a.LiveTranscriptionEvents.UtteranceEnd &&
                        this.emit(a.LiveTranscriptionEvents.UtteranceEnd, t),
                      t.type === a.LiveTranscriptionEvents.SpeechStarted &&
                        this.emit(a.LiveTranscriptionEvents.SpeechStarted, t);
                  } catch (t) {
                    this.emit(a.LiveTranscriptionEvents.Error, {
                      event: e,
                      message: "Unable to parse `data` as JSON.",
                      error: t,
                    });
                  }
                });
            }
            configure(e) {
              this._socket.send(JSON.stringify({ type: "Configure", processors: e }));
            }
            keepAlive() {
              this._socket.send(JSON.stringify({ type: "KeepAlive" }));
            }
            getReadyState() {
              return this._socket.readyState;
            }
            send(e) {
              if (this._socket.readyState !== a.LiveConnectionState.OPEN)
                throw new s.DeepgramError("Could not send. Connection not open.");
              if ("string" == typeof e) this._socket.send(e);
              else if (e instanceof Blob) this._socket.send(e);
              else {
                const t = e;
                t.byteLength > 0
                  ? this._socket.send(t)
                  : this.emit(
                      a.LiveTranscriptionEvents.Warning,
                      "Zero-byte detected, skipping. Send `CloseStream` if trying to close the connection."
                    );
              }
            }
            finish() {
              this._socket.send(JSON.stringify({ type: "CloseStream" }));
            }
          }
          t.LiveClient = u;
        },
        412: function (e, t, r) {
          "use strict";
          var n =
            (this && this.__awaiter) ||
            function (e, t, r, n) {
              return new (r || (r = Promise))(function (i, s) {
                function o(e) {
                  try {
                    c(n.next(e));
                  } catch (e) {
                    s(e);
                  }
                }
                function a(e) {
                  try {
                    c(n.throw(e));
                  } catch (e) {
                    s(e);
                  }
                }
                function c(e) {
                  var t;
                  e.done
                    ? i(e.value)
                    : ((t = e.value),
                      t instanceof r
                        ? t
                        : new r(function (e) {
                            e(t);
                          })).then(o, a);
                }
                c((n = n.apply(e, t || [])).next());
              });
            };
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.ManageClient = void 0);
          const i = r(207),
            s = r(752),
            o = r(610);
          class a extends i.AbstractRestfulClient {
            getProjects(e = "v1/projects") {
              return n(this, void 0, void 0, function* () {
                try {
                  const t = new URL(this.baseUrl);
                  return (t.pathname = e), { result: yield this.get(this.fetch, t), error: null };
                } catch (e) {
                  if ((0, s.isDeepgramError)(e)) return { result: null, error: e };
                  throw e;
                }
              });
            }
            getProject(e, t = "v1/projects/:projectId") {
              return n(this, void 0, void 0, function* () {
                try {
                  const r = new URL(this.baseUrl);
                  return (
                    (r.pathname = t.replace(/:projectId/, e)),
                    { result: yield this.get(this.fetch, r), error: null }
                  );
                } catch (e) {
                  if ((0, s.isDeepgramError)(e)) return { result: null, error: e };
                  throw e;
                }
              });
            }
            updateProject(e, t, r = "v1/projects/:projectId") {
              return n(this, void 0, void 0, function* () {
                try {
                  const n = new URL(this.baseUrl);
                  n.pathname = r.replace(/:projectId/, e);
                  const i = JSON.stringify(t);
                  return { result: yield this.patch(this.fetch, n, i), error: null };
                } catch (e) {
                  if ((0, s.isDeepgramError)(e)) return { result: null, error: e };
                  throw e;
                }
              });
            }
            deleteProject(e, t = "v1/projects/:projectId") {
              return n(this, void 0, void 0, function* () {
                try {
                  const r = new URL(this.baseUrl);
                  return (
                    (r.pathname = t.replace(/:projectId/, e)),
                    yield this.delete(this.fetch, r),
                    { error: null }
                  );
                } catch (e) {
                  if ((0, s.isDeepgramError)(e)) return { error: e };
                  throw e;
                }
              });
            }
            getProjectKeys(e, t = "v1/projects/:projectId/keys") {
              return n(this, void 0, void 0, function* () {
                try {
                  const r = new URL(this.baseUrl);
                  return (
                    (r.pathname = t.replace(/:projectId/, e)),
                    { result: yield this.get(this.fetch, r), error: null }
                  );
                } catch (e) {
                  if ((0, s.isDeepgramError)(e)) return { result: null, error: e };
                  throw e;
                }
              });
            }
            getProjectKey(e, t, r = "v1/projects/:projectId/keys/:keyId") {
              return n(this, void 0, void 0, function* () {
                try {
                  const n = new URL(this.baseUrl);
                  return (
                    (n.pathname = r.replace(/:projectId/, e).replace(/:keyId/, t)),
                    { result: yield this.get(this.fetch, n), error: null }
                  );
                } catch (e) {
                  if ((0, s.isDeepgramError)(e)) return { result: null, error: e };
                  throw e;
                }
              });
            }
            createProjectKey(e, t, r = "v1/projects/:projectId/keys") {
              return n(this, void 0, void 0, function* () {
                try {
                  const n = new URL(this.baseUrl);
                  n.pathname = r.replace(/:projectId/, e);
                  const i = JSON.stringify(t);
                  return { result: yield this.post(this.fetch, n, i), error: null };
                } catch (e) {
                  if ((0, s.isDeepgramError)(e)) return { result: null, error: e };
                  throw e;
                }
              });
            }
            deleteProjectKey(e, t, r = "v1/projects/:projectId/keys/:keyId") {
              return n(this, void 0, void 0, function* () {
                try {
                  const n = new URL(this.baseUrl);
                  return (
                    (n.pathname = r.replace(/:projectId/, e).replace(/:keyId/, t)),
                    yield this.delete(this.fetch, n),
                    { error: null }
                  );
                } catch (e) {
                  if ((0, s.isDeepgramError)(e)) return { error: e };
                  throw e;
                }
              });
            }
            getProjectMembers(e, t = "v1/projects/:projectId/members") {
              return n(this, void 0, void 0, function* () {
                try {
                  const r = new URL(this.baseUrl);
                  return (
                    (r.pathname = t.replace(/:projectId/, e)),
                    { result: yield this.get(this.fetch, r), error: null }
                  );
                } catch (e) {
                  if ((0, s.isDeepgramError)(e)) return { result: null, error: e };
                  throw e;
                }
              });
            }
            removeProjectMember(e, t, r = "v1/projects/:projectId/members/:memberId") {
              return n(this, void 0, void 0, function* () {
                try {
                  const n = new URL(this.baseUrl);
                  return (
                    (n.pathname = r.replace(/:projectId/, e).replace(/:memberId/, t)),
                    yield this.delete(this.fetch, n),
                    { error: null }
                  );
                } catch (e) {
                  if ((0, s.isDeepgramError)(e)) return { error: e };
                  throw e;
                }
              });
            }
            getProjectMemberScopes(e, t, r = "v1/projects/:projectId/members/:memberId/scopes") {
              return n(this, void 0, void 0, function* () {
                try {
                  const n = new URL(this.baseUrl);
                  return (
                    (n.pathname = r.replace(/:projectId/, e).replace(/:memberId/, t)),
                    { result: yield this.get(this.fetch, n), error: null }
                  );
                } catch (e) {
                  if ((0, s.isDeepgramError)(e)) return { result: null, error: e };
                  throw e;
                }
              });
            }
            updateProjectMemberScope(
              e,
              t,
              r,
              i = "v1/projects/:projectId/members/:memberId/scopes"
            ) {
              return n(this, void 0, void 0, function* () {
                try {
                  const n = new URL(this.baseUrl);
                  n.pathname = i.replace(/:projectId/, e).replace(/:memberId/, t);
                  const s = JSON.stringify(r);
                  return { result: yield this.put(this.fetch, n, s), error: null };
                } catch (e) {
                  if ((0, s.isDeepgramError)(e)) return { result: null, error: e };
                  throw e;
                }
              });
            }
            getProjectInvites(e, t = "v1/projects/:projectId/invites") {
              return n(this, void 0, void 0, function* () {
                try {
                  const r = new URL(this.baseUrl);
                  return (
                    (r.pathname = t.replace(/:projectId/, e)),
                    { result: yield this.get(this.fetch, r), error: null }
                  );
                } catch (e) {
                  if ((0, s.isDeepgramError)(e)) return { result: null, error: e };
                  throw e;
                }
              });
            }
            sendProjectInvite(e, t, r = "v1/projects/:projectId/invites") {
              return n(this, void 0, void 0, function* () {
                try {
                  const n = new URL(this.baseUrl);
                  n.pathname = r.replace(/:projectId/, e);
                  const i = JSON.stringify(t);
                  return { result: yield this.post(this.fetch, n, i), error: null };
                } catch (e) {
                  if ((0, s.isDeepgramError)(e)) return { result: null, error: e };
                  throw e;
                }
              });
            }
            deleteProjectInvite(e, t, r = "v1/projects/:projectId/invites/:email") {
              return n(this, void 0, void 0, function* () {
                try {
                  const n = new URL(this.baseUrl);
                  return (
                    (n.pathname = r.replace(/:projectId/, e).replace(/:email/, t)),
                    yield this.delete(this.fetch, n),
                    { error: null }
                  );
                } catch (e) {
                  if ((0, s.isDeepgramError)(e)) return { error: e };
                  throw e;
                }
              });
            }
            leaveProject(e, t = "v1/projects/:projectId/leave") {
              return n(this, void 0, void 0, function* () {
                try {
                  const r = new URL(this.baseUrl);
                  return (
                    (r.pathname = t.replace(/:projectId/, e)),
                    { result: yield this.delete(this.fetch, r), error: null }
                  );
                } catch (e) {
                  if ((0, s.isDeepgramError)(e)) return { result: null, error: e };
                  throw e;
                }
              });
            }
            getProjectUsageRequests(e, t, r = "v1/projects/:projectId/requests") {
              return n(this, void 0, void 0, function* () {
                try {
                  const n = new URL(this.baseUrl);
                  return (
                    (n.pathname = r.replace(/:projectId/, e)),
                    (0, o.appendSearchParams)(n.searchParams, t),
                    { result: yield this.get(this.fetch, n), error: null }
                  );
                } catch (e) {
                  if ((0, s.isDeepgramError)(e)) return { result: null, error: e };
                  throw e;
                }
              });
            }
            getProjectUsageRequest(e, t, r = "v1/projects/:projectId/requests/:requestId") {
              return n(this, void 0, void 0, function* () {
                try {
                  const n = new URL(this.baseUrl);
                  return (
                    (n.pathname = r.replace(/:projectId/, e).replace(/:requestId/, t)),
                    { result: yield this.get(this.fetch, n), error: null }
                  );
                } catch (e) {
                  if ((0, s.isDeepgramError)(e)) return { result: null, error: e };
                  throw e;
                }
              });
            }
            getProjectUsageSummary(e, t, r = "v1/projects/:projectId/usage") {
              return n(this, void 0, void 0, function* () {
                try {
                  const n = new URL(this.baseUrl);
                  return (
                    (n.pathname = r.replace(/:projectId/, e)),
                    (0, o.appendSearchParams)(n.searchParams, t),
                    { result: yield this.get(this.fetch, n), error: null }
                  );
                } catch (e) {
                  if ((0, s.isDeepgramError)(e)) return { result: null, error: e };
                  throw e;
                }
              });
            }
            getProjectUsageFields(e, t, r = "v1/projects/:projectId/usage/fields") {
              return n(this, void 0, void 0, function* () {
                try {
                  const n = new URL(this.baseUrl);
                  return (
                    (n.pathname = r.replace(/:projectId/, e)),
                    (0, o.appendSearchParams)(n.searchParams, t),
                    { result: yield this.get(this.fetch, n), error: null }
                  );
                } catch (e) {
                  if ((0, s.isDeepgramError)(e)) return { result: null, error: e };
                  throw e;
                }
              });
            }
            getProjectBalances(e, t = "v1/projects/:projectId/balances") {
              return n(this, void 0, void 0, function* () {
                try {
                  const r = new URL(this.baseUrl);
                  return (
                    (r.pathname = t.replace(/:projectId/, e)),
                    { result: yield this.get(this.fetch, r), error: null }
                  );
                } catch (e) {
                  if ((0, s.isDeepgramError)(e)) return { result: null, error: e };
                  throw e;
                }
              });
            }
            getProjectBalance(e, t, r = "v1/projects/:projectId/balances/:balanceId") {
              return n(this, void 0, void 0, function* () {
                try {
                  const n = new URL(this.baseUrl);
                  return (
                    (n.pathname = r.replace(/:projectId/, e).replace(/:balanceId/, t)),
                    { result: yield this.get(this.fetch, n), error: null }
                  );
                } catch (e) {
                  if ((0, s.isDeepgramError)(e)) return { result: null, error: e };
                  throw e;
                }
              });
            }
          }
          t.ManageClient = a;
        },
        581: function (e, t, r) {
          "use strict";
          var n =
            (this && this.__awaiter) ||
            function (e, t, r, n) {
              return new (r || (r = Promise))(function (i, s) {
                function o(e) {
                  try {
                    c(n.next(e));
                  } catch (e) {
                    s(e);
                  }
                }
                function a(e) {
                  try {
                    c(n.throw(e));
                  } catch (e) {
                    s(e);
                  }
                }
                function c(e) {
                  var t;
                  e.done
                    ? i(e.value)
                    : ((t = e.value),
                      t instanceof r
                        ? t
                        : new r(function (e) {
                            e(t);
                          })).then(o, a);
                }
                c((n = n.apply(e, t || [])).next());
              });
            };
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.OnPremClient = void 0);
          const i = r(207),
            s = r(752);
          class o extends i.AbstractRestfulClient {
            listCredentials(e, t = "v1/projects/:projectId/onprem/distribution/credentials") {
              return n(this, void 0, void 0, function* () {
                try {
                  const r = new URL(this.baseUrl);
                  return (
                    (r.pathname = t.replace(/:projectId/, e)),
                    { result: yield this.get(this.fetch, r), error: null }
                  );
                } catch (e) {
                  if ((0, s.isDeepgramError)(e)) return { result: null, error: e };
                  throw e;
                }
              });
            }
            getCredentials(
              e,
              t,
              r = "v1/projects/:projectId/onprem/distribution/credentials/:credentialsId"
            ) {
              return n(this, void 0, void 0, function* () {
                try {
                  const n = new URL(this.baseUrl);
                  return (
                    (n.pathname = r.replace(/:projectId/, e).replace(/:credentialsId/, t)),
                    { result: yield this.get(this.fetch, n), error: null }
                  );
                } catch (e) {
                  if ((0, s.isDeepgramError)(e)) return { result: null, error: e };
                  throw e;
                }
              });
            }
            createCredentials(e, t, r = "v1/projects/:projectId/onprem/distribution/credentials") {
              return n(this, void 0, void 0, function* () {
                try {
                  const n = new URL(this.baseUrl);
                  n.pathname = r.replace(/:projectId/, e);
                  const i = JSON.stringify(t);
                  return { result: yield this.post(this.fetch, n, i), error: null };
                } catch (e) {
                  if ((0, s.isDeepgramError)(e)) return { result: null, error: e };
                  throw e;
                }
              });
            }
            deleteCredentials(
              e,
              t,
              r = "v1/projects/:projectId/onprem/distribution/credentials/:credentialsId"
            ) {
              return n(this, void 0, void 0, function* () {
                try {
                  const n = new URL(this.baseUrl);
                  return (
                    (n.pathname = r.replace(/:projectId/, e).replace(/:credentialsId/, t)),
                    { result: yield this.delete(this.fetch, n), error: null }
                  );
                } catch (e) {
                  if ((0, s.isDeepgramError)(e)) return { result: null, error: e };
                  throw e;
                }
              });
            }
          }
          t.OnPremClient = o;
        },
        524: function (e, t, r) {
          "use strict";
          var n =
            (this && this.__awaiter) ||
            function (e, t, r, n) {
              return new (r || (r = Promise))(function (i, s) {
                function o(e) {
                  try {
                    c(n.next(e));
                  } catch (e) {
                    s(e);
                  }
                }
                function a(e) {
                  try {
                    c(n.throw(e));
                  } catch (e) {
                    s(e);
                  }
                }
                function c(e) {
                  var t;
                  e.done
                    ? i(e.value)
                    : ((t = e.value),
                      t instanceof r
                        ? t
                        : new r(function (e) {
                            e(t);
                          })).then(o, a);
                }
                c((n = n.apply(e, t || [])).next());
              });
            };
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.PrerecordedClient = void 0);
          const i = r(207),
            s = r(610),
            o = r(752);
          class a extends i.AbstractRestfulClient {
            transcribeUrl(e, t, r = "v1/listen") {
              return n(this, void 0, void 0, function* () {
                try {
                  let n;
                  if (!(0, s.isUrlSource)(e))
                    throw new o.DeepgramError("Unknown transcription source type");
                  if (((n = JSON.stringify(e)), void 0 !== t && "callback" in t))
                    throw new o.DeepgramError(
                      "Callback cannot be provided as an option to a synchronous transcription. Use `transcribeUrlCallback` or `transcribeFileCallback` instead."
                    );
                  const i = Object.assign({}, t),
                    a = new URL(r, this.baseUrl);
                  return (
                    (0, s.appendSearchParams)(a.searchParams, i),
                    { result: yield this.post(this.fetch, a, n), error: null }
                  );
                } catch (e) {
                  if ((0, o.isDeepgramError)(e)) return { result: null, error: e };
                  throw e;
                }
              });
            }
            transcribeFile(e, t, r = "v1/listen") {
              return n(this, void 0, void 0, function* () {
                try {
                  let n;
                  if (!(0, s.isFileSource)(e))
                    throw new o.DeepgramError("Unknown transcription source type");
                  if (((n = e), void 0 !== t && "callback" in t))
                    throw new o.DeepgramError(
                      "Callback cannot be provided as an option to a synchronous transcription. Use `transcribeUrlCallback` or `transcribeFileCallback` instead."
                    );
                  const i = Object.assign({}, t),
                    a = new URL(r, this.baseUrl);
                  return (
                    (0, s.appendSearchParams)(a.searchParams, i),
                    {
                      result: yield this.post(this.fetch, a, n, {
                        "Content-Type": "deepgram/audio+video",
                      }),
                      error: null,
                    }
                  );
                } catch (e) {
                  if ((0, o.isDeepgramError)(e)) return { result: null, error: e };
                  throw e;
                }
              });
            }
            transcribeUrlCallback(e, t, r, i = "v1/listen") {
              return n(this, void 0, void 0, function* () {
                try {
                  let n;
                  if (!(0, s.isUrlSource)(e))
                    throw new o.DeepgramError("Unknown transcription source type");
                  n = JSON.stringify(e);
                  const a = Object.assign(Object.assign({}, r), { callback: t.toString() }),
                    c = new URL(i, this.baseUrl);
                  return (
                    (0, s.appendSearchParams)(c.searchParams, a),
                    { result: yield this.post(this.fetch, c, n), error: null }
                  );
                } catch (e) {
                  if ((0, o.isDeepgramError)(e)) return { result: null, error: e };
                  throw e;
                }
              });
            }
            transcribeFileCallback(e, t, r, i = "v1/listen") {
              return n(this, void 0, void 0, function* () {
                try {
                  let n;
                  if (!(0, s.isFileSource)(e))
                    throw new o.DeepgramError("Unknown transcription source type");
                  n = e;
                  const a = Object.assign(Object.assign({}, r), { callback: t.toString() }),
                    c = new URL(i, this.baseUrl);
                  return (
                    (0, s.appendSearchParams)(c.searchParams, a),
                    {
                      result: yield this.post(this.fetch, c, n, {
                        "Content-Type": "deepgram/audio+video",
                      }),
                      error: null,
                    }
                  );
                } catch (e) {
                  if ((0, o.isDeepgramError)(e)) return { result: null, error: e };
                  throw e;
                }
              });
            }
          }
          t.PrerecordedClient = a;
        },
        693: function (e, t, r) {
          "use strict";
          var n =
            (this && this.__awaiter) ||
            function (e, t, r, n) {
              return new (r || (r = Promise))(function (i, s) {
                function o(e) {
                  try {
                    c(n.next(e));
                  } catch (e) {
                    s(e);
                  }
                }
                function a(e) {
                  try {
                    c(n.throw(e));
                  } catch (e) {
                    s(e);
                  }
                }
                function c(e) {
                  var t;
                  e.done
                    ? i(e.value)
                    : ((t = e.value),
                      t instanceof r
                        ? t
                        : new r(function (e) {
                            e(t);
                          })).then(o, a);
                }
                c((n = n.apply(e, t || [])).next());
              });
            };
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.ReadClient = void 0);
          const i = r(207),
            s = r(610),
            o = r(752);
          class a extends i.AbstractRestfulClient {
            analyzeUrl(e, t, r = "v1/read") {
              return n(this, void 0, void 0, function* () {
                try {
                  let n;
                  if (!(0, s.isUrlSource)(e)) throw new o.DeepgramError("Unknown source type");
                  if (((n = JSON.stringify(e)), void 0 !== t && "callback" in t))
                    throw new o.DeepgramError(
                      "Callback cannot be provided as an option to a synchronous transcription. Use `analyzeUrlCallback` or `analyzeTextCallback` instead."
                    );
                  const i = Object.assign({}, t),
                    a = new URL(r, this.baseUrl);
                  return (
                    (0, s.appendSearchParams)(a.searchParams, i),
                    { result: yield this.post(this.fetch, a, n), error: null }
                  );
                } catch (e) {
                  if ((0, o.isDeepgramError)(e)) return { result: null, error: e };
                  throw e;
                }
              });
            }
            analyzeText(e, t, r = "v1/read") {
              return n(this, void 0, void 0, function* () {
                try {
                  let n;
                  if (!(0, s.isTextSource)(e)) throw new o.DeepgramError("Unknown source type");
                  if (((n = JSON.stringify(e)), void 0 !== t && "callback" in t))
                    throw new o.DeepgramError(
                      "Callback cannot be provided as an option to a synchronous requests. Use `analyzeUrlCallback` or `analyzeTextCallback` instead."
                    );
                  const i = Object.assign({}, t),
                    a = new URL(r, this.baseUrl);
                  return (
                    (0, s.appendSearchParams)(a.searchParams, i),
                    { result: yield this.post(this.fetch, a, n), error: null }
                  );
                } catch (e) {
                  if ((0, o.isDeepgramError)(e)) return { result: null, error: e };
                  throw e;
                }
              });
            }
            analyzeUrlCallback(e, t, r, i = "v1/read") {
              return n(this, void 0, void 0, function* () {
                try {
                  let n;
                  if (!(0, s.isUrlSource)(e)) throw new o.DeepgramError("Unknown source type");
                  n = JSON.stringify(e);
                  const a = Object.assign(Object.assign({}, r), { callback: t.toString() }),
                    c = new URL(i, this.baseUrl);
                  return (
                    (0, s.appendSearchParams)(c.searchParams, a),
                    { result: yield this.post(this.fetch, c, n), error: null }
                  );
                } catch (e) {
                  if ((0, o.isDeepgramError)(e)) return { result: null, error: e };
                  throw e;
                }
              });
            }
            analyzeTextCallback(e, t, r, i = "v1/read") {
              return n(this, void 0, void 0, function* () {
                try {
                  let n;
                  if (!(0, s.isTextSource)(e)) throw new o.DeepgramError("Unknown source type");
                  n = JSON.stringify(e);
                  const a = Object.assign(Object.assign({}, r), { callback: t.toString() }),
                    c = new URL(i, this.baseUrl);
                  return (
                    (0, s.appendSearchParams)(c.searchParams, a),
                    {
                      result: yield this.post(this.fetch, c, n, {
                        "Content-Type": "deepgram/audio+video",
                      }),
                      error: null,
                    }
                  );
                } catch (e) {
                  if ((0, o.isDeepgramError)(e)) return { result: null, error: e };
                  throw e;
                }
              });
            }
          }
          t.ReadClient = a;
        },
        458: (e, t, r) => {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.PrerecordedClient =
              t.OnPremClient =
              t.ManageClient =
              t.LiveClient =
              t.ListenClient =
              t.AbstractWsClient =
              t.AbstractRestfulClient =
              t.AbstractClient =
                void 0);
          var n = r(910);
          Object.defineProperty(t, "AbstractClient", {
            enumerable: !0,
            get: function () {
              return n.AbstractClient;
            },
          });
          var i = r(207);
          Object.defineProperty(t, "AbstractRestfulClient", {
            enumerable: !0,
            get: function () {
              return i.AbstractRestfulClient;
            },
          });
          var s = r(898);
          Object.defineProperty(t, "AbstractWsClient", {
            enumerable: !0,
            get: function () {
              return s.AbstractWsClient;
            },
          });
          var o = r(685);
          Object.defineProperty(t, "ListenClient", {
            enumerable: !0,
            get: function () {
              return o.ListenClient;
            },
          });
          var a = r(118);
          Object.defineProperty(t, "LiveClient", {
            enumerable: !0,
            get: function () {
              return a.LiveClient;
            },
          });
          var c = r(412);
          Object.defineProperty(t, "ManageClient", {
            enumerable: !0,
            get: function () {
              return c.ManageClient;
            },
          });
          var u = r(581);
          Object.defineProperty(t, "OnPremClient", {
            enumerable: !0,
            get: function () {
              return u.OnPremClient;
            },
          });
          var l = r(524);
          Object.defineProperty(t, "PrerecordedClient", {
            enumerable: !0,
            get: function () {
              return l.PrerecordedClient;
            },
          });
        },
        840: (e, t, r) => {
          var n;
          if ("object" == typeof globalThis) n = globalThis;
          else
            try {
              n = r(284);
            } catch (e) {
            } finally {
              if ((n || "undefined" == typeof window || (n = window), !n))
                throw new Error("Could not determine global this");
            }
          var i = n.WebSocket || n.MozWebSocket,
            s = r(387);
          function o(e, t) {
            return t ? new i(e, t) : new i(e);
          }
          i &&
            ["CONNECTING", "OPEN", "CLOSING", "CLOSED"].forEach(function (e) {
              Object.defineProperty(o, e, {
                get: function () {
                  return i[e];
                },
              });
            }),
            (e.exports = { w3cwebsocket: i ? o : null, version: s });
        },
        387: (e, t, r) => {
          e.exports = r(794).version;
        },
        794: (e) => {
          "use strict";
          e.exports = { version: "1.0.34" };
        },
      },
      t = {};
    function r(n) {
      var i = t[n];
      if (void 0 !== i) return i.exports;
      var s = (t[n] = { exports: {} });
      return e[n].call(s.exports, s, s.exports, r), s.exports;
    }
    return (
      (r.n = (e) => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return r.d(t, { a: t }), t;
      }),
      (r.d = (e, t) => {
        for (var n in t)
          r.o(t, n) && !r.o(e, n) && Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
      }),
      (r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
      (r.r = (e) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      r(341)
    );
  })()
);

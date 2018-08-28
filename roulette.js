/* jqueryrotate 2.3 MIT http://jqueryrotate.com */
(function ($) { var supportedCSS, supportedCSSOrigin, styles = document.getElementsByTagName("head")[0].style, toCheck = "transformProperty WebkitTransform OTransform msTransform MozTransform".split(" "); for (var a = 0; a < toCheck.length; a++) { if (styles[toCheck[a]] !== undefined) { supportedCSS = toCheck[a] } } if (supportedCSS) { supportedCSSOrigin = supportedCSS.replace(/[tT]ransform/, "TransformOrigin"); if (supportedCSSOrigin[0] == "T") { supportedCSSOrigin[0] = "t" } } eval('IE = "v"=="\v"'); jQuery.fn.extend({ rotate: function (parameters) { if (this.length === 0 || typeof parameters == "undefined") { return } if (typeof parameters == "number") { parameters = { angle: parameters } } var returned = []; for (var i = 0, i0 = this.length; i < i0; i++) { var element = this.get(i); if (!element.Wilq32 || !element.Wilq32.PhotoEffect) { var paramClone = $.extend(true, {}, parameters); var newRotObject = new Wilq32.PhotoEffect(element, paramClone)._rootObj; returned.push($(newRotObject)) } else { element.Wilq32.PhotoEffect._handleRotation(parameters) } } return returned }, getRotateAngle: function () { var ret = []; for (var i = 0, i0 = this.length; i < i0; i++) { var element = this.get(i); if (element.Wilq32 && element.Wilq32.PhotoEffect) { ret[i] = element.Wilq32.PhotoEffect._angle } } return ret }, stopRotate: function () { for (var i = 0, i0 = this.length; i < i0; i++) { var element = this.get(i); if (element.Wilq32 && element.Wilq32.PhotoEffect) { clearTimeout(element.Wilq32.PhotoEffect._timer) } } } }); Wilq32 = window.Wilq32 || {}; Wilq32.PhotoEffect = (function () { if (supportedCSS) { return function (img, parameters) { img.Wilq32 = { PhotoEffect: this }; this._img = this._rootObj = this._eventObj = img; this._handleRotation(parameters) } } else { return function (img, parameters) { this._img = img; this._onLoadDelegate = [parameters]; this._rootObj = document.createElement("span"); this._rootObj.style.display = "inline-block"; this._rootObj.Wilq32 = { PhotoEffect: this }; img.parentNode.insertBefore(this._rootObj, img); if (img.complete) { this._Loader() } else { var self = this; jQuery(this._img).bind("load", function () { self._Loader() }) } } } })(); Wilq32.PhotoEffect.prototype = { _setupParameters: function (parameters) { this._parameters = this._parameters || {}; if (typeof this._angle !== "number") { this._angle = 0 } if (typeof parameters.angle === "number") { this._angle = parameters.angle } this._parameters.animateTo = (typeof parameters.animateTo === "number") ? (parameters.animateTo) : (this._angle); this._parameters.step = parameters.step || this._parameters.step || null; this._parameters.easing = parameters.easing || this._parameters.easing || this._defaultEasing; this._parameters.duration = parameters.duration || this._parameters.duration || 1000; this._parameters.callback = parameters.callback || this._parameters.callback || this._emptyFunction; this._parameters.center = parameters.center || this._parameters.center || ["50%", "50%"]; if (typeof this._parameters.center[0] == "string") { this._rotationCenterX = (parseInt(this._parameters.center[0], 10) / 100) * this._imgWidth * this._aspectW } else { this._rotationCenterX = this._parameters.center[0] } if (typeof this._parameters.center[1] == "string") { this._rotationCenterY = (parseInt(this._parameters.center[1], 10) / 100) * this._imgHeight * this._aspectH } else { this._rotationCenterY = this._parameters.center[1] } if (parameters.bind && parameters.bind != this._parameters.bind) { this._BindEvents(parameters.bind) } }, _emptyFunction: function () { }, _defaultEasing: function (x, t, b, c, d) { return -c * ((t = t / d - 1) * t * t * t - 1) + b }, _handleRotation: function (parameters, dontcheck) { if (!supportedCSS && !this._img.complete && !dontcheck) { this._onLoadDelegate.push(parameters); return } this._setupParameters(parameters); if (this._angle == this._parameters.animateTo) { this._rotate(this._angle) } else { this._animateStart() } }, _BindEvents: function (events) { if (events && this._eventObj) { if (this._parameters.bind) { var oldEvents = this._parameters.bind; for (var a in oldEvents) { if (oldEvents.hasOwnProperty(a)) { jQuery(this._eventObj).unbind(a, oldEvents[a]) } } } this._parameters.bind = events; for (var a in events) { if (events.hasOwnProperty(a)) { jQuery(this._eventObj).bind(a, events[a]) } } } }, _Loader: (function () { if (IE) { return function () { var width = this._img.width; var height = this._img.height; this._imgWidth = width; this._imgHeight = height; this._img.parentNode.removeChild(this._img); this._vimage = this.createVMLNode("image"); this._vimage.src = this._img.src; this._vimage.style.height = height + "px"; this._vimage.style.width = width + "px"; this._vimage.style.position = "absolute"; this._vimage.style.top = "0px"; this._vimage.style.left = "0px"; this._aspectW = this._aspectH = 1; this._container = this.createVMLNode("group"); this._container.style.width = width; this._container.style.height = height; this._container.style.position = "absolute"; this._container.style.top = "0px"; this._container.style.left = "0px"; this._container.setAttribute("coordsize", width - 1 + "," + (height - 1)); this._container.appendChild(this._vimage); this._rootObj.appendChild(this._container); this._rootObj.style.position = "relative"; this._rootObj.style.width = width + "px"; this._rootObj.style.height = height + "px"; this._rootObj.setAttribute("id", this._img.getAttribute("id")); this._rootObj.className = this._img.className; this._eventObj = this._rootObj; var parameters; while (parameters = this._onLoadDelegate.shift()) { this._handleRotation(parameters, true) } } } else { return function () { this._rootObj.setAttribute("id", this._img.getAttribute("id")); this._rootObj.className = this._img.className; this._imgWidth = this._img.naturalWidth; this._imgHeight = this._img.naturalHeight; var _widthMax = Math.sqrt((this._imgHeight) * (this._imgHeight) + (this._imgWidth) * (this._imgWidth)); this._width = _widthMax * 3; this._height = _widthMax * 3; this._aspectW = this._img.offsetWidth / this._img.naturalWidth; this._aspectH = this._img.offsetHeight / this._img.naturalHeight; this._img.parentNode.removeChild(this._img); this._canvas = document.createElement("canvas"); this._canvas.setAttribute("width", this._width); this._canvas.style.position = "relative"; this._canvas.style.left = -this._img.height * this._aspectW + "px"; this._canvas.style.top = -this._img.width * this._aspectH + "px"; this._canvas.Wilq32 = this._rootObj.Wilq32; this._rootObj.appendChild(this._canvas); this._rootObj.style.width = this._img.width * this._aspectW + "px"; this._rootObj.style.height = this._img.height * this._aspectH + "px"; this._eventObj = this._canvas; this._cnv = this._canvas.getContext("2d"); var parameters; while (parameters = this._onLoadDelegate.shift()) { this._handleRotation(parameters, true) } } } })(), _animateStart: function () { if (this._timer) { clearTimeout(this._timer) } this._animateStartTime = +new Date; this._animateStartAngle = this._angle; this._animate() }, _animate: function () { var actualTime = +new Date; var checkEnd = actualTime - this._animateStartTime > this._parameters.duration; if (checkEnd && !this._parameters.animatedGif) { clearTimeout(this._timer) } else { if (this._canvas || this._vimage || this._img) { var angle = this._parameters.easing(0, actualTime - this._animateStartTime, this._animateStartAngle, this._parameters.animateTo - this._animateStartAngle, this._parameters.duration); this._rotate((~~(angle * 10)) / 10) } if (this._parameters.step) { this._parameters.step(this._angle) } var self = this; this._timer = setTimeout(function () { self._animate.call(self) }, 10) } if (this._parameters.callback && checkEnd) { this._angle = this._parameters.animateTo; this._rotate(this._angle); this._parameters.callback.call(this._rootObj) } }, _rotate: (function () { var rad = Math.PI / 180; if (IE) { return function (angle) { this._angle = angle; this._container.style.rotation = (angle % 360) + "deg"; this._vimage.style.top = -(this._rotationCenterY - this._imgHeight / 2) + "px"; this._vimage.style.left = -(this._rotationCenterX - this._imgWidth / 2) + "px"; this._container.style.top = this._rotationCenterY - this._imgHeight / 2 + "px"; this._container.style.left = this._rotationCenterX - this._imgWidth / 2 + "px" } } else { if (supportedCSS) { return function (angle) { this._angle = angle; this._img.style[supportedCSS] = "rotate(" + (angle % 360) + "deg)"; this._img.style[supportedCSSOrigin] = this._parameters.center.join(" ") } } else { return function (angle) { this._angle = angle; angle = (angle % 360) * rad; this._canvas.width = this._width; this._canvas.height = this._height; this._cnv.translate(this._imgWidth * this._aspectW, this._imgHeight * this._aspectH); this._cnv.translate(this._rotationCenterX, this._rotationCenterY); this._cnv.rotate(angle); this._cnv.translate(-this._rotationCenterX, -this._rotationCenterY); this._cnv.scale(this._aspectW, this._aspectH); this._cnv.drawImage(this._img, 0, 0) } } } })() }; if (IE) { Wilq32.PhotoEffect.prototype.createVMLNode = (function () { document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)"); try { !document.namespaces.rvml && document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"); return function (tagName) { return document.createElement("<rvml:" + tagName + ' class="rvml">') } } catch (e) { return function (tagName) { return document.createElement("<" + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">') } } })() } })(jQuery);

/** Abstract base class for collection plugins v1.0.1.
	Written by Keith Wood (kbwood{at}iinet.com.au) December 2013.
	Licensed under the MIT (https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt) license. */
(function () { var j = false; window.JQClass = function () { }; JQClass.classes = {}; JQClass.extend = function extender(f) { var g = this.prototype; j = true; var h = new this(); j = false; for (var i in f) { h[i] = typeof f[i] == 'function' && typeof g[i] == 'function' ? (function (d, e) { return function () { var b = this._super; this._super = function (a) { return g[d].apply(this, a || []) }; var c = e.apply(this, arguments); this._super = b; return c } })(i, f[i]) : f[i] } function JQClass() { if (!j && this._init) { this._init.apply(this, arguments) } } JQClass.prototype = h; JQClass.prototype.constructor = JQClass; JQClass.extend = extender; return JQClass } })(); (function ($) { JQClass.classes.JQPlugin = JQClass.extend({ name: 'plugin', defaultOptions: {}, regionalOptions: {}, _getters: [], _getMarker: function () { return 'is-' + this.name }, _init: function () { $.extend(this.defaultOptions, (this.regionalOptions && this.regionalOptions['']) || {}); var c = camelCase(this.name); $[c] = this; $.fn[c] = function (a) { var b = Array.prototype.slice.call(arguments, 1); if ($[c]._isNotChained(a, b)) { return $[c][a].apply($[c], [this[0]].concat(b)) } return this.each(function () { if (typeof a === 'string') { if (a[0] === '_' || !$[c][a]) { throw 'Unknown method: ' + a; } $[c][a].apply($[c], [this].concat(b)) } else { $[c]._attach(this, a) } }) } }, setDefaults: function (a) { $.extend(this.defaultOptions, a || {}) }, _isNotChained: function (a, b) { if (a === 'option' && (b.length === 0 || (b.length === 1 && typeof b[0] === 'string'))) { return true } return $.inArray(a, this._getters) > -1 }, _attach: function (a, b) { a = $(a); if (a.hasClass(this._getMarker())) { return } a.addClass(this._getMarker()); b = $.extend({}, this.defaultOptions, this._getMetadata(a), b || {}); var c = $.extend({ name: this.name, elem: a, options: b }, this._instSettings(a, b)); a.data(this.name, c); this._postAttach(a, c); this.option(a, b) }, _instSettings: function (a, b) { return {} }, _postAttach: function (a, b) { }, _getMetadata: function (d) { try { var f = d.data(this.name.toLowerCase()) || ''; f = f.replace(/'/g, '"'); f = f.replace(/([a-zA-Z0-9]+):/g, function (a, b, i) { var c = f.substring(0, i).match(/"/g); return (!c || c.length % 2 === 0 ? '"' + b + '":' : b + ':') }); f = $.parseJSON('{' + f + '}'); for (var g in f) { var h = f[g]; if (typeof h === 'string' && h.match(/^new Date\((.*)\)$/)) { f[g] = eval(h) } } return f } catch (e) { return {} } }, _getInst: function (a) { return $(a).data(this.name) || {} }, option: function (a, b, c) { a = $(a); var d = a.data(this.name); if (!b || (typeof b === 'string' && c == null)) { var e = (d || {}).options; return (e && b ? e[b] : e) } if (!a.hasClass(this._getMarker())) { return } var e = b || {}; if (typeof b === 'string') { e = {}; e[b] = c } this._optionsChanged(a, d, e); $.extend(d.options, e) }, _optionsChanged: function (a, b, c) { }, destroy: function (a) { a = $(a); if (!a.hasClass(this._getMarker())) { return } this._preDestroy(a, this._getInst(a)); a.removeData(this.name).removeClass(this._getMarker()) }, _preDestroy: function (a, b) { } }); function camelCase(c) { return c.replace(/-([a-z])/g, function (a, b) { return b.toUpperCase() }) } $.JQPlugin = { createPlugin: function (a, b) { if (typeof a === 'object') { b = a; a = 'JQPlugin' } a = camelCase(a); var c = camelCase(b.name); JQClass.classes[c] = JQClass.classes[a].extend(b); new JQClass.classes[c]() } } })(jQuery);

/* http://keith-wood.name/countdown.html
   Countdown for jQuery v2.0.1.
   Written by Keith Wood (kbwood{at}iinet.com.au) January 2008.
   Available under the MIT (https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt) license.
   Please attribute the author if you use it. */
(function ($) { var w = 'countdown'; var Y = 0; var O = 1; var W = 2; var D = 3; var H = 4; var M = 5; var S = 6; $.JQPlugin.createPlugin({ name: w, defaultOptions: { until: null, since: null, timezone: null, serverSync: null, format: 'dHMS', layout: '', compact: false, padZeroes: false, significant: 0, description: '', expiryUrl: '', expiryText: '', alwaysExpire: false, onExpiry: null, onTick: null, tickInterval: 1 }, regionalOptions: { '': { labels: ['Years', 'Months', 'Weeks', 'Days', 'Hours', 'Minutes', 'Seconds'], labels1: ['Year', 'Month', 'Week', 'Day', 'Hour', 'Minute', 'Second'], compactLabels: ['y', 'm', 'w', 'd'], whichLabels: null, digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], timeSeparator: ':', isRTL: false } }, _getters: ['getTimes'], _rtlClass: w + '-rtl', _sectionClass: w + '-section', _amountClass: w + '-amount', _periodClass: w + '-period', _rowClass: w + '-row', _holdingClass: w + '-holding', _showClass: w + '-show', _descrClass: w + '-descr', _timerElems: [], _init: function () { var c = this; this._super(); this._serverSyncs = []; var d = (typeof Date.now == 'function' ? Date.now : function () { return new Date().getTime() }); var e = (window.performance && typeof window.performance.now == 'function'); function timerCallBack(a) { var b = (a < 1e12 ? (e ? (performance.now() + performance.timing.navigationStart) : d()) : a || d()); if (b - g >= 1000) { c._updateElems(); g = b } f(timerCallBack) } var f = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || null; var g = 0; if (!f || $.noRequestAnimationFrame) { $.noRequestAnimationFrame = null; setInterval(function () { c._updateElems() }, 980) } else { g = window.animationStartTime || window.webkitAnimationStartTime || window.mozAnimationStartTime || window.oAnimationStartTime || window.msAnimationStartTime || d(); f(timerCallBack) } }, UTCDate: function (a, b, c, e, f, g, h, i) { if (typeof b == 'object' && b.constructor == Date) { i = b.getMilliseconds(); h = b.getSeconds(); g = b.getMinutes(); f = b.getHours(); e = b.getDate(); c = b.getMonth(); b = b.getFullYear() } var d = new Date(); d.setUTCFullYear(b); d.setUTCDate(1); d.setUTCMonth(c || 0); d.setUTCDate(e || 1); d.setUTCHours(f || 0); d.setUTCMinutes((g || 0) - (Math.abs(a) < 30 ? a * 60 : a)); d.setUTCSeconds(h || 0); d.setUTCMilliseconds(i || 0); return d }, periodsToSeconds: function (a) { return a[0] * 31557600 + a[1] * 2629800 + a[2] * 604800 + a[3] * 86400 + a[4] * 3600 + a[5] * 60 + a[6] }, _instSettings: function (a, b) { return { _periods: [0, 0, 0, 0, 0, 0, 0] } }, _addElem: function (a) { if (!this._hasElem(a)) { this._timerElems.push(a) } }, _hasElem: function (a) { return ($.inArray(a, this._timerElems) > -1) }, _removeElem: function (b) { this._timerElems = $.map(this._timerElems, function (a) { return (a == b ? null : a) }) }, _updateElems: function () { for (var i = this._timerElems.length - 1; i >= 0; i--) { this._updateCountdown(this._timerElems[i]) } }, _optionsChanged: function (a, b, c) { if (c.layout) { c.layout = c.layout.replace(/&lt;/g, '<').replace(/&gt;/g, '>') } this._resetExtraLabels(b.options, c); var d = (b.options.timezone != c.timezone); $.extend(b.options, c); this._adjustSettings(a, b, c.until != null || c.since != null || d); var e = new Date(); if ((b._since && b._since < e) || (b._until && b._until > e)) { this._addElem(a[0]) } this._updateCountdown(a, b) }, _updateCountdown: function (a, b) { a = a.jquery ? a : $(a); b = b || this._getInst(a); if (!b) { return } a.html(this._generateHTML(b)).toggleClass(this._rtlClass, b.options.isRTL); if ($.isFunction(b.options.onTick)) { var c = b._hold != 'lap' ? b._periods : this._calculatePeriods(b, b._show, b.options.significant, new Date()); if (b.options.tickInterval == 1 || this.periodsToSeconds(c) % b.options.tickInterval == 0) { b.options.onTick.apply(a[0], [c]) } } var d = b._hold != 'pause' && (b._since ? b._now.getTime() < b._since.getTime() : b._now.getTime() >= b._until.getTime()); if (d && !b._expiring) { b._expiring = true; if (this._hasElem(a[0]) || b.options.alwaysExpire) { this._removeElem(a[0]); if ($.isFunction(b.options.onExpiry)) { b.options.onExpiry.apply(a[0], []) } if (b.options.expiryText) { var e = b.options.layout; b.options.layout = b.options.expiryText; this._updateCountdown(a[0], b); b.options.layout = e } if (b.options.expiryUrl) { window.location = b.options.expiryUrl } } b._expiring = false } else if (b._hold == 'pause') { this._removeElem(a[0]) } }, _resetExtraLabels: function (a, b) { for (var n in b) { if (n.match(/[Ll]abels[02-9]|compactLabels1/)) { a[n] = b[n] } } for (var n in a) { if (n.match(/[Ll]abels[02-9]|compactLabels1/) && typeof b[n] === 'undefined') { a[n] = null } } }, _adjustSettings: function (a, b, c) { var d; var e = 0; var f = null; for (var i = 0; i < this._serverSyncs.length; i++) { if (this._serverSyncs[i][0] == b.options.serverSync) { f = this._serverSyncs[i][1]; break } } if (f != null) { e = (b.options.serverSync ? f : 0); d = new Date() } else { var g = ($.isFunction(b.options.serverSync) ? b.options.serverSync.apply(a[0], []) : null); d = new Date(); e = (g ? d.getTime() - g.getTime() : 0); this._serverSyncs.push([b.options.serverSync, e]) } var h = b.options.timezone; h = (h == null ? -d.getTimezoneOffset() : h); if (c || (!c && b._until == null && b._since == null)) { b._since = b.options.since; if (b._since != null) { b._since = this.UTCDate(h, this._determineTime(b._since, null)); if (b._since && e) { b._since.setMilliseconds(b._since.getMilliseconds() + e) } } b._until = this.UTCDate(h, this._determineTime(b.options.until, d)); if (e) { b._until.setMilliseconds(b._until.getMilliseconds() + e) } } b._show = this._determineShow(b) }, _preDestroy: function (a, b) { this._removeElem(a[0]); a.empty() }, pause: function (a) { this._hold(a, 'pause') }, lap: function (a) { this._hold(a, 'lap') }, resume: function (a) { this._hold(a, null) }, toggle: function (a) { var b = $.data(a, this.name) || {}; this[!b._hold ? 'pause' : 'resume'](a) }, toggleLap: function (a) { var b = $.data(a, this.name) || {}; this[!b._hold ? 'lap' : 'resume'](a) }, _hold: function (a, b) { var c = $.data(a, this.name); if (c) { if (c._hold == 'pause' && !b) { c._periods = c._savePeriods; var d = (c._since ? '-' : '+'); c[c._since ? '_since' : '_until'] = this._determineTime(d + c._periods[0] + 'y' + d + c._periods[1] + 'o' + d + c._periods[2] + 'w' + d + c._periods[3] + 'd' + d + c._periods[4] + 'h' + d + c._periods[5] + 'm' + d + c._periods[6] + 's'); this._addElem(a) } c._hold = b; c._savePeriods = (b == 'pause' ? c._periods : null); $.data(a, this.name, c); this._updateCountdown(a, c) } }, getTimes: function (a) { var b = $.data(a, this.name); return (!b ? null : (b._hold == 'pause' ? b._savePeriods : (!b._hold ? b._periods : this._calculatePeriods(b, b._show, b.options.significant, new Date())))) }, _determineTime: function (k, l) { var m = this; var n = function (a) { var b = new Date(); b.setTime(b.getTime() + a * 1000); return b }; var o = function (a) { a = a.toLowerCase(); var b = new Date(); var c = b.getFullYear(); var d = b.getMonth(); var e = b.getDate(); var f = b.getHours(); var g = b.getMinutes(); var h = b.getSeconds(); var i = /([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g; var j = i.exec(a); while (j) { switch (j[2] || 's') { case 's': h += parseInt(j[1], 10); break; case 'm': g += parseInt(j[1], 10); break; case 'h': f += parseInt(j[1], 10); break; case 'd': e += parseInt(j[1], 10); break; case 'w': e += parseInt(j[1], 10) * 7; break; case 'o': d += parseInt(j[1], 10); e = Math.min(e, m._getDaysInMonth(c, d)); break; case 'y': c += parseInt(j[1], 10); e = Math.min(e, m._getDaysInMonth(c, d)); break } j = i.exec(a) } return new Date(c, d, e, f, g, h, 0) }; var p = (k == null ? l : (typeof k == 'string' ? o(k) : (typeof k == 'number' ? n(k) : k))); if (p) p.setMilliseconds(0); return p }, _getDaysInMonth: function (a, b) { return 32 - new Date(a, b, 32).getDate() }, _normalLabels: function (a) { return a }, _generateHTML: function (c) { var d = this; c._periods = (c._hold ? c._periods : this._calculatePeriods(c, c._show, c.options.significant, new Date())); var e = false; var f = 0; var g = c.options.significant; var h = $.extend({}, c._show); for (var i = Y; i <= S; i++) { e |= (c._show[i] == '?' && c._periods[i] > 0); h[i] = (c._show[i] == '?' && !e ? null : c._show[i]); f += (h[i] ? 1 : 0); g -= (c._periods[i] > 0 ? 1 : 0) } var j = [false, false, false, false, false, false, false]; for (var i = S; i >= Y; i--) { if (c._show[i]) { if (c._periods[i]) { j[i] = true } else { j[i] = g > 0; g-- } } } var k = (c.options.compact ? c.options.compactLabels : c.options.labels); var l = c.options.whichLabels || this._normalLabels; var m = function (a) { var b = c.options['compactLabels' + l(c._periods[a])]; return (h[a] ? d._translateDigits(c, c._periods[a]) + (b ? b[a] : k[a]) + ' ' : '') }; var n = (c.options.padZeroes ? 2 : 1); var o = function (a) { var b = c.options['labels' + l(c._periods[a])]; return ((!c.options.significant && h[a]) || (c.options.significant && j[a]) ? '<span class="' + d._sectionClass + '">' + '<span class="' + d._amountClass + '">' + d._minDigits(c, c._periods[a], n) + '</span>' + '<span class="' + d._periodClass + '">' + (b ? b[a] : k[a]) + '</span></span>' : '') }; return (c.options.layout ? this._buildLayout(c, h, c.options.layout, c.options.compact, c.options.significant, j) : ((c.options.compact ? '<span class="' + this._rowClass + ' ' + this._amountClass + (c._hold ? ' ' + this._holdingClass : '') + '">' + m(Y) + m(O) + m(W) + m(D) + (h[H] ? this._minDigits(c, c._periods[H], 2) : '') + (h[M] ? (h[H] ? c.options.timeSeparator : '') + this._minDigits(c, c._periods[M], 2) : '') + (h[S] ? (h[H] || h[M] ? c.options.timeSeparator : '') + this._minDigits(c, c._periods[S], 2) : '') : '<span class="' + this._rowClass + ' ' + this._showClass + (c.options.significant || f) + (c._hold ? ' ' + this._holdingClass : '') + '">' + o(Y) + o(O) + o(W) + o(D) + o(H) + o(M) + o(S)) + '</span>' + (c.options.description ? '<span class="' + this._rowClass + ' ' + this._descrClass + '">' + c.options.description + '</span>' : ''))) }, _buildLayout: function (c, d, e, f, g, h) { var j = c.options[f ? 'compactLabels' : 'labels']; var k = c.options.whichLabels || this._normalLabels; var l = function (a) { return (c.options[(f ? 'compactLabels' : 'labels') + k(c._periods[a])] || j)[a] }; var m = function (a, b) { return c.options.digits[Math.floor(a / b) % 10] }; var o = { desc: c.options.description, sep: c.options.timeSeparator, yl: l(Y), yn: this._minDigits(c, c._periods[Y], 1), ynn: this._minDigits(c, c._periods[Y], 2), ynnn: this._minDigits(c, c._periods[Y], 3), y1: m(c._periods[Y], 1), y10: m(c._periods[Y], 10), y100: m(c._periods[Y], 100), y1000: m(c._periods[Y], 1000), ol: l(O), on: this._minDigits(c, c._periods[O], 1), onn: this._minDigits(c, c._periods[O], 2), onnn: this._minDigits(c, c._periods[O], 3), o1: m(c._periods[O], 1), o10: m(c._periods[O], 10), o100: m(c._periods[O], 100), o1000: m(c._periods[O], 1000), wl: l(W), wn: this._minDigits(c, c._periods[W], 1), wnn: this._minDigits(c, c._periods[W], 2), wnnn: this._minDigits(c, c._periods[W], 3), w1: m(c._periods[W], 1), w10: m(c._periods[W], 10), w100: m(c._periods[W], 100), w1000: m(c._periods[W], 1000), dl: l(D), dn: this._minDigits(c, c._periods[D], 1), dnn: this._minDigits(c, c._periods[D], 2), dnnn: this._minDigits(c, c._periods[D], 3), d1: m(c._periods[D], 1), d10: m(c._periods[D], 10), d100: m(c._periods[D], 100), d1000: m(c._periods[D], 1000), hl: l(H), hn: this._minDigits(c, c._periods[H], 1), hnn: this._minDigits(c, c._periods[H], 2), hnnn: this._minDigits(c, c._periods[H], 3), h1: m(c._periods[H], 1), h10: m(c._periods[H], 10), h100: m(c._periods[H], 100), h1000: m(c._periods[H], 1000), ml: l(M), mn: this._minDigits(c, c._periods[M], 1), mnn: this._minDigits(c, c._periods[M], 2), mnnn: this._minDigits(c, c._periods[M], 3), m1: m(c._periods[M], 1), m10: m(c._periods[M], 10), m100: m(c._periods[M], 100), m1000: m(c._periods[M], 1000), sl: l(S), sn: this._minDigits(c, c._periods[S], 1), snn: this._minDigits(c, c._periods[S], 2), snnn: this._minDigits(c, c._periods[S], 3), s1: m(c._periods[S], 1), s10: m(c._periods[S], 10), s100: m(c._periods[S], 100), s1000: m(c._periods[S], 1000) }; var p = e; for (var i = Y; i <= S; i++) { var q = 'yowdhms'.charAt(i); var r = new RegExp('\\{' + q + '<\\}([\\s\\S]*)\\{' + q + '>\\}', 'g'); p = p.replace(r, ((!g && d[i]) || (g && h[i]) ? '$1' : '')) } $.each(o, function (n, v) { var a = new RegExp('\\{' + n + '\\}', 'g'); p = p.replace(a, v) }); return p }, _minDigits: function (a, b, c) { b = '' + b; if (b.length >= c) { return this._translateDigits(a, b) } b = '0000000000' + b; return this._translateDigits(a, b.substr(b.length - c)) }, _translateDigits: function (b, c) { return ('' + c).replace(/[0-9]/g, function (a) { return b.options.digits[a] }) }, _determineShow: function (a) { var b = a.options.format; var c = []; c[Y] = (b.match('y') ? '?' : (b.match('Y') ? '!' : null)); c[O] = (b.match('o') ? '?' : (b.match('O') ? '!' : null)); c[W] = (b.match('w') ? '?' : (b.match('W') ? '!' : null)); c[D] = (b.match('d') ? '?' : (b.match('D') ? '!' : null)); c[H] = (b.match('h') ? '?' : (b.match('H') ? '!' : null)); c[M] = (b.match('m') ? '?' : (b.match('M') ? '!' : null)); c[S] = (b.match('s') ? '?' : (b.match('S') ? '!' : null)); return c }, _calculatePeriods: function (c, d, e, f) { c._now = f; c._now.setMilliseconds(0); var g = new Date(c._now.getTime()); if (c._since) { if (f.getTime() < c._since.getTime()) { c._now = f = g } else { f = c._since } } else { g.setTime(c._until.getTime()); if (f.getTime() > c._until.getTime()) { c._now = f = g } } var h = [0, 0, 0, 0, 0, 0, 0]; if (d[Y] || d[O]) { var i = this._getDaysInMonth(f.getFullYear(), f.getMonth()); var j = this._getDaysInMonth(g.getFullYear(), g.getMonth()); var k = (g.getDate() == f.getDate() || (g.getDate() >= Math.min(i, j) && f.getDate() >= Math.min(i, j))); var l = function (a) { return (a.getHours() * 60 + a.getMinutes()) * 60 + a.getSeconds() }; var m = Math.max(0, (g.getFullYear() - f.getFullYear()) * 12 + g.getMonth() - f.getMonth() + ((g.getDate() < f.getDate() && !k) || (k && l(g) < l(f)) ? -1 : 0)); h[Y] = (d[Y] ? Math.floor(m / 12) : 0); h[O] = (d[O] ? m - h[Y] * 12 : 0); f = new Date(f.getTime()); var n = (f.getDate() == i); var o = this._getDaysInMonth(f.getFullYear() + h[Y], f.getMonth() + h[O]); if (f.getDate() > o) { f.setDate(o) } f.setFullYear(f.getFullYear() + h[Y]); f.setMonth(f.getMonth() + h[O]); if (n) { f.setDate(o) } } var p = Math.floor((g.getTime() - f.getTime()) / 1000); var q = function (a, b) { h[a] = (d[a] ? Math.floor(p / b) : 0); p -= h[a] * b }; q(W, 604800); q(D, 86400); q(H, 3600); q(M, 60); q(S, 1); if (p > 0 && !c._since) { var r = [1, 12, 4.3482, 7, 24, 60, 60]; var s = S; var t = 1; for (var u = S; u >= Y; u--) { if (d[u]) { if (h[s] >= t) { h[s] = 0; p = 1 } if (p > 0) { h[u]++; p = 0; s = u; t = 1 } } t *= r[u] } } if (e) { for (var u = Y; u <= S; u++) { if (e && h[u]) { e-- } else if (!e) { h[u] = 0 } } } return h } }) })(jQuery);


/* 호출부 설정 값
* sel_r_goblin          고블린룰렛 스타트 버튼 셀렉터
* sel_rb_goblin         고블린룰렛 룰렛보드 셀렉터

* sel_r_dimensional     차원의룰렛 아이디 셀렉터
* sel_rb_dimensional    차원의룰렛 룰렛보드 셀렉터

* sel_r_playtime        플레이타임룰렛 아이디 셀렉터
* sel_rb_playtime       플레이타임룰렛 룰렛보드 셀렉터

* sel_gopoint           고블린포인트 셀렉터
* sel_ptpoint           플레이 타임 셀렉터

* sel_countdown         차원의 룰렛 카운트 다운 셀렉터
* sel_keylist           차원의 열쇠 리스트 셀렉터
* cls_keyon             차원의 열쇠 활성 클래스

* fnEndRotateRouletteCallBack 룰렛 완료 후 콜백 함수
* fnEndCountDownCallBack      카운트 다운 00:00 콜백 함수

* eventUrl              이벤트 경로
*/

var moveTime = 1500;
var moveAngle = 18000;
var statusRoulette = "N";
var status = true;

var typeGoblin = 1;
var typeDimensional = 2;
var typePlayTime = 3;

$(document).ready(function () {
    $(sel_r_goblin).on("click", function (e) {
        e.preventDefault();
        if (statusRoulette == "Y") return false;
        fnRotateRoulette(typeGoblin);
    });
    $(sel_r_dimensional).on("click", function (e) {
        e.preventDefault();
        if (statusRoulette == "Y") return false;
        fnRotateRoulette(typeDimensional);
    });

    $(sel_r_playtime).on("click", function (e) {
        e.preventDefault();
        if (statusRoulette == "Y") return false;
        fnRotateRoulette(typePlayTime);
    });

    fnInitRoulette();
});

function fnInitRoulette() {
    fnGetGoblinPoint();
    fnGetKeyCount();
    fnGetPlayTimePoint();

    fnGetSpecialRouletteEndTime();
}

function fnGetGoblinPoint() {
    $.ajax(
     {
         type: "POST",
         url: "/events/" + eventUrl + "/GetGoblinPointToJson",
         dataType: "json",
         async: true,
         success: function (data) {
             $(sel_gopoint).text(150000);
         },
         error: function (xhr, status, error) {
             //alert(xhr.responseText);
         }
     });
}

function fnGetKeyCount() {
    $.ajax(
     {
         type: "POST",
         url: "/events/" + eventUrl + "/GetKeyCount",
         dataType: "json",
         async: true,
         success: function (data) {
             var keyCount = data;
             var keys = $(sel_keylist);

             keys.removeClass();

             keys.each(function (i) {
                 if (i < keyCount) {
                     $(this).addClass(cls_keyon);
                 }
             });
         },
         error: function (xhr, status, error) {
             //alert(xhr.responseText);
         }
     });
}

function fnGetSpecialRouletteEndTime() {
    var result = "0";

    $.ajax(
     {
         type: "POST",
         url: "/events/" + eventUrl + "/GetSpecialRouletteEndTimeToJson",
         dataType: "json",
         async: false,
         success: function (data) {
             if (data != "") {
                 fnSetTime(data);
             }

             result = data;
         },
         error: function (xhr, status, error) {
         }
     });

    return result;
}

function fnGetPlayTimePoint() {
    $.ajax(
     {
         type: "POST",
         url: "/events/" + eventUrl + "/GetPlayTimePointToJson",
         dataType: "json",
         async: true,
         success: function (data) {
             $(sel_ptpoint).text(data);
         },
         error: function (xhr, status, error) {
             //alert(xhr.responseText);
         }
     });
}

function fnGetServerTime() {
    var result = "0";
    $.ajax(
     {
         type: "POST",
         url: "/events/" + eventUrl + "/GetServerTime",
         dataType: "json",
         async: false,
         success: function (data) {
             result = data;
         },
         error: function (xhr, status, error) {
         }
     });

    return result;
}

function fnSetTime(date) {
    var el = $(sel_countdown);
    
    el.countdown('destroy');
    
    var leftOffTime = new Date(date);
    var serverTime = new Date(fnGetServerTime());

    el.countdown({
        format: "MS",
        until: leftOffTime,
        serverSync: function () {
            return new Date(serverTime)
        },
        onExpiry: function () {
            if (fnEndCountDownCallBack != null && typeof (fnEndCountDownCallBack) == 'function') {
                fnEndCountDownCallBack();
            }
        },
        layout: "{mnn}:{snn}"
    });
}

function fnRotateRoulette(type) {
    var result = { ReturnCode : -999 };

    if (!status) {
        return result;
    }

    status = false;
    setTimeout(function () { status = true }, 1500);

    statusRoulette = "Y";
    result = fnSetRoulette(type);

    //Logged out
    if (result.ReturnCode == -100) {
        alert(gp.Localization.BULK2784);
        statusRoulette = "N";
        location.href = gp.Http.Login + "/Home/LogIn?ReturnUrl=" + escape(document.location.href);
    }
    else if (result.ReturnCode == -200) {
        /*statusRoulette = "N";

        if (type == 3) {
            alert(gp.Localization.BULK2790);
        }
        else if (confirm(gp.Localization.BULK2785)) {
            window.open(gp.Http.Shop_MU, "_blank")
        }*/
    }
    else if (result.ReturnCode == -300) {
        alert("errorCode : -300");
    }
    else if (result.ReturnCode == -400) {
        
    }
    else if (result.ReturnCode == -500) {
        alert(gp.Localization.BULK2786);
    }
    else if (result.ReturnCode == -600) {
        alert(gp.Localization.BULK2789);
    }
    else if (result.ReturnCode == -900) {
        alert("You've exceeded the maximum number of times");
    }
    
    if (result.ReturnCode != 0) {
        statusRoulette = "N";

        fnEndRotateRoulette(result);
        return result;
    }

    if (type == typeGoblin) { board = sel_rb_goblin }
    else if (type == typeDimensional) { board = sel_rb_dimensional }
    else if (type == typePlayTime) { board = sel_rb_playtime }

    if (board != null) {
        $(board).rotate({
            angle: 0,
            duration: moveTime,
            animateTo: moveAngle + parseInt(result.RouletteAngle),
            center: ["50%", "50%"],
            callback: function () {
                statusRoulette = "N";
                fnEndRotateRoulette(result);

                return result;
            }
        });
    }
}

function fnSetRoulette(type) {
    var result = { ReturnCode: -999 };
    $.ajax(
     {
         type: "POST",
         url: "/events/" + eventUrl + "/SetRoulette",
         dataType: "json",
         data: { type: type },
         async: false,
         success: function (data) {
             result = data;
         },
         error: function (xhr, status, error) {
             //alert(xhr.responseText);
             //resultSeq = "-400";
         }
     });

    return result;
}

function fnEndRotateRoulette(rouletteResult) {
    var result = rouletteResult;

    if (result.ReturnCode == 0) {
        //차원의 룰렛 생성 시 차원의 룰렛 오픈
        if (result.KeyResult == 1) {
            alert(gp.Localization.BULK2787);
        }
        else {
            alert(gp.Localization.BULK2788.replace('#ItemName', result.ItemName));
        }

        fnInitRoulette();
    }

    if (fnEndRotateRouletteCallBack != null && typeof (fnEndRotateRouletteCallBack) == 'function') {
        fnEndRotateRouletteCallBack(result);
    }
}

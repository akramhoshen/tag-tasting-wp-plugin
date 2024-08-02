"use strict";
function init() {
    if ("" != code) {
        if (readonly = !0,
        "v2," === code.substring(0, 3)) {
            var e = code.split(",")
              , t = _slicedToArray(e, 4)
              , o = (t[0],
            t[1],
            t[2]);
            t[3];
            $("#abc123").val(atob(o))
        } else
            $("#abc123").val(decodeURIComponent(code));
        window.location.hash = "",
        sponsor = 0,
        execute()
    }
    inIframe() || showToolbar(),
    inspectClient()
}
function showAds() {
    $("#sponsorship").css("display", "inline")
}
function inspectClient() {
    var e = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      , t = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      , o = window.localStorage || !1;
    o && o.setItem("viewport", JSON.stringify({
        width: e,
        height: t
    }))
}
function optionals() {
    $(function() {
        $('[data-toggle="tooltip"]').tooltip()
    })
}
function inIframe() {
    try {
        return window.self !== window.top
    } catch (e) {
        return !0
    }
}
function showToolbar() {
    switch (document.domain) {
    case "prev.test-a-tag.com":
    case "next.test-a-tag.com":
    case "www.test-a-tag.com":
    case "test-a-tag.com":
    case "localhost":
        $("#toolbar").css("display", "block"),
        SPONSORSHIP && Math.random() < sponsor / 100 || ($("#evangalize").css("display", "block"),
        $("#sponsorship").css("display", "none"),
        $.extend(jsSocials.shares, {
            reddit: {
                label: "Reddit",
                logo: "fa fa-reddit-alien",
                shareUrl: "https://www.reddit.com/submit?url={url}&title={text}",
                countUrl: ""
            }
        }),
        $("#evangalize").jsSocials({
            url: "https://www.test-a-tag.com",
            text: "Test A Tag",
            showLabel: !1,
            showCount: !1,
            shares: ["reddit", "facebook", "linkedin", "twitter"]
        }))
    }
}
function initVideo() {
    google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED)
}
function onAdError(e) {
    console.log(e.getError()),
    log("SEVERE", e.getError().toString()),
    adsManager && adsManager.destroy()
}
function onAdComplete(e) {
    log("SEVERE", "Video ad(s) have finished playing, use refresh to replay")
}
function onAdsManagerLoaded(e) {
    adsManager = e.getAdsManager(virtualPlayer),
    adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, onAdError),
    adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, onAdComplete);
    try {
        play()
    } catch (e) {}
}
function hasChanged(e) {
    return e !== previous && (staleShare = !0,
    !0)
}
function render(e) {
    var t = document.getElementById(e).value
      , o = t;
    if ($("#preWin").remove(),
    $("#preVid").hide(),
    hideFeedback(),
    modal && hideModal(),
    log("INFO", "Initial Creative " + o),
    o && "" != o.trim()) {
        o = neat(o),
        log("INFO", "After Neat Proc " + o),
        o = macros(o),
        log("INFO", "After Macro Replacement " + o);
        new RegExp("^(http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$").test(o) ? ("http" != o.substr(0, 4) && (o = "http://" + o),
        $.get(o, function(e) {
            screenIt(neat(e))
        }, "text").fail(function(e, t) {
            loadVideo(o)
        })) : screenIt(o)
    } else
        log("SEVERE", "Nothing to show");
    previous = t
}
function screenIt(e) {
    log("INFO", "Screen:" + e),
    "<?xml" == e.substr(0, 5).toLowerCase() || "<VAST" == e.substr(0, 5).toUpperCase() ? injectVideo(e) : inject(e)
}
function inject(e) {
    var t = document.createElement("iframe");
    t.setAttribute("id", "preWin"),
    t.setAttribute("width", "100%"),
    t.setAttribute("style", "border: 0px; height: 620px; width: 100%"),
    document.getElementById("preview").appendChild(t);
    var o = t.contentWindow
      , n = o.document;
    n.open(),
    n.write(normalize(e)),
    n.close(),
    logEvent("preview", "html")
}
function normalize(e) {
    return new RegExp("<(head|body).*?>").test(e) ? e : "<body>" + e + "</body>"
}
function injectVideo(e) {
    $("#preVid").show();
    var t = new google.ima.AdsRequest;
    t.adsResponse = e,
    t.linearAdSlotWidth = 640,
    t.linearAdSlotHeight = 400,
    t.nonLinearAdSlotWidth = 640,
    t.nonLinearAdSlotHeight = 150,
    requestAds(t),
    logEvent("preview", "vast")
}
function loadVideo(e) {
    $("#preVid").show();
    var t = new google.ima.AdsRequest;
    t.adTagUrl = e,
    t.linearAdSlotWidth = 640,
    t.linearAdSlotHeight = 400,
    t.nonLinearAdSlotWidth = 640,
    t.nonLinearAdSlotHeight = 150,
    requestAds(t),
    logEvent("preview", "vast uri")
}
function loadFrame(e) {
    var t = document.createElement("iframe");
    t.setAttribute("id", "preWin"),
    t.setAttribute("width", "100%"),
    t.setAttribute("style", "border: 0px; height: 620px; width: 100%"),
    t.setAttribute("src", e),
    document.getElementById("preview").appendChild(t)
}
function requestAds(e) {
    adsLoader.requestAds(e)
}
function log(e, t) {
    switch (e) {
    case "INFO":
        isDebug && console.log(e + ": " + t);
        break;
    case "ERROR":
        console.log(e + ": " + t),
        showFeedback(t);
        break;
    case "SEVERE":
        showFeedback(t)
    }
}
function clean(e) {
    return logEvent("button", "clear"),
    document.getElementById(e).value = "",
    !0
}
function showFeedback(e) {
    $("#feedback").html("<center><pre style='background:none;border:none'>" + e + "</pre></center>"),
    $("#feedback").css("height", "64px")
}
function hideFeedback() {
    $("#feedback").css("height", "0px")
}
function neat(e) {
    var t = new RegExp("%%(\\w+)%%","g");
    return e.replace(t, "[$1]", "g").trim()
}
function macros(e) {
    var t, o = Math.random(2, 11).toString().substr(2, 11);
    return t = e.replace("[CLICK_URL]", ""),
    t = t.replace("[RANDOM]", o),
    t = t.replace("[IS_PREVIEW]", "1")
}
function gotoTab(e) {
    $(e).tab("show")
}
function execute() {
    render("abc123"),
    gotoTab("#tab_preview")
}
function exeButton() {
    logEvent("button", "refresh"),
    execute()
}
function replay() {
    gotoTab("#tab_preview"),
    hideFeedback(),
    startVideo()
}
function play() {
    window.hasOwnProperty("canAutoplay") && canAutoplay.video().then(function(e) {
        !0 === e.result ? (console.log("Can AutoPlay"),
        startVideo()) : (console.log("Cannot AutoPlay"),
        log("ERROR", 'Cannot auto play video, press <button aria-hidden="true" style="background-color:silver" class="btn btn-sm" onclick="replay()">PLAY</button> to play it manually'))
    })
}
function startVideo() {
    try {
        adDisplayContainer.initialize(),
        adsManager.init(640, 360, google.ima.ViewMode.NORMAL),
        adsManager.start()
    } catch (e) {
        onAdError(e)
    }
}
function share() {
    if ("" == $("#abc123").val().trim())
        $("#infobar").text("Link cannot be generated without a creative"),
        $("#infobar").show(),
        $("#actions").hide();
    else {
        $("#infobar").hide(),
        $("#actions").show();
        var e = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "") + window.location.pathname + "#v2,1," + btoa($("#abc123").val()) + "," + Date.now();
        e.length < 2050 ? $("#sharelink").text(e) : ($("#infobar").text("Link too long to be supported on all browsers"),
        $("#infobar").show(),
        $("#actions").hide())
    }
}
function receiveMessage(e) {
    if (e.data.sig)
        switch (e.data.sig) {
        case "EXPAND":
            showModal(e.data.val);
            break;
        case "CLOSE":
            hideModal()
        }
}
function showModal(e) {
    modal = !0;
    var t = document.getElementById("mframe");
    e ? (t.setAttribute("src", e),
    t.style.display = "block") : t.style.display = "none",
    $("#myModal").show()
}
function hideModal() {
    modal = !1,
    $("#myModal").hide()
}
function enableBtn(e) {
    $("#" + e).css("visibility", "visible")
}
function disableBtn(e) {
    $("#" + e).css("visibility", "hidden")
}
function logEvent(e, t) {
    arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    gtag("event", e, {
        event_label: t
    })
}
var _slicedToArray = function() {
    function e(e, t) {
        var o = []
          , n = !0
          , a = !1
          , i = void 0;
        try {
            for (var r, s = e[Symbol.iterator](); !(n = (r = s.next()).done) && (o.push(r.value),
            !t || o.length !== t); n = !0)
                ;
        } catch (e) {
            a = !0,
            i = e
        } finally {
            try {
                !n && s.return && s.return()
            } finally {
                if (a)
                    throw i
            }
        }
        return o
    }
    return function(t, o) {
        if (Array.isArray(t))
            return t;
        if (Symbol.iterator in Object(t))
            return e(t, o);
        throw new TypeError("Invalid attempt to destructure non-iterable instance")
    }
}(), DEBUGPARM = "debug=1", SPONSORSHIP = 0, ADTAGS = [], sponsor = SPONSORSHIP, previous = null, stalePreview = !0, staleShare = !0, readonly = !1, parms = window.location.search.substr(1).split("&"), isDebug = !1, adDisplayContainer = new google.ima.AdDisplayContainer(document.getElementById("preVid")), adsLoader = new google.ima.AdsLoader(adDisplayContainer), adsManager, virtualPlayer = {
    currentTime: 0
}, modal = !1, playError = !1, once = !1, code = code || window.location.hash.substring(1);
adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, onAdsManagerLoaded, !1),
adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, onAdError, !1);
for (var i = 0; i < parms.length; i++)
    parms[i] === DEBUGPARM && (isDebug = !0);
initVideo();
var clipboard = new Clipboard(".copy");
clipboard.on("success", function(e) {
    logEvent("button", "copy link")
}),
$(document).on("show.bs.tab", function(e) {
    "tab_preview" == e.target.id && (stalePreview = hasChanged($("#abc123").val()),
    stalePreview && render("abc123"),
    stalePreview = !1),
    "tab_share" == e.target.id && share()
}),
$(document).on("shown.bs.tab", function(e) {
    logEvent("tab", e.target.text)
}),
$(function() {
    init()
}),
window.addEventListener("message", receiveMessage, !1);

// JavaScript Document

/*------------SAMBOX------------*/
if (document.querySelectorAll(".sambox")) {document.body.onload = samBox()}
function samBox() {
    var sambox = document.querySelectorAll(".sambox"), n;
    if(sambox) {
        for (n = 0; n < sambox.length; n++) {
            createSamboxOuter(n);
        }
    }
    function createSamboxOuter(n) {
        sambox[n].onclick = function() {
            var nn, alt, txt,
                samboxImg = [],
                samboxP = [];
            for (nn = 0; nn < sambox.length; nn++) {
                samboxImg[nn] = document.createElement("img");
                samboxImg[nn].setAttribute("src", sambox[nn].getAttribute("href"));
                txt = sambox[nn].getElementsByTagName("p")[0];
                if (txt) {txt = txt.innerHTML;} else {txt = "Divano";}
                alt = sambox[nn].getElementsByTagName("img")[0].getAttribute("alt");
                if (txt.length < alt.length) { txt = alt; }
                samboxP[nn] = document.createElement("p");
                samboxP[nn].appendChild(document.createTextNode(txt));
            }
            var samboxOuter = document.createElement("div");
            samboxOuter.setAttribute("id", "samboxOuter");
            document.body.appendChild(samboxOuter);
            samboxOuter.onclick = function(e) {
                if(e.target === samboxOuter) {
                    document.body.removeChild(samboxOuter);
                }
            };
            var samboxLoading = document.createElement("div");
            samboxLoading.setAttribute("id", "samboxLoading");
            samboxOuter.appendChild(samboxLoading);
            samboxImg[n].onload = function() {
                createSamboxInner(n, samboxOuter, samboxImg, samboxP);
            };
            return false;
        };
    }
    function createSamboxInner(n, samboxOuter, samboxImg, samboxP) {
        var samboxInner = document.createElement("div");
        samboxInner.setAttribute("id", "samboxInner");
        samboxOuter.appendChild(samboxInner);
        samboxInner.appendChild(samboxImg[n]);
        samboxInner.appendChild(samboxP[n]);
        var samboxNext = document.createElement("div"); // NEXT button
        if(n < sambox.length - 1) {
            createPrevNext(samboxNext, "Next", "&rsaquo;");
        }
        var samboxPrev = document.createElement("div"); // PREV button
        if(n > 0) {
            createPrevNext(samboxPrev, "Prev", "&lsaquo;");
        }
        function createPrevNext(pn, where, arrow) {
            pn.setAttribute("id", "sambox" + where);
            pn.innerHTML = arrow;
            var samboxPNWrap = document.createElement("div");
            samboxPNWrap.setAttribute("id", "sambox" + where + "Wrap");
            samboxPNWrap.appendChild(pn);
            samboxInner.appendChild(samboxPNWrap);
            samboxPNWrap.onclick = function() {
                samboxOuter.removeChild(samboxInner);
                if (where === "Next") { n++; } else { n--; }
                createSamboxInner(n, samboxOuter, samboxImg, samboxP);
            };
        }
        var samboxClose = document.createElement("div");
        samboxClose.setAttribute("id", "samboxClose");
        samboxClose.innerHTML = "&times;";
        samboxInner.appendChild(samboxClose);
        samboxClose.onclick = function() {
            document.body.removeChild(samboxOuter);
        };
        document.onkeydown = function(e) {
            e = e || window.event;
            if (e.keyCode === 27) {
                document.body.removeChild(samboxOuter);
            }
        };
        var samboxFull = document.createElement("div");
        samboxFull.setAttribute("id", "samboxFull");
        samboxFull.innerHTML = "[-]";
        samboxInner.appendChild(samboxFull);
        samboxFull.onclick = function() {
            location.href = samboxImg[n].getAttribute("src");
        };
        positionSambox();
        function positionSambox() {
            var bodyH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
                bodyW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                samboxInnerH = samboxInner.clientHeight,
                samboxInnerW = samboxInner.clientWidth,
                samboxPH = samboxP[n].clientHeight,
                samboxImgH = samboxImg[n].clientHeight;
            if(samboxImgH < bodyH - samboxPH) {
                samboxInner.style.top = "50%";
                samboxInner.style.marginTop = "-" + ((samboxImgH + samboxPH) / 2) + "px";
            } else {
                samboxImg[n].style.height = (bodyH - samboxPH) + "px";
            }
            if(bodyH > samboxInnerH + 80) {
                samboxClose.style.top = "-40px";
                samboxFull.style.top = "-40px";
            } else if(bodyW > samboxInnerW + 80) {
                samboxClose.style.right = "-40px";
                samboxFull.style.left = "-40px";
            }
            if(bodyW > samboxInnerW + 80) {
                samboxPrev.style.left = "-40px";
                samboxNext.style.right = "-40px";
            }
            samboxInner.style.width = samboxImg[n].clientWidth + "px";
            var resizeFlag = false;
            window.onresize = function() {
                if(!resizeFlag) {
                    resizeFlag = setTimeout(function () {
                        var s = [samboxInner, samboxImg[n], samboxClose, samboxFull, samboxPrev, samboxNext];
                        var ss;
                        for (ss = 0; ss < s.length; ss++) {
                            if(s[ss].getAttribute("style")) {
                                s[ss].removeAttribute("style");
                            }
                        }
                        positionSambox();
                    }, 200);
                }
            };
        }
    }
}

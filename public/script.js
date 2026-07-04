/* ============================================================
   Deskwright — interactions
   - mobile nav
   - scroll reveal
   - animated action-log + cursor "screen recording"
   - animated stat counters
   - footer year
   FAQ uses native <details>; no JS needed.
   All motion respects prefers-reduced-motion.
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav ---------- */
  var hamburger = document.getElementById("hamburger");
  var nav = document.querySelector(".nav");
  if (hamburger && nav) {
    hamburger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", String(open));
      hamburger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.setAttribute("aria-label", "Open menu");
      }
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var revObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { revObserver.observe(el); });
  }

  /* ---------- Animated stat counters ---------- */
  var statNums = document.querySelectorAll(".stat-num");
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduceMotion) { el.textContent = target + suffix; return; }
    var dur = 1400, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    var statObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach(function (el) { statObserver.observe(el); });
  } else {
    statNums.forEach(animateCount);
  }

  /* ---------- Hero "screen recording" animation ---------- */
  var cursor = document.getElementById("cursor");
  var ripple = document.getElementById("ripple");
  var submit = document.getElementById("bb-submit");
  var logItems = document.querySelectorAll("#action-log-list li");
  var browserBody = document.querySelector(".browser-body");

  function moveCursorTo(targetEl) {
    if (!cursor || !browserBody || !targetEl) return;
    var bRect = browserBody.getBoundingClientRect();
    var tRect = targetEl.getBoundingClientRect();
    var x = tRect.left - bRect.left + Math.min(tRect.width / 2, 60);
    var y = tRect.top - bRect.top + tRect.height / 2;
    cursor.style.left = x + "px";
    cursor.style.top = y + "px";
    return { x: x, y: y };
  }

  function clickRipple(pos) {
    if (!ripple || !pos) return;
    ripple.style.left = pos.x + "px";
    ripple.style.top = pos.y + "px";
    ripple.classList.remove("go");
    void ripple.offsetWidth; // reflow to restart animation
    ripple.classList.add("go");
  }

  function revealLog(i) {
    if (logItems[i]) logItems[i].classList.add("show");
  }

  function runDemo() {
    if (reduceMotion) {
      logItems.forEach(function (li) { li.classList.add("show"); });
      if (submit) submit.classList.add("done");
      return;
    }

    var fields = document.querySelectorAll(".bb-field");
    var seq = [
      { delay: 400,  fn: function () { revealLog(0); } },
      { delay: 1100, fn: function () { var p = moveCursorTo(fields[0]); clickRipple(p); revealLog(1); } },
      { delay: 2000, fn: function () { var p = moveCursorTo(fields[0]); clickRipple(p); revealLog(2); } },
      { delay: 2900, fn: function () { var p = moveCursorTo(fields[1]); clickRipple(p); revealLog(3); } },
      { delay: 3900, fn: function () {
          var p = moveCursorTo(submit); clickRipple(p);
          if (submit) { submit.classList.add("flash"); }
        } },
      { delay: 4300, fn: function () {
          if (submit) { submit.classList.remove("flash"); submit.classList.add("done"); }
          revealLog(4);
        } }
    ];
    seq.forEach(function (s) { setTimeout(s.fn, s.delay); });
  }

  // Start the demo when the hero visual scrolls into view (once).
  var heroVisual = document.querySelector(".hero-visual");
  if (heroVisual && "IntersectionObserver" in window && !reduceMotion) {
    var demoObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runDemo();
          demoObserver.disconnect();
        }
      });
    }, { threshold: 0.4 });
    demoObserver.observe(heroVisual);
  } else {
    runDemo();
  }
})();

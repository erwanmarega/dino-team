<script setup>
// Stick figure pressing a barbell overhead. Level 1 (Reprise) struggles with
// an empty bar; level 4 (Performance) presses heavy plates with ease.
defineProps({
  level: { type: Number, required: true, validator: (v) => v >= 1 && v <= 4 },
})
</script>

<template>
  <svg class="fig" aria-hidden="true" width="120" height="144" viewBox="0 -26 200 240" fill="none">
    <g v-if="level === 4">
        <line x1="40" y1="212" x2="160" y2="212" stroke="#F4F4F4" stroke-opacity="0.3" stroke-width="2"/>
        <path d="M92 130 L86 210 M108 130 L114 210" stroke="#F4F4F4" stroke-width="12" stroke-linecap="round"/>
        <path d="M72 69 Q100 62 128 69 L114 132 L86 132 Z" fill="#F4F4F4"/>
        <path d="M89 88 q11 6 22 0 M100 96 v30 M93 108 h14 M93 118 h14" stroke="#161512" stroke-opacity="0.22" stroke-width="1.6" stroke-linecap="round"/>
        <line x1="100" y1="56" x2="100" y2="72" stroke="#F4F4F4" stroke-width="12"/>
        <circle cx="100" cy="46" r="13" fill="#F4F4F4"/>
        <circle cx="95" cy="44" r="1.6" fill="#161512"/><circle cx="105" cy="44" r="1.6" fill="#161512"/><path d="M94 51 q6 6 12 0" stroke="#161512" stroke-width="1.8" stroke-linecap="round"/>
        <g class="f4bar"><g>
        <line x1="26" y1="14" x2="174" y2="14" stroke="#D9D3C6" stroke-width="3" stroke-linecap="round"/>
        <rect x="32.5" y="-14" width="11" height="56" rx="2" style="fill: #0B0B0B"/>
        <rect x="156.5" y="-14" width="11" height="56" rx="2" style="fill: #0B0B0B"/>
        <rect x="46" y="-8" width="10" height="44" rx="2" style="fill: #0B0B0B"/>
        <rect x="144" y="-8" width="10" height="44" rx="2" style="fill: #0B0B0B"/>
        </g></g>
        <circle cx="80" cy="72" r="8.5" fill="#F4F4F4"/><circle cx="120" cy="72" r="8.5" fill="#F4F4F4"/>
        <g class="f4ul"><line x1="80" y1="72" x2="80" y2="42" stroke="#F4F4F4" stroke-width="12" stroke-linecap="round"/><ellipse cx="80" cy="57" rx="9.6" ry="11" fill="#F4F4F4"/><g class="f4fl"><line x1="80" y1="42" x2="80" y2="14" stroke="#F4F4F4" stroke-width="12" stroke-linecap="round"/></g></g>
        <g class="f4ur"><line x1="120" y1="72" x2="120" y2="42" stroke="#F4F4F4" stroke-width="12" stroke-linecap="round"/><ellipse cx="120" cy="57" rx="9.6" ry="11" fill="#F4F4F4"/><g class="f4fr"><line x1="120" y1="42" x2="120" y2="14" stroke="#F4F4F4" stroke-width="12" stroke-linecap="round"/></g></g>
        <g class="f4sp" style="stroke: #FFFFFF" stroke-width="2.5" stroke-linecap="round"><path d="M14 -2 l-8 -8 M10 14 h-10 M14 30 l-8 8 M186 -2 l8 -8 M190 14 h10 M186 30 l8 8"/></g>
    </g>
    <g v-else-if="level === 3">
        <line x1="40" y1="212" x2="160" y2="212" stroke="#F4F4F4" stroke-opacity="0.3" stroke-width="2"/>
        <path d="M92 130 L86 210 M108 130 L114 210" stroke="#F4F4F4" stroke-width="10" stroke-linecap="round"/>
        <path d="M78 71 L122 71 L112 132 L88 132 Z" fill="#F4F4F4"/>
        <path d="M89 88 q11 6 22 0 M100 96 v30 M93 108 h14 M93 118 h14" stroke="#161512" stroke-opacity="0.22" stroke-width="1.6" stroke-linecap="round"/>
        <line x1="100" y1="56" x2="100" y2="72" stroke="#F4F4F4" stroke-width="9"/>
        <circle cx="100" cy="46" r="13" fill="#F4F4F4"/>
        <circle cx="95" cy="45" r="1.6" fill="#161512"/><circle cx="105" cy="45" r="1.6" fill="#161512"/><path d="M96 52 q4 3 8 0" stroke="#161512" stroke-width="1.6" stroke-linecap="round"/>
        <g class="f3bar"><g>
        <line x1="26" y1="14" x2="174" y2="14" stroke="#D9D3C6" stroke-width="3" stroke-linecap="round"/>
        <rect x="33.5" y="-6" width="9" height="40" rx="2" fill="#1F1E1B"/>
        <rect x="157.5" y="-6" width="9" height="40" rx="2" fill="#1F1E1B"/>
        <rect x="45" y="-1" width="8" height="30" rx="2" fill="#1F1E1B"/>
        <rect x="147" y="-1" width="8" height="30" rx="2" fill="#1F1E1B"/>
        </g></g>
        <circle cx="80" cy="72" r="6" fill="#F4F4F4"/><circle cx="120" cy="72" r="6" fill="#F4F4F4"/>
        <g class="f3ul"><line x1="80" y1="72" x2="80" y2="42" stroke="#F4F4F4" stroke-width="9" stroke-linecap="round"/><g class="f3fl"><line x1="80" y1="42" x2="80" y2="14" stroke="#F4F4F4" stroke-width="9" stroke-linecap="round"/></g></g>
        <g class="f3ur"><line x1="120" y1="72" x2="120" y2="42" stroke="#F4F4F4" stroke-width="9" stroke-linecap="round"/><g class="f3fr"><line x1="120" y1="42" x2="120" y2="14" stroke="#F4F4F4" stroke-width="9" stroke-linecap="round"/></g></g>
    </g>
    <g v-else-if="level === 2" class="f2shk">
        <line x1="40" y1="212" x2="160" y2="212" stroke="#F4F4F4" stroke-opacity="0.3" stroke-width="2"/>
        <path d="M92 130 L86 210 M108 130 L114 210" stroke="#F4F4F4" stroke-width="8" stroke-linecap="round"/>
        <path d="M83 73 L117 73 L112 132 L88 132 Z" fill="#F4F4F4"/>
        <line x1="100" y1="56" x2="100" y2="72" stroke="#F4F4F4" stroke-width="7"/>
        <circle cx="100" cy="46" r="13" fill="#F4F4F4"/>
        <circle cx="95" cy="45" r="1.6" fill="#161512"/><circle cx="105" cy="45" r="1.6" fill="#161512"/><path d="M96 53 h8" stroke="#161512" stroke-width="1.6" stroke-linecap="round"/>
        <g class="f2bar"><g>
        <line x1="26" y1="14" x2="174" y2="14" stroke="#D9D3C6" stroke-width="3" stroke-linecap="round"/>
        <rect x="34" y="0" width="8" height="28" rx="2" fill="#0B0B0B"/>
        <rect x="158" y="0" width="8" height="28" rx="2" fill="#0B0B0B"/>
        </g></g>
        <g class="f2ul"><line x1="80" y1="72" x2="80" y2="42" stroke="#F4F4F4" stroke-width="7" stroke-linecap="round"/><g class="f2fl"><line x1="80" y1="42" x2="80" y2="14" stroke="#F4F4F4" stroke-width="7" stroke-linecap="round"/></g></g>
        <g class="f2ur"><line x1="120" y1="72" x2="120" y2="42" stroke="#F4F4F4" stroke-width="7" stroke-linecap="round"/><g class="f2fr"><line x1="120" y1="42" x2="120" y2="14" stroke="#F4F4F4" stroke-width="7" stroke-linecap="round"/></g></g>
    </g>
    <g v-else class="f1shk">
        <line x1="40" y1="212" x2="160" y2="212" stroke="#F4F4F4" stroke-opacity="0.3" stroke-width="2"/>
        <path d="M92 130 L86 210 M108 130 L114 210" stroke="#F4F4F4" stroke-width="6" stroke-linecap="round"/>
        <path d="M86 74 L114 74 L111 132 L89 132 Z" fill="#F4F4F4"/>
        <line x1="100" y1="56" x2="100" y2="72" stroke="#F4F4F4" stroke-width="6"/>
        <circle cx="100" cy="46" r="13" fill="#F4F4F4"/>
        <path d="M93 43 l4 2 l-4 2 M107 43 l-4 2 l4 2" stroke="#161512" stroke-width="1.6" stroke-linecap="round"/><ellipse cx="100" cy="53" rx="2.5" ry="3" fill="#161512"/>
        <g class="f1bar"><g class="f1tilt">
        <line x1="26" y1="14" x2="174" y2="14" stroke="#D9D3C6" stroke-width="3" stroke-linecap="round"/>
        <rect x="35" y="5" width="6" height="18" rx="2" fill="none" stroke="#F4F4F4" stroke-width="1.6"/>
        <rect x="159" y="5" width="6" height="18" rx="2" fill="none" stroke="#F4F4F4" stroke-width="1.6"/>
        </g></g>
        <g class="f1ul"><line x1="80" y1="72" x2="80" y2="42" stroke="#F4F4F4" stroke-width="5" stroke-linecap="round"/><g class="f1fl"><line x1="80" y1="42" x2="80" y2="14" stroke="#F4F4F4" stroke-width="5" stroke-linecap="round"/></g></g>
        <g class="f1ur"><line x1="120" y1="72" x2="120" y2="42" stroke="#F4F4F4" stroke-width="5" stroke-linecap="round"/><g class="f1fr"><line x1="120" y1="42" x2="120" y2="14" stroke="#F4F4F4" stroke-width="5" stroke-linecap="round"/></g></g>
        <g class="sw1"><path d="M119 38 q3 5 0 7 q-3 -2 0 -7z" fill="#BFD3E0"/></g><g class="sw2"><path d="M81 42 q3 5 0 7 q-3 -2 0 -7z" fill="#BFD3E0"/></g>
    </g>
  </svg>
</template>

<style scoped>
.fig {
  flex-shrink: 0;
}
.fig * {
  transform-box: view-box;
}
@keyframes f1ul{0.0%{transform:rotate(-160.0deg)}15.0%{transform:rotate(-160.0deg)}20.0%{transform:rotate(-155.9deg)}25.0%{transform:rotate(-145.5deg)}30.0%{transform:rotate(-132.0deg)}35.0%{transform:rotate(-118.5deg)}40.0%{transform:rotate(-108.1deg)}45.0%{transform:rotate(-104.0deg)}55.0%{transform:rotate(-92.8deg)}65.0%{transform:rotate(-99.2deg)}66.7%{transform:rotate(-101.3deg)}68.3%{transform:rotate(-106.7deg)}70.0%{transform:rotate(-113.6deg)}71.7%{transform:rotate(-120.5deg)}73.3%{transform:rotate(-125.9deg)}75.0%{transform:rotate(-128.0deg)}76.7%{transform:rotate(-130.4deg)}78.3%{transform:rotate(-136.3deg)}80.0%{transform:rotate(-144.0deg)}81.7%{transform:rotate(-151.7deg)}83.3%{transform:rotate(-157.6deg)}85.0%{transform:rotate(-160.0deg)}100.0%{transform:rotate(-160.0deg)}}
@keyframes f1fl{0.0%{transform:rotate(160.0deg)}15.0%{transform:rotate(160.0deg)}20.0%{transform:rotate(155.9deg)}25.0%{transform:rotate(145.5deg)}30.0%{transform:rotate(132.0deg)}35.0%{transform:rotate(118.5deg)}40.0%{transform:rotate(108.1deg)}45.0%{transform:rotate(104.0deg)}55.0%{transform:rotate(92.8deg)}65.0%{transform:rotate(99.2deg)}66.7%{transform:rotate(101.3deg)}68.3%{transform:rotate(106.7deg)}70.0%{transform:rotate(113.6deg)}71.7%{transform:rotate(120.5deg)}73.3%{transform:rotate(125.9deg)}75.0%{transform:rotate(128.0deg)}76.7%{transform:rotate(130.4deg)}78.3%{transform:rotate(136.3deg)}80.0%{transform:rotate(144.0deg)}81.7%{transform:rotate(151.7deg)}83.3%{transform:rotate(157.6deg)}85.0%{transform:rotate(160.0deg)}100.0%{transform:rotate(160.0deg)}}
@keyframes f1bar{0.0%{transform:translateY(58.2px)}15.0%{transform:translateY(58.2px)}20.0%{transform:translateY(57.4px)}25.0%{transform:translateY(54.7px)}30.0%{transform:translateY(50.1px)}35.0%{transform:translateY(44.3px)}40.0%{transform:translateY(39.3px)}45.0%{transform:translateY(37.3px)}55.0%{transform:translateY(31.5px)}65.0%{transform:translateY(34.8px)}66.7%{transform:translateY(35.9px)}68.3%{transform:translateY(38.6px)}70.0%{transform:translateY(42.0px)}71.7%{transform:translateY(45.2px)}73.3%{transform:translateY(47.6px)}75.0%{transform:translateY(48.5px)}76.7%{transform:translateY(49.4px)}78.3%{transform:translateY(51.7px)}80.0%{transform:translateY(54.3px)}81.7%{transform:translateY(56.4px)}83.3%{transform:translateY(57.7px)}85.0%{transform:translateY(58.2px)}100.0%{transform:translateY(58.2px)}}
.f1ul{transform-origin:80px 72px;animation:f1ul 3.2s linear infinite}
.f1fl{transform-origin:80px 42px;animation:f1fl 3.2s linear infinite}
.f1ur{transform-origin:120px 72px;animation:f1fl 3.2s linear infinite}
.f1fr{transform-origin:120px 42px;animation:f1ul 3.2s linear infinite}
.f1bar{transform-origin:0 0;animation:f1bar 3.2s linear infinite}
@keyframes f2ul{0.0%{transform:rotate(-160.0deg)}15.0%{transform:rotate(-160.0deg)}21.7%{transform:rotate(-149.9deg)}28.3%{transform:rotate(-124.7deg)}35.0%{transform:rotate(-92.0deg)}41.7%{transform:rotate(-59.3deg)}48.3%{transform:rotate(-34.1deg)}55.0%{transform:rotate(-24.0deg)}64.0%{transform:rotate(-16.0deg)}72.0%{transform:rotate(0deg)}84.0%{transform:rotate(0deg)}86.0%{transform:rotate(-11.9deg)}88.0%{transform:rotate(-41.5deg)}90.0%{transform:rotate(-80.0deg)}92.0%{transform:rotate(-118.5deg)}94.0%{transform:rotate(-148.1deg)}96.0%{transform:rotate(-160.0deg)}100.0%{transform:rotate(-160.0deg)}}
@keyframes f2fl{0.0%{transform:rotate(160.0deg)}15.0%{transform:rotate(160.0deg)}21.7%{transform:rotate(149.9deg)}28.3%{transform:rotate(124.7deg)}35.0%{transform:rotate(92.0deg)}41.7%{transform:rotate(59.3deg)}48.3%{transform:rotate(34.1deg)}55.0%{transform:rotate(24.0deg)}64.0%{transform:rotate(16.0deg)}72.0%{transform:rotate(0deg)}84.0%{transform:rotate(0deg)}86.0%{transform:rotate(11.9deg)}88.0%{transform:rotate(41.5deg)}90.0%{transform:rotate(80.0deg)}92.0%{transform:rotate(118.5deg)}94.0%{transform:rotate(148.1deg)}96.0%{transform:rotate(160.0deg)}100.0%{transform:rotate(160.0deg)}}
@keyframes f2bar{0.0%{transform:translateY(58.2px)}15.0%{transform:translateY(58.2px)}21.7%{transform:translateY(56.0px)}28.3%{transform:translateY(47.1px)}35.0%{transform:translateY(31.0px)}41.7%{transform:translateY(14.7px)}48.3%{transform:translateY(5.2px)}55.0%{transform:translateY(2.6px)}64.0%{transform:translateY(1.2px)}72.0%{transform:translateY(0px)}84.0%{transform:translateY(0px)}86.0%{transform:translateY(0.6px)}88.0%{transform:translateY(7.5px)}90.0%{transform:translateY(24.8px)}92.0%{transform:translateY(44.3px)}94.0%{transform:translateY(55.5px)}96.0%{transform:translateY(58.2px)}100.0%{transform:translateY(58.2px)}}
.f2ul{transform-origin:80px 72px;animation:f2ul 3.4s linear infinite}
.f2fl{transform-origin:80px 42px;animation:f2fl 3.4s linear infinite}
.f2ur{transform-origin:120px 72px;animation:f2fl 3.4s linear infinite}
.f2fr{transform-origin:120px 42px;animation:f2ul 3.4s linear infinite}
.f2bar{transform-origin:0 0;animation:f2bar 3.4s linear infinite}
@keyframes f3ul{0.0%{transform:rotate(-160.0deg)}10.0%{transform:rotate(-160.0deg)}15.8%{transform:rotate(-148.1deg)}21.7%{transform:rotate(-118.5deg)}27.5%{transform:rotate(-80.0deg)}33.3%{transform:rotate(-41.5deg)}39.2%{transform:rotate(-11.9deg)}45.0%{transform:rotate(0deg)}62.0%{transform:rotate(0deg)}67.5%{transform:rotate(-11.9deg)}73.0%{transform:rotate(-41.5deg)}78.5%{transform:rotate(-80.0deg)}84.0%{transform:rotate(-118.5deg)}89.5%{transform:rotate(-148.1deg)}95.0%{transform:rotate(-160.0deg)}100.0%{transform:rotate(-160.0deg)}}
@keyframes f3fl{0.0%{transform:rotate(160.0deg)}10.0%{transform:rotate(160.0deg)}15.8%{transform:rotate(148.1deg)}21.7%{transform:rotate(118.5deg)}27.5%{transform:rotate(80.0deg)}33.3%{transform:rotate(41.5deg)}39.2%{transform:rotate(11.9deg)}45.0%{transform:rotate(0deg)}62.0%{transform:rotate(0deg)}67.5%{transform:rotate(11.9deg)}73.0%{transform:rotate(41.5deg)}78.5%{transform:rotate(80.0deg)}84.0%{transform:rotate(118.5deg)}89.5%{transform:rotate(148.1deg)}95.0%{transform:rotate(160.0deg)}100.0%{transform:rotate(160.0deg)}}
@keyframes f3bar{0.0%{transform:translateY(58.2px)}10.0%{transform:translateY(58.2px)}15.8%{transform:translateY(55.5px)}21.7%{transform:translateY(44.3px)}27.5%{transform:translateY(24.8px)}33.3%{transform:translateY(7.5px)}39.2%{transform:translateY(0.6px)}45.0%{transform:translateY(0px)}62.0%{transform:translateY(0px)}67.5%{transform:translateY(0.6px)}73.0%{transform:translateY(7.5px)}78.5%{transform:translateY(24.8px)}84.0%{transform:translateY(44.3px)}89.5%{transform:translateY(55.5px)}95.0%{transform:translateY(58.2px)}100.0%{transform:translateY(58.2px)}}
.f3ul{transform-origin:80px 72px;animation:f3ul 2.4s linear infinite}
.f3fl{transform-origin:80px 42px;animation:f3fl 2.4s linear infinite}
.f3ur{transform-origin:120px 72px;animation:f3fl 2.4s linear infinite}
.f3fr{transform-origin:120px 42px;animation:f3ul 2.4s linear infinite}
.f3bar{transform-origin:0 0;animation:f3bar 2.4s linear infinite}
@keyframes f4ul{0.0%{transform:rotate(-160.0deg)}8.0%{transform:rotate(-160.0deg)}11.3%{transform:rotate(-148.1deg)}14.7%{transform:rotate(-118.5deg)}18.0%{transform:rotate(-80.0deg)}21.3%{transform:rotate(-41.5deg)}24.7%{transform:rotate(-11.9deg)}28.0%{transform:rotate(0deg)}70.0%{transform:rotate(0deg)}73.7%{transform:rotate(-11.9deg)}77.3%{transform:rotate(-41.5deg)}81.0%{transform:rotate(-80.0deg)}84.7%{transform:rotate(-118.5deg)}88.3%{transform:rotate(-148.1deg)}92.0%{transform:rotate(-160.0deg)}100.0%{transform:rotate(-160.0deg)}}
@keyframes f4fl{0.0%{transform:rotate(160.0deg)}8.0%{transform:rotate(160.0deg)}11.3%{transform:rotate(148.1deg)}14.7%{transform:rotate(118.5deg)}18.0%{transform:rotate(80.0deg)}21.3%{transform:rotate(41.5deg)}24.7%{transform:rotate(11.9deg)}28.0%{transform:rotate(0deg)}70.0%{transform:rotate(0deg)}73.7%{transform:rotate(11.9deg)}77.3%{transform:rotate(41.5deg)}81.0%{transform:rotate(80.0deg)}84.7%{transform:rotate(118.5deg)}88.3%{transform:rotate(148.1deg)}92.0%{transform:rotate(160.0deg)}100.0%{transform:rotate(160.0deg)}}
@keyframes f4bar{0.0%{transform:translateY(58.2px)}8.0%{transform:translateY(58.2px)}11.3%{transform:translateY(55.5px)}14.7%{transform:translateY(44.3px)}18.0%{transform:translateY(24.8px)}21.3%{transform:translateY(7.5px)}24.7%{transform:translateY(0.6px)}28.0%{transform:translateY(0px)}70.0%{transform:translateY(0px)}73.7%{transform:translateY(0.6px)}77.3%{transform:translateY(7.5px)}81.0%{transform:translateY(24.8px)}84.7%{transform:translateY(44.3px)}88.3%{transform:translateY(55.5px)}92.0%{transform:translateY(58.2px)}100.0%{transform:translateY(58.2px)}}
.f4ul{transform-origin:80px 72px;animation:f4ul 2s linear infinite}
.f4fl{transform-origin:80px 42px;animation:f4fl 2s linear infinite}
.f4ur{transform-origin:120px 72px;animation:f4fl 2s linear infinite}
.f4fr{transform-origin:120px 42px;animation:f4ul 2s linear infinite}
.f4bar{transform-origin:0 0;animation:f4bar 2s linear infinite}
@keyframes f1shk{0%,33%{transform:translateX(0)}36%{transform:translateX(-1.6px)}39%{transform:translateX(1.6px)}42%{transform:translateX(-1.6px)}45%{transform:translateX(1.6px)}48%{transform:translateX(-1.6px)}51%{transform:translateX(1.6px)}54%{transform:translateX(-1.6px)}57%{transform:translateX(1.6px)}60%{transform:translateX(-1.6px)}63%{transform:translateX(1.6px)}66%,100%{transform:translateX(0)}}.f1shk{animation:f1shk 3.2s linear infinite}
@keyframes f1tilt{0%,40%{transform:rotate(0)}50%{transform:rotate(-5deg)}60%{transform:rotate(4deg)}70%,100%{transform:rotate(0)}}.f1tilt{transform-origin:100px 14px;animation:f1tilt 3.2s ease-in-out infinite}
@keyframes f2shk{0%,50%{transform:translateX(0)}53%{transform:translateX(-1px)}56%{transform:translateX(1px)}59%{transform:translateX(-1px)}62%{transform:translateX(1px)}65%,100%{transform:translateX(0)}}.f2shk{animation:f2shk 3.4s linear infinite}
@keyframes sweat{0%,40%{opacity:0;transform:translateY(0)}48%{opacity:1}80%{opacity:0;transform:translateY(22px)}100%{opacity:0}}.sw1{opacity:0;animation:sweat 3.2s ease-in infinite}.sw2{opacity:0;animation:sweat 3.2s ease-in .25s infinite}
@keyframes spark{0%,24%{opacity:0;transform:scale(.6)}32%{opacity:1;transform:scale(1)}62%{opacity:1}70%,100%{opacity:0}}.f4sp{opacity:0;transform-origin:100px 14px;animation:spark 2s ease-out infinite}
@media (prefers-reduced-motion: reduce) {
  .fig * {
    animation: none !important;
  }
}
</style>

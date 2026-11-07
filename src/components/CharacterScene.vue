<script setup>
// Small looping character animations used across the page.
//   pushup  – push-ups at home (Coaching, fiche 01)
//   curl    – alternating dumbbell curls (Coaching, fiche 02)
//   chart   – coach ticking off a rising progress chart (Coaching, fiche 03)
//   creator – filming a video and talking to camera (Archives)
//   flex    – flexing in the DinoTeam sweat (Collection)
//   walk    – dino-to-athlete evolution march (Contact)
defineProps({
  name: {
    type: String,
    required: true,
    validator: (v) => ['pushup', 'curl', 'chart', 'creator', 'flex', 'walk'].includes(v),
  },
})
</script>

<template>
  <svg
    v-if="name === 'pushup'"
    class="fig fig--pushup"
    aria-hidden="true"
    width="100%"
    height="120"
    viewBox="0 0 240 120"
    fill="none"
  >
    <rect x="20" y="104" width="190" height="6" rx="3" fill="#3A3A3A" />
    <line
      class="pu-arm"
      x1="162"
      y1="104"
      x2="160"
      y2="62"
      stroke="#F4F4F4"
      stroke-width="7"
      stroke-linecap="round"
    />
    <g class="pu-body">
      <path
        d="M40 101 L104 82 L160 62"
        stroke="#F4F4F4"
        stroke-width="11"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx="176" cy="54" r="11" fill="#F4F4F4" />
    </g>
    <line
      x1="34"
      y1="104"
      x2="46"
      y2="104"
      stroke="#F4F4F4"
      stroke-width="5"
      stroke-linecap="round"
    />
  </svg>
  <svg
    v-else-if="name === 'curl'"
    class="fig fig--curl"
    aria-hidden="true"
    width="120"
    height="138"
    viewBox="0 0 200 230"
    fill="none"
  >
    <line
      x1="50"
      y1="212"
      x2="150"
      y2="212"
      stroke="#F4F4F4"
      stroke-opacity="0.3"
      stroke-width="2"
    />
    <path
      d="M92 130 L88 210 M108 130 L112 210"
      stroke="#F4F4F4"
      stroke-width="9"
      stroke-linecap="round"
    />
    <path d="M80 72 L120 72 L112 132 L88 132 Z" fill="#F4F4F4" />
    <line x1="100" y1="56" x2="100" y2="72" stroke="#F4F4F4" stroke-width="8" />
    <circle cx="100" cy="46" r="13" fill="#F4F4F4" />
    <circle cx="95" cy="45" r="1.6" fill="#161512" />
    <circle cx="105" cy="45" r="1.6" fill="#161512" />
    <path d="M96 52 q4 3 8 0" stroke="#161512" stroke-width="1.6" stroke-linecap="round" />
    <line
      x1="80"
      y1="74"
      x2="78"
      y2="106"
      stroke="#F4F4F4"
      stroke-width="9"
      stroke-linecap="round"
    />
    <line
      x1="120"
      y1="74"
      x2="122"
      y2="106"
      stroke="#F4F4F4"
      stroke-width="9"
      stroke-linecap="round"
    />
    <g class="cu-l">
      <line
        x1="78"
        y1="106"
        x2="78"
        y2="136"
        stroke="#F4F4F4"
        stroke-width="8"
        stroke-linecap="round"
      />
      <rect x="66" y="134" width="24" height="4" fill="#CFC8BA" />
      <rect x="62" y="128" width="7" height="16" rx="1.5" style="fill: var(--red)" />
      <rect x="87" y="128" width="7" height="16" rx="1.5" style="fill: var(--red)" />
    </g>
    <g class="cu-r">
      <line
        x1="122"
        y1="106"
        x2="122"
        y2="136"
        stroke="#F4F4F4"
        stroke-width="8"
        stroke-linecap="round"
      />
      <rect x="110" y="134" width="24" height="4" fill="#CFC8BA" />
      <rect x="106" y="128" width="7" height="16" rx="1.5" style="fill: var(--red)" />
      <rect x="131" y="128" width="7" height="16" rx="1.5" style="fill: var(--red)" />
    </g>
  </svg>
  <svg
    v-else-if="name === 'chart'"
    class="fig fig--chart"
    aria-hidden="true"
    width="170"
    height="140"
    viewBox="0 20 240 200"
    fill="none"
  >
    <g transform="translate(-30 0)">
      <path
        d="M92 130 L88 210 M108 130 L112 210"
        stroke="#F4F4F4"
        stroke-width="8"
        stroke-linecap="round"
      />
      <path d="M84 74 L116 74 L111 132 L89 132 Z" fill="#F4F4F4" />
      <line x1="100" y1="56" x2="100" y2="72" stroke="#F4F4F4" stroke-width="7" />
      <circle cx="100" cy="46" r="13" fill="#F4F4F4" />
      <circle cx="95" cy="45" r="1.6" fill="#0B0B0B" />
      <circle cx="105" cy="45" r="1.6" fill="#0B0B0B" />
      <path d="M95 51 q5 5 10 0" stroke="#0B0B0B" stroke-width="1.6" stroke-linecap="round" />
      <line
        x1="81"
        y1="76"
        x2="76"
        y2="130"
        stroke="#F4F4F4"
        stroke-width="7"
        stroke-linecap="round"
      />
      <g class="ch-arm">
        <line
          x1="120"
          y1="76"
          x2="124"
          y2="128"
          stroke="#F4F4F4"
          stroke-width="7"
          stroke-linecap="round"
        />
        <circle cx="124" cy="132" r="6" fill="#F4F4F4" />
      </g>
    </g>
    <path d="M140 60 V190 H230" stroke="#F4F4F4" stroke-width="2" stroke-linecap="round" />
    <rect class="ch-b1" x="152" y="150" width="16" height="40" style="fill: #5A5A5A" />
    <rect class="ch-b2" x="176" y="122" width="16" height="68" style="fill: var(--red-deep)" />
    <rect class="ch-b3" x="200" y="92" width="16" height="98" style="fill: var(--red)" />
    <path
      class="ch-ck"
      d="M194 66 l8 8 l18 -20"
      style="stroke: var(--red)"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <svg
    v-else-if="name === 'creator'"
    class="fig fig--creator"
    aria-hidden="true"
    width="230"
    height="165"
    viewBox="0 0 280 200"
    fill="none"
  >
    <path
      d="M50 192 L62 124 M74 192 L62 124 M62 192 V124"
      stroke="#F4F4F4"
      stroke-width="3"
      stroke-linecap="round"
    />
    <rect
      x="44"
      y="72"
      width="36"
      height="54"
      rx="6"
      fill="#1A1A1A"
      stroke="#F4F4F4"
      stroke-width="3"
    />
    <circle cx="62" cy="99" r="7" stroke="#F4F4F4" stroke-width="2.5" />
    <circle class="rec" cx="72" cy="81" r="3.5" fill="var(--red)" />
    <g transform="translate(112 10) scale(0.84)">
      <path
        d="M92 130 L88 210 M108 130 L112 210"
        stroke="#F4F4F4"
        stroke-width="8"
        stroke-linecap="round"
      />
      <path d="M83 73 L117 73 L111 132 L89 132 Z" fill="#F4F4F4" />
      <line x1="100" y1="56" x2="100" y2="72" stroke="#F4F4F4" stroke-width="7" />
      <circle cx="100" cy="46" r="13" fill="#F4F4F4" />
      <circle cx="95" cy="44" r="1.6" fill="#1A1A1A" />
      <circle cx="105" cy="44" r="1.6" fill="#1A1A1A" />
      <ellipse class="tk-m" cx="100" cy="53" rx="3" ry="2.5" fill="#1A1A1A" />
      <line
        x1="81"
        y1="76"
        x2="76"
        y2="130"
        stroke="#F4F4F4"
        stroke-width="7"
        stroke-linecap="round"
      />
      <line
        x1="120"
        y1="76"
        x2="124"
        y2="104"
        stroke="#F4F4F4"
        stroke-width="7"
        stroke-linecap="round"
      />
      <g class="tk-f">
        <line
          x1="124"
          y1="104"
          x2="124"
          y2="132"
          stroke="#F4F4F4"
          stroke-width="7"
          stroke-linecap="round"
        />
      </g>
    </g>
    <rect x="196" y="10" width="72" height="36" rx="10" stroke="#F4F4F4" stroke-width="2" />
    <path
      d="M210 46 L204 58 L220 46"
      fill="#1A1A1A"
      stroke="#F4F4F4"
      stroke-width="2"
      stroke-linejoin="round"
    />
    <circle class="dt1" cx="216" cy="28" r="4" fill="#F4F4F4" />
    <circle class="dt2" cx="232" cy="28" r="4" fill="#F4F4F4" />
    <circle class="dt3" cx="248" cy="28" r="4" fill="#F4F4F4" />
  </svg>
  <svg
    v-else-if="name === 'flex'"
    class="fig fig--flex"
    aria-hidden="true"
    width="150"
    height="172"
    viewBox="0 0 200 230"
    fill="none"
  >
    <line
      x1="50"
      y1="212"
      x2="150"
      y2="212"
      stroke="#F4F4F4"
      stroke-opacity="0.3"
      stroke-width="2"
    />
    <path
      d="M92 130 L88 210 M108 130 L112 210"
      stroke="#0B0B0B"
      stroke-width="12"
      stroke-linecap="round"
    />
    <path d="M86 60 Q100 52 114 60 L116 72 L84 72 Z" fill="#0B0B0B" />
    <path d="M78 72 L122 72 L114 134 L86 134 Z" fill="#F4F4F4" />
    <text
      x="100"
      y="108"
      text-anchor="middle"
      font-family="Fraunces, serif"
      font-weight="800"
      font-size="16"
      fill="#0B0B0B"
    >
      DT
    </text>
    <circle cx="100" cy="44" r="13" fill="#F4F4F4" />
    <circle cx="95" cy="43" r="1.6" fill="#0B0B0B" />
    <circle cx="105" cy="43" r="1.6" fill="#0B0B0B" />
    <path d="M95 49 q5 5 10 0" stroke="#0B0B0B" stroke-width="1.6" stroke-linecap="round" />
    <g class="fx-ul">
      <line
        x1="80"
        y1="74"
        x2="80"
        y2="104"
        stroke="#F4F4F4"
        stroke-width="11"
        stroke-linecap="round"
      />
      <g class="fx-fl">
        <line
          x1="80"
          y1="104"
          x2="80"
          y2="130"
          stroke="#F4F4F4"
          stroke-width="10"
          stroke-linecap="round"
        />
        <circle cx="80" cy="134" r="5.5" fill="#0B0B0B" />
      </g>
    </g>
    <g class="fx-ur">
      <line
        x1="120"
        y1="74"
        x2="120"
        y2="104"
        stroke="#F4F4F4"
        stroke-width="11"
        stroke-linecap="round"
      />
      <g class="fx-fr">
        <line
          x1="120"
          y1="104"
          x2="120"
          y2="130"
          stroke="#F4F4F4"
          stroke-width="10"
          stroke-linecap="round"
        />
        <circle cx="120" cy="134" r="5.5" fill="#0B0B0B" />
      </g>
    </g>
    <g class="fx-sp" style="stroke: #FFFFFF" stroke-width="2.5" stroke-linecap="round">
      <path d="M36 50 l-8 -8 M30 70 h-10 M164 50 l8 -8 M170 70 h10" />
    </g>
  </svg>
  <svg
    v-else-if="name === 'walk'"
    class="fig fig--walk"
    aria-hidden="true"
    viewBox="0 20 600 170"
    fill="none"
  >
    <line
      class="mg"
      x1="0"
      y1="182"
      x2="600"
      y2="182"
      stroke="#4A463E"
      stroke-width="2"
      stroke-dasharray="14 10"
    />
    <g transform="translate(90 0)">
      <g class="wk-bob">
        <g class="wk-l2">
          <line
            x1="0"
            y1="120"
            x2="0"
            y2="180"
            stroke="#B9B2A3"
            stroke-width="9"
            stroke-linecap="round"
          />
        </g>
        <path
          d="M-62 118 Q-30 104 -6 100 Q8 72 24 58 L50 52 Q62 54 58 66 L44 72 Q36 74 32 82 Q30 102 22 118 Q2 132 -20 126 Q-42 124 -62 118 Z"
          fill="#F4F4F4"
        />
        <line
          x1="30"
          y1="92"
          x2="38"
          y2="100"
          stroke="#F4F4F4"
          stroke-width="4"
          stroke-linecap="round"
        />
        <circle cx="45" cy="59" r="2" fill="#0B0B0B" />
        <g class="wk-l1">
          <line
            x1="0"
            y1="120"
            x2="0"
            y2="180"
            stroke="#F4F4F4"
            stroke-width="9"
            stroke-linecap="round"
          />
        </g>
      </g>
    </g>
    <g transform="translate(240 0)">
      <g class="wk-bob">
        <g class="wk-l2">
          <line
            x1="0"
            y1="120"
            x2="0"
            y2="180"
            stroke="#B9B2A3"
            stroke-width="5"
            stroke-linecap="round"
          />
        </g>
        <g class="wk-a2">
          <line
            x1="2"
            y1="70"
            x2="2"
            y2="112"
            stroke="#B9B2A3"
            stroke-width="4"
            stroke-linecap="round"
          />
        </g>
        <line
          x1="0"
          y1="120"
          x2="2"
          y2="66"
          stroke="#F4F4F4"
          stroke-width="8"
          stroke-linecap="round"
        />
        <circle cx="4" cy="50" r="12" fill="#F4F4F4" />
        <circle cx="10" cy="48" r="1.6" fill="#0B0B0B" />
        <g class="wk-l1">
          <line
            x1="0"
            y1="120"
            x2="0"
            y2="180"
            stroke="#F4F4F4"
            stroke-width="5"
            stroke-linecap="round"
          />
        </g>
        <g class="wk-a1">
          <line
            x1="2"
            y1="70"
            x2="2"
            y2="112"
            stroke="#F4F4F4"
            stroke-width="4"
            stroke-linecap="round"
          />
        </g>
      </g>
    </g>
    <g transform="translate(380 0)">
      <g class="wk-bob">
        <g class="wk-l2">
          <line
            x1="0"
            y1="120"
            x2="0"
            y2="180"
            stroke="#B9B2A3"
            stroke-width="8"
            stroke-linecap="round"
          />
        </g>
        <g class="wk-a2">
          <line
            x1="2"
            y1="70"
            x2="2"
            y2="112"
            stroke="#B9B2A3"
            stroke-width="7"
            stroke-linecap="round"
          />
        </g>
        <line
          x1="0"
          y1="120"
          x2="2"
          y2="66"
          stroke="#F4F4F4"
          stroke-width="13"
          stroke-linecap="round"
        />
        <circle cx="4" cy="50" r="12" fill="#F4F4F4" />
        <circle cx="10" cy="48" r="1.6" fill="#0B0B0B" />
        <g class="wk-l1">
          <line
            x1="0"
            y1="120"
            x2="0"
            y2="180"
            stroke="#F4F4F4"
            stroke-width="8"
            stroke-linecap="round"
          />
        </g>
        <g class="wk-a1">
          <line
            x1="2"
            y1="70"
            x2="2"
            y2="112"
            stroke="#F4F4F4"
            stroke-width="7"
            stroke-linecap="round"
          />
        </g>
      </g>
    </g>
    <g transform="translate(520 0)">
      <g class="wk-bob">
        <circle cx="-2" cy="64" r="26" style="fill: var(--red)" />
        <circle cx="-2" cy="64" r="6" fill="#0B0B0B" />
        <g class="wk-l2">
          <line
            x1="0"
            y1="120"
            x2="0"
            y2="180"
            stroke="#B9B2A3"
            stroke-width="12"
            stroke-linecap="round"
          />
        </g>
        <line
          x1="0"
          y1="120"
          x2="2"
          y2="70"
          stroke="#F4F4F4"
          stroke-width="20"
          stroke-linecap="round"
        />
        <ellipse cx="9" cy="84" rx="9" ry="13" fill="#F4F4F4" />
        <circle cx="4" cy="48" r="12" fill="#F4F4F4" />
        <circle cx="10" cy="46" r="1.6" fill="#0B0B0B" />
        <path d="M9 53 q3 2 6 0" stroke="#0B0B0B" stroke-width="1.4" stroke-linecap="round" />
        <g class="wk-l1">
          <line
            x1="0"
            y1="120"
            x2="0"
            y2="180"
            stroke="#F4F4F4"
            stroke-width="12"
            stroke-linecap="round"
          />
        </g>
        <path
          d="M4 72 L18 64 L4 56"
          stroke="#F4F4F4"
          stroke-width="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
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
.fig--walk {
  width: 100%;
  max-width: 640px;
  height: auto;
}
.pu-body {
  transform-origin: 40px 101px;
  animation: pub 1.8s ease-in-out infinite;
}
@keyframes pub {
  0%,
  15%,
  100% {
    transform: rotate(0);
  }
  50%,
  62% {
    transform: rotate(12deg);
  }
}
.pu-arm {
  transform-origin: 162px 104px;
  animation: pua 1.8s ease-in-out infinite;
}
@keyframes pua {
  0%,
  15%,
  100% {
    transform: scaleY(1);
  }
  50%,
  62% {
    transform: scaleY(0.39);
  }
}
.cu-l {
  transform-origin: 78px 106px;
  animation: cul 2s ease-in-out infinite;
}
@keyframes cul {
  0%,
  10%,
  100% {
    transform: rotate(0);
  }
  45%,
  60% {
    transform: rotate(-140deg);
  }
}
.cu-r {
  transform-origin: 122px 106px;
  animation: cur 2s ease-in-out -1s infinite;
}
@keyframes cur {
  0%,
  10%,
  100% {
    transform: rotate(0);
  }
  45%,
  60% {
    transform: rotate(140deg);
  }
}
.ch-arm {
  transform-origin: 120px 74px;
  animation: cha 4.5s ease-in-out infinite;
}
@keyframes cha {
  0%,
  46% {
    transform: rotate(0);
  }
  56%,
  86% {
    transform: rotate(-150deg);
  }
  95%,
  100% {
    transform: rotate(0);
  }
}
.ch-b1 {
  transform-origin: 160px 190px;
  animation: chb1 4.5s ease-out infinite;
}
.ch-b2 {
  transform-origin: 184px 190px;
  animation: chb2 4.5s ease-out infinite;
}
.ch-b3 {
  transform-origin: 208px 190px;
  animation: chb3 4.5s ease-out infinite;
}
@keyframes chb1 {
  0%,
  4% {
    transform: scaleY(0.08);
  }
  16%,
  88% {
    transform: scaleY(1);
  }
  96%,
  100% {
    transform: scaleY(0.08);
  }
}
@keyframes chb2 {
  0%,
  14% {
    transform: scaleY(0.08);
  }
  27%,
  88% {
    transform: scaleY(1);
  }
  96%,
  100% {
    transform: scaleY(0.08);
  }
}
@keyframes chb3 {
  0%,
  25% {
    transform: scaleY(0.08);
  }
  40%,
  88% {
    transform: scaleY(1);
  }
  96%,
  100% {
    transform: scaleY(0.08);
  }
}
.ch-ck {
  stroke-dasharray: 40;
  stroke-dashoffset: 40;
  animation: chk 4.5s ease-out infinite;
}
@keyframes chk {
  0%,
  42% {
    stroke-dashoffset: 40;
  }
  52%,
  86% {
    stroke-dashoffset: 0;
  }
  94%,
  100% {
    stroke-dashoffset: 40;
  }
}
.rec {
  animation: rec 1.2s steps(1) infinite;
}
@keyframes rec {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.15;
  }
}
.tk-f {
  transform-origin: 124px 104px;
  animation: tkf 1.4s ease-in-out infinite;
}
@keyframes tkf {
  0%,
  100% {
    transform: rotate(-125deg);
  }
  50% {
    transform: rotate(-70deg);
  }
}
.tk-m {
  transform-origin: 100px 53px;
  animation: tkm 0.32s ease-in-out infinite alternate;
}
@keyframes tkm {
  from {
    transform: scaleY(0.25);
  }
  to {
    transform: scaleY(1);
  }
}
.dt1,
.dt2,
.dt3 {
  animation: dot 1.6s ease-in-out infinite;
}
.dt2 {
  animation-delay: 0.2s;
}
.dt3 {
  animation-delay: 0.4s;
}
@keyframes dot {
  0%,
  20% {
    opacity: 0.15;
  }
  40%,
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0.15;
  }
}
.fx-ul {
  transform-origin: 80px 74px;
  animation: fxul 3.2s ease-in-out infinite;
}
.fx-fl {
  transform-origin: 80px 104px;
  animation: fxul 3.2s ease-in-out infinite;
}
.fx-ur {
  transform-origin: 120px 74px;
  animation: fxur 3.2s ease-in-out infinite;
}
.fx-fr {
  transform-origin: 120px 104px;
  animation: fxur 3.2s ease-in-out infinite;
}
@keyframes fxul {
  0%,
  18% {
    transform: rotate(0);
  }
  34%,
  70% {
    transform: rotate(90deg);
  }
  86%,
  100% {
    transform: rotate(0);
  }
}
@keyframes fxur {
  0%,
  18% {
    transform: rotate(0);
  }
  34%,
  70% {
    transform: rotate(-90deg);
  }
  86%,
  100% {
    transform: rotate(0);
  }
}
.fx-sp {
  opacity: 0;
  animation: fxsp 3.2s ease-out infinite;
}
@keyframes fxsp {
  0%,
  34% {
    opacity: 0;
  }
  42%,
  66% {
    opacity: 1;
  }
  74%,
  100% {
    opacity: 0;
  }
}
.mg {
  animation: mg 1.1s linear infinite;
}
@keyframes mg {
  to {
    stroke-dashoffset: -48;
  }
}
.wk-bob {
  animation: wkb 0.55s ease-in-out infinite;
}
@keyframes wkb {
  0%,
  50%,
  100% {
    transform: translateY(0);
  }
  25%,
  75% {
    transform: translateY(-3px);
  }
}
.wk-l1,
.wk-l2,
.wk-a1,
.wk-a2 {
  transform-origin: 0 120px;
  animation: wkl 1.1s ease-in-out infinite;
}
.wk-a1,
.wk-a2 {
  transform-origin: 2px 70px;
}
.wk-l2,
.wk-a1 {
  animation-delay: -0.55s;
}
@keyframes wkl {
  0%,
  100% {
    transform: rotate(24deg);
  }
  50% {
    transform: rotate(-24deg);
  }
}
@media (prefers-reduced-motion: reduce) {
  .fig * {
    animation: none !important;
  }
}
</style>

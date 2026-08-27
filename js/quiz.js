const GROUP_INFO = {
  nt: {
    name: "NT 분석가형",
    page: "nt.html",
    desc: "당신은 원리를 파고들어야 직성이 풀리는 전략적 학습자입니다. 논리적으로 이해하고, 스스로 효율적인 계획을 세울 때 가장 큰 힘을 발휘해요.",
  },
  nf: {
    name: "NF 외교관형",
    page: "nf.html",
    desc: "당신은 의미와 공감으로 배움을 연결하는 학습자입니다. 왜 공부하는지 이해되고, 사람들과 함께할 때 몰입도가 크게 올라가요.",
  },
  sj: {
    name: "SJ 관리자형",
    page: "sj.html",
    desc: "당신은 계획과 성실함으로 꾸준히 나아가는 학습자입니다. 체계적인 일정과 반복 학습 속에서 가장 안정적으로 실력을 쌓아요.",
  },
  sp: {
    name: "SP 탐험가형",
    page: "sp.html",
    desc: "당신은 직접 부딪히며 감각적으로 배우는 학습자입니다. 실전 연습과 즉각적인 피드백 속에서 몸으로 익힐 때 가장 잘 배워요.",
  },
};

function calculateResult(form) {
  const scores = { nt: 0, nf: 0, sj: 0, sp: 0 };
  const formData = new FormData(form);

  for (let i = 1; i <= 10; i++) {
    const value = formData.get("q" + i);
    if (value && scores.hasOwnProperty(value)) {
      scores[value] += 1;
    }
  }

  let topGroup = "nt";
  let topScore = -1;
  ["nt", "nf", "sj", "sp"].forEach((key) => {
    if (scores[key] > topScore) {
      topScore = scores[key];
      topGroup = key;
    }
  });

  return { scores, topGroup };
}

function renderResult(scores, topGroup) {
  const info = GROUP_INFO[topGroup];
  document.getElementById("result-title").textContent = info.name;
  document.getElementById("result-desc").textContent = info.desc;

  const goBtn = document.getElementById("go-group-btn");
  goBtn.href = info.page;
  goBtn.textContent = info.name + " 공부법 보러가기";

  const scoreWrap = document.getElementById("result-scores");
  scoreWrap.innerHTML = "";
  ["nt", "nf", "sj", "sp"].forEach((key) => {
    const item = document.createElement("div");
    item.className = "score-item";
    item.innerHTML = "<strong>" + scores[key] + "</strong>" + GROUP_INFO[key].name.slice(0, 2);
    scoreWrap.appendChild(item);
  });

  const resultBox = document.getElementById("quiz-result");
  resultBox.classList.add("show");
  resultBox.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleShare(topGroup) {
  const info = GROUP_INFO[topGroup];
  const shareText = "나의 MBTI 공부 유형은 " + info.name + "! 너의 공부 유형도 확인해봐.";
  const shareUrl = window.location.href.split("?")[0];

  if (navigator.share) {
    navigator.share({ title: "MBTI 공부법 연구소", text: shareText, url: shareUrl }).catch(() => {});
    return;
  }

  const fallbackText = shareText + " " + shareUrl;
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(fallbackText)
      .then(() => alert("결과 링크가 클립보드에 복사되었어요. 친구에게 붙여넣기 해보세요!"))
      .catch(() => alert(fallbackText));
  } else {
    alert(fallbackText);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quiz-form");
  let lastTopGroup = "nt";

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const total = form.querySelectorAll("input:checked").length;
    if (total < 10) {
      alert("아직 답하지 않은 문항이 있어요. 10문항 모두 선택해주세요!");
      return;
    }

    const { scores, topGroup } = calculateResult(form);
    lastTopGroup = topGroup;
    renderResult(scores, topGroup);

    if (typeof gtag === "function") {
      gtag("event", "text_complete", { group: topGroup });
    }
  });

  document.getElementById("share-btn").addEventListener("click", () => {
    handleShare(lastTopGroup);
  });
});

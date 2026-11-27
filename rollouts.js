// Set src to a video path such as "media/trial-1.mp4" when a rollout is ready.
// Add or remove entries to change the gallery.
const rollouts = [
  { label: "Rollout 1", resultText: "Success", src: "media/rollout-01.mp4", poster: "media/rollout-01.jpg", outcome: "success" },
  { label: "Rollout 2", resultText: "Success", src: "media/rollout-02.mp4", poster: "media/rollout-02.jpg", outcome: "success" },
  { label: "Rollout 3", resultText: "Success", src: "media/rollout-03.mp4", poster: "media/rollout-03.jpg", outcome: "success" },
  { label: "Rollout 4", resultText: "Success", src: "media/rollout-04.mp4", poster: "media/rollout-04.jpg", outcome: "success" },
  { label: "Rollout 5", resultText: "Failure (drop)", src: "media/rollout-05.mp4", poster: "media/rollout-05.jpg", outcome: "failure" },
];

const additionalRollouts = [
  { label: "Rollout 6", src: "" },
  { label: "Rollout 7", src: "" },
  { label: "Rollout 8", src: "" },
  { label: "Rollout 9", src: "" },
  { label: "Rollout 10", src: "" },
  { label: "Rollout 11", src: "" },
  { label: "Rollout 12", src: "" },
  { label: "Rollout 13", src: "" },
  { label: "Rollout 14", src: "" },
  { label: "Rollout 15", src: "" },
  { label: "Rollout 16", src: "" },
  { label: "Rollout 17", src: "" },
];

const template = document.querySelector("#rollout-template");

function renderGallery(gallery, entries) {
  for (const { label, src, poster, outcome, resultText } of entries) {
    const card = template.content.cloneNode(true);
    const caption = card.querySelector("figcaption");
    caption.textContent = label;
    if (resultText) {
      const result = document.createElement("span");
      result.className = "result";
      result.textContent = resultText;
      caption.append(" ", result);
    }
    const frame = card.querySelector(".frame");
    if (src) {
      const video = document.createElement("video");
      video.muted = true;
      video.defaultMuted = true;
      video.autoplay = true;
      video.playsInline = true;
      video.controls = true;
      if (poster) video.poster = poster;
      video.setAttribute("aria-label", label);
      if (outcome) frame.dataset.outcome = outcome;

      let replayTimer;
      const clearResult = () => {
        clearTimeout(replayTimer);
        frame.classList.remove("finished");
      };
      video.addEventListener("play", clearResult);
      video.addEventListener("seeking", clearResult);
      video.addEventListener("ended", () => {
        frame.classList.add("finished");
        replayTimer = setTimeout(() => {
          if (video.ended) video.play().catch(() => {});
        }, 1500);
      });
      video.src = src;
      frame.append(video);
    }
    gallery.append(card);
  }
}

renderGallery(document.querySelector("#rollouts"), rollouts);
renderGallery(document.querySelector("#additional-rollouts"), additionalRollouts);

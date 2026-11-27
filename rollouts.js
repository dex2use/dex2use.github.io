// Set src to a video path such as "media/trial-1.mp4" when a rollout is ready.
// Add or remove entries to change the gallery. The first entry is featured.
const rollouts = [
  { label: "Rollout 1", src: "" },
  { label: "Rollout 2", src: "" },
  { label: "Rollout 3", src: "" },
  { label: "Rollout 4", src: "" },
  { label: "Rollout 5", src: "" },
];

const gallery = document.querySelector("#rollouts");
const template = document.querySelector("#rollout-template");

for (const { label, src } of rollouts) {
  const card = template.content.cloneNode(true);
  card.querySelector("figcaption").textContent = label;
  if (src) {
    const video = document.createElement("video");
    video.controls = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.setAttribute("aria-label", label);
    video.src = src;
    card.querySelector(".frame").append(video);
  }
  gallery.append(card);
}

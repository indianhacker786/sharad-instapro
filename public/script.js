document.getElementById("pasteBtn").addEventListener("click", async () => {
  const text = await navigator.clipboard.readText();
  document.getElementById("instaLink").value = text;
});

document.getElementById("fetchBtn").addEventListener("click", async () => {
  const url = document.getElementById("instaLink").value.trim();
  const result = document.getElementById("result");

  if (!url) return alert("कृपया लिंक पेस्ट करें");

  result.innerHTML = "⏳ Fetching...";

  const res = await fetch("/api/download", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reelUrl: url })
  });

  const data = await res.json();

  if (!data.success) {
    result.innerHTML = "❌ Download failed!";
    return;
  }

  const videoUrl = data.fileUrl;

  result.innerHTML = `
    <video width="100%" controls src="${videoUrl}"></video>
    <br>
    <a class="downloadBtn" href="${videoUrl}" download>💾 Save to Device</a>
  `;
});

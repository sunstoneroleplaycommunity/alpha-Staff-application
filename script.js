const WEBHOOK_URL = "https://discord.com/api/webhooks/1506075172132618271/k4tky9MYBLWnXac1mItzDiE6xPiuB81a9WJZAIdfgHbkT0OvllGKqMmNM0UUZQlLY2Ky";

const form = document.getElementById("staffApplication");
const statusText = document.getElementById("status");

function chunkText(text, maxLength = 3900) {
  const chunks = [];
  for (let i = 0; i < text.length; i += maxLength) {
    chunks.push(text.slice(i, i + maxLength));
  }
  return chunks;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  statusText.textContent = "Submitting application...";
  statusText.style.color = "#ffffff";

  const data = new FormData(form);
  const submittedAt = new Date().toLocaleString();

  let message = `**New Sunstone RolePlay™ Staff Application**\n`;
  message += `**Submitted:** ${submittedAt}\n\n`;

  for (const [key, value] of data.entries()) {
    message += `**${key}:**\n${value || "N/A"}\n\n`;
  }

  try {
    const chunks = chunkText(message);

    for (const chunk of chunks) {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: "Sunstone Staff Applications",
          avatar_url: "",
          content: chunk
        })
      });

      if (!response.ok) {
        throw new Error("Webhook failed");
      }
    }

    statusText.textContent = "Application submitted successfully.";
    statusText.style.color = "#5dff8b";
    form.reset();
  } catch (error) {
    statusText.textContent = "Submission failed. Please contact Sunstone RolePlay staff.";
    statusText.style.color = "#ff5d5d";
  }
});

const WEBHOOK_URL = "https://discord.com/api/webhooks/1504955707781419149/zYsEu9DHuPglcPVnJfn1lExDW-09dHXNrdXXJtSaGxvznV4uAo-pyvn9kPcIe6EWVG8K";

const form = document.getElementById("staffApplication");
const statusText = document.getElementById("formStatus");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  const payload = {
    username: "Sunstone Applications",
    embeds: [
      {
        title: "New Sunstone RolePlay Staff Application",
        color: 15010082,
        fields: [
          { name: "Discord Username", value: data.discord || "Not provided", inline: true },
          { name: "Platform", value: data.platform || "Not provided", inline: true },
          { name: "Age", value: data.age || "Not provided", inline: true },
          { name: "Availability", value: data.availability || "Not provided", inline: false },
          { name: "Previous Staff Experience", value: data.experience || "Not provided", inline: false },
          { name: "Why should Sunstone choose you?", value: data.why || "Not provided", inline: false }
        ],
        footer: { text: "Sunstone RolePlay™ Application Website" },
        timestamp: new Date().toISOString()
      }
    ]
  };

  statusText.textContent = "Sending application...";

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error("Discord webhook failed.");

    statusText.textContent = "Application sent successfully.";
    form.reset();
  } catch (error) {
    statusText.textContent = "Unable to send. Please use the embedded Google Form below.";
  }
});

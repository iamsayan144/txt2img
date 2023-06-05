const form = document.getElementById("form");
const textInput = document.getElementById("text-input");
const image = document.getElementById("image");
const downloadLink = document.getElementById("download-link");
const prompts = document.querySelectorAll(".prompt");

// Add event listeners to example prompts
prompts.forEach(prompt => {
	prompt.addEventListener("click", () => {
		textInput.value = prompt.dataset.prompt;
		form.dispatchEvent(new Event("submit"));
	});
});

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const text = textInput.value;
    const imageUrl = await generateImageFromText(text);
    image.src = imageUrl;
    downloadLink.style.display = "block";
    downloadLink.href = imageUrl;
});

async function generateImageFromText(text) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/SG161222/Realistic_Vision_V1.4",
        {
            headers: { Authorization: "Bearer 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" },
            method: "POST",
            body: JSON.stringify({ inputs: text }),
        }
    );
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
}
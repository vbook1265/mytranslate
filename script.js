async function translateText() {
  const fromLang = document.getElementById("fromLang").value;
  const toLang = document.getElementById("toLang").value;
  const inputText = document.getElementById("inputText").value.trim();

  if (!inputText) {
    document.getElementById("outputText").value = "";
    return;
  }

  if (fromLang === toLang) {
    document.getElementById("outputText").value = inputText;
    return;
  }

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(inputText)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network error: " + response.status);
    const data = await response.json();
    const translatedText = data[0].map(item => item[0]).join('');
    document.getElementById("outputText").value = translatedText;
  } catch (error) {
    document.getElementById("outputText").value = "Error: " + error.message;
  }
}

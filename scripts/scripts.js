/* Constants */
const getInputContent = document.getElementById("input-area");
const encryptButton = document.getElementById("code-button");
const decryptButton = document.getElementById("decode-button");
const copyButton = document.getElementById("copy-button");
const outputContainer = document.getElementById("output-area");
const notFoundContainer = outputContainer.innerHTML;

/*
It is not arranged in alphabetical order due to avoid substitution in unnecessary
sequence: when a -> ai -> aimes.
*/
const replacementRules = {
  e: "enter",
  i: "imes",
  a: "ai",
  o: "ober",
  u: "ufat",
};

/* Button Events */
encryptButton.addEventListener("click", function () {
  if (getInputContent.value) {
    //A empty string "" become false
    updateOutput(getInputContent.value, encrypt);
  } else {
    getDefaultOutput();
  }
});

decryptButton.addEventListener("click", function () {
  if (getInputContent.value) {
    //A empty string "" become false
    updateOutput(getInputContent.value, decrypt);
  } else {
    getDefaultOutput();
  }
});

copyButton.addEventListener("click", function () {
  copyOutput(outputContainer.innerHTML);
});

/* Functions */
function replaceText(string, pattern, modifier, replacement) {
  let regex = new RegExp(pattern, modifier);
  return string.replace(regex, replacement);
}

function encrypt(textString, dictionary = replacementRules) {
  for (let key in dictionary) {
    textString = replaceText(textString, key, "g", dictionary[key]);
  }

  return textString;
}

function decrypt(textString, dictionary = replacementRules) {
  for (let key in dictionary) {
    textString = replaceText(textString, dictionary[key], "g", key);
  }

  return textString;
}

function copyOutput(textString) {
  navigator.clipboard.writeText(textString);
}

function showElement(element) {
  element.classList.remove("hidden");
}

function hideElement(element) {
  element.classList.add("hidden");
}

function updateOutput(textString, func) {
  /*outputContainer.setAttribute("class", "output-container result"); //adds the additional class*/
  outputContainer.innerHTML = func(textString);
  outputContainer.classList.add("result");
  showElement(copyButton);
}

function getDefaultOutput() {
  /*outputContainer.setAttribute("class", output-container); //removes the additional class*/
  outputContainer.innerHTML = notFoundContainer;
  outputContainer.classList.remove("result");
  hideElement(copyButton);
}

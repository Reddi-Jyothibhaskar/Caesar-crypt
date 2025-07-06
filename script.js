// Shared variables
let originalContent = "";

document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("fileInput");
  const fileStatus = document.getElementById("fileStatus");

  if (fileInput) {
    fileInput.addEventListener("change", function () {
      const file = this.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          originalContent = e.target.result;
          document.getElementById("originalText").textContent = originalContent;

          if (window.location.pathname.includes("encrypt")) {
            fileStatus.textContent = "Plain text file uploaded.";
          } else if (window.location.pathname.includes("decrypt")) {
            fileStatus.textContent = "Scrambled text file uploaded.";
          }
        };
        reader.readAsText(file);
      }
    });
  }
});

// Caesar Cipher logic
function caesarCipher(text, direction, shift) {
  const a = 'a'.charCodeAt(0);
  const A = 'A'.charCodeAt(0);
  shift = shift % 26;
  if (direction === "left") shift = 26 - shift;

  return text.split('').map(char => {
    if (char >= 'a' && char <= 'z') {
      return String.fromCharCode(((char.charCodeAt(0) - a + shift) % 26) + a);
    } else if (char >= 'A' && char <= 'Z') {
      return String.fromCharCode(((char.charCodeAt(0) - A + shift) % 26) + A);
    } else {
      return char;
    }
  }).join('');
}

function getKeyFormat(direction, shift) {
  const reverseDir = direction === "left" ? "right" : "left";
  return `/${reverseDir}${shift}/`;
}

// Encryption handler
function handleEncrypt() {
  const direction = document.getElementById("directionInput").value.trim().toLowerCase();
  const shift = parseInt(document.getElementById("shiftInput").value.trim());
  const statusBox = document.getElementById("statusBox");

  if (!originalContent || !["left", "right"].includes(direction) || isNaN(shift)) {
    statusBox.textContent = "Please upload file and enter valid key inputs.";
    return;
  }

  const encrypted = caesarCipher(originalContent, direction, shift);
  document.getElementById("processedText").textContent = encrypted;

  const key = getKeyFormat(direction, shift);
  statusBox.textContent = `Encryption completed. Decryption key: ${key}`;
}

// Decryption handler
function handleDecrypt() {
  const direction = document.getElementById("directionInput").value.trim().toLowerCase();
  const shift = parseInt(document.getElementById("shiftInput").value.trim());
  const statusBox = document.getElementById("statusBox");

  if (!originalContent || !["left", "right"].includes(direction) || isNaN(shift)) {
    statusBox.textContent = "Please upload file and enter valid key inputs.";
    return;
  }

  const decrypted = caesarCipher(originalContent, direction, shift);
  document.getElementById("processedText").textContent = decrypted;

  const key = getKeyFormat(direction, shift);
  statusBox.textContent = `Decryption completed. Encryption key: ${key}`;
}

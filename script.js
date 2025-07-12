let currentQRCode=null,currentQRCanvas=null;document.addEventListener("DOMContentLoaded",(function(){const e=document.getElementById("size-input");e.value="200",e.classList.remove("empty"),document.getElementById("text-input").value="lweaxo",generateQRCode(),document.getElementById("text-input").addEventListener("keypress",(function(e){"Enter"===e.key&&generateQRCode()}))}));

function generateQRCode() {
  const qrCodeDiv = document.getElementById("qr-code");
  const text = document.getElementById("text-input").value.trim();
  const sizeInput = document.getElementById("size-input");
  const errorMessage = document.getElementById("error-message");
  
  errorMessage.textContent = "";
  qrCodeDiv.innerHTML = "";
  
  if (!text) {
    errorMessage.textContent = "Lütfen bir metin veya URL girin.";
    return;
  }
  
  let size = parseInt(sizeInput.value);
  if (isNaN(size)) {
    size = 200;
    sizeInput.value = "";
    sizeInput.classList.add('empty');
  } else {
    sizeInput.classList.remove('empty');
    size = Math.max(50, Math.min(1000, size));
    sizeInput.value = size;
  }

  try {
    qrCodeDiv.innerHTML = "";
    new QRCode(qrCodeDiv, {
      text: text,
      width: size,
      height: size,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M
    });
    
    currentQRCanvas = qrCodeDiv.querySelector('canvas');
    currentQRCode = currentQRCanvas.toDataURL('image/png');
  } catch (err) {
    errorMessage.textContent = "QR kodu oluşturulurken bir hata oluştu.";
    console.error(err);
  }
}
// github.com/LWEAXO
function downloadQR(format) {
  if (!currentQRCanvas) {
    document.getElementById("error-message").textContent = "Önce bir QR kodu oluşturun.";
    return;
  }
  
  const text = document.getElementById("text-input").value.trim() || "qr-code";
  const filename = `${text.replace(/[^a-z0-9]/gi, '_').toLowerCase()}`;
  
  let mimeType, extension;
  switch(format) {
    case 'jpg':
    case 'jpeg':
      mimeType = 'image/jpeg';
      extension = 'jpg';
      break;
    case 'png':
    default:
      mimeType = 'image/png';
      extension = 'png';
  }
  
  const link = document.createElement('a');
  link.href = currentQRCanvas.toDataURL(mimeType);
  link.download = `${filename}.${extension}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.getElementById("size-input").addEventListener('input', function(e) {
  this.value = this.value.replace(/[^0-9]/g, '');
  if (this.value === '') {
    this.classList.add('empty');
  } else {
    this.classList.remove('empty');
  }
});
var alertBtn = document.getElementById("alertBtn");
var confirmBtn = document.getElementById("confirmBtn");
var promptBtn = document.getElementById("promptBtn");

var alertDialog = document.getElementById("alertDialog");
var confirmDialog = document.getElementById("confirmDialog");
var promptDialog = document.getElementById("promptDialog");

var alertOkay = document.getElementById("alertOkay");
var confirmOkay = document.getElementById("confirmOkay");
var confirmCancel = document.getElementById("confirmCancel");
var promptOkay = document.getElementById("promptOkay");
var promptCancel = document.getElementById("promptCancel");

var promptInput = document.getElementById("promptInput");

alertBtn.addEventListener("click", () => {
  alertDialog.showModal();
});

confirmBtn.addEventListener("click", () => {
  confirmDialog.showModal();
});

promptBtn.addEventListener("click", () => {
  promptDialog.showModal();
});

confirmCancel.addEventListener("click", () => {
  document.getElementById("confirmTxt").innerHTML =
    "The value returned by the confirm method is : False";
  confirmDialog.close();
});

confirmOkay.addEventListener("click", () => {
  document.getElementById("confirmTxt").innerHTML =
    "The value returned by the confirm method is : True";
  confirmDialog.close();
});

promptCancel.addEventListener("click", () => {
  document.getElementById("promptTxt").innerHTML = "User didn’t enter anything";
  promptDialog.close();
});

promptOkay.addEventListener("click", () => {
  document.getElementById("promptTxt").innerHTML = DOMPurify.sanitize(
    `Your sign is ${promptInput.value}.`
  );
  promptInput.value = "";
  promptDialog.close();
});

import * as responseMethods from "./responseMethods.js";

function responseReady() {
  if (this.readyState === 4 && this.status === 200) {
    let json = JSON.parse(this.responseText);
    // set output as the response from the server
    responseMethods.outputResponse({ ...json["args"], ...json["json"] });
  } else {
    responseMethods.outputError(this.responseText);
  }
}

export function postMethod(requestMsg) {
  responseMethods.outputProcessing("POST Request");
  // send the article object to the server
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "https://httpbin.org/post", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = responseReady;
  xhr.send(JSON.stringify(requestMsg));
}

export function getMethod(args) {
  responseMethods.outputProcessing("GET Request");
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://httpbin.org/get" + args, true);
  xhr.onreadystatechange = responseReady;
  xhr.send();
}

export function putMethod(args, requestMsg) {
  responseMethods.outputProcessing("PUT Request");
  let xhr = new XMLHttpRequest();
  xhr.open("PUT", "https://httpbin.org/put" + args, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = responseReady;
  xhr.send(JSON.stringify(requestMsg));
}
export function deleteMethod(args) {
  responseMethods.outputProcessing("DELETE Request");
  let xhr = new XMLHttpRequest();
  xhr.open("DELETE", "https://httpbin.org/delete" + args, true);
  xhr.onreadystatechange = responseReady;
  xhr.send();
}

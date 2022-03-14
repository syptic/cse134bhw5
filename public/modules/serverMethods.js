export function postMethod(url, requestMsg, response) {
  // send the article object to the server
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = response;
  xhr.send(JSON.stringify(requestMsg));
}

export function getMethod(url, args, response) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url + args, true);
  xhr.onreadystatechange = response;
  xhr.send();
}

export function putMethod(url, args, requestMsg, response) {
  let xhr = new XMLHttpRequest();
  xhr.open("PUT", url + args, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = response;
  xhr.send(JSON.stringify(requestMsg));
}
export function deleteMethod(url, args, response) {
  let xhr = new XMLHttpRequest();
  xhr.open("DELETE", url + args, true);
  xhr.onreadystatechange = response;
  xhr.send();
}

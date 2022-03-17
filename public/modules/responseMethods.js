const responseDiv = document.getElementById("response");
export function outputResponse(response, json) {
  // output the response
  let responseText = "<table border=1>";
  responseText += "<tr><th>Key</th><th>Value</th></tr>";
  for (let key in response) {
    responseText +=
      "<tr><td>" + key + "</td><td>" + response[key] + "</td></tr>";
  }
  responseText += "</table>";
  responseText +=
    "<br> <details> <summary>Click to view complete response</summary><pre><code>" +
    JSON.stringify(json, null, 2) +
    "</code></pre></details>";
  responseDiv.innerHTML = DOMPurify.sanitize(responseText);
}

export function outputError(error) {
  let errorText =
    "<details><summary>Oops! Seems like something went wrong!</summary>";
  errorText += "<p>" + error + "</p></details>";
  responseDiv.innerHTML = DOMPurify.sanitize(errorText);
}
export function outputProcessing(process) {
  responseDiv.innerHTML = `<p>Processing...${process}</p>`;
}

var callback = function() {
  // Handler when the DOM is fully loaded
  console.log("IMPACT WRAPPER LOGIC HERE", document.location);
  var query = getQueryParams(document.location.search);
  console.log(query.email);
  document.getElementById('student_name').innerHTML = '<h2>' + query.email + '</h2>'
};
function getQueryParams(qs) {
  qs = qs.split("+").join(" ");
  var params = {},
    tokens,
    re = /[?&]?([^=]+)=([^&]*)/g;
  while ((tokens = re.exec(qs))) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }

  return params;
}

if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  callback();
} else {
  document.addEventListener("DOMContentLoaded", callback);
}

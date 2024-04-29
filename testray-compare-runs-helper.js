// ==UserScript==
// @name        Compare Testray runs 2
// @namespace   Violentmonkey Scripts
// @match       https://testray.liferay.com/home/-/testray/builds*
// @grant       none
// @version     1.0
// @author      -
// @description 18/4/2024, 17:39:30
// ==/UserScript==


function getRunIdFromFullHtml(fullHtml) {
  firstOccurrenceIndex = fullHtml.indexOf("testrayRunId=")
  //console.log(firstOccurrenceIndex)
  endOfFirstOccurrenceIndex = fullHtml.indexOf('"', firstOccurrenceIndex)
  //console.log(endOfFirstOccurrenceIndex)
  parameterAndValue = fullHtml.substring(firstOccurrenceIndex, endOfFirstOccurrenceIndex)

  //console.log(parameterAndValue)
  runId = parameterAndValue.substring(parameterAndValue.indexOf("=") + 1)

  //console.log(runId)
  return runId

}

function updatedPatternInDiffLink(element, pattern, replacement) {
  //console.log(element)
  //console.log(pattern)
  //console.log(replacement)
  text = element.href
  element.href = text.replace(pattern, replacement)
  //console.log(element.href)
}

function xhrSuccess() {
  runId = getRunIdFromFullHtml(this.responseText)
  args = this.arguments
  args.push(runId)
  this.callback.apply(this, this.arguments);
}

function updateDiffLink(buildId, callback, ...args) {
  console.log("Retrieving runs for buildId " + buildId)
  buildRunListURL = "/home/-/testray/runs?tab=results&testrayBuildId=" + buildId
  //console.log(buildRunListURL)

  const xhr = new XMLHttpRequest();
  xhr.callback = callback;
  //console.log(args)
  xhr.arguments = args;
  xhr.onload = xhrSuccess;
  xhr.open("GET", buildRunListURL, true);

  xhr.onerror = (e) => {
    console.error(xhr.statusText);
  };

  xhr.send(null);

}

buildAURL = new URL(document.querySelector("#buildsSearchContainerSearchContainer > table > tbody > tr:nth-child(1) > td.table-cell.table-column-main > a").href)
buildAId = buildAURL.searchParams.get("testrayBuildId")

buildBURL = new URL(document.querySelector("#buildsSearchContainerSearchContainer > table > tbody > tr:nth-child(2) > td.table-cell.table-column-main > a").href)
buildBId = buildBURL.searchParams.get("testrayBuildId")

selector = "#buildsSearchContainerSearchContainer > table > tbody > tr:nth-child(1) > td.table-cell.first"
a_diff = document.querySelector(selector).appendChild(document.createElement("a"))
a_diff.href = "https://testray.liferay.com/home/-/testray/runs/compare?compare=true&view=details&statusA=3&statusB=2&testrayRunIdB=BBB&testrayRunIdA=AAA"
a_diff.text = "Failures diff"

updateDiffLink(buildAId, updatedPatternInDiffLink, a_diff, "AAA")

updateDiffLink(buildBId, updatedPatternInDiffLink, a_diff, "BBB")


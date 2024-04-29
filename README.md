# testray-compare-runs-helper

This is a simple violentmonkey script that adds a link in Testray that points directly to the comparison between the latest run of the latest build and the latest run of the former build, showing the tests that failed today, but were working yesterday.

That comparison can be done using Testray tools, but it requires too many clicks. With the script, there is no need for that.

To use it:
1. install violentmonkey extension in your browser
2. add a new script, by using the url of the raw content of testray-compare-runs-helper.js (At the time of writing:   https://raw.githubusercontent.com/almonwork/testray-compare-runs-helper/main/testray-compare-runs-helper.js)

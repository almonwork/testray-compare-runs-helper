# testray-compare-runs-helper

This is a simple violentmonkey script that adds a link in Testray, that points directly to the comparison between the latest runs of the 2 latest builds. The comparison shows the tests that failed today, but were working yesterday.

That comparison can be done using Testray tools, but it requires too many clicks. With the script, there is no need for that.

To use it:
1. install violentmonkey extension in your browser
2. add a new script, by using the url of the raw content of testray-compare-runs-helper.js (At the time of writing:   https://raw.githubusercontent.com/almonwork/testray-compare-runs-helper/main/testray-compare-runs-helper.js)
3. Visit, for example, https://testray.liferay.com/home/-/testray/builds?testrayRoutineId=1481966587. You will see a 'Failures Diff' link the first row of the list of builds.

## Simple survey viz

[Online example](http://americanredcross.github.io/SimpleSurveyViz/)

####Instructions:
- Download the project repository to your computer as a ZIP, and unzip the folder
- Open your survey data in Excel (or your favorite spreadsheet software)
	- Change the column headers for the coordinates to _latitude_ and _longitude_
	- Delete all unwanted columns
	- Save as a _Comma Seperated Values (.csv)_ file and close
- Open the csv file in a text editor such as Notepad or TextEdit
	- Select all the text (ctrl+A / command+A) and copy
	- Open your web browser and go to [http://togeojson.com/](http://togeojson.com/)
	- Paste the copied text into the top box
	- Click the 'Convert' button
	- Click in to the lower box, select all the text, and copy
- From the unzipped project folder, open the _surveyData.js_ file using a text editor
	- Select all the text and delete it
	- Type `var surveyData = ` (the capitalization must be the same) and then paste the converted text from the CSV to GeoJSON website
	- Save and close
- Double click the _index.html_ file
	- If the file doesn't open in your web browser you may need to right click, select 'Open With...', and select your web browser
- The survey points should appear on a map
	- Clicking a point should display the survey data for that point in a popup
	- With an internet connection, an [OpenStreetMap](http://www.openstreetmap.org/) basemap should display

**Technology Used:** [Leaflet.js](http://leafletjs.com/), [jQuery](http://jquery.com/), [Bootstrap](http://getbootstrap.com/)
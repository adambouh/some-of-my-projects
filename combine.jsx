
  
// bring application forward for double-click events
app.bringToFront();

///////////////////////////////////////////////////////////////////////////////
// main - main function
///////////////////////////////////////////////////////////////////////////////
function main() {
	// user settings
	var prefs = new Object();
	prefs.sourceFolder1         = '~';  // default browse location (default: '~')
    prefs.sourceFolder2         = '~'; 
    prefs.sourceFolder3      = '~'; 
	prefs.removeFileExtensions = true; // remove filename extensions for imported layers (default: true)
	prefs.savePrompt           = false; // display save prompt after import is complete (default: false)
	prefs.closeAfterSave       = false; // close import document after saving (default: false)

	// prompt for source folder
	var sourceFolder1 = Folder.selectDialog('Please select the folder to be imported:', Folder(prefs.sourceFolder1));
    var sourceFolder2 = Folder.selectDialog('Please select the folder to be imported:', Folder(prefs.sourceFolder1));
    var sourceFolder3 = Folder.selectDialog('Please select the folder to be imported:', Folder(prefs.sourceFolde1));


/*	// ensure the source folder is valid
	if (!sourceFolder) {
		return;
	}
	else if (!sourceFolder.exists) {
		alert('Source folder not found.', 'Script Stopped', true);
		return;
	}
*/
	// add source folder to user settings
	prefs.sourceFolder1 = sourceFolder1;
    prefs.sourceFolder2 = sourceFolder2;
	prefs.sourceFolder3 = sourceFolder3;



	// get a list of files
	var fileArray1 = getFiles(prefs.sourceFolder1);
    var fileArray2 = getFiles(prefs.sourceFolder2);
	var fileArray3 = getFiles(prefs.sourceFolder3);

	// if files were found, proceed with import
	
		importFolderAsLayers(fileArray1,fileArray2,fileArray3, prefs);
	
}

///////////////////////////////////////////////////////////////////////////////
// getFiles - get all files within the specified source
///////////////////////////////////////////////////////////////////////////////
function getFiles(sourceFolder) {
	// declare local variables
	var fileArray = new Array();

	var extRE = /\.(?:png|gif|jpg|bmp|tif|psd)$/i;

	// get all files in source folder
	var docs = sourceFolder.getFiles();
	var len = docs.length;
	for (var i = 0; i < len; i++) {
		var doc = docs[i];

		// only match files (not folders)
		if (doc instanceof File) {
			// store all recognized files into an array
			var docName = doc.name;
			if (docName.match(extRE)) {
				fileArray.push(doc);
			}
		}
	}

	// return file array
	return fileArray;
}

///////////////////////////////////////////////////////////////////////////////
// importFolderAsLayers - imports a folder of images as named layers
///////////////////////////////////////////////////////////////////////////////
function importFolderAsLayers(fileArray1,fileArray2,fileArray3, prefs) {
	// create a new document
	var newDoc = documents.add(340, 500, 300, 'Imported Layers', NewDocumentMode.RGB, DocumentFill.TRANSPARENT, 1,  BitsPerChannelType.SIXTEEN);
	var newLayer = newDoc.activeLayer;

	// loop through all files in the source folder
	for (var i = 0; i < fileArray1.length; i++) 
	{
	// open document
		var doc1 = open(fileArray1[i]);
        

		// get document name (and remove file extension)
		var name1 = doc1.name;
		if (prefs.removeFileExtensions) {
			name1 = name1.replace(/(?:\.[^.]*$|$)/, '');
		}

		// convert to RGB; convert to 8-bpc; merge visible
		doc1.changeMode(ChangeMode.RGB);
		doc1.bitsPerChannel = BitsPerChannelType.EIGHT;
		doc1.artLayers.add();
		doc1.mergeVisibleLayers();

		// rename layer; duplicate to new document
		var layer1 = doc1.activeLayer;
		layer1.name = name1;
		layer1.duplicate(newDoc, ElementPlacement.PLACEATBEGINNING);

		// close imported document
		doc1.close(SaveOptions.DONOTSAVECHANGES);///
        for (var j = 0; j< fileArray2.length; j++) {
			var totalnumberj;
			totalnumberj[j]=j	;
		}
         
        var doc2 = open(fileArray2[j]);
        

		// get document name (and remove file extension)
		var name2 = doc2.name;
		if (prefs.removeFileExtensions) {
			name2 = name2.replace(/(?:\.[^.]*$|$)/+'png', '');
		}

		// convert to RGB; convert to 8-bpc; merge visible
		doc2.changeMode(ChangeMode.RGB);
		doc2.bitsPerChannel = BitsPerChannelType.EIGHT;
		doc2.artLayers.add();
		doc2.mergeVisibleLayers();

		// rename layer; duplicate to new document
		var layer2 = doc2.activeLayer;
		layer2.name = name2;
		layer2.duplicate(newDoc, ElementPlacement.PLACEATBEGINNING);

		// close imported document
		doc2.close(SaveOptions.DONOTSAVECHANGES);///
		 for (var k = 0; k< fileArray3.length; k++) {
			 totalnumberk;
			 totalnumberk[k]= k;
		 }
        var doc3 = open(fileArray3[k]);
    

		// get document name (and remove file extension)
		var name3 = doc3.name;
		if (prefs.removeFileExtensions) {
			name3 = name3.replace(/(?:\.[^.]*$|$)/, '');
		}

		// convert to RGB; convert to 8-bpc; merge visible
		doc3.changeMode(ChangeMode.RGB);
		doc3.bitsPerChannel = BitsPerChannelType.EIGHT;
		doc3.artLayers.add();
		doc3.mergeVisibleLayers();

		// rename layer; duplicate to new document
		var layer3 = doc3.activeLayer;
		layer3.name = name3;
		layer3.duplicate(newDoc, ElementPlacement.PLACEATBEGINNING);

		// close imported document
		doc3.close(SaveOptions.DONOTSAVECHANGES);///


		// close imported document
		
        var documentName =  name2 ;

        saveJpegForWeb(documentName, {quality: 68});

		newDoc.activeLayer.remove();	
				
		
				newDoc.activeLayer.remove();
			  }
		newDoc.activeLayer.remove();
		
		
		if (prefs.closeAfterSave) {
			newDoc.close(SaveOptions.DONOTSAVECHANGES);
	
	   
        }
    }





function generateRandomNumber(totalNumbers, fileArray) {
    const randomNumberIndex = Math.floor(Math.random() * totalNumbers + 1);
    return fileArray[randomNumberIndex - 1];
}


function saveJpegForWeb(name, options) {
    const doc = app.activeDocument;
    const file = new File('~/Desktop/new/' + name  +'.png');
  
    saveOptions = new ExportOptionsSaveForWeb();
    saveOptions.format = SaveDocumentType.JPEG;
    saveOptions.includeProfile = false;
    saveOptions.interlaced = false;
    saveOptions.optimized = true;
    saveOptions.quality = options.quality;
  
    doc.exportDocument(file, ExportType.SAVEFORWEB, saveOptions);
  }
///////////////////////////////////////////////////////////////////////////////
// isCorrectVersion - check for Adobe Photoshop CS2 (v9) or higher
///////////////////////////////////////////////////////////////////////////////
function isCorrectVersion() {
	if (parseInt(version, 10) >= 9) {
		return true;
	}
	else {
		alert('This script requires Adobe Photoshop CS2 or higher.', 'Wrong Version', false);
		return false;
	}
}

///////////////////////////////////////////////////////////////////////////////
// showError - display error message if something goes wrong
///////////////////////////////////////////////////////////////////////////////
function showError(err) {
	if (confirm('An unknown error has occurred.\n' +
		'Would you like to see more information?', true, 'Unknown Error')) {
			alert(err + ': on line ' + err.line, 'Script Error', true);
	}
}


// test initial conditions prior to running main function
if (isCorrectVersion()) {
	// remember ruler units; switch to pixels
	var originalRulerUnits = preferences.rulerUnits;
	preferences.rulerUnits = Units.PIXELS;

	try {
		main();
	}
	catch(e) {
		// don't report error on user cancel
		if (e.number != 8007) {
			showError(e);
		}
	}

	// restore original ruler unit
	preferences.rulerUnits = originalRulerUnits;
}
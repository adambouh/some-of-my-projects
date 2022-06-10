const docRef = app.activeDocument;
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.exportClipboard = false ;
const layers = docRef.layers ;
cTID = function(s) { return app.charIDToTypeID(s); };
sTID = function(s) { return app.stringIDToTypeID(s); };


for (var layerIndex = 0  ; layerIndex < layers.length ; layerIndex++)
{   
    
  //layers.visible =false ;
  layer =layers[layerIndex] ;
  layer.visible =true ;
  
      generateNewImage(layer);

app.activeDocument = docRef ;
docRef.selection.deselect();
layer.visible = false ;
}

function generateNewImage(layerRef)
{   
    docRef.selection.select([
    [0,0],                          [0,docRef.height],
    [docRef.width,docRef.Height],   [docRef.width,0]
]);

    //docRef.selection.copy(true);
    app.activeDocument.selection.copy();

    
    var documentName = layerRef.name ;
    newDocument = documents.add(
        docRef.width,
        docRef.height,
        300,
        documentName,
        NewDocumentMode.RGB,
        DocumentFill.TRANSPARENT,
        1,
        BitsPerChannelType.SIXTEEN
        );
    app.activeDocument;
    pasteInPlace();
    //saveJpeg(documentName,{quality :9},'-native-9');
      // Save the image for web
     SavePNG(documentName);
        newDocument.close(SaveOptions.DONOTSAVECHANGES);
     app.activeDocument = docRef;
  

}
function saveJpeg(name, options, suffix) {
    const doc = app.activeDocument;
    const file = new File('~/Desktop/accessorie/' + name + suffix +'.png');
    const saveOptions = new JPEGSaveOptions();
    saveOptions.quality = options.quality;
    saveOptions.embedColorProfile = true;
  
    const asCopy = true;
    doc.saveAs(file, saveOptions, asCopy, Extension.LOWERCASE);
  }

function SavePNG(saveFile){
    const pngFile = new File('~/Desktop/accessorie/' + saveFile +'.png' );

    var pngOpts = new ExportOptionsSaveForWeb; 
    pngOpts.format = SaveDocumentType.PNG
    pngOpts.PNG8 = false; 
    pngOpts.transparency = true; 
    pngOpts.interlaced = false; 
    pngOpts.quality = 100;
    activeDocument.exportDocument(pngFile,ExportType.SAVEFORWEB,pngOpts);
}
  function saveJpegForWeb(name, options, suffix) {
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
 
 



function hueCorrection(hue, sat, bright) { 
            

    var desc1 = new ActionDescriptor();

    desc1.putEnumerated( stringIDToTypeID('presetKind'), stringIDToTypeID('presetKindType'), stringIDToTypeID('presetKindCustom') );

    desc1.putBoolean( charIDToTypeID('Clrz'), false );

        var list1 = new ActionList();

            var desc2 = new ActionDescriptor();

            desc2.putInteger( charIDToTypeID('H   '), hue );

            desc2.putInteger( charIDToTypeID('Strt'), sat );

            desc2.putInteger( charIDToTypeID('Lght'), bright );

        list1.putObject( charIDToTypeID('Hst2'), desc2 );

     desc1.putList( charIDToTypeID('Adjs'), list1 );

    executeAction( charIDToTypeID('HStr'), desc1, DialogModes.NO );

};
 for (var layerIndex = 0; layerIndex < layers.length; layerIndex++) {
    
    var layer = layers[layerIndex];
    layer.visible = true;
  }
  function pasteInPlace(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    desc1.putBoolean(sTID("inPlace"), true);
    desc1.putEnumerated(cTID('AntA'), cTID('Annt'), cTID('Anno'));
    executeAction(cTID('past'), desc1, dialogMode);
  };
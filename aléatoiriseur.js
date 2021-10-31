var MySelection = app.activeDocument.selection;
var MyDoc = app.activeDocument;

function nombre_random(min,max){
	return  Math.floor(Math.random() * (max - min + 1)) + min;
}

function random_background_color(){
	selSwatches = MyDoc.swatches.getSelected();
	
	if(selSwatches.length != 0){
		for(i=0; i<MySelection.length; i++){
			SelectedItem = MySelection[i];
			if(SelectedItem.typename == "PathItem" || SelectedItem.typename == "CompoundPathItem"){
				SelectedItem.filled = true;

				swatchIndex = Math.round( Math.random() * (selSwatches.length - 1 ));
				
				if(SelectedItem.typename == "PathItem")
					SelectedItem.fillColor = selSwatches[swatchIndex].color;
				else
					SelectedItem.pathItems[0].fillColor = selSwatches[swatchIndex].color;
			}
		}
	}
}

function random_stroke_color(){
	selSwatches = MyDoc.swatches.getSelected();
	
	if(selSwatches.length != 0){
		for(i=0; i<MySelection.length; i++){
			SelectedItem = MySelection[i];
			if(SelectedItem.typename == "PathItem" || SelectedItem.typename == "CompoundPathItem"){
				SelectedItem.stroked = true;

				swatchIndex = Math.round( Math.random() * (selSwatches.length - 1 ));
				
				if(SelectedItem.typename == "PathItem")
					SelectedItem.strokeColor = selSwatches[swatchIndex].color;
				else
					SelectedItem.pathItems[0].strokeColor = selSwatches[swatchIndex].color;
			}
		}
	}
}

function random_opacite(op_min,op_max){
	if(op_min > op_max){
		temp = op_min;
		op_min = op_max;
		op_max = temp;
	}
	op_min = Math.max(0,op_min)
	op_max = Math.min(100,op_max)

	for(i=0; i<MySelection.length; i++){
			SelectedItem = MySelection[i];
		SelectedItem.opacity = nombre_random(op_min,op_max);
	}
}

function random_redimension(redim_min,redim_max){
	if(redim_min > redim_max){
		temp = redim_min;
		redim_min = redim_max;
		redim_max = temp;
	}

	for(i=0; i<MySelection.length; i++){
			SelectedItem = MySelection[i];
		facteur_redim = nombre_random(redim_min,redim_max);
		SelectedItem.resize(facteur_redim, facteur_redim);
	}
}

function random_rotation(rot_min,rot_max){
	if(rot_min > rot_max){
		temp = rot_min;
		rot_min = rot_max;
		rot_max = temp;
	}

	for(i=0; i<MySelection.length; i++){
			SelectedItem = MySelection[i];
		rotation = nombre_random(rot_min,rot_max);
		SelectedItem.rotate(rotation, rotation);
	}
}

function random_stroke_weight(ep_min,ep_max){
	if(ep_min > ep_max){
		temp = ep_min;
		ep_min = ep_max;
		ep_max = temp;
	}

	for(i=0; i<MySelection.length; i++){
			SelectedItem = MySelection[i];
		epaisseur = nombre_random(ep_min,ep_max);
		SelectedItem.strokeWidth = epaisseur;
	}
}

function random_translation(x_min,x_max,y_min,y_max){
	if(x_min > x_max){
		temp = x_min;
		x_min = x_max;
		x_max = temp;
	}
	if(y_min > y_max){
		temp = y_min;
		y_min = y_max;
		y_max = temp;
	}

	for(i=0; i<MySelection.length; i++){
			SelectedItem = MySelection[i];
		translation_x = nombre_random(x_min,x_max);
		translation_y = nombre_random(y_min,y_max);
		SelectedItem.translate(translation_x,translation_y);
	}
}

function random_order(){
	for(i=0; i<MySelection.length; i++){
			SelectedItem = MySelection[i];
		indice = Math.floor(Math.random()*(MySelection.length - i));
		MySelection[indice].zOrder(ZOrderMethod.SENDTOBACK);
	}
}

function random_selection(pourcentage){
	var nbr_objet_a_deselectionner = Math.round(MySelection.length * (1 - pourcentage / 100));
	selection_courante = MySelection;
	for(i=0; i<nbr_objet_a_deselectionner; i++){
		indice = Math.floor(Math.random()*(selection_courante.length - i));
		selection_courante[indice].selected = false;
		selection_courante = MyDoc.selection;
	}
}




var dialogUI = (function () {

	/*
	Code for Import https://scriptui.joonas.me — (Triple click to select): 
	{"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":null,"windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":true},"text":"Aléatoiriseur","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-11":{"id":11,"type":"TabbedPanel","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":10,"alignment":null,"selection":12}},"item-12":{"id":12,"type":"Tab","parentId":11,"style":{"enabled":true,"varName":null,"text":"rotation","orientation":"column","spacing":10,"alignChildren":["left","top"]}},"item-13":{"id":13,"type":"Tab","parentId":11,"style":{"enabled":true,"varName":null,"text":"taille","orientation":"column","spacing":10,"alignChildren":["left","top"]}},"item-14":{"id":14,"type":"Tab","parentId":11,"style":{"enabled":true,"varName":null,"text":"couleur de remplissage","orientation":"column","spacing":10,"alignChildren":["left","top"]}},"item-15":{"id":15,"type":"Tab","parentId":11,"style":{"enabled":true,"varName":null,"text":"couleur de contour","orientation":"column","spacing":10,"alignChildren":["left","top"]}},"item-16":{"id":16,"type":"Tab","parentId":11,"style":{"enabled":true,"varName":null,"text":"épaisseur du contour","orientation":"column","spacing":10,"alignChildren":["left","top"]}},"item-17":{"id":17,"type":"StaticText","parentId":18,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"minimum (en deg)  : ","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-18":{"id":18,"type":"Group","parentId":12,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-20":{"id":20,"type":"EditText","parentId":18,"style":{"enabled":true,"varName":null,"creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"0","justify":"left","preferredSize":[50,0],"alignment":null,"helpTip":null}},"item-21":{"id":21,"type":"Group","parentId":12,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-22":{"id":22,"type":"StaticText","parentId":21,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"maximum (en deg)  : ","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-23":{"id":23,"type":"EditText","parentId":21,"style":{"enabled":true,"varName":null,"creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"360","justify":"left","preferredSize":[50,0],"alignment":null,"helpTip":null}},"item-24":{"id":24,"type":"Button","parentId":25,"style":{"enabled":true,"varName":null,"text":"appliquer","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-25":{"id":25,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["right","top"],"alignment":null}},"item-26":{"id":26,"type":"Button","parentId":25,"style":{"enabled":true,"varName":null,"text":"annuler","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-27":{"id":27,"type":"Group","parentId":13,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-28":{"id":28,"type":"Group","parentId":13,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-29":{"id":29,"type":"StaticText","parentId":28,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"maximum (en %) : ","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-30":{"id":30,"type":"EditText","parentId":28,"style":{"enabled":true,"varName":null,"creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"200","justify":"left","preferredSize":[50,0],"alignment":null,"helpTip":null}},"item-31":{"id":31,"type":"StaticText","parentId":27,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"minimum (en %) : ","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-32":{"id":32,"type":"EditText","parentId":27,"style":{"enabled":true,"varName":null,"creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"80","justify":"left","preferredSize":[50,0],"alignment":null,"helpTip":null}},"item-33":{"id":33,"type":"StaticText","parentId":35,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"épaisseur minimale (en px) : ","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-34":{"id":34,"type":"EditText","parentId":35,"style":{"enabled":true,"varName":null,"creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"1","justify":"left","preferredSize":[50,0],"alignment":null,"helpTip":null}},"item-35":{"id":35,"type":"Group","parentId":16,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-36":{"id":36,"type":"Group","parentId":16,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-37":{"id":37,"type":"StaticText","parentId":36,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"épaisseur maximale (en px)  :","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-38":{"id":38,"type":"EditText","parentId":36,"style":{"enabled":true,"varName":null,"creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"20","justify":"left","preferredSize":[50,0],"alignment":null,"helpTip":null}},"item-39":{"id":39,"type":"StaticText","parentId":14,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"sélectionnez une palette de couleur","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-40":{"id":40,"type":"StaticText","parentId":15,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"sélectionnez une palette de couleur","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-41":{"id":41,"type":"Tab","parentId":11,"style":{"enabled":true,"varName":null,"text":"position","orientation":"column","spacing":10,"alignChildren":["left","top"]}},"item-42":{"id":42,"type":"Tab","parentId":11,"style":{"enabled":true,"varName":null,"text":"sélection","orientation":"column","spacing":10,"alignChildren":["left","top"]}},"item-43":{"id":43,"type":"Group","parentId":42,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-44":{"id":44,"type":"StaticText","parentId":43,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"pourcentage de sélection","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-45":{"id":45,"type":"EditText","parentId":43,"style":{"enabled":true,"varName":null,"creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"50","justify":"left","preferredSize":[50,0],"alignment":null,"helpTip":null}},"item-47":{"id":47,"type":"Group","parentId":41,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-48":{"id":48,"type":"StaticText","parentId":47,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"minimum horizontal (en px)  : ","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-49":{"id":49,"type":"EditText","parentId":47,"style":{"enabled":true,"varName":null,"creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"-30","justify":"left","preferredSize":[50,0],"alignment":null,"helpTip":null}},"item-51":{"id":51,"type":"Group","parentId":41,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-52":{"id":52,"type":"StaticText","parentId":51,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"maximum horizontal (en px) :","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-53":{"id":53,"type":"EditText","parentId":51,"style":{"enabled":true,"varName":null,"creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"30","justify":"left","preferredSize":[50,0],"alignment":null,"helpTip":null}},"item-55":{"id":55,"type":"Group","parentId":41,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-56":{"id":56,"type":"Group","parentId":41,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-57":{"id":57,"type":"StaticText","parentId":56,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"maximum vertical (en px)  :","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-58":{"id":58,"type":"EditText","parentId":56,"style":{"enabled":true,"varName":null,"creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"30","justify":"left","preferredSize":[50,0],"alignment":null,"helpTip":null}},"item-60":{"id":60,"type":"StaticText","parentId":55,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"minimum vertical (en px)  :","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-61":{"id":61,"type":"EditText","parentId":55,"style":{"enabled":true,"varName":null,"creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"-30","justify":"left","preferredSize":[50,0],"alignment":null,"helpTip":null}},"item-62":{"id":62,"type":"Tab","parentId":11,"style":{"enabled":true,"varName":null,"text":"opacité","orientation":"column","spacing":10,"alignChildren":["left","top"]}},"item-63":{"id":63,"type":"Group","parentId":62,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-64":{"id":64,"type":"StaticText","parentId":63,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"opacité minimale (en %) :","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-65":{"id":65,"type":"EditText","parentId":63,"style":{"enabled":true,"varName":null,"creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"70","justify":"left","preferredSize":[50,0],"alignment":null,"helpTip":null}},"item-66":{"id":66,"type":"Group","parentId":62,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-67":{"id":67,"type":"StaticText","parentId":66,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"opacité maximale (en %) :","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-68":{"id":68,"type":"EditText","parentId":66,"style":{"enabled":true,"varName":null,"creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"100","justify":"left","preferredSize":[50,0],"alignment":null,"helpTip":null}},"item-69":{"id":69,"type":"Tab","parentId":11,"style":{"enabled":true,"varName":null,"text":"ordre","orientation":"column","spacing":10,"alignChildren":["left","top"]}},"item-70":{"id":70,"type":"StaticText","parentId":69,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"votre sélection doit être non vide","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}}},"order":[0,11,12,18,17,20,21,22,23,13,27,31,32,28,29,30,16,35,33,34,36,37,38,14,39,15,40,62,63,64,65,66,67,68,41,47,48,49,51,52,53,55,60,61,56,57,58,42,43,44,45,69,70,25,24,26],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":true,"afterEffectsDockable":false,"itemReferenceList":"find"},"activeId":12}
	*/ 
  
	// DIALOG
	// ======
	var dialog = new Window("dialog", undefined, undefined, {resizeable: true}); 
		dialog.text = "Aléatoiriseur"; 
		dialog.orientation = "column"; 
		dialog.alignChildren = ["center","top"]; 
		dialog.spacing = 10; 
		dialog.margins = 16; 
  
	// TPANEL1
	// =======
	var tpanel1 = dialog.add("tabbedpanel", undefined, undefined, {name: "tpanel1"}); 
		tpanel1.alignChildren = "fill"; 
		tpanel1.preferredSize.width = 949.719; 
		tpanel1.margins = 0; 
  
	// tab_rotation
	// ====
	var tab_rotation = tpanel1.add("tab", undefined, undefined, {name: "tab_rotation"}); 
		tab_rotation.text = "rotation"; 
		tab_rotation.fonction = "random_rotation";
		tab_rotation.orientation = "column"; 
		tab_rotation.alignChildren = ["left","top"]; 
		tab_rotation.spacing = 10; 
		tab_rotation.margins = 10; 

	var group1 = tab_rotation.add("group", undefined, {name: "group1"}); 
		group1.orientation = "row"; 
		group1.alignChildren = ["left","center"]; 
		group1.spacing = 10; 
		group1.margins = 0; 
  
	var statictext1 = group1.add("statictext", undefined, undefined, {name: "statictext1"}); 
		statictext1.text = "minimum (deg)  : "; 
  
	var edittext1 = group1.add('edittext {properties: {name: "edittext1"}}'); 
		edittext1.text = "0"; 
		edittext1.preferredSize.width = 50; 

	var group2 = tab_rotation.add("group", undefined, {name: "group2"}); 
		group2.orientation = "row"; 
		group2.alignChildren = ["left","center"]; 
		group2.spacing = 10; 
		group2.margins = 0; 
  
	var statictext2 = group2.add("statictext", undefined, undefined, {name: "statictext2"}); 
		statictext2.text = "maximum (deg)  : "; 
  
	var edittext2 = group2.add('edittext {properties: {name: "edittext2"}}'); 
		edittext2.text = "360"; 
		edittext2.preferredSize.width = 50; 
  
	// tab_redimension
	// ====
	var tab_redimension = tpanel1.add("tab", undefined, undefined, {name: "tab_redimension"}); 
		tab_redimension.text = "width"; 
		tab_redimension.fonction = "random_redimension";
		tab_redimension.orientation = "column"; 
		tab_redimension.alignChildren = ["left","top"]; 
		tab_redimension.spacing = 10; 
		tab_redimension.margins = 10; 

	var group3 = tab_redimension.add("group", undefined, {name: "group3"}); 
		group3.orientation = "row"; 
		group3.alignChildren = ["left","center"]; 
		group3.spacing = 10; 
		group3.margins = 0; 
  
	var statictext3 = group3.add("statictext", undefined, undefined, {name: "statictext3"}); 
		statictext3.text = "minimum (%) : "; 
  
	var edittext3 = group3.add('edittext {properties: {name: "edittext3"}}'); 
		edittext3.text = "80"; 
		edittext3.preferredSize.width = 50; 

	var group4 = tab_redimension.add("group", undefined, {name: "group4"}); 
		group4.orientation = "row"; 
		group4.alignChildren = ["left","center"]; 
		group4.spacing = 10; 
		group4.margins = 0; 
  
	var statictext4 = group4.add("statictext", undefined, undefined, {name: "statictext4"}); 
		statictext4.text = "maximum (%) : "; 
  
	var edittext4 = group4.add('edittext {properties: {name: "edittext4"}}'); 
		edittext4.text = "200"; 
		edittext4.preferredSize.width = 50; 
  
	// tab_epaisseur
	// ====
	var tab_epaisseur = tpanel1.add("tab", undefined, undefined, {name: "tab_epaisseur"}); 
		tab_epaisseur.text = "stroke_width"; 
		tab_epaisseur.fonction = "random_epaisseur";
		tab_epaisseur.orientation = "column"; 
		tab_epaisseur.alignChildren = ["left","top"]; 
		tab_epaisseur.spacing = 10; 
		tab_epaisseur.margins = 10; 

	var group5 = tab_epaisseur.add("group", undefined, {name: "group5"}); 
		group5.orientation = "row"; 
		group5.alignChildren = ["left","center"]; 
		group5.spacing = 10; 
		group5.margins = 0; 
  
	var statictext5 = group5.add("statictext", undefined, undefined, {name: "statictext5"}); 
		statictext5.text = "min width (px) : "; 
  
	var edittext5 = group5.add('edittext {properties: {name: "edittext5"}}'); 
		edittext5.text = "1"; 
		edittext5.preferredSize.width = 50; 

	var group6 = tab_epaisseur.add("group", undefined, {name: "group6"}); 
		group6.orientation = "row"; 
		group6.alignChildren = ["left","center"]; 
		group6.spacing = 10; 
		group6.margins = 0; 
  
	var statictext6 = group6.add("statictext", undefined, undefined, {name: "statictext6"}); 
		statictext6.text = "max width (px)  :"; 
  
	var edittext6 = group6.add('edittext {properties: {name: "edittext6"}}'); 
		edittext6.text = "20"; 
		edittext6.preferredSize.width = 50; 
  
	// tab_couleur_rem
	// ====
	var tab_couleur_rem = tpanel1.add("tab", undefined, undefined, {name: "tab_couleur_rem"}); 
		tab_couleur_rem.text = "fill color";
		tab_couleur_rem.fonction = "random_background_color"; 
		tab_couleur_rem.orientation = "column"; 
		tab_couleur_rem.alignChildren = ["left","top"]; 
		tab_couleur_rem.spacing = 10; 
		tab_couleur_rem.margins = 10; 
  
	var statictext7 = tab_couleur_rem.add("statictext", undefined, undefined, {name: "statictext7"}); 
		statictext7.text = "select a color swatch"; 
  
	// tab_couleur_contour
	// ====
	var tab_couleur_contour = tpanel1.add("tab", undefined, undefined, {name: "tab_couleur_contour"}); 
		tab_couleur_contour.text = "stroke color"; 
		tab_couleur_contour.fonction = "random_stroke_color";
		tab_couleur_contour.orientation = "column"; 
		tab_couleur_contour.alignChildren = ["left","top"]; 
		tab_couleur_contour.spacing = 10; 
		tab_couleur_contour.margins = 10; 
  
	var statictext8 = tab_couleur_contour.add("statictext", undefined, undefined, {name: "statictext8"}); 
		statictext8.text = "select a color swatch"; 
  
	// tab_opacite
	// ====
	var tab_opacite = tpanel1.add("tab", undefined, undefined, {name: "tab_opacite"}); 
		tab_opacite.text = "opacity";
		tab_opacite.fonction = "random_opacite";
		tab_opacite.orientation = "column"; 
		tab_opacite.alignChildren = ["left","top"]; 
		tab_opacite.spacing = 10; 
		tab_opacite.margins = 10; 

	var group7 = tab_opacite.add("group", undefined, {name: "group7"}); 
		group7.orientation = "row"; 
		group7.alignChildren = ["left","center"]; 
		group7.spacing = 10; 
		group7.margins = 0; 
  
	var statictext9 = group7.add("statictext", undefined, undefined, {name: "statictext9"}); 
		statictext9.text = "min opacity (%) :"; 
  
	var edittext7 = group7.add('edittext {properties: {name: "edittext7"}}'); 
		edittext7.text = "70"; 
		edittext7.preferredSize.width = 50; 

	var group8 = tab_opacite.add("group", undefined, {name: "group8"}); 
		group8.orientation = "row"; 
		group8.alignChildren = ["left","center"]; 
		group8.spacing = 10; 
		group8.margins = 0; 
  
	var statictext10 = group8.add("statictext", undefined, undefined, {name: "statictext10"}); 
		statictext10.text = "max opacity (%) :"; 
  
	var edittext8 = group8.add('edittext {properties: {name: "edittext8"}}'); 
		edittext8.text = "100"; 
		edittext8.preferredSize.width = 50; 
  
	// tab_position
	// ====
	var tab_position = tpanel1.add("tab", undefined, undefined, {name: "tab_position"}); 
		tab_position.text = "position";
		tab_position.fonction = "random_translation";
		tab_position.orientation = "column"; 
		tab_position.alignChildren = ["left","top"]; 
		tab_position.spacing = 10; 
		tab_position.margins = 10; 

	var group9 = tab_position.add("group", undefined, {name: "group9"}); 
		group9.orientation = "row"; 
		group9.alignChildren = ["left","center"]; 
		group9.spacing = 10; 
		group9.margins = 0; 
  
	var statictext11 = group9.add("statictext", undefined, undefined, {name: "statictext11"}); 
		statictext11.text = "minimum horizontal (en px)  : "; 
  
	var edittext9 = group9.add('edittext {properties: {name: "edittext9"}}'); 
		edittext9.text = "-30"; 
		edittext9.preferredSize.width = 50; 

	var group10 = tab_position.add("group", undefined, {name: "group10"}); 
		group10.orientation = "row"; 
		group10.alignChildren = ["left","center"]; 
		group10.spacing = 10; 
		group10.margins = 0; 
  
	var statictext12 = group10.add("statictext", undefined, undefined, {name: "statictext12"}); 
		statictext12.text = "max horizontal translation (px) :"; 
  
	var edittext10 = group10.add('edittext {properties: {name: "edittext10"}}'); 
		edittext10.text = "30"; 
		edittext10.preferredSize.width = 50; 

	var group11 = tab_position.add("group", undefined, {name: "group11"}); 
		group11.orientation = "row"; 
		group11.alignChildren = ["left","center"]; 
		group11.spacing = 10; 
		group11.margins = 0; 
  
	var statictext13 = group11.add("statictext", undefined, undefined, {name: "statictext13"}); 
		statictext13.text = "min horizontal translation (px)  :"; 
  
	var edittext11 = group11.add('edittext {properties: {name: "edittext11"}}'); 
		edittext11.text = "-30"; 
		edittext11.preferredSize.width = 50; 

	var group12 = tab_position.add("group", undefined, {name: "group12"}); 
		group12.orientation = "row"; 
		group12.alignChildren = ["left","center"]; 
		group12.spacing = 10; 
		group12.margins = 0; 
  
	var statictext14 = group12.add("statictext", undefined, undefined, {name: "statictext14"}); 
		statictext14.text = "max vertical translation (px)  :"; 
  
	var edittext12 = group12.add('edittext {properties: {name: "edittext12"}}'); 
		edittext12.text = "30"; 
		edittext12.preferredSize.width = 50; 
  
	// tab_selection
	// ====
	var tab_selection = tpanel1.add("tab", undefined, undefined, {name: "tab_selection"}); 
		tab_selection.text = "selection"; 
		tab_selection.fonction = "random_selection";
		tab_selection.orientation = "column"; 
		tab_selection.alignChildren = ["left","top"]; 
		tab_selection.spacing = 10; 
		tab_selection.margins = 10; 

	var group13 = tab_selection.add("group", undefined, {name: "group13"}); 
		group13.orientation = "row"; 
		group13.alignChildren = ["left","center"]; 
		group13.spacing = 10; 
		group13.margins = 0; 
  
	var statictext15 = group13.add("statictext", undefined, undefined, {name: "statictext15"}); 
		statictext15.text = "selection percentage"; 
  
	var edittext13 = group13.add('edittext {properties: {name: "edittext13"}}'); 
		edittext13.text = "50"; 
		edittext13.preferredSize.width = 50; 
  
	// tab_ordre
	// ====
	var tab_ordre = tpanel1.add("tab", undefined, undefined, {name: "tab_ordre"}); 
		tab_ordre.text = "ordre"; 
		tab_ordre.fonction = "random_order";
		tab_ordre.orientation = "column"; 
		tab_ordre.alignChildren = ["left","top"]; 
		tab_ordre.spacing = 10; 
		tab_ordre.margins = 10; 
  
	var statictext16 = tab_ordre.add("statictext", undefined, undefined, {name: "statictext16"}); 
		statictext16.text = "your selection must not be empty"; 

	var group14 = dialog.add("group", undefined, {name: "group14"}); 
		group14.orientation = "row"; 
		group14.alignChildren = ["right","top"]; 
		group14.spacing = 10; 
		group14.margins = 0; 

	var button1 = group14.add("button", undefined, undefined, {name: "button1"}); 
		button1.text = "apply"; 
  
	var button2 = group14.add("button", undefined, undefined, {name: "button2"}); 
		button2.text = "cancel"; 
  
	// TPANEL1
	// =======
	tpanel1.selection = tab_rotation;

	button1.addEventListener("click",function(){
		tab_selectionnee = tpanel1.selection
		if(tab_selectionnee == tab_rotation){
			min_rotation = parseInt(edittext1.text)
			max_rotation = parseInt(edittext2.text)
			random_rotation(min_rotation,max_rotation)
		} else if(tab_selectionnee == tab_redimension){
			min_redim = parseInt(edittext3.text)
			max_redim = parseInt(edittext4.text)
			random_redimension(min_redim,max_redim)
		} else if(tab_selectionnee == tab_epaisseur){
			min_ep = parseInt(edittext5.text)
			max_ep = parseInt(edittext6.text)
			random_stroke_weight(min_ep,max_ep)
		} else if(tab_selectionnee == tab_opacite){
			min_op = parseInt(edittext7.text)
			max_op = parseInt(edittext8.text)
			random_opacite(min_op,max_op)
		} else if(tab_selectionnee == tab_position){
			min_x = parseInt(edittext9.text)
			max_x = parseInt(edittext10.text)
			min_y = parseInt(edittext11.text)
			max_y = parseInt(edittext12.text)
			random_translation(min_x,max_x,min_y,max_y)
		} else if(tab_selectionnee == tab_selection){
			pourcentage = parseInt(edittext7.text)
			random_selection(pourcentage)
		} else if(tab_selectionnee == tab_ordre){
			random_order()
		} else if(MySelection instanceof Array){
			if(tab_selectionnee == tab_couleur_rem){
			random_background_color()
			} else if(tab_selectionnee == tab_couleur_contour){
				random_stroke_color()
			}
		}
		app.redraw()
	})
	
  
	dialog.show();
  
	return dialog;
  
  }());

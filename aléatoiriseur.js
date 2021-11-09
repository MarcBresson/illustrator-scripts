MyDoc = app.activeDocument;
MySelection = MyDoc.selection;

function nombre_random(min,max){
	return  Math.floor(Math.random() * (max - min + 1)) + min;
}

function random_color(type){
	selSwatches = MyDoc.swatches.getSelected();
	if(selSwatches.length != 0){
		for(i=0; i<MySelection.length; i++){
			SelectedItem = MySelection[i];
			if(SelectedItem.typename == "PathItem" || SelectedItem.typename == "CompoundPathItem"){
				swatchIndex = Math.round( Math.random() * (selSwatches.length - 1 ));

				if (type == "fill"){
					SelectedItem.filled = true;
					if(SelectedItem.typename == "PathItem")
						SelectedItem.fillColor = selSwatches[swatchIndex].color;
					else
						SelectedItem.pathItems[0].fillColor = selSwatches[swatchIndex].color;
				} 

				else if (type == "stroke"){
					SelectedItem.stroked = true;
					if(SelectedItem.typename == "PathItem")
						SelectedItem.strokeColor = selSwatches[swatchIndex].color;
					else
						SelectedItem.pathItems[0].strokeColor = selSwatches[swatchIndex].color;
				}
			}
		}
	}
}

function random_two_factor(type, minimum, maximum, min_minimum=undefined, max_maximum=undefined){
	if(minimum > maximum){
		temp = minimum;
		minimum = maximum;
		maximum = temp;
	}
	if (min_minimum != undefined){
		minimum = Math.min(minimum, min_minimum)
	}
	if (max_maximum != undefined){
		maximum = Math.max(maximum, min_maximum)
	}

	for (var i = 0; i < MySelection.length; i++){
		SelectedItem = MySelection[i];
		nbr_random = nombre_random(minimum, maximum)

		if(type = "opacity"){
			SelectedItem.opacity = nombre_random(op_min,op_max);
		} else if (type = "resize"){
			SelectedItem.resize(nbr_random, nbr_random);
		} else if (type = "rotation"){
			SelectedItem.rotate(nbr_random, nbr_random);
		} else if (type = "stroke_weight"){
			SelectedItem.strokeWidth = nbr_random;
		}
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
	var nbr_items_to_deselect = Math.round(MySelection.length * (pourcentage / 100));
	var items_to_deselect = [];
	for (var i = 0; i < MySelection.length; i++) {
		items_to_deselect.push(i);
	}
	while (items_to_deselect.length > nbr_items_to_deselect){
		index = Math.floor(Math.random()*(items_to_deselect.length));
		items_to_deselect.slice(index, 1);
	}
	for(i = items_to_deselect.length; i >= 0 ; i ++){
		MySelection[items_to_deselect[i]].select = false;
	}
}



var dialogUI = (function () {

	// PALETTE
	// =======
	var palette = new Window("dialog", undefined, undefined, {closeButton: true, resizeable: true}); 
	palette.text = "aleatoiriseur"; 
	palette.alignChildren = ["center","top"]; 
	palette.spacing = 10; 
	palette.margins = 16; 

	// TABPANEL
	// ========
	var tabpanel = palette.add("group", undefined, undefined, {name: "tabpanel"}); 
	tabpanel.alignChildren = ["left","fill"]; 
	var tabpanel_nav = tabpanel.add ("listbox", undefined, ['fill color','stroke color','stroke weight','resize','position','rotation','opacity','selection','ordre']); 
	var tabpanel_innerwrap = tabpanel.add("group") 
	tabpanel_innerwrap.alignment = ["fill","fill"]; 
	tabpanel_innerwrap.orientation = ["stack"]; 

	// TAB_FILL_COLOUR
	// ===============
	var tab_fill_colour = tabpanel_innerwrap.add("group", undefined, {name: "tab_fill_colour"}); 
	tab_fill_colour.text = "fill color";

	var statictext1 = tab_fill_colour.add("statictext", undefined, undefined, {name: "statictext1"}); 
	statictext1.text = "select a colour swatch"; 
	statictext1.justify = "center"; 

	// TAB_STROKE_COLOUR
	// =================
	var tab_stroke_colour = tabpanel_innerwrap.add("group", undefined, {name: "tab_stroke_colour"}); 
	tab_stroke_colour.text = "stroke color";

	var statictext2 = tab_stroke_colour.add("statictext", undefined, undefined, {name: "statictext2"}); 
	statictext2.text = "select a colour swatch"; 
	statictext2.justify = "center"; 

	// TAB_STROKE_WEIGHT
	// =================
	var tab_stroke_weight = tabpanel_innerwrap.add("group", undefined, {name: "tab_stroke_weight"}); 
	tab_stroke_weight.text = "stroke weight";

	var group_min_width = tab_stroke_weight.add("group", undefined, {name: "group_min_width"});

	var text_min_width = group_min_width.add("statictext", undefined, undefined, {name: "text_min_width"}); 
	text_min_width.text = "minimum width (px) : "; 

	var edit_min_width = group_min_width.add('edittext {properties: {name: "edit_min_width"}}'); 
	edit_min_width.preferredSize.width = 50; 

	var group_max_width = tab_stroke_weight.add("group", undefined, {name: "group_max_width"});

	var text_max_width = group_max_width.add("statictext", undefined, undefined, {name: "text_max_width"}); 
	text_max_width.text = "maximum width (px) : "; 

	var edit_max_width = group_max_width.add('edittext {properties: {name: "edit_max_width"}}'); 
	edit_max_width.preferredSize.width = 50; 

	// TAB_RESIZE
	// ==========
	var tab_resize = tabpanel_innerwrap.add("group", undefined, {name: "tab_resize"}); 
	tab_resize.text = "resize";

	var group_min_size = tab_resize.add("group", undefined, {name: "group_min_size"});

	var text_min_size = group_min_size.add("statictext", undefined, undefined, {name: "text_min_size"}); 
	text_min_size.text = "minimum (%) :"; 

	var edit_min_size = group_min_size.add('edittext {properties: {name: "edit_min_size"}}'); 
	edit_min_size.preferredSize.width = 50; 

	var group_max_size = tab_resize.add("group", undefined, {name: "group_max_size"});

	var text_max_size = group_max_size.add("statictext", undefined, undefined, {name: "text_max_size"}); 
	text_max_size.text = "maximum (%) : "; 

	var edit_max_size = group_max_size.add('edittext {properties: {name: "edit_max_size"}}'); 
	edit_max_size.preferredSize.width = 50; 

	// TAB_POSITION
	// ============
	var tab_position = tabpanel_innerwrap.add("group", undefined, {name: "tab_position"}); 
	tab_position.text = "position";

	var panel = tab_position.add("panel", undefined, undefined, {name: "panel"}); 
	panel.text = "horizontal"; 
	panel.orientation = "column"; 
	panel.alignChildren = ["left","top"]; 
	panel.spacing = 10; 
	panel.margins = 10; 

	var group_horizontal = panel.add("group", undefined, {name: "group_horizontal"});

	var text_min_width1 = group_horizontal.add("statictext", undefined, undefined, {name: "text_min_width1"}); 
	text_min_width1.text = "min (px) : "; 

	var edit_min_width1 = group_horizontal.add('edittext {properties: {name: "edit_min_width1"}}'); 
	edit_min_width1.preferredSize.width = 50; 

	var text_max_width1 = group_horizontal.add("statictext", undefined, undefined, {name: "text_max_width1"}); 
	text_max_width1.text = "max (px) : "; 

	var edit_max_width1 = group_horizontal.add('edittext {properties: {name: "edit_max_width1"}}'); 
	edit_max_width1.preferredSize.width = 50; 

	var panel1 = tab_position.add("panel", undefined, undefined, {name: "panel1"}); 
	panel1.text = "vertical"; 
	panel1.orientation = "column"; 
	panel1.alignChildren = ["left","top"]; 
	panel1.spacing = 10; 
	panel1.margins = 10; 

	var group_vertical = panel1.add("group", undefined, {name: "group_vertical"});

	var text_min_width1 = group_vertical.add("statictext", undefined, undefined, {name: "text_min_width1"}); 
	text_min_width1.text = "min (px) : "; 

	var edit_min_width2 = group_vertical.add('edittext {properties: {name: "edit_min_width2"}}'); 
	edit_min_width2.preferredSize.width = 50; 

	var text_max_width2 = group_vertical.add("statictext", undefined, undefined, {name: "text_max_width2"}); 
	text_max_width2.text = "max (px) : "; 

	var edit_max_width2 = group_vertical.add('edittext {properties: {name: "edit_max_width2"}}'); 
	edit_max_width2.preferredSize.width = 50; 

	// TAB_ROTATION
	// ============
	var tab_rotation = tabpanel_innerwrap.add("group", undefined, {name: "tab_rotation"}); 
	tab_rotation.text = "rotation";

	var group_min_rot = tab_rotation.add("group", undefined, {name: "group_min_rot"});

	var text_min_deg = group_min_rot.add("statictext", undefined, undefined, {name: "text_min_deg"}); 
	text_min_deg.text = "minimum (deg) : "; 

	var edit_min_rot = group_min_rot.add('edittext {properties: {name: "edit_min_rot"}}'); 
	edit_min_rot.preferredSize.width = 50; 

	var group_max_rot = tab_rotation.add("group", undefined, {name: "group_max_rot"}); 

	var text_max_deg = group_max_rot.add("statictext", undefined, undefined, {name: "text_max_deg"}); 
	text_max_deg.text = "maximum (deg) : "; 

	var edit_max_rot = group_max_rot.add('edittext {properties: {name: "edit_max_rot"}}'); 
	edit_max_rot.preferredSize.width = 50; 

	// TAB_OPACITY
	// ===========
	var tab_opacity = tabpanel_innerwrap.add("group", undefined, {name: "tab_opacity"}); 
		tab_opacity.text = "opacity";

	var group_min_opacity = tab_opacity.add("group", undefined, {name: "group_min_opacity"});

	var text_min_opacity = group_min_opacity.add("statictext", undefined, undefined, {name: "text_min_opacity"}); 
		text_min_opacity.text = "min opacity (%) : "; 

	var edit_min_opacity = group_min_opacity.add('edittext {properties: {name: "edit_min_opacity"}}'); 
		edit_min_opacity.preferredSize.width = 50; 

	var group_max_opacity = tab_opacity.add("group", undefined, {name: "group_max_opacity"});

	var text_max_opacity = group_max_opacity.add("statictext", undefined, undefined, {name: "text_max_opacity"}); 
		text_max_opacity.text = "max opacity (%) : "; 

	var edit_max_opacity = group_max_opacity.add('edittext {properties: {name: "edit_max_opacity"}}'); 
		edit_max_opacity.preferredSize.width = 50; 

	// TAB_SELECTION
	// =============
	var tab_selection = tabpanel_innerwrap.add("group", undefined, {name: "tab_selection"}); 
		tab_selection.text = "selection";

	var group_selection = tab_selection.add("group", undefined, {name: "group_selection"});

	var text_selection = group_selection.add("statictext", undefined, undefined, {name: "text_selection"}); 
		text_selection.text = "selection to keep (%) : "; 

	var edit_selection = group_selection.add('edittext {properties: {name: "edit_selection"}}'); 
		edit_selection.preferredSize.width = 50; 

	// TAB_ORDRE
	// =========
	var tab_ordre = tabpanel_innerwrap.add("group", undefined, {name: "tab_ordre"}); 
	tab_ordre.text = "ordre";

	// GROUP_BUTTON
	// ============
	var group_button = palette.add("group", undefined, {name: "group_button"});

	var cancel = group_button.add("button", undefined, undefined, {name: "cancel"}); 
	cancel.text = "cancel"; 

	var apply = group_button.add("button", undefined, undefined, {name: "apply"}); 
	apply.text = "apply"; 

	var text_make_selection = tab_ordre.add("statictext", undefined, undefined, {name: "text_make_selection"}); 
    	text_make_selection.text = "make a selection"; 

	// TABPANEL
	// ========
	groups = [tab_fill_colour,tab_stroke_colour,tab_stroke_weight,tab_resize,tab_position,tab_rotation,group_min_opacity,group_max_opacity,group_selection,group_max_rot,group_button]; 
	tabpanel_tabs = [tab_fill_colour,tab_stroke_colour,tab_stroke_weight,tab_resize,tab_position,tab_rotation,tab_opacity,tab_selection,tab_ordre]; 

	for (var i = 0; i < groups.length; i++) { 
		groups[i].orientation = "row"; 
		groups[i].alignChildren = ["left","center"]; 
		groups[i].spacing = 10; 
		groups[i].margins = 0; 
	} 

	for (var i = 0; i < tabpanel_tabs.length; i++) { 
		tabpanel_tabs[i].alignment = ["fill","fill"]; 
		tabpanel_tabs[i].visible = false;
		tabpanel_tabs[i].orientation = "column"; 
		tabpanel_tabs[i].alignChildren = ["left","top"]; 
		tabpanel_tabs[i].spacing = 10; 
		tabpanel_tabs[i].margins = [10,10,10,10]; 
	} 

	tabpanel_nav.onChange = showTab_tabpanel; 

	function showTab_tabpanel() { 
		if ( tabpanel_nav.selection !== null ) { 
			for (var i = tabpanel_tabs.length-1; i >= 0; i--) { 
				tabpanel_tabs[i].visible = false; 
			} 
			tabpanel_tabs[tabpanel_nav.selection.index].visible = true; 
			tab_selectionnee = tabpanel_tabs[tabpanel_nav.selection.index];
		} 
	} 

	tabpanel_nav.selection = 0; 
	showTab_tabpanel() 

	cancel.addEventListener("click",function(){
		palette.close();
	});

	apply.addEventListener("click",function(){
		if(tab_selectionnee == tab_rotation){
			min_rotation = parseInt(edit_min_rot.text)
			max_rotation = parseInt(edit_max_rot.text)
			random_two_factor("rotation",min_rotation,max_rotation)
		}
		else if(tab_selectionnee == tab_resize){
			min_redim = parseInt(edit_min_size.text)
			max_redim = parseInt(edit_max_size.text)
			random_two_factor("resize",min_redim,max_redim)
		}
		else if(tab_selectionnee == tab_stroke_weight){
			min_ep = parseInt(edit_min_width.text)
			max_ep = parseInt(edit_max_width.text)
			random_two_factor("stroke_weight",min_ep,max_ep,0)
		}
		else if(tab_selectionnee == tab_opacity){
			min_op = parseInt(edit_min_opacity.text)
			max_op = parseInt(edit_max_opacity.text)
			random_two_factor("opacity",min_op,max_op,0,100)
		}
		else if(tab_selectionnee == tab_position){
			min_x = parseInt(edit_min_width1.text)
			max_x = parseInt(edit_max_width1.text)
			min_y = parseInt(edit_min_width2.text)
			max_y = parseInt(edit_max_width2.text)
			random_translation(min_x,max_x,min_y,max_y)
		}
		else if(tab_selectionnee == tab_selection){
			pourcentage = parseInt(edit_selection.text)
			random_selection(pourcentage)
		}
		else if(tab_selectionnee == tab_ordre){
			random_order()
		}
		else if(MySelection instanceof Array){
			if(tab_selectionnee == tab_fill_colour){
				random_color("fill")
			} else if(tab_selectionnee == tab_stroke_colour){
				random_color("stroke")
			}
		}
		app.redraw()
	})
	
	palette.show();

}());

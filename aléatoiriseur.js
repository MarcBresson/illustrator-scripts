#targetengine "main"

function random_color(type){
	var script = 'selSwatches = MyDoc.swatches.getSelected();\n'+
'type = "'+type+'";\n'+
'	if(selSwatches.length != 0){\n'+
'		for(i=0; i<MySelection.length; i++){\n'+
'			SelectedItem = MySelection[i];\n'+
'			if(SelectedItem.typename == "PathItem" || SelectedItem.typename == "CompoundPathItem"){\n'+
'				swatchIndex = Math.round( Math.random() * (selSwatches.length - 1 ));\n'+

'			if (type == "fill"){\n'+
'				SelectedItem.filled = true;\n'+
'				if(SelectedItem.typename == "PathItem"){\n'+
'					SelectedItem.fillColor = selSwatches[swatchIndex].color;\n'+
'					} else {\n'+
'						SelectedItem.pathItems[0].fillColor = selSwatches[swatchIndex].color;\n'+
'					}\n'+
'				} \n'+

'				else if (type == "stroke"){\n'+
'					SelectedItem.stroked = true;\n'+
'					if(SelectedItem.typename == "PathItem")\n'+
'						SelectedItem.strokeColor = selSwatches[swatchIndex].color;\n'+
'					else\n'+
'						SelectedItem.pathItems[0].strokeColor = selSwatches[swatchIndex].color;\n'+
'				}\n'+
'			}\n'+
'		}\n'+
'	}\n'
	return script
}

function random_two_factors(type, minimum, maximum, step, min_minimum, max_maximum){
if(minimum > maximum){
		temp = minimum;
		minimum = maximum;
		maximum = temp;
	}
	if (min_minimum != undefined){
		minimum = Math.min(minimum, min_minimum);
	}
	if (max_maximum != undefined){
		maximum = Math.max(maximum, max_maximum);
	}

	var script = 
	'type = "'+type+'"\n'+
	'for (var i = 0; i < MySelection.length; i++){\n'+
	'	SelectedItem = MySelection[i];\n'+
	'	nbr_random = nombre_random('+minimum+', '+maximum+', '+step+');\n'+
	'	if(type == "opacity"){\n'+
	'		SelectedItem.opacity = nbr_random;\n'+
	'	} else if (type == "rotation"){\n'+
	'		SelectedItem.rotate(nbr_random, nbr_random);\n'+
	'	} else if (type == "stroke_weight"){\n'+
	'		SelectedItem.strokeWidth = nbr_random;\n'+
	'	}\n'+
	'}\n'
	return script
}

function random_4_factors(type, x_min, x_max, y_min, y_max, step){
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

	var script = 'type = "'+type+'"\n'+
	'step = '+step+'\n'+
	'for(i=0; i<MySelection.length; i++){\n'+
	'	SelectedItem = MySelection[i];\n'+
	'	x = nombre_random('+x_min+','+x_max+', step);\n'+
	'	y = nombre_random('+y_min+','+y_max+', step);\n'+
	'	if(type == "position"){\n'+
	'		SelectedItem.translate(x,y);\n'+
	'	} else if (type == "scale"){\n'+
	'		SelectedItem.resize(x,y);\n'+
	'	}\n'+
	'}'
	return script
}

function random_order(){
	var script = 'for(i=0; i<MySelection.length; i++){\n'+
	'	SelectedItem = MySelection[i];\n'+
	'	indice = Math.floor(Math.random()*(MySelection.length - i));\n'+
	'	MySelection[indice].zOrder(ZOrderMethod.SENDTOBACK);\n'+
	'}\n'
	return script
}

function random_selection(pourcentage){
	var script = 'var nbr_items_to_deselect = Math.round(MySelection.length * (1 - '+pourcentage+' / 100));\n'+
	'var items_to_deselect = [];\n'+
	'for (var i = 0; i < MySelection.length; i++) {\n'+
	'	items_to_deselect.push(i);\n'+
	'}\n'+
	'while (items_to_deselect.length > nbr_items_to_deselect){\n'+
	'	index = Math.floor(Math.random()*(items_to_deselect.length));\n'+
	'	items_to_deselect.splice(index, 1);\n'+
	'}\n'+
	'for(i = items_to_deselect.length-1; i >= 0 ; i --){\n'+
	'	MySelection[items_to_deselect[i]].selected = false;\n'+
	'}\n'
	return script
}

function random_blendmode(blendmodeList){
	var script = 'blendmodeList = ['+ blendmodeList.join(",") +']\n'+
	'for(i=0; i<MySelection.length; i++){\n'+
	'	SelectedItem = MySelection[i];\n'+
	'	indice = Math.floor(Math.random()*(blendmodeList.length));\n'+
	'	MySelection[i].blendingMode = blendmodeList[indice];\n'+
	'}\n'
	return script
}


var palette = (function () {
  
	// PALETTE
	// =======
	var palette = new Window("palette", undefined, undefined, {closeButton: true, resizeable: true}); 
		palette.text = "aléatoiriseur"; 
		palette.orientation = "column"; 
		palette.alignChildren = ["center","top"]; 
		palette.spacing = 10; 
		palette.margins = 15; 
  
	// TABPANEL
	// ========
	var tabpanel = palette.add("group", undefined, undefined, {name: "tabpanel"}); 
		tabpanel.alignChildren = ["left","fill"]; 
	var tabpanel_nav = tabpanel.add ("listbox", undefined, ['fill color','stroke color','stroke weight','scale','position','rotation','opacity','selection','ordre','blend mode']); 
	var tabpanel_innerwrap = tabpanel.add("group") 
		tabpanel_innerwrap.alignment = ["fill","fill"]; 
		tabpanel_innerwrap.orientation = ["stack"]; 
  
	// TAB_FILL_COLOUR
	// ===============
	var tab_fill_colour = tabpanel_innerwrap.add("group", undefined, {name: "tab_fill_colour"}); 
		tab_fill_colour.text = "fill color";
  
	var color_swatch = tab_fill_colour.add("statictext", undefined, undefined, {name: "color_swatch"}); 
		color_swatch.text = "select a colour swatch"; 
		color_swatch.justify = "center"; 
  
	// TAB_STROKE_COLOUR
	// =================
	var tab_stroke_colour = tabpanel_innerwrap.add("group", undefined, {name: "tab_stroke_colour"}); 
		tab_stroke_colour.text = "stroke color";
  
	var color_swatch1 = tab_stroke_colour.add("statictext", undefined, undefined, {name: "color_swatch1"}); 
		color_swatch1.text = "select a colour swatch"; 
		color_swatch1.justify = "center"; 
  
	// TAB_STROKE_WEIGHT
	// =================
	var tab_stroke_weight = tabpanel_innerwrap.add("group", undefined, {name: "tab_stroke_weight"}); 
		tab_stroke_weight.text = "stroke weight";
  
	// PANEL1
	// ======
	var panel1 = tab_stroke_weight.add("panel", undefined, undefined, {name: "panel1"}); 
		panel1.text = "weight";
  
	var text_min_weight = panel1.add("statictext", undefined, undefined, {name: "text_min_weight"}); 
		text_min_weight.text = "min (px) : "; 
  
	var edit_min_weight = panel1.add('edittext {properties: {name: "edit_min_weight"}}'); 
		edit_min_weight.preferredSize.width = 50; 
  
	var text_max_weight = panel1.add("statictext", undefined, undefined, {name: "text_max_weight"}); 
		text_max_weight.text = "max (px) : "; 
  
	var edit_max_weight = panel1.add('edittext {properties: {name: "edit_max_weight"}}'); 
		edit_max_weight.preferredSize.width = 50; 
  
	// GROUP1
	// ======
	var group1 = tab_stroke_weight.add("group", undefined, {name: "group1"}); 
		group1.orientation = "row";
  
	// var checkbox_strokes = group1.add("checkbox", undefined, undefined, {name: "checkbox_strokes"}); 
	// 	checkbox_strokes.enabled = false; 
	// 	checkbox_strokes.text = "Only apply to items already stroked"; 
  
	// TAB_SCALE
	// =========
	var tab_scale = tabpanel_innerwrap.add("group", undefined, {name: "tab_scale"}); 
		tab_scale.text = "scale";
  
	// PANEL_UNIFORM
	// =============
	var panel_uniform = tab_scale.add("panel", undefined, undefined, {name: "panel_uniform"}); 
		panel_uniform.text = "uniform";
  
	var text_min_uni_scale = panel_uniform.add("statictext", undefined, undefined, {name: "text_min_uni_scale"}); 
		text_min_uni_scale.text = "min (%) : "; 
  
	var edit_min_uni_scale = panel_uniform.add('edittext {properties: {name: "edit_min_uni_scale"}}'); 
		edit_min_uni_scale.preferredSize.width = 50; 
  
	var text_max_uni_scale = panel_uniform.add("statictext", undefined, undefined, {name: "text_max_uni_scale"}); 
		text_max_uni_scale.text = "max (%) : "; 
  
	var edit_max_uni_scale = panel_uniform.add('edittext {properties: {name: "edit_max_uni_scale"}}'); 
		edit_max_uni_scale.preferredSize.width = 50; 
  
	// TAB_SCALE
	// =========
	var checkbox_uniform = tab_scale.add("checkbox", undefined, undefined, {name: "checkbox_uniform"}); 
		checkbox_uniform.text = "uniform"; 
		checkbox_uniform.value = true; 
  
	// GROUP2
	// ======
	var group2 = tab_scale.add("group", undefined, {name: "group2"}); 
		group2.orientation = "row";
  
	// PANEL_HORIZONTAL
	// ================
	var panel_horizontal = tab_scale.add("panel", undefined, undefined, {name: "panel_horizontal"}); 
		panel_horizontal.text = "horizontal";
  
	var text_min_x_scale = panel_horizontal.add("statictext", undefined, undefined, {name: "text_min_x_scale"}); 
		text_min_x_scale.text = "min (%) : "; 
  
	var edit_min_x_scale = panel_horizontal.add('edittext {properties: {name: "edit_min_x_scale"}}'); 
		edit_min_x_scale.preferredSize.width = 50; 
  
	var text_max_x_scale = panel_horizontal.add("statictext", undefined, undefined, {name: "text_max_x_scale"}); 
		text_max_x_scale.text = "max (%) : "; 
  
	var edit_max_x_scale = panel_horizontal.add('edittext {properties: {name: "edit_max_x_scale"}}'); 
		edit_max_x_scale.preferredSize.width = 50; 
  
	// PANEL_VERTICAL
	// ==============
	var panel_vertical = tab_scale.add("panel", undefined, undefined, {name: "panel_vertical"});
	panel_vertical.text = "vertical";
  
	var text_min_y_scale = panel_vertical.add("statictext", undefined, undefined, {name: "text_min_y_scale"}); 
		text_min_y_scale.text = "min (%) : "; 
  
	var edit_min_y_scale = panel_vertical.add('edittext {properties: {name: "edit_min_y_scale"}}'); 
		edit_min_y_scale.preferredSize.width = 50; 
  
	var text_max_y_scale = panel_vertical.add("statictext", undefined, undefined, {name: "text_max_y_scale"}); 
		text_max_y_scale.text = "max (%) : "; 
  
	var edit_max_y_scale = panel_vertical.add('edittext {properties: {name: "edit_max_y_scale"}}'); 
		edit_max_y_scale.preferredSize.width = 50; 
  
	// TAB_POSITION
	// ============
	var tab_position = tabpanel_innerwrap.add("group", undefined, {name: "tab_position"}); 
		tab_position.text = "position";
  
	// PANEL_UNIFORM1
	// ==============
	var panel_uniform1 = tab_position.add("panel", undefined, undefined, {name: "panel_uniform1"}); 
		panel_uniform1.text = "uniform";
  
	var text_min_uni_position = panel_uniform1.add("statictext", undefined, undefined, {name: "text_min_uni_position"}); 
		text_min_uni_position.text = "min (px) : "; 
  
	var edit_min_uni_position = panel_uniform1.add('edittext {properties: {name: "edit_min_uni_position"}}'); 
		edit_min_uni_position.preferredSize.width = 50; 
  
	var text_max_uni_position = panel_uniform1.add("statictext", undefined, undefined, {name: "text_max_uni_position"}); 
		text_max_uni_position.text = "max (px) : "; 
  
	var edit_max_uni_position = panel_uniform1.add('edittext {properties: {name: "edit_max_uni_position"}}'); 
		edit_max_uni_position.preferredSize.width = 50; 
  
	// TAB_POSITION
	// ============
	var checkbox_uniform1 = tab_position.add("checkbox", undefined, undefined, {name: "checkbox_uniform1"}); 
		checkbox_uniform1.text = "uniform"; 
		checkbox_uniform1.value = true; 

	// GROUP3
	// ======
	var group3 = tab_position.add("group", undefined, {name: "group3"}); 
		group3.orientation = "row";
  
	// PANEL_HORIZONTAL1
	// =================
	var panel_horizontal1 = tab_position.add("panel", undefined, undefined, {name: "panel_horizontal1"}); 
		panel_horizontal1.text = "horizontal";
  
	var text_min_x_position = panel_horizontal1.add("statictext", undefined, undefined, {name: "text_min_x_position"}); 
		text_min_x_position.text = "min (px) : "; 
  
	var edit_min_x_position = panel_horizontal1.add('edittext {properties: {name: "edit_min_x_position"}}'); 
		edit_min_x_position.preferredSize.width = 50; 
  
	var text_max_x_position = panel_horizontal1.add("statictext", undefined, undefined, {name: "text_max_x_position"}); 
		text_max_x_position.text = "max (px) : "; 
  
	var edit_max_x_position = panel_horizontal1.add('edittext {properties: {name: "edit_max_x_position"}}'); 
		edit_max_x_position.preferredSize.width = 50; 
  
	// PANEL_VERTICAL1
	// ===============
	var panel_vertical1 = tab_position.add("panel", undefined, undefined, {name: "panel_vertical1"}); 
		panel_vertical1.text = "vertical";
  
	var text_min_y_position = panel_vertical1.add("statictext", undefined, undefined, {name: "text_min_y_position"}); 
		text_min_y_position.text = "min (px) : "; 
  
	var edit_min_y_position = panel_vertical1.add('edittext {properties: {name: "edit_min_y_position"}}'); 
		edit_min_y_position.preferredSize.width = 50; 
  
	var text_max_y_position = panel_vertical1.add("statictext", undefined, undefined, {name: "text_max_y_position"}); 
		text_max_y_position.text = "max (px) : "; 
  
	var edit_max_y_position = panel_vertical1.add('edittext {properties: {name: "edit_max_y_position"}}'); 
		edit_max_y_position.preferredSize.width = 50; 
  
	// TAB_ROTATION
	// ============
	var tab_rotation = tabpanel_innerwrap.add("group", undefined, {name: "tab_rotation"}); 
		tab_rotation.text = "rotation";
  
	// PANEL2
	// ======
	var panel2 = tab_rotation.add("panel", undefined, undefined, {name: "panel2"}); 
		panel2.text = "rotation";
  
	var text_min_deg = panel2.add("statictext", undefined, undefined, {name: "text_min_deg"}); 
		text_min_deg.text = "min (deg) : "; 
  
	var edit_min_rot = panel2.add('edittext {properties: {name: "edit_min_rot"}}'); 
		edit_min_rot.preferredSize.width = 50; 
  
	var text_max_deg = panel2.add("statictext", undefined, undefined, {name: "text_max_deg"}); 
		text_max_deg.text = "max (deg) : "; 
  
	var edit_max_rot = panel2.add('edittext {properties: {name: "edit_max_rot"}}'); 
		edit_max_rot.preferredSize.width = 50; 
  
	// TAB_OPACITY
	// ===========
	var tab_opacity = tabpanel_innerwrap.add("group", undefined, {name: "tab_opacity"}); 
		tab_opacity.text = "opacity";
  
	// PANEL3
	// ======
	var panel3 = tab_opacity.add("panel", undefined, undefined, {name: "panel3"}); 
		panel3.text = "opacity";
  
	var text_min_opacity = panel3.add("statictext", undefined, undefined, {name: "text_min_opacity"}); 
		text_min_opacity.text = "min (%) : "; 
  
	var edit_min_opacity = panel3.add('edittext {properties: {name: "edit_min_opacity"}}'); 
		edit_min_opacity.preferredSize.width = 50; 
  
	var text_max_opacity = panel3.add("statictext", undefined, undefined, {name: "text_max_opacity"}); 
		text_max_opacity.text = "max (%) : "; 
  
	var edit_max_opacity = panel3.add('edittext {properties: {name: "edit_max_opacity"}}'); 
		edit_max_opacity.preferredSize.width = 50; 
  
	// TAB_SELECTION
	// =============
	var tab_selection = tabpanel_innerwrap.add("group", undefined, {name: "tab_selection"}); 
		tab_selection.text = "selection";
  
	// GROUP_SELECTION
	// ===============
	var group_selection = tab_selection.add("group", undefined, {name: "group_selection"});
  
	var text_selection = group_selection.add("statictext", undefined, undefined, {name: "text_selection"}); 
		text_selection.text = "selection to keep (%) : "; 
  
	var edit_selection = group_selection.add('edittext {properties: {name: "edit_selection"}}'); 
		edit_selection.preferredSize.width = 50; 
  
	// TAB_ORDRE
	// =========
	var tab_ordre = tabpanel_innerwrap.add("group", undefined, {name: "tab_ordre"}); 
		tab_ordre.text = "ordre";
  
	var text_make_selection = tab_ordre.add("statictext", undefined, undefined, {name: "text_make_selection"}); 
		text_make_selection.text = "make a selection"; 
  
	// TAB_BLENDMODE
	// =============
	var tab_blendmode = tabpanel_innerwrap.add("group", undefined, {name: "tab_blendmode"});
		tab_blendmode.text = "blend mode";
  
		var statictext1 = tab_blendmode.add("statictext", undefined, undefined, {name: "statictext1"}); 
		statictext1.text = "use ctrl or shift to select mutiple"; 

	var group_blendmode = tab_blendmode.add("group", undefined, {name: "group_blendmode"}); 
  
	var listbox_blendmode_array = ["Normal","Darken","Multiply","Colour burn","Lighten","Screen","Colour dodge"];
	var listbox_blendmode = group_blendmode.add("listbox", undefined, undefined, {name: "listbox_blendmode", items: listbox_blendmode_array, multiselect: true}); 
  
	var listbox_blendmode1_array = ["Overlay","Soft light","Hard light"];
	var listbox_blendmode1 = group_blendmode.add("listbox", undefined, undefined, {name: "listbox_blendmode1", items: listbox_blendmode1_array, multiselect: true}); 
	
	var listbox_blendmode2_array = ["Difference","Exclusion","Hue","Saturation","Colour","Luminosity"]; 
	var listbox_blendmode2 = group_blendmode.add("listbox", undefined, undefined, {name: "listbox_blendmode2", items: listbox_blendmode2_array, multiselect: true}); 
  

	// GROUP5
	// ======
	var group5 = palette.add("group", undefined, {name: "group5"});
  
	// GROUP6
	// ======
	var group6 = group5.add("group", undefined, {name: "group6"});
  
	var text_step = group6.add("statictext", undefined, undefined, {name: "text_step"}); 
		text_step.text = "step : "; 
  
	var edit_step = group6.add('edittext {justify: "right", properties: {name: "edit_step"}}'); 
		edit_step.text = "1"; 
		edit_step.preferredSize.width = 50; 
  
	var text_step_unit = group6.add("statictext", undefined, undefined, {name: "step_unit"}); 
		text_step_unit.text = "px"; 
		text_step_unit.preferredSize.width = 30;
  
	// GROUP_BUTTON
	// ============
	var group_button = group5.add("group", undefined, {name: "group_button"}); 
		group_button.orientation = "row"; 
		group_button.alignChildren = ["right","bottom"]; 
		group_button.spacing = 10; 
		group_button.margins = 0; 
  
	var close = group_button.add("button", undefined, undefined, {name: "close"}); 
	close.text = "close"; 
  
	var apply = group_button.add("button", undefined, undefined, {name: "apply"}); 
		apply.text = "apply"; 
  


	// TABPANEL
	// ========
	groups_panel = [panel_uniform,panel_horizontal,panel_vertical, panel_uniform1,panel_horizontal1,panel_vertical1,group_selection, group_blendmode,panel1,panel2,panel3,group1,group2,group3,group5,group6]
	tabpanel_tabs = [tab_fill_colour,tab_stroke_colour,tab_stroke_weight,tab_scale,tab_position,tab_rotation,tab_opacity,tab_selection,tab_ordre,tab_blendmode]; 
	tabpanel_tabs_step_units = [undefined,undefined,"px","%","px","deg","%",undefined,undefined,undefined]; 

	for (var i = 0; i < groups_panel.length; i++) { 
		groups_panel[i].orientation = "row"; 
		groups_panel[i].alignChildren = ["left","center"]; 
		groups_panel[i].spacing = 10; 
		groups_panel[i].margins = 10; 
	}
	group5.orientation = "column";

	for (var i = 0; i < tabpanel_tabs.length; i++) { 
		tabpanel_tabs[i].alignment = ["fill","fill"]; 
		tabpanel_tabs[i].visible = false;
		tabpanel_tabs[i].orientation = "column"; 
		tabpanel_tabs[i].alignChildren = ["left","top"]; 
		tabpanel_tabs[i].spacing = 10; 
		tabpanel_tabs[i].margins = [15,0,0,0]; 
	}

	for (var i = 0; i < tabpanel_tabs.length; i++) { 
	  tabpanel_tabs[i].alignment = ["fill","fill"]; 
	  tabpanel_tabs[i].visible = false; 
	} 
  
	tabpanel_nav.onChange = showTab_tabpanel; 
  
	function showTab_tabpanel() { 
	  if ( tabpanel_nav.selection !== null ) { 
		for (var i = tabpanel_tabs.length-1; i >= 0; i--) { 
		  tabpanel_tabs[i].visible = false; 
		}
		index_selected = tabpanel_nav.selection.index
		tab_selectionnee = tabpanel_tabs[index_selected]
		tab_selectionnee.visible = true;
		step_unit = tabpanel_tabs_step_units[index_selected]
		if (step_unit != undefined){
			group6.visible = true;
			text_step_unit.text = step_unit;
		} else {
			group6.visible = false;
		}
	  } 
	} 
  
	tabpanel_nav.selection = 0; 
	showTab_tabpanel();
  
	close.addEventListener("click",function(){
		palette.close();
	});

	apply.addEventListener("click",function(){
		var bt = new BridgeTalk;
		bt.target = "illustrator";

		script = "MyDoc = app.activeDocument;\n"+
		"MySelection = MyDoc.selection;\n\n"+
		"function nombre_random(min, max, step){\n"+
		"	return  Math.floor(Math.random() * (max - min + 1) / step) * step + min;\n"+
		"}\n\n"

		step = parseFloat(edit_step.text)

		if(tab_selectionnee == tab_fill_colour){
			script += random_color("fill")
		}
		else if(tab_selectionnee == tab_stroke_colour){
			script += random_color("stroke")
		}
		else if(tab_selectionnee == tab_stroke_weight){
			min_ep = parseFloat(edit_min_weight.text)
			max_ep = parseFloat(edit_max_weight.text)
			script += random_two_factors("stroke_weight",min_ep,max_ep,step,0)
		}
		else if(tab_selectionnee == tab_scale){
			if (checkbox_uniform.value == true){
				min_x = parseFloat(edit_min_uni_scale.text);
				max_x = parseFloat(edit_max_uni_scale.text);
				min_y = min_x;
				max_y = max_x;
			} else {
				min_x = parseFloat(edit_min_x_scale.text)
				max_x = parseFloat(edit_max_x_scale.text)
				min_y = parseFloat(edit_min_y_scale.text)
				max_y = parseFloat(edit_max_y_scale.text)
			}
			script += random_4_factors("scale",min_x,max_x,min_y,max_y,step)
		}
		else if(tab_selectionnee == tab_position){
			if (checkbox_uniform1.value == true){
				min_x = parseFloat(edit_min_uni_position.text);
				max_x = parseFloat(edit_max_uni_position.text);
				min_y = min_x;
				max_y = max_x;
			} else {
				min_x = parseFloat(edit_min_x_position.text)
				max_x = parseFloat(edit_max_x_position.text)
				min_y = parseFloat(edit_min_y_position.text)
				max_y = parseFloat(edit_max_y_position.text)
			}
			script += random_4_factors("position",min_x,max_x,min_y,max_y,step)
		}
		else if(tab_selectionnee == tab_rotation){
			min_rotation = parseFloat(edit_min_rot.text)
			max_rotation = parseFloat(edit_max_rot.text)
			script += random_two_factors("rotation",min_rotation,max_rotation,step)
		}
		else if(tab_selectionnee == tab_opacity){
			min_op = parseFloat(edit_min_opacity.text)
			max_op = parseFloat(edit_max_opacity.text)
			script += random_two_factors("opacity",min_op,max_op,step,0,100)
		}
		else if(tab_selectionnee == tab_selection){
			pourcentage = parseFloat(edit_selection.text)
			script += random_selection(pourcentage)
		}
		else if(tab_selectionnee == tab_ordre){
			script += random_order()
		}
		else if(tab_selectionnee == tab_blendmode){
			real_blendmode_array = {"Normal":BlendModes.NORMAL,"Darken":BlendModes.DARKEN,"Multiply":BlendModes.MULTIPLY,"Colour burn":BlendModes.COLORBURN,"Lighten":BlendModes.LIGHTEN,"Screen":BlendModes.SCREEN,"Colour dodge":BlendModes.COLORDODGE,"Overlay":BlendModes.OVERLAY,"Soft light":BlendModes.SOFTLIGHT,"Hard light":BlendModes.HARDLIGHT,"Difference":BlendModes.DIFFERENCE,"Exclusion":BlendModes.EXCLUSION,"Hue":BlendModes.HUE,"Saturation":BlendModes.SATURATIONBLEND,"Colour":BlendModes.COLORBLEND,"Luminosity":BlendModes.LUMINOSITY};
			selected_blendmodes = [listbox_blendmode.selection,listbox_blendmode1.selection,listbox_blendmode2.selection];
			blendmode_objects = [];
			for (i = 0; i<selected_blendmodes.length; i++) {
				if (selected_blendmodes[i] != null) {
					for (ii = 0; ii<selected_blendmodes[i].length; ii++) {
						blendmode_objects.push(real_blendmode_array[selected_blendmodes[i][ii]]);
					}
				}
			}
			script += random_blendmode(blendmode_objects);
		}

		bt.body = script + "\n app.redraw();";
    	bt.send();
	})

	palette.show();
  
	return palette;
  
  }());

#targetengine "main"

function random_color_set(type){
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

function random_color_range(type, min_hue, max_hue, min_sat, max_sat, min_val, max_val, step){
	var script = 'function HSVtoRGB(h, s, v) {\n'+
'		h = h / 360;\n'+
'		s = s / 100;\n'+
'		v = v / 100;\n'+
'		var r, g, b, i, f, p, q, t;\n'+
'		i = Math.floor(h * 6);\n'+
'		f = h * 6 - i;\n'+
'		p = v * (1 - s);\n'+
'		q = v * (1 - f * s);\n'+
'		t = v * (1 - (1 - f) * s);\n'+
'		switch (i % 6) {\n'+
'			case 0: r = v, g = t, b = p; break;\n'+
'			case 1: r = q, g = v, b = p; break;\n'+
'			case 2: r = p, g = v, b = t; break;\n'+
'			case 3: r = p, g = q, b = v; break;\n'+
'			case 4: r = t, g = p, b = v; break;\n'+
'			case 5: r = v, g = p, b = q; break;\n'+
'		}\n'+
'		return {\n'+
'			r: Math.round(r * 255),\n'+
'			g: Math.round(g * 255),\n'+
'			b: Math.round(b * 255)\n'+
'		};\n'+
'	}\n'+
'\n'+
'	type = "'+type+'";\n'+
'	for(i=0; i<MySelection.length; i++){\n'+
'		SelectedItem = MySelection[i];\n'+
'\n'+
'		random_hue = nombre_random('+min_hue+', '+max_hue+', '+step+', 0, 360);\n'+
'		random_sat = nombre_random('+min_sat+', '+max_sat+', '+step+', 0, 100);\n'+
'		random_val = nombre_random('+min_val+', '+max_val+', '+step+', 0, 100);\n'+
'		rgb = HSVtoRGB(random_hue, random_sat, random_val);\n'+
'		color = new RGBColor();\n'+
'		color.red = rgb.r;\n'+
'		color.green = rgb.g;\n'+
'		color.blue = rgb.b;\n'+
'\n'+
'		if (type == "fill"){\n'+
'			SelectedItem.filled = true;\n'+
'			if(SelectedItem.typename == "PathItem"){\n'+
'				SelectedItem.fillColor = color;\n'+
'			} else {\n'+
'				SelectedItem.pathItems[0].fillColor = color;\n'+
'			}\n'+
'		}\n'+
'		else if (type == "stroke"){\n'+
'			SelectedItem.stroked = true;\n'+
'			if(SelectedItem.typename == "PathItem"){\n'+
'				SelectedItem.strokeColor = color;\n'+
'			} else {\n'+
'				SelectedItem.pathItems[0].strokeColor = color;\n'+
'			}\n'+
'		}\n'+
'	}\n'
	return script
}

function random_two_factors(type, minimum, maximum, step, min_minimum, max_maximum){
	var script = 
	'type = "'+type+'"\n'+
	'for (var i = 0; i < MySelection.length; i++){\n'+
	'	SelectedItem = MySelection[i];\n'+
	'	nbr_random = nombre_random('+minimum+', '+maximum+', '+step+',  '+min_minimum+',  '+max_maximum+');\n'+
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

function random_scale(is_uniform, step, x_min, x_max, y_min, y_max){
	var script = 'step = '+step+'\n'+
	'for(i=0; i<MySelection.length; i++){\n'+
	'	SelectedItem = MySelection[i];\n'+
	'	x = nombre_random('+x_min+','+x_max+', step);\n'+
	'	if('+is_uniform+'){\n'+
	'		y = x;\n'+
	'	} else {\n'+
	'		y = nombre_random('+y_min+','+y_max+', step);\n'+
	'	}\n'+
	'	SelectedItem.resize(x,y);\n'+
	'}'
	return script
}

function random_position(step, x_min, x_max, y_min, y_max){
	var script = 'step = '+step+'\n'+
	'for(i=0; i<MySelection.length; i++){\n'+
	'	SelectedItem = MySelection[i];\n'+
	'	x = nombre_random('+x_min+','+x_max+', step);\n'+
	'	y = nombre_random('+y_min+','+y_max+', step);\n'+
	'	SelectedItem.translate(x,y);\n'+
	'}'
	return script
}

function random_order_just_selection(){
	var script = 'function send_to_position(Item,position){\n'+
	'	movements = position - Item.zOrderPosition;\n'+
	'	if(movements !=0){\n'+
	'		n = Math.abs(movements);\n'+
	'		sign = movements/n\n'+
	'		if(sign < 0){\n'+
	'			direction = ZOrderMethod.SENDBACKWARD;\n'+
	'		} else {\n'+
	'			direction = ZOrderMethod.BRINGFORWARD;\n'+
	'		}\n'+
	'		while(n--){\n'+
	'			Item.zOrder(direction);\n'+
	'		}\n'+
	'	}\n'+
	'}\n'+
	'layers = MyDoc.layers;\n'+
	'nbr_items_per_layer = {};\n'+
	'for( i = 0; i < layers.length; i++){\n'+
	'	nbr_items_per_layer[layers[i]] = 0;\n'+
	'}\n'+
	'pathItems = MyDoc.pathItems;\n'+
	'n = pathItems.length;\n'+
	'while( n-- ){\n'+
	'	nbr_items_per_layer[pathItems[n].layer] += 1\n'+
	'}\n'+
	'for(i=0; i<MySelection.length; i++){\n'+
	'	SelectedItem = MySelection[i];\n'+
	'	layer = SelectedItem.layer;\n'+
	'	alert(SelectedItem.layer.name);\n'+
	'	alert(SelectedItem.typename);\n'+
	'	alert(SelectedItem.zOrderPosition);\n'+
	'	order = Math.floor(Math.random()*nbr_items_per_layer[layer]);\n'+
	'	send_to_position(SelectedItem, order);\n'+
	'}\n'
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
	var script = 'var nbr_items_to_deselect = Math.round(MySelection.length * ('+pourcentage+' / 100));\n'+
	'for(i = 0; i < nbr_items_to_deselect ; i ++){\n'+
	'	indice = Math.floor(Math.random()*(MySelection.length));\n'+
	'	MySelection[indice].selected = false;\n'+
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

	var palette = new Window("palette", undefined, undefined, {closeButton: false, resizeable: true}); 
      palette.text = "aleatoiriseur"; 
      palette.orientation = "column"; 
      palette.alignChildren = ["center","top"]; 
      palette.spacing = 10; 
      palette.margins = 15; 
	  
	// TABPANEL
	// ========
	var tabpanel = palette.add("group", undefined, undefined, {name: "tabpanel"}); 
		tabpanel.alignChildren = ["left","fill"]; 
	var tabpanel_nav = tabpanel.add ("listbox", undefined, ['fill color','stroke color','stroke weight','scale','position','rotation','opacity','selection','order','blend mode']); 
	var tabpanel_innerwrap = tabpanel.add("group") 
		tabpanel_innerwrap.alignment = ["fill","fill"]; 
		tabpanel_innerwrap.orientation = ["stack"]; 
  
	// TAB_FILL_COLOUR
	// ===============
	var tab_fill_colour = tabpanel_innerwrap.add("group", undefined, {name: "tab_fill_colour"}); 
		tab_fill_colour.text = "fill color"; 
		tab_fill_colour.orientation = "column"; 
		tab_fill_colour.alignChildren = ["center","top"]; 
		tab_fill_colour.spacing = 10; 
		tab_fill_colour.margins = [15,0,0,0]; 
  
	// TPANEL1
	// =======
	var tpanel1 = tab_fill_colour.add("tabbedpanel", undefined, undefined, {name: "tpanel1"}); 
		tpanel1.alignChildren = "fill"; 
		tpanel1.preferredSize.width = 0; 
		tpanel1.margins = 0; 
		tpanel1.alignment = ["fill","top"]; 
  
	// TAB_RANGE
	// =========
	var tab_range = tpanel1.add("tab", undefined, undefined, {name: "tab_range"}); 
		tab_range.text = "range"; 
		tab_range.orientation = "column"; 
		tab_range.alignChildren = ["left","top"]; 
		tab_range.spacing = 0; 
		tab_range.margins = 10; 
  
	// PANEL1
	// ======
	var panel1 = tab_range.add("panel", undefined, undefined, {name: "panel1"}); 
		panel1.text = "hue"; 
		panel1.orientation = "row"; 
		panel1.alignChildren = ["left","top"]; 
		panel1.spacing = 10; 
		panel1.margins = 10; 
		panel1.alignment = ["fill","top"]; 
  
	var statictext1 = panel1.add("statictext", undefined, undefined, {name: "statictext1"}); 
		statictext1.text = "min (deg) :"; 
  
	var edit_fill_min_hue = panel1.add('edittext {properties: {name: "edit_fill_min_hue"}}'); 
		edit_fill_min_hue.text = "0"; 
		edit_fill_min_hue.preferredSize.width = 50; 
  
	var statictext2 = panel1.add("statictext", undefined, undefined, {name: "statictext2"}); 
		statictext2.text = "max (deg) :"; 
  
	var edit_fill_max_hue = panel1.add('edittext {properties: {name: "edit_fill_max_hue"}}'); 
		edit_fill_max_hue.text = "360"; 
		edit_fill_max_hue.preferredSize.width = 50; 
  
	// PANEL2
	// ======
	var panel2 = tab_range.add("panel", undefined, undefined, {name: "panel2"}); 
		panel2.text = "saturation"; 
		panel2.orientation = "row"; 
		panel2.alignChildren = ["left","top"]; 
		panel2.spacing = 10; 
		panel2.margins = 10; 
  
	var statictext3 = panel2.add("statictext", undefined, undefined, {name: "statictext3"}); 
		statictext3.text = "min (%) :"; 
  
	var edit_fill_min_sat = panel2.add('edittext {properties: {name: "edit_fill_min_sat"}}'); 
		edit_fill_min_sat.text = "0"; 
		edit_fill_min_sat.preferredSize.width = 50; 
  
	var statictext4 = panel2.add("statictext", undefined, undefined, {name: "statictext4"}); 
		statictext4.text = "max (%) :"; 
  
	var edit_fill_max_sat = panel2.add('edittext {properties: {name: "edit_fill_max_sat"}}'); 
		edit_fill_max_sat.text = "100"; 
		edit_fill_max_sat.preferredSize.width = 50; 
  
	// PANEL3
	// ======
	var panel3 = tab_range.add("panel", undefined, undefined, {name: "panel3"}); 
		panel3.text = "value"; 
		panel3.orientation = "row"; 
		panel3.alignChildren = ["left","top"]; 
		panel3.spacing = 10; 
		panel3.margins = 10; 
  
	var statictext5 = panel3.add("statictext", undefined, undefined, {name: "statictext5"}); 
		statictext5.text = "min (%) :"; 
  
	var edit_fill_min_val = panel3.add('edittext {properties: {name: "edit_fill_min_val"}}'); 
		edit_fill_min_val.text = "0"; 
		edit_fill_min_val.preferredSize.width = 50; 
  
	var statictext6 = panel3.add("statictext", undefined, undefined, {name: "statictext6"}); 
		statictext6.text = "max (%) :"; 
  
	var edit_fill_max_val = panel3.add('edittext {properties: {name: "edit_fill_max_val"}}'); 
		edit_fill_max_val.text = "100"; 
		edit_fill_max_val.preferredSize.width = 50; 
  
	// TAB_SET
	// =======
	var tab_set = tpanel1.add("tab", undefined, undefined, {name: "tab_set"}); 
		tab_set.text = "set"; 
		tab_set.orientation = "column"; 
		tab_set.alignChildren = ["left","top"]; 
		tab_set.spacing = 10; 
		tab_set.margins = 10; 
  
	// TPANEL1
	// =======
	tpanel1.selection = tab_set; 
  
	var statictext7 = tab_set.add("statictext", undefined, undefined, {name: "statictext7"}); 
		statictext7.text = "please, select a color swatch"; 
  
	// TAB_STROKE_COLOUR
	// =================
	var tab_stroke_colour = tabpanel_innerwrap.add("group", undefined, {name: "tab_stroke_colour"}); 
		tab_stroke_colour.text = "stroke color"; 
		tab_stroke_colour.orientation = "column"; 
		tab_stroke_colour.alignChildren = ["center","top"]; 
		tab_stroke_colour.spacing = 10; 
		tab_stroke_colour.margins = [15,0,0,0]; 
  
	// TPANEL2
	// =======
	var tpanel2 = tab_stroke_colour.add("tabbedpanel", undefined, undefined, {name: "tpanel2"}); 
		tpanel2.alignChildren = "fill"; 
		tpanel2.preferredSize.width = 0; 
		tpanel2.margins = 0; 
		tpanel2.alignment = ["fill","top"]; 
  
	// TAB_RANGE1
	// ==========
	var tab_range1 = tpanel2.add("tab", undefined, undefined, {name: "tab_range1"}); 
		tab_range1.text = "range"; 
		tab_range1.orientation = "column"; 
		tab_range1.alignChildren = ["left","top"]; 
		tab_range1.spacing = 0; 
		tab_range1.margins = 10; 
  
	// PANEL4
	// ======
	var panel4 = tab_range1.add("panel", undefined, undefined, {name: "panel4"}); 
		panel4.text = "hue"; 
		panel4.orientation = "row"; 
		panel4.alignChildren = ["left","top"]; 
		panel4.spacing = 10; 
		panel4.margins = 10; 
		panel4.alignment = ["fill","top"]; 
  
	var statictext8 = panel4.add("statictext", undefined, undefined, {name: "statictext8"}); 
		statictext8.text = "min (deg) :"; 
  
	var edit_stroke_min_hue = panel4.add('edittext {properties: {name: "edit_stroke_min_hue"}}'); 
		edit_stroke_min_hue.text = "0"; 
		edit_stroke_min_hue.preferredSize.width = 50; 
  
	var statictext9 = panel4.add("statictext", undefined, undefined, {name: "statictext9"}); 
		statictext9.text = "max (deg) :"; 
  
	var edit_stroke_max_hue = panel4.add('edittext {properties: {name: "edit_stroke_max_hue"}}'); 
		edit_stroke_max_hue.text = "360"; 
		edit_stroke_max_hue.preferredSize.width = 50; 
  
	// PANEL5
	// ======
	var panel5 = tab_range1.add("panel", undefined, undefined, {name: "panel5"}); 
		panel5.text = "saturation"; 
		panel5.orientation = "row"; 
		panel5.alignChildren = ["left","top"]; 
		panel5.spacing = 10; 
		panel5.margins = 10; 
  
	var statictext10 = panel5.add("statictext", undefined, undefined, {name: "statictext10"}); 
		statictext10.text = "min (%) :"; 
  
	var edit_stroke_min_sat = panel5.add('edittext {properties: {name: "edit_stroke_min_sat"}}'); 
		edit_stroke_min_sat.text = "0"; 
		edit_stroke_min_sat.preferredSize.width = 50; 
  
	var statictext11 = panel5.add("statictext", undefined, undefined, {name: "statictext11"}); 
		statictext11.text = "max (%) :"; 
  
	var edit_stroke_max_sat = panel5.add('edittext {properties: {name: "edit_stroke_max_sat"}}'); 
		edit_stroke_max_sat.text = "100"; 
		edit_stroke_max_sat.preferredSize.width = 50; 
  
	// PANEL6
	// ======
	var panel6 = tab_range1.add("panel", undefined, undefined, {name: "panel6"}); 
		panel6.text = "value"; 
		panel6.orientation = "row"; 
		panel6.alignChildren = ["left","top"]; 
		panel6.spacing = 10; 
		panel6.margins = 10; 
  
	var statictext12 = panel6.add("statictext", undefined, undefined, {name: "statictext12"}); 
		statictext12.text = "min (%) :"; 
  
	var edit_stroke_min_val = panel6.add('edittext {properties: {name: "edit_stroke_min_val"}}'); 
		edit_stroke_min_val.text = "0"; 
		edit_stroke_min_val.preferredSize.width = 50; 
  
	var statictext13 = panel6.add("statictext", undefined, undefined, {name: "statictext13"}); 
		statictext13.text = "max (%) :"; 
  
	var edit_stroke_max_val = panel6.add('edittext {properties: {name: "edit_stroke_max_val"}}'); 
		edit_stroke_max_val.text = "100"; 
		edit_stroke_max_val.preferredSize.width = 50; 
  
	// TAB_SET1
	// ========
	var tab_set1 = tpanel2.add("tab", undefined, undefined, {name: "tab_set1"}); 
		tab_set1.text = "set"; 
		tab_set1.orientation = "column"; 
		tab_set1.alignChildren = ["left","top"]; 
		tab_set1.spacing = 10; 
		tab_set1.margins = 10; 
  
	// TPANEL2
	// =======
	tpanel2.selection = tab_range1; 
  
	var statictext14 = tab_set1.add("statictext", undefined, undefined, {name: "statictext14"}); 
		statictext14.text = "please, select a color swatch"; 
  
	// TAB_STROKE_WEIGHT
	// =================
	var tab_stroke_weight = tabpanel_innerwrap.add("group", undefined, {name: "tab_stroke_weight"}); 
		tab_stroke_weight.text = "stroke weight"; 
		tab_stroke_weight.orientation = "column"; 
		tab_stroke_weight.alignChildren = ["fill","top"]; 
		tab_stroke_weight.spacing = 10; 
		tab_stroke_weight.margins = [15,0,0,0]; 
  
	// PANEL7
	// ======
	var panel7 = tab_stroke_weight.add("panel", undefined, undefined, {name: "panel7"}); 
		panel7.text = "weight"; 
		panel7.orientation = "row"; 
		panel7.alignChildren = ["left","top"]; 
		panel7.spacing = 10; 
		panel7.margins = 10; 
  
	var text_min_weight = panel7.add("statictext", undefined, undefined, {name: "text_min_weight"}); 
		text_min_weight.text = "2"; 
		text_min_weight.text = "min (px) : "; 
  
	var edit_min_weight = panel7.add('edittext {properties: {name: "edit_min_weight"}}'); 
		edit_min_weight.preferredSize.width = 50; 
  
	var text_max_weight = panel7.add("statictext", undefined, undefined, {name: "text_max_weight"}); 
		text_max_weight.text = "20"; 
		text_max_weight.text = "max (px) : "; 
  
	var edit_max_weight = panel7.add('edittext {properties: {name: "edit_max_weight"}}'); 
		edit_max_weight.preferredSize.width = 50; 
  
	// GROUP1
	// ======
	var group1 = tab_stroke_weight.add("group", undefined, {name: "group1"}); 
		group1.orientation = "row"; 
		group1.alignChildren = ["left","center"]; 
		group1.spacing = 10; 
		group1.margins = 0; 
  
	var checkbox_strokes = group1.add("checkbox", undefined, undefined, {name: "checkbox_strokes"}); 
		checkbox_strokes.enabled = false; 
		checkbox_strokes.text = "Only apply to items already stroked"; 
  
	// TAB_SCALE
	// =========
	var tab_scale = tabpanel_innerwrap.add("group", undefined, {name: "tab_scale"}); 
		tab_scale.text = "scale"; 
		tab_scale.orientation = "column"; 
		tab_scale.alignChildren = ["fill","top"]; 
		tab_scale.spacing = 10; 
		tab_scale.margins = [15,0,0,0]; 
  
	// PANEL_UNIFORM
	// =============
	var panel_uniform = tab_scale.add("panel", undefined, undefined, {name: "panel_uniform"}); 
		panel_uniform.text = "uniform"; 
		panel_uniform.orientation = "row"; 
		panel_uniform.alignChildren = ["left","top"]; 
		panel_uniform.spacing = 10; 
		panel_uniform.margins = 10; 
  
	var text_min_uni_scale = panel_uniform.add("statictext", undefined, undefined, {name: "text_min_uni_scale"}); 
		text_min_uni_scale.text = "min (%) : "; 
  
	var edit_min_uni_scale = panel_uniform.add('edittext {properties: {name: "edit_min_uni_scale"}}'); 
		edit_min_uni_scale.text = "80"; 
		edit_min_uni_scale.preferredSize.width = 50; 
  
	var text_max_uni_scale = panel_uniform.add("statictext", undefined, undefined, {name: "text_max_uni_scale"}); 
		text_max_uni_scale.text = "max (%) : "; 
  
	var edit_max_uni_scale = panel_uniform.add('edittext {properties: {name: "edit_max_uni_scale"}}'); 
		edit_max_uni_scale.text = "120"; 
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
		group2.alignChildren = ["left","center"]; 
		group2.spacing = 10; 
		group2.margins = 0; 
  
	// PANEL_HORIZONTAL
	// ================
	var panel_horizontal = tab_scale.add("panel", undefined, undefined, {name: "panel_horizontal"}); 
		panel_horizontal.text = "horizontal"; 
		panel_horizontal.orientation = "row"; 
		panel_horizontal.alignChildren = ["left","top"]; 
		panel_horizontal.spacing = 10; 
		panel_horizontal.margins = 10; 
  
	var text_min_x_scale = panel_horizontal.add("statictext", undefined, undefined, {name: "text_min_x_scale"}); 
		text_min_x_scale.text = "min (%) : "; 
  
	var edit_min_x_scale = panel_horizontal.add('edittext {properties: {name: "edit_min_x_scale"}}'); 
		edit_min_x_scale.text = "30"; 
		edit_min_x_scale.preferredSize.width = 50; 
  
	var text_max_x_scale = panel_horizontal.add("statictext", undefined, undefined, {name: "text_max_x_scale"}); 
		text_max_x_scale.text = "max (%) : "; 
  
	var edit_max_x_scale = panel_horizontal.add('edittext {properties: {name: "edit_max_x_scale"}}'); 
		edit_max_x_scale.text = "50"; 
		edit_max_x_scale.preferredSize.width = 50; 
  
	// PANEL_VERTICAL
	// ==============
	var panel_vertical = tab_scale.add("panel", undefined, undefined, {name: "panel_vertical"}); 
		panel_vertical.text = "vertical"; 
		panel_vertical.orientation = "row"; 
		panel_vertical.alignChildren = ["left","top"]; 
		panel_vertical.spacing = 10; 
		panel_vertical.margins = 10; 
  
	var text_min_y_scale = panel_vertical.add("statictext", undefined, undefined, {name: "text_min_y_scale"}); 
		text_min_y_scale.text = "min (%) : "; 
  
	var edit_min_y_scale = panel_vertical.add('edittext {properties: {name: "edit_min_y_scale"}}'); 
		edit_min_y_scale.text = "150"; 
		edit_min_y_scale.preferredSize.width = 50; 
  
	var text_max_y_scale = panel_vertical.add("statictext", undefined, undefined, {name: "text_max_y_scale"}); 
		text_max_y_scale.text = "max (%) : "; 
  
	var edit_max_y_scale = panel_vertical.add('edittext {properties: {name: "edit_max_y_scale"}}'); 
		edit_max_y_scale.text = "300"; 
		edit_max_y_scale.preferredSize.width = 50; 
  
	// TAB_POSITION
	// ============
	var tab_position = tabpanel_innerwrap.add("group", undefined, {name: "tab_position"}); 
		tab_position.text = "position"; 
		tab_position.orientation = "column"; 
		tab_position.alignChildren = ["left","top"]; 
		tab_position.spacing = 10; 
		tab_position.margins = [15,0,0,0]; 
  
	// PANEL_UNIFORM1
	// ==============
	var panel_uniform1 = tab_position.add("panel", undefined, undefined, {name: "panel_uniform1"}); 
		panel_uniform1.text = "uniform"; 
		panel_uniform1.orientation = "row"; 
		panel_uniform1.alignChildren = ["left","top"]; 
		panel_uniform1.spacing = 10; 
		panel_uniform1.margins = 10; 
  
	var text_min_uni_position = panel_uniform1.add("statictext", undefined, undefined, {name: "text_min_uni_position"}); 
		text_min_uni_position.text = "min (px) : "; 
  
	var edit_min_uni_position = panel_uniform1.add('edittext {properties: {name: "edit_min_uni_position"}}'); 
		edit_min_uni_position.text = "-20"; 
		edit_min_uni_position.preferredSize.width = 50; 
  
	var text_max_uni_position = panel_uniform1.add("statictext", undefined, undefined, {name: "text_max_uni_position"}); 
		text_max_uni_position.text = "max (px) : "; 
  
	var edit_max_uni_position = panel_uniform1.add('edittext {properties: {name: "edit_max_uni_position"}}'); 
		edit_max_uni_position.text = "20"; 
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
		group3.alignChildren = ["left","center"]; 
		group3.spacing = 10; 
		group3.margins = 0; 
  
	// PANEL_HORIZONTAL1
	// =================
	var panel_horizontal1 = tab_position.add("panel", undefined, undefined, {name: "panel_horizontal1"}); 
		panel_horizontal1.text = "horizontal"; 
		panel_horizontal1.orientation = "row"; 
		panel_horizontal1.alignChildren = ["left","top"]; 
		panel_horizontal1.spacing = 10; 
		panel_horizontal1.margins = 10; 
  
	var text_min_x_position = panel_horizontal1.add("statictext", undefined, undefined, {name: "text_min_x_position"}); 
		text_min_x_position.text = "min (px) : "; 
  
	var edit_min_x_position = panel_horizontal1.add('edittext {properties: {name: "edit_min_x_position"}}'); 
		edit_min_x_position.text = "-50"; 
		edit_min_x_position.preferredSize.width = 50; 
  
	var text_max_x_position = panel_horizontal1.add("statictext", undefined, undefined, {name: "text_max_x_position"}); 
		text_max_x_position.text = "max (px) : "; 
  
	var edit_max_x_position = panel_horizontal1.add('edittext {properties: {name: "edit_max_x_position"}}'); 
		edit_max_x_position.text = "-20"; 
		edit_max_x_position.preferredSize.width = 50; 
  
	// PANEL_VERTICAL1
	// ===============
	var panel_vertical1 = tab_position.add("panel", undefined, undefined, {name: "panel_vertical1"}); 
		panel_vertical1.text = "vertical"; 
		panel_vertical1.orientation = "row"; 
		panel_vertical1.alignChildren = ["left","top"]; 
		panel_vertical1.spacing = 10; 
		panel_vertical1.margins = 10; 
  
	var text_min_y_position = panel_vertical1.add("statictext", undefined, undefined, {name: "text_min_y_position"}); 
		text_min_y_position.text = "min (px) : "; 
  
	var edit_min_y_position = panel_vertical1.add('edittext {properties: {name: "edit_min_y_position"}}'); 
		edit_min_y_position.text = "0"; 
		edit_min_y_position.preferredSize.width = 50; 
  
	var text_max_y_position = panel_vertical1.add("statictext", undefined, undefined, {name: "text_max_y_position"}); 
		text_max_y_position.text = "max (px) : "; 
  
	var edit_max_y_position = panel_vertical1.add('edittext {properties: {name: "edit_max_y_position"}}'); 
		edit_max_y_position.text = "30"; 
		edit_max_y_position.preferredSize.width = 50; 
  
	// TAB_ROTATION
	// ============
	var tab_rotation = tabpanel_innerwrap.add("group", undefined, {name: "tab_rotation"}); 
		tab_rotation.text = "rotation"; 
		tab_rotation.orientation = "column"; 
		tab_rotation.alignChildren = ["fill","top"]; 
		tab_rotation.spacing = 10; 
		tab_rotation.margins = [15,0,0,0]; 
  
	// PANEL8
	// ======
	var panel8 = tab_rotation.add("panel", undefined, undefined, {name: "panel8"}); 
		panel8.text = "rotation"; 
		panel8.orientation = "row"; 
		panel8.alignChildren = ["left","top"]; 
		panel8.spacing = 10; 
		panel8.margins = 10; 
  
	var text_min_deg = panel8.add("statictext", undefined, undefined, {name: "text_min_deg"}); 
		text_min_deg.text = "min (deg) : "; 
  
	var edit_min_rot = panel8.add('edittext {properties: {name: "edit_min_rot"}}'); 
		edit_min_rot.text = "45"; 
		edit_min_rot.preferredSize.width = 50; 
  
	var text_max_deg = panel8.add("statictext", undefined, undefined, {name: "text_max_deg"}); 
		text_max_deg.text = "max (deg) : "; 
  
	var edit_max_rot = panel8.add('edittext {properties: {name: "edit_max_rot"}}'); 
		edit_max_rot.text = "90"; 
		edit_max_rot.preferredSize.width = 50; 
  
	// TAB_OPACITY
	// ===========
	var tab_opacity = tabpanel_innerwrap.add("group", undefined, {name: "tab_opacity"}); 
		tab_opacity.text = "opacity"; 
		tab_opacity.orientation = "column"; 
		tab_opacity.alignChildren = ["left","top"]; 
		tab_opacity.spacing = 10; 
		tab_opacity.margins = [15,0,0,0]; 
  
	// PANEL9
	// ======
	var panel9 = tab_opacity.add("panel", undefined, undefined, {name: "panel9"}); 
		panel9.text = "opacity"; 
		panel9.orientation = "row"; 
		panel9.alignChildren = ["left","top"]; 
		panel9.spacing = 10; 
		panel9.margins = 10; 
  
	var text_min_opacity = panel9.add("statictext", undefined, undefined, {name: "text_min_opacity"}); 
		text_min_opacity.text = "min (%) : "; 
  
	var edit_min_opacity = panel9.add('edittext {properties: {name: "edit_min_opacity"}}'); 
		edit_min_opacity.text = "50"; 
		edit_min_opacity.preferredSize.width = 50; 
  
	var text_max_opacity = panel9.add("statictext", undefined, undefined, {name: "text_max_opacity"}); 
		text_max_opacity.text = "max (%) : "; 
  
	var edit_max_opacity = panel9.add('edittext {properties: {name: "edit_max_opacity"}}'); 
		edit_max_opacity.text = "100"; 
		edit_max_opacity.preferredSize.width = 50; 
  
	// TAB_SELECTION
	// =============
	var tab_selection = tabpanel_innerwrap.add("group", undefined, {name: "tab_selection"}); 
		tab_selection.text = "selection"; 
		tab_selection.orientation = "column"; 
		tab_selection.alignChildren = ["center","top"]; 
		tab_selection.spacing = 10; 
		tab_selection.margins = [15,0,0,0]; 
  
	// GROUP_SELECTION
	// ===============
	var group_selection = tab_selection.add("group", undefined, {name: "group_selection"}); 
		group_selection.orientation = "row"; 
		group_selection.alignChildren = ["left","center"]; 
		group_selection.spacing = 10; 
		group_selection.margins = 0; 
  
	var text_selection = group_selection.add("statictext", undefined, undefined, {name: "text_selection"}); 
		text_selection.text = "selection to keep (%) : "; 
  
	var edit_selection = group_selection.add('edittext {properties: {name: "edit_selection"}}'); 
		edit_selection.text = "30"; 
		edit_selection.preferredSize.width = 50; 
  
	// TAB_ORDRE
	// =========
	var tab_ordre = tabpanel_innerwrap.add("group", undefined, {name: "tab_ordre"}); 
		tab_ordre.text = "order"; 
		tab_ordre.orientation = "column"; 
		tab_ordre.alignChildren = ["center","top"]; 
		tab_ordre.spacing = 10; 
		tab_ordre.margins = [15,0,0,0]; 
  
	var text_make_selection = tab_ordre.add("statictext", undefined, undefined, {name: "text_make_selection"}); 
		text_make_selection.text = "please, make a selection"; 
  
	// TAB_BLENDMODE
	// =============
	var tab_blendmode = tabpanel_innerwrap.add("group", undefined, {name: "tab_blendmode"}); 
		tab_blendmode.text = "blend mode"; 
		tab_blendmode.orientation = "column"; 
		tab_blendmode.alignChildren = ["left","top"]; 
		tab_blendmode.spacing = 5; 
		tab_blendmode.margins = [15,0,0,0]; 
  
	var statictext15 = tab_blendmode.add("statictext", undefined, undefined, {name: "statictext15"}); 
		statictext15.text = "use ctrl or shift to select mutiple"; 
  
	// GROUP_BLENDMODE
	// ===============
	var group_blendmode = tab_blendmode.add("group", undefined, {name: "group_blendmode"}); 
		group_blendmode.orientation = "row"; 
		group_blendmode.alignChildren = ["left","center"]; 
		group_blendmode.spacing = 10; 
		group_blendmode.margins = 0; 
  
	var listbox_blendmode_array = ["Normal","Darken","Multiply","Colour burn","Lighten","Screen","Colour dodge"]; 
	var listbox_blendmode = group_blendmode.add("listbox", undefined, undefined, {name: "listbox_blendmode", items: listbox_blendmode_array, multiselect: true}); 
  
	var listbox_blendmode1_array = ["Overlay","Soft light","Hard light"]; 
	var listbox_blendmode1 = group_blendmode.add("listbox", undefined, undefined, {name: "listbox_blendmode1", items: listbox_blendmode1_array, multiselect: true}); 
  
	var listbox_blendmode2_array = ["Difference","Exclusion","Hue","Saturation","Colour","Luminosity"]; 
	var listbox_blendmode2 = group_blendmode.add("listbox", undefined, undefined, {name: "listbox_blendmode2", items: listbox_blendmode2_array, multiselect: true}); 
  
	// GROUP4
	// ======
	var group4 = palette.add("group", undefined, {name: "group4"}); 
		group4.orientation = "column"; 
		group4.alignChildren = ["left","center"]; 
		group4.spacing = 20; 
		group4.margins = 0; 
  
	// group_step
	// ======
	var group_step = group4.add("group", undefined, {name: "group_step"}); 
		group_step.orientation = "row"; 
		group_step.alignChildren = ["left","center"]; 
		group_step.spacing = 10; 
		group_step.margins = 0; 
  
	var text_step = group_step.add("statictext", undefined, undefined, {name: "text_step"}); 
		text_step.text = "step : "; 
  
	var edit_step = group_step.add('edittext {justify: "right", properties: {name: "edit_step"}}'); 
		edit_step.text = "1"; 
		edit_step.preferredSize.width = 50; 
  
	var text_step_unit = group_step.add("statictext", undefined, undefined, {name: "text_step_unit"}); 
		text_step_unit.text = "px"; 
		text_step_unit.preferredSize.width = 30; 
  
	// GROUP_BUTTON
	// ============
	var group_button = group4.add("group", undefined, {name: "group_button"}); 
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
	// groups_panel = [panel_uniform,panel_horizontal,panel_vertical, panel_uniform1,panel_horizontal1,panel_vertical1,group_selection, group_blendmode,panel1,panel2,panel3,group1,group2,group3,group_step,group6]
	tabpanel_tabs = [tab_fill_colour,tab_stroke_colour,tab_stroke_weight,tab_scale,tab_position,tab_rotation,tab_opacity,tab_selection,tab_ordre,tab_blendmode]; 

	// for (var i = 0; i < groups_panel.length; i++) { 
	// 	groups_panel[i].orientation = "row"; 
	// 	groups_panel[i].alignChildren = ["left","center"]; 
	// 	groups_panel[i].spacing = 10; 
	// 	groups_panel[i].margins = 10; 
	// }
	// group_step.orientation = "column";

	// for (var i = 0; i < tabpanel_tabs.length; i++) { 
	// 	tabpanel_tabs[i].alignment = ["fill","fill"]; 
	// 	tabpanel_tabs[i].orientation = "column"; 
	// 	tabpanel_tabs[i].alignChildren = ["left","top"]; 
	// 	tabpanel_tabs[i].spacing = 10; 
	// 	tabpanel_tabs[i].margins = [15,0,0,0]; 
	// }

	for (var i = 0; i < tabpanel_tabs.length; i++) { 
	  tabpanel_tabs[i].alignment = ["fill","fill"]; 
	  tabpanel_tabs[i].visible = false; 
	} 
  
	tabpanel_tabs_step_units = ["",undefined,"px","%","px","deg","%",undefined,undefined,undefined]; 

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
			group_step.visible = true;
			text_step_unit.text = step_unit;
		} else {
			group_step.visible = false;
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
		"function nombre_random(min, max, step, min_maximum, max_minimum){\n"+
		"	if(min > max){\n"+
		"		temp = min;\n"+
		"		min = max;\n"+
		"		max = temp;\n"+
		"	}\n"+
		"	if (min_maximum != undefined){\n"+
		"		min = Math.max(min, min_maximum);\n"+
		"	}\n"+
		"	if (max_minimum != undefined){\n"+
		"		max = Math.min(max, max_minimum);\n"+
		"	}\n"+
		"	a = Math.floor(Math.random() * (max - min + 1) / step) * step + min;\n"+
		"	return a;\n"+
		"}\n\n"

		step = parseFloat(edit_step.text)

		if(tab_selectionnee == tab_fill_colour){
			if(tpanel1.selection == tab_range){
				min_hue = parseFloat(edit_fill_min_hue.text);
				max_hue = parseFloat(edit_fill_max_hue.text);
				min_sat = parseFloat(edit_fill_min_sat.text);
				max_sat = parseFloat(edit_fill_max_sat.text);
				min_val = parseFloat(edit_fill_min_val.text);
				max_val = parseFloat(edit_fill_max_val.text);
				script += random_color_range("fill", min_hue, max_hue, min_sat, max_sat, min_val, max_val, step);
			} else {

				script += random_color_set("fill")
			}
		}
		else if(tab_selectionnee == tab_stroke_colour){
			if(tpanel2.selection == tab_range1){
				min_hue = parseFloat(edit_stroke_min_hue.text);
				max_hue = parseFloat(edit_stroke_max_hue.text);
				min_sat = parseFloat(edit_stroke_min_sat.text);
				max_sat = parseFloat(edit_stroke_max_sat.text);
				min_val = parseFloat(edit_stroke_min_val.text);
				max_val = parseFloat(edit_stroke_max_val.text);
				script += random_color_range("stroke", min_hue, max_hue, min_sat, max_sat, min_val, max_val, step);
			} else {
				script += random_color_set("stroke")
			}
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
				script += random_scale(true,step,min_x,max_x)
			} else {
				min_x = parseFloat(edit_min_x_scale.text)
				max_x = parseFloat(edit_max_x_scale.text)
				min_y = parseFloat(edit_min_y_scale.text)
				max_y = parseFloat(edit_max_y_scale.text)
				script += random_scale(true,step,min_x,max_x,min_y,max_y)
			}
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
			script += random_position(step,min_x,max_x,min_y,max_y)
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

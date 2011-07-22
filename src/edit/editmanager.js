/*!
 * AUTHOR
 *   The JexGrid was written and is maintained by:
 *       Joon Ho Cho <joonho1101@gmail.com>
 * COPYRIGHT
 *   Copyright (c) 2010-2011, WebCash Inc. All rights reserved.
 */

/**
JGM
@scope JGM
*/

(function() {

 goog.require('JGM.core.BaseModule');

 goog.provide('JGM.edit.EditManager');

 JGM.edit.EditManager = EditManager;

/**
EditManager ���. ������ �������� ����ϴ� ����Դϴ�.
@module EditManager

@requires JGM
@requires JGM.Grid
@requires JGM.ColDefManager
@requires JGM.DataManager
@requires JGM.EventManager
@requires JGM.SelectionManager
@requires JGM.Cell
 */

/**
EditManager Ŭ����. �÷� �� Ŀ���� �����͸� �����մϴ�.

@class {public EditManager} JGM.EditManager

@author ����ȣ
@since 1.0.0
@version 1.2.1
*/

/**
EditManager ����Ʈ���� �Դϴ�.

@constructor {public EditManager} EditManager
@param {Object} args - EditManager ��� �Ķ���� ������Ʈ
@... {JGM.Grid} args.grid - EditManager �� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�
@... {Object} args.options - EditManager �ɼ� ������Ʈ
@returns {EditManager} EditManager ��� �ν��Ͻ��� �����մϴ�.

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
function EditManager(args) {
	/**
	{@link JGM} �� �Ҵ����ִ� EditManager ��� ���� ���̵��Դϴ�. �б� ����.

	@var {public final String} mid

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.mid = args.mid;

	/**
	EditManager �� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�.

	@var {public JGM.Grid} grid

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid = args.grid;

	/**
	�׸��� ������ ������ �����ϴ� {@link JGM.EditManager EditManager} �ν��Ͻ� �Դϴ�.

	@var {public JGM.EditManager} JGM.Grid.editMgr

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid.editMgr = this;

	/**
	EditManager ����� �⺻ �ɼ� ������ �����մϴ�.

	@var {private Object} options

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	var options = {
		/**
		���� ������ ���� �׸��� ���� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-edit"</code>

		@var {private optional String} JGM.EditManager.options.classEdit

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__classEdit_a__: "jgrid-edit",

		/**
		{@link JGM.EditManager.options.editableBgEnabled editableBgEnabled} �� true �� ���, �������� ������ �÷� ���� ���������� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-editable"</code>

		@var {private optional String} JGM.EditManager.options.classCellEditable

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__classCellEditable_b__: "jgrid-editable",

		/**
		{@link JGM.EditManager.options.notEditableBgEnabled notEditableBgEnabled} �� true �� ���, �������� �Ұ����� �÷� ���� ���������� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-notEditable"</code>

		@var {private optional String} JGM.EditManager.options.classCellNotEditable

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__classCellNotEditable_c__: "jgrid-notEditable",

		/**
		true �� ���, {@link JGM.EditManager.options.classCellEditable classCellEditable} �� �����մϴ�. <br>�⺻��:<code>false</code>

		@var {private optional Boolean} JGM.EditManager.options.editableBgEnabled

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__editableBgEnabled_d__: false,

		/**
		true �� ���, {@link JGM.EditManager.options.classCellNotEditable classCellNotEditable} �� �����մϴ�. <br>�⺻��:<code>false</code>

		@var {private optional Boolean} JGM.EditManager.options.notEditableBgEnabled

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__notEditableBgEnabled_e__: false,

		/**
		{@link JGM.EditManager.options.classCellEditable classCellEditable} �� ����� ����Դϴ�. <br>�⺻��:<code>"#FFF"</code>

		@var {private optional String} JGM.EditManager.options.editableBg

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__editableBg_f__: "#FFF",

		/**
		{@link JGM.EditManager.options.classCellNotEditable classCellNotEditable} �� ����� ����Դϴ�. <br>�⺻��:<code>"#F6F6F6"</code>

		@var {private optional String} JGM.EditManager.options.notEditableBg

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__notEditableBg_g__: "#F6F6F6",

		/**
		delete Ű�� �̿��� �� ���� ���� ���� �����Դϴ�. <br>�⺻��:<code>false</code>

		@var {private optional Boolean} JGM.EditManager.options.deleteEnabled

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__deleteEnabled_h__: false,
		
		/**
		������ ������ ���� ������ �������� �������� �����Դϴ�. <br>�⺻��:<code>true</code>

		@var {private optional Boolean} JGM.EditManager.options.editIconEnabled

		@author ����ȣ
		@since 1.2.1
		@version 1.2.1
		*/
		__editIconEnabled_i__: true,
		
		/**
		������ ������ ���� ������ ������ �̹��� url �Դϴ�. <br>�⺻��:<code>imageUrl + "editable-small.png"</code>

		@var {private optional String} JGM.EditManager.options.urlEditIcon

		@author ����ȣ
		@since 1.2.1
		@version 1.2.1
		*/
		__urlEditIcon_j__: this.grid._options.imageUrl + "editable-small.png",
		
		/**
		������ ������ �̹����� ����� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"edit-icon"</code>

		@var {private optional String} JGM.EditManager.options.classEditIcon

		@author ����ȣ
		@since 1.2.1
		@version 1.2.1
		*/
		__classEditIcon_k__: "edit-icon",
		
		/**
		������ ������ �̹����� �� �ȼ� ���Դϴ�. <br>�⺻��:<code>11</code>

		@var {private optional int} JGM.EditManager.options.editIconWidth

		@author ����ȣ
		@since 1.2.1
		@version 1.2.1
		*/
		__editIconWidth_l__: 12,
		
		/**
		������ ������ �̹����� padding �ȼ� ���Դϴ�. <br>�⺻��:<code>3</code>

		@var {private optional int} JGM.EditManager.options.editIconPadding

		@author ����ȣ
		@since 1.2.1
		@version 1.2.1
		*/
		__editIconPadding_m__: 3,
		
		/**
		�⺻ �ؽ�Ʈ �������� ��� ��Ÿ���Դϴ�. <br>�⺻��:<code>"#FFF9D7"</code>

		@var {private optional String} JGM.EditManager.options.basicBackground

		@author ����ȣ
		@since 1.2.2
		@version 1.2.2
		*/
		__basicBackground_n__: "#FFF9D7",

		classSuccess: "edit-success",

		successBackground: "#cdf7b6",

		classFailure: "edit-failure",

		failureBackground: "#ffcec5"

	};

	this._options = JGM.__extend_e__(options, args.options, {
		classEdit:"__classEdit_a__",
		classCellEditable:"__classCellEditable_b__",
		classCellNotEditable:"__classCellNotEditable_c__",
		editableBgEnabled:"__editableBgEnabled_d__",
		notEditableBgEnabled:"__notEditableBgEnabled_e__",
		editableBg:"__editableBg_f__",
		notEditableBg:"__notEditableBg_g__",
		deleteEnabled:"__deleteEnabled_h__",
		editIconEnabled: "__editIconEnabled_i__",
		urlEditIcon: "__urlEditIcon_j__",
		classEditIcon: "__classEditIcon_k__",
		editIconWidth: "__editIconWidth_l__",
		editIconPadding: "__editIconPadding_m__",
		basicBackground:"__basicBackground_n__"
	});

	/**
	���� EditManager ���� ���ǰ� �ִ� {@link JGM.Editor} �ν��Ͻ� �Դϴ�. ����
	������ �ǰ� �ִ� ���� ���� ��쿡�� undefined �� ���� �����ϴ�. Ȱ��ȭ ����
	������ <code>this.cell</code> �� ������ �ǰ� �ִ� {@link JGM.Cell} �ν��Ͻ��� ������ �� �� �ֽ��ϴ�.

	@var {public JGM.Editor} editor

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.editor;

	this.__beginEditKeys_c__ = Util.which(["number", "alphabet", "del", "backspace"]);
	
	this.beingCommitted;

	this.__init();
}

EditManager.getInstance = function(args) {
	return new EditManager(args);
};

var prototype = EditManager.prototype;

prototype.__init = function() {
	this.bindEvents();
};

prototype.bindEvents = function() {
	var events = {
		onGetColCellClass: this.__onGetColCellClass_f__,
		keydownCanvas: this.__keydownCanvas_ba__,
		onDestroy: this.__destroy_aA__,
		dblclickCanvas: this.__dblclickCanvas_bi__,
		onCreateDynamicCss: this.onCreateDynamicCss,
		"onBeforeNavigate onBeforeRefresh onBeforeSelect": this.commit,
		onBeforeFocusCanvas: this.notActive
	};
	
	if (Util.isNull(this.grid.selMgr)) {
		events.onCreateCss = this.__onBeforeCreateSelCss_d__;
	}
	else {
		events.onBeforeCreateSelCss = this.__onBeforeCreateSelCss_d__;
	}
		
	if (this._options.__deleteEnabled_h__) {
		events["keydownSel_" + Util.keyMapKeydown.del] = this.__deleteContents_i__;
	}
	
	if (this._options.__editIconEnabled_i__) {
		var colDefs = this.grid.colDefMgr.get(),
			len = colDefs.length,
			i = 0;
		for (; i < len; i++) {
			if (Util.isNotNull(colDefs[i].editor)) {
				//events["onRenderCell_" + colDefs[i].key + "_prepend"] = this.__onRenderCell_aH__;
				events["onRenderHeader_" + colDefs[i].key + "_prepend"] = this.__onRenderHeader_aH__;
			}
		}
		//events["onBeforeMousedown onBeforeMouseup onBeforeClick"] = this.cancelMouseEvent;
	}
		
	this.grid.event.bind(events, this);
};

prototype.__destroy_aA__ = function() {
	this.__deleteEditor_g__();

	JGM._destroy(this, {
		name: "EditManager",
		path: "editMgr",
		map: "__beginEditKeys_c__ _options"
	});
};

prototype.__onBeforeCreateSelCss_d__ = function() {
	var gridId = "#" + this.grid.mid + " .",
		o = this._options,
		rules = [],
		height = this.grid.view.__getRowInnerHeight_AO__();

	rules.push(this.grid.view.__getCellSelector_AG__() + "." + o.__classEdit_a__ + "{background:" + o.__basicBackground_n__ + "}");
	
	rules.push(gridId + o.__classEdit_a__ + " input{position:absolute;z-index:10;top:0;padding:0;border:0;margin:0;background:" + o.__basicBackground_n__ + ";height:" + height + "px;line-height:" + height + "px}");

	if (o.__editableBgEnabled_d__) {
		rules.push(gridId + o.__classCellEditable_b__ + "{background:" + o.__editableBg_f__ + "}");
	}
	if (o.__notEditableBgEnabled_e__) {
		rules.push(gridId + o.__classCellNotEditable_c__ + "{background:" + o.__notEditableBg_g__ + "}");
	}
	if (o.__editIconEnabled_i__) {
		rules.push(gridId + o.__classEditIcon_k__ + "{float:left;position:absolute;left:0;top:0;padding:0 " + o.__editIconPadding_m__ + "px;width:" + o.__editIconWidth_l__ + "px;height:" + height + "px;background:url(" + o.__urlEditIcon_j__ + ") no-repeat center transparent}");
	}
	rules.push(gridId + o.classSuccess + "{background:" + o.successBackground + "}");
	rules.push(gridId + o.classFailure + "{background:" + o.failureBackground + "}");
	return rules.join("");
};

prototype.onCreateDynamicCss = function() {
	var cellSel = this.grid.view.__getCellSelector_AG__(),
		padding = this.grid.view.__getPadding_AM__(),
		colDefs = this.grid.colDefMgr.get(),
		i = 0,
		str = "";
		
	for (; i < colDefs.length; i++) {
		if (Util.isNotNull(colDefs[i].editor)) {
			str += cellSel + ".k_" + colDefs[i].key + " .basic-editor{width:" + (colDefs[i].width - 2 * padding) + "px}";
		}
	}
		
	return str;
};

prototype.__onRenderHeader_aH__ = function(html) {
	html.push("<span class='" + this._options.__classEditIcon_k__ + "'></span>");
};

prototype.__onRenderCell_aH__ = function(rowIdx, colIdx, datarow, colDef, cellHtml) {
	if (this.grid.dataMgr.isReal(datarow)) {
		cellHtml.push("<span class='" + this._options.__classEditIcon_k__ + "' title='Ŭ���Ͽ� �������� �����մϴ�' onclick='JGM.m.EditManager." + this.mid + ".beginEdit(\"" + datarow[this.grid.dataMgr.idKey] + "\",\"" + colDef.key + "\")'></span>");
	}
};

prototype.cancelMouseEvent = function(e) {
	return !Util.hasTagAndClass(e.target, "DIV", this._options.__classEditIcon_k__);
};

prototype.beginEdit = function(id, key) {
	this.begin(JGM.create("Cell", {grid:this.grid, datarow:this.grid.dataMgr.getById(id), colDef:this.grid.colDefMgr.getByKey(key)}));
};

prototype.__dblclickCanvas_bi__ = function(e, cell) {
	if (!cell.isEdited()) {
		this.begin(cell);
	}
};

prototype.__keydownCanvas_ba__ = function(e) {
	if (this.active()) {
		if (e.which === Util.keyMapKeydown.esc) {
			this.cancel();
		}
	}
	else {
		if (e.ctrlKey) {
			/*
			switch (e.which) {
				case "C".charCodeAt(0):
					this.copy(this.grid.selMgr.getCell());
				break;
				case "X".charCodeAt(0):
					this.cut(this.grid.selMgr.getCell());
				break;
				case "V".charCodeAt(0):
					this.paste(this.grid.selMgr.getCell());
				break;
			}
			*/
			return;
		}
		else if (!e.altKey && Util.isNotNull(this.grid.selMgr)) {
			if (e.which === Util.keyMapKeydown.del && this._options.__deleteEnabled_h__) {
				this.__deleteContent_h__(this.grid.selMgr.getCell());
			}
			else if (this.__beginEditKeys_c__[e.which]) {
				this.begin(this.grid.selMgr.getCell());
			}
			else if (e.which === Util.keyMapKeydown.f2) {
				e.preventDefault();
				this.begin(this.grid.selMgr.getCell());
			}
		}
	}
};


/**
���� ������ �ǰ� �ִ� ���� ���� ���θ� �����մϴ�.

@function {public Boolean} active
@returns {Boolean} ������ Ȱ��ȭ ����

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.active = function() {
	return Util.isNotNull(this.editor);
};

prototype.notActive = function() {
	return Util.isNull(this.editor);
};

prototype.__isEdited_e__ = function(cell) {
	return this.active() && this.editor.cell.equals(cell);
};

prototype.__onGetColCellClass_f__ = function(colDef) {
	if (Util.isNotNull(colDef.editor)) {
		return this._options.__classCellEditable_b__;
	}
	else {
		return this._options.__classCellNotEditable_c__;
	}
};

/**
���� ���� ������ �ǰ� �ִ����� �����մϴ�.

@function {public Boolean} JGM.Cell.isEdited
@returns {Boolean} ���� ������ ����

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
JGM.Cell.prototype.isEdited = function() {
	return this.grid.editMgr.__isEdited_e__(this);
};

/**
�� ������ ���� �����մϴ�.

@function {public Boolean} JGM.Cell.setValue
@param {String} value - �� �����Ϳ� ���� ���� ��

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
JGM.Cell.prototype.setValue = function(value) {
	var datarow = this.getDatarow(),
		key = this.getKey(),
		res;

	if (Util.isNotNullAnd(datarow, key)) {
		res = this.grid.dataMgr.updateByKey(datarow, key, value, {noSort:true, noFilter:true, noRerender:true});
      if (res === true) {
			this.grid.view.rerenderRow(datarow);
      }
	}
	return res;
};


/**
�־��� ���� ����Ʈ ���������� üũ�մϴ�.

@function {public} isEditable 
@param {JGM.Cell} cell - ����Ʈ�� �������� üũ�� ��
@returns {Boolean} ����Ʈ�� �����ϸ� true �ƴϸ� false �� �����մϴ�.

@author ����ȣ
@since 1.1.0
@version 1.1.0
*/
prototype.isEditable = function(cell) {
	return Util.isNotNull(cell) && Util.isNotNull(cell.getColDef().editor) && this.grid.dataMgr.isReal(cell.getDatarow());
};

/**
�־��� ���� �������� �����մϴ�.

@function {public} begin
@param {JGM.Cell} cell - �������� ������ �� �ν��Ͻ�

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.begin = function(cell) {
	if (this.active()) {
		this.commit();
	}
		
	if (!this.isEditable(cell)) {
		return;
	}

	this.editor = cell.getColDef().editor;

	this.editor.cell = cell;
	this.editor.grid = this.grid;

	var node = cell.getNode();
	this.editor.before = node.innerHTML;
	node.innerHTML = this.editor.edit(cell.getValue());

	cell.get$().addClass(this._options.__classEdit_a__);
	this.editor.focus();
};

/**
���� �������� �������� ����մϴ�. �� �����ʹ� ������� �ʽ��ϴ�.

@function {public} cancel

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.cancel = function() {
	if (!this.active()) {
		return;
	}
		
	var cell = this.editor.cell;
	cell.getNode().innerHTML = this.editor.before;
	this.__deleteEditor_g__();
	cell.get$().removeClass(this._options.__classEdit_a__);
	this.grid.view.focus();
};

prototype.__deleteEditor_g__ = function() {
	if (Util.isNotNull(this.editor)) {
		delete this.editor.grid;
		delete this.editor.cell;
		delete this.editor.before;
		delete this.editor;
	}
};

/**
���� �������� ���� ���� ������ �����մϴ�. ������ ������ valid ������ Ȯ���� ��
valid �� ��쿡�� ������ �����ϰ� �׷��� ���� ��쿡�� ���� ������ ����մϴ�.

@function {public} commit

@author ����ȣ
@since 1.0.0
@version 1.3.0
*/

/*
 * 1.3.0 editor.valid -> coldef.validator & datamanager.validate
 */
prototype.commit = function() {
	if (this.beingCommitted || !this.active()) {
		return;
	}
		
	this.beingCommitted = true;
	
	var cell = this.editor.cell,
		value = this.editor.value(cell.getNode()),
		$cell;

	if (value == cell.getValue()) {
		this.cancel();
	}
	else {
      var res = cell.setValue(value),
			classRes;
		$cell = cell.get$();
      if (res instanceof Error) {
         this.cancel();
			classRes = this._options.classFailure;
         $cell.addClass(classRes);
			setTimeout(function() {$cell.removeClass(classRes);}, 1000);
      }
      else {
         this.__deleteEditor_g__();
         this.grid.view.focus();
			classRes = this._options.classSuccess;
			this.grid.printMessage("Successfully Updated.");
         $cell.addClass(classRes);
			setTimeout(function() {$cell.removeClass(classRes);}, 1000);
      }
	}
	cell.get$().removeClass(this._options.__classEdit_a__);
		
	this.beingCommitted = false;
};

prototype.__deleteContent_h__ = function(cell) {
	if (this.active() || !this.isEditable(cell)) {
		return;
	}
	var colDef = cell.getColDef();
	if (cell.getValue() === colDef.defaultValue) {
		return;
	}

	cell.setValue(colDef.defaultValue);
};

prototype.__deleteContents_i__ = function(e, selectionRows, selectionCols) {
	if (this.active()) {
		return;
	}
	var updates = {},
		fakerows = {},
		updatelist = [],
		col,
		colDef,
		defaultValue,
		key,
		cell,
		datarow,
		selCol,
		row;

	col_loop:
	for (col in selectionCols) {
		if (!selectionCols.hasOwnProperty(col) || col === "length") {
			continue;
		}

		colDef = undefined;
		defaultValue = undefined;
		key = undefined;
		selCol = selectionCols[col];

		row_loop:
		for (row in selCol) {
			if (!selCol.hasOwnProperty(row) || row === "length" || fakerows.hasOwnProperty(row)) {
				continue;
			}

			cell = selCol[row].cell;

			if (Util.isNull(colDef)) {
				colDef = cell.getColDef();
				defaultValue = colDef.defaultValue;
				key = colDef.key;

				if (Util.isNull(colDef.editor)) {
					continue col_loop;
				}
			}

			if (Util.isNotNull(updates[row])) {
				datarow = updates[row].datarow;
			}
			else {
				datarow = cell.getDatarow();
			}

			if (!this.grid.dataMgr.isReal(datarow)) {
				fakerows[row] = true;
				continue;
			}

			if (defaultValue === datarow[key]) {
				continue;
			}

			if (Util.isNull(updates[row])) {
				updates[row] = {datarow:datarow, change:{}};
				updatelist.push(updates[row]);
			}

			updates[row].change[key] = defaultValue;
		}
	}

	if (updatelist.length !== 0) {
		this.grid.dataMgr.updateList(updatelist);
	}
};

/**
Editor ���. �÷� �������� ���������� ����ϴ� ����Դϴ�.
@module Editor

@requires JGM
@requires JGM.Grid
@requires JGM.EditManager
@requires JGM.Cell
 */

/**
Editor Ŭ����. �÷� ���� �������Դϴ�. �÷� ���� ������ ������ ����� ������,
���� ����� ���� validity check ���� ����մϴ�.

@class {public Editor} JGM.Editor

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/

/**
Editor ����Ʈ���� �Դϴ�.

@constructor {public Editor} Editor
@param {Object} args - Editor ��� �Ķ���� ������Ʈ
@... {String Function()} args.edit - �� �ȿ� �� �����͸� ������ �ϴ� HTML String �� �����ϴ� function �Դϴ�.
@... {Function()} args.focus - �� �������� ���ۉ����� �����͸� focus ���ִ� function �Դϴ�.
@... {Boolean Function(Object value)} args.valid - �־��� ���� valid ������ �����մϴ�.
@... {Object Function} args.value - ������ ���� ���� �����մϴ�.
@returns {Editor} Editor ��� �ν��Ͻ��� �����մϴ�.

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/

function Editor(args) {
	/**
	{@link JGM} �� �Ҵ����ִ� Editor ��� ���� ���̵��Դϴ�. �б� ����.

	@var {public final String} mid

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/

	/**
	Editor �� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�.

	@var {public JGM.Grid} grid

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/

	/**
	Editor �� ���� ������ ���� {@link JGM.Cell Cell} �ν��Ͻ�.

	@var {public JGM.Cell} cell

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/

	var i;
	for (i in args) {
		if (args.hasOwnProperty(i)) {
			this[i] = args[i];
		}
	}
}

Editor.getInstance = function(args) {
	return new Editor(args);
};

prototype = Editor.prototype;

/**
�� ������ Ȱ��ȭ ��, �ش� ���� �� HTML �� �����մϴ�.

@function {public String} edit
@param {?} value - ���� ���� ������ ���Դϴ�.
@returns {Editor} �� ��� �ȿ� �� HTML �ڵ�

@author ����ȣ
@since 1.0.0
@version 1.1.1
*/
prototype.edit = function(value) {
	// added a style so that the edit box does not go out of the cell when right-aligned in IE 7/8
	return "<input type='text' class='basic-editor' value='" + Util.ifNull(value, "") + "' style='position:relative'/>";
};

/**
�� ������ Ȱ��ȭ ��, ������ ������ HTML ��带 focus ���ݴϴ�.

@function {public} focus

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.focus = function() {
	var node = this.cell.getNode().childNodes[0];
	if (Util.isFunction(node.setActive)) {
		try {node.setActive();} catch(e){}
	}
	node.focus();
	if (document.activeElement !== node) {
		this.cell.get$().children(":eq(0)").focus();
	}
};

/**
�� ���� ���� ����ÿ� ����� ������ valid ������ �����մϴ�. false �� ������ ���
�� �������� ��ҵǰ� true �� �����Ұ�� ����� ������ ����˴ϴ�.

@function {public Boolean} valid
@param {?} value - ���� ����� ���� {@link value} �Լ����� ���ϵǴ� ���Դϴ�.
@returns {Boolean} �� ���� ���� ����ÿ� ����� ������ validity

@author ����ȣ
@since 1.0.0
@version 1.0.0
@deprecated
*/

/*
 * 1.3.0: deprecated
 * use colDef.validator instead
 */

/**
������ �� �������� ���� �� ������ ��. �� �Լ����� ���ϵǴ� ���� {@link valid}
�Լ��� �Ķ���ͷ� �ԷµǾ validity �� üũ�ǰ� valid �ϴٰ� �ǴܵǸ� ������
�ο��� �� ������ ������ �Էµ˴ϴ�.

@function {public Boolean} value
@param {DOMElement} wrapperNode - ������ DOM ��带 �����ϴ� �� DOM ��� �Դϴ�.
@returns {?} ������ �� �������� ���� ������ ��

@author ����ȣ
@since 1.0.0
@version 1.1.1
*/
prototype.value = function(wrapperNode) {
	return wrapperNode.childNodes[0].value;
};

/**
���� �������� path ��Ʈ���Դϴ�. �� ���� eval() �ϸ� �� �����Ͱ� ���ϵ˴ϴ�.

@function {public String} path
@returns {String} ���� �������� path ��Ʈ��

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.path = function() {
	return "JGM.m.Editor." + this.mid;
};

Editor.numberKeys = Util.which(["number", "del", "backspace"]);

Editor.isNumberKey = function(keyCode) {
	return this.numberKeys[keyCode] ? true : false;
};

Editor.numberEdit = function(cell) {
	var value = cell.getValue();
	return "<input type='text' class='basic-editor' onkeydown='if (!JGM.Editor.isNumberKey(event.which)) return false;' value='" + Util.ifNull(value, "") + "'/>";
};

Editor.floatKeys = Util.which(["number", ".", "del", "backspace"]);

Editor.isFloatKey = function(keyCode) {
	return this.floatKeys[keyCode] ? true : false;
};

Editor.floatEdit = function(cell) {
	var value = cell.getValue();
	return "<input type='text' class='basic-editor' onkeydown='if (!JGM.Editor.isFloatKey(event.which)) return false;' value='" + Util.ifNull(value, "") + "'/>";
};

Editor.alphabetKeys = Util.which(["alphabet", "del", "backspace", "space"]);

Editor.isAlphabet = function(keyCode) {
	return this.alphabetKeys[keyCode] ? true : false;
};

Editor.alphabetEdit = function(cell) {
	var value = cell.getValue();
	return "<input type='text' class='basic-editor' onkeydown='if (!JGM.Editor.isAlphabet(event.which)) return false;' value='" + Util.ifNull(value, "") + "'/>";
};

JGM._add("EditManager", EditManager);
JGM._add("Editor", Editor);
}());

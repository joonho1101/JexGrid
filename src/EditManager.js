goog.require('jx.util');
goog.require('jx.grid');
goog.require('jx.grid.BaseModule');
goog.require('jx.grid.Grid');
goog.require('jx.grid.Cell');

goog.provide('jx.grid.EditManager');
goog.provide('jx.grid.Editor');

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
var JGM = goog.getObjectByName('jx.grid'),
	Util = goog.getObjectByName('jx.util'),
	BaseModule = goog.getObjectByName('jx.grid.BaseModule');

 goog.exportSymbol('jx.grid.EditManager', EditManager);
 goog.exportSymbol('jx.grid.Editor', Editor);

 JGM._add("EditManager", EditManager);
 JGM._add("Editor", Editor);

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

@class {EditManager} JGM.EditManager

@author ����ȣ
@since 1.0.0
@version 1.2.1
*/

/**
EditManager ����Ʈ���� �Դϴ�.

@constructor {EditManager} EditManager
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

	@var {string} mid

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.mid = args.mid;

	/**
	EditManager �� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�.

	@var {JGM.Grid} grid

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid = args.grid;

	/**
	�׸��� ������ ������ �����ϴ� {@link JGM.EditManager EditManager} �ν��Ͻ� �Դϴ�.

	@var {JGM.EditManager} JGM.Grid.editMgr

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid.editMgr = this;

	/**
	EditManager ����� �⺻ �ɼ� ������ �����մϴ�.

	@type {Object} options
	@private

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	var options = {
		/**
		���� ������ ���� �׸��� ���� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-edit"</code>

		@type {string=} JGM.EditManager.options.classEdit
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classEdit': "jgrid-edit",

		/**
		{@link JGM.EditManager.options.editableBgEnabled editableBgEnabled} �� true �� ���, �������� ������ �÷� ���� ���������� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-editable"</code>

		@type {string=} JGM.EditManager.options.classCellEditable
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classCellEditable': "jgrid-editable",

		/**
		{@link JGM.EditManager.options.notEditableBgEnabled notEditableBgEnabled} �� true �� ���, �������� �Ұ����� �÷� ���� ���������� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-notEditable"</code>

		@type {string=} JGM.EditManager.options.classCellNotEditable
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classCellNotEditable': "jgrid-notEditable",

		/**
		true �� ���, {@link JGM.EditManager.options.classCellEditable classCellEditable} �� �����մϴ�. <br>�⺻��:<code>false</code>

		@type {boolean=} JGM.EditManager.options.editableBgEnabled
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'editableBgEnabled': false,

		/**
		true �� ���, {@link JGM.EditManager.options.classCellNotEditable classCellNotEditable} �� �����մϴ�. <br>�⺻��:<code>false</code>

		@type {boolean=} JGM.EditManager.options.notEditableBgEnabled
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'notEditableBgEnabled': false,

		/**
		{@link JGM.EditManager.options.classCellEditable classCellEditable} �� ����� ����Դϴ�. <br>�⺻��:<code>"#FFF"</code>

		@type {string=} JGM.EditManager.options.editableBg
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'editableBg': "#FFF",

		/**
		{@link JGM.EditManager.options.classCellNotEditable classCellNotEditable} �� ����� ����Դϴ�. <br>�⺻��:<code>"#F6F6F6"</code>

		@type {string=} JGM.EditManager.options.notEditableBg
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'notEditableBg': "#F6F6F6",

		/**
		delete Ű�� �̿��� �� ���� ���� ���� �����Դϴ�. <br>�⺻��:<code>false</code>

		@type {boolean=} JGM.EditManager.options.deleteEnabled
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'deleteEnabled': false,
		
		/**
		������ ������ ���� ������ �������� �������� �����Դϴ�. <br>�⺻��:<code>true</code>

		@type {boolean=} JGM.EditManager.options.editIconEnabled
		@private

		@author ����ȣ
		@since 1.2.1
		@version 1.2.1
		*/
		'editIconEnabled': true,
		
		/**
		������ ������ ���� ������ ������ �̹��� url �Դϴ�. <br>�⺻��:<code>imageUrl + "editable-small.png"</code>

		@type {string=} JGM.EditManager.options.urlEditIcon
		@private

		@author ����ȣ
		@since 1.2.1
		@version 1.2.1
		*/
		'urlEditIcon': this.grid._options['imageUrl'] + "editable-small.png",
		
		/**
		������ ������ �̹����� ����� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"edit-icon"</code>

		@type {string=} JGM.EditManager.options.classEditIcon
		@private

		@author ����ȣ
		@since 1.2.1
		@version 1.2.1
		*/
		'classEditIcon': "edit-icon",
		
		/**
		������ ������ �̹����� �� �ȼ� ���Դϴ�. <br>�⺻��:<code>11</code>

		@type {number=} JGM.EditManager.options.editIconWidth
		@private

		@author ����ȣ
		@since 1.2.1
		@version 1.2.1
		*/
		'editIconWidth': 12,
		
		/**
		������ ������ �̹����� padding �ȼ� ���Դϴ�. <br>�⺻��:<code>3</code>

		@type {number=} JGM.EditManager.options.editIconPadding
		@private

		@author ����ȣ
		@since 1.2.1
		@version 1.2.1
		*/
		'editIconPadding': 3,
		
		/**
		�⺻ �ؽ�Ʈ �������� ��� ��Ÿ���Դϴ�. <br>�⺻��:<code>"#FFF9D7"</code>

		@type {string=} JGM.EditManager.options.basicBackground
		@private

		@author ����ȣ
		@since 1.2.2
		@version 1.2.2
		*/
		'basicBackground': "#FFF9D7",

		'classSuccess': "edit-success",

		'successBackground': "#cdf7b6",

		'classFailure': "edit-failure",

		'failureBackground': "#ffcec5"

	};

	this._options = JGM._extend(options, args['options']);

	/**
	���� EditManager ���� ���ǰ� �ִ� {@link JGM.Editor} �ν��Ͻ� �Դϴ�. ����
	������ �ǰ� �ִ� ���� ���� ��쿡�� undefined �� ���� �����ϴ�. Ȱ��ȭ ����
	������ <code>this.cell</code> �� ������ �ǰ� �ִ� {@link JGM.Cell} �ν��Ͻ��� ������ �� �� �ֽ��ϴ�.

	@var {JGM.Editor} editor

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.editor;

	this._beginEditKeys = Util.which(["number", "alphabet", "del", "backspace"]);
	
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
		'onGetColCellClass': this._onGetColCellClass,
		'keydownCanvas': this._keydownCanvas,
		'onDestroy': this._destroy,
		'dblclickCanvas': this._dblclickCanvas,
		'onCreateDynamicCss': this.onCreateDynamicCss,
		"onBeforeNavigate onBeforeRefresh onBeforeSelect": this.commit,
		'onBeforeFocusCanvas': this.notActive
	};
	
	if (Util.isNull(this.grid.selMgr)) {
		events.onCreateCss = this._onBeforeCreateSelCss;
	}
	else {
		events.onBeforeCreateSelCss = this._onBeforeCreateSelCss;
	}
		
	if (this._options['deleteEnabled']) {
		events["keydownSel_" + Util.keyMapKeydown.del] = this._deleteContents;
	}
	
	if (this._options['editIconEnabled']) {
		var colDefs = this.grid.colDefMgr.get(),
			len = colDefs.length,
			i = 0;
		for (; i < len; i++) {
			if (Util.isNotNull(colDefs[i].editor)) {
				//events["onRenderCell_" + colDefs[i].key + "_prepend"] = this._onRenderCell;
				events["onRenderHeader_" + colDefs[i].key + "_prepend"] = this._onRenderHeader;
			}
		}
		//events["onBeforeMousedown onBeforeMouseup onBeforeClick"] = this.cancelMouseEvent;
	}
		
	this.grid.event.bind(events, this);
};

prototype._destroy = function() {
	this._deleteEditor();

	JGM._destroy(this, {
		name: "EditManager",
		path: "editMgr",
		map: "beginEditKeys _options"
	});
};

prototype._onBeforeCreateSelCss = function() {
	var gridId = "#" + this.grid.mid + " .",
		o = this._options,
		rules = [],
		height = this.grid.view._getRowInnerHeight();

	rules.push(this.grid.view._getCellSelector() + "." + opt['classEdit'] + "{background:" + opt['basicBackground'] + "}");
	
	rules.push(gridId + opt['classEdit'] + " input{position:absolute;z-index:10;top:0;padding:0;border:0;margin:0;background:" + opt['basicBackground'] + ";height:" + height + "px;line-height:" + height + "px}");

	if (opt['editableBgEnabled']) {
		rules.push(gridId + opt['classCellEditable'] + "{background:" + opt['editableBg'] + "}");
	}
	if (opt['notEditableBgEnabled']) {
		rules.push(gridId + opt['classCellNotEditable'] + "{background:" + opt['notEditableBg'] + "}");
	}
	if (opt['editIconEnabled']) {
		rules.push(gridId + opt['classEditIcon'] + "{float:left;position:absolute;left:0;top:0;padding:0 " + opt['editIconPadding'] + "px;width:" + opt['editIconWidth'] + "px;height:" + height + "px;background:url(" + opt['urlEditIcon'] + ") no-repeat center transparent}");
	}
	rules.push(gridId + opt['classSuccess'] + "{background:" + opt['successBackground'] + "}");
	rules.push(gridId + opt['classFailure'] + "{background:" + opt['failureBackground'] + "}");
	return rules.join("");
};

prototype.onCreateDynamicCss = function() {
	var cellSel = this.grid.view._getCellSelector(),
		padding = this.grid.view._getPadding(),
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

prototype._onRenderHeader = function(html) {
	html.push("<span class='" + this._options['classEditIcon'] + "'></span>");
};

prototype._onRenderCell = function(rowIdx, colIdx, datarow, colDef, cellHtml) {
	if (this.grid.dataMgr.isReal(datarow)) {
		cellHtml.push("<span class='" + this._options['classEditIcon'] + "' title='Ŭ���Ͽ� �������� �����մϴ�' onclick='JGM.m.EditManager." + this.mid + ".beginEdit(\"" + datarow[this.grid.dataMgr.idKey] + "\",\"" + colDef['key'] + "\")'></span>");
	}
};

prototype.cancelMouseEvent = function(e) {
	return !Util.hasTagAndClass(e.target, "DIV", this._options['classEditIcon']);
};

prototype.beginEdit = function(id, key) {
	this.begin(JGM.create("Cell", {'grid':this.grid, 'datarow':this.grid.dataMgr.getById(id), 'colDef':this.grid.colDefMgr.getByKey(key)}));
};

prototype._dblclickCanvas = function(e, cell) {
	if (!cell.isEdited()) {
		this.begin(cell);
	}
};

prototype._keydownCanvas = function(e) {
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
			if (e.which === Util.keyMapKeydown.del && this._options['deleteEnabled']) {
				this._deleteContent(this.grid.selMgr.getCell());
			}
			else if (this._beginEditKeys[e.which]) {
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

@function {boolean} active
@returns {boolean} ������ Ȱ��ȭ ����

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

prototype._isEdited = function(cell) {
	return this.active() && this.editor.cell.equals(cell);
};

prototype._onGetColCellClass = function(colDef) {
	if (Util.isNotNull(colDef['editor'])) {
		return this._options['classCellEditable'];
	}
	else {
		return this._options['classCellNotEditable'];
	}
};

/**
���� ���� ������ �ǰ� �ִ����� �����մϴ�.

@function {boolean} JGM.Cell.isEdited
@returns {boolean} ���� ������ ����

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
JGM.Cell.prototype.isEdited = function() {
	return this.grid.editMgr._isEdited(this);
};

/**
�� ������ ���� �����մϴ�.

@function {boolean} JGM.Cell.setValue
@param {string} value - �� �����Ϳ� ���� ���� ��

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
JGM.Cell.prototype.setValue = function(value) {
	var datarow = this.getDatarow(),
		key = this.getKey(),
		res;

	if (Util.isNotNullAnd(datarow, key)) {
		res = this.grid.dataMgr.updateByKey(datarow, key, value, {'noSort':true, 'noFilter':true, 'noRerender':true});
      if (res === true) {
			this.grid.view.rerenderRow(datarow);
      }
	}
	return res;
};


/**
�־��� ���� ����Ʈ ���������� üũ�մϴ�.

@function {} isEditable 
@param {JGM.Cell} cell - ����Ʈ�� �������� üũ�� ��
@returns {boolean} ����Ʈ�� �����ϸ� true �ƴϸ� false �� �����մϴ�.

@author ����ȣ
@since 1.1.0
@version 1.1.0
*/
prototype.isEditable = function(cell) {
	return Util.isNotNull(cell) && Util.isNotNull(cell.getColDef().editor) && this.grid.dataMgr.isReal(cell.getDatarow());
};

/**
�־��� ���� �������� �����մϴ�.

@function {} begin
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

	cell.get$().addClass(this._options['classEdit']);
	this.editor.focus();
};

/**
���� �������� �������� ����մϴ�. �� �����ʹ� ������� �ʽ��ϴ�.

@function {} cancel

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
	this._deleteEditor();
	cell.get$().removeClass(this._options['classEdit']);
	this.grid.view.focus();
};

prototype._deleteEditor = function() {
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

@function {} commit

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
			classRes = this._options['classFailure'];
         $cell.addClass(classRes);
			setTimeout(function() {$cell.removeClass(classRes);}, 1000);
      }
      else {
         this._deleteEditor();
         this.grid.view.focus();
			classRes = this._options['classSuccess'];
			this.grid.printMessage("Successfully Updated.");
         $cell.addClass(classRes);
			setTimeout(function() {$cell.removeClass(classRes);}, 1000);
      }
	}
	cell.get$().removeClass(this._options['classEdit']);
		
	this.beingCommitted = false;
};

prototype._deleteContent = function(cell) {
	if (this.active() || !this.isEditable(cell)) {
		return;
	}
	var colDef = cell.getColDef();
	if (cell.getValue() === colDef['defaultValue']) {
		return;
	}

	cell.setValue(colDef['defaultValue']);
};

prototype._deleteContents = function(e, selectionRows, selectionCols) {
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
				defaultValue = colDef['defaultValue'];
				key = colDef['key'];

				if (Util.isNull(colDef['editor'])) {
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
				updates[row] = {'datarow':datarow, 'change':{}};
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

@class {Editor} JGM.Editor

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/

/**
Editor ����Ʈ���� �Դϴ�.

@constructor {Editor} Editor
@param {Object} args - Editor ��� �Ķ���� ������Ʈ
@... {Function(): string} args.edit - �� �ȿ� �� �����͸� ������ �ϴ� HTML String �� �����ϴ� function �Դϴ�.
@... {Function()} args.focus - �� �������� ���ۉ����� �����͸� focus ���ִ� function �Դϴ�.
@... {Function(*): boolean} args.valid - �־��� ���� valid ������ �����մϴ�.
@... {Object Function} args.value - ������ ���� ���� �����մϴ�.
@returns {Editor} Editor ��� �ν��Ͻ��� �����մϴ�.

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/

function Editor(args) {
	/**
	{@link JGM} �� �Ҵ����ִ� Editor ��� ���� ���̵��Դϴ�. �б� ����.

	@var {string} mid

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/

	/**
	Editor �� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�.

	@var {JGM.Grid} grid

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/

	/**
	Editor �� ���� ������ ���� {@link JGM.Cell Cell} �ν��Ͻ�.

	@var {JGM.Cell} cell

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

@function {string} edit
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

@function {} focus

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

@function {boolean} valid
@param {?} value - ���� ����� ���� {@link value} �Լ����� ���ϵǴ� ���Դϴ�.
@returns {boolean} �� ���� ���� ����ÿ� ����� ������ validity

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

@function {boolean} value
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

@function {string} path
@returns {string} ���� �������� path ��Ʈ��

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
}());

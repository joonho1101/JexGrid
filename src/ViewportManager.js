goog.require('jx.util');
goog.require('jx.grid');
goog.require('jx.grid.BaseModule');
goog.require('jx.grid.Grid');
goog.require('jx.grid.Cell');
goog.require('jx.grid.ColumnManager');
goog.require('jx.data.DataManager');

goog.provide('jx.grid.ViewportManager');

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

 goog.exportSymbol('jx.grid.ViewportManager', ViewportManager);
JGM._add("ViewportManager", ViewportManager);

/**
ViewportManager ���. �׸��� �ο�� ���� ���� ���̺��� ����ϴ� ����Դϴ�.
@module ViewportManager

@requires JGM
@requires JGM.Grid
@requires JGM.ColDefManager
@requires JGM.DataManager
@requires JGM.EventManager
@requires JGM.Cell
 */

/**
ViewportManager Ŭ����. ���� �ο�/�� �������� �ο��� ĳ���� �����մϴ�.

@class {ViewportManager} JGM.ViewportManager

@author ����ȣ
@since 1.0.0
@version 1.3.1
*/

/**
ViewportManager ����Ʈ���� �Դϴ�.

@constructor {ViewportManager} ViewportManager
@param {Object} args - ViewportManager ��� �Ķ���� ������Ʈ
@... {jQuery} args.container - ViewportManager �� ���� �����̳� ������Ʈ
@... {JGM.Grid} args.grid - ViewportManager �� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�
@... {Object} args.options - ViewportManager �ɼ� ������Ʈ
@returns {ViewportManager} ViewportManager ��� �ν��Ͻ��� �����մϴ�.

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
function ViewportManager(args) {
	/**
	{@link JGM} �� �Ҵ����ִ� ViewportManager ��� ���� ���̵��Դϴ�. �б� ����.

	@var {string} mid

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.mid = args.mid;

	this._ctnr = args['container'];
	this._mask;
	this._canvas;

	/**
	ViewportManager �� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�.

	@var {JGM.Grid} grid

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid = args.grid;

	/**
	�׸����� �ο�� ���� ������ �� ����Ʈ ���� �̺�Ʈ�� �����ϴ� {@link JGM.ViewportManager ViewportManager} �ν��Ͻ� �Դϴ�.

	@var {JGM.ViewportManager} JGM.Grid.view

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid['view'] = this;

	/**
	ViewportManager ����� �⺻ �ɼ� ������ �����մϴ�.

	@type {Object} options
	@private

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	var options = {
		/**
		�׸��� �ο��� �ε��� ���� ���� �ε��� ��� Attribute �̸�. <br>�⺻��:<code>"r"</code>

		@type {string=} JGM.ViewportManager.options.attrRowIdx
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'attrRowIdx':					"r",

		/**
		����Ʈ�� ��ũ�� �� ��� ���� �߰��ؾ� �Ǵ� �ο��� ���� �� �� �̸��� ���
		�߰����� �ʽ��ϴ�. <br>�⺻��:<code>3</code>

		@type {number=} JGM.ViewportManager.options.appendThreshold
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'appendThreshold':			3,

		/**
		����Ʈ�� ��ũ�� �� ��� ���� �߰��ؾ� �Ǵ� �ο��� ���� �� �� �̻��� ���
		���ο� �ο���� �ٿ����� �ʰ� ��ü �������� �ٽ� ������ �մϴ�. <br>�⺻��:<code>10</code>

		@type {number=} JGM.ViewportManager.options.renderThreshold
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'renderThreshold':			10,

		/**
		ĵ������ ������ �� ���, ��ũ���� �ڿ��������� ���� ȭ�鿡 ���̴� �ο�� �̿ܿ�
		�� �ķ� �� ���� �� ��ŭ �ο���� �߰������� �������մϴ�. <br>�⺻��:<code>6</code>

		@type {number=} JGM.ViewportManager.options.bufferSize
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'bufferSize':					6,

		/**
		����Ʈ�� �� ��ũ�� �������� ������ ������ �ο���� ���� ���մϴ�. ����Ʈ��
		���̸� ����� �� ���˴ϴ�. <br>�⺻��:<code>10</code>

		@type {number=} JGM.ViewportManager.options.rowsPerPage
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'rowsPerPage':			10,

		/**
		�ο��� ������ �ȼ��� �Դϴ�. padding �� border �� ������ �� ���� �����Դϴ�. <br>�⺻��:<code>20</code>

		@type {number=} JGM.ViewportManager.options.rowH
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'rowH':						21,

		/**
		�� border �� �β��� �ȼ��� �Դϴ�. <br>�⺻��:<code>1</code>

		@type {number=} JGM.ViewportManager.options.borderThickness
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'borderThickness': 1,

		/**
		�� border �� ��Ÿ���� ���մϴ�. <br>�⺻��:<code>"solid #D0D7E5"</code>

		@type {string=} JGM.ViewportManager.options.border
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'border':						"solid #D0D7E5",

		/**
		�� padding �� �ȼ��� �Դϴ�. <br>�⺻��:<code>1</code>

		@type {number=} JGM.ViewportManager.options.padding
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'padding':					1,

		/**
		Ȧ����° �ο�� ¦����° �ο��� �������� �ٸ��� �� �� ���մϴ�. <br>�⺻��:<code>false</code>

		@type {boolean=} JGM.ViewportManager.options.evenOddRows
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'evenOddRows':				false,

		/**
		{@link JGM.ViewportManager.options.evenOddRows evenOddRows} �� true �� ���,
		Ȧ����° �ο�鿡 ����� �������Դϴ�. <br>�⺻��:<code>"#F4F4F4"</code>

		@type {string=} JGM.ViewportManager.options.oddRowsBackground
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'oddRowsBackground':			"#F4F4F4",

		/**
		ViewportManager �����̳ʿ� ����Ǵ� CSS style �Դϴ�.<br>
		������ ��: �� �ɼǿ� �Էµ� style �� ����Ǿ����� DOM �� ũ�Ⱑ ���ϸ� �׸����� �������� ũ�� ��꿡 ������ ����ϴ�.
		��, ũ�⿡ ������ ���� style ������ �Ҷ��� ����ϼ���.
		<br>�⺻��:<code>""</code>

		@type {string=} JGM.ViewportManager.options.style
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'style': "",

		/**
		�׸��� ĵ�ٽ��� ����Ǵ� CSS style �Դϴ�.<br>
		������ ��: �� �ɼǿ� �Էµ� style �� ����Ǿ����� DOM �� ũ�Ⱑ ���ϸ� �׸����� �������� ũ�� ��꿡 ������ ����ϴ�.
		��, ũ�⿡ ������ ���� style ������ �Ҷ��� ����ϼ���.
		<br>�⺻��:<code>""</code>

		@type {string=} JGM.ViewportManager.options.canvasStyle
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'canvasStyle': "",

		/**
		��� �׸��� �ο쿡 ���������� ����Ǵ� CSS style �Դϴ�.<br>
		������ ��: �� �ɼǿ� �Էµ� style �� ����Ǿ����� DOM �� ũ�Ⱑ ���ϸ� �׸����� �������� ũ�� ��꿡 ������ ����ϴ�.
		��, ũ�⿡ ������ ���� style ������ �Ҷ��� ����ϼ���.
		<br>�⺻��:<code>""</code>

		@type {string=} JGM.ViewportManager.options.rowStyle
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'rowStyle': "",

		/**
		��� �׸��� ���� ���������� ����Ǵ� CSS style �Դϴ�.<br>
		������ ��: �� �ɼǿ� �Էµ� style �� ����Ǿ����� DOM �� ũ�Ⱑ ���ϸ� �׸����� �������� ũ�� ��꿡 ������ ����ϴ�.
		��, ũ�⿡ ������ ���� style ������ �Ҷ��� ����ϼ���.
		<br>�⺻��:<code>""</code>

		@type {string=} JGM.ViewportManager.options.cellStyle
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'cellStyle': "",

		/**
		��� �׸��� �ο쿡 ���������� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-row"</code>

		@type {string=} JGM.ViewportManager.options.classRow
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classRow':						"jgrid-row",

		/**
		��� �׸��� ���� ���������� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-cell"</code>

		@type {string=} JGM.ViewportManager.options.classCell
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classCell':					"jgrid-cell",

		/**
		�׸��� ����Ʈ�� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-viewport"</code>

		@type {string=} JGM.ViewportManager.options.classView
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classView':				"jgrid-viewport",

		/**
		�׸��� ĵ������ ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-canvas"</code>

		@type {string=} JGM.ViewportManager.options.classCanvas
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classCanvas':				"jgrid-canvas",

		/**
		�׸��� �䰡 ��Ŀ�� �Ǿ��� ��� �������� ���� ��� ��Ÿ���Դϴ�. <br>�⺻��:<code>"#FFF"</code>

		@type {Object=} JGM.ViewportManager.options.focusBackground
		@private

		@author ����ȣ
		@since 1.1.5
		@version 1.1.5
		*/
		'focusBackground':			"#FFF",

		/**
		�׸��� �䰡 ��Ŀ�� �Ǿ��� ��� �������� �ƿ����� ��Ÿ���Դϴ�. <br>�⺻��:<code>"2px solid #f1ca7f"</code>

		@type {Object=} JGM.ViewportManager.options.focusOutline
		@private

		@author ����ȣ
		@since 1.1.5
		@version 1.1.5
		*/
		'focusOutline': "2px solid #f1ca7f",

		/**
		true �� ���������� ��� view �� ���̰� ��� �ο츦 �����ϵ��� �ڵ� ����˴ϴ�. <br>�⺻��:<code>false</code>

		@type {boolean=} JGM.ViewportManager.options.autoHeight
		@private

		@author ����ȣ
		@since 1.1.7
		@version 1.1.7
		*/
		'autoHeight': false,

		'autoWidth': false
	};

	this._options = JGM._extend(options, args['options']);

	this._vars = {
		drag:			false,
		_lastScrollTop:		0,
		_lastScrollLeft:		0,
		_lastRowLen:			0
	};

	this._renderedRows = {};
	this._lockedRows = {};

	this._colLefts = [0];

	this.__init();
}

ViewportManager.getInstance = function(args) {
	return new ViewportManager(args);
};

var prototype = ViewportManager.prototype;

prototype.__init = function() {
	this._mask =
		$("<div class='" + this._options['classView'] + "' tabIndex='0' onscroll='JGM.m.ViewportManager." + this.mid + "._scroll()'>")
		.appendTo(this._ctnr);

	this._canvas =
		$("<div class='" + this._options['classCanvas'] + "'>")
		.appendTo(this._mask);

	// disable text selection in grid cells except in input and textarea
	// elements (this is IE-specific, because selectstart event will
	// only fire in IE)
	this._mask.bind("selectstart.ui", function (event) {
		return $(event.target).is("input, textarea");
	});
	//JGM.ColHeader._disableSel(this._mask);

	this._setColLefts();

	this._vars._lastRowLen = this.grid['dataMgr'].datalist.length;

	this.grid['event'].bind({
		'canvasFind': this._canvasFind,
		'onCreateCss': this._onCreateCss,
		'onCreateDynamicCss': this._onCreateDynamicCss,
		'onDestroy': this._onDestroy,
		'keydown': this._keydown,
		'keyup': this._keyup,
		'keypress': this._keypress,
		'mousein': this._mousein,
		'mouseout': this._mouseout,
		'mouseenter': this._mouseenter,
		'mouseleave': this._mouseleave,
		'mousemove': this._mousemove,
		'mouseover': this._mouseover,
		'mousedown': this._mousedown,
		'mouseup': this._mouseup,
		'click': this._click,
		'dblclick': this._dblclick,
		'resizeWidth': this._setWidth,
		"resizeWidth onResizeCol onResizeCanvasHeight": this._resizeWidth,
		//'resizeHeight': this.resizeHeight,
		'onAfterRefresh': this.onAfterRefresh,
		'onRenderModules': this._render,
		'onReorderCols': this._onReorderCols,
		'onResizeCanvasWidth': this._scroll,
		'onUpdateDatarow': this.onUpdateDatarow,
		'onUpdateDatalist': this.onUpdateDatalist,
		'onRemoveDatarow': this.onRemoveDatarow,
		'onRemoveDatalist': this.onRemoveDatalist,
		'onIdChange':this.onIdChange,
		'onIdListChange':this.onIdListChange,
		'unsetDrag':this.unsetDrag		
	}, this);
};

prototype.unsetDrag = function() {
	this._vars.drag = false;
};

prototype._onDestroy = function() {
	JGM._destroy(this, {
		name: "ViewportManager",
		path: "view",
		"$": "canvas _mask",
		property: "ctnr",
		map: "vars _lockedRows _renderedRows _options"
	});
};

prototype._onCreateCss = function() {
	var gridId = "#" + this.grid['mid'] + " .",
		opt = this._options,
		cellSel = gridId + opt['classCell'],
		rowSel = gridId + opt['classRow'],
		border = opt['borderThickness'] + "px " + opt['border'],
		attrRowIdx = rowSel + "[" + opt['attrRowIdx'],
		colDefs = this.grid['colDefMgr'].get(),
      clen = colDefs.length,
      i = 0,
		rules = [];

	rules.push(gridId + opt['classView'] + "{height:" + this._calHeight() + "px;outline:0;position:relative;white-space:nowrap;overflow:auto;line-height:" + opt['rowH'] + "px;cursor:default;-moz-user-select:none;-webkit-user-select:none;" + opt['style'] + "}");
	rules.push(gridId + opt['classView'] + ":focus{background:" + opt['focusBackground'] + ";outline:" + opt['focusOutline'] + "}");
	rules.push(gridId + opt['classCanvas'] + "{height:" + this._calCanvasHeight() + "px;" + opt['canvasStyle'] + ";background:#fff}");
	rules.push(rowSel + "{position:absolute;" + opt['rowStyle'] + "}");
	rules.push(cellSel + "{height:" + opt['rowH'] + "px;border-bottom:" + border + ";display:inline-block;white-space:nowrap;overflow:hidden;float:left;text-overflow:ellipsis;padding-left:" + opt['padding'] + "px;border-right:" + border + ";" + opt['cellStyle'] + "}");
	
	if (opt['evenOddRows']) {
		rules.push(
			attrRowIdx + "$='1']," +
			attrRowIdx + "$='3']," +
			attrRowIdx + "$='5']," +
			attrRowIdx + "$='7']," +
			attrRowIdx + "$='9']{background:" + opt['oddRowsBackground'] + "}");
   }

	for (; i < clen; i++) {
		rules.push(cellSel + ".k_" + colDefs[i].key + "{" + colDefs[i].style + "}");
   }

	return rules.join("");
};

prototype._onCreateDynamicCss = function() {
	var cellSel = "#" + this.grid['mid'] + " ." + this._options['classCell'],
      str = this._getRowSelector() + "{width:" + this._calCanvasWidth() + "px}",
      colDefs = this.grid['colDefMgr'].get(),
      clen = colDefs.length,
      i = 0;
	for (; i < clen; i++) {
		str += cellSel + ".k_" + colDefs[i].key + "{width:" + colDefs[i].width + "px}";
   }

	return str;
};


prototype.onUpdateDatarow = function(datarow, change, before) {
	if (this.isRendered(datarow)) {
		this.rerenderRow(datarow);
	}
};

prototype.onUpdateDatalist = function(datalist, changes, befores) {
	var datarow,
		 len = datalist.length,
		 i = 0;
	for (; i < len; i++) {
		datarow = datalist[i];
		if (this.isRendered(datarow)) {
			this.rerenderRow(datarow);
		}
	}
};

prototype.onRemoveDatarow = function(datarow) {
	this.destroyRow(datarow);
};

prototype.onRemoveDatalist = function(datalist) {
	var len = datalist.length,
		i = 0;
	for (; i < len; i++) {
		this.destroyRow(datalist[i]);
	}
};

//tested
prototype.onIdChange = function(datarow, before, after) {
   var attrChanged = false,
       node;
   if (this.isRowLockedById(before)) {
		this._lockedRows[after] = this._lockedRows[before];
		delete this._lockedRows[before];
   }
	if (this.isRenderedById(before)) {
		(this._renderedRows[after] = this._renderedRows[before]).setAttribute('i', after);
      attrChanged = true;
		delete this._renderedRows[before];
	}
};

//tested
prototype.onIdListChange = function(datalist, befores, idKey) {
   var len = datalist.length,
      i = 0,
      locked = this._lockedRows,
      rendered = this._renderedRows,
      before,
      after,
      attrChanged,
      node;
   for (; i < len; i++) {
      before = befores[i];
      after = datalist[i][idKey];
      attrChanged = false;
      if (locked.hasOwnProperty(before)) {
         locked[after] = locked[before];
         delete locked[before];
      }
      if (rendered.hasOwnProperty(before)) {
         (rendered[after] = rendered[before]).setAttribute('i', after);
         attrChanged = true;
         delete rendered[before];
      }
   }
};

prototype._getCellSelector = function() {
	return "#" + this.grid['mid'] + " ." + this._options['classCell'];
};

prototype._getRowSelector = function() {
	return "#" + this.grid['mid'] + " ." + this._options['classRow'];
};

/**
�־��� �ε����� ���� ���� ��ũ���մϴ�.

@function {} scrollTo
@param {number} row - ���� �ο� �ε���
@param {number} col - ���� �÷� �ε���

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.scrollTo = function(row, col) {
	this.scrollToRow(row);
   this.scrollToCol(col);
};

//tested
/**
�־��� �ο� �ε����� lazy �ϰ� ��ũ���մϴ�.
�̹� ȭ�� ���� ���� ���, ��ũ�� ���� �ʽ��ϴ�.

@function {number} scrollToRowLazy
@param {number} row - ��ũ�� �� �ο� �ε���
@return {number} scrollTop - ���ο� scrolltop ��

@author ����ȣ
@since 1.3.0
@version 1.3.0
*/
prototype.scrollToRowLazy = function(row) {
   var scrollTop = this.getScrollTop();
   if (Util.isNull(row)) {
      return scrollTop;
   }
	if (this._getLastSafeVisibleRow() < row) {
		return this.scrollToRow(this._getFirstRowForSafe(row));
   }
	if (this._getFirstSafeVisibleRow() > row) {
		return this.scrollToRow(row);
   }
   return scrollTop;
};

/**
�־��� �÷� �ε����� lazy �ϰ� ��ũ���մϴ�.
�̹� ȭ�� ���� ���� ���, ��ũ�� ���� �ʽ��ϴ�.

@function {number} scrollToColLazy
@param {number} col - ��ũ�� �� �÷� �ε���
@return {number} scrollLeft - ���ο� scrollLeft ��

@author ����ȣ
@since 1.3.0
@version 1.3.0
*/
prototype.scrollToColLazy = function(col) {
   var scrollLeft = this.getScrollLeft();
   if (Util.isNull(col)) {
      return scrollLeft;
   }
	if (this._getLastSafeVisibleCol() < col) {
		return this.setScrollLeft(this.getScrollHForSafe(col));
   }
	else if (this._getFirstSafeVisibleCol() > col) {
		return this.scrollToCol(col);
   }
   return scrollLeft;
};

/**
�־��� �ε����� ���� ���� lazy �ϰ� ��ũ���մϴ�.
�̹� ȭ�� ���� ���� ���, ��ũ�� ���� �ʽ��ϴ�.

@function {} scrollToLazy
@param {number} row - ���� �ο� �ε���
@param {number} col - ���� �÷� �ε���

@author ����ȣ
@since 1.3.0
@version 1.3.0
*/
prototype.scrollToLazy = function(row, col) {
   this.scrollToRowLazy(row);
   this.scrollToColLazy(col);
};

/**
�־��� �ε����� �ο�� ��ũ���մϴ�.

@function {} scrollToRow
@param {number} row - �ο� �ε���

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
//tested
prototype.scrollToRow = function(i) {
   if (Util.isNotNull(i)) {
      return this.setScrollTop(this._getRowOuterHeight() * i);
   }
   return this.getScrollTop();
};

/**
�־��� �ε����� �÷����� ��ũ���մϴ�.

@function {} scrollToCol
@param {number} col - �÷� �ε���

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.scrollToCol = function(i) {
	return this.setScrollLeft(this.getColLeft(i));
};

prototype._getColInnerWidth = function(i) {
	return this.grid['colDefMgr'].get(i).width;
};

prototype._getColInnerWidthByKey = function(i) {
	return this.grid['colDefMgr'].getByKey(i).width;
};

/**
�־��� �ε����� �÷��� �� �ȼ��� �����մϴ�.

@function {number} getColWidth
@param {number} col - �÷� �ε���
@returns {number} �־��� �ε����� �÷��� ��

@author ����ȣ
@since 1.1.7
@version 1.1.7
*/
prototype.getColWidth = function(i) {
	return this.grid['colDefMgr'].get(i).width + this._options['padding'];
};

/**
�־��� Ű�� ���� �÷��� �� �ȼ��� �����մϴ�.

@function {number} getColWidthByKey
@param {string} key - �÷� Ű
@returns {number} �־��� Ű�� ���� �÷��� ��

@author ����ȣ
@since 1.1.7
@version 1.1.7
*/
prototype.getColWidthByKey = function(i) {
	return this.grid['colDefMgr'].getByKey(i).width + this._options['padding'];
};

prototype._getColOuterWidth = function(i) {
	return this.grid['colDefMgr'].get(i).width + this._options['padding'] + this._options['borderThickness'];
};

prototype._getColOuterWidthByKey = function(i) {
	return this.grid['colDefMgr'].getByKey(i).width + this._options['padding'] + this._options['borderThickness'];
};

prototype._getPadding = function() {
	return this._options['padding'];
};

prototype._colWidthPlus = function() {
	return this._options['padding'] + this._options['borderThickness'];
};

prototype._getRowOuterHeight = function() {
	return this._options['rowH'] + this._options['borderThickness'];
};

prototype._getRowInnerHeight = function() {
	return this._options['rowH'];
};

prototype._calHeight = function() {
	if (this._options['autoHeight']) {
		return this._calCanvasHeight() + (this.grid['width']() < this._calCanvasWidth() ? this.grid['_vars'].scrollbarDim.h: 0);
   }
	return this._getRowOuterHeight() * this._options['rowsPerPage'];
};

/**
���� ��ũ�ѹٰ� ���� ��� ��ũ�ѹ��� ���̸� ������ ���� ���� �ȼ��� �����մϴ�.

@function {number} getHeight
@returns {number} ���� ���� �ȼ�

@author ����ȣ
@since 1.0.0
@version 1.1.7
*/
prototype.getHeight = function() {
	return this._mask[0].offsetHeight;
};

/**
���� ��ũ�ѹٰ� ���� ��� ��ũ�ѹ��� ���̸� �� ���� ���� ���� �ȼ��� �����մϴ�.

@function {number} getInnerHeight
@returns {number} ���� ���� ���� �ȼ�

@author ����ȣ
@since 1.0.0
@version 1.1.7
*/
prototype.getInnerHeight = function() {
	return this._mask[0].clientHeight;
};

prototype._getWidth = function() {
	return this._mask[0].offsetWidth;
};

/**
���� ��ũ�ѹٰ� ���� ��� ��ũ�ѹ��� ���� �� ���� ���� �� �ȼ��� �����մϴ�.

@function {number} getInnerWidth
@returns {number} ���� ���� �� �ȼ�

@author ����ȣ
@since 1.0.0
@version 1.1.7
*/
prototype.getInnerWidth = function() {
	return this._mask[0].clientWidth;
};

prototype._calCanvasHeight = function() {
	return this._getRowOuterHeight() * this.grid['dataMgr'].datalist.length;
};

/**
��� �׸��� �ο츦 �����ϰ� �ִ� ĵ������ ���� ���� �ȼ��� �����մϴ�.

@function {number} getCanvasHeight
@returns {number} ĵ������ ���� �ȼ�

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.getCanvasHeight = function() {
	return this._canvas[0].clientHeight;
};

prototype._setCanvasHeight = function(h) {
	h = parseInt(h);
	if (isNaN(h) || h < 1) {
		return;
	}
	var old = this.getCanvasHeight();
	if (h != old) {
		this._canvas[0].style.height = h + "px";
		/**
		ĵ�ٽ��� ���̰� ������ ��� Ʈ���ŵǴ� �̺�Ʈ �Դϴ�.

		@event {Event} onResizeCanvasHeight
		@param {number} new - ĵ�ٽ��� ���ο� ���� �ȼ�
		@param {number} old - ĵ�ٽ��� ���� ���� �ȼ�

		@author ����ȣ
		@since 1.1.7
		@version 1.1.7
		*/
		this.grid['event'].trigger("onResizeCanvasHeight", [h, old]);
	}
};

prototype._calCanvasWidth = function() {
	return this._colLefts[this.grid['colDefMgr'].length()];
};

/**
��� �׸��� �÷��� �����ϰ� �ִ� ĵ������ ���� �� �ȼ��� �����մϴ�.

@function {number} getCanvasWidth
@returns {number} ĵ������ �� �ȼ�

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.getCanvasWidth = function() {
	return this._canvas[0].clientWidth;
};

prototype._setCanvasWidth = function(w) {
	w = parseInt(w);
	if (isNaN(w) || w < 1) {
		return;
	}
	var old = this.getCanvasWidth();
	if (w != old) {
		this._canvas[0].style.width = w + "px";

		/**
		ĵ�ٽ��� ���� ������ ��� Ʈ���ŵǴ� �̺�Ʈ �Դϴ�.

		@event {Event} onResizeCanvasWidth
		@param {number} new - ĵ�ٽ��� ���ο� �� �ȼ�
		@param {number} old - ĵ�ٽ��� ���� �� �ȼ�

		@author ����ȣ
		@since 1.1.7
		@version 1.1.7
		*/
		this.grid['event'].trigger("onResizeCanvasWidth", [w, old]);
	}
};


/**
�־��� �ε����� �÷��� <code>left</code> �ȼ� ���� �����մϴ�.

@function {number} getColLeft
@param {number} col - �÷� �ε���
@returns {number} �־��� �ε����� �÷��� <code>left</code> �ȼ� ���� �����մϴ�.

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.getColLeft = function(i) {
	return this._colLefts[i];
};

prototype._getColLefts = function() {
	return this._colLefts;
};

prototype._setColLefts = function(from, to) {
	if (Util.isNull(from)) {
		from = 0;
   }

	var colDefs = this.grid['colDefMgr'].get(), widthPlus = this._colWidthPlus();
	if (Util.isNull(to)) {
		to = colDefs.length;
   }

	for (; from < to; from++)  {
		this._colLefts[from + 1] = this._colLefts[from] + colDefs[from].width + widthPlus;
   }
	return this._colLefts;
};

prototype._onReorderCols = function() {
	this._setColLefts();
	this._rerender();
};


/**
�־��� �÷� Ű�� ���� �÷��� ���� �����մϴ�.

@function {} setWidthByKey
@param {string} key - �÷� Ű
@param {number} width - �� �ȼ�

@author ����ȣ
@since 1.1.7
@version 1.1.7
*/
prototype.setWidthByKey = function(key, w) {
	var colDef = this.grid['colDefMgr'].getByKey(key);
	w = Util.bound(w, colDef['minW'], colDef['maxW']);

	if (w === colDef['width']) {
		return;
   }

	var old = colDef['width'];
	colDef['width'] = w;

	this._setCanvasWidth(this._setColLefts(this.grid['colDefMgr'].getIdxByKey(key))[this.grid['colDefMgr'].length()]);

	this.grid['_recreateDynamicCss']();

	/**
	�÷��� ���� ������ ��� Ʈ���ŵǴ� �̺�Ʈ �Դϴ�.

	@event {Event} onResizeCol_COLKEY
	@param {string} key - �÷� Ű
	@param {number} new - �÷��� ���ο� �� �ȼ�
	@param {number} old - �÷��� ���� �� �ȼ�

	@author ����ȣ
	@since 1.1.7
	@version 1.1.7
	*/

	/**
	�÷��� ���� ������ ��� Ʈ���ŵǴ� �̺�Ʈ �Դϴ�.

	@event {Event} onResizeCol
	@param {string} key - �÷� Ű
	@param {number} new - �÷��� ���ο� �� �ȼ�
	@param {number} old - �÷��� ���� �� �ȼ�

	@author ����ȣ
	@since 1.1.7
	@version 1.1.7
	*/
	this.grid['event'].trigger("onResizeCol_" + key + " onResizeCol", [key, w, old]);
};

prototype._autoColWidth = function(key) {
	var res = this._canvasFind(".k_" + key),
      max = Number.MIN_VALUE,
      len = res.length,
      i = 0;
	for (; i < len; i++) {
		if (max < res[i].scrollWidth) {
			max = res[i].scrollWidth;
      }
   }

	max -= this._getPadding();
	this.setWidthByKey(key, max);
};

prototype._setWidth = function(w) {
	w = parseInt(w);
	if (isNaN(w) || w < 1) {
		return;
	}
	this._mask[0].style.width = w + "px";
};

//tested
prototype.getScrollTop = function() {
	return this._mask[0].scrollTop;
};

prototype.getScrollLeft = function() {
	return this._mask[0].scrollLeft;
};

//tested
prototype.setScrollTop = function(t) {
   var scrollTop = this.getScrollTop();
   if (Util.isNotNull(t) && scrollTop != t) {
      return (this._mask[0].scrollTop = t);
   }
   return scrollTop;
};

prototype.setScrollLeft = function(left) {
   var scrollLeft = this.getScrollLeft();
   if (Util.isNotNull(left) && scrollLeft != left) {
      return (this._mask[0].scrollLeft = left);
   }
   return scrollLeft;
};

prototype._hasHScrollbar = function() {
	return this._mask[0].offsetHeight > this._mask[0].clientHeight;
};

prototype._hasVScrollbar = function() {
	return this._mask[0].offsetWidth > this._mask[0].clientWidth;
};

prototype._heightPlus = function() {
	return this._mask[0].offsetHeight - this._mask[0].clientHeight;
};

prototype._widthPlus = function() {
	return this._mask[0].offsetWidth - this._mask[0].clientWidth;
};

//tested
prototype._getFirstVisibleRow = function() {
	return Math.floor(this.getScrollTop() / this._getRowOuterHeight());
};

//tester
prototype._getFirstSafeVisibleRow = function() {
	return Math.ceil(this.getScrollTop() / this._getRowOuterHeight());
};

prototype._getLastVisibleRow = function() {
	return Math.ceil((this.getScrollTop() + this._mask[0].clientHeight) / this._getRowOuterHeight()) - 1;
};

prototype._getLastSafeVisibleRow = function() {
	return Math.floor((this.getScrollTop() + this._mask[0].clientHeight) / this._getRowOuterHeight()) - 1;
};

prototype._getFirstRowForSafe = function(row) {
	return row - Math.floor(this._mask[0].clientHeight / this._getRowOuterHeight()) + 1;
};


prototype._getFirstVisibleCol = function() {
	var scrollLeft = this.getScrollLeft(),
		colLefts = this._colLefts,
		i = 0,
		len = colLefts.length;

	for (; i < len; i++) {
		if (colLefts[i] > scrollLeft) {
			return i - 1;
      }
		if (colLefts[i] === scrollLeft) {
			return i;
      }
	}
	return len - 2;
};

prototype._getFirstSafeVisibleCol = function() {
	var scrollLeft = this.getScrollLeft(),
		colLefts = this._colLefts,
		i = 0,
		len = colLefts.length;

	for (; i < len; i++) {
		if (colLefts[i] >= scrollLeft) {
			return i;
      }
	}
	return len - 2;
};

prototype._getLastVisibleCol = function() {
	var scrollLeft = this.getScrollLeft() + this._mask[0].clientWidth,
		colLefts = this._colLefts,
		i = 0,
		len = colLefts.length;

	for (; i < len; i++) {
		if (colLefts[i] >= scrollLeft) {
			return i - 1;
      }
   }
	return len - 2;
};

prototype._getLastSafeVisibleCol = function() {
	var scrollLeft = this.getScrollLeft() + this._mask[0].clientWidth,
		colLefts = this._colLefts,
		i = 0,
		len = colLefts.length;

	for (; i < len; i++) {
		if (colLefts[i] > scrollLeft) {
			return i - 2;
      }
   }
	return len - 2;
};

prototype._getFirstColForSafe = function(col) {
	var colLefts = this._colLefts,
		left = colLefts[col + 1] - this._mask[0].clientWidth,
		i = col;

	if (left <= 0) {
		return 0;
   }

	for (; i >= 0; i--) {
		if ((i === col && colLefts[i] <= left) || colLefts[i] === left) {
			return i;
      }
		if (colLefts[i] < left) {
			return i + 1;
      }
	}

	return 0;
};

prototype.getScrollHForSafe = function(col) {
	var colLefts = this._colLefts,
		left = colLefts[col + 1] - this._mask[0].clientWidth;

	if (colLefts[col] <= left) {
		return colLefts[col];
   }

	return left;
};


prototype._getRenderRange = function() {
	if (this._options['autoHeight']) {
		return {start:0, end:this.grid['dataMgr'].datalist.length - 1};
   }

	var tmp,
		max = this.grid['dataMgr'].datalist.length - 1;

	return {
		start: (((tmp = (this._getFirstVisibleRow() - this._options['bufferSize'])) < 0) ? 0 : tmp),
		end: (((tmp = (this._getLastVisibleRow() + this._options['bufferSize'])) > max) ? max : tmp)
	};
};

prototype._fitHeight = function() {
	this._mask[0].style.height = this.getCanvasHeight() + this._heightPlus() + "px";
};

prototype._resizeWidth = function(e) {
	if (this._options['autoHeight']) {
		this._fitHeight();
   }
};

prototype.onAfterRefresh = function(args) {
   if (args !== undefined && args['noRerender'] === true) {
      return;
   }
   this._rerender();
};

prototype._rerender = function() {
	/**
	�׸��� �䰡 �ٽ� ������ �Ǳ� ���� �߻��ϴ� �̺�Ʈ �Դϴ�.

	@event {Event} onBeforeRerender

	@author ����ȣ
	@since 1.1.7
	@version 1.1.7
	*/

	// saving scroll states
	var st = this.getScrollTop(),
		sl = this.getScrollLeft();

	this.grid['event'].trigger("onBeforeRerender");
	this.unlockAllRows();
	this._removeRows();
	var rowLen = this.grid['dataMgr'].datalist.length;
	if (this._vars._lastRowLen !== rowLen) {
		this._vars._lastRowLen = rowLen;
		this._setCanvasHeight(this._calCanvasHeight());
	}
	this._render();

	// resetting scrolls
	this.setScrollTop(st);
	this.setScrollLeft(sl);

	this.grid['event'].trigger("onAfterRerender");
};

prototype._render = function(range) {
	/*
	if (this._lockExist()) {
		this._renderShift(range);
	}
	else {
	*/
		this._removeAndRenderRows(range);
	//}
};

prototype._renderShift = function(range) {
	if (Util.isNull(range)) {
		range = this._getRenderRange();
	}

	this._removeRowsExcept(range);
	this._appendRows(range);
};

prototype._removeRows = function(range) {
	var canvas = this._canvas[0],
		rendered = this._renderedRows,
		locked = this._lockedRows,
		id;

	if (Util.isNull(range)) {
		if (this._lockExist()) {
			for (id in rendered) {
				if (rendered.hasOwnProperty(id)) {
					if (locked.hasOwnProperty(id)) {
						canvas.removeChild(rendered[id]);
						delete rendered[id];
					}
				}
			}
		}
		else {
			this._renderedRows = {};
			canvas.innerHTML = "";
		}
	}
	else {
		var i = range.start,
			end = range.end,
			dataMgr = this.grid['dataMgr'];

		for (; i <= end; i++) {
			if (!locked.hasOwnProperty(id = dataMgr.getIdByIdx(i)) && rendered.hasOwnProperty(id)) {
				canvas.removeChild(rendered[id]);
				delete rendered[id];
			}
		}
	}
};

prototype._removeRowsExcept = function(range) {
	var canvas = this._canvas[0],
		rendered = this._renderedRows,
		locked = this._lockedRows,
		id;

	if (Util.isNull(range)) {
		if (this._lockExist()) {
			for (id in rendered) {
				if (rendered.hasOwnProperty(id) && locked.hasOwnProperty(id) === false) {
					canvas.removeChild(rendered[id]);
					delete rendered[id];
				}
			}
		}
		else {
			this._renderedRows = {};
			canvas.innerHTML = "";
		}
	}
	else {
		var start = range.start,
			end = range.end,
			dataMgr = this.grid['dataMgr'],
			i;

		for (id in rendered) {
			if (rendered.hasOwnProperty(id)) {
				if (locked.hasOwnProperty(id) || (start <= (i = dataMgr.getIdxById(id)) && i <= end)) {
					continue;
				}
				canvas.removeChild(rendered[id]);
				delete rendered[id];
			}
		}
	}
};

prototype.destroyRow = function(datarow) {
	return this.destroyRowById(this.grid['dataMgr'].getId(datarow));
};

prototype.destroyRowById = function(id) {
	if (Util.isNotNull(id)) {
		this.unlockRowById(id);
		if (this._renderedRows.hasOwnProperty(id)) {
			this._canvas[0].removeChild(this._renderedRows[id]);
			delete this._renderedRows[id];
		}
	}
};

prototype.destroyRowByIdx = function(i) {
	return this.destroyRowById(this.grid['dataMgr'].getIdByIdx(i));
};

prototype._lockExist = function() {
	return Util.isNotEmptyObj(this._lockedRows);
};

// isRowLocked
// tested

/**
  �־��� ���̵� �ش��ϴ� ������ �ο��� DOMElement ��
  ���� lock �Ǿ� �ִ��� ���θ� �����մϴ�.
  lock �Ǿ� ���� ��� ��ũ���� �Ǿ, DOM Tree ���� ���� ���� �ʽ��ϴ�.

  @function {boolean} isRowLockedById
  @param {string} id - ������ �ο��� ���̵�
  @return {boolean} �ο찡 lock �Ǿ� �ִ� ����

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.isRowLockedById = function(id) {
	if (Util.isNotNull(id)) {
		return this._lockedRows.hasOwnProperty(id);
	}
	return false;
};

/**
  �־��� ������ �ο��� DOMElement ��
  ���� lock �Ǿ� �ִ��� ���θ� �����մϴ�.
  lock �Ǿ� ���� ��� ��ũ���� �Ǿ, DOM Tree ���� ���� ���� �ʽ��ϴ�.

  @function {boolean} isRowLocked
  @param {Object} datarow - ������ �ο�
  @return {boolean} �ο찡 lock �Ǿ� �ִ� ����

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.isRowLocked = function(datarow) {
	return this.isRowLockedById(this.grid['dataMgr'].getId(datarow));
};

/**
  �־��� �ο� �ε����� DOMElement ��
  ���� lock �Ǿ� �ִ��� ���θ� �����մϴ�.
  lock �Ǿ� ���� ��� ��ũ���� �Ǿ, DOM Tree ���� ���� ���� �ʽ��ϴ�.

  @function {boolean} isRowLockedByIdx
  @param {number} rowIdx - �ο� �ε���
  @return {boolean} �ο찡 lock �Ǿ� �ִ� ����

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.isRowLockedByIdx = function(i) {
	return this.isRowLockedById(this.grid['dataMgr'].getIdByIdx(i));
};

// lockRow
// tested
/**
  �־��� ���̵� �ش��ϴ� ������ �ο��� DOMElement �� lock �մϴ�.
  lock �Ǿ� ���� ��� ��ũ���� �Ǿ, DOM Tree ���� ���� ���� �ʽ��ϴ�.

  @function {} lockRowById
  @param {string} id - ������ �ο��� ���̵�

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.lockRowById = function(id) {
	if (Util.isNotNull(id) && this.grid['dataMgr'].hasById(id)) {
		this._lockedRows[id] = true;
	}
};

/**
  �־��� ������ �ο��� DOMElement �� lock �մϴ�.
  lock �Ǿ� ���� ��� ��ũ���� �Ǿ, DOM Tree ���� ���� ���� �ʽ��ϴ�.

  @function {} lockRow
  @param {Object} datarow - ������ �ο�

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.lockRow = function(datarow) {
	return this.lockRowById(this.grid['dataMgr'].getId(datarow));
};

/**
  �־��� �ο� �ε����� DOMElement �� lock �մϴ�.
  lock �Ǿ� ���� ��� ��ũ���� �Ǿ, DOM Tree ���� ���� ���� �ʽ��ϴ�.

  @function {} lockRowByIdx
  @param {number} rowIdx - �ο� �ε���

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.lockRowByIdx = function(i) {
	return this.lockRowById(this.grid['dataMgr'].getIdByIdx(i));
};

//unlockRow
//tested
/**
  �־��� ���̵� �ش��ϴ� ������ �ο��� DOMElement �� unlock �մϴ�.
  lock �Ǿ� ���� ��� ��ũ���� �Ǿ, DOM Tree ���� ���� ���� �ʽ��ϴ�.

  @function {} unlockRowById
  @param {string} id - ������ �ο��� ���̵�

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.unlockRowById = function(id) {
	if (this.isRowLockedById(id)) {
		delete this._lockedRows[id];
	}
};

/**
  �־��� ������ �ο��� DOMElement �� unlock �մϴ�.
  lock �Ǿ� ���� ��� ��ũ���� �Ǿ, DOM Tree ���� ���� ���� �ʽ��ϴ�.

  @function {} unlockRow
  @param {Object} datarow - ������ �ο�

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.unlockRow = function(datarow) {
	return this.unlockRowById(this.grid['dataMgr'].getId(datarow));
};

/**
  �־��� �ο� �ε����� DOMElement �� unlock �մϴ�.
  lock �Ǿ� ���� ��� ��ũ���� �Ǿ, DOM Tree ���� ���� ���� �ʽ��ϴ�.

  @function {} unlockRowByIdx
  @param {number} rowIdx - �ο� �ε���

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.unlockRowByIdx = function(i) {
	return this.unlockRowById(this.grid['dataMgr'].getIdByIdx(i));
};

//unlockAllRows
/**
  ��� �ο��� DOM Element �� unlock �մϴ�.

  @function {} unlockAllRows

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.unlockAllRows = function() {
	this._lockedRows = {};
};

/**
  �־��� ���̵� �ش��ϴ� ������ �ο��� DOMElement �ٽ� ������ �մϴ�.

  @function {} rerenderRowById
  @param {string} id - ������ �ο��� ���̵�

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.rerenderRowById = function(id) {
	// check if valid id
	if (!this.grid['dataMgr'].containsById(id)) {
		return;
	}

	var rmap = this._renderedRows,
		canvas = this._canvas[0],
		datam = this.grid['dataMgr'],
		i = datam.getIdxById(id),
		datarow = datam.getById(id),
		colDefs = this.grid['colDefMgr'].get(),
		colCommon = this._getColCellClasses(colDefs),
		rowH = this._getRowOuterHeight(),
		html = [],
		newNodes;

	// remove from map
	if (rmap.hasOwnProperty(id)) {
		canvas.removeChild(rmap[id]);

		// fire event to notify onBeforeRenderRows
		this.grid['event'].trigger("onBeforeRenderRows", [[i]]);

		// render and append to canvas
		this._renderRow(html, i, datarow, colDefs, colCommon, rowH);
		rmap[id] = Util.appendHTML(canvas, html.join(""))[0];

		// fire event to notify rendere completion
		this.grid['event'].trigger("onAppendRows", [[i]]);
	}

};

/**
  �־��� ������ �ο��� DOMElement �ٽ� ������ �մϴ�.

  @function {} rerenderRow
  @param {Object} datarow - ������ �ο�

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.rerenderRow = function(datarow) {
	return this.rerenderRowById(this.grid['dataMgr'].getId(datarow));
};

/**
  �־��� �ο� �ε����� DOMElement �ٽ� ������ �մϴ�.

  @function {} rerenderRowByIdx
  @param {number} rowIdx - �ο� �ε���

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.rerenderRowByIdx = function(i) {
	return this.rerenderRowById(this.grid['dataMgr'].getIdByIdx(i));
};


/**
  �־��� ������ �ο� ���̵� �ش��ϴ� ������ �ο��
  �÷� Ű�� �ش��ϴ� ���� DOM Element �� �ٽ� �������մϴ�.

  @function {} rerenderCellByIdAndKey
  @param {string} id - ������ �ο� ���̵�
  @param {string} key - �÷� Ű

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.rerenderCellByIdAndKey = function(id, key) {
	var cellnode = this.getCellByIdAndKey(id, key);
	if (cellnode !== undefined) {
		var datam = this.grid['dataMgr'],
			colm = this.grid['colDefMgr'],
			datarow = datam.getById(id),
			colDef = colm.getByKey(key),
			row = datam.getIdxById(id),
			col = colm.getIdxByKey(key);

		cellnode.innerHTML = this._renderCell([], row, col, datarow, colDef).join("");
	}
};

/**
  �־��� �ο� �ε����� �÷� �ε����� �ش��ϴ� ���� DOM Element �� �ٽ� �������մϴ�.

  @function {} rerenderCellByIdx
  @param {number} row - �ο� �ε���
  @param {number} col - �÷� �ε���

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.rerenderCellByIdx = function(row, col) {
	return this.rerenderCellByIdAndKey(this.grid['dataMgr'].getIdByIdx(row), this.grid['colDefMgr'].getKeyByIdx(col));
};

prototype._appendRows = function(range) {
	this.grid['event'].trigger("onBeforeRenderRows", [range]);
	var html = [],
		i = range.start,
		end = range.end,
		datalist = this.grid['dataMgr'].datalist,
		idKey = this.grid['dataMgr'].idKey,
		colDefs = this.grid['colDefMgr'].get(),
		collen = colDefs.length,
		colCommon = this._getColCellClasses(colDefs),
		rendered = this._renderedRows,
		rowH = this._getRowOuterHeight(),
		canvas = this._canvas[0],
		datarow,
		id,
		added = [],
		node,
		newNodes,
		len;

	for (; i <= end; i++) {
		datarow = datalist[i];
		if (rendered.hasOwnProperty(id = datarow[idKey])) {
			continue;
		}
		this._renderRow(html, i, datarow, colDefs, colCommon, rowH);
		added.push(id);
	}	

	newNodes = Util.appendHTML(canvas, html.join(""));

	for (i = 0, len = added.length; i < len; i++) {
		rendered[added[i]] = newNodes[i];
	}

	this.grid['event'].trigger("onAppendRows", [range]);
};

prototype._removeAndRenderRows = function(range) {
	if (Util.isNull(range)) {
		range = this._getRenderRange();
	}
	this.grid['event'].trigger("onBeforeRenderRows", [range]);

	var html = [],
		i = range.start,
		end = range.end,
		dataMgr = this.grid['dataMgr'],
		datalist = dataMgr.datalist,
		idKey = dataMgr.idKey,
		colDefs = this.grid['colDefMgr'].get(),
		collen = colDefs.length,
		colCommon = this._getColCellClasses(colDefs),
		canvas = this._canvas[0],
		rowH = this._getRowOuterHeight(),
		datarow,
		added = [],
		newRendered = {},
		len;

	for (; i <= end; i++) {
		datarow = datalist[i];
		this._renderRow(html, i, datarow, colDefs, colCommon, rowH);
		added.push(datarow[idKey]);
	}

	canvas.innerHTML = html.join("");

	for (i = 0, len = added.length; i < len; i++) {
		newRendered[added[i]] = canvas.childNodes[i];
	}

	this._renderedRows = newRendered;

	/**
	  �׸��尡 �ο찡 ���� ������ �Ǿ��� �� (�ο찡 �߰��ǰų�, �ٽ� ������ �ǰų�) �߻��ϴ� �̺�Ʈ �Դϴ�.

	  @event {Event} onAppendRows
	  @param {Object} range - ������ �� �ο� ����. ��) range = {start:0, end:10}

	  @author ����ȣ
	  @since 1.2.0
	  @version 1.2.3
	  */
	this.grid['event'].trigger("onAppendRows", [range]);
};

prototype._getColCellClass = function(colDef) {
	var cssClass = this._options['classCell'] + " " + "k_" + colDef['key'];
	if (Util.isNotNull(colDef['colClass'])) {
		cssClass += " " + colDef['colClass'];
	}

	/**
	  �׸��� �÷� ���� css Ŭ������ ������ �� �߻��ϴ� �̺�Ʈ�Դϴ�. Ư�� �÷� ���� �������� css Ŭ������ �߰��Ϸ��� css Ŭ���� ���� �����ϸ� �˴ϴ�.
	  ��) return "��_�÷�����_�־���_css_Ŭ����_��";

	  @event {Event} onGetColCellClass
	  @param {Object} colDef - �÷� ���� ������Ʈ
	  @returns {string} �÷� ���鿡 ���������� �߰��� css Ŭ���� ��

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */
	cssClass += " " + this.grid['event'].trigger("onGetColCellClass", [colDef]).join(" ");
	return cssClass;
};

prototype._getColCellClasses = function(colDefs) {
	var cssClasses = [],
		i = 0,
		len = colDefs.length;
	if (Util.isNull(colDefs)) {
		colDefs = this.grid['colDefMgr'].get();
	}
	for (; i < len; i++) {
		cssClasses.push(this._getColCellClass(colDefs[i]));
	}
	return cssClasses;
};

prototype._renderRow = function(html, rowIdx, datarow, colDefs, colCommon, rowH) {
	html.push("<div class='" + this._options['classRow'] +
			"' i='" + datarow[this.grid['dataMgr'].idKey] +
			"' " + this._options['attrRowIdx'] + "='" + rowIdx +
			"' style='top:" + (rowH * rowIdx) + "px'>");
	var i = 0,
		collen = colDefs.length;
	for (; i < collen; i++) {

		/**
		  �׸��� ���� css Ŭ������ ������ �� �߻��ϴ� �̺�Ʈ�Դϴ�. Ư�� ���� css Ŭ������ �߰��Ϸ��� css Ŭ���� ���� �����ϸ� �˴ϴ�.
		  ��) return "��_������_�־���_css_Ŭ����_��";

		  @event {Event} onGetCellClass
		  @param {number} rowIdx - ���� �ο� �ε���
		  @param {number} colIdx - ���� �÷� �ε���
		  @param {Object} datarow - ���� �ο� ������
		  @param {Object} colDef - ���� �÷� ���� ������Ʈ
		  @returns {string} ���� �߰��� css Ŭ���� ��

		  @author ����ȣ
		  @since 1.1.7
		  @version 1.1.7
		  */
		html.push("<div class='" + colCommon[i] + " " +
				this.grid['event'].trigger("onGetCellClass", [rowIdx, i, datarow, colDefs[i]]).join(" ") + "'>");
		this._renderCell(html, rowIdx, i, datarow, colDefs[i]);
		html.push("</div>");
	}
	html.push("</div>");
	return html;
};

prototype._renderCell = function(html, rowIdx, colIdx, datarow, colDef) {
	/**
	  �׸��� �� �ȿ� prepend �� html �� ������ �� �߻��ϴ� �̺�Ʈ�Դϴ�. prepend �� ������ ������ html �� push ���ָ� �˴ϴ�.
	  ��) html.push("prepend �� ����");

	  @event {Event} onRenderCell_COLKEY_prepend
	  @param {number} rowIdx - ���� �ο� �ε���
	  @param {number} colIdx - ���� �÷� �ε���
	  @param {Object} datarow - ���� �ο� ������
	  @param {Object} colDef - ���� �÷� ���� ������Ʈ
	  @param {Array.<string>} html - ���� append �� html �� ���� ���

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */
	this.grid['event'].trigger("onRenderCell_" + colDef['key'] + "_prepend", [rowIdx, colIdx, datarow, colDef, html]);

	var val = datarow[colDef['key']];
	if (typeof val !== "string" || val.substring(0, 3) !== "J@H") {
		if (colDef['rendererInput']) {
			html.push(colDef['renderer'](JGM.create("Cell", {'grid':this.grid, 'row':rowIdx, 'col':colIdx, 'datarow':datarow, 'colDef':colDef})));
		}
		else {
			html.push(colDef['renderer'](val, rowIdx, colIdx, datarow, colDef, this));
		}
	}

	/**
	  �׸��� �� �ȿ� append �� html �� ������ �� �߻��ϴ� �̺�Ʈ�Դϴ�. append �� ������ ������ html �� push ���ָ� �˴ϴ�.
	  ��) html.push("append �� ����");

	  @event {Event} onRenderCell_COLKEY_append
	  @param {number} rowIdx - ���� �ο� �ε���
	  @param {number} colIdx - ���� �÷� �ε���
	  @param {Object} datarow - ���� �ο� ������
	  @param {Object} colDef - ���� �÷� ���� ������Ʈ
	  @param {Array.<string>} html - ���� append �� html �� ���� ���

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */
	this.grid['event'].trigger("onRenderCell_" + colDef['key'] + "_append", [rowIdx, colIdx, datarow, colDef, html]);

	return html;
};

/**
  �� ��带 �ٽ� ������ �մϴ�.

  @function {} rerender

  @author ����ȣ
  @since 1.0.0
  @version 1.3.0
  */
JGM.Cell.prototype.rerender = function() {
	return this.grid['view'].rerenderCellByIdAndKey(this.getId(), this.getKey());
};

/**
  ���� �並 ��ũ�� �մϴ�.

  @function {} scrollTo

  @author ����ȣ
  @since 1.0.0
  @version 1.0.0
  */
JGM.Cell.prototype.scrollTo = function() {
	this.grid['view'].scrollTo(this.getRowIdx(), this.getColIdx());
};

prototype._keydown = function(e) {
	if (!Util.contains(this._mask[0], document.activeElement, this._ctnr[0])) {
		return;
	}

	/**
	  ViewportManager �� view �� Ȱ��ȭ�� ���¿��� keydown �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�. �Էµ� Ű������ Ű �ڵ带 �ٿ��� �̺�Ʈ�� �߻��˴ϴ�.
	  ������� ������ enter �� �Է��� ��� enter Ű�� Ű�ڵ�� 13 �̹Ƿ�
	  keydown_13 �� �̺�Ʈ�� Ʈ���� �˴ϴ�.
	  @event {Event} keydownCanvas_KEYCODE
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.1.7
	  */

	/**
	  ViewportManager �� view �� Ȱ��ȭ�� ���¿��� keydown �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} keydownCanvas
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	this.grid['event'].trigger("keydownCanvas_" + e.which + " keydownCanvas", [e]);
};

prototype._keyup = function(e) {
	if (!Util.contains(this._mask[0], document.activeElement, this._ctnr[0])) {
		return;
	}

	/**
	  ViewportManager �� view �� Ȱ��ȭ�� ���¿��� keyup �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�. �Էµ� Ű������ Ű �ڵ带 �ٿ��� �̺�Ʈ�� �߻��˴ϴ�.
	  ������� ������ enter �� �Է��� ��� enter Ű�� Ű�ڵ�� 13 �̹Ƿ�
	  keyup_13 �� �̺�Ʈ�� Ʈ���� �˴ϴ�.
	  @event {Event} keyupCanvas_KEYCODE
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */

	/**
	  ViewportManager �� view �� Ȱ��ȭ�� ���¿��� keyup �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} keyupCanvas
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */
	this.grid['event'].trigger("keyupCanvas_" + e.which + " keyupCanvas", [e]);
};

prototype._keypress = function(e) {
	if (!Util.contains(this._mask[0], document.activeElement, this._ctnr[0])) {
		return;
	}

	/**
	  ViewportManager �� view �� Ȱ��ȭ�� ���¿��� keypress �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�. �Էµ� Ű������ Ű �ڵ带 �ٿ��� �̺�Ʈ�� �߻��˴ϴ�.
	  ������� ������ enter �� �Է��� ��� enter Ű�� Ű�ڵ�� 13 �̹Ƿ�
	  keypress_13 �� �̺�Ʈ�� Ʈ���� �˴ϴ�.
	  @event {Event} keypressCanvas_KEYCODE
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */

	/**
	  ViewportManager �� view �� Ȱ��ȭ�� ���¿��� keypress �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} keypressCanvas
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */
	this.grid['event'].trigger("keypressCanvas_" + e.which + " keypressCanvas", [e]);
};

prototype._mousein = function(e) {
	/**
	  ViewportManager ���� ���콺 ��ư�� ���� ���¿��� ViewportManager �� mousein �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�. ���� ���, �÷� Ű�� id �� ��� draginCanvas_id �� �̺�Ʈ�� �߻��մϴ�.
	  @event {Event} draginCanvas_COLKEY
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */

	/**
	  ViewportManager ���� ���콺 ��ư�� ���� ���¿��� ViewportManager �� mousein �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} draginCanvas
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */

	/**
	  ViewportManager �� mousein �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�. ���� ���, �÷� Ű�� id �� ��� mouseinCanvas_id �� �̺�Ʈ�� �߻��մϴ�.
	  @event {Event} mouseinCanvas_COLKEY
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */

	/**
	  ViewportManager �� mousein �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} mouseinCanvas
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */
	if (this._vars.drag) {
		this._triggerMouseEvent(e, {'event':"draginCanvas mouseinCanvas"});
	}
	else {
		this._triggerMouseEvent(e, {'event':"mouseinCanvas"});
	}
};

prototype._mouseout = function(e) {
	/**
	  ViewportManager ���� ���콺 ��ư�� ���� ���¿��� ViewportManager �� mouseout �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�. ���� ���, �÷� Ű�� id �� ��� dragoutCanvas_id �� �̺�Ʈ�� �߻��մϴ�.
	  @event {Event} dragoutCanvas_COLKEY
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */

	/**
	  ViewportManager ���� ���콺 ��ư�� ���� ���¿��� ViewportManager �� mouseout �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} dragoutCanvas
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */

	/**
	  ViewportManager �� mouseout �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�. ���� ���, �÷� Ű�� id �� ��� mouseoutCanvas_id �� �̺�Ʈ�� �߻��մϴ�.
	  @event {Event} mouseoutCanvas_COLKEY
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.1.7
	  */

	/**
	  ViewportManager �� mouseout �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} mouseoutCanvas
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	if (this._vars.drag) {
		this._triggerMouseEvent(e, {'event':"dragoutCanvas mouseoutCanvas"});
	}
	else {
		this._triggerMouseEvent(e, {'event':"mouseoutCanvas"});
	}
};

prototype._mouseenter = function(e) {
	/**
	  ViewportManager ���� ���콺 ��ư�� ���� ���¿��� ViewportManager �� mouseenter �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�. ���� ���, �÷� Ű�� id �� ��� dragenterCanvas_id �� �̺�Ʈ�� �߻��մϴ�.
	  @event {Event} dragenterCanvas_COLKEY
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */

	/**
	  ViewportManager ���� ���콺 ��ư�� ���� ���¿��� ViewportManager �� mouseenter �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} dragenterCanvas
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */

	/**
	  ViewportManager �� mouseenter �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�. ���� ���, �÷� Ű�� id �� ��� mouseenterCanvas_id �� �̺�Ʈ�� �߻��մϴ�.
	  @event {Event} mouseenterCanvas_COLKEY
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */

	/**
	  ViewportManager �� mouseenter �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} mouseenterCanvas
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */
	if (this._vars.drag) {
		this._triggerMouseEvent(e, {'event':"dragenterCanvas mouseenterCanvas"});
	}
	else {
		this._triggerMouseEvent(e, {'event':"mouseenterCanvas"});
	}
};

prototype._mouseleave = function(e) {
	/**
	  ViewportManager ���� ���콺 ��ư�� ���� ���¿��� ViewportManager �� mouseleave �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�. ���� ���, �÷� Ű�� id �� ��� dragleaveCanvas_id �� �̺�Ʈ�� �߻��մϴ�.
	  @event {Event} dragleaveCanvas_COLKEY
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */

	/**
	  ViewportManager ���� ���콺 ��ư�� ���� ���¿��� ViewportManager �� mouseleave �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} dragleaveCanvas
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */

	/**
	  ViewportManager �� mouseleave �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�. ���� ���, �÷� Ű�� id �� ��� mouseleaveCanvas_id �� �̺�Ʈ�� �߻��մϴ�.
	  @event {Event} mouseleaveCanvas_COLKEY
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */

	/**
	  ViewportManager �� mouseleave �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} mouseleaveCanvas
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */
	if (this._vars.drag) {
		this._triggerMouseEvent(e, {'event':"dragleaveCanvas mouseleaveCanvas"});
	}
	else {
		this._triggerMouseEvent(e, {'event':"mouseleaveCanvas"});
	}
};

prototype._mousemove = function(e) {
	/**
	  ViewportManager ���� ���콺 ��ư�� ���� ���¿��� ViewportManager �� mousemove �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�. ���� ���, �÷� Ű�� id �� ��� dragmoveCanvas_id �� �̺�Ʈ�� �߻��մϴ�.
	  @event {Event} dragmoveCanvas_COLKEY
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */

	/**
	  ViewportManager ���� ���콺 ��ư�� ���� ���¿��� ViewportManager �� mousemove �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} dragmoveCanvas
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */

	/**
	  ViewportManager �� mousemove �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�. ���� ���, �÷� Ű�� id �� ��� mousemoveCanvas_id �� �̺�Ʈ�� �߻��մϴ�.
	  @event {Event} mousemoveCanvas_COLKEY
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.1.7
	  */

	/**
	  ViewportManager �� mousemove �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} mousemoveCanvas
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	if (this._vars.drag) {
		this._triggerMouseEvent(e, {'event':"dragmoveCanvas mousemoveCanvas"});
	}
	else {
		this._triggerMouseEvent(e, {'event':"mousemoveCanvas"});
	}
};

prototype._mouseover = function(e) {
	/**
	  ViewportManager ���� ���콺 ��ư�� ���� ���¿��� ViewportManager �� mouseover �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�. ���� ���, �÷� Ű�� id �� ��� dragoverCanvas_id �� �̺�Ʈ�� �߻��մϴ�.
	  @event {Event} dragoverCanvas_COLKEY
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */

	/**
	  ViewportManager ���� ���콺 ��ư�� ���� ���¿��� ViewportManager �� mouseover �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} dragoverCanvas
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */

	/**
	  ViewportManager �� mouseover �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�. ���� ���, �÷� Ű�� id �� ��� mouseoverCanvas_id �� �̺�Ʈ�� �߻��մϴ�.
	  @event {Event} mouseoverCanvas_COLKEY
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.1.7
	  */

	/**
	  ViewportManager �� mouseover �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} mouseoverCanvas
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	if (this._vars.drag) {
		this._triggerMouseEvent(e, {'event':"dragoverCanvas mouseoverCanvas"});
	}
	else {
		this._triggerMouseEvent(e, {'event':"mouseoverCanvas"});
	}
};

prototype._mousedown = function(e) {
	/**
	  ViewportManager �� mousedown �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�. ���� ���, �÷� Ű�� id �� ��� mousedownCanvas_id �� �̺�Ʈ�� �߻��մϴ�.
	  @event {Event} mousedownCanvas_COLKEY
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.1.7
	  */

	/**
	  ViewportManager �� mousedown �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} mousedownCanvas
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	if (this._triggerMouseEvent(e, {'event':"mousedownCanvas"})) {
		this._vars.drag = true;
		this.focus(e);
	}
};

prototype._mouseup = function(e) {
	/**
	  ViewportManager �� mouseup �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�. ���� ���, �÷� Ű�� id �� ��� mouseupCanvas_id �� �̺�Ʈ�� �߻��մϴ�.
	  @event {Event} mouseupCanvas_COLKEY
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.1.7
	  */

	/**
	  ViewportManager �� mouseup �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} mouseupCanvas
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	this._vars.drag = false;
	if (this._triggerMouseEvent(e, {'event':"mouseupCanvas"})) {
		this.focus(e);
	}
};

prototype._click = function(e) {
	/**
	  ViewportManager �� click �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�. ���� ���, �÷� Ű�� id �� ��� clickCanvas_id �� �̺�Ʈ�� �߻��մϴ�.
	  @event {Event} clickCanvas_COLKEY
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.1.7
	  */

	/**
	  ViewportManager �� click �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} clickCanvas
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	this._triggerMouseEvent(e, {'event':"clickCanvas"});
};

prototype._dblclick = function(e) {
	/**
	  ViewportManager �� dblclick �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�. ���� ���, �÷� Ű�� id �� ��� dblclickCanvas_id �� �̺�Ʈ�� �߻��մϴ�.
	  @event {Event} dblclickCanvas_COLKEY
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.1.7
	  */

	/**
	  ViewportManager �� dblclick �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} dblclickCanvas
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @param {JGM.Cell} cell - ���콺 �̺�Ʈ�� ���õ� {@link JGM.Cell Cell} ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	this._triggerMouseEvent(e, {'event':"dblclickCanvas"});
};

prototype._triggerMouseEvent = function(e, args) {
	var node = this._getClosestCell(e.target),
		arr,
		earr,
		i,
		len;

	if (node === undefined) {
		return false;
	}

	args['cell'] = JGM.create("Cell", {'grid':this.grid, 'node':node});

	arr = Util.split(args['event']);
	len = arr.length;
	earr = [];
	for (i = 0; i < len; i++) {
		earr.push(arr[i] + "_" + args['cell'].getKey());
		earr.push(arr[i]);
	}

	this.grid['event'].trigger(earr.join(" "), [e, args['cell']]);

	return true;
};

prototype._scroll = function() {
	var scrollTop = this.getScrollTop(),
		scrollVDist = scrollTop - this._vars._lastScrollTop,
		scrollLeft = this.getScrollLeft(),
		scrollHDist = scrollLeft - this._vars._lastScrollLeft;

	if (scrollVDist === 0 && scrollHDist === 0) {
		return;
	}

	/**
	  �׸��� �䰡 ��ũ�� �Ǿ��� �� �߻��ϴ� �̺�Ʈ �Դϴ�.

	  @event {Event} onScrollViewport

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */
	this.grid['event'].trigger("onScrollViewport");

	if (scrollHDist !== 0) {
		this._vars._lastScrollLeft = scrollLeft;

		/**
		  �׸��� �䰡 ���� ��ũ�� �Ǿ��� �� �߻��ϴ� �̺�Ʈ �Դϴ�.

		  @event {Event} onScrollViewportH

		  @author ����ȣ
		  @since 1.1.7
		  @version 1.1.7
		  */
		this.grid['event'].trigger("onScrollViewportH", [scrollLeft]);
	}

	var numDiff = Math.abs(scrollVDist / this._getRowOuterHeight());

	if (numDiff < this._options['appendThreshold']) {
		return;
	}

	this._vars._lastScrollTop = scrollTop;
	//if (numDiff >= this._options['renderThreshold']) {
	this._render();
	/*
	   }
	   else {
	   this._renderShift();
	   }
	   */

	/**
	  �׸��� �䰡 ���� ��ũ�� �Ǿ��� �� �߻��ϴ� �̺�Ʈ �Դϴ�.

	  @event {Event} onScrollViewportV

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */
	this.grid['event'].trigger("onScrollViewportV");
};

prototype.focus = function(e) {
	/**
	  �׸��� ĵ�ٽ��� DOM Elemenet �� ��Ŀ�� �Ǳ� ���� �߻��ϴ� �̺�Ʈ �Դϴ�. false �� �����ϸ� ĵ�ٽ��� ��Ŀ���� ��ҵ˴ϴ�.

	  @event {Event} onBeforeFocusCanvas
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @returns {boolean} continueOrStop - false �� ������ ��� �׸��� ĵ�ٽ��� ��Ŀ������ �ʽ��ϴ�.

	  @author ����ȣ
	  @since 1.2.1
	  @version 1.2.1
	  */
	if (Util.isNotNull(e) && this.grid['event'].triggerInvalid("onBeforeFocusCanvas", [e])) {
		return;
	}

	//var scr = Util.getBodyScroll();

	if (this._mask[0] !== document.activeElement) {
		if (Util.isFunction(this._mask[0].setActive)) {
			try {
				this._mask[0].setActive();
			}
			catch (exp) {}
		}
		this._mask[0].focus();
		if (document.activeElement !== this._mask[0]) {
			this._mask.focus();
		}
	}

	//Util.setBodyScroll(scr[0], scr[1]);
};

//isRendered
//tested
/**
  �־��� ���̵� �ش��ϴ� ������ �ο��� DOMElement ��
  ���� �������Ǿ� �ִ��� ���θ� �����մϴ�.

  @function {boolean} isRenderedById
  @param {string} id - ������ �ο��� ���̵�
  @return {boolean} �ο찡 �������Ǿ� �ִ� ����

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.isRenderedById = function(id) {
	if (Util.isNotNull(id)) {
		return this._renderedRows.hasOwnProperty(id);
	}
	return false;
};

/**
  �־��� ������ �ο��� DOMElement ��
  ���� �������Ǿ� �ִ��� ���θ� �����մϴ�.

  @function {boolean} isRendered
  @param {Object} datarow - ������ �ο�
  @return {boolean} �ο찡 �������Ǿ� �ִ� ����

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.isRendered = function(datarow) {
	return this.isRenderedById(this.grid['dataMgr'].getId(datarow));
};

/**
  �־��� �ο� �ε����� DOMElement ��
  ���� �������Ǿ� �ִ��� ���θ� �����մϴ�.

  @function {boolean} isRenderedByIdx
  @param {number} rowIdx - �ο� �ε���
  @return {boolean} �ο찡 �������Ǿ� �ִ� ����

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.isRenderedByIdx = function(rowIdx) {
	return this.isRenderedById(this.grid['dataMgr'].getIdByIdx(rowIdx));
};

//getRow
//tested
prototype.getRowById = function(id) {
	if (this.isRenderedById(id)) {
		return this._renderedRows[id];
	}
};

prototype.getRow = function(datarow) {
	return this.getRowById(this.grid['dataMgr'].getId(datarow));
};

prototype.getRowByIdx = function(i) {
	return this.getRowById(this.grid['dataMgr'].getIdByIdx(i));
};

//getRenderedRow
//tested
prototype.getRenderedRowById = function(id) {
	if (this.isRenderedById(id)) {
		return this._renderedRows[id];
	}
};

prototype.getRenderedRow = function(datarow) {
	return this.getRenderedRowById(this.grid['dataMgr'].getId(datarow));
};

prototype.getRenderedRowByIdx = function(i) {
	return this.getRenderedRowById(this.grid['dataMgr'].getIdByIdx(i));
};

prototype.getRenderedRows = function() {
	return Util.toArray(this._renderedRows);
	return Array.prototype.slice.call(this._canvas[0].childNodes);
};

prototype.getCell = function(rowIdx, colIdx) {
	var rowNode = this.getRowByIdx(rowIdx);
	if (Util.isNotNull(rowNode, colIdx)) {
		return rowNode.childNodes[colIdx];
	}
};

prototype.getCellByIdAndKey = function(id, key) {
	var rowNode = this.getRowById(id),
		colIdx = this.grid['colDefMgr'].getIdxByKey(key);
	if (Util.isNotNullAnd(rowNode, colIdx)) {
		return rowNode.childNodes[colIdx];
	}
};

prototype.getRenderedCell = function(rowIdx, colIdx) {
	var rowNode = this.getRenderedRowByIdx(rowIdx);
	if (Util.isNotNull(rowNode)) {
		return rowNode.childNodes[colIdx];
	}
};

prototype.getRenderedCellByIdAndKey = function(id, key) {
	var rowNode = this.getRenderedRowById(id),
		colIdx = this.grid['colDefMgr'].getIdxByKey(key);
	if (Util.isNotNullAnd(rowNode, colIdx)) {
		return rowNode.childNodes[colIdx];
	}
};

prototype._getClosestCell = function(obj) {
	return Util.closestWithTag(obj, "DIV", this._options['classCell'], this._canvas[0]);
};

prototype._getClosestRow = function(obj) {
	return Util.closestWithTag(obj, "DIV", this._options['classRow'], this._canvas[0]);
};

prototype._getClosestRowIdx = function(obj) {
	return this.grid['dataMgr'].getIdxByNode(this._getClosestRow(obj));
};

prototype._canvasFind = function(selector) {
	return this._canvas.find(selector);
};

ViewportManager._renderer = function(value, rowIdx, colIdx, datarow, colDef, viewMgr) {
	return Util.ifNull(value, "");
};

}());

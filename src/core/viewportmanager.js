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

 goog.provide('JGM.core.ViewportManager');

 goog.exportPath('JGM.core.ViewportManager', ViewportManager);

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

@class {public ViewportManager} JGM.ViewportManager

@author ����ȣ
@since 1.0.0
@version 1.3.1
*/

/**
ViewportManager ����Ʈ���� �Դϴ�.

@constructor {public ViewportManager} ViewportManager
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

	@var {public final String} mid

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.mid = args.mid;

	this._ctnr = args.container;
	this.__mask_a__;
	this.__canvas_c__;

	/**
	ViewportManager �� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�.

	@var {public JGM.Grid} grid

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid = args.grid;

	/**
	�׸����� �ο�� ���� ������ �� ����Ʈ ���� �̺�Ʈ�� �����ϴ� {@link JGM.ViewportManager ViewportManager} �ν��Ͻ� �Դϴ�.

	@var {public JGM.ViewportManager} JGM.Grid.view

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid.view = this;

	/**
	ViewportManager ����� �⺻ �ɼ� ������ �����մϴ�.

	@var {private Object} options

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	var options = {
		/**
		�׸��� �ο��� �ε��� ���� ���� �ε��� ��� Attribute �̸�. <br>�⺻��:<code>"r"</code>

		@var {private optional String} JGM.ViewportManager.options.attrRowIdx

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__attrRowIdx_a__:					"r",

		/**
		����Ʈ�� ��ũ�� �� ��� ���� �߰��ؾ� �Ǵ� �ο��� ���� �� �� �̸��� ���
		�߰����� �ʽ��ϴ�. <br>�⺻��:<code>3</code>

		@var {private optional int} JGM.ViewportManager.options.appendThreshold

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__appendThreshold_b__:			3,

		/**
		����Ʈ�� ��ũ�� �� ��� ���� �߰��ؾ� �Ǵ� �ο��� ���� �� �� �̻��� ���
		���ο� �ο���� �ٿ����� �ʰ� ��ü �������� �ٽ� ������ �մϴ�. <br>�⺻��:<code>10</code>

		@var {private optional int} JGM.ViewportManager.options.renderThreshold

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__renderThreshold_c__:			10,

		/**
		ĵ������ ������ �� ���, ��ũ���� �ڿ��������� ���� ȭ�鿡 ���̴� �ο�� �̿ܿ�
		�� �ķ� �� ���� �� ��ŭ �ο���� �߰������� �������մϴ�. <br>�⺻��:<code>6</code>

		@var {private optional int} JGM.ViewportManager.options.bufferSize

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__bufferSize_d__:					6,

		/**
		����Ʈ�� �� ��ũ�� �������� ������ ������ �ο���� ���� ���մϴ�. ����Ʈ��
		���̸� ����� �� ���˴ϴ�. <br>�⺻��:<code>10</code>

		@var {private optional int} JGM.ViewportManager.options.rowsPerPage

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__rowsPerPage_e__:			10,

		/**
		�ο��� ������ �ȼ��� �Դϴ�. padding �� border �� ������ �� ���� �����Դϴ�. <br>�⺻��:<code>20</code>

		@var {private optional int} JGM.ViewportManager.options.rowH

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__rowH_f__:						21,

		/**
		�� border �� �β��� �ȼ��� �Դϴ�. <br>�⺻��:<code>1</code>

		@var {private optional int} JGM.ViewportManager.options.borderThickness

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__borderThickness_g__: 1,

		/**
		�� border �� ��Ÿ���� ���մϴ�. <br>�⺻��:<code>"solid #D0D7E5"</code>

		@var {private optional String} JGM.ViewportManager.options.border

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__border_h__:						"solid #D0D7E5",

		/**
		�� padding �� �ȼ��� �Դϴ�. <br>�⺻��:<code>1</code>

		@var {private optional int} JGM.ViewportManager.options.padding

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__padding_i__:					1,

		/**
		Ȧ����° �ο�� ¦����° �ο��� �������� �ٸ��� �� �� ���մϴ�. <br>�⺻��:<code>false</code>

		@var {private optional Boolean} JGM.ViewportManager.options.evenOddRows

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__evenOddRows_j__:				false,

		/**
		{@link JGM.ViewportManager.options.evenOddRows evenOddRows} �� true �� ���,
		Ȧ����° �ο�鿡 ����� �������Դϴ�. <br>�⺻��:<code>"#F4F4F4"</code>

		@var {private optional String} JGM.ViewportManager.options.oddRowsBackground

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__oddRowsBackground_k__:			"#F4F4F4",

		/**
		ViewportManager �����̳ʿ� ����Ǵ� CSS style �Դϴ�.<br>
		������ ��: �� �ɼǿ� �Էµ� style �� ����Ǿ����� DOM �� ũ�Ⱑ ���ϸ� �׸����� �������� ũ�� ��꿡 ������ ����ϴ�.
		��, ũ�⿡ ������ ���� style ������ �Ҷ��� ����ϼ���.
		<br>�⺻��:<code>""</code>

		@var {private optional String} JGM.ViewportManager.options.style

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__style_q__: "",

		/**
		�׸��� ĵ�ٽ��� ����Ǵ� CSS style �Դϴ�.<br>
		������ ��: �� �ɼǿ� �Էµ� style �� ����Ǿ����� DOM �� ũ�Ⱑ ���ϸ� �׸����� �������� ũ�� ��꿡 ������ ����ϴ�.
		��, ũ�⿡ ������ ���� style ������ �Ҷ��� ����ϼ���.
		<br>�⺻��:<code>""</code>

		@var {private optional String} JGM.ViewportManager.options.canvasStyle

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__canvasStyle_r__: "",

		/**
		��� �׸��� �ο쿡 ���������� ����Ǵ� CSS style �Դϴ�.<br>
		������ ��: �� �ɼǿ� �Էµ� style �� ����Ǿ����� DOM �� ũ�Ⱑ ���ϸ� �׸����� �������� ũ�� ��꿡 ������ ����ϴ�.
		��, ũ�⿡ ������ ���� style ������ �Ҷ��� ����ϼ���.
		<br>�⺻��:<code>""</code>

		@var {private optional String} JGM.ViewportManager.options.rowStyle

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__rowStyle_s__: "",

		/**
		��� �׸��� ���� ���������� ����Ǵ� CSS style �Դϴ�.<br>
		������ ��: �� �ɼǿ� �Էµ� style �� ����Ǿ����� DOM �� ũ�Ⱑ ���ϸ� �׸����� �������� ũ�� ��꿡 ������ ����ϴ�.
		��, ũ�⿡ ������ ���� style ������ �Ҷ��� ����ϼ���.
		<br>�⺻��:<code>""</code>

		@var {private optional String} JGM.ViewportManager.options.cellStyle

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__cellStyle_t__: "",

		/**
		��� �׸��� �ο쿡 ���������� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-row"</code>

		@var {private optional String} JGM.ViewportManager.options.classRow

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__classRow_l__:						"jgrid-row",

		/**
		��� �׸��� ���� ���������� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-cell"</code>

		@var {private optional String} JGM.ViewportManager.options.classCell

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__classCell_m__:					"jgrid-cell",

		/**
		�׸��� ����Ʈ�� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-viewport"</code>

		@var {private optional String} JGM.ViewportManager.options.classView

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__classView_n__:				"jgrid-viewport",

		/**
		�׸��� ĵ������ ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-canvas"</code>

		@var {private optional String} JGM.ViewportManager.options.classCanvas

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__classCanvas_o__:				"jgrid-canvas",

		/**
		�׸��� �䰡 ��Ŀ�� �Ǿ��� ��� �������� ���� ��� ��Ÿ���Դϴ�. <br>�⺻��:<code>"#FFF"</code>

		@var {private optional Object} JGM.ViewportManager.options.focusBackground

		@author ����ȣ
		@since 1.1.5
		@version 1.1.5
		*/
		__focusBackground_u__:			"#FFF",

		/**
		�׸��� �䰡 ��Ŀ�� �Ǿ��� ��� �������� �ƿ����� ��Ÿ���Դϴ�. <br>�⺻��:<code>"2px solid #f1ca7f"</code>

		@var {private optional Object} JGM.ViewportManager.options.focusOutline

		@author ����ȣ
		@since 1.1.5
		@version 1.1.5
		*/
		__focusOutline_v__: "2px solid #f1ca7f",

		/**
		true �� ���������� ��� view �� ���̰� ��� �ο츦 �����ϵ��� �ڵ� ����˴ϴ�. <br>�⺻��:<code>false</code>

		@var {private optional Boolean} JGM.ViewportManager.options.autoHeight

		@author ����ȣ
		@since 1.1.7
		@version 1.1.7
		*/
		__autoHeight_w__: false,

		__autoWidth_x__: false
	};

	this._options = JGM.__extend_e__(options, args.options, {
		attrRowIdx:"__attrRowIdx_a__",
		appendThreshold:"__appendThreshold_b__",
		renderThreshold:"__renderThreshold_c__",
		bufferSize:"__bufferSize_d__",
		rowsPerPage:"__rowsPerPage_e__",
		rowH:"__rowH_f__",
		borderThickness:"__borderThickness_g__",
		border:"__border_h__",
		padding:"__padding_i__",
		evenOddRows:"__evenOddRows_j__",
		oddRowsBackground:"__oddRowsBackground_k__",
		classRow:"__classRow_l__",
		classCell:"__classCell_m__",
		classView:"__classView_n__",
		classCanvas:"__classCanvas_o__",
		style:"__style_q__",
		canvasStyle:"__canvasStyle_r__",
		rowStyle:"__rowStyle_s__",
		cellStyle:"__cellStyle_t__",
		focusBackground:"__focusBackground_u__",
		focusOutline:"__focusOutline_v__",
		autoHeight:"__autoHeight_w__",
		autoWidth:"__autoWidth_x__"
	});

	this._vars = {
		drag:			false,
		__lastScrollTop_d__:		0,
		__lastScrollLeft_e__:		0,
		__lastRowLen_l__:			0
	};

	this.__renderedRows_A__ = {};
	this.__lockedRows_B__ = {};

	this.__colLefts_Bd__ = [0];

	this.__init();
}

ViewportManager.getInstance = function(args) {
	return new ViewportManager(args);
};

var prototype = ViewportManager.prototype;

prototype.__init = function() {
	this.__mask_a__ =
		$("<div class='" + this._options.__classView_n__ + "' tabIndex='0' onscroll='JGM.m.ViewportManager." + this.mid + ".__scroll_As__()'>")
		.appendTo(this._ctnr);

	this.__canvas_c__ =
		$("<div class='" + this._options.__classCanvas_o__ + "'>")
		.appendTo(this.__mask_a__);

	// disable text selection in grid cells except in input and textarea
	// elements (this is IE-specific, because selectstart event will
	// only fire in IE)
	this.__mask_a__.bind("selectstart.ui", function (event) {
		return $(event.target).is("input, textarea");
	});
	//JGM.ColHeader.__disableSel_e__(this.__mask_a__);

	this.__setColLefts_Be__();

	this._vars.__lastRowLen_l__ = this.grid.dataMgr.datalist.length;

	this.grid.event.bind({
		canvasFind: this.__canvasFind_AC__,
		onCreateCss: this.__onCreateCss_V__,
		onCreateDynamicCss: this.__onCreateDynamicCss_C__,
		onDestroy: this.__onDestroy_e__,
		keydown: this._keydown,
		keyup: this._keyup,
		keypress: this._keypress,
		mousein: this._mousein,
		mouseout: this._mouseout,
		mouseenter: this._mouseenter,
		mouseleave: this._mouseleave,
		mousemove: this._mousemove,
		mouseover: this._mouseover,
		mousedown: this._mousedown,
		mouseup: this._mouseup,
		click: this._click,
		dblclick: this._dblclick,
		resizeWidth: this.__setWidth_AV__,
		"resizeWidth onResizeCol onResizeCanvasHeight": this.__resizeWidth_AZ__,
		//resizeHeight: this.resizeHeight,
		onAfterRefresh: this.onAfterRefresh,
		onRenderModules: this.__render_w__,
		onReorderCols: this.__onReorderCols_Bf__,
		onResizeCanvasWidth: this.__scroll_As__,
		onUpdateDatarow: this.onUpdateDatarow,
		onUpdateDatalist: this.onUpdateDatalist,
		onRemoveDatarow: this.onRemoveDatarow,
		onRemoveDatalist: this.onRemoveDatalist,
		onIdChange:this.onIdChange,
		onIdListChange:this.onIdListChange,
		unsetDrag:this.unsetDrag		
	}, this);
};

prototype.unsetDrag = function() {
	this._vars.drag = false;
};

prototype.__onDestroy_e__ = function() {
	JGM._destroy(this, {
		name: "ViewportManager",
		path: "view",
		"$": "__canvas_c__ __mask_a__",
		property: "_ctnr",
		map: "_vars __lockedRows_B__ __renderedRows_A__ _options"
	});
};

prototype.__onCreateCss_V__ = function() {
	var gridId = "#" + this.grid.mid + " .",
		o = this._options,
		cellSel = gridId + o.__classCell_m__,
		rowSel = gridId + o.__classRow_l__,
		border = o.__borderThickness_g__ + "px " + o.__border_h__,
		attrRowIdx = rowSel + "[" + o.__attrRowIdx_a__,
		colDefs = this.grid.colDefMgr.get(),
      clen = colDefs.length,
      i = 0,
		rules = [];

	rules.push(gridId + o.__classView_n__ + "{height:" + this.__calHeight_AP__() + "px;outline:0;position:relative;white-space:nowrap;overflow:auto;line-height:" + o.__rowH_f__ + "px;cursor:default;-moz-user-select:none;-webkit-user-select:none;" + o.__style_q__ + "}");
	rules.push(gridId + o.__classView_n__ + ":focus{background:" + o.__focusBackground_u__ + ";outline:" + o.__focusOutline_v__ + "}");
	rules.push(gridId + o.__classCanvas_o__ + "{height:" + this.__calCanvasHeight_AR__() + "px;" + o.__canvasStyle_r__ + ";background:#fff}");
	rules.push(rowSel + "{position:absolute;" + o.__rowStyle_s__ + "}");
	rules.push(cellSel + "{height:" + o.__rowH_f__ + "px;border-bottom:" + border + ";display:inline-block;white-space:nowrap;overflow:hidden;float:left;text-overflow:ellipsis;padding-left:" + o.__padding_i__ + "px;border-right:" + border + ";" + o.__cellStyle_t__ + "}");
	
	if (o.__evenOddRows_j__) {
		rules.push(
			attrRowIdx + "$='1']," +
			attrRowIdx + "$='3']," +
			attrRowIdx + "$='5']," +
			attrRowIdx + "$='7']," +
			attrRowIdx + "$='9']{background:" + o.__oddRowsBackground_k__ + "}");
   }

	for (; i < clen; i++) {
		rules.push(cellSel + ".k_" + colDefs[i].key + "{" + colDefs[i].style + "}");
   }

	return rules.join("");
};

prototype.__onCreateDynamicCss_C__ = function() {
	var cellSel = "#" + this.grid.mid + " ." + this._options.__classCell_m__,
      str = this.__getRowSelector_AH__() + "{width:" + this.__calCanvasWidth_AT__() + "px}",
      colDefs = this.grid.colDefMgr.get(),
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
		this.__lockedRows_B__[after] = this.__lockedRows_B__[before];
		delete this.__lockedRows_B__[before];
   }
	if (this.isRenderedById(before)) {
		(this.__renderedRows_A__[after] = this.__renderedRows_A__[before]).setAttribute('i', after);
      attrChanged = true;
		delete this.__renderedRows_A__[before];
	}
};

//tested
prototype.onIdListChange = function(datalist, befores, idKey) {
   var len = datalist.length,
      i = 0,
      locked = this.__lockedRows_B__,
      rendered = this.__renderedRows_A__,
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

prototype.__getCellSelector_AG__ = function() {
	return "#" + this.grid.mid + " ." + this._options.__classCell_m__;
};

prototype.__getRowSelector_AH__ = function() {
	return "#" + this.grid.mid + " ." + this._options.__classRow_l__;
};

/**
�־��� �ε����� ���� ���� ��ũ���մϴ�.

@function {public} scrollTo
@param {int} row - ���� �ο� �ε���
@param {int} col - ���� �÷� �ε���

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

@function {public int} scrollToRowLazy
@param {int} row - ��ũ�� �� �ο� �ε���
@return {int} scrollTop - ���ο� scrolltop ��

@author ����ȣ
@since 1.3.0
@version 1.3.0
*/
prototype.scrollToRowLazy = function(row) {
   var scrollTop = this.getScrollTop();
   if (Util.isNull(row)) {
      return scrollTop;
   }
	if (this.__getLastSafeVisibleRow_n__() < row) {
		return this.scrollToRow(this.__getFirstRowForSafe_o__(row));
   }
	if (this.__getFirstSafeVisibleRow_l__() > row) {
		return this.scrollToRow(row);
   }
   return scrollTop;
};

/**
�־��� �÷� �ε����� lazy �ϰ� ��ũ���մϴ�.
�̹� ȭ�� ���� ���� ���, ��ũ�� ���� �ʽ��ϴ�.

@function {public int} scrollToColLazy
@param {int} col - ��ũ�� �� �÷� �ε���
@return {int} scrollLeft - ���ο� scrollLeft ��

@author ����ȣ
@since 1.3.0
@version 1.3.0
*/
prototype.scrollToColLazy = function(col) {
   var scrollLeft = this.getScrollLeft();
   if (Util.isNull(col)) {
      return scrollLeft;
   }
	if (this.__getLastSafeVisibleCol_s__() < col) {
		return this.setScrollLeft(this.getScrollHForSafe(col));
   }
	else if (this.__getFirstSafeVisibleCol_q__() > col) {
		return this.scrollToCol(col);
   }
   return scrollLeft;
};

/**
�־��� �ε����� ���� ���� lazy �ϰ� ��ũ���մϴ�.
�̹� ȭ�� ���� ���� ���, ��ũ�� ���� �ʽ��ϴ�.

@function {public} scrollToLazy
@param {int} row - ���� �ο� �ε���
@param {int} col - ���� �÷� �ε���

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

@function {public} scrollToRow
@param {int} row - �ο� �ε���

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
//tested
prototype.scrollToRow = function(i) {
   if (Util.isNotNull(i)) {
      return this.setScrollTop(this.__getRowOuterHeight_AN__() * i);
   }
   return this.getScrollTop();
};

/**
�־��� �ε����� �÷����� ��ũ���մϴ�.

@function {public} scrollToCol
@param {int} col - �÷� �ε���

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.scrollToCol = function(i) {
	return this.setScrollLeft(this.getColLeft(i));
};

prototype.__getColInnerWidth_AI__ = function(i) {
	return this.grid.colDefMgr.get(i).width;
};

prototype.__getColInnerWidthByKey_AJ__ = function(i) {
	return this.grid.colDefMgr.getByKey(i).width;
};

/**
�־��� �ε����� �÷��� �� �ȼ��� �����մϴ�.

@function {public int} getColWidth
@param {int} col - �÷� �ε���
@returns {int} �־��� �ε����� �÷��� ��

@author ����ȣ
@since 1.1.7
@version 1.1.7
*/
prototype.getColWidth = function(i) {
	return this.grid.colDefMgr.get(i).width + this._options.__padding_i__;
};

/**
�־��� Ű�� ���� �÷��� �� �ȼ��� �����մϴ�.

@function {public int} getColWidthByKey
@param {String} key - �÷� Ű
@returns {int} �־��� Ű�� ���� �÷��� ��

@author ����ȣ
@since 1.1.7
@version 1.1.7
*/
prototype.getColWidthByKey = function(i) {
	return this.grid.colDefMgr.getByKey(i).width + this._options.__padding_i__;
};

prototype.__getColOuterWidth_AK__ = function(i) {
	return this.grid.colDefMgr.get(i).width + this._options.__padding_i__ + this._options.__borderThickness_g__;
};

prototype.__getColOuterWidthByKey_AL__ = function(i) {
	return this.grid.colDefMgr.getByKey(i).width + this._options.__padding_i__ + this._options.__borderThickness_g__;
};

prototype.__getPadding_AM__ = function() {
	return this._options.__padding_i__;
};

prototype.__colWidthPlus_f__ = function() {
	return this._options.__padding_i__ + this._options.__borderThickness_g__;
};

prototype.__getRowOuterHeight_AN__ = function() {
	return this._options.__rowH_f__ + this._options.__borderThickness_g__;
};

prototype.__getRowInnerHeight_AO__ = function() {
	return this._options.__rowH_f__;
};

prototype.__calHeight_AP__ = function() {
	if (this._options.__autoHeight_w__) {
		return this.__calCanvasHeight_AR__() + (this.grid.width() < this.__calCanvasWidth_AT__() ? this.grid._vars.scrollbarDim.h: 0);
   }
	return this.__getRowOuterHeight_AN__() * this._options.__rowsPerPage_e__;
};

/**
���� ��ũ�ѹٰ� ���� ��� ��ũ�ѹ��� ���̸� ������ ���� ���� �ȼ��� �����մϴ�.

@function {public int} getHeight
@returns {int} ���� ���� �ȼ�

@author ����ȣ
@since 1.0.0
@version 1.1.7
*/
prototype.getHeight = function() {
	return this.__mask_a__[0].offsetHeight;
};

/**
���� ��ũ�ѹٰ� ���� ��� ��ũ�ѹ��� ���̸� �� ���� ���� ���� �ȼ��� �����մϴ�.

@function {public int} getInnerHeight
@returns {int} ���� ���� ���� �ȼ�

@author ����ȣ
@since 1.0.0
@version 1.1.7
*/
prototype.getInnerHeight = function() {
	return this.__mask_a__[0].clientHeight;
};

prototype.__getWidth_AQ__ = function() {
	return this.__mask_a__[0].offsetWidth;
};

/**
���� ��ũ�ѹٰ� ���� ��� ��ũ�ѹ��� ���� �� ���� ���� �� �ȼ��� �����մϴ�.

@function {public int} getInnerWidth
@returns {int} ���� ���� �� �ȼ�

@author ����ȣ
@since 1.0.0
@version 1.1.7
*/
prototype.getInnerWidth = function() {
	return this.__mask_a__[0].clientWidth;
};

prototype.__calCanvasHeight_AR__ = function() {
	return this.__getRowOuterHeight_AN__() * this.grid.dataMgr.datalist.length;
};

/**
��� �׸��� �ο츦 �����ϰ� �ִ� ĵ������ ���� ���� �ȼ��� �����մϴ�.

@function {public int} getCanvasHeight
@returns {int} ĵ������ ���� �ȼ�

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.getCanvasHeight = function() {
	return this.__canvas_c__[0].clientHeight;
};

prototype.__setCanvasHeight_AS__ = function(h) {
	h = parseInt(h);
	if (isNaN(h) || h < 1) {
		return;
	}
	var old = this.getCanvasHeight();
	if (h != old) {
		this.__canvas_c__[0].style.height = h + "px";
		/**
		ĵ�ٽ��� ���̰� ������ ��� Ʈ���ŵǴ� �̺�Ʈ �Դϴ�.

		@event {Event} onResizeCanvasHeight
		@param {int} new - ĵ�ٽ��� ���ο� ���� �ȼ�
		@param {int} old - ĵ�ٽ��� ���� ���� �ȼ�

		@author ����ȣ
		@since 1.1.7
		@version 1.1.7
		*/
		this.grid.event.trigger("onResizeCanvasHeight", [h, old]);
	}
};

prototype.__calCanvasWidth_AT__ = function() {
	return this.__colLefts_Bd__[this.grid.colDefMgr.length()];
};

/**
��� �׸��� �÷��� �����ϰ� �ִ� ĵ������ ���� �� �ȼ��� �����մϴ�.

@function {public int} getCanvasWidth
@returns {int} ĵ������ �� �ȼ�

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.getCanvasWidth = function() {
	return this.__canvas_c__[0].clientWidth;
};

prototype.__setCanvasWidth_AU__ = function(w) {
	w = parseInt(w);
	if (isNaN(w) || w < 1) {
		return;
	}
	var old = this.getCanvasWidth();
	if (w != old) {
		this.__canvas_c__[0].style.width = w + "px";

		/**
		ĵ�ٽ��� ���� ������ ��� Ʈ���ŵǴ� �̺�Ʈ �Դϴ�.

		@event {Event} onResizeCanvasWidth
		@param {int} new - ĵ�ٽ��� ���ο� �� �ȼ�
		@param {int} old - ĵ�ٽ��� ���� �� �ȼ�

		@author ����ȣ
		@since 1.1.7
		@version 1.1.7
		*/
		this.grid.event.trigger("onResizeCanvasWidth", [w, old]);
	}
};


/**
�־��� �ε����� �÷��� <code>left</code> �ȼ� ���� �����մϴ�.

@function {public int} getColLeft
@param {int} col - �÷� �ε���
@returns {int} �־��� �ε����� �÷��� <code>left</code> �ȼ� ���� �����մϴ�.

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.getColLeft = function(i) {
	return this.__colLefts_Bd__[i];
};

prototype.__getColLefts_Bh__ = function() {
	return this.__colLefts_Bd__;
};

prototype.__setColLefts_Be__ = function(from, to) {
	if (Util.isNull(from)) {
		from = 0;
   }

	var colDefs = this.grid.colDefMgr.get(), widthPlus = this.__colWidthPlus_f__();
	if (Util.isNull(to)) {
		to = colDefs.length;
   }

	for (; from < to; from++)  {
		this.__colLefts_Bd__[from + 1] = this.__colLefts_Bd__[from] + colDefs[from].width + widthPlus;
   }
	return this.__colLefts_Bd__;
};

prototype.__onReorderCols_Bf__ = function() {
	this.__setColLefts_Be__();
	this.__rerender_Ba__();
};


/**
�־��� �÷� Ű�� ���� �÷��� ���� �����մϴ�.

@function {public} setWidthByKey
@param {String} key - �÷� Ű
@param {int} width - �� �ȼ�

@author ����ȣ
@since 1.1.7
@version 1.1.7
*/
prototype.setWidthByKey = function(key, w) {
	var colDef = this.grid.colDefMgr.getByKey(key);
	w = Util.bound(w, colDef.minW, colDef.maxW);

	if (w === colDef.width) {
		return;
   }

	var old = colDef.width;
	colDef.width = w;

	this.__setCanvasWidth_AU__(this.__setColLefts_Be__(this.grid.colDefMgr.getIdxByKey(key))[this.grid.colDefMgr.length()]);

	this.grid._recreateDynamicCss();

	/**
	�÷��� ���� ������ ��� Ʈ���ŵǴ� �̺�Ʈ �Դϴ�.

	@event {Event} onResizeCol_COLKEY
	@param {String} key - �÷� Ű
	@param {int} new - �÷��� ���ο� �� �ȼ�
	@param {int} old - �÷��� ���� �� �ȼ�

	@author ����ȣ
	@since 1.1.7
	@version 1.1.7
	*/

	/**
	�÷��� ���� ������ ��� Ʈ���ŵǴ� �̺�Ʈ �Դϴ�.

	@event {Event} onResizeCol
	@param {String} key - �÷� Ű
	@param {int} new - �÷��� ���ο� �� �ȼ�
	@param {int} old - �÷��� ���� �� �ȼ�

	@author ����ȣ
	@since 1.1.7
	@version 1.1.7
	*/
	this.grid.event.trigger("onResizeCol_" + key + " onResizeCol", [key, w, old]);
};

prototype.__autoColWidth_Bg__ = function(key) {
	var res = this.__canvasFind_AC__(".k_" + key),
      max = Number.MIN_VALUE,
      len = res.length,
      i = 0;
	for (; i < len; i++) {
		if (max < res[i].scrollWidth) {
			max = res[i].scrollWidth;
      }
   }

	max -= this.__getPadding_AM__();
	this.setWidthByKey(key, max);
};

prototype.__setWidth_AV__ = function(w) {
	w = parseInt(w);
	if (isNaN(w) || w < 1) {
		return;
	}
	this.__mask_a__[0].style.width = w + "px";
};

//tested
prototype.getScrollTop = function() {
	return this.__mask_a__[0].scrollTop;
};

prototype.getScrollLeft = function() {
	return this.__mask_a__[0].scrollLeft;
};

//tested
prototype.setScrollTop = function(t) {
   var scrollTop = this.getScrollTop();
   if (Util.isNotNull(t) && scrollTop != t) {
      return (this.__mask_a__[0].scrollTop = t);
   }
   return scrollTop;
};

prototype.setScrollLeft = function(left) {
   var scrollLeft = this.getScrollLeft();
   if (Util.isNotNull(left) && scrollLeft != left) {
      return (this.__mask_a__[0].scrollLeft = left);
   }
   return scrollLeft;
};

prototype.__hasHScrollbar_i__ = function() {
	return this.__mask_a__[0].offsetHeight > this.__mask_a__[0].clientHeight;
};

prototype.__hasVScrollbar_j__ = function() {
	return this.__mask_a__[0].offsetWidth > this.__mask_a__[0].clientWidth;
};

prototype.__heightPlus_AW__ = function() {
	return this.__mask_a__[0].offsetHeight - this.__mask_a__[0].clientHeight;
};

prototype.__widthPlus_AX__ = function() {
	return this.__mask_a__[0].offsetWidth - this.__mask_a__[0].clientWidth;
};

//tested
prototype.__getFirstVisibleRow_k__ = function() {
	return Math.floor(this.getScrollTop() / this.__getRowOuterHeight_AN__());
};

//tester
prototype.__getFirstSafeVisibleRow_l__ = function() {
	return Math.ceil(this.getScrollTop() / this.__getRowOuterHeight_AN__());
};

prototype.__getLastVisibleRow_m__ = function() {
	return Math.ceil((this.getScrollTop() + this.__mask_a__[0].clientHeight) / this.__getRowOuterHeight_AN__()) - 1;
};

prototype.__getLastSafeVisibleRow_n__ = function() {
	return Math.floor((this.getScrollTop() + this.__mask_a__[0].clientHeight) / this.__getRowOuterHeight_AN__()) - 1;
};

prototype.__getFirstRowForSafe_o__ = function(row) {
	return row - Math.floor(this.__mask_a__[0].clientHeight / this.__getRowOuterHeight_AN__()) + 1;
};


prototype.__getFirstVisibleCol_p__ = function() {
	var scrollLeft = this.getScrollLeft(),
		colLefts = this.__colLefts_Bd__,
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

prototype.__getFirstSafeVisibleCol_q__ = function() {
	var scrollLeft = this.getScrollLeft(),
		colLefts = this.__colLefts_Bd__,
		i = 0,
		len = colLefts.length;

	for (; i < len; i++) {
		if (colLefts[i] >= scrollLeft) {
			return i;
      }
	}
	return len - 2;
};

prototype.__getLastVisibleCol_r__ = function() {
	var scrollLeft = this.getScrollLeft() + this.__mask_a__[0].clientWidth,
		colLefts = this.__colLefts_Bd__,
		i = 0,
		len = colLefts.length;

	for (; i < len; i++) {
		if (colLefts[i] >= scrollLeft) {
			return i - 1;
      }
   }
	return len - 2;
};

prototype.__getLastSafeVisibleCol_s__ = function() {
	var scrollLeft = this.getScrollLeft() + this.__mask_a__[0].clientWidth,
		colLefts = this.__colLefts_Bd__,
		i = 0,
		len = colLefts.length;

	for (; i < len; i++) {
		if (colLefts[i] > scrollLeft) {
			return i - 2;
      }
   }
	return len - 2;
};

prototype.__getFirstColForSafe_t__ = function(col) {
	var colLefts = this.__colLefts_Bd__,
		left = colLefts[col + 1] - this.__mask_a__[0].clientWidth,
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
	var colLefts = this.__colLefts_Bd__,
		left = colLefts[col + 1] - this.__mask_a__[0].clientWidth;

	if (colLefts[col] <= left) {
		return colLefts[col];
   }

	return left;
};


prototype.__getRenderRange_u__ = function() {
	if (this._options.__autoHeight_w__) {
		return {start:0, end:this.grid.dataMgr.datalist.length - 1};
   }

	var tmp,
		max = this.grid.dataMgr.datalist.length - 1;

	return {
		start: (((tmp = (this.__getFirstVisibleRow_k__() - this._options.__bufferSize_d__)) < 0) ? 0 : tmp),
		end: (((tmp = (this.__getLastVisibleRow_m__() + this._options.__bufferSize_d__)) > max) ? max : tmp)
	};
};

prototype.__fitHeight_AY__ = function() {
	this.__mask_a__[0].style.height = this.getCanvasHeight() + this.__heightPlus_AW__() + "px";
};

prototype.__resizeWidth_AZ__ = function(e) {
	if (this._options.__autoHeight_w__) {
		this.__fitHeight_AY__();
   }
};

prototype.onAfterRefresh = function(args) {
   if (args !== undefined && args.noRerender === true) {
      return;
   }
   this.__rerender_Ba__();
};

prototype.__rerender_Ba__ = function() {
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

	this.grid.event.trigger("onBeforeRerender");
	this.unlockAllRows();
	this.__removeRows_y__();
	var rowLen = this.grid.dataMgr.datalist.length;
	if (this._vars.__lastRowLen_l__ !== rowLen) {
		this._vars.__lastRowLen_l__ = rowLen;
		this.__setCanvasHeight_AS__(this.__calCanvasHeight_AR__());
	}
	this.__render_w__();

	// resetting scrolls
	this.setScrollTop(st);
	this.setScrollLeft(sl);

	this.grid.event.trigger("onAfterRerender");
};

prototype.__render_w__ = function(range) {
	/*
	if (this.__lockExist_Ad__()) {
		this.__renderShift_x__(range);
	}
	else {
	*/
		this.__removeAndRenderRows_Am__(range);
	//}
};

prototype.__renderShift_x__ = function(range) {
	if (Util.isNull(range)) {
		range = this.__getRenderRange_u__();
	}

	this.__removeRowsExcept_z__(range);
	this.__appendRows_Al__(range);
};

prototype.__removeRows_y__ = function(range) {
	var canvas = this.__canvas_c__[0],
		rendered = this.__renderedRows_A__,
		locked = this.__lockedRows_B__,
		id;

	if (Util.isNull(range)) {
		if (this.__lockExist_Ad__()) {
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
			this.__renderedRows_A__ = {};
			canvas.innerHTML = "";
		}
	}
	else {
		var i = range.start,
			end = range.end,
			dataMgr = this.grid.dataMgr;

		for (; i <= end; i++) {
			if (!locked.hasOwnProperty(id = dataMgr.getIdByIdx(i)) && rendered.hasOwnProperty(id)) {
				canvas.removeChild(rendered[id]);
				delete rendered[id];
			}
		}
	}
};

prototype.__removeRowsExcept_z__ = function(range) {
	var canvas = this.__canvas_c__[0],
		rendered = this.__renderedRows_A__,
		locked = this.__lockedRows_B__,
		id;

	if (Util.isNull(range)) {
		if (this.__lockExist_Ad__()) {
			for (id in rendered) {
				if (rendered.hasOwnProperty(id) && locked.hasOwnProperty(id) === false) {
					canvas.removeChild(rendered[id]);
					delete rendered[id];
				}
			}
		}
		else {
			this.__renderedRows_A__ = {};
			canvas.innerHTML = "";
		}
	}
	else {
		var start = range.start,
			end = range.end,
			dataMgr = this.grid.dataMgr,
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
	return this.destroyRowById(this.grid.dataMgr.getId(datarow));
};

prototype.destroyRowById = function(id) {
	if (Util.isNotNull(id)) {
		this.unlockRowById(id);
		if (this.__renderedRows_A__.hasOwnProperty(id)) {
			this.__canvas_c__[0].removeChild(this.__renderedRows_A__[id]);
			delete this.__renderedRows_A__[id];
		}
	}
};

prototype.destroyRowByIdx = function(i) {
	return this.destroyRowById(this.grid.dataMgr.getIdByIdx(i));
};

prototype.__lockExist_Ad__ = function() {
	return Util.isNotEmptyObj(this.__lockedRows_B__);
};

// isRowLocked
// tested

/**
  �־��� ���̵� �ش��ϴ� ������ �ο��� DOMElement ��
  ���� lock �Ǿ� �ִ��� ���θ� �����մϴ�.
  lock �Ǿ� ���� ��� ��ũ���� �Ǿ, DOM Tree ���� ���� ���� �ʽ��ϴ�.

  @function {public boolean} isRowLockedById
  @param {string} id - ������ �ο��� ���̵�
  @return {boolean} �ο찡 lock �Ǿ� �ִ� ����

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.isRowLockedById = function(id) {
	if (Util.isNotNull(id)) {
		return this.__lockedRows_B__.hasOwnProperty(id);
	}
	return false;
};

/**
  �־��� ������ �ο��� DOMElement ��
  ���� lock �Ǿ� �ִ��� ���θ� �����մϴ�.
  lock �Ǿ� ���� ��� ��ũ���� �Ǿ, DOM Tree ���� ���� ���� �ʽ��ϴ�.

  @function {public boolean} isRowLocked
  @param {object} datarow - ������ �ο�
  @return {boolean} �ο찡 lock �Ǿ� �ִ� ����

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.isRowLocked = function(datarow) {
	return this.isRowLockedById(this.grid.dataMgr.getId(datarow));
};

/**
  �־��� �ο� �ε����� DOMElement ��
  ���� lock �Ǿ� �ִ��� ���θ� �����մϴ�.
  lock �Ǿ� ���� ��� ��ũ���� �Ǿ, DOM Tree ���� ���� ���� �ʽ��ϴ�.

  @function {public boolean} isRowLockedByIdx
  @param {int} rowIdx - �ο� �ε���
  @return {boolean} �ο찡 lock �Ǿ� �ִ� ����

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.isRowLockedByIdx = function(i) {
	return this.isRowLockedById(this.grid.dataMgr.getIdByIdx(i));
};

// lockRow
// tested
/**
  �־��� ���̵� �ش��ϴ� ������ �ο��� DOMElement �� lock �մϴ�.
  lock �Ǿ� ���� ��� ��ũ���� �Ǿ, DOM Tree ���� ���� ���� �ʽ��ϴ�.

  @function {public} lockRowById
  @param {string} id - ������ �ο��� ���̵�

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.lockRowById = function(id) {
	if (Util.isNotNull(id) && this.grid.dataMgr.hasById(id)) {
		this.__lockedRows_B__[id] = true;
	}
};

/**
  �־��� ������ �ο��� DOMElement �� lock �մϴ�.
  lock �Ǿ� ���� ��� ��ũ���� �Ǿ, DOM Tree ���� ���� ���� �ʽ��ϴ�.

  @function {public} lockRow
  @param {object} datarow - ������ �ο�

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.lockRow = function(datarow) {
	return this.lockRowById(this.grid.dataMgr.getId(datarow));
};

/**
  �־��� �ο� �ε����� DOMElement �� lock �մϴ�.
  lock �Ǿ� ���� ��� ��ũ���� �Ǿ, DOM Tree ���� ���� ���� �ʽ��ϴ�.

  @function {public} lockRowByIdx
  @param {int} rowIdx - �ο� �ε���

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.lockRowByIdx = function(i) {
	return this.lockRowById(this.grid.dataMgr.getIdByIdx(i));
};

//unlockRow
//tested
/**
  �־��� ���̵� �ش��ϴ� ������ �ο��� DOMElement �� unlock �մϴ�.
  lock �Ǿ� ���� ��� ��ũ���� �Ǿ, DOM Tree ���� ���� ���� �ʽ��ϴ�.

  @function {public} unlockRowById
  @param {string} id - ������ �ο��� ���̵�

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.unlockRowById = function(id) {
	if (this.isRowLockedById(id)) {
		delete this.__lockedRows_B__[id];
	}
};

/**
  �־��� ������ �ο��� DOMElement �� unlock �մϴ�.
  lock �Ǿ� ���� ��� ��ũ���� �Ǿ, DOM Tree ���� ���� ���� �ʽ��ϴ�.

  @function {public} unlockRow
  @param {object} datarow - ������ �ο�

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.unlockRow = function(datarow) {
	return this.unlockRowById(this.grid.dataMgr.getId(datarow));
};

/**
  �־��� �ο� �ε����� DOMElement �� unlock �մϴ�.
  lock �Ǿ� ���� ��� ��ũ���� �Ǿ, DOM Tree ���� ���� ���� �ʽ��ϴ�.

  @function {public} unlockRowByIdx
  @param {int} rowIdx - �ο� �ε���

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.unlockRowByIdx = function(i) {
	return this.unlockRowById(this.grid.dataMgr.getIdByIdx(i));
};

//unlockAllRows
/**
  ��� �ο��� DOM Element �� unlock �մϴ�.

  @function {public} unlockAllRows

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.unlockAllRows = function() {
	this.__lockedRows_B__ = {};
};

/**
  �־��� ���̵� �ش��ϴ� ������ �ο��� DOMElement �ٽ� ������ �մϴ�.

  @function {public} rerenderRowById
  @param {string} id - ������ �ο��� ���̵�

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.rerenderRowById = function(id) {
	// check if valid id
	if (!this.grid.dataMgr.containsById(id)) {
		return;
	}

	var rmap = this.__renderedRows_A__,
		canvas = this.__canvas_c__[0],
		datam = this.grid.dataMgr,
		i = datam.getIdxById(id),
		datarow = datam.getById(id),
		colDefs = this.grid.colDefMgr.get(),
		colCommon = this.__getColCellClasses_An__(colDefs),
		rowH = this.__getRowOuterHeight_AN__(),
		html = [],
		newNodes;

	// remove from map
	if (rmap.hasOwnProperty(id)) {
		canvas.removeChild(rmap[id]);

		// fire event to notify onBeforeRenderRows
		this.grid.event.trigger("onBeforeRenderRows", [[i]]);

		// render and append to canvas
		this.__renderRow_Ap__(html, i, datarow, colDefs, colCommon, rowH);
		rmap[id] = Util.appendHTML(canvas, html.join(""))[0];

		// fire event to notify rendere completion
		this.grid.event.trigger("onAppendRows", [[i]]);
	}

};

/**
  �־��� ������ �ο��� DOMElement �ٽ� ������ �մϴ�.

  @function {public} rerenderRow
  @param {object} datarow - ������ �ο�

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.rerenderRow = function(datarow) {
	return this.rerenderRowById(this.grid.dataMgr.getId(datarow));
};

/**
  �־��� �ο� �ε����� DOMElement �ٽ� ������ �մϴ�.

  @function {public} rerenderRowByIdx
  @param {int} rowIdx - �ο� �ε���

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.rerenderRowByIdx = function(i) {
	return this.rerenderRowById(this.grid.dataMgr.getIdByIdx(i));
};


/**
  �־��� ������ �ο� ���̵� �ش��ϴ� ������ �ο��
  �÷� Ű�� �ش��ϴ� ���� DOM Element �� �ٽ� �������մϴ�.

  @function {public} rerenderCellByIdAndKey
  @param {string} id - ������ �ο� ���̵�
  @param {string} key - �÷� Ű

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.rerenderCellByIdAndKey = function(id, key) {
	var cellnode = this.getCellByIdAndKey(id, key);
	if (cellnode !== undefined) {
		var datam = this.grid.dataMgr,
			colm = this.grid.colDefMgr,
			datarow = datam.getById(id),
			colDef = colm.getByKey(key),
			row = datam.getIdxById(id),
			col = colm.getIdxByKey(key);

		cellnode.innerHTML = this.__renderCell_Aq__([], row, col, datarow, colDef).join("");
	}
};

/**
  �־��� �ο� �ε����� �÷� �ε����� �ش��ϴ� ���� DOM Element �� �ٽ� �������մϴ�.

  @function {public} rerenderCellByIdx
  @param {int} row - �ο� �ε���
  @param {int} col - �÷� �ε���

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.rerenderCellByIdx = function(row, col) {
	return this.rerenderCellByIdAndKey(this.grid.dataMgr.getIdByIdx(row), this.grid.colDefMgr.getKeyByIdx(col));
};

prototype.__appendRows_Al__ = function(range) {
	this.grid.event.trigger("onBeforeRenderRows", [range]);
	var html = [],
		i = range.start,
		end = range.end,
		datalist = this.grid.dataMgr.datalist,
		idKey = this.grid.dataMgr.idKey,
		colDefs = this.grid.colDefMgr.get(),
		collen = colDefs.length,
		colCommon = this.__getColCellClasses_An__(colDefs),
		rendered = this.__renderedRows_A__,
		rowH = this.__getRowOuterHeight_AN__(),
		canvas = this.__canvas_c__[0],
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
		this.__renderRow_Ap__(html, i, datarow, colDefs, colCommon, rowH);
		added.push(id);
	}	

	newNodes = Util.appendHTML(canvas, html.join(""));

	for (i = 0, len = added.length; i < len; i++) {
		rendered[added[i]] = newNodes[i];
	}

	this.grid.event.trigger("onAppendRows", [range]);
};

prototype.__removeAndRenderRows_Am__ = function(range) {
	if (Util.isNull(range)) {
		range = this.__getRenderRange_u__();
	}
	this.grid.event.trigger("onBeforeRenderRows", [range]);

	var html = [],
		i = range.start,
		end = range.end,
		dataMgr = this.grid.dataMgr,
		datalist = dataMgr.datalist,
		idKey = dataMgr.idKey,
		colDefs = this.grid.colDefMgr.get(),
		collen = colDefs.length,
		colCommon = this.__getColCellClasses_An__(colDefs),
		canvas = this.__canvas_c__[0],
		rowH = this.__getRowOuterHeight_AN__(),
		datarow,
		added = [],
		newRendered = {},
		len;

	for (; i <= end; i++) {
		datarow = datalist[i];
		this.__renderRow_Ap__(html, i, datarow, colDefs, colCommon, rowH);
		added.push(datarow[idKey]);
	}

	canvas.innerHTML = html.join("");

	for (i = 0, len = added.length; i < len; i++) {
		newRendered[added[i]] = canvas.childNodes[i];
	}

	this.__renderedRows_A__ = newRendered;

	/**
	  �׸��尡 �ο찡 ���� ������ �Ǿ��� �� (�ο찡 �߰��ǰų�, �ٽ� ������ �ǰų�) �߻��ϴ� �̺�Ʈ �Դϴ�.

	  @event {Event} onAppendRows
	  @param {Object} range - ������ �� �ο� ����. ��) range = {start:0, end:10}

	  @author ����ȣ
	  @since 1.2.0
	  @version 1.2.3
	  */
	this.grid.event.trigger("onAppendRows", [range]);
};

prototype.__getColCellClass_Ao__ = function(colDef) {
	var cssClass = this._options.__classCell_m__ + " " + "k_" + colDef.key;
	if (Util.isNotNull(colDef.colClass)) {
		cssClass += " " + colDef.colClass;
	}

	/**
	  �׸��� �÷� ���� css Ŭ������ ������ �� �߻��ϴ� �̺�Ʈ�Դϴ�. Ư�� �÷� ���� �������� css Ŭ������ �߰��Ϸ��� css Ŭ���� ���� �����ϸ� �˴ϴ�.
	  ��) return "��_�÷�����_�־���_css_Ŭ����_��";

	  @event {Event} onGetColCellClass
	  @param {Object} colDef - �÷� ���� ������Ʈ
	  @returns {String} �÷� ���鿡 ���������� �߰��� css Ŭ���� ��

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */
	cssClass += " " + this.grid.event.trigger("onGetColCellClass", [colDef]).join(" ");
	return cssClass;
};

prototype.__getColCellClasses_An__ = function(colDefs) {
	var cssClasses = [],
		i = 0,
		len = colDefs.length;
	if (Util.isNull(colDefs)) {
		colDefs = this.grid.colDefMgr.get();
	}
	for (; i < len; i++) {
		cssClasses.push(this.__getColCellClass_Ao__(colDefs[i]));
	}
	return cssClasses;
};

prototype.__renderRow_Ap__ = function(html, rowIdx, datarow, colDefs, colCommon, rowH) {
	html.push("<div class='" + this._options.__classRow_l__ +
			"' i='" + datarow[this.grid.dataMgr.idKey] +
			"' " + this._options.__attrRowIdx_a__ + "='" + rowIdx +
			"' style='top:" + (rowH * rowIdx) + "px'>");
	var i = 0,
		collen = colDefs.length;
	for (; i < collen; i++) {

		/**
		  �׸��� ���� css Ŭ������ ������ �� �߻��ϴ� �̺�Ʈ�Դϴ�. Ư�� ���� css Ŭ������ �߰��Ϸ��� css Ŭ���� ���� �����ϸ� �˴ϴ�.
		  ��) return "��_������_�־���_css_Ŭ����_��";

		  @event {Event} onGetCellClass
		  @param {int} rowIdx - ���� �ο� �ε���
		  @param {int} colIdx - ���� �÷� �ε���
		  @param {Object} datarow - ���� �ο� ������
		  @param {Object} colDef - ���� �÷� ���� ������Ʈ
		  @returns {String} ���� �߰��� css Ŭ���� ��

		  @author ����ȣ
		  @since 1.1.7
		  @version 1.1.7
		  */
		html.push("<div class='" + colCommon[i] + " " +
				this.grid.event.trigger("onGetCellClass", [rowIdx, i, datarow, colDefs[i]]).join(" ") + "'>");
		this.__renderCell_Aq__(html, rowIdx, i, datarow, colDefs[i]);
		html.push("</div>");
	}
	html.push("</div>");
	return html;
};

prototype.__renderCell_Aq__ = function(html, rowIdx, colIdx, datarow, colDef) {
	/**
	  �׸��� �� �ȿ� prepend �� html �� ������ �� �߻��ϴ� �̺�Ʈ�Դϴ�. prepend �� ������ ������ html �� push ���ָ� �˴ϴ�.
	  ��) html.push("prepend �� ����");

	  @event {Event} onRenderCell_COLKEY_prepend
	  @param {int} rowIdx - ���� �ο� �ε���
	  @param {int} colIdx - ���� �÷� �ε���
	  @param {Object} datarow - ���� �ο� ������
	  @param {Object} colDef - ���� �÷� ���� ������Ʈ
	  @param {String[]} html - ���� append �� html �� ���� ���

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */
	this.grid.event.trigger("onRenderCell_" + colDef.key + "_prepend", [rowIdx, colIdx, datarow, colDef, html]);

	var val = datarow[colDef.key];
	if (typeof val !== "string" || val.substring(0, 3) !== "J@H") {
		if (colDef.rendererInput) {
			html.push(colDef.renderer(JGM.create("Cell", {grid:this.grid, row:rowIdx, col:colIdx, datarow:datarow, colDef:colDef})));
		}
		else {
			html.push(colDef.renderer(val, rowIdx, colIdx, datarow, colDef, this));
		}
	}

	/**
	  �׸��� �� �ȿ� append �� html �� ������ �� �߻��ϴ� �̺�Ʈ�Դϴ�. append �� ������ ������ html �� push ���ָ� �˴ϴ�.
	  ��) html.push("append �� ����");

	  @event {Event} onRenderCell_COLKEY_append
	  @param {int} rowIdx - ���� �ο� �ε���
	  @param {int} colIdx - ���� �÷� �ε���
	  @param {Object} datarow - ���� �ο� ������
	  @param {Object} colDef - ���� �÷� ���� ������Ʈ
	  @param {String[]} html - ���� append �� html �� ���� ���

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */
	this.grid.event.trigger("onRenderCell_" + colDef.key + "_append", [rowIdx, colIdx, datarow, colDef, html]);

	return html;
};

/**
  �� ��带 �ٽ� ������ �մϴ�.

  @function {public} rerender

  @author ����ȣ
  @since 1.0.0
  @version 1.3.0
  */
JGM.Cell.prototype.rerender = function() {
	return this.grid.view.rerenderCellByIdAndKey(this.getId(), this.getKey());
};

/**
  ���� �並 ��ũ�� �մϴ�.

  @function {public} scrollTo

  @author ����ȣ
  @since 1.0.0
  @version 1.0.0
  */
JGM.Cell.prototype.scrollTo = function() {
	this.grid.view.scrollTo(this.getRowIdx(), this.getColIdx());
};

prototype._keydown = function(e) {
	if (!Util.contains(this.__mask_a__[0], document.activeElement, this._ctnr[0])) {
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
	this.grid.event.trigger("keydownCanvas_" + e.which + " keydownCanvas", [e]);
};

prototype._keyup = function(e) {
	if (!Util.contains(this.__mask_a__[0], document.activeElement, this._ctnr[0])) {
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
	this.grid.event.trigger("keyupCanvas_" + e.which + " keyupCanvas", [e]);
};

prototype._keypress = function(e) {
	if (!Util.contains(this.__mask_a__[0], document.activeElement, this._ctnr[0])) {
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
	this.grid.event.trigger("keypressCanvas_" + e.which + " keypressCanvas", [e]);
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
		this.__triggerMouseEvent_Ar__(e, {event:"draginCanvas mouseinCanvas"});
	}
	else {
		this.__triggerMouseEvent_Ar__(e, {event:"mouseinCanvas"});
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
		this.__triggerMouseEvent_Ar__(e, {event:"dragoutCanvas mouseoutCanvas"});
	}
	else {
		this.__triggerMouseEvent_Ar__(e, {event:"mouseoutCanvas"});
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
		this.__triggerMouseEvent_Ar__(e, {event:"dragenterCanvas mouseenterCanvas"});
	}
	else {
		this.__triggerMouseEvent_Ar__(e, {event:"mouseenterCanvas"});
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
		this.__triggerMouseEvent_Ar__(e, {event:"dragleaveCanvas mouseleaveCanvas"});
	}
	else {
		this.__triggerMouseEvent_Ar__(e, {event:"mouseleaveCanvas"});
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
		this.__triggerMouseEvent_Ar__(e, {event:"dragmoveCanvas mousemoveCanvas"});
	}
	else {
		this.__triggerMouseEvent_Ar__(e, {event:"mousemoveCanvas"});
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
		this.__triggerMouseEvent_Ar__(e, {event:"dragoverCanvas mouseoverCanvas"});
	}
	else {
		this.__triggerMouseEvent_Ar__(e, {event:"mouseoverCanvas"});
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
	if (this.__triggerMouseEvent_Ar__(e, {event:"mousedownCanvas"})) {
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
	if (this.__triggerMouseEvent_Ar__(e, {event:"mouseupCanvas"})) {
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
	this.__triggerMouseEvent_Ar__(e, {event:"clickCanvas"});
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
	this.__triggerMouseEvent_Ar__(e, {event:"dblclickCanvas"});
};

prototype.__triggerMouseEvent_Ar__ = function(e, args) {
	var node = this.__getClosestCell_Az__(e.target),
		arr,
		earr,
		i,
		len;

	if (node === undefined) {
		return false;
	}

	args.cell = JGM.create("Cell", {grid:this.grid, node:node});

	arr = Util.split(args.event);
	len = arr.length;
	earr = [];
	for (i = 0; i < len; i++) {
		earr.push(arr[i] + "_" + args.cell.getKey());
		earr.push(arr[i]);
	}

	this.grid.event.trigger(earr.join(" "), [e, args.cell]);

	return true;
};

prototype.__scroll_As__ = function() {
	var scrollTop = this.getScrollTop(),
		scrollVDist = scrollTop - this._vars.__lastScrollTop_d__,
		scrollLeft = this.getScrollLeft(),
		scrollHDist = scrollLeft - this._vars.__lastScrollLeft_e__;

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
	this.grid.event.trigger("onScrollViewport");

	if (scrollHDist !== 0) {
		this._vars.__lastScrollLeft_e__ = scrollLeft;

		/**
		  �׸��� �䰡 ���� ��ũ�� �Ǿ��� �� �߻��ϴ� �̺�Ʈ �Դϴ�.

		  @event {Event} onScrollViewportH

		  @author ����ȣ
		  @since 1.1.7
		  @version 1.1.7
		  */
		this.grid.event.trigger("onScrollViewportH", [scrollLeft]);
	}

	var numDiff = Math.abs(scrollVDist / this.__getRowOuterHeight_AN__());

	if (numDiff < this._options.__appendThreshold_b__) {
		return;
	}

	this._vars.__lastScrollTop_d__ = scrollTop;
	//if (numDiff >= this._options.__renderThreshold_c__) {
	this.__render_w__();
	/*
	   }
	   else {
	   this.__renderShift_x__();
	   }
	   */

	/**
	  �׸��� �䰡 ���� ��ũ�� �Ǿ��� �� �߻��ϴ� �̺�Ʈ �Դϴ�.

	  @event {Event} onScrollViewportV

	  @author ����ȣ
	  @since 1.1.7
	  @version 1.1.7
	  */
	this.grid.event.trigger("onScrollViewportV");
};

prototype.focus = function(e) {
	/**
	  �׸��� ĵ�ٽ��� DOM Elemenet �� ��Ŀ�� �Ǳ� ���� �߻��ϴ� �̺�Ʈ �Դϴ�. false �� �����ϸ� ĵ�ٽ��� ��Ŀ���� ��ҵ˴ϴ�.

	  @event {Event} onBeforeFocusCanvas
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @returns {Boolean} continueOrStop - false �� ������ ��� �׸��� ĵ�ٽ��� ��Ŀ������ �ʽ��ϴ�.

	  @author ����ȣ
	  @since 1.2.1
	  @version 1.2.1
	  */
	if (Util.isNotNull(e) && this.grid.event.triggerInvalid("onBeforeFocusCanvas", [e])) {
		return;
	}

	//var scr = Util.getBodyScroll();

	if (this.__mask_a__[0] !== document.activeElement) {
		if (Util.isFunction(this.__mask_a__[0].setActive)) {
			try {
				this.__mask_a__[0].setActive();
			}
			catch (exp) {}
		}
		this.__mask_a__[0].focus();
		if (document.activeElement !== this.__mask_a__[0]) {
			this.__mask_a__.focus();
		}
	}

	//Util.setBodyScroll(scr[0], scr[1]);
};

//isRendered
//tested
/**
  �־��� ���̵� �ش��ϴ� ������ �ο��� DOMElement ��
  ���� �������Ǿ� �ִ��� ���θ� �����մϴ�.

  @function {public boolean} isRenderedById
  @param {string} id - ������ �ο��� ���̵�
  @return {boolean} �ο찡 �������Ǿ� �ִ� ����

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.isRenderedById = function(id) {
	if (Util.isNotNull(id)) {
		return this.__renderedRows_A__.hasOwnProperty(id);
	}
	return false;
};

/**
  �־��� ������ �ο��� DOMElement ��
  ���� �������Ǿ� �ִ��� ���θ� �����մϴ�.

  @function {public boolean} isRendered
  @param {object} datarow - ������ �ο�
  @return {boolean} �ο찡 �������Ǿ� �ִ� ����

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.isRendered = function(datarow) {
	return this.isRenderedById(this.grid.dataMgr.getId(datarow));
};

/**
  �־��� �ο� �ε����� DOMElement ��
  ���� �������Ǿ� �ִ��� ���θ� �����մϴ�.

  @function {public boolean} isRenderedByIdx
  @param {int} rowIdx - �ο� �ε���
  @return {boolean} �ο찡 �������Ǿ� �ִ� ����

  @author ����ȣ
  @since 1.3.0
  @version 1.3.0
  */
prototype.isRenderedByIdx = function(rowIdx) {
	return this.isRenderedById(this.grid.dataMgr.getIdByIdx(rowIdx));
};

//getRow
//tested
prototype.getRowById = function(id) {
	if (this.isRenderedById(id)) {
		return this.__renderedRows_A__[id];
	}
};

prototype.getRow = function(datarow) {
	return this.getRowById(this.grid.dataMgr.getId(datarow));
};

prototype.getRowByIdx = function(i) {
	return this.getRowById(this.grid.dataMgr.getIdByIdx(i));
};

//getRenderedRow
//tested
prototype.getRenderedRowById = function(id) {
	if (this.isRenderedById(id)) {
		return this.__renderedRows_A__[id];
	}
};

prototype.getRenderedRow = function(datarow) {
	return this.getRenderedRowById(this.grid.dataMgr.getId(datarow));
};

prototype.getRenderedRowByIdx = function(i) {
	return this.getRenderedRowById(this.grid.dataMgr.getIdByIdx(i));
};

prototype.getRenderedRows = function() {
	return Util.toArray(this.__renderedRows_A__);
	return Array.prototype.slice.call(this.__canvas_c__[0].childNodes);
};

prototype.getCell = function(rowIdx, colIdx) {
	var rowNode = this.getRowByIdx(rowIdx);
	if (Util.isNotNull(rowNode, colIdx)) {
		return rowNode.childNodes[colIdx];
	}
};

prototype.getCellByIdAndKey = function(id, key) {
	var rowNode = this.getRowById(id),
		colIdx = this.grid.colDefMgr.getIdxByKey(key);
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
		colIdx = this.grid.colDefMgr.getIdxByKey(key);
	if (Util.isNotNullAnd(rowNode, colIdx)) {
		return rowNode.childNodes[colIdx];
	}
};

prototype.__getClosestCell_Az__ = function(obj) {
	return Util.closestWithTag(obj, "DIV", this._options.__classCell_m__, this.__canvas_c__[0]);
};

prototype.__getClosestRow_AA__ = function(obj) {
	return Util.closestWithTag(obj, "DIV", this._options.__classRow_l__, this.__canvas_c__[0]);
};

prototype.__getClosestRowIdx_AB__ = function(obj) {
	return this.grid.dataMgr.getIdxByNode(this.__getClosestRow_AA__(obj));
};

prototype.__canvasFind_AC__ = function(selector) {
	return this.__canvas_c__.find(selector);
};

ViewportManager.__renderer_AD__ = function(value, rowIdx, colIdx, datarow, colDef, viewMgr) {
	return Util.ifNull(value, "");
};

JGM._add("ViewportManager", ViewportManager);
}());

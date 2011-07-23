goog.require('engine_extension');
goog.require('jx.util');
goog.require('jx.grid');
goog.require('jx.grid.BaseModule');
goog.require('jx.grid.Grid');
goog.require('jx.grid.ColumnManager');

goog.provide('jx.grid.ColumnHeader');

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

 goog.exportSymbol('jx.grid.ColumnHeader', ColHeader);
 JGM._add("ColHeader", ColHeader);

/**
ColHeader ���. �÷� ������� ����ϴ� ����Դϴ�.
@module ColHeader

@requires JGM
@requires JGM.Grid
@requires JGM.ColDefManager
@requires JGM.EventManager
@requires JGM.ViewportManager
 */

/**
ColHeader Ŭ����. �÷� ���� ���� ������ �ο� ���İ� �÷� �¿� ��ġ ���� �� �÷�
���� ��ɵ��� �����մϴ�.

@class {ColHeader} JGM.ColHeader

@author ����ȣ
@since 1.0.0
@version 1.2.1
*/

/**
ColHeader ����Ʈ���� �Դϴ�.

@constructor {ColHeader} ColHeader
@param {Object} args - ColHeader ��� �Ķ���� ������Ʈ
@... {jQuery} args.container - ColHeader �� ���� �����̳� ������Ʈ
@... {JGM.Grid} args.grid - ColHeader �� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�
@... {Object} args.options - ColHeader �ɼ� ������Ʈ
@returns {ColHeader} ColHeader ��� �ν��Ͻ��� �����մϴ�.

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
function ColHeader(args) {
	/**
	{@link JGM} �� �Ҵ����ִ� ColHeader ��� ���� ���̵��Դϴ�. �б� ����.

	@var {string} mid

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.mid = args.mid;

	this._ctnr = args['container'];

	this._mask;

	this._head;

	/**
	ColHeader �� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�.

	@var {JGM.Grid} grid

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid = args.grid;
	
	/**
	�׸��� �÷� ����� �����ϴ� {@link JGM.ColHeader ColHeader} �ν��Ͻ� �Դϴ�.

	@var {JGM.ColHeader} JGM.Grid.header

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid.header = this;

	/**
	ColHeader ����� �⺻ �ɼ� ������ �����մϴ�.

	@type {Object} options
	@private

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	var options = {
		/**
		�÷� ���� ���� ���� ���θ� ���մϴ�. <br>�⺻��:<code>false</code>

		@type {boolean=} JGM.ColHeader.options.reorderEnabled
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_reorderEnabled': false,

		/**
		�÷� ���� ������ �� ���, �÷� ������ �÷� ����� �Բ�
		��ġ�� ��������� ���մϴ�. <br>�⺻��:<code>true</code>

		@type {boolean=} JGM.ColHeader.options.reorderSyncEnabled
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_reorderSyncEnabled': true,

		/**
		�÷� ����� �⺻ ����� �����մϴ�. <br>�⺻��:<code>"url(" + imageUrl + "column-headers-bg.png) repeat-x scroll center"</code>

		@type {string=} JGM.ColHeader.options.background
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_background': "url(" + this.grid._options['imageUrl'] + "column-headers-bg.png) repeat-x scroll center",

		/**
		�÷� ����� ���콺�� �����Ǿ��� ���� ����� �����մϴ�. <br>�⺻��:<code>"url(" + imageUrl + "column-headers-over-bg.png) repeat-x scroll center"</code>

		@type {string=} JGM.ColHeader.options.backgroundHover
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_backgroundHover': "url(" + this.grid._options['imageUrl'] + "column-headers-over-bg.png) repeat-x scroll center",

		/**
		�÷� ���� ���� �ÿ� �÷� ����� �� �ڸ��� ����� �����մϴ�. <br>�⺻��:<code>"#646464"</code>

		@type {string=} JGM.ColHeader.options.backgroundPlaceholder
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_backgroundPlaceholder': "#646464",

		/**
		�÷� �ο� ���� �⺻ ���� ǥ�� ������ ����Դϴ�. <br>�⺻��:<code>imageUrl + "sort.png"</code>

		@type {string=} JGM.ColHeader.options.sortBackground
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_sortBackground': this.grid._options['imageUrl'] + "sort.png",

		/**
		�÷� �ο� ���� ���� ǥ�� �������� ������ ���� �ȼ��Դϴ�. <br>�⺻��:<code>4</code>

		@type {number=} JGM.ColHeader.options.sortRight
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_sortRight': 4,

		/**
		�÷� �ο� ���� ���� ǥ�� �������� �� �ȼ��Դϴ�. <br>�⺻��:<code>7</code>

		@type {number=} JGM.ColHeader.options.sortWidth
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_sortWidth': 7,

		/**
		�÷� �ο� ���� �������� ���� ǥ�� ������ ����Դϴ�. <br>�⺻��:<code>imageUrl + "sort-asc.png"</code>

		@type {string=} JGM.ColHeader.options.sortBackgroundAsc
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_sortBackgroundAsc': this.grid._options['imageUrl'] + "sort-asc.png",

		/**
		�÷� �ο� ���� �������� ���� ǥ�� ������ ����Դϴ�. <br>�⺻��:<code>imageUrl + "sort-desc.png"</code>

		@type {string=} JGM.ColHeader.options.sortBackgroundDesc
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_sortBackgroundDesc': this.grid._options['imageUrl'] + "sort-desc.png",

		/**
		�÷� ����� ��Ʈ ��Ÿ���Դϴ�. <br>�⺻��:<code>"15px Arial,Helvetica,sans-serif"</code>

		@type {string=} JGM.ColHeader.options.font
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_font': "15px Arial,Helvetica,sans-serif",

		/**
		�÷� ����� ���� �ȼ� �Դϴ�. <br>�⺻��:<code>21</code>

		@type {number=} JGM.ColHeader.options.height
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_height': 21,

		/**
		�÷� ��� border �� �β� �Դϴ�. <br>�⺻��:<code>1</code>

		@type {number=} JGM.ColHeader.options.borderThickness
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_borderThickness': 1,

		/**
		�÷� ��� border �� ��Ÿ�� �Դϴ�. <br>�⺻��:<code>"solid #909192"</code>

		@type {string=} JGM.ColHeader.options.border
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_border': "solid #909192",

		/**
		�÷� ��� �����̳� ����ũ�� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-header-mask"</code>

		@type {string=} JGM.ColHeader.options.classHeaderMask
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_classHeaderMask': "jgrid-header-mask",

		/**
		�÷� ��� �����̳ʿ� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-header"</code>

		@type {string=} JGM.ColHeader.options.classHeader
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_classHeader': "jgrid-header",

		/**
		�� �÷� ����� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-colheader"</code>

		@type {string=} JGM.ColHeader.options.classColHeader
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_classColHeader': "jgrid-colheader",

		/**
		�÷� ��� ���� ����� ����Ǵ� �÷��� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-colheader-active"</code>

		@type {string=} JGM.ColHeader.options.classColHeaderActive
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_classColHeaderActive': "jgrid-colheader-active",

		/**
		�÷� ��� ���� ����� ����Ǵ� �÷��� ���ڸ��� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-colheader-placeholder"</code>

		@type {string=} JGM.ColHeader.options.classColHeaderPlaceholder
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_classColHeaderPlaceholder': "jgrid-colheader-placeholder",

		/**
		interactive �� �÷� ����鿡 ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"interactive"</code>

		@type {string=} JGM.ColHeader.options.classInteractive
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_classInteractive': "interactive",

		/**
		���� �ο� ���� ���� �÷� ����� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-colheader-sorted"</code>

		@type {string=} JGM.ColHeader.options.classColHeaderSorted
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_classColHeaderSorted': "jgrid-colheader-sorted",

		/**
		�÷� �ο� ���� ���� ǥ�� �����ܿ� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-sort"</code>

		@type {string=} JGM.ColHeader.options.classSort
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_classSort': "jgrid-sort",

		/**
		�÷� �ο� ���� �������� ���� ǥ�� �����ܿ� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-sort-asc"</code>

		@type {string=} JGM.ColHeader.options.classSortAsc
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_classSortAsc': "jgrid-sort-asc",

		/**
		�÷� �ο� ���� �������� ���� ǥ�� �����ܿ� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-sort-desc"</code>

		@type {string=} JGM.ColHeader.options.classSortDesc
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_classSortDesc': "jgrid-sort-desc",

		/**
		�÷� �� ���� �ڵ��� CSS Ŭ���� �Դϴ�.<br>�⺻��:<code>"jgrid-resize-handle"</code>

		@type {string=} JGM.ColHeader.options.classResizeHandle
		@private

		@author ����ȣ
		@since 1.1.2
		@version 1.1.2
		*/
		'_classResizeHandle': "jgrid-resize-handle",

		/**
		�÷� �� ���� �ڵ��� ���Դϴ�. <br>�⺻��:<code>11</code>

		@type {number=} JGM.ColHeader.options.resizeHandleWidth
		@private

		@author ����ȣ
		@since 1.1.2
		@version 1.1.2
		*/
		'_resizeHandleWidth': 11,

		/**
		�÷� ��� �����̳� ����ũ�� ����Ǵ� CSS style �Դϴ�.<br>
		������ ��: �� �ɼǿ� �Էµ� style �� ����Ǿ����� DOM �� ũ�Ⱑ ���ϸ� �׸����� �������� ũ�� ��꿡 ������ ����ϴ�.
		��, ũ�⿡ ������ ���� style ������ �Ҷ��� ����ϼ���.
		<br>�⺻��:<code>""</code>

		@type {string=} JGM.ColHeader.options.style
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_style': "",

		/**
		�÷� ����鿡 ���������� CSS style �Դϴ�.<br>
		������ ��: �� �ɼǿ� �Էµ� style �� ����Ǿ����� DOM �� ũ�Ⱑ ���ϸ� �׸����� �������� ũ�� ��꿡 ������ ����ϴ�.
		��, ũ�⿡ ������ ���� style ������ �Ҷ��� ����ϼ���.
		<br>�⺻��:<code>""</code>

		@type {string=} JGM.ColHeader.options.headerStyle
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'_headerStyle': "",

		/**
		��ũ�ѷ��� ���� style.left
		<br>�⺻��:<code>10000</code>

		@type {number=} JGM.ColHeader.options.scrollerLeft
		@private

		@author ����ȣ
		@since 1.1.7
		@version 1.1.7
		*/
		'_scrollerLeft': 10000,
		
		/**
		��ũ�ѷ��� width
		<br>�⺻��:<code>100000</code>

		@type {number=} JGM.ColHeader.options.scrollerWidth
		@private

		@author ����ȣ
		@since 1.1.7
		@version 1.1.7
		*/
		'_scrollerWidth': 100000,
		
		/**
		�÷� ������� �� �� ����� ���̵忡 ����Ǵ� CSS Ŭ���� �Դϴ�.
		<br>�⺻��:<code>"resize-guide"</code>

		@type {string=} JGM.ColHeader.options.classResizeGuide
		@private

		@author ����ȣ
		@since 1.1.7
		@version 1.1.7
		*/
		'_classResizeGuide': "resize-guide",
		
		/**
		�÷� ������� �� �� ����� ���̵��� �� �ȼ��Դϴ�.
		<br>�⺻��:<code>1</code>

		@type {number=} JGM.ColHeader.options.resizeGuideWidth
		@private

		@author ����ȣ
		@since 1.1.7
		@version 1.1.7
		*/
		'_resizeGuideWidth': 1,
		
		/**
		�÷� ������� �� �� ����� ���̵��� ��� style �Դϴ�.
		<br>�⺻��:<code>"black;filter:alpha(opacity=40);opacity:0.4"</code>

		@type {string=} JGM.ColHeader.options.resizeBackground
		@private

		@author ����ȣ
		@since 1.1.7
		@version 1.1.7
		*/
		'_resizeBackground': "black;filter:alpha(opacity=40);opacity:0.4",
		
		/**
		�÷� ������� �� �� �÷� ������ ���ÿ� ������ �������� �����Դϴ�.
		<br>�⺻��:<code>false</code>

		@type {boolean=} JGM.ColHeader.options.syncResize
		@private

		@author ����ȣ
		@since 1.1.7
		@version 1.1.7
		*/
		'_syncResize': false,
		
		/**
		�÷� �������� �ڵ��� ��� style �Դϴ�.
		<br>�⺻��:<code>"black;filter:alpha(opacity=5);opacity:0.05"</code>

		@type {string=} JGM.ColHeader.options.resizeHandleBackground
		@private

		@author ����ȣ
		@since 1.2.1
		@version 1.2.1
		*/
		'_resizeHandleBackground': "black;filter:alpha(opacity=5);opacity:0.05"
	};

	this._options = JGM._extend(options, args['options'], {
		reorderEnabled:"_reorderEnabled",
		reorderSyncEnabled:"_reorderSyncEnabled",
		background:"_background",
		backgroundHover:"_backgroundHover",
		backgroundPlaceholder:"_backgroundPlaceholder",
		sortBackground:"_sortBackground",
		sortRight:"_sortRight",
		sortWidth:"_sortWidth",
		sortBackgroundAsc:"_sortBackgroundAsc",
		sortBackgroundDesc:"_sortBackgroundDesc",
		font:"_font",
		height:"_height",
		borderThickness:"_borderThickness",
		border:"_border",
		classHeaderMask:"_classHeaderMask",
		classHeader:"_classHeader",
		classColHeader:"_classColHeader",
		classColHeaderActive:"_classColHeaderActive",
		classColHeaderPlaceholder:"_classColHeaderPlaceholder",
		classInteractive:"_classInteractive",
		classColHeaderSorted:"_classColHeaderSorted",
		classSort:"_classSort",
		classSortAsc:"_classSortAsc",
		classSortDesc:"_classSortDesc",
		classResizeHandle:"_classResizeHandle",
		resizeHandleWidth:"_resizeHandleWidth",
		style:"_style",
		headerStyle:"_headerStyle",
		scrollerLeft:"_scrollerLeft",
		scrollerWidth:"_scrollerWidth",
		classResizeGuide:"_classResizeGuide",
		resizeGuideWidth:"_resizeGuideWidth",
		resizeBackground:"_resizeBackground",
		syncResize:"_syncResize",
		resizeHandleBackground:"_resizeHandleBackground"
	});

	this._map = {};
	
	this._resizeKey;
	this._resizeInitX;
	this._resizeHandleInitX;
	this._resizeInitWidth;
	this._resizeMap = {};
	this._resizeInitColWidth;
	this._resizeGuide;
	this._resizeHandleOffset;

	this.__init();
}

ColHeader.getInstance = function(args) {
	return new ColHeader(args);
};

var prototype = ColHeader.prototype;

prototype.__init = function() {
	this._mask =
		$("<div class='" + this._options['_classHeaderMask'] + "'>")
		.prependTo(this._ctnr);

	this._head =
		$("<div class='" + this._options['_classHeader'] + "'>")
		.appendTo(this._mask);

	ColHeader._disableSel(this._head);

	this.bindEvents();
};

prototype.bindEvents = function() {
	var events,
		colDefs = this.grid.colDefMgr.get(),
		len = colDefs.length,
		i = 0;

	events = {
		'onRenderModules': this._onRenderModules,
		'onAfterRenderModules': this._onAfterRenderModules,
		'onCreateCss': this._onCreateCss,
		'onDestroy': this._destroy,
		'mousedown': this._mousedown,
		'mouseup': this._mouseup,
		'dragmove': this._dragmove,
		'onScrollViewportH': this._onScrollViewportH,
		'onScrollViewportV': this._onScrollViewportV,
		'onChangeSorter': this._onChangeSorter,
		'click': this._click,
		'onResizeCol': this._setWidthByKey
	};

	for (; i < len; i++) {
		if (Util.isNotNull(colDefs[i].sorter)) {
			events["clickHeader_" + colDefs[i].key] = this._sort;
		}
	}

	this.grid.event.bind(events, this);
};

prototype._destroy = function() {	
	if (this._head.sortable) {
		this._head.sortable("destroy");
	}
		
	this._destroyResizeHandles();
	
	JGM._destroy(this, {
		name: "ColHeader",
		path: "header",
		"$": "_resizeGuide _mask _head",
		property: "_ctnr _resizeMap",
		map: "_map _options"
	});
};

prototype._onCreateCss = function() {
	var gridId = "#" + this.grid.mid + " .",
		o = this._options,
		border = o._borderThickness + "px " + o._border,
		rules = [],
		colDefs = this.grid.colDefMgr.get(),
		len = colDefs.length,
		i = 0;

	rules.push(gridId + o._classHeaderMask + "{position:relative;overflow:hidden;width:100%;font:" + o._font + ";background:" + o._background + ";border-bottom:" + border + ";" + o._style + "}");
	rules.push(gridId + o._classHeader + "{position:relative;overflow:hidden;white-space:nowrap;cursor:default;left:" + (-o._scrollerLeft) + "px;width:" + o._scrollerWidth + "px;line-height:" + o._height + "px}");
	rules.push(gridId + o._classColHeader + "{position:relative;overflow:hidden;float:left;text-overflow:ellipsis;text-align:center;height:" + o._height + "px;left:" + (o._scrollerLeft - this.grid.view.getScrollLeft()) + "px;border-right:" + border + ";" + o._headerStyle + "}");
	rules.push(gridId + o._classColHeader + "." + o._classInteractive + ":hover, " + gridId + o._classColHeaderActive + "{background:" + o._backgroundHover + "}");
	rules.push(gridId + o._classColHeaderActive + "{border-left:" + border + "}");
	rules.push(gridId + o._classColHeader + "." + o._classColHeaderPlaceholder + "{background:" + o._backgroundPlaceholder + "!important}");
	rules.push(gridId + o._classSort + "{position:absolute;height:" + o._height + "px;right:" + o._sortRight + "px;width:" + o._sortWidth + "px;background:url(" + o._sortBackground + ") no-repeat center transparent}");
	rules.push(gridId + o._classSortAsc + "{background:url(" + o._sortBackgroundAsc + ") no-repeat center transparent}");
	rules.push(gridId + o._classSortDesc + "{background:url(" + o._sortBackgroundDesc + ") no-repeat center transparent}");
	rules.push(gridId + o._classResizeHandle + "{z-index:10;background:" + o._resizeHandleBackground + ";cursor:e-resize;position:absolute;height:" + o._height + "px;width:" + o._resizeHandleWidth + "px}");
	rules.push(gridId + o._classResizeGuide + "{z-index:10;position:absolute;background:" + o._resizeBackground + ";width:" + o._resizeGuideWidth + "px}");
	
	for (; i < len; i++) {
		rules.push(gridId + o._classColHeader + "#" + this.mid + "h" + colDefs[i].key + "{" + colDefs[i].headerStyle + "}");
	}
	
	return rules.join("");
};

prototype._widthPlus = function() {
	return this._options['_borderThickness'];
};

prototype._onScrollViewportH = function(scrollLeft) {
	this._head[0].style.left = (-this._options['_scrollerLeft'] - scrollLeft) + "px";
};

prototype._onRenderModules = function() {
	var colDefs = this.grid.colDefMgr.get(),
		len = colDefs.length,
		i = 0,
		colDef,
		headers = [];

	for (; i < len; i++) {
		if (!(colDef = colDefs[i]).hidden) {
			this._render(headers, colDef, i);
		}
	}
	this._head[0].innerHTML = headers.join("");

	/**
	ColHeader �� �������� �Ϸ�Ǿ��� �� Ʈ���ŵǴ� �̺�Ʈ �Դϴ�.
	@event {Event} onRenderHeadersComplete

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid.event.trigger("onRenderHeadersComplete");
};

prototype._onAfterRenderModules = function() {
	if (this._options['_reorderEnabled']) {
		this._initReorder();
	}
	
	this._initResizeHandles();
	
	this._resizeGuide = $("<div class='" + this._options['_classResizeGuide'] + "'>")
		.appendTo(this.grid.view._mask);
	this._resizeGuide[0].style.top = "0px";
	this._resizeGuide[0].style.height = "0px";
};

prototype._render = function(header, colDef, i) {
	if (Util.isNull(colDef)) {
		return;
	}
	var name = (colDef['noName'] ? "" : colDef['name'] || colDef['key']),
		widthPlus = this._widthPlus();

	header.push("<div id='" + this.mid + "h" + colDef['key'] + "' class='" + this._options['_classColHeader'] + " " + (this._options['_reorderEnabled'] || Util.isNotNull(colDef['sorter']) ? " " + this._options['_classInteractive'] : "") +
		"' " + (colDef['noTitle'] ? "" : "title='" + (colDef['title'] || name) + "' ") + "style='width:" + (this.grid.view._getColOuterWidth(i) - widthPlus) + "px;' colKey='" + colDef['key'] + "'>");

	/**
	ColHeader ������ �ÿ� �߻��Ǵ� �̺�Ʈ�� �÷� �̸� �տ� ���� ��� ���� �������ϱ� ���� Ʈ���� �˴ϴ�.
	@event {Event} onRenderHeader_COLKEY_prepend
	@param {Array.<string>} html - �÷� ��� ������ ��Ʈ������ ���� ���

	@author ����ȣ
	@since 1.0.0
	@version 1.1.7
	*/
	this.grid.event.trigger("onRenderHeader_" + colDef['key'] + "_prepend", [header]);

	header.push(name);

	/**
	ColHeader ������ �ÿ� �߻��Ǵ� �̺�Ʈ�� �÷� �̸� �ڿ� ���� ��� ���� �������ϱ� ���� Ʈ���� �˴ϴ�.
	@event {Event} onRenderHeader_COLKEY_append
	@param {Array.<string>} html - �÷� ��� ������ ��Ʈ������ ���� ���

	@author ����ȣ
	@since 1.0.0
	@version 1.1.7
	*/
	this.grid.event.trigger("onRenderHeader_" + colDef['key'] + "_append", [header]);

	if (Util.isNotNull(colDef['sorter'])) {
		header.push("<span class='" + this._options['_classSort'] + "'></span>");
	}

	header.push("</div>");
};

ColHeader._disableSel = function(target) {
	Util$.safe$(target)
		.attr("unselectable", 'on')
		.css('MozUserSelect', 'none')
		.bind('selectstart.ui', function() { return false; });
};

/**
�־��� key �� �ش��ϴ� �÷� ��� jQuery ������Ʈ�� �����մϴ�.

@function {jQuery} get
@param {string} key - �÷��� key
@returns {jQuery} �־��� key �� �ش��ϴ� �÷� ��� jQuery ������Ʈ

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.get = function(key) {
	if (this._map.hasOwnProperty(key)) {
		return this._map[key];
	}

	var node = document.getElementById(this.mid + "h" + key);
	if (Util.isNull(node)) {
		return $([]);
	}

	return (this._map[key] = $(node));
};

// 0 --> remove all, 1 --> asc, 2 --> desc
prototype._updateIndicator = function(key, status) {
	var colHeader = this.get(key);
	if (colHeader.length === 0) {
		return;
	}

	var opt = this._options,
		indicator = colHeader.find("." + opt._classSort);
	if (status === 0) {
		colHeader.removeClass(opt._classColHeaderSorted);
		indicator.removeClass(opt._classSortAsc + " " + opt._classSortDesc);
	}
	else {
		colHeader.addClass(opt._classColHeaderSorted);
		if (status === 1) {
			indicator.addClass(opt._classSortAsc).removeClass(opt._classSortDesc);
		}
		else if (status === 2) {
			indicator.addClass(opt._classSortDesc).removeClass(opt._classSortAsc);
		}
	}
};

prototype._closest = function(obj) {
	return Util$.safe$(obj).closest("div." + this._options['_classColHeader'], this._head);
};

prototype._getDef = function(header) {
	return this.grid.colDefMgr.getByKey(header.attr("colKey"));
};


prototype._sort = function(e, colHeader, colDef) {
	var sorter = colDef['sorter'];
	if (Util.isNull(sorter)) {
		return;
	}

	/**
	�÷� ���� ���� Ʈ���ŵǴ� �̺�Ʈ �Դϴ�.
	@event {Event} onBeforeColSort_COLKEY

	@author ����ȣ
	@since 1.0.0
	@version 1.1.7
	*/
	
	/**
	�÷� ���� ���� Ʈ���ŵǴ� �̺�Ʈ �Դϴ�.
	@event {Event} onBeforeColSort

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid.event.trigger("onBeforeColSort_" + colDef['key'] + " onBeforeColSort");

	sorter.desc = (sorter.desc === false) ? true : false;

	//this._setSortClass();
	this.grid.dataMgr.refresh({'sorter':sorter});

	// manually call this because IE cannot detect the scroll event
	this.grid.view._scroll();
};

prototype._onChangeSorter = function(oldSorter, newSorter) {
	if (oldSorter === newSorter) {
		if (Util.isNotNull(newSorter)) {
			this._updateIndicator(newSorter.key, (newSorter.desc ? 2 : 1));
		}
		return;
	}
	if (Util.isNotNull(oldSorter)) {
		this._updateIndicator(oldSorter.key, 0);
	}
	if (Util.isNotNull(newSorter)) {
		this._updateIndicator(newSorter.key, (newSorter.desc ? 2 : 1));
	}
};

prototype._initReorder = function() {
	var thisIns = this,
		opt = this._options,
		colDefMgr = this.grid.colDefMgr,
		container = this._head,
		idSubLen = this.mid.length + 1,
		updatefn = function(e, ui) {
			var keys = $(container).sortable('toArray'),
				len = keys.length,
				key,
				i = 0;
			for (; i < len; i++) {
				key = keys[i];
				if (key === "") {
					keys[i] = ui.item.attr("id").substring(idSubLen);
				}
				else {
					keys[i] = key.substring(idSubLen);
				}
			}
			colDefMgr.sortByKey(keys);
		};

	container.sortable({
		'items': "." + opt._classColHeader,
		'axis': "x",
		'forcePlaceholderSize': true,
		'placeholder': opt._classColHeaderPlaceholder + " " + opt._classColHeader,
		'tolerance': "pointer",
		'start': function(e, ui) {
			ui.item.addClass(thisIns._options['_classColHeaderActive']);
		},
		'stop': function(e, ui) {
			ui.item.removeClass(thisIns._options['_classColHeaderActive']);
			thisIns._syncResizeHandles();
		},
		'update': updatefn
	});

	if (opt._reorderSyncEnabled) {
		container.sortable("option", "change", updatefn);
	}
};

prototype._getDx = function(e, colDef) {
	var dx = e.clientX - this._resizeInitX,
		minW = colDef['minW'],
		maxW = Util.ifNull(colDef['maxW'], Number.MAX_VALUE),
		initW = this._resizeInitWidth;

	if (initW + dx < minW) {
		dx = minW - initW;		
	}
	if (initW + dx > maxW) {
		dx = maxW - initW;
	}
	return dx;
};

prototype._click = function(e) {
	var colHeader = this._closest(e.target);
	if (colHeader.length === 0) {
		return;
	}

	var colDef = this._getDef(colHeader);

	/**
	ColHeader �� click �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ� �̺�Ʈ �Դϴ�. �߻��� click �̺�Ʈ��
	valid ������ üũ�մϴ�.

	@event {Event} clickHeaderValid_COLKEY
	@param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	@param {jQuery} colHeader - �÷� ����� ���� jQuery ������Ʈ
	@returns {boolean} false �� ������ ��� {@link clickHeader} �̺�Ʈ�� Ʈ��������
	�ʽ��ϴ�.

	@author ����ȣ
	@since 1.0.0
	@version 1.1.7
	*/
	if (this.grid.event.triggerInvalid("clickHeaderValid_" + colDef['key'], [e, colHeader, colDef])) {
		return;
	}

	/**
	ColHeader �� click �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ� �̺�Ʈ �Դϴ�.
	@event {Event} clickHeader_COLKEY
	@param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	@param {jQuery} colHeader - �÷� ����� ���� jQuery ������Ʈ
	@param {Object} colDef - �÷� ���� ������Ʈ

	@author ����ȣ
	@since 1.0.0
	@version 1.1.7
	*/
	
	/**
	ColHeader �� click �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ� �̺�Ʈ �Դϴ�.
	@event {Event} clickHeader
	@param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	@param {jQuery} colHeader - �÷� ����� ���� jQuery ������Ʈ
	@param {Object} colDef - �÷� ���� ������Ʈ

	@author ����ȣ
	@since 1.0.0
	@version 1.1.7
	*/
	this.grid.event.trigger("clickHeader_" + colDef['key'] + " clickHeader", [e, colHeader, colDef]);
};

prototype._mousedown = function(e) {
	if (Util.hasTagAndClass(e.target, "DIV", this._options['_classResizeHandle'])) {
		this._resizeKey = e.target.getAttribute("key");
		this._resizeInitWidth = this.get(this._resizeKey)[0].clientWidth;
		this._resizeInitColWidth = this.grid.colDefMgr.getByKey(this._resizeKey).width;
		this._resizeInitX = e.clientX;
		this._resizeHandleInitX = this._resizeMap[this._resizeKey][0].offsetLeft;
		this._resizeGuide[0].style.left = Math.floor(this._resizeHandleInitX + (this._options['_resizeHandleWidth'] - this._options['_resizeGuideWidth']) / 2 - this._options['_scrollerLeft']) + "px";
		this._resizeGuide[0].style.height = this.grid.view.getInnerHeight() + "px";
		return;
	}
	
	var colHeader = this._closest(e.target);
	if (colHeader.length === 0) {
		return;
	}

	/**
	ColHeader �� mousedown �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ� �̺�Ʈ �Դϴ�.
	@event {Event} mousedownHeader
	@param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	@param {jQuery} colHeader - �÷� ����� ���� jQuery ������Ʈ

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid.event.trigger("mousedownHeader", [e, colHeader]);

	var colDef = this._getDef(colHeader);

	/**
	ColHeader �� mousedown �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ� �̺�Ʈ �Դϴ�.
	@event {Event} mousedownHeader_COLKEY
	@param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	@param {jQuery} colHeader - �÷� ����� ���� jQuery ������Ʈ
	@param {Object} colDef - �÷� ���� ������Ʈ

	@author ����ȣ
	@since 1.0.0
	@version 1.1.7
	*/
	this.grid.event.trigger("mousedownHeader_" + colDef['key'], [e, colHeader, colDef]);
};

prototype._dragmove = function(e) {
	if (Util.isNull(this._resizeKey)) {
		return;
	}
		
	var dx = this._getDx(e, this.grid.colDefMgr.getByKey(this._resizeKey));
	
	if (Math.abs(dx) < 1) {
		return;
	}
	
	this.get(this._resizeKey)[0].style.width = this._resizeInitWidth + dx + "px";
	this._moveResizeHandles(this._resizeHandleInitX + dx - this._resizeMap[this._resizeKey][0].offsetLeft, this.grid.colDefMgr.getIdxByKey(this._resizeKey));
	this._resizeGuide[0].style.left = Math.floor(this._resizeHandleInitX + dx + (this._options['_resizeHandleWidth'] - this._options['_resizeGuideWidth']) / 2 - this._options['_scrollerLeft']) + "px";
	
	if (this._options['_syncResize']) {
		this.grid.view.setWidthByKey(this._resizeKey, this._resizeInitColWidth + dx);
	}
};

prototype._mouseup = function(e) {
	if (Util.isNull(this._resizeKey)) {
		return;
	}
	
	this._resizeGuide[0].style.height = "0px";
		
	var dx = this._getDx(e, this.grid.colDefMgr.getByKey(this._resizeKey));	
	
	if (Math.abs(dx) >= 1) {
		this.grid.view.setWidthByKey(this._resizeKey, this._resizeInitColWidth + dx);
	}
	
	delete this._resizeKey;
	delete this._resizeInitX;
	delete this._resizeHandleInitX;
	delete this._resizeInitWidth;
	delete this._resizeInitColWidth;
};

prototype._setWidthByKey = function(key, w, o) {
	this.get(key)[0].style.width = w + this.grid.view._colWidthPlus() - this._widthPlus() + "px";
	
	this._syncResizeHandles(this.grid.colDefMgr.getIdxByKey(key));
};

prototype._syncResizeHandles = function(i) {
	if (Util.isNull(i)) {
		i = 0;
	}
		
	var lefts = this.grid.view._getColLefts(),
		colDefs = this.grid.colDefMgr.get(),
		len = colDefs.length,
		rmap = this._resizeMap,
		key;
		
	for (; i < len; i++) {
		key = colDefs[i].key;
		if (rmap.hasOwnProperty(key)) {
			rmap[key][0].style.left = (lefts[i + 1] + this._resizeHandleOffset) + "px";
		}
	}
};

prototype._moveResizeHandles = function(dx, i) {
	if (Util.isNull(i)) {
		i = 0;
	}
		
	var colDefs = this.grid.colDefMgr.get(),
		len = colDefs.length,
		rmap = this._resizeMap,
		key,
		node;
		
	for (; i < len; i++) {
		key = colDefs[i].key;
		if (rmap.hasOwnProperty(key)) {
			node = rmap[key][0];
			node.style.left = (node.offsetLeft + dx) + "px";
		}
	}
};

prototype._onScrollViewportV = function() {
	this._resizeGuide[0].style.top = this.grid.view.getScrollTop() + "px";
};

prototype._destroyResizeHandles = function() {
	var rmap = this._resizeMap,
		key;

	for (key in rmap) {
		if (rmap.hasOwnProperty(key)) {
			rmap[key].remove();
			delete rmap[key];
		}
	}
	
	delete this._resizeKey;
	delete this._resizeInitX;
	delete this._resizeHandleInitX;
	delete this._resizeInitWidth;
	delete this._resizeInitColWidth;
};

prototype._initResizeHandles = function() {
	var colDefs = this.grid.colDefMgr.get(),
		len = colDefs.length,
		lefts = this.grid.view._getColLefts(),
		opt = this._options,
		rmap = this._resizeMap,
		colDef,
		key,
		i = 0,
		offset = this._resizeHandleOffset = Math.floor(opt._scrollerLeft - opt._resizeHandleWidth / 2),
		vmid = this.grid.view.mid,
		handle = opt._classResizeHandle,
		head = this._head;

	for (; i < len; i++) {
		colDef = colDefs[i];
		if (colDef['resizable']) {
			key = colDef['key'];
			rmap[key] = $("<div class='" + handle + "' key='" + key +
				"' ondblclick='JGM.m.ViewportManager." + vmid + "._autoColWidth(\"" + key + "\")' style='left:" +
				(offset + lefts[i + 1]) + "px' title='" +
				colDef['name'] + " �÷��� ���� �����մϴ�.'>").appendTo(head);
		}
	}
};

}());

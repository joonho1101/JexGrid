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
	this.grid['header'] = this;

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
		'reorderEnabled': false,

		/**
		�÷� ���� ������ �� ���, �÷� ������ �÷� ����� �Բ�
		��ġ�� ��������� ���մϴ�. <br>�⺻��:<code>true</code>

		@type {boolean=} JGM.ColHeader.options.reorderSyncEnabled
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'reorderSyncEnabled': true,

		/**
		�÷� ����� �⺻ ����� �����մϴ�. <br>�⺻��:<code>"url(" + imageUrl + "column-headers-bg.png) repeat-x scroll center"</code>

		@type {string=} JGM.ColHeader.options.background
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'background': "url(" + this.grid['_options']['imageUrl'] + "column-headers-bg.png) repeat-x scroll center",

		/**
		�÷� ����� ���콺�� �����Ǿ��� ���� ����� �����մϴ�. <br>�⺻��:<code>"url(" + imageUrl + "column-headers-over-bg.png) repeat-x scroll center"</code>

		@type {string=} JGM.ColHeader.options.backgroundHover
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'backgroundHover': "url(" + this.grid['_options']['imageUrl'] + "column-headers-over-bg.png) repeat-x scroll center",

		/**
		�÷� ���� ���� �ÿ� �÷� ����� �� �ڸ��� ����� �����մϴ�. <br>�⺻��:<code>"#646464"</code>

		@type {string=} JGM.ColHeader.options.backgroundPlaceholder
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'backgroundPlaceholder': "#646464",

		/**
		�÷� �ο� ���� �⺻ ���� ǥ�� ������ ����Դϴ�. <br>�⺻��:<code>imageUrl + "sort.png"</code>

		@type {string=} JGM.ColHeader.options.sortBackground
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'sortBackground': this.grid['_options']['imageUrl'] + "sort.png",

		/**
		�÷� �ο� ���� ���� ǥ�� �������� ������ ���� �ȼ��Դϴ�. <br>�⺻��:<code>4</code>

		@type {number=} JGM.ColHeader.options.sortRight
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'sortRight': 4,

		/**
		�÷� �ο� ���� ���� ǥ�� �������� �� �ȼ��Դϴ�. <br>�⺻��:<code>7</code>

		@type {number=} JGM.ColHeader.options.sortWidth
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'sortWidth': 7,

		/**
		�÷� �ο� ���� �������� ���� ǥ�� ������ ����Դϴ�. <br>�⺻��:<code>imageUrl + "sort-asc.png"</code>

		@type {string=} JGM.ColHeader.options.sortBackgroundAsc
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'sortBackgroundAsc': this.grid['_options']['imageUrl'] + "sort-asc.png",

		/**
		�÷� �ο� ���� �������� ���� ǥ�� ������ ����Դϴ�. <br>�⺻��:<code>imageUrl + "sort-desc.png"</code>

		@type {string=} JGM.ColHeader.options.sortBackgroundDesc
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'sortBackgroundDesc': this.grid['_options']['imageUrl'] + "sort-desc.png",

		/**
		�÷� ����� ��Ʈ ��Ÿ���Դϴ�. <br>�⺻��:<code>"15px Arial,Helvetica,sans-serif"</code>

		@type {string=} JGM.ColHeader.options.font
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'font': "15px Arial,Helvetica,sans-serif",

		/**
		�÷� ����� ���� �ȼ� �Դϴ�. <br>�⺻��:<code>21</code>

		@type {number=} JGM.ColHeader.options.height
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'height': 21,

		/**
		�÷� ��� border �� �β� �Դϴ�. <br>�⺻��:<code>1</code>

		@type {number=} JGM.ColHeader.options.borderThickness
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'borderThickness': 1,

		/**
		�÷� ��� border �� ��Ÿ�� �Դϴ�. <br>�⺻��:<code>"solid #909192"</code>

		@type {string=} JGM.ColHeader.options.border
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'border': "solid #909192",

		/**
		�÷� ��� �����̳� ����ũ�� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-header-mask"</code>

		@type {string=} JGM.ColHeader.options.classHeaderMask
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classHeaderMask': "jgrid-header-mask",

		/**
		�÷� ��� �����̳ʿ� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-header"</code>

		@type {string=} JGM.ColHeader.options.classHeader
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classHeader': "jgrid-header",

		/**
		�� �÷� ����� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-colheader"</code>

		@type {string=} JGM.ColHeader.options.classColHeader
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classColHeader': "jgrid-colheader",

		/**
		�÷� ��� ���� ����� ����Ǵ� �÷��� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-colheader-active"</code>

		@type {string=} JGM.ColHeader.options.classColHeaderActive
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classColHeaderActive': "jgrid-colheader-active",

		/**
		�÷� ��� ���� ����� ����Ǵ� �÷��� ���ڸ��� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-colheader-placeholder"</code>

		@type {string=} JGM.ColHeader.options.classColHeaderPlaceholder
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classColHeaderPlaceholder': "jgrid-colheader-placeholder",

		/**
		interactive �� �÷� ����鿡 ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"interactive"</code>

		@type {string=} JGM.ColHeader.options.classInteractive
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classInteractive': "interactive",

		/**
		���� �ο� ���� ���� �÷� ����� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-colheader-sorted"</code>

		@type {string=} JGM.ColHeader.options.classColHeaderSorted
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classColHeaderSorted': "jgrid-colheader-sorted",

		/**
		�÷� �ο� ���� ���� ǥ�� �����ܿ� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-sort"</code>

		@type {string=} JGM.ColHeader.options.classSort
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classSort': "jgrid-sort",

		/**
		�÷� �ο� ���� �������� ���� ǥ�� �����ܿ� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-sort-asc"</code>

		@type {string=} JGM.ColHeader.options.classSortAsc
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classSortAsc': "jgrid-sort-asc",

		/**
		�÷� �ο� ���� �������� ���� ǥ�� �����ܿ� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-sort-desc"</code>

		@type {string=} JGM.ColHeader.options.classSortDesc
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classSortDesc': "jgrid-sort-desc",

		/**
		�÷� �� ���� �ڵ��� CSS Ŭ���� �Դϴ�.<br>�⺻��:<code>"jgrid-resize-handle"</code>

		@type {string=} JGM.ColHeader.options.classResizeHandle
		@private

		@author ����ȣ
		@since 1.1.2
		@version 1.1.2
		*/
		'classResizeHandle': "jgrid-resize-handle",

		/**
		�÷� �� ���� �ڵ��� ���Դϴ�. <br>�⺻��:<code>11</code>

		@type {number=} JGM.ColHeader.options.resizeHandleWidth
		@private

		@author ����ȣ
		@since 1.1.2
		@version 1.1.2
		*/
		'resizeHandleWidth': 11,

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
		'style': "",

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
		'headerStyle': "",

		/**
		��ũ�ѷ��� ���� style.left
		<br>�⺻��:<code>10000</code>

		@type {number=} JGM.ColHeader.options.scrollerLeft
		@private

		@author ����ȣ
		@since 1.1.7
		@version 1.1.7
		*/
		'scrollerLeft': 10000,
		
		/**
		��ũ�ѷ��� width
		<br>�⺻��:<code>100000</code>

		@type {number=} JGM.ColHeader.options.scrollerWidth
		@private

		@author ����ȣ
		@since 1.1.7
		@version 1.1.7
		*/
		'scrollerWidth': 100000,
		
		/**
		�÷� ������� �� �� ����� ���̵忡 ����Ǵ� CSS Ŭ���� �Դϴ�.
		<br>�⺻��:<code>"resize-guide"</code>

		@type {string=} JGM.ColHeader.options.classResizeGuide
		@private

		@author ����ȣ
		@since 1.1.7
		@version 1.1.7
		*/
		'classResizeGuide': "resize-guide",
		
		/**
		�÷� ������� �� �� ����� ���̵��� �� �ȼ��Դϴ�.
		<br>�⺻��:<code>1</code>

		@type {number=} JGM.ColHeader.options.resizeGuideWidth
		@private

		@author ����ȣ
		@since 1.1.7
		@version 1.1.7
		*/
		'resizeGuideWidth': 1,
		
		/**
		�÷� ������� �� �� ����� ���̵��� ��� style �Դϴ�.
		<br>�⺻��:<code>"black;filter:alpha(opacity=40);opacity:0.4"</code>

		@type {string=} JGM.ColHeader.options.resizeBackground
		@private

		@author ����ȣ
		@since 1.1.7
		@version 1.1.7
		*/
		'resizeBackground': "black;filter:alpha(opacity=40);opacity:0.4",
		
		/**
		�÷� ������� �� �� �÷� ������ ���ÿ� ������ �������� �����Դϴ�.
		<br>�⺻��:<code>false</code>

		@type {boolean=} JGM.ColHeader.options.syncResize
		@private

		@author ����ȣ
		@since 1.1.7
		@version 1.1.7
		*/
		'syncResize': false,
		
		/**
		�÷� �������� �ڵ��� ��� style �Դϴ�.
		<br>�⺻��:<code>"black;filter:alpha(opacity=5);opacity:0.05"</code>

		@type {string=} JGM.ColHeader.options.resizeHandleBackground
		@private

		@author ����ȣ
		@since 1.2.1
		@version 1.2.1
		*/
		'resizeHandleBackground': "black;filter:alpha(opacity=5);opacity:0.05"
	};

	this._options = JGM._extend(options, args['options']);

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
		$("<div class='" + this._options['classHeaderMask'] + "'>")
		.prependTo(this._ctnr);

	this._head =
		$("<div class='" + this._options['classHeader'] + "'>")
		.appendTo(this._mask);

	ColHeader._disableSel(this._head);

	this.bindEvents();
};

prototype.bindEvents = function() {
	var events,
		colDefs = this.grid['colDefMgr'].get(),
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

	this.grid['event'].bind(events, this);
};

prototype._destroy = function() {	
	if (this._head.sortable) {
		this._head.sortable("destroy");
	}
		
	this._destroyResizeHandles();
	
	JGM._destroy(this, {
		name: "ColHeader",
		path: "header",
		"$": "resizeGuide _mask _head",
		property: "ctnr _resizeMap",
		map: "map _options"
	});
};

prototype._onCreateCss = function() {
	var gridId = "#" + this.grid['mid'] + " .",
		opt = this._options,
		border = opt['borderThickness'] + "px " + opt['border'],
		rules = [],
		colDefs = this.grid['colDefMgr'].get(),
		len = colDefs.length,
		i = 0;

	rules.push(gridId + opt['classHeaderMask'] + "{position:relative;overflow:hidden;width:100%;font:" + opt['font'] + ";background:" + opt['background'] + ";border-bottom:" + border + ";" + opt['style'] + "}");
	rules.push(gridId + opt['classHeader'] + "{position:relative;overflow:hidden;white-space:nowrap;cursor:default;left:" + (-opt['scrollerLeft']) + "px;width:" + opt['scrollerWidth'] + "px;line-height:" + opt['height'] + "px}");
	rules.push(gridId + opt['classColHeader'] + "{position:relative;overflow:hidden;float:left;text-overflow:ellipsis;text-align:center;height:" + opt['height'] + "px;left:" + (opt['scrollerLeft'] - this.grid['view'].getScrollLeft()) + "px;border-right:" + border + ";" + opt['headerStyle'] + "}");
	rules.push(gridId + opt['classColHeader'] + "." + opt['classInteractive'] + ":hover, " + gridId + opt['classColHeaderActive'] + "{background:" + opt['backgroundHover'] + "}");
	rules.push(gridId + opt['classColHeaderActive'] + "{border-left:" + border + "}");
	rules.push(gridId + opt['classColHeader'] + "." + opt['classColHeaderPlaceholder'] + "{background:" + opt['backgroundPlaceholder'] + "!important}");
	rules.push(gridId + opt['classSort'] + "{position:absolute;height:" + opt['height'] + "px;right:" + opt['sortRight'] + "px;width:" + opt['sortWidth'] + "px;background:url(" + opt['sortBackground'] + ") no-repeat center transparent}");
	rules.push(gridId + opt['classSortAsc'] + "{background:url(" + opt['sortBackgroundAsc'] + ") no-repeat center transparent}");
	rules.push(gridId + opt['classSortDesc'] + "{background:url(" + opt['sortBackgroundDesc'] + ") no-repeat center transparent}");
	rules.push(gridId + opt['classResizeHandle'] + "{z-index:10;background:" + opt['resizeHandleBackground'] + ";cursor:e-resize;position:absolute;height:" + opt['height'] + "px;width:" + opt['resizeHandleWidth'] + "px}");
	rules.push(gridId + opt['classResizeGuide'] + "{z-index:10;position:absolute;background:" + opt['resizeBackground'] + ";width:" + opt['resizeGuideWidth'] + "px}");
	
	for (; i < len; i++) {
		rules.push(gridId + opt['classColHeader'] + "#" + this.mid + "h" + colDefs[i].key + "{" + colDefs[i].headerStyle + "}");
	}
	
	return rules.join("");
};

prototype._widthPlus = function() {
	return this._options['borderThickness'];
};

prototype._onScrollViewportH = function(scrollLeft) {
	this._head[0].style.left = (-this._options['scrollerLeft'] - scrollLeft) + "px";
};

prototype._onRenderModules = function() {
	var colDefs = this.grid['colDefMgr'].get(),
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
	this.grid['event'].trigger("onRenderHeadersComplete");
};

prototype._onAfterRenderModules = function() {
	if (this._options['reorderEnabled']) {
		this._initReorder();
	}
	
	this._initResizeHandles();
	
	this._resizeGuide = $("<div class='" + this._options['classResizeGuide'] + "'>")
		.appendTo(this.grid['view']._mask);
	this._resizeGuide[0].style.top = "0px";
	this._resizeGuide[0].style.height = "0px";
};

prototype._render = function(header, colDef, i) {
	if (Util.isNull(colDef)) {
		return;
	}
	var name = (colDef['noName'] ? "" : colDef['name'] || colDef['key']),
		widthPlus = this._widthPlus();

	header.push("<div id='" + this.mid + "h" + colDef['key'] + "' class='" + this._options['classColHeader'] + " " + (this._options['reorderEnabled'] || Util.isNotNull(colDef['sorter']) ? " " + this._options['classInteractive'] : "") +
		"' " + (colDef['noTitle'] ? "" : "title='" + (colDef['title'] || name) + "' ") + "style='width:" + (this.grid['view']._getColOuterWidth(i) - widthPlus) + "px;' colKey='" + colDef['key'] + "'>");

	/**
	ColHeader ������ �ÿ� �߻��Ǵ� �̺�Ʈ�� �÷� �̸� �տ� ���� ��� ���� �������ϱ� ���� Ʈ���� �˴ϴ�.
	@event {Event} onRenderHeader_COLKEY_prepend
	@param {Array.<string>} html - �÷� ��� ������ ��Ʈ������ ���� ���

	@author ����ȣ
	@since 1.0.0
	@version 1.1.7
	*/
	this.grid['event'].trigger("onRenderHeader_" + colDef['key'] + "_prepend", [header]);

	header.push(name);

	/**
	ColHeader ������ �ÿ� �߻��Ǵ� �̺�Ʈ�� �÷� �̸� �ڿ� ���� ��� ���� �������ϱ� ���� Ʈ���� �˴ϴ�.
	@event {Event} onRenderHeader_COLKEY_append
	@param {Array.<string>} html - �÷� ��� ������ ��Ʈ������ ���� ���

	@author ����ȣ
	@since 1.0.0
	@version 1.1.7
	*/
	this.grid['event'].trigger("onRenderHeader_" + colDef['key'] + "_append", [header]);

	if (Util.isNotNull(colDef['sorter'])) {
		header.push("<span class='" + this._options['classSort'] + "'></span>");
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
		indicator = colHeader.find("." + opt['classSort']);
	if (status === 0) {
		colHeader.removeClass(opt['classColHeaderSorted']);
		indicator.removeClass(opt['classSortAsc'] + " " + opt['classSortDesc']);
	}
	else {
		colHeader.addClass(opt['classColHeaderSorted']);
		if (status === 1) {
			indicator.addClass(opt['classSortAsc']).removeClass(opt['classSortDesc']);
		}
		else if (status === 2) {
			indicator.addClass(opt['classSortDesc']).removeClass(opt['classSortAsc']);
		}
	}
};

prototype._closest = function(obj) {
	return Util$.safe$(obj).closest("div." + this._options['classColHeader'], this._head);
};

prototype._getDef = function(header) {
	return this.grid['colDefMgr'].getByKey(header.attr("colKey"));
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
	this.grid['event'].trigger("onBeforeColSort_" + colDef['key'] + " onBeforeColSort");

	sorter.desc = (sorter.desc === false) ? true : false;

	//this._setSortClass();
	this.grid['dataMgr'].refresh({'sorter':sorter});

	// manually call this because IE cannot detect the scroll event
	this.grid['view']._scroll();
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
		colDefMgr = this.grid['colDefMgr'],
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
		'items': "." + opt['classColHeader'],
		'axis': "x",
		'forcePlaceholderSize': true,
		'placeholder': opt['classColHeaderPlaceholder'] + " " + opt['classColHeader'],
		'tolerance': "pointer",
		'start': function(e, ui) {
			ui.item.addClass(thisIns._options['classColHeaderActive']);
		},
		'stop': function(e, ui) {
			ui.item.removeClass(thisIns._options['classColHeaderActive']);
			thisIns._syncResizeHandles();
		},
		'update': updatefn
	});

	if (opt['reorderSyncEnabled']) {
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
	if (this.grid['event'].triggerInvalid("clickHeaderValid_" + colDef['key'], [e, colHeader, colDef])) {
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
	this.grid['event'].trigger("clickHeader_" + colDef['key'] + " clickHeader", [e, colHeader, colDef]);
};

prototype._mousedown = function(e) {
	if (Util.hasTagAndClass(e.target, "DIV", this._options['classResizeHandle'])) {
		this._resizeKey = e.target.getAttribute("key");
		this._resizeInitWidth = this.get(this._resizeKey)[0].clientWidth;
		this._resizeInitColWidth = this.grid['colDefMgr'].getByKey(this._resizeKey).width;
		this._resizeInitX = e.clientX;
		this._resizeHandleInitX = this._resizeMap[this._resizeKey][0].offsetLeft;
		this._resizeGuide[0].style.left = Math.floor(this._resizeHandleInitX + (this._options['resizeHandleWidth'] - this._options['resizeGuideWidth']) / 2 - this._options['scrollerLeft']) + "px";
		this._resizeGuide[0].style.height = this.grid['view'].getInnerHeight() + "px";
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
	this.grid['event'].trigger("mousedownHeader", [e, colHeader]);

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
	this.grid['event'].trigger("mousedownHeader_" + colDef['key'], [e, colHeader, colDef]);
};

prototype._dragmove = function(e) {
	if (Util.isNull(this._resizeKey)) {
		return;
	}
		
	var dx = this._getDx(e, this.grid['colDefMgr'].getByKey(this._resizeKey));
	
	if (Math.abs(dx) < 1) {
		return;
	}
	
	this.get(this._resizeKey)[0].style.width = this._resizeInitWidth + dx + "px";
	this._moveResizeHandles(this._resizeHandleInitX + dx - this._resizeMap[this._resizeKey][0].offsetLeft, this.grid['colDefMgr'].getIdxByKey(this._resizeKey));
	this._resizeGuide[0].style.left = Math.floor(this._resizeHandleInitX + dx + (this._options['resizeHandleWidth'] - this._options['resizeGuideWidth']) / 2 - this._options['scrollerLeft']) + "px";
	
	if (this._options['syncResize']) {
		this.grid['view'].setWidthByKey(this._resizeKey, this._resizeInitColWidth + dx);
	}
};

prototype._mouseup = function(e) {
	if (Util.isNull(this._resizeKey)) {
		return;
	}
	
	this._resizeGuide[0].style.height = "0px";
		
	var dx = this._getDx(e, this.grid['colDefMgr'].getByKey(this._resizeKey));	
	
	if (Math.abs(dx) >= 1) {
		this.grid['view'].setWidthByKey(this._resizeKey, this._resizeInitColWidth + dx);
	}
	
	delete this._resizeKey;
	delete this._resizeInitX;
	delete this._resizeHandleInitX;
	delete this._resizeInitWidth;
	delete this._resizeInitColWidth;
};

prototype._setWidthByKey = function(key, w, o) {
	this.get(key)[0].style.width = w + this.grid['view']._colWidthPlus() - this._widthPlus() + "px";
	
	this._syncResizeHandles(this.grid['colDefMgr'].getIdxByKey(key));
};

prototype._syncResizeHandles = function(i) {
	if (Util.isNull(i)) {
		i = 0;
	}
		
	var lefts = this.grid['view']._getColLefts(),
		colDefs = this.grid['colDefMgr'].get(),
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
		
	var colDefs = this.grid['colDefMgr'].get(),
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
	this._resizeGuide[0].style.top = this.grid['view'].getScrollTop() + "px";
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
	var colDefs = this.grid['colDefMgr'].get(),
		len = colDefs.length,
		lefts = this.grid['view']._getColLefts(),
		opt = this._options,
		rmap = this._resizeMap,
		colDef,
		key,
		i = 0,
		offset = this._resizeHandleOffset = Math.floor(opt['scrollerLeft'] - opt['resizeHandleWidth'] / 2),
		vmid = this.grid['view'].mid,
		handle = opt['classResizeHandle'],
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

window.console && window.console.log && window.console.log('reading javascript source "ColumnHeader.js"...');//IF_DEBUG

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
	BaseModule = goog.getObjectByName('jx.grid.BaseModule'),
	Grid = goog.getObjectByName('jx.grid.Grid'),
	element = Util.element;

 goog.exportSymbol('jx.grid.ColumnHeader', ColumnHeader);

/**
ColumnHeader ���. �÷� ������� ����ϴ� ����Դϴ�.
ColumnHeader Ŭ����. �÷� ���� ���� ������ �ο� ���İ� �÷� �¿� ��ġ ���� �� �÷�
���� ��ɵ��� �����մϴ�.

@class {ColumnHeader} jx.grid.ColumnHeader

@author ����ȣ
@since 1.0.0
@version 1.2.1
*/

/**
ColumnHeader ����Ʈ���� �Դϴ�.

@constructor {ColumnHeader} ColumnHeader
@param {Object} args - ColumnHeader ��� �Ķ���� ������Ʈ
@... {jQuery} args.container - ColumnHeader �� ���� �����̳� ������Ʈ
@... {jx.grid.Grid} args.grid - ColumnHeader �� �����ϴ� {@link jx.grid.Grid} �ν��Ͻ�
@... {Object} args.options - ColumnHeader �ɼ� ������Ʈ
@returns {ColumnHeader} ColumnHeader ��� �ν��Ͻ��� �����մϴ�.

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
function ColumnHeader(args) {
	args.grid.log('creating new ColumnHeader instance...', Grid.V_INIT);//IF_DEBUG
	goog.base(this, args);
}

goog.inherits(ColumnHeader, BaseModule);

ColumnHeader.getInstance = function(args) {
	return new ColumnHeader(args);
};

var prototype = ColumnHeader.prototype;

prototype._init = function(args) {
	this.grid.log('initializing ColumnHeader instance...', Grid.V_INIT);//IF_DEBUG

	/**
	�׸��� �÷� ����� �����ϴ� {@link jx.grid.ColumnHeader ColumnHeader} �ν��Ͻ� �Դϴ�.

	@var {jx.grid.ColumnHeader} jx.grid.Grid.header

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid['header'] = this;

	this._map = {};

	this._resizeMap = {};
	
	this._resizeKey = this._resizeInitX = this._resizeHandleInitX = this._resizeInitWidth = this._resizeInitColWidth = this._resizeGuide = this._resizeHandleOffset = null;

	var opt = this._options,
		mask = this._mask = $(element('div', {
			'class': opt['classHeaderMask']
		})).prependTo(this._ctnr = args['container']);

	if (this.getColMgr().hasGroups()) {
		this._doubleHead = $(element('div', {
			'class': opt['classHeader']
		})).appendTo(mask);
	}

	var head = this._head = $(element('div', {
		'class': opt['classHeader']
	})).appendTo(mask);

	ColumnHeader._disableSel(head);

};

prototype._bindEvents = function() {
	this.grid.log('binding ColumnHeader events...', Grid.V_INIT);//IF_DEBUG

	var events,
		colDefs = this.getColumns(),
		len = colDefs.length,
		i = 0;

	events = {
		'onRenderModules': this._onRenderModules,
		'onAfterRenderModules': this._onAfterRenderModules,
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
		if (colDefs[i].sorter) {
			events["clickHeader_" + colDefs[i].key] = this._sort;
		}
	}

	this.bindGridEvent(events, this);
};

prototype._defaultOptions = function(grid) {
	this.grid.log('extending ColumnHeader options...', Grid.V_INIT);//IF_DEBUG

	var imgurl = grid._options['imageUrl'];

	/**
	ColumnHeader ����� �⺻ �ɼ� ������ �����մϴ�.

	@type {Object} options
	@private

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	return {
		/**
		�÷� ���� ���� ���� ���θ� ���մϴ�. <br>�⺻��:<code>false</code>

		@type {boolean=} jx.grid.ColumnHeader.options.reorderEnabled
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'reorderEnabled': false,

		/**
		�÷� ���� ������ �� ���, �÷� ������ �÷� ����� �Բ�
		��ġ�� ��������� ���մϴ�. <br>�⺻��:<code>true</code>

		@type {boolean=} jx.grid.ColumnHeader.options.reorderSyncEnabled
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'reorderSyncEnabled': true,

		/**
		�÷� ����� �⺻ ����� �����մϴ�. <br>�⺻��:<code>"url(" + imageUrl + "column-headers-bg.png) repeat-x scroll center"</code>

		@type {string=} jx.grid.ColumnHeader.options.background
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'background': "url(" + imgurl + "column-headers-bg.png) repeat-x scroll center",

		/**
		�÷� ����� ���콺�� �����Ǿ��� ���� ����� �����մϴ�. <br>�⺻��:<code>"url(" + imageUrl + "column-headers-over-bg.png) repeat-x scroll center"</code>

		@type {string=} jx.grid.ColumnHeader.options.backgroundHover
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'backgroundHover': "url(" + imgurl + "column-headers-over-bg.png) repeat-x scroll center",

		/**
		�÷� ���� ���� �ÿ� �÷� ����� �� �ڸ��� ����� �����մϴ�. <br>�⺻��:<code>"#646464"</code>

		@type {string=} jx.grid.ColumnHeader.options.backgroundPlaceholder
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'backgroundPlaceholder': "#646464",

		/**
		�÷� �ο� ���� �⺻ ���� ǥ�� ������ ����Դϴ�. <br>�⺻��:<code>imageUrl + "sort.png"</code>

		@type {string=} jx.grid.ColumnHeader.options.sortBackground
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'sortBackground': imgurl + "sort.png",

		/**
		�÷� �ο� ���� ���� ǥ�� �������� ������ ���� �ȼ��Դϴ�. <br>�⺻��:<code>4</code>

		@type {number=} jx.grid.ColumnHeader.options.sortRight
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'sortRight': 4,

		/**
		�÷� �ο� ���� ���� ǥ�� �������� �� �ȼ��Դϴ�. <br>�⺻��:<code>7</code>

		@type {number=} jx.grid.ColumnHeader.options.sortWidth
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'sortWidth': 7,

		/**
		�÷� �ο� ���� �������� ���� ǥ�� ������ ����Դϴ�. <br>�⺻��:<code>imageUrl + "sort-asc.png"</code>

		@type {string=} jx.grid.ColumnHeader.options.sortBackgroundAsc
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'sortBackgroundAsc': imgurl + "sort-asc.png",

		/**
		�÷� �ο� ���� �������� ���� ǥ�� ������ ����Դϴ�. <br>�⺻��:<code>imageUrl + "sort-desc.png"</code>

		@type {string=} jx.grid.ColumnHeader.options.sortBackgroundDesc
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'sortBackgroundDesc': imgurl + "sort-desc.png",

		'headerMoreButton': imgurl + "header-more-button.gif",

		/**
		�÷� ����� ��Ʈ ��Ÿ���Դϴ�. <br>�⺻��:<code>"15px Arial,Helvetica,sans-serif"</code>

		@type {string=} jx.grid.ColumnHeader.options.font
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'font': "15px Arial,Helvetica,sans-serif",

		/**
		�÷� ����� ���� �ȼ� �Դϴ�. <br>�⺻��:<code>21</code>

		@type {number=} jx.grid.ColumnHeader.options.height
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'height': 21,

		/**
		�÷� ��� border �� �β� �Դϴ�. <br>�⺻��:<code>1</code>

		@type {number=} jx.grid.ColumnHeader.options.borderThickness
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'borderThickness': 1,

		/**
		�÷� ��� border �� ��Ÿ�� �Դϴ�. <br>�⺻��:<code>"solid #909192"</code>

		@type {string=} jx.grid.ColumnHeader.options.border
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'border': "solid #909192",

		/**
		�÷� ��� �����̳� ����ũ�� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-header-mask"</code>

		@type {string=} jx.grid.ColumnHeader.options.classHeaderMask
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classHeaderMask': "jgrid-header-mask",

		/**
		�÷� ��� �����̳ʿ� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-header"</code>

		@type {string=} jx.grid.ColumnHeader.options.classHeader
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classHeader': "jgrid-header",

		/**
		�� �÷� ����� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-colheader"</code>

		@type {string=} jx.grid.ColumnHeader.options.classColHeader
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classColHeader': "jgrid-colheader",

		/**
		�÷� ��� ���� ����� ����Ǵ� �÷��� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-colheader-active"</code>

		@type {string=} jx.grid.ColumnHeader.options.classColHeaderActive
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classColHeaderActive': "jgrid-colheader-active",

		/**
		�÷� ��� ���� ����� ����Ǵ� �÷��� ���ڸ��� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-colheader-placeholder"</code>

		@type {string=} jx.grid.ColumnHeader.options.classColHeaderPlaceholder
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classColHeaderPlaceholder': "jgrid-colheader-placeholder",

		/**
		interactive �� �÷� ����鿡 ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"interactive"</code>

		@type {string=} jx.grid.ColumnHeader.options.classInteractive
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classInteractive': "interactive",

		/**
		���� �ο� ���� ���� �÷� ����� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-colheader-sorted"</code>

		@type {string=} jx.grid.ColumnHeader.options.classColHeaderSorted
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classColHeaderSorted': "jgrid-colheader-sorted",

		/**
		�÷� �ο� ���� ���� ǥ�� �����ܿ� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-sort"</code>

		@type {string=} jx.grid.ColumnHeader.options.classSort
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classSort': "jgrid-sort",

		/**
		�÷� �ο� ���� �������� ���� ǥ�� �����ܿ� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-sort-asc"</code>

		@type {string=} jx.grid.ColumnHeader.options.classSortAsc
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classSortAsc': "jgrid-sort-asc",

		/**
		�÷� �ο� ���� �������� ���� ǥ�� �����ܿ� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-sort-desc"</code>

		@type {string=} jx.grid.ColumnHeader.options.classSortDesc
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classSortDesc': "jgrid-sort-desc",

		/**
		�÷� �� ���� �ڵ��� CSS Ŭ���� �Դϴ�.<br>�⺻��:<code>"jgrid-resize-handle"</code>

		@type {string=} jx.grid.ColumnHeader.options.classResizeHandle
		@private

		@author ����ȣ
		@since 1.1.2
		@version 1.1.2
		*/
		'classResizeHandle': "jgrid-resize-handle",

		/**
		�÷� �� ���� �ڵ��� ���Դϴ�. <br>�⺻��:<code>11</code>

		@type {number=} jx.grid.ColumnHeader.options.resizeHandleWidth
		@private

		@author ����ȣ
		@since 1.1.2
		@version 1.1.2
		*/
		'resizeHandleWidth': 5,

		/**
		�÷� ��� �����̳� ����ũ�� ����Ǵ� CSS style �Դϴ�.<br>
		������ ��: �� �ɼǿ� �Էµ� style �� ����Ǿ����� DOM �� ũ�Ⱑ ���ϸ� �׸����� �������� ũ�� ��꿡 ������ ����ϴ�.
		��, ũ�⿡ ������ ���� style ������ �Ҷ��� ����ϼ���.
		<br>�⺻��:<code>""</code>

		@type {string=} jx.grid.ColumnHeader.options.style
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

		@type {string=} jx.grid.ColumnHeader.options.headerStyle
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'headerStyle': "",

		/**
		��ũ�ѷ��� ���� style.left
		<br>�⺻��:<code>10000</code>

		@type {number=} jx.grid.ColumnHeader.options.scrollerLeft
		@private

		@author ����ȣ
		@since 1.1.7
		@version 1.1.7
		*/
		'scrollerLeft': 10000,
		
		/**
		��ũ�ѷ��� width
		<br>�⺻��:<code>100000</code>

		@type {number=} jx.grid.ColumnHeader.options.scrollerWidth
		@private

		@author ����ȣ
		@since 1.1.7
		@version 1.1.7
		*/
		'scrollerWidth': 100000,
		
		/**
		�÷� ������� �� �� ����� ���̵忡 ����Ǵ� CSS Ŭ���� �Դϴ�.
		<br>�⺻��:<code>"resize-guide"</code>

		@type {string=} jx.grid.ColumnHeader.options.classResizeGuide
		@private

		@author ����ȣ
		@since 1.1.7
		@version 1.1.7
		*/
		'classResizeGuide': "resize-guide",
		
		/**
		�÷� ������� �� �� ����� ���̵��� �� �ȼ��Դϴ�.
		<br>�⺻��:<code>1</code>

		@type {number=} jx.grid.ColumnHeader.options.resizeGuideWidth
		@private

		@author ����ȣ
		@since 1.1.7
		@version 1.1.7
		*/
		'resizeGuideWidth': 1,
		
		/**
		�÷� ������� �� �� ����� ���̵��� ��� style �Դϴ�.
		<br>�⺻��:<code>"black;filter:alpha(opacity=40);opacity:0.4"</code>

		@type {string=} jx.grid.ColumnHeader.options.resizeBackground
		@private

		@author ����ȣ
		@since 1.1.7
		@version 1.1.7
		*/
		'resizeBackground': "black;filter:alpha(opacity=40);opacity:0.4",
		
		/**
		�÷� ������� �� �� �÷� ������ ���ÿ� ������ �������� �����Դϴ�.
		<br>�⺻��:<code>false</code>

		@type {boolean=} jx.grid.ColumnHeader.options.syncResize
		@private

		@author ����ȣ
		@since 1.1.7
		@version 1.1.7
		*/
		'syncResize': false,
		
		/**
		�÷� �������� �ڵ��� ��� style �Դϴ�.
		<br>�⺻��:<code>"black;filter:alpha(opacity=5);opacity:0.05"</code>

		@type {string=} jx.grid.ColumnHeader.options.resizeHandleBackground
		@private

		@author ����ȣ
		@since 1.2.1
		@version 1.2.1
		*/
		'resizeHandleBackground': "black;filter:alpha(opacity=10);opacity:0.10"
	};
}

prototype._beforeDispose = function() {	
	this.grid.log('disposing ColumnHeader instance...', Grid.V_INIT);//IF_DEBUG

	if (this._head.sortable) {
		this._head.sortable("destroy");
	}
	this._destroyResizeHandles();
	JGM._destroy(this, {
		name: "ColumnHeader",
		path: "header",
		"$": "_resizeGuide _mask _head",
		property: "_ctnr _resizeMap",
		map: "_map _options"
	});
	this.dispose();
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

prototype._beforeCreateCss = function(e) {
	this.grid.log('creating CSS for ColumnHeader...', Grid.V_INIT);//IF_DEBUG

	var grid = this.grid,
		gridId = "#" + grid['mid'] + " .",
		opt = this._options,
		border = opt['borderThickness'] + "px " + opt['border'],
		colDefs = this.getColumns(),
		len = colDefs.length,
		i = 0,
		classHeaderMask = '.' + opt['classHeaderMask'],
		classColHeader = '.' + opt['classColHeader'],
		scrollerLeft = opt['scrollerLeft'],
		height = opt['height'] + 'px',
		classColHeaderActive = opt['classColHeaderActive'],
		styles = {};

	styles[classHeaderMask] = {
		position: 'relative',
		overflow: 'hidden',
		width: '100%',
		font: opt['font'],
		background: opt['background'],
		'border-bottom': border,
		_append: opt['style']
	};
	styles['.' + opt['classHeader']] = {
		position: 'relative',
		overflow: 'hidden',
		'white-space': 'nowrap',
		cursor: 'default',
		background: opt['background'],
		left: (-scrollerLeft) + 'px',
		width: opt['scrollerWidth'] + 'px',
		'line-height': height
	};
	styles[classColHeader] = {
		position: 'relative',
		overflow: 'hidden',
		'float': 'left',
		'text-overflow':'ellipsis',
		'text-align':'center',
		'vertical-align': 'middle',
		height: height,
		left: (scrollerLeft - this.getView().getScrollLeft()) + "px",
		'border-right': border,
		_append: opt['headerStyle']
	};
	styles[classColHeader + "." + opt['classInteractive'] + ":hover, " + gridId + classColHeaderActive] = {
		cursor: 'pointer',
		background: opt['backgroundHover']
	};
	styles['.' + classColHeaderActive] = {
		'border-left': border
	};
	styles[classColHeader + "." + opt['classColHeaderPlaceholder']] = {
		background: opt['backgroundPlaceholder'] + "!important"
	};

	styles['.jgrid-header-text'] = {
		'vertical-align': 'middle'
	};

	styles['.jgrid-header-more'] = {
		position: 'absolute',
		cursor: 'pointer',
		height: '100%',
		width: "14px",
		right: 0,
		top: 0
	};
	styles['.jgrid-header-more:hover'] = {
		'border-left': '1px solid black',
		background: "url(" + opt['headerMoreButton'] + ") no-repeat left center"
	};
	styles['.' + opt['classSort']] = {
		position: 'absolute',
		height: '100%',
		width: opt['sortWidth'] + "px",
		background: "url(" + opt['sortBackground'] + ") no-repeat center transparent"
	};
	styles['.' + opt['classSortAsc']] = {
		background: "url(" + opt['sortBackgroundAsc'] + ") no-repeat center transparent"
	};
	styles['.' + opt['classSortDesc']] = {
		background: "url(" + opt['sortBackgroundDesc'] + ") no-repeat center transparent"
	};
	styles['.' + opt['classResizeHandle']] = {
		'z-index':10,
		background: opt['resizeHandleBackground'],
		cursor:'e-resize',
		position:'absolute',
		height: '100%',
		width: opt['resizeHandleWidth'] + "px"
	};
	styles['.' + opt['classResizeGuide']] = {
		'z-index':10,
		position:'absolute',
		background: opt['resizeBackground'],
		width: opt['resizeGuideWidth'] + "px"
	};

	for (; i < len; i++) {
		if (colDefs[i].headerStyle) {
			styles[classColHeader + "#" + this.mid + "h" + colDefs[i].key] = {
				_append: colDefs[i].headerStyle
			};
		}
	}

	this.toCssStyles(e.css, styles);
};

prototype._widthPlus = function() {
	return this._options['borderThickness'];
};

prototype._onScrollViewportH = function(scrollLeft) {
	this.grid.log('adjusting Colheader style.left according to viewport scrollLeft...', Grid.V_RESIZE);//IF_DEBUG
	var left = -this._options['scrollerLeft'] - scrollLeft;
	this._head[0].style.left = left + "px";
	if (this._doubleHead) {
		this._doubleHead[0].style.left = left + "px";
	}
};

prototype._onRenderModules = function() {
	this.grid.log('rendering Colheader...', Grid.V_INIT);//IF_DEBUG

	var colDefs = this.getColumns(),
		len = colDefs.length,
		i = 0,
		colDef,
		headers = [];

	var colmgr = this.getColMgr();
	if (colmgr.hasGroups()) {
		// group header enabled
		// disable reordering
		var opt = this._options;
		opt['reorderEnabled'] = false;

		var groups = colmgr.getGroups(),
			j = 0,
			l = groups.length,
			group,
			groupName,
			groupWidth,
			doubleHeaders = [],
			k = 0,
			m = 0,
			view = this.getView(),
			glen;
		for (; j < l; j++) {
			group = groups[j];
			groupName = group[0].parent;
			groupWidth = 0;
			for (k = 0, glen = group.length; k < glen; k++) {
				if (!group[k].hidden) {
					groupWidth += view._getColOuterWidth(m++);
				}
			}
			doubleHeaders.push(element('div', {
				'class': opt['classColHeader'],
				'title': groupName,
				'style': {
					width: (groupWidth - this._widthPlus()) + 'px'
				}
			}, groupName));
		}

		this._doubleHead[0].innerHTML = doubleHeaders.join("");
	}

	for (; i < len; i++) {
		if (!(colDef = colDefs[i]).hidden) {
			this._render(headers, colDef, i);
		}
	}
	this._head[0].innerHTML = headers.join("");

	/**
	ColumnHeader �� �������� �Ϸ�Ǿ��� �� Ʈ���ŵǴ� �̺�Ʈ �Դϴ�.
	@event {Event} onRenderHeadersComplete

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.triggerGridEvent("onRenderHeadersComplete", false, true);
};

prototype._onAfterRenderModules = function() {
	var opt = this._options;

	if (!this.getColMgr().hasGroups() && opt['reorderEnabled']) {
		this._initReorder();
	}
	
	this._initResizeHandles();
	
	this._resizeGuide = $(element('div', {
		'class': opt['classResizeGuide']
	})).appendTo(this.getView()._mask).hide();
	this._resizeGuide[0].style.top = "0px";
	this._resizeGuide[0].style.height = "0px";
};

prototype._render = function(header, colDef, i) {
	var opt = this._options,
		key = colDef['key'],
		name = (colDef['noName'] ? "" : colDef['name'] || key),
		widthPlus = this._widthPlus(),
		event = "onRenderHeader_" + key,
		args = [header];

	var classname = opt['classColHeader'];
	if (opt['reorderEnabled'] || colDef['sorter']) {
		classname += " " + opt['classInteractive'];
	}
	var attr = {
		'id': this.mid + "h" + key,
		'class': classname,
		colKey: key,
		'style': {
			width: (this.getView()._getColOuterWidth(i) - widthPlus) + "px"
		}
	};
	if (!colDef['noTitle']) {
		attr.title = colDef['title'] || name;
	}
	
	header.push(element('div', attr, null, Util.LEAVE_OPENED));

	/**
	ColumnHeader ������ �ÿ� �߻��Ǵ� �̺�Ʈ�� �÷� �̸� �տ� ���� ��� ���� �������ϱ� ���� Ʈ���� �˴ϴ�.
	@event {Event} onRenderHeader_COLKEY_prepend
	@param {Array.<string>} html - �÷� ��� ������ ��Ʈ������ ���� ���

	@author ����ȣ
	@since 1.0.0
	@version 1.1.7
	*/
	this.triggerGridEvent(event+"_prepend", args, true);

	header.push(name);

	/**
	ColumnHeader ������ �ÿ� �߻��Ǵ� �̺�Ʈ�� �÷� �̸� �ڿ� ���� ��� ���� �������ϱ� ���� Ʈ���� �˴ϴ�.
	@event {Event} onRenderHeader_COLKEY_append
	@param {Array.<string>} html - �÷� ��� ������ ��Ʈ������ ���� ���

	@author ����ȣ
	@since 1.0.0
	@version 1.1.7
	*/
	this.triggerGridEvent(event+"_append", args, true);

	if (colDef['sorter']) {
		header.push(element('span', {
			'class': opt['classSort']
		}));
	}

	/*
	header.push(element('span', {
		'class': 'jgrid-header-more'
	}));
	*/

	header.push("</div>");
};

ColumnHeader._disableSel = function(target) {
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
	if (!node) {
		return $([]);
	}

	return (this._map[key] = $(node));
};

// 0 --> remove all, 1 --> asc, 2 --> desc
prototype._updateIndicator = function(key, status) {
	var colHeader = this.get(key),
		opt = this._options,
		indicator = colHeader.find("." + opt['classSort']),
		classColHeaderSorted = opt['classColHeaderSorted'],
		classSortAsc = opt['classSortAsc'],
		classSortDesc = opt['classSortDesc'];
	if (status === 0) {
		colHeader.removeClass(classColHeaderSorted);
		indicator.removeClass(classSortAsc + " " + classSortDesc);
	}
	else {
		colHeader.addClass(classColHeaderSorted);
		if (status === 1) {
			indicator.addClass(classSortAsc).removeClass(classSortDesc);
		}
		else if (status === 2) {
			indicator.addClass(classSortDesc).removeClass(classSortAsc);
		}
	}
};

prototype._closest = function(obj) {
	return Util$.safe$(obj).closest("div." + this._options['classColHeader'], this._head);
};

prototype._getDef = function(header) {
	return this.getColMgr().getByKey(header.attr("colKey"));
};


prototype._sort = function(e, colHeader, colDef) {
	this.grid.log('Colheader clicked to sort. key=' + key, Grid.V_CLICK);//IF_DEBUG

	var key = colDef['key'],
		sorter = colDef['sorter'];

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
	this.triggerGridEvent("onBeforeColSort_"+key, false, true);
	this.triggerGridEvent("onBeforeColSort", false, true);

	sorter.desc = (sorter.desc === false) ? true : false;

	//this._setSortClass();
	this.getDataMgr().refresh({'sorter':sorter});

	// manually call this because IE cannot detect the scroll event
	this.getView()._scroll();
};

prototype._onChangeSorter = function(oldSorter, newSorter) {
	if (oldSorter === newSorter) {
		if (newSorter) {
			this._updateIndicator(newSorter.key, (newSorter.desc ? 2 : 1));
		}
		return;
	}
	if (oldSorter) {
		this._updateIndicator(oldSorter.key, 0);
	}
	if (newSorter) {
		this._updateIndicator(newSorter.key, (newSorter.desc ? 2 : 1));
	}
};

prototype._initReorder = function() {
	this.grid.log('initializing Colheader reorder functionality...', Grid.V_INIT);//IF_DEBUG

	var thisIns = this,
		opt = this._options,
		colMgr = this.getColMgr(),
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
			colMgr.sortByKey(keys);
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

	var colDef = this._getDef(colHeader),
		key = colDef['key'],
		args = [e, colHeader, colDef];

	this.grid.log('Colheader clicked. key=' + key, Grid.V_CLICK);//IF_DEBUG

	/**
	ColumnHeader �� click �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ� �̺�Ʈ �Դϴ�. �߻��� click �̺�Ʈ��
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
	if (this.getEventMgr().triggerInvalid("clickHeaderValid_"+key, args)) {
		return;
	}

	/**
	ColumnHeader �� click �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ� �̺�Ʈ �Դϴ�.
	@event {Event} clickHeader_COLKEY
	@param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	@param {jQuery} colHeader - �÷� ����� ���� jQuery ������Ʈ
	@param {Object} colDef - �÷� ���� ������Ʈ

	@author ����ȣ
	@since 1.0.0
	@version 1.1.7
	*/
	
	/**
	ColumnHeader �� click �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ� �̺�Ʈ �Դϴ�.
	@event {Event} clickHeader
	@param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	@param {jQuery} colHeader - �÷� ����� ���� jQuery ������Ʈ
	@param {Object} colDef - �÷� ���� ������Ʈ

	@author ����ȣ
	@since 1.0.0
	@version 1.1.7
	*/
	this.triggerGridEvent("clickHeader_"+key, args, true);
	this.triggerGridEvent("clickHeader", args, true);
};

prototype._mousedown = function(e) {
	var opt = this._options;
	if (Util.hasTagAndClass(e.target, "DIV", opt['classResizeHandle'])) {
		var key = this._resizeKey = e.target.getAttribute("key");

		this.grid.log('mousedown on ColumnHeader Resize Handle. key=' + key, Grid.V_MOUSEDOWN);//IF_DEBUG

		this._resizeInitWidth = this.get(key)[0].clientWidth;
		this._resizeInitColWidth = this.getColMgr().getByKey(key).width;
		this._resizeInitX = e.clientX;
		this._resizeHandleInitX = this._resizeMap[key][0].offsetLeft;

		this._resizeGuide[0].style.left = Math.floor(this._resizeHandleInitX + (opt['resizeHandleWidth'] - opt['resizeGuideWidth']) / 2 - opt['scrollerLeft']) + "px";
		this._resizeGuide[0].style.height = this.getView().getInnerHeight() + "px";
		this._resizeGuide.show();
		return;
	}
	
	var colHeader = this._closest(e.target);
	if (colHeader.length) {
		var colDef = this._getDef(colHeader),
			key = colDef['key'],
			args = [e, colHeader, colDef];

		this.grid.log('mousedown on ColumnHeader. key=' + key, Grid.V_MOUSEDOWN);//IF_DEBUG

		/**
		  ColumnHeader �� mousedown �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ� �̺�Ʈ �Դϴ�.
		  @event {Event} mousedownHeader
		  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
		  @param {jQuery} colHeader - �÷� ����� ���� jQuery ������Ʈ

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.triggerGridEvent("mousedownHeader", args, true);

		/**
		  ColumnHeader �� mousedown �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ� �̺�Ʈ �Դϴ�.
		  @event {Event} mousedownHeader_COLKEY
		  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
		  @param {jQuery} colHeader - �÷� ����� ���� jQuery ������Ʈ
		  @param {Object} colDef - �÷� ���� ������Ʈ

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.1.7
		  */
		this.triggerGridEvent("mousedownHeader_"+key, args, true);
	}
};

prototype._dragmove = function(e) {
	var key = this._resizeKey;
	if (key == null) {
		return;
	}
		
	var dx = this._getDx(e, this.getColMgr().getByKey(key));
	if (Math.abs(dx) < 1) {
		return;
	}

	this.grid.log('drag on ColumnHeader Resize Handle. key=' + key, Grid.V_MOUSEMOVE);//IF_DEBUG
	
	var opt = this._options;
	this.get(key)[0].style.width = this._resizeInitWidth + dx + "px";
	this._moveResizeHandles(this._resizeHandleInitX + dx - this._resizeMap[key][0].offsetLeft, this.getColMgr().getIdxByKey(key));
	this._resizeGuide[0].style.left = Math.floor(this._resizeHandleInitX + dx + (opt['resizeHandleWidth'] - opt['resizeGuideWidth']) / 2 - opt['scrollerLeft']) + "px";
	
	if (opt['syncResize']) {
		this.getView().setWidthByKey(key, this._resizeInitColWidth + dx);
	}
};

prototype._mouseup = function(e) {
	var key = this._resizeKey;
	if (key == null) {
		return;
	}

	this.grid.log('mouseup on ColumnHeader Resize Handle. key=' + key, Grid.V_MOUSEUP);//IF_DEBUG
	
	this._resizeGuide.hide();
	this._resizeGuide[0].style.height = "0px";
		
	var dx = this._getDx(e, this.getColMgr().getByKey(key));	
	if (Math.abs(dx) >= 1) {
		this.getView().setWidthByKey(key, this._resizeInitColWidth + dx);
	}
	
	delete this._resizeKey;
	delete this._resizeInitX;
	delete this._resizeHandleInitX;
	delete this._resizeInitWidth;
	delete this._resizeInitColWidth;
};

prototype._setWidthByKey = function(key, w, o) {
	this.grid.log('setting ColumnHeader width=' + w + '. key=' + key, Grid.V_RESIZE);//IF_DEBUG

	this.get(key)[0].style.width = w + this.getView()._colWidthPlus() - this._widthPlus() + "px";

	if (this._doubleHead) {
		var colmgr = this.getColMgr(),
			view = this.getView(),
			viewWidthPlus = view._colWidthPlus(),
			groupIdx = colmgr.getGroupIndexByKey(key),
			group = colmgr.getGroupByGroupIdx(groupIdx),
			i = 0,
			l = group.length,
			groupWidth = 0;

		for (; i < l; i++) {
			if (!group[i].hidden) {
				groupWidth += group[i].width + viewWidthPlus;
			}
		}

		this._doubleHead[0].childNodes[groupIdx].style.width = groupWidth - this._widthPlus() + 'px';
	}
	
	this._syncResizeHandles(this.getColMgr().getIdxByKey(key));

	// IE needs this hack to sync scrollLeft of canvas and that of headers
	this.getView()._scroll();
};

prototype._syncResizeHandles = function(i) {
	i = i || 0;
		
	var lefts = this.getView()._getColLefts(),
		colDefs = this.getColumns(),
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
	i = i || 0;
		
	var colDefs = this.getColumns(),
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
	this._resizeGuide[0].style.top = this.getView().getScrollTop() + "px";
};

prototype._initResizeHandles = function() {
	this.grid.log('initializing Colheader resize functionality...', Grid.V_INIT);//IF_DEBUG

	var colDefs = this.getColumns(),
		len = colDefs.length,
		view = this.getView(),
		vmid = view.mid,
		lefts = view._getColLefts(),
		opt = this._options,
		rmap = this._resizeMap,
		colDef,
		key,
		i = 0,
		offset = this._resizeHandleOffset = Math.floor(opt['scrollerLeft'] - opt['resizeHandleWidth'] / 2),
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

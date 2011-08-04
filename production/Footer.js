console && console.log && console.log('reading javascript source "Footer.js"...');//IF_DEBUG
goog.require('engine_extension');
goog.require('jx.util');
goog.require('jx.grid');
goog.require('jx.grid.BaseModule');
goog.require('jx.grid.Grid');
goog.require('jx.grid.ColumnManager');
goog.require('jx.data.DataManager');
goog.provide('jx.grid.Footer');
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
 goog.exportSymbol('jx.grid.Footer', Footer);
/**
Footer ���. �÷� ������� ����ϴ� ����Դϴ�.
Footer Ŭ����. �÷� ���� ���� ������ �ο� ���İ� �÷� �¿� ��ġ ���� �� �÷�
���� ��ɵ��� �����մϴ�.
@class {Footer} JGM.Footer
@author ����ȣ
@since 1.0.0
@version 1.1.3
*/
/**
Footer ����Ʈ���� �Դϴ�.
@constructor {Footer} Footer
@param {Object} args - Footer ��� �Ķ���� ������Ʈ
@... {jQuery} args.container - Footer �� ���� �����̳� ������Ʈ
@... {jx.grid.Grid} args.grid - Footer �� �����ϴ� {@link jx.grid.Grid} �ν��Ͻ�
@... {Object} args.options - Footer �ɼ� ������Ʈ
@returns {Footer} Footer ��� �ν��Ͻ��� �����մϴ�.
@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
function Footer(args) {
	/**
	{@link JGM} �� �Ҵ����ִ� Footer ��� ���� ���̵��Դϴ�. �б� ����.
	@var {string} mid
	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.mid = args.mid;
	this._ctnr = args['container'];
	this._foot;
	/**
	Footer �� �����ϴ� {@link jx.grid.Grid} �ν��Ͻ�.
	@var {jx.grid.Grid} grid
	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid = args.grid;
	
	/**
	�׸��� Ǫ�͸� �����ϴ� {@link JGM.Footer Footer} �ν��Ͻ� �Դϴ�.
	@var {JGM.Footer} jx.grid.Grid.footer
	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid['footer'] = this;
	/**
	Footer ����� �⺻ �ɼ� ������ �����մϴ�.
	@type {Object} options
	@private
	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	var options = {
		/**
		Footer �� ���� ���������� ����Ǵ� CSS Ŭ���� �Դϴ�.<br>�⺻��:<code>"footer-cell"</code>
		@type {string=} JGM.Footer.options.classCell
		@private
		@author ����ȣ
		@since 1.1.3
		@version 1.1.3
		*/
		'classCell': "footer-cell",
		
		/**
		Footer �� ����Դϴ�. <br>�⺻��:<code>"#F1F5FB"</code>
		@type {string=} JGM.Footer.options.background
		@private
		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'background': "#F1F5FB",
		/**
		Footer �� border �Դϴ�. <br>�⺻��:<code>"0px solid #CCD9EA"</code>
		@type {string=} JGM.Footer.options.border
		@private
		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'border':		"0px solid #CCD9EA",
		/**
		Footer �� �⺻ �۾� �� �Դϴ�. <br>�⺻��:<code>"#000"</code>
		@type {string=} JGM.Footer.options.color
		@private
		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'color': "#000",
		/**
		Footer �� �⺻ ��Ʈ ũ�� �Դϴ�. <br>�⺻��:<code>"13px"</code>
		@type {string=} JGM.Footer.options.fontSize
		@private
		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'fontSize': "13px",
		/**
		Footer �� �⺻ ��Ʈ ���� �Դϴ�. <br>�⺻��:<code>"normal"</code>
		@type {string=} JGM.Footer.options.fontWeight
		@private
		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'fontWeight': "normal",
		/**
		Footer �� ���� ���� �ȼ� �Դϴ�. <br>�⺻��:<code>25</code>
		@type {number=} JGM.Footer.options.cellHeight
		@private
		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'cellHeight': 25,
		/**
		Footer �� ���� right-padding �ȼ� �Դϴ�. <br>�⺻��:<code>30</code>
		@type {number=} JGM.Footer.options.cellPadding
		@private
		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'cellPadding': 40,
		
		/**
		Footer �� �� �Ǽ��� �����ִ� ���� ���ø� �Դϴ�.<br>�⺻��:<code>"���� <span name='shownCount'></span> �� / �� <span name='totalCount'></span> ��"</code>
		@type {string=} JGM.Footer.options.countTemplate
		@private
		@author ����ȣ
		@since 1.1.3
		@version 1.1.3
		*/
		'countTemplate': "���� <span name='shownCount'></span> �� / �� <span name='totalCount'></span> ��",
		/**
		Footer �� title �� �۾� �� �Դϴ�. <br>�⺻��:<code>"#5A6779"</code>
		@type {string=} JGM.Footer.options.titleColor
		@private
		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'titleColor': "#5A6779",
		/**
		Footer �� title �� ��Ʈ ũ�� �Դϴ�. <br>�⺻��:<code>"12px"</code>
		@type {string=} JGM.Footer.options.titleFontSize
		@private
		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'titleFontSize': "12px",
		/**
		Footer �� title �� ��Ʈ ���� �Դϴ�. <br>�⺻��:<code>"normal"</code>
		@type {string=} JGM.Footer.options.titleFontWeight
		@private
		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'titleFontWeight': "normal",
		/**
		Footer �� content �� �۾� �� �Դϴ�. <br>�⺻��:<code>"#1E395B"</code>
		@type {string=} JGM.Footer.options.contentColor
		@private
		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'contentColor': "#1E395B",
		/**
		Footer �� content �� ��Ʈ ũ�� �Դϴ�. <br>�⺻��:<code>"12px"</code>
		@type {string=} JGM.Footer.options.contentFontSize
		@private
		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'contentFontSize': "12px",
		/**
		Footer �� content �� ��Ʈ ���� �Դϴ�. <br>�⺻��:<code>"normal"</code>
		@type {string=} JGM.Footer.options.contentFontWeight
		@private
		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'contentFontWeight': "normal",
		/**
		Footer �����̳ʿ� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-footer"</code>
		@type {string=} JGM.Footer.options.classFooter
		@private
		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classFooter': "jgrid-footer",
		/**
		Footer �� title �� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"footer-title"</code>
		@type {string=} JGM.Footer.options.classTitle
		@private
		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classTitle': "footer-title",
		/**
		Footer �� content �� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"footer-content"</code>
		@type {string=} JGM.Footer.options.classContent
		@private
		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classContent': "footer-content",
		/**
		Footer �����̳ʿ� ����Ǵ� CSS style �Դϴ�.<br>
		������ ��: �� �ɼǿ� �Էµ� style �� ����Ǿ����� DOM �� ũ�Ⱑ ���ϸ� �׸����� �������� ũ�� ��꿡 ������ ����ϴ�.
		��, ũ�⿡ ������ ���� style ������ �Ҷ��� ����ϼ���.
		<br>�⺻��:<code>""</code>
		@type {string=} JGM.Footer.options.style
		@private
		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'style': "",
		/**
		Footer ���� ���������� ����Ǵ� CSS style �Դϴ�.<br>
		������ ��: �� �ɼǿ� �Էµ� style �� ����Ǿ����� DOM �� ũ�Ⱑ ���ϸ� �׸����� �������� ũ�� ��꿡 ������ ����ϴ�.
		��, ũ�⿡ ������ ���� style ������ �Ҷ��� ����ϼ���.
		<br>�⺻��:<code>""</code>
		@type {string=} JGM.Footer.options.cellStyle
		@private
		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'cellStyle': "",
		/**
		Footer ���� Ÿ��Ʋ�� ���������� ����Ǵ� CSS style �Դϴ�.<br>
		������ ��: �� �ɼǿ� �Էµ� style �� ����Ǿ����� DOM �� ũ�Ⱑ ���ϸ� �׸����� �������� ũ�� ��꿡 ������ ����ϴ�.
		��, ũ�⿡ ������ ���� style ������ �Ҷ��� ����ϼ���.
		<br>�⺻��:<code>""</code>
		@type {string=} JGM.Footer.options.titleStyle
		@private
		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'titleStyle': "",
		/**
		Footer ���� ����Ʈ�� ���������� ����Ǵ� CSS style �Դϴ�.<br>
		������ ��: �� �ɼǿ� �Էµ� style �� ����Ǿ����� DOM �� ũ�Ⱑ ���ϸ� �׸����� �������� ũ�� ��꿡 ������ ����ϴ�.
		��, ũ�⿡ ������ ���� style ������ �Ҷ��� ����ϼ���.
		<br>�⺻��:<code>""</code>
		@type {string=} JGM.Footer.options.contentStyle
		@private
		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'contentStyle': ""
	};
	this._options = JGM._extend(options, args['options']);
	this._sumMap = {};
	
	this.__init();
}
Footer.getInstance = function(args) {
	return new Footer(args);
};
var prototype = Footer.prototype;
prototype.__init = function() {
	this._foot =
		$("<div class='" + this._options['classFooter'] + "'>")
		.appendTo(this._ctnr);
		
	this.getNextCell().html(this._options['countTemplate']);
	this._updateTotalCount();
	this._updateShownCount();
	
	this._initSumCells();
   this.bindEvents();
};
prototype.bindEvents = function() {
	this.grid['event'].bind({
		'onCreateCss': this._onCreateCss,
		'onDestroy': this._destroy,
		'onDataChange': [this._updateTotalCount, this._updateSums],
		'onAfterRefresh': this._updateShownCount
	}, this);
};
prototype._destroy = function() {
   var i,
      map = this._sumMap;
	for (i in map) {
      if (map.hasOwnProperty(i)) {
         map[i].remove();
      }
   }
	JGM._destroy(this, {
		name: "Footer",
		path: "footer",
		"$": "_foot",
		property: "_ctnr",
		map: "_sumMap _options"
	});
};
prototype._onCreateCss = function() {
	var opt = this._options,
      footerSel = "#" + this.grid['mid'] + " ." + opt['classFooter'],
      rules = [];
	rules.push(footerSel + "{float:left;cursor:default;width:100%;" + JGM._CONST._cssUnselectable + "background:" + opt['background'] +";border-top:" + opt['border'] + ";border-collapse:collapse;color:" + opt['color'] + ";font-size:" + opt['fontSize'] + ";font-weight:" + opt['fontWeight'] + ";padding-left:8px;" + opt['style'] + "}");
	rules.push(footerSel + " ." + opt['classCell'] + "{float:left;white-space:nowrap;line-height:" + opt['cellHeight'] + "px;padding-right:" + opt['cellPadding'] + "px;" + opt['cellStyle'] + "}");
	rules.push(footerSel + " ." + opt['classTitle'] + "{text-align:right;color:" + opt['titleColor'] + ";font-size:" + opt['titleFontSize'] + ";font-weight:" + opt['titleFontWeight'] + ";" + opt['titleStyle'] + "}");
	rules.push(footerSel + " ." + opt['classContent'] + "{color:" + opt['contentColor'] + ";font-size:" + opt['contentFontSize'] + ";font-weight:" + opt['contentFontWeight'] + ";" + opt['contentStyle'] + "}");
	return rules.join("");
};
prototype._updateTotalCount = function() {
	this._foot.find("[name=totalCount]")[0].innerHTML = this.grid['dataMgr'].getReal().length;
};
prototype._updateShownCount = function() {
	this._foot.find("[name=shownCount]")[0].innerHTML = this.grid['dataMgr'].filterReal(this.grid['dataMgr'].datalist).length;
};
prototype._initSumCells = function() {
	var rows = this.grid['dataMgr'].getReal(),
      colDefs = this.grid['colDefMgr'].get(),
      clen = colDefs.length,
      colDef,
      renderer,
      lower,
      key,
      name,
      sum,
      sumfn = Footer._calSum,
      map = this._sumMap,
      cell,
      node,
      i = 0;
	for (; i < clen; i++) {
		colDef = colDefs[i];
		renderer = colDef['sumRenderer'];
		if (Util.isNotNull(renderer)) {
			key = colDef['key'];
         name = colDef['name'];
			sum = sumfn(rows, key);
			cell = map[key] = this.getNextCell();
         node = cell[0];
			
			if (Util.isFunction(renderer)) {
				node.innerHTML = renderer(name, sum);
         }
			else if (Util.isString(renderer)) {
            lower = renderer.toLowerCase();
				if (lower === "krw" || renderer === "\\") {
					node.innerHTML = this._sumRenderer(name, Util.formatNumber(sum));				
            }
				else if (lower === "usd" || renderer === "$") {
					node.innerHTML = this._sumRenderer(name, Util.formatNumber(sum, 2, "$ "));
            }
			}
			else {
				node.innerHTML = this._sumRenderer(name, sum);
         }
		}
	}
};
prototype._updateSums = function() {
	var rows = this.grid['dataMgr'].getReal(),
      key,
      map = this._sumMap,
      cmgr = this.grid['colDefMgr'],
      colDef,
      renderer,
      lower,
      name,
      sum,
      sumfn = Footer._calSum,
      cell,
      node,
      content = this._options['classContent'];
	for (key in map) {
      if (map.hasOwnProperty(key)) {
         colDef = cmgr.getByKey(key);
         name = colDef['name'];
         renderer = colDef['sumRenderer'];
         sum = sumfn(rows, key);
         cell = map[key];
         node = cell[0];
         if (Util.isFunction(renderer)) {
            node.innerHTML = renderer(colDef['name'], sum);
         }
         else if (Util.isString(renderer)) {
            lower = renderer.toLowerCase();
            if (lower === "krw" || renderer === "\\") {
               cell.find("span." + content)[0].innerHTML = Util.formatNumber(sum);				
            }
            else if (lower === "usd" || renderer === "$") {
               cell.find("span." + content)[0].innerHTML = Util.formatNumber(sum, 2, "$ ");
            }
         }	
         else {
            cell.find("span." + content)[0].innerHTML = sum;
         }
      }
	}
};
/**
{@link JGM.Footer Footer} �� ����ִ� �� �ϳ��� �����մϴ�. ���� ����ִ� ����
���� ��쿡�� ���ο� �ο츦 �߰��Ͽ� �� �ο��� ù ���� �����մϴ�.
@function {jQuery} getNextCell
@returns {jQuery} {@link JGM.Footer Footer} �� ����ִ� ��
@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.getNextCell = function() {
	return $("<div class='" + this._options['classCell'] + "'/>").appendTo(this._foot);
};
prototype._sumRenderer = function(name, sum) {
	return "<span class='" + this._options['classTitle'] + "'>" + name + " �հ�: </span><span class='" + this._options['classContent'] + "'>" + sum + "</span>";
};
Footer._calSum = function(datalist, key) {
	var sum = 0,
      tmp,
      len = datalist.length,
      i = 0;
	for (; i < len; i++) {
		if (typeof (tmp = datalist[i][key]) === "string") {
			tmp = tmp.toFloat();
      }
		sum += isNaN(tmp) ? 0 : tmp;
	}
	return sum;
};
}());

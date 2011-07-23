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
 JGM._add("Footer", Footer);

/**
Footer ���. �÷� ������� ����ϴ� ����Դϴ�.
@module Footer

@requires JGM
@requires JGM.Grid
@requires JGM.ColDefManager
@requires JGM.DataManager
@requires JGM.EventManager
 */

/**
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
@... {JGM.Grid} args.grid - Footer �� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�
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

	this.__foot_a__;

	/**
	Footer �� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�.

	@var {JGM.Grid} grid

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid = args.grid;
	
	/**
	�׸��� Ǫ�͸� �����ϴ� {@link JGM.Footer Footer} �ν��Ͻ� �Դϴ�.

	@var {JGM.Footer} JGM.Grid.footer

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid.footer = this;

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
		'__classCell_a__': "footer-cell",
		
		/**
		Footer �� ����Դϴ�. <br>�⺻��:<code>"#F1F5FB"</code>

		@type {string=} JGM.Footer.options.background
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'__background_b__': "#F1F5FB",

		/**
		Footer �� border �Դϴ�. <br>�⺻��:<code>"0px solid #CCD9EA"</code>

		@type {string=} JGM.Footer.options.border
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'__border_c__':		"0px solid #CCD9EA",

		/**
		Footer �� �⺻ �۾� �� �Դϴ�. <br>�⺻��:<code>"#000"</code>

		@type {string=} JGM.Footer.options.color
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'__color_d__': "#000",

		/**
		Footer �� �⺻ ��Ʈ ũ�� �Դϴ�. <br>�⺻��:<code>"13px"</code>

		@type {string=} JGM.Footer.options.fontSize
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'__fontSize_e__': "13px",

		/**
		Footer �� �⺻ ��Ʈ ���� �Դϴ�. <br>�⺻��:<code>"normal"</code>

		@type {string=} JGM.Footer.options.fontWeight
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'__fontWeight_f__': "normal",

		/**
		Footer �� ���� ���� �ȼ� �Դϴ�. <br>�⺻��:<code>25</code>

		@type {number=} JGM.Footer.options.cellHeight
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'__cellHeight_g__': 25,

		/**
		Footer �� ���� right-padding �ȼ� �Դϴ�. <br>�⺻��:<code>30</code>

		@type {number=} JGM.Footer.options.cellPadding
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'__cellPadding_h__': 40,
		
		/**
		Footer �� �� �Ǽ��� �����ִ� ���� ���ø� �Դϴ�.<br>�⺻��:<code>"���� <span name='shownCount'></span> �� / �� <span name='totalCount'></span> ��"</code>

		@type {string=} JGM.Footer.options.countTemplate
		@private

		@author ����ȣ
		@since 1.1.3
		@version 1.1.3
		*/
		'__countTemplate_i__': "���� <span name='shownCount'></span> �� / �� <span name='totalCount'></span> ��",

		/**
		Footer �� title �� �۾� �� �Դϴ�. <br>�⺻��:<code>"#5A6779"</code>

		@type {string=} JGM.Footer.options.titleColor
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'__titleColor_j__': "#5A6779",

		/**
		Footer �� title �� ��Ʈ ũ�� �Դϴ�. <br>�⺻��:<code>"12px"</code>

		@type {string=} JGM.Footer.options.titleFontSize
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'__titleFontSize_k__': "12px",

		/**
		Footer �� title �� ��Ʈ ���� �Դϴ�. <br>�⺻��:<code>"normal"</code>

		@type {string=} JGM.Footer.options.titleFontWeight
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'__titleFontWeight_l__': "normal",

		/**
		Footer �� content �� �۾� �� �Դϴ�. <br>�⺻��:<code>"#1E395B"</code>

		@type {string=} JGM.Footer.options.contentColor
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'__contentColor_n__': "#1E395B",

		/**
		Footer �� content �� ��Ʈ ũ�� �Դϴ�. <br>�⺻��:<code>"12px"</code>

		@type {string=} JGM.Footer.options.contentFontSize
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'__contentFontSize_o__': "12px",

		/**
		Footer �� content �� ��Ʈ ���� �Դϴ�. <br>�⺻��:<code>"normal"</code>

		@type {string=} JGM.Footer.options.contentFontWeight
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'__contentFontWeight_p__': "normal",

		/**
		Footer �����̳ʿ� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-footer"</code>

		@type {string=} JGM.Footer.options.classFooter
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'__classFooter_q__': "jgrid-footer",

		/**
		Footer �� title �� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"footer-title"</code>

		@type {string=} JGM.Footer.options.classTitle
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'__classTitle_r__': "footer-title",

		/**
		Footer �� content �� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"footer-content"</code>

		@type {string=} JGM.Footer.options.classContent
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'__classContent_s__': "footer-content",

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
		'__style_u__': "",

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
		'__cellStyle_v__': "",

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
		'__titleStyle_w__': "",

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
		'__contentStyle_x__': ""
	};

	this._options = JGM.__extend_e__(options, args['options'], {
		classCell:"__classCell_a__",
		background:"__background_b__",
		border:"__border_c__",
		color:"__color_d__",
		fontSize:"__fontSize_e__",
		fontWeight:"__fontWeight_f__",
		cellHeight:"__cellHeight_g__",
		cellPadding:"__cellPadding_h__",
		countTemplate:"__countTemplate_i__",
		titleColor:"__titleColor_j__",
		titleFontSize:"__titleFontSize_k__",
		titleFontWeight:"__titleFontWeight_l__",
		contentColor:"__contentColor_n__",
		contentFontSize:"__contentFontSize_o__",
		contentFontWeight:"__contentFontWeight_p__",
		classFooter:"__classFooter_q__",
		classTitle:"__classTitle_r__",
		classContent:"__classContent_s__",
		style:"__style_u__",
		cellStyle:"__cellStyle_v__",
		titleStyle:"__titleStyle_w__",
		contentStyle:"__contentStyle_x__"
	});

	this.__sumMap_g__ = {};
	
	this.__init();
}

Footer.getInstance = function(args) {
	return new Footer(args);
};

var prototype = Footer.prototype;

prototype.__init = function() {
	this.__foot_a__ =
		$("<div class='" + this._options['__classFooter_q__'] + "'>")
		.appendTo(this._ctnr);
		
	this.getNextCell().html(this._options['__countTemplate_i__']);
	this.__updateTotalCount_d__();
	this.__updateShownCount_c__();
	
	this.__initSumCells_f__();
   this.bindEvents();
};

prototype.bindEvents = function() {
	this.grid.event.bind({
		'onCreateCss': this.__onCreateCss_V__,
		'onDestroy': this.__destroy_aA__,
		'onDataChange': [this.__updateTotalCount_d__, this.__updateSums_e__],
		'onAfterRefresh': this.__updateShownCount_c__
	}, this);
};


prototype.__destroy_aA__ = function() {
   var i,
      map = this.__sumMap_g__;
	for (i in map) {
      if (map.hasOwnProperty(i)) {
         map[i].remove();
      }
   }

	JGM._destroy(this, {
		name: "Footer",
		path: "footer",
		"$": "__foot_a__",
		property: "_ctnr",
		map: "__sumMap_g__ _options"
	});
};

prototype.__onCreateCss_V__ = function() {
	var o = this._options,
      footerSel = "#" + this.grid.mid + " ." + o.__classFooter_q__,
      rules = [];

	rules.push(footerSel + "{float:left;cursor:default;width:100%;" + JGM.__CONST_g__.__cssUnselectable_a__ + "background:" + o.__background_b__ +";border-top:" + o.__border_c__ + ";border-collapse:collapse;color:" + o.__color_d__ + ";font-size:" + o.__fontSize_e__ + ";font-weight:" + o.__fontWeight_f__ + ";padding-left:8px;" + o.__style_u__ + "}");
	rules.push(footerSel + " ." + o.__classCell_a__ + "{float:left;white-space:nowrap;line-height:" + o.__cellHeight_g__ + "px;padding-right:" + o.__cellPadding_h__ + "px;" + o.__cellStyle_v__ + "}");
	rules.push(footerSel + " ." + o.__classTitle_r__ + "{text-align:right;color:" + o.__titleColor_j__ + ";font-size:" + o.__titleFontSize_k__ + ";font-weight:" + o.__titleFontWeight_l__ + ";" + o.__titleStyle_w__ + "}");
	rules.push(footerSel + " ." + o.__classContent_s__ + "{color:" + o.__contentColor_n__ + ";font-size:" + o.__contentFontSize_o__ + ";font-weight:" + o.__contentFontWeight_p__ + ";" + o.__contentStyle_x__ + "}");

	return rules.join("");
};

prototype.__updateTotalCount_d__ = function() {
	this.__foot_a__.find("[name=totalCount]")[0].innerHTML = this.grid.dataMgr.getReal().length;
};

prototype.__updateShownCount_c__ = function() {
	this.__foot_a__.find("[name=shownCount]")[0].innerHTML = this.grid.dataMgr.filterReal(this.grid.dataMgr.datalist).length;
};

prototype.__initSumCells_f__ = function() {
	var rows = this.grid.dataMgr.getReal(),
      colDefs = this.grid.colDefMgr.get(),
      clen = colDefs.length,
      colDef,
      renderer,
      lower,
      key,
      name,
      sum,
      sumfn = Footer.__calSum_a__,
      map = this.__sumMap_g__,
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
					node.innerHTML = this.__sumRenderer_h__(name, Util.formatNumber(sum));				
            }
				else if (lower === "usd" || renderer === "$") {
					node.innerHTML = this.__sumRenderer_h__(name, Util.formatNumber(sum, 2, "$ "));
            }
			}
			else {
				node.innerHTML = this.__sumRenderer_h__(name, sum);
         }
		}
	}
};

prototype.__updateSums_e__ = function() {
	var rows = this.grid.dataMgr.getReal(),
      key,
      map = this.__sumMap_g__,
      cmgr = this.grid.colDefMgr,
      colDef,
      renderer,
      lower,
      name,
      sum,
      sumfn = Footer.__calSum_a__,
      cell,
      node,
      content = this._options['__classContent_s__'];
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
	return $("<div class='" + this._options['__classCell_a__'] + "'/>").appendTo(this.__foot_a__);
};

prototype.__sumRenderer_h__ = function(name, sum) {
	return "<span class='" + this._options['__classTitle_r__'] + "'>" + name + " �հ�: </span><span class='" + this._options['__classContent_s__'] + "'>" + sum + "</span>";
};

Footer.__calSum_a__ = function(datalist, key) {
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

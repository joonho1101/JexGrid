/*!
 * AUTHOR
 *   The JexGrid was written and is maintained by:
 *       Joon Ho Cho <joonho1101@gmail.com>
 * COPYRIGHT
 *   Copyright (c) 2010-2011, WebCash Inc. All rights reserved.
 */

/**
  <b>JexGrid</b> �� ���̳��� �������� ���� ������ �������� ������ ���� ���� ���Ҹ�
  �ּ�ȭ�ϰ� �����ο� �̺�Ʈ�� ��� �÷������� ���� ������ Ȯ�强�� ���� jQuery
  ����� �ڹٽ�ũ��Ʈ �׸��� ���̺귯�� �Դϴ�.

  @project JexGrid JavaScript Library
  @timestamp
  @description JexGrid JavaScript Library

  @author ����ȣ
  @since 2011-Jan-05
  @version 1.3.2
  */

/**
  JGM
  @scope JGM
  */

(function() {

 goog.require('JGM.core.BaseModule');

 goog.provide('JGM.core.Grid');

 goog.exportSymbol('JGM.core.Grid', Grid);


 /**
   Grid �ھ� ���. ��� Grid ����� ����Ǵ� ����Դϴ�.
   @module Grid
   @requires JGM
   */

 /**
   Grid �ھ� Ŭ����. Grid �� ��� ���� ������ �� Ŭ������ ����Ǿ� ����
   Ŀ�´�����Ʈ �մϴ�.

   @class {Grid} JGM.Grid

   @author ����ȣ
   @since 1.0.0
   @version 1.0.0
   */

 /**
   Grid ����Ʈ���� �Դϴ�. ������ �Ķ������ args �� �ڹٽ�ũ��Ʈ ������Ʈ�̸�
   ������ ���� ������ �����ϴ�.<br>
   args = {<br>
container: DOM Element �Ǵ� DOM Element �� ���� jQuery ������Ʈ,<br>
datalist: ������ ���,<br>
colDefs: �÷� ���� ���,<br>
options: Grid �� �ɼǰ� ��� ���� �ɼ��� ������ �ɼ� ������Ʈ<br>
};<br>

@constructor {Grid} Grid
@param {Object} args - Grid ��� �Ķ���� ������Ʈ
@... {(DOMElement | jQuery)} args.container - Grid �� ���� �����̳� ������Ʈ
@... {Array.<Object>} args.datalist - ������ ���
@... {Array.<Object>} args.colDefs - �÷� ���� ���
@... {Object} args.options - Grid �ɼ� ������Ʈ
@returns {Grid} Grid ��� �ν��Ͻ��� �����մϴ�.

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
function Grid(args) {
	goog.base(this, args);
}
/**
  {@link JGM} �� �Ҵ����ִ� Grid ��� ���� ���̵��Դϴ�. �������� �׸��尡 ����
  �������� ������ ��� ���θ� �����ϱ� ���� ���Դϴ�. �б� ����.

  @var {string} mid

  @author ����ȣ
  @since 1.0.0
  @version 1.0.0
  */

goog.inherits(Grid, JGM.core.BaseModule);

Grid.getInstance = function(args) {
	return new Grid(args);
};

var prototype = Grid.prototype;

prototype._defaultOptions = function() {
	return {		
		/**
		  �׸��� �����̳ʿ� ����Ǵ� CSS Ŭ���� �Դϴ�.<br>�⺻��:<code>"jgrid"</code>

		  @type {string=} JGM.Grid.options.classGrid
		  @private

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
classGrid: "jgrid",

			   /**
				 �����̳ʿ� ����Ǵ� CSS border ��Ÿ�� �Դϴ�. <br>�⺻��:<code>"1px solid #868686"</code>

				 @type {string=} JGM.Grid.options.border
				 @private

				 @author ����ȣ
				 @since 1.0.0
				 @version 1.0.0
				 */
			   border: "1px solid #868686",

			   /**
				 �����̳ʿ� ����Ǵ� CSS width �ȼ��� �Դϴ�. �� �ɼ� ���� �Էµ��� ���� ��� <code>width:100%</code> �� �����ϴ� �Ͱ� ���� ȿ���� �����ϴ�.<br>�⺻��:<code>undefined</code>

				 @type {number=} JGM.Grid.options.width
				 @private

				 @author ����ȣ
				 @since 1.0.0
				 @version 1.0.0
				 */
			   width: undefined,

			   /**
				 �����̳ʿ� ����Ǵ� CSS font ��Ÿ�� �Դϴ�. <br>�⺻��:<code>"15px Arial,Helvetica,sans-serif"</code>

				 @type {string=} JGM.Grid.options.font
				 @private

				 @author ����ȣ
				 @since 1.0.0
				 @version 1.0.0
				 */
			   font: "15px Arial,Helvetica,sans-serif",

			   /**
				 �׸��� �����̳ʿ� ����� CSS Style �Դϴ�.<br>
				 ������ ��: �� �ɼǿ� �Էµ� style �� ����Ǿ����� DOM �� ũ�Ⱑ ���ϸ� �׸����� �������� ũ�� ��꿡 ������ ����ϴ�.
				 ��, ũ�⿡ ������ ���� style ������ �Ҷ��� ����ϼ���.
				 <br>�⺻��:<code>""</code>

				 @type {string=} JGM.Grid.options.style
				 @private

				 @author ����ȣ
				 @since 1.0.0
				 @version 1.0.0
				 */
			   style: "",

			   /**
				 �����̳ʿ� ����Ǵ� border �� ���̵忡�� ������� �����Դϴ�. <br>�⺻��:<code>true</code>

				 @type {boolean=} JGM.Grid.options.borderSide
				 @private

				 @author ����ȣ
				 @since 1.0.0
				 @version 1.0.0
				 */
			   borderSide: true,

			   /**
				 �׸��忡�� ���Ǵ� �̹������� �ִ� ������ url �Դϴ�.<br>�⺻��:<code>"../images/"</code>

				 @type {string=} JGM.Grid.options.imageUrl
				 @private

				 @author ����ȣ
				 @since 1.1.3
				 @version 1.1.3
				 */
			   imageUrl: "../images/",

			   /**
				 �׸��� ���� ����� �Լ� �Ǵ� �����͸� �׸��忡�� ���� ������ �� �ֵ���
				 ��ũ�� ����ϴ�. ������ ��ũ�� ����� �Լ��� �ƴ� ���� �Լ��� ��ũ�˴ϴ�. <br>
				 { data: null, getData: "dataMgr.all" } <br>���� ���� �Է��� ���, �⺻ ��ũ�� grid.data ��ũ�� �����ϰ�
				 grid.getData -> grid.dataMgr.all ��ũ�� �߰��մϴ�. <br>�⺻��:<code>{
				 data: "dataMgr.all",
				 datalen: "dataMgr.all.length",
				 shown: "dataMgr.datalist",
				 set: "dataMgr.set",
				 add: "dataMgr.add",
				 addList: "dataMgr.addList",
				 update: "dataMgr.update",
				 updateList: "dataMgr.updateList",
				 remove: "dataMgr.remove",
				 removeList: "dataMgr.removeList",
				 undo: "dataMgr.undo",
				 redo: "dataMgr.redo",
				 addFilter: "dataMgr.addFilter",
				 removeFilter: "dataMgr.removeFilter",
				 check: "collapser.checkMgr.checkList checkMgr.checkList",
				 checked: "collapser.checkMgr.getCheckList checkMgr.getCheckList",
				 register: "event.register",
				 trigger: "event.trigger",
				 bind: "event.bind",
				 unregister: "event.unregister",
				 unbind: "event.unregister",
				 collen: "colDefMgr.length"
				 }</code>

				 @type {Object=} JGM.Grid.options.links
				 @private

				 @author ����ȣ
				 @since 1.1.6
				 @version 1.1.6
				 */
			   links: {
data: "dataMgr.all",
		  datalen: "dataMgr.all.length",
		  shown: "dataMgr.datalist",
		  set: "dataMgr.set",
		  add: "dataMgr.add",
		  addList: "dataMgr.addList",
		  update: "dataMgr.update",
		  updateByKey: "dataMgr.updateByKey",
		  updateList: "dataMgr.updateList",
		  remove: "dataMgr.remove",
		  removeList: "dataMgr.removeList",
		  select: "dataMgr.executeSelect",
		  undo: "dataMgr.undo",
		  redo: "dataMgr.redo",
		  addFilter: "dataMgr.addFilter",
		  removeFilter: "dataMgr.removeFilter",
		  check: "collapser.checkMgr.checkList checkMgr.checkList",
		  checked: "collapser.checkMgr.getCheckList checkMgr.getCheckList",
		  removeChecked: "collapser.checkMgr.removeChecked checkMgr.removeChecked",
		  register: "event.register",
		  trigger: "event.trigger",
		  bind: "event.bind",
		  unregister: "event.unregister",
		  unbind: "event.unregister",
		  collen: "colDefMgr.length"
			   },

			   /**
				 true �� ���, �׸��� �����̳��� ����� ��� �÷��� ���̵��� �ڵ� �����˴ϴ�. <br>�⺻��:<code>false</code>

				 @type {boolean=} JGM.Grid.options.autoWidth
				 @private

				 @author ����ȣ
				 @since 1.1.7
				 @version 1.1.7
				 */
autoWidth: false,

		   showMessage: false

			   /**
				 ���� ��� �鿡�� ������ �ɼ��� �����մϴ�. ���� ���
				 {@link JGM.ViewportManager ViewportManager} �� �ɼ��� �����ϰ��� �� ���
				 ������ ���� �����ϸ� �˴ϴ�.
				 <code>ViewportManager:{classCell:"jgrid-new-cell-class"</code>
				 <br>�⺻��:<code>undefined</code><br>

				 @type {string=} JGM.Grid.options.MODULE_CLASS_NAME
				 @private

				 @author ����ȣ
				 @since 1.0.0
				 @version 1.0.0
				 */
	};
	}

	prototype._init = function(args) {
		this._ctnr = args.container;

		/**
		  Grid ����� �⺻ �ɼ� ������ �����մϴ�.

		  @type {Object} options
		  @private

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.name = this._options.name;

		this._vars = {
drag: false,
	  scrollbarDim: undefined,
	  lastW: undefined,
	  lastH: undefined
		};

		this._ctnr = $("<div id='" + this.mid + "' class='" + this._options.classGrid + "' " + (Util.isNull(this._options.width) ? "" : "style='width:" + this._options.width + "px' ") + "tabIndex='0'>").appendTo(Util$.safe$(this._ctnr));

		this._vars.scrollbarDim = Util$.calScrollbarDims(this._ctnr);

		this.event = JGM.create("EventManager", {grid:this, options:this._options.EventManager});
		delete this._options.EventManager;

		this.colDefMgr = JGM.create("ColDefManager", {grid:this, colDefs:args.colDefs, options:this._options.ColDefManager});
		delete this._options.ColDefManager;

		this.dataMgr = JGM.create("DataManager", {grid:this, datalist:args.datalist, options:this._options.DataManager});
		delete this._options.DataManager;

		if (this._options.CheckManager) {
			this.checkMgr = JGM.create("CheckManager", {grid:this, options:this._options.CheckManager});
			delete this._options.CheckManager;
		}

		var i = 10,
			colDefs = this.colDefMgr.getAll(),
			len = colDefs.length;
		for (; i < len; i++) {
			colDef = colDefs[i];
			if (colDef.CheckManager) {
				colDef.CheckManager.colDef = colDef;
				colDef.checkMgr = JGM.create("CheckManager", {grid:this, options:colDef.CheckManager});
			}
		}

		if (this._options.Collapser) {
			this.collapser = JGM.create("Collapser", {grid:this, options:this._options.Collapser});
			this.collapser.__init();
			delete this._options.Collapser;
		}

		if (this._options.ColGroup) {
			this.colGroup = JGM.create("ColGroup", {grid:this, options:this._options.ColGroup});
			delete this._options.ColGroup;
		}

		if (this._options.SelectionManager) {
			this.selMgr = JGM.create("SelectionManager", {grid:this, options:this._options.SelectionManager});
			delete this._options.SelectionManager;
		}

		if (this._options.EditManager) {
			this.editMgr = JGM.create("EditManager", {grid:this, options:this._options.EditManager});
			delete this._options.EditManager;
		}

		if (this._options.ColHeader) {
			this.header = JGM.create("ColHeader", {grid:this, container:this._ctnr, options:this._options.ColHeader});
			delete this._options.ColHeader;
		}

		if (this._options.SearchManager) {
			this.search = JGM.create("SearchManager", {grid:this, container:this._ctnr, options:this._options.SearchManager});
			delete this._options.SearchManager;
		}

		if (this._options.MenuBar) {
			this.menubar = JGM.create("MenuBar", {grid:this, container:this._ctnr, options:this._options.MenuBar});
			delete this._options.MenuBar;
		}

		this.view = JGM.create("ViewportManager", {grid:this, container:this._ctnr, options:this._options.ViewportManager});
		delete this._options.ViewportManager;

		if (this._options.TooltipManager) {
			this.tooltip = JGM.create("TooltipManager", {grid:this, container:this._ctnr, options:this._options.TooltipManager});
			delete this._options.TooltipManager;
		}

		if (this._options.DataCreator) {
			this.creator = JGM.create("DataCreator", {grid:this, container:this._ctnr, options:this._options.DataCreator});
			delete this._options.DataCreator;
		}

		if (this._options.Footer) {
			this.footer = JGM.create("Footer", {grid:this, container:this._ctnr, options:this._options.Footer});
			delete this._options.Footer;
		}

		if (this._options.autoWidth) {
			this.event.bind("onResizeCanvasWidth", this.width, this);
		}

		this._createCss();

		/**
		  Grid ��� �ʱ�ȭ �� ���� ������ �������ϱ� ���� onBeforeRenderModules
		  �̺�Ʈ�� Ʈ�����մϴ�. ���� ������ �� �̺�Ʈ�� ���ؼ� ������ �� �ʿ���
		  �۾��� �մϴ�.<br>
		  @event {Event} onBeforeRenderModules

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */	

		/**
		  Grid ��� �ʱ�ȭ �� ���� ������ �������ϱ� ���ؼ� onRenderModules
		  �̺�Ʈ�� Ʈ�����մϴ�. JGM.ColHeader �� ���� �������� �ʿ��� ���� ������ ��
		  �̺�Ʈ�� ���ؼ� ��� �������� �մϴ�.<br>
		  @event {Event} onRenderModules

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */

		/**
		  Grid ��� �ʱ�ȭ �� ���� ������ �������� �Ŀ� onAfterRenderModules
		  �̺�Ʈ�� Ʈ�����մϴ�. ���� ������ �� �̺�Ʈ�� ���ؼ� ������ �� ������
		  �մϴ�.<br>
		  @event {Event} onAfterRenderModules

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.event.trigger("onBeforeRenderModules onRenderModules onAfterRenderModules");

		this.msg = $("<div id='" + this.mid + "msg' class='msg' onmousedown='$(this).hide(1000)' style='position:relative;padding-left:4px;overflow:hidden;z-index:100;font-size:12px;height:21px;line-height:21px'></div>").appendTo(this._ctnr).hide();

		this._vars.lastW = this._ctnr[0].clientWidth;
		this._vars.lastH = this._ctnr[0].clientHeight;

		this._registerLinks(this._options.links);
	}

	prototype._bindEvents = function() {
		JGM._bindGlobalEvents();

		var thisIns = this;
		this._ctnr.bind({
keydown:function(e) { thisIns._keydown(e); },
keyup:function(e) { thisIns._keyup(e); },
keypress:function(e) { thisIns._keypress(e); },
mousein:function(e) { thisIns._mousein(e); },
mouseout:function(e) { thisIns._mouseout(e); },
mouseenter:function(e) { thisIns._mouseenter(e); },
mouseleave:function(e) { thisIns._mouseleave(e); },
mouseover:function(e) { thisIns._mouseover(e); },
mousedown:function(e) { thisIns._mousedown(e); },
click:function(e) { thisIns._click(e); },
dblclick:function(e) { thisIns._dblclick(e); }
});
};

/**
  �׸��� �ν��Ͻ��� �����մϴ�. �� �Լ����� Ʈ���ŵǴ� {@link onDestroy} �̺�Ʈ��
  ���ؼ� ��� ���� ���鵵 �Բ� �����մϴ�.<br>
  Ʈ���� �̺�Ʈ: {@link onDestroy}

  @function {} destroy

  @author ����ȣ
  @since 1.0.0
  @version 1.0.0
  */
prototype.destroy = function() {	
	try {
		if (Util.isEmptyObj(JGM.m.Grid)) {
			JGM._unbindGlobalEvents();
		}

		/**
		  Grid �ν��Ͻ��� ������ ��� Ʈ���ŵǴ� �̺�Ʈ�Դϴ�. �� �̺�Ʈ�� ���ؼ�
		  ��� ���� ������ �����մϴ�.<br>
		  Ʈ���Ÿ� �Լ�: {@link destroy}
		  @event {Event} onDestroy

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.event.trigger("onDestroy");

		JGM._destroy(this, {
name: "Grid",
module: "event",
"$": "_ctnr",
map: "_vars _options",
style: "_style _dynStyle"
});
}
catch (e) {
	return e;
}
};

//tested
prototype._registerLinks = function(links) {
	var link,
		arr,
		arrlen,
		j,
		path,
		pathlen,
		current,
		last,
		lastPath,
		i;

link_loop:
	for (link in links) {
		if (links.hasOwnProperty(link) && !(link in this)) {
			arr = Util.split(links[link]);
			arrlen = arr.length;
			j = 0;

arr_loop:
			for (; j < arrlen; j++) {
				path = arr[j].split(".");
				pathlen = path.length;
				if (pathlen < 1) {
					continue;
				}

				current = this;
				last = this;
				lastPath = "";
				i = 0;
				for (; i < pathlen; i++) {
					if (!(path[i] in current)) {
						continue arr_loop;
					}
					else {
						last = current;
						current = current[lastPath = path[i]];
					}
				}

				this._registerLink(link, current, last, lastPath);
				continue link_loop;
			}
		}
	}
};

// tested
prototype._registerLink = function(name, fn, thisp, lastPath) {
	if (this.hasOwnProperty(name)) {
		return false;
	}

	if (Util.isFunction(fn)) {
		this[name] = function() { return fn.apply(thisp, arguments); };
	}
	else {
		this[name] = function() { return thisp[lastPath]; };
	}

	return true;
};

//tested
prototype._createCss = function() {
	/**
	  ���� �׸��忡 ������ CSS stylesheet �� ���� �� ��� Ʈ���ŵǴ� �̺�Ʈ�Դϴ�.
	  <br>

	  @event {Event} onCreateCss

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.2.2
	  */
	var style = Util.sprint("%selector%{overflow:hidden;font:%font%;%border%%style%}%submodule%", {
selector: "#" + this.mid,
font: this._options.font,
border: this._options.borderSide ?
"border:" + this._options.border + ";" :
"border-top:" + this._options.border + ";border-bottom:" + this._options.border + ";",
style: this._options.style,
submodule: this.event.trigger("onCreateCss").join("")
});
this._style = Util.createStyle(style);

/**
  ���� �׸��忡 ������ ���̳��� CSS stylesheet �� ���� �� ��� Ʈ���ŵǴ� �̺�Ʈ�Դϴ�.
  <br>

  @event {Event} onCreateDynamicCss

  @author ����ȣ
  @since 1.2.2
  @version 1.2.2
  */

this._dynStyle = Util.createStyle(this.event.trigger("onCreateDynamicCss").join(""));
};

prototype._recreateDynamicCss = function() {
	Util.setStyle(this._dynStyle, this.event.trigger("onCreateDynamicCss").join(""));
};

prototype._keydown = function(e) {
	/**
	  �׸��忡 keydown �̺�Ʈ�� �߻��Ͽ� �׿� �´� �۾��� �����ϱ� ���� �߻��ϴ� �̺�Ʈ�Դϴ�.
	  �̺�Ʈ �ڵ鷯�� false �� �����ϸ� �߻��� �̺�Ʈ�� ��ҵǸ� �׸���� �̺�Ʈ �ڵ鸵 �۾��� ���� �ʽ��ϴ�.

	  @event {Event} onBeforeKeydown
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @returns {boolean} continueOrStop - false �� ������ ��� �̺�Ʈ�� ��ҵ˴ϴ�.

	  @author ����ȣ
	  @since 1.2.1
	  @version 1.2.1
	  */
	if (this.event.triggerInvalid("onBeforeKeydown", [e])) {
		return;
	}

	/**
	  Grid �����̳ʿ� ���ε� �� jQuery keydown �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�. �Էµ� Ű������ Ű �ڵ带 �ٿ��� �̺�Ʈ�� �߻��˴ϴ�.
	  ������� ������ enter �� �Է��� ��� enter Ű�� Ű�ڵ�� 13 �̹Ƿ�
	  keydown_13 �� �̺�Ʈ�� Ʈ���� �˴ϴ�.
	  @event {Event} keydown_KEYCODE
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.1.7
	  */	

	/**
	  Grid �����̳ʿ� ���ε� �� jQuery keydown �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} keydown
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	this.event.trigger("keydown_" + e.which + " keydown", [e]);
};

prototype._keyup = function(e) {
	/**
	  �׸��忡 keyup �̺�Ʈ�� �߻��Ͽ� �׿� �´� �۾��� �����ϱ� ���� �߻��ϴ� �̺�Ʈ�Դϴ�.
	  �̺�Ʈ �ڵ鷯�� false �� �����ϸ� �߻��� �̺�Ʈ�� ��ҵǸ� �׸���� �̺�Ʈ �ڵ鸵 �۾��� ���� �ʽ��ϴ�.

	  @event {Event} onBeforeKeyup
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @returns {boolean} continueOrStop - false �� ������ ��� �̺�Ʈ�� ��ҵ˴ϴ�.

	  @author ����ȣ
	  @since 1.2.1
	  @version 1.2.1
	  */
	if (this.event.triggerInvalid("onBeforeKeyup", [e])) {
		return;
	}

	/**
	  Grid �����̳ʿ� ���ε� �� jQuery keyup �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�. �Էµ� Ű������ Ű �ڵ带 �ٿ��� �̺�Ʈ�� �߻��˴ϴ�.
	  ������� ������ enter �� �Է��� ��� enter Ű�� Ű�ڵ�� 13 �̹Ƿ� keyup_13
	  �� �̺�Ʈ�� Ʈ���� �˴ϴ�.
	  @event {Event} keyup_KEYCODE
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.1.7
	  */

	/**
	  Grid �����̳ʿ� ���ε� �� jQuery keyup �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} keyup
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	this.event.trigger("keyup_" + e.which + " keyup", [e]);
};

prototype._keypress = function(e) {
	/**
	  �׸��忡 keypress �̺�Ʈ�� �߻��Ͽ� �׿� �´� �۾��� �����ϱ� ���� �߻��ϴ� �̺�Ʈ�Դϴ�.
	  �̺�Ʈ �ڵ鷯�� false �� �����ϸ� �߻��� �̺�Ʈ�� ��ҵǸ� �׸���� �̺�Ʈ �ڵ鸵 �۾��� ���� �ʽ��ϴ�.

	  @event {Event} onBeforeKeypress
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @returns {boolean} continueOrStop - false �� ������ ��� �̺�Ʈ�� ��ҵ˴ϴ�.

	  @author ����ȣ
	  @since 1.2.1
	  @version 1.2.1
	  */
	if (this.event.triggerInvalid("onBeforeKeypress", [e])) {
		return;
	}

	/**
	  Grid �����̳ʿ� ���ε� �� jQuery keypress �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�. �Էµ� Ű������ Ű �ڵ带 �ٿ��� �̺�Ʈ�� �߻��˴ϴ�.
	  ������� ������ enter �� �Է��� ��� enter Ű�� Ű�ڵ�� 13 �̹Ƿ�
	  keypress.13 �� �̺�Ʈ�� Ʈ���� �˴ϴ�.
	  @event {Event} keypress_KEYCODE
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.1.7
	  */

	/**
	  Grid �����̳ʿ� ���ε� �� jQuery keypress �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} keypress
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	this.event.trigger("keypress_" + e.which + " keypress", [e]);
};

prototype._mousein = function(e) {
	/**
	  �׸��忡 mousein �̺�Ʈ�� �߻��Ͽ� �׿� �´� �۾��� �����ϱ� ���� �߻��ϴ� �̺�Ʈ�Դϴ�.
	  �̺�Ʈ �ڵ鷯�� false �� �����ϸ� �߻��� �̺�Ʈ�� ��ҵǸ� �׸���� �̺�Ʈ �ڵ鸵 �۾��� ���� �ʽ��ϴ�.

	  @event {Event} onBeforeMousein
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @returns {boolean} continueOrStop - false �� ������ ��� �̺�Ʈ�� ��ҵ˴ϴ�.

	  @author ����ȣ
	  @since 1.2.1
	  @version 1.2.1
	  */
	if (this.event.triggerInvalid("onBeforeMousein", [e])) {
		return;
	}

	/**
	  ���콺 ��ư�� ���� ���¿��� Grid �����̳ʿ� ���ε� �� jQuery mousein
	  �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ� �̺�Ʈ �Դϴ�.
	  @event {Event} dragin
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */

	/**
	  Grid �����̳ʿ� ���ε� �� jQuery mousein �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} mousein
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	if (this._vars.drag) {
		this.event.trigger("dragin mousein", [e]);
	}
	else {
		this.event.trigger("mousein", [e]);
	}
};

prototype._mouseout = function(e) {
	/**
	  �׸��忡 mouseout �̺�Ʈ�� �߻��Ͽ� �׿� �´� �۾��� �����ϱ� ���� �߻��ϴ� �̺�Ʈ�Դϴ�.
	  �̺�Ʈ �ڵ鷯�� false �� �����ϸ� �߻��� �̺�Ʈ�� ��ҵǸ� �׸���� �̺�Ʈ �ڵ鸵 �۾��� ���� �ʽ��ϴ�.

	  @event {Event} onBeforeMouseout
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @returns {boolean} continueOrStop - false �� ������ ��� �̺�Ʈ�� ��ҵ˴ϴ�.

	  @author ����ȣ
	  @since 1.2.1
	  @version 1.2.1
	  */
	if (this.event.triggerInvalid("onBeforeMouseout", [e])) {
		return;
	}

	/**
	  ���콺 ��ư�� ���� ���¿��� Grid �����̳ʿ� ���ε� �� jQuery mouseout
	  �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ� �̺�Ʈ �Դϴ�.
	  @event {Event} dragout
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */

	/**
	  Grid �����̳ʿ� ���ε� �� jQuery mouseout �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} mouseout
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	if (this._vars.drag) {
		this.event.trigger("dragout mouseout", [e]);
	}
	else {
		this.event.trigger("mouseout", [e]);
	}
};

prototype._mouseenter = function(e) {
	/**
	  �׸��忡 mouseenter �̺�Ʈ�� �߻��Ͽ� �׿� �´� �۾��� �����ϱ� ���� �߻��ϴ� �̺�Ʈ�Դϴ�.
	  �̺�Ʈ �ڵ鷯�� false �� �����ϸ� �߻��� �̺�Ʈ�� ��ҵǸ� �׸���� �̺�Ʈ �ڵ鸵 �۾��� ���� �ʽ��ϴ�.

	  @event {Event} onBeforeMouseenter
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @returns {boolean} continueOrStop - false �� ������ ��� �̺�Ʈ�� ��ҵ˴ϴ�.

	  @author ����ȣ
	  @since 1.2.1
	  @version 1.2.1
	  */
	if (this.event.triggerInvalid("onBeforeMouseenter", [e])) {
		return;
	}

	/**
	  ���콺 ��ư�� ���� ���¿��� Grid �����̳ʿ� ���ε� �� jQuery mouseenter
	  �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ� �̺�Ʈ �Դϴ�.
	  @event {Event} dragenter
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */

	/**
	  Grid �����̳ʿ� ���ε� �� jQuery mouseenter �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} mouseenter
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	if (this._vars.drag) {
		this.event.trigger("dragenter mouseenter", [e]);
	}
	else {
		this.event.trigger("mouseenter", [e]);
	}
};

prototype._mouseleave = function(e) {
	/**
	  �׸��忡 mouseleave �̺�Ʈ�� �߻��Ͽ� �׿� �´� �۾��� �����ϱ� ���� �߻��ϴ� �̺�Ʈ�Դϴ�.
	  �̺�Ʈ �ڵ鷯�� false �� �����ϸ� �߻��� �̺�Ʈ�� ��ҵǸ� �׸���� �̺�Ʈ �ڵ鸵 �۾��� ���� �ʽ��ϴ�.

	  @event {Event} onBeforeMouseleave
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @returns {boolean} continueOrStop - false �� ������ ��� �̺�Ʈ�� ��ҵ˴ϴ�.

	  @author ����ȣ
	  @since 1.2.1
	  @version 1.2.1
	  */
	if (this.event.triggerInvalid("onBeforeMouseleave", [e])) {
		return;
	}

	/**
	  ���콺 ��ư�� ���� ���¿��� Grid �����̳ʿ� ���ε� �� jQuery mouseleave
	  �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ� �̺�Ʈ �Դϴ�.
	  @event {Event} dragleave
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */

	/**
	  Grid �����̳ʿ� ���ε� �� jQuery mouseleave �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} mouseleave
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	if (this._vars.drag) {
		this.event.trigger("dragleave mouseleave", [e]);
	}
	else {
		this.event.trigger("mouseleave", [e]);
	}
};

prototype._mousemove = function(e) {
	/**
	  �׸��忡 mousemove �̺�Ʈ�� �߻��Ͽ� �׿� �´� �۾��� �����ϱ� ���� �߻��ϴ� �̺�Ʈ�Դϴ�.
	  �̺�Ʈ �ڵ鷯�� false �� �����ϸ� �߻��� �̺�Ʈ�� ��ҵǸ� �׸���� �̺�Ʈ �ڵ鸵 �۾��� ���� �ʽ��ϴ�.

	  @event {Event} onBeforeMousemove
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @returns {boolean} continueOrStop - false �� ������ ��� �̺�Ʈ�� ��ҵ˴ϴ�.

	  @author ����ȣ
	  @since 1.2.1
	  @version 1.2.1
	  */
	if (this.event.triggerInvalid("onBeforeMousemove", [e])) {
		return;
	}


	/**
	  ���콺 ��ư�� ���� ���¿��� Grid �����̳ʿ� ���ε� �� jQuery mousemove
	  �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ� �̺�Ʈ �Դϴ�.
	  @event {Event} dragmove
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */

	/**
	  Grid �����̳ʿ� ���ε� �� jQuery mousemove �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} mousemove
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	if (this._vars.drag) {
		this.event.trigger("dragmove mousemove", [e]);
	}
	else {
		this.event.trigger("mousemove", [e]);
	}
};

prototype._mouseover = function(e) {
	/**
	  �׸��忡 mouseover �̺�Ʈ�� �߻��Ͽ� �׿� �´� �۾��� �����ϱ� ���� �߻��ϴ� �̺�Ʈ�Դϴ�.
	  �̺�Ʈ �ڵ鷯�� false �� �����ϸ� �߻��� �̺�Ʈ�� ��ҵǸ� �׸���� �̺�Ʈ �ڵ鸵 �۾��� ���� �ʽ��ϴ�.

	  @event {Event} onBeforeMouseover
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @returns {boolean} continueOrStop - false �� ������ ��� �̺�Ʈ�� ��ҵ˴ϴ�.

	  @author ����ȣ
	  @since 1.2.1
	  @version 1.2.1
	  */
	if (this.event.triggerInvalid("onBeforeMouseover", [e])) {
		return;
	}

	/**
	  ���콺 ��ư�� ���� ���¿��� Grid �����̳ʿ� ���ε� �� jQuery mouseover
	  �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ� �̺�Ʈ �Դϴ�.
	  @event {Event} dragover
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */

	/**
	  Grid �����̳ʿ� ���ε� �� jQuery mouseover �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} mouseover
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	if (this._vars.drag) {
		this.event.trigger("dragover mouseover", [e]);
	}
	else {
		this.event.trigger("mouseover", [e]);
	}
};

prototype._mousedown = function(e) {
	this._vars.drag = true;

	/**
	  �׸��忡 mousedown �̺�Ʈ�� �߻��Ͽ� �׿� �´� �۾��� �����ϱ� ���� �߻��ϴ� �̺�Ʈ�Դϴ�.
	  �̺�Ʈ �ڵ鷯�� false �� �����ϸ� �߻��� �̺�Ʈ�� ��ҵǸ� �׸���� �̺�Ʈ �ڵ鸵 �۾��� ���� �ʽ��ϴ�.

	  @event {Event} onBeforeMousedown
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @returns {boolean} continueOrStop - false �� ������ ��� �̺�Ʈ�� ��ҵ˴ϴ�.

	  @author ����ȣ
	  @since 1.2.1
	  @version 1.2.1
	  */
	if (this.event.triggerInvalid("onBeforeMousedown", [e])) {
		return;
	}

	/**
	  Grid �����̳ʿ� ���ε� �� jQuery mousedown �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} mousedown
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	this.event.trigger("mousedown", [e]);
};

prototype._mouseup = function(e) {
	this._vars.drag = false;	
	this.event.trigger("unsetDrag");
	if (!this.containsEvent(e)) {
		return;
	}

	/**
	  �׸��忡 mouseup �̺�Ʈ�� �߻��Ͽ� �׿� �´� �۾��� �����ϱ� ���� �߻��ϴ� �̺�Ʈ�Դϴ�.
	  �̺�Ʈ �ڵ鷯�� false �� �����ϸ� �߻��� �̺�Ʈ�� ��ҵǸ� �׸���� �̺�Ʈ �ڵ鸵 �۾��� ���� �ʽ��ϴ�.

	  @event {Event} onBeforeMouseup
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @returns {boolean} continueOrStop - false �� ������ ��� �̺�Ʈ�� ��ҵ˴ϴ�.

	  @author ����ȣ
	  @since 1.2.1
	  @version 1.2.1
	  */
	if (this.event.triggerInvalid("onBeforeMouseup", [e])) {
		return;
	}


	/**
	  Grid �����̳ʿ� ���ε� �� jQuery mouseup �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} mouseup
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	this.event.trigger("mouseup", [e]);
};

prototype._click = function(e) {
	/**
	  �׸��忡 click �̺�Ʈ�� �߻��Ͽ� �׿� �´� �۾��� �����ϱ� ���� �߻��ϴ� �̺�Ʈ�Դϴ�.
	  �̺�Ʈ �ڵ鷯�� false �� �����ϸ� �߻��� �̺�Ʈ�� ��ҵǸ� �׸���� �̺�Ʈ �ڵ鸵 �۾��� ���� �ʽ��ϴ�.

	  @event {Event} onBeforeClick
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @returns {boolean} continueOrStop - false �� ������ ��� �̺�Ʈ�� ��ҵ˴ϴ�.

	  @author ����ȣ
	  @since 1.2.1
	  @version 1.2.1
	  */
	if (this.event.triggerInvalid("onBeforeClick", [e])) {
		return;
	}

	/**
	  Grid �����̳ʿ� ���ε� �� jQuery click �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} click
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	this.event.trigger("click", [e]);
};

prototype._dblclick = function(e) {
	/**
	  �׸��忡 dblclick �̺�Ʈ�� �߻��Ͽ� �׿� �´� �۾��� �����ϱ� ���� �߻��ϴ� �̺�Ʈ�Դϴ�.
	  �̺�Ʈ �ڵ鷯�� false �� �����ϸ� �߻��� �̺�Ʈ�� ��ҵǸ� �׸���� �̺�Ʈ �ڵ鸵 �۾��� ���� �ʽ��ϴ�.

	  @event {Event} onBeforeDblclick
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	  @returns {boolean} continueOrStop - false �� ������ ��� �̺�Ʈ�� ��ҵ˴ϴ�.

	  @author ����ȣ
	  @since 1.2.1
	  @version 1.2.1
	  */
	if (this.event.triggerInvalid("onBeforeDblclick", [e])) {
		return;
	}

	/**
	  Grid �����̳ʿ� ���ε� �� jQuery dblclick �̺�Ʈ�� �߻��� ��� Ʈ���ŵǴ�
	  �̺�Ʈ �Դϴ�.
	  @event {Event} dblclick
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	this.event.trigger("dblclick", [e]);
};

prototype._resize = function(e) {
	var change = false,
		width = this._ctnr[0].clientWidth,
		height;
	if (width >= 1 && this._vars.lastW !== width) {
		/**
		  Grid �����̳��� ���� ����Ǿ��� ��� �߻��ϴ� �̺�Ʈ�Դϴ�.
		  @event {Event} resizeWidth
		  @param {number} width - ���� �� ��
		  @param {number} oldWidth - ���� �� ��

		  @author ����ȣ
		  @since 1.1.5
		  @version 1.1.5
		  */
		this.event.trigger("resizeWidth", [width, this._vars.lastW]);
		this._vars.lastW = width;
		change = true;
	}
	height = this._ctnr[0].clientHeight;
	if (height >= 1 && this._vars.lastH !== height) {
		/**
		  Grid �����̳��� ���̰� ����Ǿ��� ��� �߻��ϴ� �̺�Ʈ�Դϴ�.
		  @event {Event} resizeHeight
		  @param {number} height - ���� �� ����
		  @param {number} oldHeight - ���� �� ����

		  @author ����ȣ
		  @since 1.1.5
		  @version 1.1.5
		  */
		this.event.trigger("resizeHeight", [height, this._vars.lastH]);
		this._vars.lastH = height;
		change = true;
	}

	/**
	  Grid �����̳��� ����� ����Ǿ��� ��� �߻��ϴ� �̺�Ʈ�Դϴ�.
	  @event {Event} resize
	  @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ

	  @author ����ȣ
	  @since 1.1.5
	  @version 1.1.5
	  */
	if (change) {
		this.event.trigger("resize", [e]);
	}
};

/**
  ���� �׸��� �����̳��� ���� ���ϰų� ���� ���� �����մϴ�.

  @function {number} width
  @params {int=} width - ���ο� �׸��� ��
  @returns {number} ���� �׸��� �����̳��� �� �ȼ� ��

  @author ����ȣ
  @since 1.1.5
  @version 1.1.7
  */
prototype.width = function(w) {
	w = parseInt(w);
	if (Util.isNull(w) || isNaN(w) || w < 1 || w === this._ctnr[0].clientWidth) {
		return this._ctnr[0].clientWidth;
	}

	this._ctnr[0].style.width = w + "px";
	this.event.trigger("resizeWidth", [w, this._vars.lastW]);
	this._vars.lastW = w;

	this.event.trigger("resize");
	return w;
};

/*
   ���� �׸��� �����̳��� ���̸� �����մϴ�.

   @function {number} height
   @returns {number} ���� �׸��� �����̳��� ���� �ȼ� ��

   @author ����ȣ
   @since 1.1.5
   @version 1.1.5
   */
prototype.height = function(h) {
	h = parseInt(h);
	if (Util.isNull(h) || isNaN(h) || h < 1 || h === this._ctnr[0].clientHeight) {
		return this._ctnr[0].clientHeight;
	}

	this._ctnr[0].style.height = h + "px";
	this.event.trigger("resizeHeight", [h, this._vars.lastH]);
	this._vars.lastH = h;

	this.event.trigger("resize");
	return h;
};

prototype.getCellByIdAndKey = function(id, key) {
	return JGM.create("Cell", {grid:this, datarow:this.dataMgr.getById(id), colDef:this.colDefMgr.getByKey(key)});
};

prototype.getCellByIdx = function(rowIdx, colIdx) {
	return JGM.create("Cell", {grid:this, row:rowIdx, col:colIdx});
};

/**
  @author ����ȣ
  @since 1.2.3
  @version 1.3.0
  */
prototype.error = function(code) {
	var str = JGM.error[code],
		i = 1,
		e,
		len = arguments.length;
	for (; i < len; i++) {
		str = str.replace(new RegExp('%' + (i-1), "g"), arguments[i]);
	}
	e = new Error(str);
	e.code = code;
	this.printError(e.message);
	this.event.trigger("onError", [e]);
	return e;
};

prototype.printError = function(str) {
	if (this._options.showMessage) {
		var msg = this.msg;
		msg[0].innerHTML = str;
		msg[0].style.width = this._ctnr[0].clientWidth + 'px';
		msg[0].style.background = '#ffebe8';
		msg[0].style.color = '#333';
		msg.show();
		clearTimeout(this.timeout);
		this.timeout = setTimeout(function() { 
				msg.hide(1000);
				}, 5000);
	}
};

prototype.printMessage = function(str) {
	if (this._options.showMessage) {
		var msg = this.msg;
		msg[0].innerHTML = str;
		msg[0].style.width = this._ctnr[0].clientWidth + 'px';
		msg[0].style.background = '#dfdfdf';
		msg[0].style.color = '#6f6f6f';
		msg.show();
		clearTimeout(this.timeout);
		this.timeout = setTimeout(function() { 
				msg.hide(1000);
				}, 5000);
	}
};

prototype.containsEvent = function(e) {
	return Util.contains(this._ctnr[0], e.target);
};

JGM._add("Grid", Grid);
}());

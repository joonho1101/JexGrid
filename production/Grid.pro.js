goog.require('jx.util');
goog.require('jx.util$');
goog.require('jx.lang.Disposable');
goog.require('jx.events.EventDispatcher');
goog.require('jx.grid');
goog.require('jx.grid.BaseModule');
goog.require('jx.grid.EventManager');
echo(jx.grid.Grid);
goog.provide('jx.grid.Grid');
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
	var JGM = goog.getObjectByName('jx.grid'),
		Util = goog.getObjectByName('jx.util'),
		BaseModule = goog.getObjectByName('jx.grid.BaseModule'),
		VERBOSE = 2,
		V_KEYDOWN = 3,
		V_KEYPRESS = 3,
		V_KEYUP = 3,
		V_MOUSEMOVE = 5,
		V_MOUSEOVER = 4,
		V_MOUSEOUT = 4,
		V_MOUSEIN = 4,
		V_MOUSEDOWN = 3,
		V_MOUSEUP = 3,
		V_MOUSEENTER = 3,
		V_MOUSELEAVE = 3,
		V_SCROLL = 3,
		V_FOCUS = 3,
		V_CLICK = 2,
		V_DBLCLICK = 2,
		V_RESIZE = 2,
		V_INIT = 1;
goog.exportSymbol('jx.grid.Grid', Grid);
Grid.V_KEYDOWN = V_KEYDOWN;
Grid.V_KEYPRESS = V_KEYPRESS;
Grid.V_KEYUP = V_KEYUP;
Grid.V_MOUSEMOVE = V_MOUSEMOVE;
Grid.V_MOUSEOVER = V_MOUSEOVER;
Grid.V_MOUSEOUT = V_MOUSEOUT;
Grid.V_MOUSEIN = V_MOUSEIN;
Grid.V_MOUSEDOWN = V_MOUSEDOWN;
Grid.V_MOUSEUP = V_MOUSEUP;
Grid.V_MOUSEENTER = V_MOUSEENTER;
Grid.V_MOUSELEAVE = V_MOUSELEAVE;
Grid.V_CLICK = V_CLICK;
Grid.V_DBLCLICK = V_DBLCLICK;
Grid.V_RESIZE = V_RESIZE;
Grid.V_INIT = V_INIT;
/**
  Grid �ھ� ���. ��� Grid ����� ����Ǵ� ����Դϴ�.
  Grid �ھ� Ŭ����. Grid �� ��� ���� ������ �� Ŭ������ ����Ǿ� ����
  Ŀ�´�����Ʈ �մϴ�.
  @class {Grid} jx.grid.Grid
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
  @... {(DOMElement | jQuery)} args['container ']- Grid �� ���� �����̳� ������Ʈ
  @... {Array.<Object>} args['datalist ']- ������ ���
  @... {Array.<Object>} args['colDefs ']- �÷� ���� ���
  @... {Object} args['options ']- Grid �ɼ� ������Ʈ
  @returns {Grid} Grid ��� �ν��Ͻ��� �����մϴ�.
  @author ����ȣ
  @since 1.0.0
  @version 1.0.0
  */
function Grid(args) {
	this.mid = args.mid;
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
goog.inherits(Grid, BaseModule);
Grid.getInstance = function(args) {
	return new Grid(args);
};
var prototype = Grid.prototype;
prototype._defaultOptions = function() {
	return {		
		/**
		  �׸��� �����̳ʿ� ����Ǵ� CSS Ŭ���� �Դϴ�.<br>�⺻��:<code>"jgrid"</code>
		  @type {string=} jx.grid.Grid.options.classGrid
		  @private
		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		'classGrid': "jgrid",
			/**
			  �����̳ʿ� ����Ǵ� CSS border ��Ÿ�� �Դϴ�. <br>�⺻��:<code>"1px solid #868686"</code>
			  @type {string=} jx.grid.Grid.options.border
			  @private
			  @author ����ȣ
			  @since 1.0.0
			  @version 1.0.0
			  */
			'border': "1px solid #868686",
			/**
			  �����̳ʿ� ����Ǵ� CSS width �ȼ��� �Դϴ�. �� �ɼ� ���� �Էµ��� ���� ��� <code>width:100%</code> �� �����ϴ� �Ͱ� ���� ȿ���� �����ϴ�.<br>�⺻��:<code>undefined</code>
			  @type {number=} jx.grid.Grid.options.width
			  @private
			  @author ����ȣ
			  @since 1.0.0
			  @version 1.0.0
			  */
			'width': undefined,
			/**
			  �����̳ʿ� ����Ǵ� CSS font ��Ÿ�� �Դϴ�. <br>�⺻��:<code>"15px Arial,Helvetica,sans-serif"</code>
			  @type {string=} jx.grid.Grid.options.font
			  @private
			  @author ����ȣ
			  @since 1.0.0
			  @version 1.0.0
			  */
			'font': "15px Arial,Helvetica,sans-serif",
			/**
			  �׸��� �����̳ʿ� ����� CSS Style �Դϴ�.<br>
			  ������ ��: �� �ɼǿ� �Էµ� style �� ����Ǿ����� DOM �� ũ�Ⱑ ���ϸ� �׸����� �������� ũ�� ��꿡 ������ ����ϴ�.
			  ��, ũ�⿡ ������ ���� style ������ �Ҷ��� ����ϼ���.
			  <br>�⺻��:<code>""</code>
			  @type {string=} jx.grid.Grid.options.style
			  @private
			  @author ����ȣ
			  @since 1.0.0
			  @version 1.0.0
			  */
			'style': "",
			/**
			  �����̳ʿ� ����Ǵ� border �� ���̵忡�� ������� �����Դϴ�. <br>�⺻��:<code>true</code>
			  @type {boolean=} jx.grid.Grid.options.borderSide
			  @private
			  @author ����ȣ
			  @since 1.0.0
			  @version 1.0.0
			  */
			'borderSide': true,
			/**
			  �׸��忡�� ���Ǵ� �̹������� �ִ� ������ url �Դϴ�.<br>�⺻��:<code>"../images/"</code>
			  @type {string=} jx.grid.Grid.options.imageUrl
			  @private
			  @author ����ȣ
			  @since 1.1.3
			  @version 1.1.3
			  */
			'imageUrl': "../images/",
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
			  @type {Object=} jx.grid.Grid.options.links
			  @private
			  @author ����ȣ
			  @since 1.1.6
			  @version 1.1.6
			  */
			'links': {
				'data': "dataMgr.all",
				'datalen': "dataMgr.all.length",
				'shown': "dataMgr.datalist",
				'set': "dataMgr.set",
				'add': "dataMgr.add",
				'addList': "dataMgr.addList",
				'update': "dataMgr.update",
				'updateByKey': "dataMgr.updateByKey",
				'updateList': "dataMgr.updateList",
				'remove': "dataMgr.remove",
				'removeList': "dataMgr.removeList",
				'select': "dataMgr.executeSelect",
				'undo': "dataMgr.undo",
				'redo': "dataMgr.redo",
				'addFilter': "dataMgr.addFilter",
				'removeFilter': "dataMgr.removeFilter",
				'check': "collapser.checkMgr.checkList checkMgr.checkList",
				'checked': "collapser.checkMgr.getCheckList checkMgr.getCheckList",
				'removeChecked': "collapser.checkMgr.removeChecked checkMgr.removeChecked",
				'register': "event.register",
				'trigger': "event.trigger",
				'bind': "event.bind",
				'unregister': "event.unregister",
				'unbind': "event.unregister",
				'collen': "colDefMgr.length"
			},
			/**
			  true �� ���, �׸��� �����̳��� ����� ��� �÷��� ���̵��� �ڵ� �����˴ϴ�. <br>�⺻��:<code>false</code>
			  @type {boolean=} jx.grid.Grid.options.autoWidth
			  @private
			  @author ����ȣ
			  @since 1.1.7
			  @version 1.1.7
			  */
			'autoWidth': false,
			'showMessage': false
				/**
				  ���� ��� �鿡�� ������ �ɼ��� �����մϴ�. ���� ���
				  {@link jx.grid.ViewportManager ViewportManager} �� �ɼ��� �����ϰ��� �� ���
				  ������ ���� �����ϸ� �˴ϴ�.
				  <code>ViewportManager:{classCell:"jgrid-new-cell-class"</code>
				  <br>�⺻��:<code>undefined</code><br>
				  @type {string=} jx.grid.Grid.options.MODULE_CLASS_NAME
				  @private
				  @author ����ȣ
				  @since 1.0.0
				  @version 1.0.0
				  */
	};
}
prototype._init = function(args) {
	var ctnr = this._ctnr = args['container'],
		opt = this._options,
		em;
	/**
	  Grid ����� �⺻ �ɼ� ������ �����մϴ�.
	  @type {Object} options
	  @private
	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	this['name'] = opt['name'];
	this._drag = false;
	this._lastW = null;
	this._lastH = null;
	this._vars = {
		scrollbarDim: undefined
	};
	ctnr = this._ctnr = $("<div id='" + this.mid + "' class='" + opt['classGrid'] + "' " + (Util.isNull(opt['width']) ? "" : "style='width:" + opt['width'] + "px' ") + "tabIndex='0'>").appendTo(Util$.safe$(ctnr));
	this._vars.scrollbarDim = Util$.calScrollbarDims(ctnr);
	em = this['event'] =  JGM.create("EventManager", {grid:this, 'options':opt['EventManager']});
	this['colDefMgr'] =  JGM.create("ColumnManager", {grid:this, colDefs:args['colDefs'], 'options':opt['ColDefManager']});
	this['dataMgr'] = JGM.create("DataManager", {grid:this, datalist:args['datalist'], 'options':opt['DataManager']});
	if (opt['CheckManager']) {
		this['checkMgr'] =  JGM.create("CheckManager", {grid:this, 'options':opt['CheckManager']});
	}
	/**
	 * dunno what this is doing
	var i = 10,
		colDefs = this['colDefMgr'].getAll(),
		len = colDefs.length;
	for (; i < len; i++) {
		colDef = colDefs[i];
		if (colDef['CheckManager']) {
			colDef['CheckManager'].colDef = colDef;
			colDef['checkMgr'] = JGM.create("CheckManager", {grid:this, 'options':colDef['CheckManager']});
		}
	}
	*/
	if (opt['Collapser']) {
		this['collapser'] =  JGM.create("Collapser", {grid:this, 'options':opt['Collapser']});
		this['collapser'].__init();
	}
	if (opt['ColGroup']) {
		this['colGroup'] =  JGM.create("ColumnGroup", {grid:this, 'options':opt['ColGroup']});
	}
	if (opt['SelectionManager']) {
		this['selMgr'] =  JGM.create("SelectionManager", {grid:this, 'options':opt['SelectionManager']});
	}
	if (opt['EditManager']) {
		this['editMgr'] =  JGM.create("EditManager", {grid:this, 'options':opt['EditManager']});
	}
	if (opt['ColHeader']) {
		this['header'] =  JGM.create("ColumnHeader", {grid:this, 'container':ctnr, 'options':opt['ColHeader']});
	}
	if (opt['SearchManager']) {
		this['search'] =  JGM.create("SearchManager", {grid:this, 'container':ctnr, 'options':opt['SearchManager']});
	}
	if (opt['MenuBar']) {
		this['menubar'] =  JGM.create("MenuBar", {grid:this, 'container':ctnr, 'options':opt['MenuBar']});
	}
	this['view'] =  JGM.create("ViewportManager", {grid:this, 'container':ctnr, 'options':opt['ViewportManager']});
	if (opt['TooltipManager']) {
		this['tooltip'] =  JGM.create("TooltipManager", {grid:this, 'container':ctnr, 'options':opt['TooltipManager']});
	}
	if (opt['DataCreator']) {
		this['creator'] =  JGM.create("DataCreator", {grid:this, 'container':ctnr, 'options':opt['DataCreator']});
	}
	if (opt['Footer']) {
		this['footer'] =  JGM.create("Footer", {grid:this, 'container':ctnr, 'options':opt['Footer']});
	}
	if (opt['autoWidth']) {
		em.bind("onResizeCanvasWidth", this.width, this);
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
	  �̺�Ʈ�� Ʈ�����մϴ�. jx.grid.ColumnHeader �� ���� �������� �ʿ��� ���� ������ ��
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
	em.trigger("onBeforeRenderModules onRenderModules onAfterRenderModules");
	this['msg'] =  $("<div id='" + this.mid + "msg' class='msg' onmousedown='$(this).hide(1000)' style='position:relative;padding-left:4px;overflow:hidden;z-index:100;font-size:12px;height:21px;line-height:21px'></div>").appendTo(ctnr).hide();
	ctnr = ctnr[0];
	this._lastW = ctnr.clientWidth;
	this._lastH = ctnr.clientHeight;
	this._registerLinks(opt['links']);
}
prototype._bindEvents = function() {
	JGM._bindGlobalEvents();
	var thisIns = this;
	this._ctnr.bind({
		'keydown':function(e) { thisIns._keydown(e); },
		'keyup':function(e) { thisIns._keyup(e); },
		'keypress':function(e) { thisIns._keypress(e); },
		'mousein':function(e) { thisIns._mousein(e); },
		'mouseout':function(e) { thisIns._mouseout(e); },
		'mouseenter':function(e) { thisIns._mouseenter(e); },
		'mouseleave':function(e) { thisIns._mouseleave(e); },
		'mouseover':function(e) { thisIns._mouseover(e); },
		'mousedown':function(e) { thisIns._mousedown(e); },
		'click':function(e) { thisIns._click(e); },
		'dblclick':function(e) { thisIns._dblclick(e); }
	});
	this._charts = [];
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
		this.dispatchEvent({'type':'beforeDispose'});
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
		this['event'].trigger("onDestroy");
		JGM._destroy(this, {
			name: "Grid",
			module: "event",
			"$": "ctnr",
			map: "vars _options",
			style: "style _dynStyle"
		});
		this.dispose();
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
	var event = {'type':'beforeCreateCss', css:[]},
		opt = this._options,
		em = this['event'];
	this.dispatchEvent(event);
	/**
	  ���� �׸��忡 ������ CSS stylesheet �� ���� �� ��� Ʈ���ŵǴ� �̺�Ʈ�Դϴ�.
	  <br>
	  @event {Event} onCreateCss
	  @author ����ȣ
	  @since 1.0.0
	  @version 1.2.2
	  */
	var style = Util.sprint("%selector%{overflow:hidden;font:%font%;%border%%style%}%submodule%", {
		'selector': "#" + this.mid,
		'font': opt['font'],
		'border': opt['borderSide'] ?
		"border:" + opt['border'] + ";" :
		"border-top:" + opt['border'] + ";border-bottom:" + opt['border'] + ";",
		'style': opt['style'],
		'submodule': event.css.join('') + em.trigger("onCreateCss").join("")
	});
	this._style = Util.createStyle(style);
	event = {'type':'beforeCreateDynamicCss', css:[]};
	this.dispatchEvent(event);
	/**
	  ���� �׸��忡 ������ ���̳��� CSS stylesheet �� ���� �� ��� Ʈ���ŵǴ� �̺�Ʈ�Դϴ�.
	  <br>
	  @event {Event} onCreateDynamicCss
	  @author ����ȣ
	  @since 1.2.2
	  @version 1.2.2
	  */
	this._dynStyle = Util.createStyle(event.css.join('') + ';' + em.trigger("onCreateDynamicCss").join(""));
};
prototype._recreateDynamicCss = function() {
	Util.setStyle(this._dynStyle, this['event'].trigger("onCreateDynamicCss").join(""));
};
prototype._keydown = function(e) {
	var em = this['event'];
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
	if (em.triggerInvalid("onBeforeKeydown", [e])) {
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
	em.trigger("keydown_" + e.which + " keydown", [e]);
};
prototype._keyup = function(e) {
	var em = this['event'];
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
	if (em.triggerInvalid("onBeforeKeyup", [e])) {
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
	em.trigger("keyup_" + e.which + " keyup", [e]);
};
prototype._keypress = function(e) {
	var em = this['event'];
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
	if (em.triggerInvalid("onBeforeKeypress", [e])) {
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
	em.trigger("keypress_" + e.which + " keypress", [e]);
};
prototype._mousein = function(e) {
	var em = this['event'];
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
	if (em.triggerInvalid("onBeforeMousein", [e])) {
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
	if (this._drag) {
		em.trigger("dragin mousein", [e]);
	}
	else {
		em.trigger("mousein", [e]);
	}
};
prototype._mouseout = function(e) {
	var em = this['event'];
		
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
	if (em.triggerInvalid("onBeforeMouseout", [e])) {
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
	if (this._drag) {
		em.trigger("dragout mouseout", [e]);
	}
	else {
		em.trigger("mouseout", [e]);
	}
};
prototype._mouseenter = function(e) {
	var em = this['event'];
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
	if (em.triggerInvalid("onBeforeMouseenter", [e])) {
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
	if (this._drag) {
		em.trigger("dragenter mouseenter", [e]);
	}
	else {
		em.trigger("mouseenter", [e]);
	}
};
prototype._mouseleave = function(e) {
	var em = this['event'];
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
	if (em.triggerInvalid("onBeforeMouseleave", [e])) {
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
	if (this._drag) {
		em.trigger("dragleave mouseleave", [e]);
	}
	else {
		em.trigger("mouseleave", [e]);
	}
};
prototype._mousemove = function(e) {
	var em = this['event'];
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
	if (em.triggerInvalid("onBeforeMousemove", [e])) {
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
	if (this._drag) {
		em.trigger("dragmove mousemove", [e]);
	}
	else {
		em.trigger("mousemove", [e]);
	}
};
prototype._mouseover = function(e) {
	var em = this['event'];
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
	if (em.triggerInvalid("onBeforeMouseover", [e])) {
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
	if (this._drag) {
		em.trigger("dragover mouseover", [e]);
	}
	else {
		em.trigger("mouseover", [e]);
	}
};
prototype._mousedown = function(e) {
	var em = this['event'];
	this._drag = true;
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
	if (em.triggerInvalid("onBeforeMousedown", [e])) {
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
	em.trigger("mousedown", [e]);
};
prototype._mouseup = function(e) {
	var em = this['event'];
	this._drag = false;	
	em.trigger("unsetDrag");
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
	if (em.triggerInvalid("onBeforeMouseup", [e])) {
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
	em.trigger("mouseup", [e]);
};
prototype._click = function(e) {
	var em = this['event'];
	
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
	if (em.triggerInvalid("onBeforeClick", [e])) {
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
	em.trigger("click", [e]);
};
prototype._dblclick = function(e) {
	var em = this['event'];
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
	if (em.triggerInvalid("onBeforeDblclick", [e])) {
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
	em.trigger("dblclick", [e]);
};
prototype._resize = function(e) {
	var em = this['event'];
	var change = false,
		ctnr = this._ctnr[0],
		cw = this._lastW,
		ch = this._lastH,
		width = ctnr.clientWidth,
		height = ctnr.clientHeight;
	if (width >= 1 && cw !== width) {
		/**
		  Grid �����̳��� ���� ����Ǿ��� ��� �߻��ϴ� �̺�Ʈ�Դϴ�.
		  @event {Event} resizeWidth
		  @param {number} width - ���� �� ��
		  @param {number} oldWidth - ���� �� ��
		  @author ����ȣ
		  @since 1.1.5
		  @version 1.1.5
		  */
		em.trigger("resizeWidth", [width, cw]);
		this._lastW = width;
		change = true;
	}
	if (height >= 1 && ch !== height) {
		/**
		  Grid �����̳��� ���̰� ����Ǿ��� ��� �߻��ϴ� �̺�Ʈ�Դϴ�.
		  @event {Event} resizeHeight
		  @param {number} height - ���� �� ����
		  @param {number} oldHeight - ���� �� ����
		  @author ����ȣ
		  @since 1.1.5
		  @version 1.1.5
		  */
		em.trigger("resizeHeight", [height, ch]);
		this._lastH = height;
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
		em.trigger("resize", [e]);
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
	var ctnr = this._ctnr[0],
		cw = ctnr.clientWidth,
		em = this['event'];
	if (!w) {
		return cw;
	}
	if (typeof w != 'number') {
		w = parseInt(w);
	}
	if (w < 1 || w === cw || !isFinite(w)) {
		return cw;
	}
	ctnr.style.width = w + "px";
	em.trigger("resizeWidth", [w, this._lastW]);
	this._lastW = w;
	em.trigger("resize");
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
	var ctnr = this._ctnr[0],
		ch = ctnr.clientHeight,
		em = this['event'];
	if (!h) {
		return ch;
	}
	if (typeof h != 'number') {
		h = parseInt(h);
	}
	if (h < 1 || h === ch || !isFinite(h)) {
		return ch;
	}
	ctnr.style.height = h + "px";
	em.trigger("resizeHeight", [h, this._lastH]);
	this._lastH = h;
	em.trigger("resize");
	return h;
};
prototype.getCellByIdAndKey = function(id, key) {
	return JGM.create("Cell", {'grid':this, 'datarow':this['dataMgr'].getById(id), 'colDef':this['colDefMgr'].getByKey(key)});
};
prototype.getCellByIdx = function(rowIdx, colIdx) {
	return JGM.create("Cell", {'grid':this, 'row':rowIdx, 'col':colIdx});
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
	this['event'].trigger("onError", [e]);
	return e;
};
prototype.printError = function(str) {
	if (this._options['showMessage']) {
		var msg = this['msg'],
			msgel = msg[0],
			style = msgel.style;
		msgel.innerHTML = str;
		style.width = this._ctnr[0].clientWidth + 'px';
		style.background = '#ffebe8';
		style.color = '#333';
		msg.show();
		clearTimeout(this.timeout);
		this.timeout = setTimeout(function() { 
			msg.hide(1000);
		}, 5000);
	}
};
prototype.printMessage = function(str) {
	if (this._options['showMessage']) {
		var msg = this['msg'],
			msgel = msg[0],
			style = msgel.style;
		msgel.innerHTML = str;
		style.width = this._ctnr[0].clientWidth + 'px';
		style.background = '#dfdfdf';
		style.color = '#6f6f6f';
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
prototype.getChart = function(name) {
	return this._charts[name];
};
prototype.log = function(msg, vlevel) {
}
prototype.chart = function(chartCont, type, columns, options) {
	var pack,
		cls;
	type = type.toLowerCase();
	switch (type) {
		case 'area':
			pack = 'corechart';
			cls = 'AreaChart';
			break;
		case 'bar':
			pack = 'corechart';
			cls = 'BarChart';
			break;
		case 'candle':
			pack = 'corechart';
			cls = 'CandlestickChart';
			break;
		case 'column':
			pack = 'corechart';
			cls = 'ColumnChart';
			break;
		case 'combo':
			pack = 'corechart';
			cls = 'ComboChart';
			break;
		case 'gauge':
			pack = 'gauge';
			cls = 'Gauge';
			break;
		case 'geo':
			pack = 'geochart';
			cls = 'GeoChart';
			break;
		case 'line':
			pack = 'corechart';
			cls = 'LineChart';
			break;
		case 'pie':
			pack = 'corechart';
			cls = 'PieChart';
			break;
		case 'scatter':
			pack = 'corechart';
			cls = 'ScatterChart';
			break;
		case 'table':
			pack = 'table';
			cls = 'Table';
			break;
		case 'treemap':
			pack = 'treemap';
			cls = 'TreeMap';
			break;
		default:
			throw new Error('unknown chart type: ' + type);
	}
	google.load("visualization", "1", {packages:[pack]});
	var grid = this,
		colmgr = this.colDefMgr,
		dataMgr = this.dataMgr,
		coldefs = columns.map(function(k) {
			var coldef = colmgr.getByKey(k);
			if (coldef) {
				return coldef;
			}
			throw new Error('column key not found');
		}),
		rows = dataMgr.exportToArray(columns);
	google.setOnLoadCallback(function() {
		var data = new google.visualization.DataTable(),
			i = 0,
			l = coldefs.length,
			coldef,
			datatype;
		for (; i < l; i++) {
			coldef = coldefs[i];
			datatype = coldef.type;
			switch(datatype) {
				case 'boolean':
					datatype = 'boolean';
					break;
				case 'int':
				case 'integer':
				case 'long':
				case 'float':
				case 'double':
					datatype = 'number';
					break;
				case 'string':
				case 'text':
					datatype = 'string';
					break;
				case 'date':
					break;
			}
			data.addColumn(datatype || (i === 0 && 'string') || 'number', coldef.name);
		}
		data.addRows(rows);
		var chart = grid._charts[chartCont] = new google.visualization[cls](document.getElementById(chartCont));
		chart.draw(data, options);
		grid['event'].bind('onAfterRefresh', function() {
			data.removeRows(0, data.getNumberOfRows());
			data.addRows(dataMgr.exportToArray(columns));
			chart.draw(data, options);
		});
	});
};
}());

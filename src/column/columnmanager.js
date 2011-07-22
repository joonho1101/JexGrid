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

 goog.provide('JGM.column.ColDefManager');

 JGM.column.ColDefManager = ColDefManager;

/**
ColDefManager ���. �׸��� �� ���� ������� ���� �Լ����� ���� ����Դϴ�.
@module ColDefManager
 */

/**
ColDefManager Ŭ����. �׸��� �÷� ���� ������Ʈ�� �����ϴ� ����Դϴ�.

@class {public ColDefManager} JGM.ColDefManager

@author ����ȣ
@since 1.0.0
@version 1.2.1
*/

/**
ColDefManager ����Ʈ���� �Դϴ�.

@constructor {public ColDefManager} ColDefManager
@param {Object} args - ColDefManager ��� �Ķ���� ������Ʈ
@... {Object[]} args.colDefs - �÷� ���� ������Ʈ ���
@... {JGM.Grid} args.grid - ColDefManager �� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�
@... {Object} args.options - ColDefManager �ɼ� ������Ʈ
@returns {ColDefManager} ColDefManager ��� �ν��Ͻ��� �����մϴ�.

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
function ColDefManager(args) {
	/**
	{@link JGM} �� �Ҵ����ִ� ColDefManager ��� ���� ���̵��Դϴ�. �б� ����.

	@var {public final String} mid

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.mid = args.mid;

	/**
	ColDefManager �� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�.

	@var {public JGM.Grid} grid

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid = args.grid;

	/**
	�׸��� �÷� ���Ǹ� �����ϴ� {@link JGM.ColDefManager ColDefManager} �ν��Ͻ� �Դϴ�.

	@var {public JGM.ColDefManager} JGM.Grid.colDefMgr

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid.colDefMgr = this;

	/**
	ColDefManager ����� �⺻ �ɼ� ������ �����մϴ�.

	@var {private Object} options

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	var options = {
		/**
		�� �÷��� �÷� ���� ������Ʈ�� �ͽ��ٵ� �� �� ���� �⺻ �÷� ����
		�ɼ��Դϴ�.

		@var {private optional Object} JGM.ColDefManager.options.colDef

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__colDef_a__: {
			/**
			�ο� �����Ϳ��� �ش� �÷� �����͸� ������ �� ���Ǵ� Ű�Դϴ�. �÷�
			���� ������Ʈ���� �ʼ������� �� �÷����� ����ũ�� Ű ���� ���������
			�մϴ�. <br>�⺻��:<code>undefined</code>

			@var {private optional String} JGM.ColDefManager.options.colDef.key

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			key:			undefined,

			/**
			�÷� �̸�. �� ���� ������ ��� �÷� ����� key �� ��� �� ����
			�̸����� ��� ǥ���մϴ�. <br>�⺻��:<code>""</code>

			@var {private optional String} JGM.ColDefManager.options.colDef.name

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			name:			"",

			/**
			�÷� �� ���鿡 ����Ǵ� CSS Ŭ����. <br>�⺻��:<code>undefined</code>

			@var {private optional String} JGM.ColDefManager.options.colDef.colClass

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			colClass:		undefined,

			/**
			���ο� �ο� �����͸� �����ϰų� ���� �����͸� del Ű�� ������ �������� ��쿡
			�÷��� �ڵ������� ä������ �÷��� �⺻ ���Դϴ�. <br>�⺻��:<code>undefined</code>

			@var {private optional ?} JGM.ColDefManager.options.colDef.defaultValue

			@author ����ȣ
			@since 1.1.1
			@version 1.1.1
			*/
			defaultValue:		undefined,

			/**
			{@link JGM.DataCreator DataCreator} �� ����Ͽ� ���ο� �ο� �����͸� ������ ���,
			�ο� �������� �÷� ���� ���������� �Է������� �����Դϴ�. <br>�⺻��:<code>undefined</code>

			@var {private optional Boolean} JGM.ColDefManager.options.colDef.inputOnCreate

			@author ����ȣ
			@since 1.1.1
			@version 1.1.1
			*/
			inputOnCreate:		undefined,

			/**
			�÷� �� ���鿡 ���������� ����Ǵ� CSS style �Դϴ�.<br>
			������ ��: �� �ɼǿ� �Էµ� style �� ����Ǿ����� DOM �� ũ�Ⱑ ���ϸ� �׸����� �������� ũ�� ��꿡 ������ ����ϴ�.
			��, ũ�⿡ ������ ���� style ������ �Ҷ��� ����ϼ���.
			<br>�⺻��:<code>""</code>

			@var {private optional String} JGM.ColDefManager.options.colDef.style

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			style:		"",

			/**
			�÷� ������� ����Ǵ� CSS style �Դϴ�.<br>
			������ ��: �� �ɼǿ� �Էµ� style �� ����Ǿ����� DOM �� ũ�Ⱑ ���ϸ� �׸����� �������� ũ�� ��꿡 ������ ����ϴ�.
			��, ũ�⿡ ������ ���� style ������ �Ҷ��� ����ϼ���.
			<br>�⺻��:<code>""</code>

			@var {private optional String} JGM.ColDefManager.options.colDef.headerStyle

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			headerStyle:		"",

			/**
			�÷��� �⺻ �� �ȼ�. <br>�⺻��:<code>80</code>

			@var {private optional int} JGM.ColDefManager.options.colDef.width

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			width:			80,

			/**
			�÷��� ���� ������ ��� ���Ǵ� �ּ� �� �ȼ�. <br>�⺻��:<code>30</code>

			@var {private optional int} JGM.ColDefManager.options.colDef.minW

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			minW:			30,

			/**
			�÷��� ���� ������ ��� ���Ǵ� �ִ� �� �ȼ�. <br>�⺻��:<code>undefined</code>

			@var {private optional int} JGM.ColDefManager.options.colDef.maxW

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			maxW:			undefined,

			/**
			�� �������� �� �� ���Ǵ� �÷� ������. <br>�⺻��:<code>undefined</code>

			@var {private optional JGM.Editor} JGM.ColDefManager.options.colDef.editor

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			editor:			undefined,

			/**
			�÷� ������ �� ���Ǵ� �÷� ���� ������Ʈ. <br>�⺻��:<code>undefined</code>

			@var {private optional Object} JGM.ColDefManager.options.colDef.sorter

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			sorter:			undefined,

			/**
			�÷��� ����� ����. <br>�⺻��:<code>false</code>

			@var {private optional Boolean} JGM.ColDefManager.options.colDef.hidden

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			hidden:			false,

			/**
			�÷� ������ �հ��� {@link JGM.Footer Footer} �� ǥ�� ����.
			"krw" �Է½� \ 10,000,000 �������� �������ϸ�, "usd" �Է½� $ 10,000,000.00 �������� ������ �մϴ�.
			�Լ� �Է½� �÷���� �հ� ���� �Ķ���ͷ� �޽��ϴ�.
			<br>�⺻��:<code>undefined</code>

			@var {private optional Function} JGM.ColDefManager.options.colDef.sumRenderer

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			sumRenderer:		undefined,

			/**
			���콺�� �÷� ������ �÷����� ��� �������� ������ Ȱ�� ����. <br>�⺻��:<code>false</code>

			@var {private optional Boolean} JGM.ColDefManager.options.colDef.tooltipEnabled

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			tooltipEnabled:	false,

			/**
			�÷��� �� ���� ���� ����. <br>�⺻��:<code>false</code>

			@var {private optional Boolean} JGM.ColDefManager.options.colDef.resizable

			@author ����ȣ
			@since 1.1.2
			@version 1.1.2
			*/
			resizable:		false,

			/**
			�÷� �� ������.
			�������� �Ķ���ͷ� {@link JGM.Cell Cell} �ν��Ͻ� �Ǵ�
			value, rowIdx, colIdx, datarow, colDef, {@link JGM.ViewportManager ViewportManager} �� ������� �ް�,
			�� HTML �� �����ϴ� Function �Դϴ�.
			<br>�⺻��:�⺻ �ؽ�Ʈ ������

			@var {private optional Function} JGM.ColDefManager.options.colDef.renderer
			@see JGM.ColDefManager.options.colDef.rendererInput

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			renderer:		JGM.ViewportManager.__renderer_AD__,

			/**
			�÷� �� {@link JGM.ColDefManager.options.colDef.renderer renderer} �Լ��� ���� �Ķ���� Ÿ���� ���ϴ� �ɼ�. true �� ��쿡��
			{@link JGM.Cell Cell} �ν��Ͻ��� ������, false �� ��쿡�� ������ �Ķ���͵��� ������� �����ϴ�. <br>
			value(�� ��), rowIdx(�ο� �ε���), colIdx(�÷� �ε���), datarow(�ο� ������), colDef(�÷� ���� ������Ʈ), {@link JGM.ViewportManager ViewportManager}
			<br>�⺻��:<code>false</code>

			@var {private optional Boolean} JGM.ColDefManager.options.colDef.rendererInput

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			rendererInput:	false,

			/**
			�÷� ����� Ÿ��Ʋ attribute �Է� ����. <br>�⺻��:<code>false</code>

			@var {private optional Boolean} JGM.ColDefManager.options.colDef.noTitle

			@author ����ȣ
			@since 1.1.7
			@version 1.1.7
			*/
			noTitle: false,

			/**
			�÷� ����� �̸��� �Է� ����. <br>�⺻��:<code>false</code>

			@var {private optional Boolean} JGM.ColDefManager.options.colDef.noName

			@author ����ȣ
			@since 1.1.7
			@version 1.1.7
			*/
			noName: false,

			/**
			�÷� ����� �Է��� Ÿ��Ʋ attribute �� ����. <br>�⺻��:<code>undefined</code>

			@var {private optional String} JGM.ColDefManager.options.colDef.title

			@author ����ȣ
			@since 1.1.7
			@version 1.1.7
			*/
			title: undefined,

			/**
			�÷��� ���͸� �ÿ� �˻��� ���ԵǴ��� ����.<br>�⺻��:<code>false</code>

			@var {private optional Boolean} JGM.ColDefManager.options.colDef.noSearch

			@author ����ȣ
			@since 1.2.0
			@version 1.2.0
			*/
			noSearch: false,

			/**
			���͸� �ÿ� ���� �߰� �ɼ� �����Դϴ�. Ŀ���� ���� �Ǵ� "string", "number" �� �Է��� �� �ֽ��ϴ�.<br>�⺻��:<code>undefined</code>

			@var {private optional Object[] | String} JGM.ColDefManager.options.colDef.filter

			@author ����ȣ
			@since 1.2.0
			@version 1.2.0
			*/
			filter: undefined,

			/**
			������ parsing �� ����ϴ� �Լ��Դϴ�. �׸��忡 �Էµǰų� ������ ����Ǵ� ��� �����ʹ� �� �Լ��� ���ؼ�
			parsing �� �˴ϴ�.
			!!!!!!!!!!!!!!!
			Ŀ���� ���� �Ǵ� "string", "number" �� �Է��� �� �ֽ��ϴ�.<br>�⺻��:<code>undefined</code>

			@var {private optional Object[] | String} JGM.ColDefManager.options.colDef.parser

			@author ����ȣ
			@since 1.3.0
			@version 1.3.0
			*/
			parser: undefined,

			/**
			���͸� �ÿ� ���� �߰� �ɼ� �����Դϴ�. Ŀ���� ���� �Ǵ� "string", "number" �� �Է��� �� �ֽ��ϴ�.<br>�⺻��:<code>undefined</code>
			!!!!!!!!!!
			@var {private optional Object[] | String} JGM.ColDefManager.options.colDef.validator

			@author ����ȣ
			@since 1.3.0
			@version 1.3.0
			*/
			validator: undefined
		}
	};

	this._options = JGM.__extend_e__(options, args.options, {colDef:"__colDef_a__"});

	this.__colDefs_a__ = [];

	this.__filtered_b__ = [];

	this.__keyToDef_c__ = {};

	this.__keyToIdx_d__ = {};

	this.__init(args);
}

ColDefManager.getInstance = function(args) {
	return new ColDefManager(args);
};

var prototype = ColDefManager.prototype;

prototype.__init = function(args) {
	this.grid.event.bind("onDestroy", this.__destroy_aA__, this);
	this.set(args.colDefs);
};

prototype.__destroy_aA__ = function() {
	JGM._destroy(this, {
		name: "ColDefManager",
		path: "colDefMgr",
		property: "__colDefs_a__",
		map: "__keyToIdx_d__ __keyToDef_c__ _options",
		array: "__filtered_b__"
	});
};


/**
���͸� ���� ���� ��� �÷� ���� ��̸� �����մϴ�.

@function {public Object[]} getAll
@returns {Object[]} ��� �÷� ���� ���

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
// tested
prototype.getAll = function() {
	return this.__colDefs_a__;
};


/**
�÷� ���� ��̸� ���մϴ�. �⺻ �÷� ���� �ɼǵ��� �ͽ��ٵ��ϰ� ���͸� �� �÷�
���� ��̸� ���մϴ�.

@function {public} set
@param {optional Object[]} colDefs - �÷� ���� ������Ʈ ���

@author ����ȣ
@since 1.0.0
@version 1.3.0
*/
/*
changelog
1.3.0:
- function: set
@ setAll -> set
+ event: onBeforeSetColDefs, onAfterSetColDefs
+ return: colDefs
*/
// tested
prototype.set = function(colDefs) {
	if (this.__colDefs_a__ === colDefs || Util.areEqualArrays(this.__colDefs_a__, colDefs)) {
		return colDefs;
	}
	
	if (Util.isNull(colDefs)) {
		colDefs = [];
	}
	else {
		var filtered = colDefs.filter(function(a) { return Util.isNotNull(a); });
		colDefs.length = 0;
		colDefs.pushList(filtered);
	}
	
	this.grid.event.trigger("onBeforeSetColDefs", [this.__colDefs_a__, colDefs]);
	
	this.__colDefs_a__ = [];
	this.__filtered_b__.length = 0;
	this.__keyToIdx_d__ = {};
	this.__keyToDef_c__ = {};
	
	this.grid.event.trigger("onEmptyColDefs");
	
	var i = 0,
		len = colDefs.length,
		map = this.__keyToDef_c__,
		col,
		key;
		
	for (; i < len; i++) {
		col = colDefs[i];
		if (!col.hasOwnProperty('key')) {
			this.__keyToDef_c__ = {};
			return this.grid.error("KEY_UNDEFINED", i);
		}
		key = col.key;
      if (Util.isEmptyString(key)) {
			this.__keyToDef_c__ = {};
			return this.grid.error("BAD_NULL", i);
		}
		if (map.hasOwnProperty(key)) {
			this.__keyToDef_c__ = {};
			return this.grid.error("DUP_KEY", key);
		}
		map[key] = col;
	}
	
	this.__colDefs_a__ = colDefs;
		
	for (i = 0; i < len; i++) {
		this.__extend_i__(colDefs[i]);
	}

	this.grid.event.trigger("onAfterSetColDefs", [colDefs, this.__filter_e__()]);
	
	return colDefs;
};


/*
changelog
1.3.0:
+ function: push
+ return: colDefs
*/
// tested
prototype.push = function(colDef) {
	return this.addAt(this.__filtered_b__.length, colDef);
};

/**
�־��� �÷� �ε����� �־��� �÷� ���� ������Ʈ�� �ֽ��ϴ�.

@function {public} addAt
@param {int} i - ���ο� �÷��� ���� �ε���
@param {Object} colDef - ���� �߰��� �÷�

@author ����ȣ
@since 1.0.0
@version 1.3.0
*/
/*
changelog
1.3.0:
+ function: addAt
+ event: onBeforeSetColDefs, onAfterSetColDefs
+ return: colDefs
*/
// tested
prototype.addAt = function(i, colDef) {
	if (Util.isNull(colDef)) {
		return;
	}

	var key = colDef.key,
		map = this.__keyToDef_c__,
		filtered = this.__filtered_b__;

	if (Util.isNull(i) || i > filtered.length) {
		i = filtered.length;
	}
	else if (i < 0) {
		i += filtered.length;
	}
	
	this.grid.event.trigger("onBeforeAddColDef", [colDef]);
	
	if (Util.isNull(key)) {
		return this.grid.error("KEY_UNDEFINED");
	}
	
	if (map.hasOwnProperty(key)) {
		return this.grid.error("DUP_KEY", key);
	}
	
	this.__colDefs_a__.addAt(i, this.__extend_i__(map[key] = colDef));
	
	if (colDef.hidden !== true) {
		filtered.addAt(i, colDef);
      this.__reidx_f__();
	}
	
	this.grid.event.trigger("onAfterAddColDef", [colDef, i]);
	
	return filtered.length;
};

// tested
prototype.__extend_i__ = function(colDef) {
	if (Util.isNull(colDef)) {
		return;
	}
	
	var options = {},
		sorter;
		
	$.extend(true, options, this._options.__colDef_a__);
	$.extend(true, options, colDef);
	$.extend(true, colDef, options);

	colDef.sorter = sorter = ColDefManager.sorter(colDef.sorter, colDef.key);
	
	if (Util.isNotNull(sorter)) {
		sorter.key = colDef.key;
	}
	
	return colDef;
};

/*
changelog
1.3.0:
+ function hide
+ event: onHideCol
+ return: colDef
*/
// tested
prototype.hide = function(i) {
	var colDef = this.__filtered_b__[i];
	if (Util.isNull(colDef)) {
		return;
	}
	
	colDef.hidden = true;
	
	this.__filtered_b__.removeAt(i);
	this.__reidx_f__();
	
	this.grid.event.trigger("onHideCol", [colDef, i]);
	
	return colDef;
};

/*
changelog
1.3.0:
+ function show
+ event: onShowCol
+ return: colDef
*/
// tested
prototype.show = function(key) {
	if (Util.isNull(key)) {
		return;
	}
	
	if (!Util.isString(key)) {
		if (!Util.isObject(key)) {
			return;
		}
		key = key.key;
	}
	
	var map = this.__keyToDef_c__,
		colDef;
	if (!map.hasOwnProperty(key)) {
		return;
	}
	
	if (this.__keyToIdx_d__.hasOwnProperty(key)) {
		return map[key];
	}
	
	colDef = map[key];
	colDef.hidden = false;
	
	this.__filter_e__();
	this.__reidx_f__();
	
	this.grid.event.trigger("onShowCol", [colDef, this.__keyToIdx_d__[key]]);
	
	return colDef;
};

// implicitly tested
prototype.__filter_e__ = function() {
	this.__filtered_b__ = this.__colDefs_a__.filter(function(colDef) {
		return colDef.hidden !== true;
	});
	this.__reidx_f__();
	return this.__filtered_b__;
};

// implicitly tested
prototype.__reidx_f__ = function() {
	this.__keyToIdx_d__ = {};
	return this.__reidxFrom_g__();
};

// implicitly tested
prototype.__reidxFrom_g__ = function(from) {
	if (Util.isNull(from)) {
		from = 0;
	}
	
	var i = from,
		f = this.__filtered_b__,
		len = f.length,
		map = this.__keyToIdx_d__;
		
	for (; i < len; i++) {
		map[f[i].key] = i;
	}
	
	return map;
};

/**
�־��� �÷� �ε����� �ش��ϴ� �÷� ���� ������Ʈ�� �����մϴ�. �ε����� �־�����
���� ��� ���͸��� ��ü ����Ʈ�� �����մϴ�.

@function {public (Object[] | Object)} get
@paramset �ε����� �־����� ���� ���
@returns {Object[]} ȭ�鿡 ������ �÷����� �÷� ���� ������Ʈ ���
@paramset �ε����� �־��� ���
@param {optional int} i - �÷� �ε���
@returns {Object} �־��� �ε����� �÷� ���� ������Ʈ

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
// tested
prototype.get = function(i) {
	if (Util.isNull(i)) {
		return this.__filtered_b__;
	}
	if (this.__filtered_b__.hasOwnProperty(i)) {
		return this.__filtered_b__[i];
	}
};

/**
�÷� Ű�� �´� �÷� ���� ������Ʈ�� �����մϴ�.

@function {public Object} getByKey
@param {String} key - �÷� Ű
@returns {Object} <code>{@link keyToDef}[key]</code>

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
// tested
prototype.getByKey = function(key) {
	if (Util.isNotNull(key) && this.__keyToDef_c__.hasOwnProperty(key)) {
		return this.__keyToDef_c__[key];
	}
};

/**
ȭ�鿡 �������� �÷��� ���� �����մϴ�. ���͸��� �÷� ���� ������Ʈ ��̿� ���̸� �����մϴ�.

@function {public int} length
@returns {int} ȭ�鿡 �������� �÷��� ��

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
// tested
prototype.length = function() {
	return this.__filtered_b__.length;
};


/**
�÷� Ű�� �´� �÷��� �ε����� �����մϴ�.

@function {public int} getIdxByKey
@param {String} key - �÷� Ű
@returns {int} <code>{@link keyToIdx}[key]</code>

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.getIdxByKey = function(key) {
	if (this.__keyToIdx_d__.hasOwnProperty(key)) {
		return this.__keyToIdx_d__[key];
	}
	return -1;
};


/**
�־��� �÷� ���� ������Ʈ�� �ε����� �����մϴ�.

@function {public int} getIdx
@param {String} colDef - �÷� ���� ������Ʈ
@returns {int}  <code>{@link keyToIdx}[colDef.key]</code>

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.getIdx = function(colDef) {
	if (Util.isNotNull(colDef) && this.__keyToIdx_d__.hasOwnProperty(colDef.key)) {
		return this.__keyToIdx_d__[colDef.key];
	}
	return -1;
};


/**
ȭ�鿡 �������� �÷����� �־��� �÷� Ű ��̿� ���缭 �������մϴ�.

@function {public Object[]} sortByKey
@param {String[]} keys - �÷� Ű ���
@returns {Object} ���ĵ� �÷� ���� ������Ʈ ���

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.sortByKey = function(keys) {
	this.__filtered_b__.length = 0;
	this.__keyToIdx_d__ = {};
	
	var i = 0,
		len = keys.length,
		f = this.__filtered_b__,
		map = this.__keyToIdx_d__,
		dmap = this.__keyToDef_c__;
		
	for (; i < len; i++) {
		f.push(dmap[keys[i]]);
		map[keys[i]] = i;
	}
	
	/**
	�׸��� �÷� ������ ����Ǿ��� ��� �߻��ϴ� �̺�Ʈ �Դϴ�.
	
	@event {Event} onReorderCols
	@param {String[]} keys - ���� ���ĵ� �÷� Ű ����

	@author ����ȣ
	@since 1.2.1
	@version 1.2.1
	*/
	this.grid.event.trigger("onReorderCols", keys);
	return this.__filtered_b__;
};

prototype.getKeys = function() {
	return this.__filtered_b__.map(function(def) { return def.key; });
}

/**
�⺻���� ���� ������Ʈ�� �����Ͽ� �����մϴ�. ���� ���� ������ �Դϴ�. ������
���� ���� ����� "text", ������ ���ϴ� "int", �Ҽ��� ���ϴ� "float" ��
�ֽ��ϴ�.

@function {public static Object} sorter
@param {String} type - ���� ���� Ÿ�� ("text" | "int" | "float")
@param {String} key - �÷� Ű
@param {optional Boolean} on - ���� ������Ʈ�� �ʱ� Ȱ��ȭ ����
@returns {Object} ���� ������Ʈ�� �����մϴ�.

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
ColDefManager.sorter = function(type, key, on) {
	on = on ? true : false;

	if (type === "text") {
		return { lexi: key, on: on, key:key};
	}
	if (type === "int") {
		return {
			on: on,
			comparator: function(a, b) {
				var aVal = a[key],
					bVal = b[key];
				if (Util.isNull(aVal)) {
					aVal = Number.MAX_VALUE;
				}
				else if (typeof aVal === "string") {
					aVal = aVal.toInt();
				}
				if (Util.isNull(bVal)) {
					bVal = Number.MAX_VALUE;
				}
				else if (typeof bVal === "string") {
					bVal = bVal.toInt();
				}
				
				return aVal - bVal;
			},
			key:key
		};
	}
	if (type === "float �ѱ� tehu") {
		return {
			on: on,
			comparator: function(a, b) {
				var aVal = a[key],
					bVal = b[key];
				if (Util.isNull(aVal)) {
					aVal = Number.MAX_VALUE;
				}
				else if (typeof aVal === "string") {
					aVal = aVal.toFloat();
				}
				if (Util.isNull(bVal)) {
					bVal = Number.MAX_VALUE;
				}
				else if (typeof bVal === "string") {
					bVal = bVal.toFloat();
				}
				return aVal - bVal;
			},
			key:key
		};
	}
};

JGM._add("ColDefManager", ColDefManager);
}());

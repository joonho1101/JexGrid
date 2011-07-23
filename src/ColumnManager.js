goog.require('array_extension');
goog.require('engine_extension');
goog.require('jx.util');
goog.require('jx.grid');
goog.require('jx.grid.BaseModule');
goog.require('jx.grid.Column');

goog.provide('jx.grid.ColumnManager');

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
	Column = goog.getObjectByName('jx.grid.Column');

 goog.exportSymbol('jx.grid.ColumnManager', ColDefManager);
 JGM._add("ColDefManager", ColDefManager);

/**
ColDefManager ���. �׸��� �� ���� ������� ���� �Լ����� ���� ����Դϴ�.
@module ColDefManager
 */

/**
ColDefManager Ŭ����. �׸��� �÷� ���� ������Ʈ�� �����ϴ� ����Դϴ�.

@class {ColDefManager} JGM.ColDefManager

@author ����ȣ
@since 1.0.0
@version 1.2.1
*/

/**
ColDefManager ����Ʈ���� �Դϴ�.

@constructor {ColDefManager} ColDefManager
@param {Object} args - ColDefManager ��� �Ķ���� ������Ʈ
@... {Array.<Object>} args.colDefs - �÷� ���� ������Ʈ ���
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

	@var {string} mid

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.mid = args.mid;

	/**
	ColDefManager �� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�.

	@var {JGM.Grid} grid

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid = args.grid;

	/**
	�׸��� �÷� ���Ǹ� �����ϴ� {@link JGM.ColDefManager ColDefManager} �ν��Ͻ� �Դϴ�.

	@var {JGM.ColDefManager} JGM.Grid.colDefMgr

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid.colDefMgr = this;

	/**
	ColDefManager ����� �⺻ �ɼ� ������ �����մϴ�.

	@type {Object} options
	@private

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	var options = {
		/**
		�� �÷��� �÷� ���� ������Ʈ�� �ͽ��ٵ� �� �� ���� �⺻ �÷� ����
		�ɼ��Դϴ�.

		@type {Object=} JGM.ColDefManager.options.colDef
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		__colDef_a__: {
			/**
			�ο� �����Ϳ��� �ش� �÷� �����͸� ������ �� ���Ǵ� Ű�Դϴ�. �÷�
			���� ������Ʈ���� �ʼ������� �� �÷����� ����ũ�� Ű ���� ���������
			�մϴ�. <br>�⺻��:<code>undefined</code>

			@type {string=} JGM.ColDefManager.options.colDef.key
			@private

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			key:			undefined,

			/**
			�÷� �̸�. �� ���� ������ ��� �÷� ����� key �� ��� �� ����
			�̸����� ��� ǥ���մϴ�. <br>�⺻��:<code>""</code>

			@type {string=} JGM.ColDefManager.options.colDef.name
			@private

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			name:			"",

			/**
			�÷� �� ���鿡 ����Ǵ� CSS Ŭ����. <br>�⺻��:<code>undefined</code>

			@type {string=} JGM.ColDefManager.options.colDef.colClass
			@private

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			colClass:		undefined,

			/**
			���ο� �ο� �����͸� �����ϰų� ���� �����͸� del Ű�� ������ �������� ��쿡
			�÷��� �ڵ������� ä������ �÷��� �⺻ ���Դϴ�. <br>�⺻��:<code>undefined</code>

			@type {?=} JGM.ColDefManager.options.colDef.defaultValue
			@private

			@author ����ȣ
			@since 1.1.1
			@version 1.1.1
			*/
			defaultValue:		undefined,

			/**
			{@link JGM.DataCreator DataCreator} �� ����Ͽ� ���ο� �ο� �����͸� ������ ���,
			�ο� �������� �÷� ���� ���������� �Է������� �����Դϴ�. <br>�⺻��:<code>undefined</code>

			@type {boolean=} JGM.ColDefManager.options.colDef.inputOnCreate
			@private

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

			@type {string=} JGM.ColDefManager.options.colDef.style
			@private

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

			@type {string=} JGM.ColDefManager.options.colDef.headerStyle
			@private

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			headerStyle:		"",

			/**
			�÷��� �⺻ �� �ȼ�. <br>�⺻��:<code>80</code>

			@type {number=} JGM.ColDefManager.options.colDef.width
			@private

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			width:			80,

			/**
			�÷��� ���� ������ ��� ���Ǵ� �ּ� �� �ȼ�. <br>�⺻��:<code>30</code>

			@type {number=} JGM.ColDefManager.options.colDef.minW
			@private

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			minW:			30,

			/**
			�÷��� ���� ������ ��� ���Ǵ� �ִ� �� �ȼ�. <br>�⺻��:<code>undefined</code>

			@type {number=} JGM.ColDefManager.options.colDef.maxW
			@private

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			maxW:			undefined,

			/**
			�� �������� �� �� ���Ǵ� �÷� ������. <br>�⺻��:<code>undefined</code>

			@type {JGM.Editor=} JGM.ColDefManager.options.colDef.editor
			@private

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			editor:			undefined,

			/**
			�÷� ������ �� ���Ǵ� �÷� ���� ������Ʈ. <br>�⺻��:<code>undefined</code>

			@type {Object=} JGM.ColDefManager.options.colDef.sorter
			@private

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			sorter:			undefined,

			/**
			�÷��� ����� ����. <br>�⺻��:<code>false</code>

			@type {boolean=} JGM.ColDefManager.options.colDef.hidden
			@private

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

			@type {Function=} JGM.ColDefManager.options.colDef.sumRenderer
			@private

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			sumRenderer:		undefined,

			/**
			���콺�� �÷� ������ �÷����� ��� �������� ������ Ȱ�� ����. <br>�⺻��:<code>false</code>

			@type {boolean=} JGM.ColDefManager.options.colDef.tooltipEnabled
			@private

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			tooltipEnabled:	false,

			/**
			�÷��� �� ���� ���� ����. <br>�⺻��:<code>false</code>

			@type {boolean=} JGM.ColDefManager.options.colDef.resizable
			@private

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

			@type {Function=} JGM.ColDefManager.options.colDef.renderer
			@private
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

			@type {boolean=} JGM.ColDefManager.options.colDef.rendererInput
			@private

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			rendererInput:	false,

			/**
			�÷� ����� Ÿ��Ʋ attribute �Է� ����. <br>�⺻��:<code>false</code>

			@type {boolean=} JGM.ColDefManager.options.colDef.noTitle
			@private

			@author ����ȣ
			@since 1.1.7
			@version 1.1.7
			*/
			noTitle: false,

			/**
			�÷� ����� �̸��� �Է� ����. <br>�⺻��:<code>false</code>

			@type {boolean=} JGM.ColDefManager.options.colDef.noName
			@private

			@author ����ȣ
			@since 1.1.7
			@version 1.1.7
			*/
			noName: false,

			/**
			�÷� ����� �Է��� Ÿ��Ʋ attribute �� ����. <br>�⺻��:<code>undefined</code>

			@type {string=} JGM.ColDefManager.options.colDef.title
			@private

			@author ����ȣ
			@since 1.1.7
			@version 1.1.7
			*/
			title: undefined,

			/**
			�÷��� ���͸� �ÿ� �˻��� ���ԵǴ��� ����.<br>�⺻��:<code>false</code>

			@type {boolean=} JGM.ColDefManager.options.colDef.noSearch
			@private

			@author ����ȣ
			@since 1.2.0
			@version 1.2.0
			*/
			noSearch: false,

			/**
			���͸� �ÿ� ���� �߰� �ɼ� �����Դϴ�. Ŀ���� ���� �Ǵ� "string", "number" �� �Է��� �� �ֽ��ϴ�.<br>�⺻��:<code>undefined</code>

			@type {Array.<Object> | string=} JGM.ColDefManager.options.colDef.filter
			@private

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

			@type {Array.<Object> | string=} JGM.ColDefManager.options.colDef.parser
			@private

			@author ����ȣ
			@since 1.3.0
			@version 1.3.0
			*/
			parser: undefined,

			/**
			���͸� �ÿ� ���� �߰� �ɼ� �����Դϴ�. Ŀ���� ���� �Ǵ� "string", "number" �� �Է��� �� �ֽ��ϴ�.<br>�⺻��:<code>undefined</code>
			!!!!!!!!!!
			@type {Array.<Object> | string=} JGM.ColDefManager.options.colDef.validator
			@private

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

@function {Array.<Object>} getAll
@returns {Array.<Object>} ��� �÷� ���� ���

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

@function {} set
@param {Array.<Object>=} colDefs - �÷� ���� ������Ʈ ���

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

@function {} addAt
@param {number} i - ���ο� �÷��� ���� �ε���
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

@function {(Array.<Object> | Object)} get
@paramset �ε����� �־����� ���� ���
@returns {Array.<Object>} ȭ�鿡 ������ �÷����� �÷� ���� ������Ʈ ���
@paramset �ε����� �־��� ���
@param {int=} i - �÷� �ε���
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

@function {Object} getByKey
@param {string} key - �÷� Ű
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

@function {number} length
@returns {number} ȭ�鿡 �������� �÷��� ��

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

@function {number} getIdxByKey
@param {string} key - �÷� Ű
@returns {number} <code>{@link keyToIdx}[key]</code>

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

@function {number} getIdx
@param {string} colDef - �÷� ���� ������Ʈ
@returns {number}  <code>{@link keyToIdx}[colDef.key]</code>

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

@function {Array.<Object>} sortByKey
@param {Array.<string>} keys - �÷� Ű ���
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
	@param {Array.<string>} keys - ���� ���ĵ� �÷� Ű ����

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

@function {Object} sorter
@param {string} type - ���� ���� Ÿ�� ("text" | "int" | "float")
@param {string} key - �÷� Ű
@param {boolean=} on - ���� ������Ʈ�� �ʱ� Ȱ��ȭ ����
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
}());

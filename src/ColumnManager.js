console && console.log && console.log('reading javascript source "ColumnManager.js"...');//IF_DEBUG

goog.require('array_extension');
goog.require('engine_extension');
goog.require('jx.util');
goog.require('jx.grid');
goog.require('jx.grid.BaseModule');
goog.require('jx.grid.Column');
goog.require('jx.grid.ViewportManager');

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
	Column = goog.getObjectByName('jx.grid.Column'),
	ViewportManager = goog.getObjectByName('jx.grid.ViewportManager');

 goog.exportSymbol('jx.grid.ColumnManager', ColumnManager);

/**
ColumnManager ���. �׸��� �� ���� ������� ���� �Լ����� ���� ����Դϴ�.
@module ColumnManager
 */

/**
ColumnManager Ŭ����. �׸��� �÷� ���� ������Ʈ�� �����ϴ� ����Դϴ�.

@class {ColumnManager} jx.grid.ColumnManager

@author ����ȣ
@since 1.0.0
@version 1.2.1
*/

/**
ColumnManager ����Ʈ���� �Դϴ�.

@constructor {ColumnManager} ColumnManager
@param {Object} args - ColumnManager ��� �Ķ���� ������Ʈ
@... {Array.<Object>} args.colDefs - �÷� ���� ������Ʈ ���
@... {jx.grid.Grid} args.grid - ColumnManager �� �����ϴ� {@link jx.grid.Grid} �ν��Ͻ�
@... {Object} args.options - ColumnManager �ɼ� ������Ʈ
@returns {ColumnManager} ColumnManager ��� �ν��Ͻ��� �����մϴ�.

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
function ColumnManager(args) {
	/**
	{@link JGM} �� �Ҵ����ִ� ColumnManager ��� ���� ���̵��Դϴ�. �б� ����.

	@var {string} mid

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.mid = args.mid;

	/**
	ColumnManager �� �����ϴ� {@link jx.grid.Grid} �ν��Ͻ�.

	@var {jx.grid.Grid} grid

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid = args.grid;

	/**
	�׸��� �÷� ���Ǹ� �����ϴ� {@link jx.grid.ColumnManager ColumnManager} �ν��Ͻ� �Դϴ�.

	@var {jx.grid.ColumnManager} jx.grid.Grid.colDefMgr

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid['colDefMgr'] = this;

	/**
	ColumnManager ����� �⺻ �ɼ� ������ �����մϴ�.

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

		@type {Object=} jx.grid.ColumnManager.options.colDef
		@private

		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'colDef': {
			'type': 'string',

			/**
			�ο� �����Ϳ��� �ش� �÷� �����͸� ������ �� ���Ǵ� Ű�Դϴ�. �÷�
			���� ������Ʈ���� �ʼ������� �� �÷����� ����ũ�� Ű ���� ���������
			�մϴ�. <br>�⺻��:<code>undefined</code>

			@type {string=} jx.grid.ColumnManager.options.colDef.key
			@private

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			'key':			undefined,

			/**
			�÷� �̸�. �� ���� ������ ��� �÷� ����� key �� ��� �� ����
			�̸����� ��� ǥ���մϴ�. <br>�⺻��:<code>""</code>

			@type {string=} jx.grid.ColumnManager.options.colDef.name
			@private

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			'name':			"",

			/**
			�÷� �� ���鿡 ����Ǵ� CSS Ŭ����. <br>�⺻��:<code>undefined</code>

			@type {string=} jx.grid.ColumnManager.options.colDef.colClass
			@private

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			'colClass':		undefined,

			/**
			���ο� �ο� �����͸� �����ϰų� ���� �����͸� del Ű�� ������ �������� ��쿡
			�÷��� �ڵ������� ä������ �÷��� �⺻ ���Դϴ�. <br>�⺻��:<code>undefined</code>

			@type {?=} jx.grid.ColumnManager.options.colDef.defaultValue
			@private

			@author ����ȣ
			@since 1.1.1
			@version 1.1.1
			*/
			'defaultValue':		undefined,

			/**
			{@link JGM.DataCreator DataCreator} �� ����Ͽ� ���ο� �ο� �����͸� ������ ���,
			�ο� �������� �÷� ���� ���������� �Է������� �����Դϴ�. <br>�⺻��:<code>undefined</code>

			@type {boolean=} jx.grid.ColumnManager.options.colDef.inputOnCreate
			@private

			@author ����ȣ
			@since 1.1.1
			@version 1.1.1
			*/
			'inputOnCreate':		undefined,

			/**
			�÷� �� ���鿡 ���������� ����Ǵ� CSS style �Դϴ�.<br>
			������ ��: �� �ɼǿ� �Էµ� style �� ����Ǿ����� DOM �� ũ�Ⱑ ���ϸ� �׸����� �������� ũ�� ��꿡 ������ ����ϴ�.
			��, ũ�⿡ ������ ���� style ������ �Ҷ��� ����ϼ���.
			<br>�⺻��:<code>""</code>

			@type {string=} jx.grid.ColumnManager.options.colDef.style
			@private

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			'style':		"",

			/**
			�÷� ������� ����Ǵ� CSS style �Դϴ�.<br>
			������ ��: �� �ɼǿ� �Էµ� style �� ����Ǿ����� DOM �� ũ�Ⱑ ���ϸ� �׸����� �������� ũ�� ��꿡 ������ ����ϴ�.
			��, ũ�⿡ ������ ���� style ������ �Ҷ��� ����ϼ���.
			<br>�⺻��:<code>""</code>

			@type {string=} jx.grid.ColumnManager.options.colDef.headerStyle
			@private

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			'headerStyle':		"",

			/**
			�÷��� �⺻ �� �ȼ�. <br>�⺻��:<code>80</code>

			@type {number=} jx.grid.ColumnManager.options.colDef.width
			@private

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			'width':			80,

			/**
			�÷��� ���� ������ ��� ���Ǵ� �ּ� �� �ȼ�. <br>�⺻��:<code>30</code>

			@type {number=} jx.grid.ColumnManager.options.colDef.minW
			@private

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			'minW':			30,

			/**
			�÷��� ���� ������ ��� ���Ǵ� �ִ� �� �ȼ�. <br>�⺻��:<code>undefined</code>

			@type {number=} jx.grid.ColumnManager.options.colDef.maxW
			@private

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			'maxW':			undefined,

			/**
			�� �������� �� �� ���Ǵ� �÷� ������. <br>�⺻��:<code>undefined</code>

			@type {jx.grid.Editor=} jx.grid.ColumnManager.options.colDef.editor
			@private

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			'editor':			undefined,

			/**
			�÷� ������ �� ���Ǵ� �÷� ���� ������Ʈ. <br>�⺻��:<code>undefined</code>

			@type {Object=} jx.grid.ColumnManager.options.colDef.sorter
			@private

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			'sorter':			undefined,

			/**
			�÷��� ����� ����. <br>�⺻��:<code>false</code>

			@type {boolean=} jx.grid.ColumnManager.options.colDef.hidden
			@private

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			'hidden':			false,

			/**
			�÷� ������ �հ��� {@link JGM.Footer Footer} �� ǥ�� ����.
			"krw" �Է½� \ 10,000,000 �������� �������ϸ�, "usd" �Է½� $ 10,000,000.00 �������� ������ �մϴ�.
			�Լ� �Է½� �÷���� �հ� ���� �Ķ���ͷ� �޽��ϴ�.
			<br>�⺻��:<code>undefined</code>

			@type {Function=} jx.grid.ColumnManager.options.colDef.sumRenderer
			@private

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			'sumRenderer':		undefined,

			/**
			���콺�� �÷� ������ �÷����� ��� �������� ������ Ȱ�� ����. <br>�⺻��:<code>false</code>

			@type {boolean=} jx.grid.ColumnManager.options.colDef.tooltipEnabled
			@private

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			'tooltipEnabled':	false,

			/**
			�÷��� �� ���� ���� ����. <br>�⺻��:<code>false</code>

			@type {boolean=} jx.grid.ColumnManager.options.colDef.resizable
			@private

			@author ����ȣ
			@since 1.1.2
			@version 1.1.2
			*/
			'resizable':		false,

			/**
			�÷� �� ������.
			�������� �Ķ���ͷ� {@link jx.grid.Cell Cell} �ν��Ͻ� �Ǵ�
			value, rowIdx, colIdx, datarow, colDef, {@link jx.grid.ViewportManager ViewportManager} �� ������� �ް�,
			�� HTML �� �����ϴ� Function �Դϴ�.
			<br>�⺻��:�⺻ �ؽ�Ʈ ������

			@type {Function=} jx.grid.ColumnManager.options.colDef.renderer
			@private
			@see jx.grid.ColumnManager.options.colDef.rendererInput

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			'renderer':		ViewportManager._renderer,

			/**
			�÷� �� {@link jx.grid.ColumnManager.options.colDef.renderer renderer} �Լ��� ���� �Ķ���� Ÿ���� ���ϴ� �ɼ�. true �� ��쿡��
			{@link jx.grid.Cell Cell} �ν��Ͻ��� ������, false �� ��쿡�� ������ �Ķ���͵��� ������� �����ϴ�. <br>
			value(�� ��), rowIdx(�ο� �ε���), colIdx(�÷� �ε���), datarow(�ο� ������), colDef(�÷� ���� ������Ʈ), {@link jx.grid.ViewportManager ViewportManager}
			<br>�⺻��:<code>false</code>

			@type {boolean=} jx.grid.ColumnManager.options.colDef.rendererInput
			@private

			@author ����ȣ
			@since 1.0.0
			@version 1.0.0
			*/
			'rendererInput':	false,

			/**
			�÷� ����� Ÿ��Ʋ attribute �Է� ����. <br>�⺻��:<code>false</code>

			@type {boolean=} jx.grid.ColumnManager.options.colDef.noTitle
			@private

			@author ����ȣ
			@since 1.1.7
			@version 1.1.7
			*/
			'noTitle': false,

			/**
			�÷� ����� �̸��� �Է� ����. <br>�⺻��:<code>false</code>

			@type {boolean=} jx.grid.ColumnManager.options.colDef.noName
			@private

			@author ����ȣ
			@since 1.1.7
			@version 1.1.7
			*/
			'noName': false,

			/**
			�÷� ����� �Է��� Ÿ��Ʋ attribute �� ����. <br>�⺻��:<code>undefined</code>

			@type {string=} jx.grid.ColumnManager.options.colDef.title
			@private

			@author ����ȣ
			@since 1.1.7
			@version 1.1.7
			*/
			'title': undefined,

			/**
			�÷��� ���͸� �ÿ� �˻��� ���ԵǴ��� ����.<br>�⺻��:<code>false</code>

			@type {boolean=} jx.grid.ColumnManager.options.colDef.noSearch
			@private

			@author ����ȣ
			@since 1.2.0
			@version 1.2.0
			*/
			'noSearch': false,

			/**
			���͸� �ÿ� ���� �߰� �ɼ� �����Դϴ�. Ŀ���� ���� �Ǵ� "string", "number" �� �Է��� �� �ֽ��ϴ�.<br>�⺻��:<code>undefined</code>

			@type {Array.<Object> | string=} jx.grid.ColumnManager.options.colDef.filter
			@private

			@author ����ȣ
			@since 1.2.0
			@version 1.2.0
			*/
			'filter': undefined,

			/**
			������ parsing �� ����ϴ� �Լ��Դϴ�. �׸��忡 �Էµǰų� ������ ����Ǵ� ��� �����ʹ� �� �Լ��� ���ؼ�
			parsing �� �˴ϴ�.
			!!!!!!!!!!!!!!!
			Ŀ���� ���� �Ǵ� "string", "number" �� �Է��� �� �ֽ��ϴ�.<br>�⺻��:<code>undefined</code>

			@type {Array.<Object> | string=} jx.grid.ColumnManager.options.colDef.parser
			@private

			@author ����ȣ
			@since 1.3.0
			@version 1.3.0
			*/
			'parser': undefined,

			/**
			���͸� �ÿ� ���� �߰� �ɼ� �����Դϴ�. Ŀ���� ���� �Ǵ� "string", "number" �� �Է��� �� �ֽ��ϴ�.<br>�⺻��:<code>undefined</code>
			!!!!!!!!!!
			@type {Array.<Object> | string=} jx.grid.ColumnManager.options.colDef.validator
			@private

			@author ����ȣ
			@since 1.3.0
			@version 1.3.0
			*/
			'validator': undefined
		}
	};

	this._options = JGM._extend(options, args['options']);

	this._colDefs = [];

	this._filtered = [];

	this._keyToDef = {};

	this._keyToIdx = {};

	this.__init(args);
}

ColumnManager.getInstance = function(args) {
	return new ColumnManager(args);
};

var prototype = ColumnManager.prototype;

prototype.__init = function(args) {
	this.grid['event'].bind("onDestroy", this._destroy, this);
	this.set(args['colDefs']);
};

prototype._destroy = function() {
	JGM._destroy(this, {
		name: "ColumnManager",
		path: "colDefMgr",
		property: "_colDefs",
		map: "_keyToIdx _keyToDef _options",
		array: "_filtered"
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
	return this._colDefs;
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
	if (this._colDefs === colDefs || Util.areEqualArrays(this._colDefs, colDefs)) {
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
	
	this.grid['event'].trigger("onBeforeSetColDefs", [this._colDefs, colDefs]);
	
	this._colDefs = [];
	this._filtered.length = 0;
	this._keyToIdx = {};
	this._keyToDef = {};
	
	this.grid['event'].trigger("onEmptyColDefs");
	
	var i = 0,
		len = colDefs.length,
		map = this._keyToDef,
		col,
		key;
		
	for (; i < len; i++) {
		col = colDefs[i];
		if (!col.hasOwnProperty('key')) {
			this._keyToDef = {};
			return this.grid['error']("KEY_UNDEFINED", i);
		}
		key = col.key;
      if (Util.isEmptyString(key)) {
			this._keyToDef = {};
			return this.grid['error']("BAD_NULL", i);
		}
		if (map.hasOwnProperty(key)) {
			this._keyToDef = {};
			return this.grid['error']("DUP_KEY", key);
		}
		map[key] = col;
	}
	
	this._colDefs = colDefs;
		
	for (i = 0; i < len; i++) {
		this._extend(colDefs[i]);
	}

	this.grid['event'].trigger("onAfterSetColDefs", [colDefs, this._filter()]);
	
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
	return this.addAt(this._filtered.length, colDef);
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

	var key = colDef['key'],
		map = this._keyToDef,
		filtered = this._filtered;

	if (Util.isNull(i) || i > filtered.length) {
		i = filtered.length;
	}
	else if (i < 0) {
		i += filtered.length;
	}
	
	this.grid['event'].trigger("onBeforeAddColDef", [colDef]);
	
	if (Util.isNull(key)) {
		return this.grid['error']("KEY_UNDEFINED");
	}
	
	if (map.hasOwnProperty(key)) {
		return this.grid['error']("DUP_KEY", key);
	}
	
	this._colDefs.addAt(i, this._extend(map[key] = colDef));
	
	if (colDef['hidden'] !== true) {
		filtered.addAt(i, colDef);
      this._reidx();
	}
	
	this.grid['event'].trigger("onAfterAddColDef", [colDef, i]);
	
	return filtered.length;
};

function normalizeType(type) {
	if (type) {
		type = type.toLowerCase();
		switch (type) {
			case 'bool':
			case 'boolean':
				return 'boolean';
			case 'int':
			case 'integer':
			case 'long':
			case 'short':
				return 'int';
			case 'float':
			case 'double':
			case 'number':
			case 'num':
			case 'numeric':
				return 'float';
			case 'str':
			case 'string':
			case 'text':
				return 'string';
			case 'date':
			case 'datetime':
			case 'time':
			case 'timestamp':
				return 'date';
		}
	}
	return null;
}

// tested
prototype._extend = function(colDef) {
	if (colDef) {
		var options = {},
			sorter,
			parser,
			type,
			key;

		$.extend(true, options, this._options['colDef']);
		$.extend(true, options, colDef);
		$.extend(true, colDef, options);

		// normalize data type into boolean | int | float | string | date
		type = colDef['type'] = normalizeType(colDef['type']);

		key = colDef['key'];
		if (key != null && typeof key != 'string') {
			// stringify
			colDef['key'] = key = key.toString();
		}
		if (!key) {
			throw new Error('column key is not defined!');
		}

		sorter = colDef['sorter'];
		if (sorter) {
			if (typeof sorter == 'string') {
				sorter = normalizeType(sorter);
			}
			else if (type) {
				sorter = type;
			}
			sorter = ColumnManager.sorter(sorter, key);
			if (sorter) {
				sorter.key = key;
			}
			colDef['sorter'] = sorter;
		}

		parser = colDef['parser'];
		if (parser) {
			if (type && typeof parser != 'function') {
				switch (type) {
					case 'boolean':
						parser = parseBoolean;
						break;
					case 'int':
						parser = parseInt;
						break;
					case 'float':
						parser = parseFloat;
						break;
					case 'string':
						parser = parseString;
						break;
					case 'date':
						parser = parseDate;
						break;
					default:
						parser = null;
				}
				colDef['parser'] = parser;
			}
		}
	}
	return colDef;
};

function parseBoolean(v) {
	if (typeof v != 'boolean') {
		if (!v) {
			return false;
		}
		switch (v.toString().toLowerCase()) {
			case '0':
			case 'n':
			case 'no':
			case 'false':
			case 'f':
			case 'off':
			case 'disable':
			case 'disabled':
			// additional
			case 'null':
			case 'undefined':
			case 'nil':
			case 'fail':
			case 'not':
				return false;
		}
		return true;
	}
	return v;
}

function parseString(v) {
	if (typeof v != 'string') {
		if (v == null) {
			return '';
		}
		return v.toString();
	}
	return v;
}

function parseDate(v) {
	return new Date(Date.parse(v));
}

/*
changelog
1.3.0:
+ function hide
+ event: onHideCol
+ return: colDef
*/
// tested
prototype.hide = function(i) {
	var colDef = this._filtered[i];
	if (Util.isNull(colDef)) {
		return;
	}
	
	colDef['hidden'] = true;
	
	this._filtered.removeAt(i);
	this._reidx();
	
	this.grid['event'].trigger("onHideCol", [colDef, i]);
	
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
	
	var map = this._keyToDef,
		colDef;
	if (!map.hasOwnProperty(key)) {
		return;
	}
	
	if (this._keyToIdx.hasOwnProperty(key)) {
		return map[key];
	}
	
	colDef = map[key];
	colDef['hidden'] = false;
	
	this._filter();
	this._reidx();
	
	this.grid['event'].trigger("onShowCol", [colDef, this._keyToIdx[key]]);
	
	return colDef;
};

// implicitly tested
prototype._filter = function() {
	this._filtered = this._colDefs.filter(function(colDef) {
		return colDef['hidden'] !== true;
	});
	this._reidx();
	return this._filtered;
};

// implicitly tested
prototype._reidx = function() {
	this._keyToIdx = {};
	return this._reidxFrom();
};

// implicitly tested
prototype._reidxFrom = function(from) {
	if (Util.isNull(from)) {
		from = 0;
	}
	
	var i = from,
		f = this._filtered,
		len = f.length,
		map = this._keyToIdx;
		
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
		return this._filtered;
	}
	if (this._filtered.hasOwnProperty(i)) {
		return this._filtered[i];
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
	if (Util.isNotNull(key) && this._keyToDef.hasOwnProperty(key)) {
		return this._keyToDef[key];
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
	return this._filtered.length;
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
	if (this._keyToIdx.hasOwnProperty(key)) {
		return this._keyToIdx[key];
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
	if (Util.isNotNull(colDef) && this._keyToIdx.hasOwnProperty(colDef['key'])) {
		return this._keyToIdx[colDef['key']];
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
	this._filtered.length = 0;
	this._keyToIdx = {};
	
	var i = 0,
		len = keys.length,
		f = this._filtered,
		map = this._keyToIdx,
		dmap = this._keyToDef;
		
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
	this.grid['event'].trigger("onReorderCols", keys);
	return this._filtered;
};

prototype.getKeys = function() {
	return this._filtered.map(function(def) { return def.key; });
}

function toNumber(a, fn) {
	switch (typeof a) {
		case 'undefined':
			return Number.MAX_VALUE;
		case 'boolean':
			return a ? 1 : 0;
		case 'number':
			return a;
		case 'string':
			return a[fn]();
		default:
			if (a == null) {
				return Number.MAX_VALUE;
			}
	}
	a = a.valueOf();
	switch (typeof a) {
		case 'undefined':
			return Number.MAX_VALUE;
		case 'boolean':
			return a ? 1 : 0;
		case 'number':
			return a;
		case 'string':
			return a[fn]();
		default:
			if (a == null) {
				return Number.MAX_VALUE;
			}
			return a.toString()[fn]();
	}
}

function toBoolean(a) {
	switch (typeof a) {
		case 'undefined':
			return Number.MAX_VALUE;
		case 'boolean':
			return a ? 1 : 0;
		case 'number':
			return a;
	}
	return a == null ? Number.MAX_VALUE : (parseBoolean(a) ? 1 : 0);
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
ColumnManager.sorter = function(type, key, on) {
	var sorter = {on:!!on, key:key};
	var MAX = Number.MAX_VALUE;
	switch (type) {
		case 'boolean':
			sorter['comparator'] = function(a, b) {
				return toBoolean(a[key]) - toBoolean(b[key]);
			};
			return sorter;
		case 'string':
			sorter['lexi'] = key;
			return sorter;
		case 'int':
			sorter['comparator'] = function(a, b) {
				return toNumber(a[key], 'toInt') - toNumber(b[key], 'toInt');
			};
			return sorter;
		case 'float':
			sorter['comparator'] = function(a, b) {
				return toNumber(a[key], 'toFloat') - toNumber(b[key], 'toFloat');
			};
			return sorter;
		case 'date':
			sorter['comparator'] = function(a, b) {
				return toNumber(a[key], 'toInt') - toNumber(b[key], 'toInt');
			};
			return sorter;
	}
	return null;
};
}());

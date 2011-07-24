goog.require('jx.util');
goog.require('jx.lang.Disposable');
goog.require('jx.grid');
goog.require('jx.grid.Grid');
goog.require('jx.grid.ColumnManager');
goog.require('jx.data.DataManager');

goog.provide('jx.grid.Cell');

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
	Disposable = goog.getObjectByName('jx.lang.Disposable');

goog.exportSymbol('jx.grid.Cell', Cell);
JGM._add("Cell", Cell);


/**
  Cell ���. �׸��� �� ���� ������� ���� �Լ����� ���� ����Դϴ�.
  @module jx.grid.Cell
  @requires jx.grid
  @requires jx.grid.Grid
  @requires jx.grid.ColDefManager
  @requires jx.grid.DataManager
  @requires jx.grid.ViewportManager
  */

/**
  Cell Ŭ����. �׸��� �� ���� ������� ���� �Լ����� ���� ����Դϴ�.

  @class {Cell} JGM.Cell

  @author ����ȣ
  @since 1.0.0
  @version 1.0.0
  */

/**
  Cell ����Ʈ���� �Դϴ�.

  @constructor {Cell} Cell
  @paramset �� �ε����� ����� ���
  @param {Object} args - Cell ��� �Ķ���� ������Ʈ
  @... {JGM.Grid} args.grid - ���� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�
  @... {number} args.row - ���� �ο� �ε���
  @... {number} args.col - ���� �÷� �ε���
  @paramset �� DOM ��带 ����� ���
  @param {Object} args - Cell ��� �Ķ���� ������Ʈ
  @... {JGM.Grid} args.grid - ���� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�
  @... {DOMElement} args.node - ���� DOM ���
  @paramset �� DOM ��带 ���� jQuery ������Ʈ�� ����� ���
  @param {Object} args - Cell ��� �Ķ���� ������Ʈ
  @... {JGM.Grid} args.grid - ���� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�
  @... {jQuery} args.$ - ���� DOM ��带 ���� jQuery �ν��Ͻ�
  @paramset �� �ο� �����Ϳ� �÷� ���Ǹ� ����� ���
  @param {Object} args - Cell ��� �Ķ���� ������Ʈ
  @... {JGM.Grid} args.grid - ���� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�
  @... {Object} args.datarow - ���� �ο� ������ ������Ʈ
  @... {Object} args.colDef - ���� �÷� ���� ������Ʈ
  @paramset jQuery Event�� ����� ���
  @param {Object} args - Cell ��� �Ķ���� ������Ʈ
  @... {JGM.Grid} args.grid - ���� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�
  @... {jQuery.Event} args.event - �� DOM ��忡 ���ϴ� DOM ��带 target ����
  ���� jQuery Event ������Ʈ
  @returns {Cell} Cell ��� �ν��Ͻ��� �����մϴ�.

  @author ����ȣ
  @since 1.0.0
  @version 1.0.0
  */
function Cell(args) {
	/**
	  ���� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�.

	  @var {JGM.Grid} grid

	  @author ����ȣ
	  @since 1.0.0
	  @version 1.0.0
	  */
	this.grid = args['grid'];

	this._datarow = args['datarow'];

	this._colDef = args['colDef'];

	this.__init(args);
}

goog.inherits(Cell, Disposable);


Cell.getInstance = function(args) {
	return new Cell(args);
};

var prototype = Cell.prototype,
	sdispose = Disposable.prototype.dispose;

prototype.dispose = function() {
	sdispose.call(this);
}

prototype.__init = function(args) {
	if (Util.isNull(this._datarow)) {
		if (Util.isNotNull(args['row'])) {
			this._datarow = this.grid['dataMgr'].getByIdx(args['row']);
		}
		else if (Util.isNotNull(args['node'])) {
			this._datarow = this.grid['dataMgr'].getByNode(args['node'].parentNode);
		}
		else if (Util.isNotNull(args['$'])) {
			this._datarow = this.grid['dataMgr'].getByNode(args['$'][0].parentNode);
		}
	}
	if (Util.isNull(this._colDef)) {
		if (Util.isNotNull(args['col'])) {
			this._colDef = this.grid['colDefMgr'].get(args['col']);
		}
		else if (Util.isNotNull(args['node'])) {
			this._colDef = this.grid['colDefMgr'].get(Util.index(args['node']));
		}
		else if (Util.isNotNull(args['$'])) {
			this._colDef = this.grid['colDefMgr'].get(Util.index(args['$'][0]));
		}
	}
	if (Util.isNullOr(this._datarow, this._colDef) && Util.isNotNull(args['event'])) {
		var node = this.grid['view']._getClosestCell(args['event'].target);
		if (Util.isNotNull(node)) {
			this._datarow = this.grid['dataMgr'].getByNode(node.parentNode);
			this._colDef = this.grid['colDefMgr'].get(Util.index(node));
		}
	}
};

prototype.destroy = function() {
	this.dispose();
};


/**
  ���� �ο� �ε����� �����մϴ�.

  @function {number} getRowIdx
  @returns {number} ���� �ο� �ε���

  @author ����ȣ
  @since 1.0.0
  @version 1.0.0
  */
prototype.getRowIdx = function() {
	if (Util.isNotNull(this._datarow)) {
		return this.grid['dataMgr'].getIdx(this._datarow);
	}
};


/**
  ���� �÷� �ε����� �����մϴ�.

  @function {number} getColIdx
  @returns {number} ���� �÷� �ε���

  @author ����ȣ
  @since 1.0.0
  @version 1.0.0
  */
prototype.getColIdx = function() {
	if (Util.isNotNull(this._colDef)) {
		return this.grid['colDefMgr'].getIdx(this._colDef);
	}
};


/**
  ���� DOM ��带 �����մϴ�.

  @function {DOMElement} getNode
  @returns {DOMElement} ���� DOM ���

  @author ����ȣ
  @since 1.0.0
  @version 1.0.0
  */
prototype.getNode = function() {
	if (Util.isNotNullAnd(this._datarow, this._colDef)) {
		return this.grid['view'].getCellByIdAndKey(this.grid['dataMgr'].getId(this._datarow), this._colDef.key);
	}
};

prototype.getRowNode = function() {
	return this.grid['view'].getRow(this._datarow);
};

/**
  ���� DOM ��带 ���� jQuery ������Ʈ�� �����մϴ�.

  @function {jQuery} get$
  @returns {jQuery} ���� DOM ��带 ���� jQuery ������Ʈ

  @author ����ȣ
  @since 1.0.0
  @version 1.0.0
  */
prototype.get$ = function() {
	var cellNode = this.getNode();
	if (cellNode !== undefined) {
		return $(cellNode);
	}
	return $([]);
};


/**
  ���� ������ �ο츦 �����մϴ�.

  @function {Object} getDatarow
  @returns {Object} ���� ������ �ο�

  @author ����ȣ
  @since 1.0.0
  @version 1.0.0
  */
prototype.getDatarow = function() {
	return this._datarow;
};


/**
  ���� �÷� ���� ������Ʈ�� �����մϴ�.

  @function {Object} getColDef
  @returns {Object} ���� �÷� ���� ������Ʈ

  @author ����ȣ
  @since 1.0.0
  @version 1.0.0
  */
prototype.getColDef = function() {
	return this._colDef;
};


/**
  ���� �÷� Ű�� �����մϴ�.

  @function {string} getKey
  @returns {string} ���� �÷� Ű

  @author ����ȣ
  @since 1.0.0
  @version 1.0.0
  */
prototype.getKey = function() {
	if (Util.isNotNull(this._colDef)) {
		return this._colDef.key;
	}
};


prototype.getId = function() {
	return this.grid['dataMgr'].getId(this._datarow);
};


/**
  ���� ������ ���� �����մϴ�.

  @function {string} getValue
  @returns {string} ���� ������ ��

  @author ����ȣ
  @since 1.0.0
  @version 1.0.0
  */
prototype.getValue = function() {
	if (Util.isNotNullAnd(this._datarow, this._colDef)) {
		return this._datarow[this._colDef.key];
	}
};


/**
  ���� DOM ��尡 valid ������ �����մϴ�.

  @function {boolean} isValid
  @returns {boolean} ���� DOM ����� validity

  @author ����ȣ
  @since 1.0.0
  @version 1.0.0
  */
prototype.isValid = function() {
	return Util.isNotNull(this.getNode());
};


/**
  ���� DOM ��尡 invalid ������ �����մϴ�.

  @function {boolean} isInvalid
  @returns {boolean} ���� DOM ����� invalidity

  @author ����ȣ
  @since 1.0.0
  @version 1.0.0
  */
prototype.isInvalid = function() {
	return Util.isNull(this.getNode());
};


/**
  ���� jQuery ������Ʈ�� invalid ������ �����մϴ�.

  @function {boolean} isEmpty$
  @returns {boolean} ���� jQuery ������Ʈ�� ����� ��� true, �ƴҰ�� false ��
  �����մϴ�.

  @author ����ȣ
  @since 1.0.0
  @version 1.0.0
  */
prototype.isEmpty$ = function() {
	return this.get$().length === 0;
};


/**
  ���� jQuery ������Ʈ�� valid ������ �����մϴ�.

  @function {boolean} has$
  @returns {boolean} ���� jQuery ������Ʈ�� ����� ��� false, �ƴҰ�� true ��
  �����մϴ�.

  @author ����ȣ
  @since 1.0.0
  @version 1.0.0
  */
prototype.has$ = function() {
	return this.get$().length !== 0;
};

}());

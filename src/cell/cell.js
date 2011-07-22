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

/**
Cell ���. �׸��� �� ���� ������� ���� �Լ����� ���� ����Դϴ�.
@module Cell
@requires JGM
@requires JGM.Grid
@requires JGM.ColDefManager
@requires JGM.DataManager
@requires JGM.EventManager
@requires JGM.ViewportManager
 */

/**
Cell Ŭ����. �׸��� �� ���� ������� ���� �Լ����� ���� ����Դϴ�.

@class {public Cell} JGM.Cell

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/

/**
Cell ����Ʈ���� �Դϴ�.

@constructor {public Cell} Cell
@paramset �� �ε����� ����� ���
@param {Object} args - Cell ��� �Ķ���� ������Ʈ
@... {JGM.Grid} args.grid - ���� �����ϴ� {@link JGM.Grid Grid} �ν��Ͻ�
@... {int} args.row - ���� �ο� �ε���
@... {int} args.col - ���� �÷� �ε���
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

	@var {public JGM.Grid} grid

	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid = args.grid;

	this.__datarow_h__ = args.datarow;

	this.__colDef_i__ = args.colDef;

	this.__init(args);
}


Cell.getInstance = function(args) {
	return new Cell(args);
};

var prototype = Cell.prototype;

prototype.__init = function(args) {
   if (Util.isNull(this.__datarow_h__)) {
      if (Util.isNotNull(args.row)) {
         this.__datarow_h__ = this.grid.dataMgr.getByIdx(args.row);
      }
      else if (Util.isNotNull(args.node)) {
         this.__datarow_h__ = this.grid.dataMgr.getByNode(args.node.parentNode);
      }
      else if (Util.isNotNull(args.$)) {
         this.__datarow_h__ = this.grid.dataMgr.getByNode(args.$[0].parentNode);
      }
   }
   if (Util.isNull(this.__colDef_i__)) {
      if (Util.isNotNull(args.col)) {
         this.__colDef_i__ = this.grid.colDefMgr.get(args.col);
      }
      else if (Util.isNotNull(args.node)) {
         this.__colDef_i__ = this.grid.colDefMgr.get(Util.index(args.node));
      }
      else if (Util.isNotNull(args.$)) {
         this.__colDef_i__ = this.grid.colDefMgr.get(Util.index(args.$[0]));
      }
   }
	if (Util.isNullOr(this.__datarow_h__, this.__colDef_i__) && Util.isNotNull(args.event)) {
      var node = this.grid.view.__getClosestCell_Az__(args.event.target);
      if (Util.isNotNull(node)) {
         this.__datarow_h__ = this.grid.dataMgr.getByNode(node.parentNode);
         this.__colDef_i__ = this.grid.colDefMgr.get(Util.index(node));
      }
	}
};

prototype.destroy = function() {
	delete this.grid;
	delete this.__datarow_h__;
	delete this.__colDef_i__;
};


/**
���� �ο� �ε����� �����մϴ�.

@function {public int} getRowIdx
@returns {int} ���� �ο� �ε���

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.getRowIdx = function() {
	if (Util.isNotNull(this.__datarow_h__)) {
		return this.grid.dataMgr.getIdx(this.__datarow_h__);
	}
};


/**
���� �÷� �ε����� �����մϴ�.

@function {public int} getColIdx
@returns {int} ���� �÷� �ε���

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.getColIdx = function() {
	if (Util.isNotNull(this.__colDef_i__)) {
		return this.grid.colDefMgr.getIdx(this.__colDef_i__);
	}
};


/**
���� DOM ��带 �����մϴ�.

@function {public DOMElement} getNode
@returns {DOMElement} ���� DOM ���

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.getNode = function() {
	if (Util.isNotNullAnd(this.__datarow_h__, this.__colDef_i__)) {
		return this.grid.view.getCellByIdAndKey(this.grid.dataMgr.getId(this.__datarow_h__), this.__colDef_i__.key);
	}
};

prototype.getRowNode = function() {
	return this.grid.view.getRow(this.__datarow_h__);
};

/**
���� DOM ��带 ���� jQuery ������Ʈ�� �����մϴ�.

@function {public jQuery} get$
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

@function {public Object} getDatarow
@returns {Object} ���� ������ �ο�

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.getDatarow = function() {
   return this.__datarow_h__;
};


/**
���� �÷� ���� ������Ʈ�� �����մϴ�.

@function {public Object} getColDef
@returns {Object} ���� �÷� ���� ������Ʈ

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.getColDef = function() {
   return this.__colDef_i__;
};


/**
���� �÷� Ű�� �����մϴ�.

@function {public String} getKey
@returns {String} ���� �÷� Ű

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.getKey = function() {
	if (Util.isNotNull(this.__colDef_i__)) {
		return this.__colDef_i__.key;
	}
};


prototype.getId = function() {
   return this.grid.dataMgr.getId(this.__datarow_h__);
};


/**
���� ������ ���� �����մϴ�.

@function {public String} getValue
@returns {String} ���� ������ ��

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.getValue = function() {
	if (Util.isNotNullAnd(this.__datarow_h__, this.__colDef_i__)) {
		return this.__datarow_h__[this.__colDef_i__.key];
	}
};


/**
���� DOM ��尡 valid ������ �����մϴ�.

@function {public Boolean} isValid
@returns {Boolean} ���� DOM ����� validity

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.isValid = function() {
	return Util.isNotNull(this.getNode());
};


/**
���� DOM ��尡 invalid ������ �����մϴ�.

@function {public Boolean} isInvalid
@returns {Boolean} ���� DOM ����� invalidity

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.isInvalid = function() {
	return Util.isNull(this.getNode());
};


/**
���� jQuery ������Ʈ�� invalid ������ �����մϴ�.

@function {public Boolean} isEmpty$
@returns {Boolean} ���� jQuery ������Ʈ�� ����� ��� true, �ƴҰ�� false ��
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

@function {public Boolean} has$
@returns {Boolean} ���� jQuery ������Ʈ�� ����� ��� false, �ƴҰ�� true ��
�����մϴ�.

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.has$ = function() {
	return this.get$().length !== 0;
};


/**
�־��� ���� �ν��Ͻ��� ���� ���� �ν��Ͻ��� ���������� �����մϴ�.

@function {public Boolean} equals
@returns {Boolean} ���� ���� �����͸� ���� ��� true, �ƴ� ��� false ��
�����մϴ�.

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.equals = function(cell) {
	return Util.isNotNull(cell) &&
		Util.isNotNull(this.__datarow_h__) && this.__datarow_h__ === cell.getDatarow() &&
		Util.isNotNull(this.__colDef_i__) && this.__colDef_i__ === cell.getColDef();
};

JGM._add("Cell", Cell);
}());

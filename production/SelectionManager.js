goog.require('array_extension');
goog.require('jx.util');
goog.require('jx.grid');
goog.require('jx.grid.BaseModule');
goog.require('jx.grid.Grid');
goog.require('jx.data.DataManager');
goog.require('jx.grid.Cell');
goog.provide('jx.grid.SelectionManager');
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
	Cell = goog.getObjectByName('jx.grid.Cell');
 goog.exportSymbol('jx.grid.SelectionManager', SelectionManager);
/**
SelectionManager ���. ���� (����) ������ ����ϴ� ����Դϴ�.
SelectionManager Ŭ����. ������ �����ϰ� ���õ� ���鿡 ���� �̺�Ʈ�� Ʈ���Ÿ��ϴ�
Ŭ�����Դϴ�.
@class {SelectionManager} jx.grid.SelectionManager
@author ����ȣ
@since 1.0.0
@version 1.2.3
*/
/**
SelectionManager ����Ʈ���� �Դϴ�.
@constructor {SelectionManager} SelectionManager
@param {Object} args - SelectionManager ��� �Ķ���� ������Ʈ
@... {jx.grid.Grid} args.grid - SelectionManager �� �����ϴ� {@link jx.grid.Grid} �ν��Ͻ�
@... {Object} args.options - SelectionManager �ɼ� ������Ʈ
@returns {SelectionManager} SelectionManager ��� �ν��Ͻ��� �����մϴ�.
@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
function SelectionManager(args) {
	/**
	{@link JGM} �� �Ҵ����ִ� SelectionManager ��� ���� ���̵��Դϴ�. �б� ����.
	@var {string} mid
	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.mid = args.mid;
	/**
	SelectionManager �� �����ϴ� {@link jx.grid.Grid} �ν��Ͻ�.
	@var {jx.grid.Grid} grid
	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid = args.grid;
	
	/**
	�׸��� ���� ������ �����ϴ� {@link jx.grid.SelectionManager SelectionManager} �ν��Ͻ� �Դϴ�.
	@var {jx.grid.SelectionManager} jx.grid.Grid.selMgr
	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	this.grid['selMgr'] = this;
	/**
	SelectionManager ����� �⺻ �ɼ� ������ �����մϴ�.
	@type {Object} options
	@private
	@author ����ȣ
	@since 1.0.0
	@version 1.0.0
	*/
	var options = {
		/**
		�ο� ��ü�� �����ϴµ� ���Ǵ� �÷� key ���Դϴ�. �� ���� Ű�� ����
		�÷��� ���ý� �ο� ��ü�� ���õ˴ϴ�. <br>�⺻��:<code>DataManager.idKey</code>
		@type {string=} jx.grid.SelectionManager.options.rowSelKey
		@private
		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'rowSelKey': this.grid['dataMgr'].idKey,
		/**
		���� ���õ� ��� ���鿡 ����Ǵ� �����Դϴ�. <br>�⺻��:<code>"#DCEBFE"</code>
		@type {string=} jx.grid.SelectionManager.options.bgColorSelection
		@private
		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'bgColorSelection': "#DCEBFE", //EAECF5
		/**
		���������� ���õ� ���� ����Ǵ� �����Դϴ�. <br>�⺻��:<code>"#C1DBFC"</code>
		@type {string=} jx.grid.SelectionManager.options.bgColorLast
		@private
		@author ����ȣ
		@since 1.0.0
         colDefs = this.grid['colDefMgr'].get(),
		@version 1.0.0
		*/
		'bgColorLast': "#f1ca7f", //F5C795
		/**
		���� ���ý� ���� ���� ���� ����Ǵ� �����Դϴ�. <br>�⺻��:<code>"#D9D9D9"</code>
		@type {string=} jx.grid.SelectionManager.options.bgColorRange
		@private
		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'bgColorRange': "#D9D9D9", //B8BFC4
		/**
		���� ���õ� ��� ���鿡 ���������� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"jgrid-selection"</code>
		@type {string=} jx.grid.SelectionManager.options.classSelection
		@private
		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classSelection': "jgrid-selection",
		/**
		���������� ���õ� ���� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"selection-last"</code>
		@type {string=} jx.grid.SelectionManager.options.classLast
		@private
		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classLast': "selection-last",
		/**
		���� ���ýÿ� ���� ���� ���� ����Ǵ� CSS Ŭ���� �Դϴ�. <br>�⺻��:<code>"selection-range"</code>
		@type {string=} jx.grid.SelectionManager.options.classRange
		@private
		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'classRange': "selection-range",
		/**
		���� ���� ���� �����Դϴ�. <br>�⺻��:<code>false</code>
		@type {boolean=} jx.grid.SelectionManager.options.multiSelectEnabled
		@private
		@author ����ȣ
		@since 1.0.0
		@version 1.0.0
		*/
		'multiSelectEnabled': false,
      'classRowSelected': "rowSelected",
      'highlightRowEnabled': true,
      'bgColorRowSelected': "#d8dfea"
	};
	this._options = JGM._extend(options, args['options']);
	this._consts = {
		_UP:		1,
		_DOWN:	2,
		_LEFT:	3,
		_RIGHT:	4,
		_PGDN: 5,
		_PGUP: 6,
		_HOME: 7,
		_END: 8,
		_NAVKEYS: {}
	};
	this._consts._NAVKEYS = Util.which(["enter", "tab", "arrow", "pgdn", "pgup", "home", "end"]);
	this._last;
	this._range;
	this._rows = {length:0};
	this._cols = {length:0};
	
	this.__init();
}
SelectionManager.getInstance = function(args) {
	return new SelectionManager(args);
};
var prototype = SelectionManager.prototype;
prototype.__init = function() {
   this.bindEvents();
};
prototype.bindEvents = function() {
	this.grid['event'].bind({
		'onGetCellClass': this._onGetCellClass,
		'onCreateCss': this._onCreateCss,
		'onDestroy': this._destroy,
		'keydownCanvas': this._keydownCanvas,
		'dragoverCanvas': this._dragoverCanvas,
		'mousedownCanvas': this._mousedownCanvas,
		'onBeforeRerender': this._onBeforeRerender,
		'onAfterRerender': this.onAfterRerender,
		'onBeforeDataChange': this.onBeforeDataChange
	}, this);
};
prototype._destroy = function() {
	JGM._deleteMap(this._consts, "_NAVKEYS");
	
   var i,
      rows = this._rows,
      cols = this._cols;
	for (i in rows) {
      if (rows.hasOwnProperty(i) && i !== "length") {
         JGM._deleteMap(rows, i);
      }
   }
	for (i in cols) {
      if (cols.hasOwnProperty(i) && i !== "length") {
			JGM._deleteMap(cols, i);
      }
   }
	
	JGM._destroy(this, {
		name: "SelectionManager",
		path: "selMgr",
		map: "_rows _cols _range _last _consts _options"
	});
};
prototype._onCreateCss = function() {
	var rules = this.grid['event'].trigger("onBeforeCreateSelCss"),
      gridId = "#" + this.grid['mid'] + " .",
      opt = this._options;
   if (opt['highlightRowEnabled'] === true) {
      rules.push(gridId + opt['classRowSelected']  + " > *{background:" + opt['bgColorRowSelected'] + "}");
   }
	if (opt['multiSelectEnabled'] === true) {
		rules.push(gridId + opt['classSelection'] +  "{background:" + opt['bgColorSelection'] + "}");
		rules.push(gridId + opt['classRange'] +  "{background:" + opt['bgColorRange'] + "}");
	}
	rules.push(gridId + opt['classLast']  + "{background:" + opt['bgColorLast'] + "}");
	
	return rules.join("\n");
};
prototype._onGetCellClass = function(row, col, datarow, colDef) {
	var css = "",
      last = this._last,
      range = this._range,
      rows = this._rows,
      opt = this._options;
	if (Util.isNotNull(last) && last.getDatarow() === datarow && last.getColDef() === colDef) {
		css += opt['classLast'];
   }
	if (opt['multiSelectEnabled'] === true) {
		if (Util.isNotNull(range) && range.getDatarow() === datarow && range.getColDef() === colDef) {
			css += " " + opt['classRange'];
      }
		if (rows.hasOwnProperty(row) && rows[row].hasOwnProperty(col)) {
			css += " " + opt['classSelection'];
      }
	}
	return css;
};
prototype._mousedownCanvas = function(e, cell) {
	if (Util.isNotNull(this._last) && this._last.equals(cell)) {
		return;
   }
	/**
	ĵ������ mousedown �̺�Ʈ�� �߻��Ͽ� �ش� ���� �����ϱ� ���� �߻��Ǵ� �̺�Ʈ �Դϴ�.
	
	@event {Event} onBeforeSelect
	@param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
	@param {jx.grid.Cell} cell - ���õ� ��
	@author ����ȣ
	@since 1.1.7
	@version 1.1.7
	*/
	this.grid['event'].trigger("onBeforeSelect", [e, cell], true);
	if (this._options['multiSelectEnabled'] === false) {
		this.selectCell(cell);
   }
	else {
		if (e.shiftKey && Util.isNotNullAnd(this._last, this._range)) {
			this.selectRange(cell);
      }
		else if (e.ctrlKey) {
			if (cell.getKey() === this._options['rowSelKey']) {
				this.addRow(cell);
         }
			else {
				this.addCell(cell);
         }
		}
		else {
			this.selectCell(cell);
      }
	}
};
prototype._dragoverCanvas = function(e, cell) {
	if (this._options['multiSelectEnabled'] === false) {
		this.selectCell(cell);
   }
	else if (Util.isNotNullAnd(this._last, this._range)) {
		this.selectRange(cell);
   }
};
prototype._keydownCanvas = function(e) {
	if (Util.isNullOr(this._last, this._range)) {
		if (this._consts._NAVKEYS[e.which]) {
			this.selectCell(JGM.create("Cell", {'grid':this.grid, 'row':this.grid['view']._getFirstSafeVisibleRow(), 'col':this.grid['view']._getFirstSafeVisibleCol()}));
      }
		return;
	}
	if (this._consts._NAVKEYS[e.which]) {
		/**
		�� ���� �� Ű����� �� �׺���̼��� �ϱ� ���� �߻��Ǵ� �̺�Ʈ �Դϴ�.
		
		@event {Event} onBeforeNavigate
		@param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
		@returns {boolean} continueOrStop - false �� ������ ��� �׺���̼��� ����մϴ�.
		@author ����ȣ
		@since 1.1.7
		@version 1.2.3
		*/
		if (this.grid['event'].triggerInvalid("onBeforeNavigate", [e])) {
			return;
      }
		var nextCell;
			
		e.preventDefault();
		switch (e.which) {
			case Util.keyMapKeydown.tab:
				if (e.shiftKey) {
					nextCell = this._idxToCell(this._consts._LEFT, this._last);
					this.selectCell(nextCell);
            }
				else {
					nextCell = this._idxToCell(this._consts._RIGHT, this._last);
					this.selectCell(nextCell);
            }
			break;
			case Util.keyMapKeydown.enter:
				if (e.shiftKey) {
					nextCell = this._idxToCell(this._consts._UP, this._last);
					this.selectCell(nextCell);
            }
				else {
					nextCell = this._idxToCell(this._consts._DOWN, this._last);
					this.selectCell(nextCell);
            }
			break;
			case Util.keyMapKeydown.up:
				if (this._options['multiSelectEnabled'] && e.shiftKey) {
					nextCell = this._idxToCell(this._consts._UP, this._range);
					this.selectRange(nextCell);
            }
				else {
					nextCell = this._idxToCell(this._consts._UP, this._last);
					this.selectCell(nextCell);
            }
			break;
			case Util.keyMapKeydown.down:
				if (this._options['multiSelectEnabled'] && e.shiftKey) {
					nextCell = this._idxToCell(this._consts._DOWN, this._range);
					this.selectRange(nextCell);
            }
				else {
					nextCell = this._idxToCell(this._consts._DOWN, this._last);
					this.selectCell(nextCell);
            }
			break;
			case Util.keyMapKeydown.left:
				if (this._options['multiSelectEnabled'] && e.shiftKey) {
					nextCell = this._idxToCell(this._consts._LEFT, this._range);
					this.selectRange(nextCell);
            }
				else {
					nextCell = this._idxToCell(this._consts._LEFT, this._last);
					this.selectCell(nextCell);
            }
			break;
			case Util.keyMapKeydown.right:
				if (this._options['multiSelectEnabled'] && e.shiftKey) {
					nextCell = this._idxToCell(this._consts._RIGHT, this._range);
					this.selectRange(nextCell);
            }
				else {
					nextCell = this._idxToCell(this._consts._RIGHT, this._last);
					this.selectCell(nextCell);
            }
			break;
			case Util.keyMapKeydown.pgup:
				if (this._options['multiSelectEnabled'] && e.shiftKey) {
					nextCell = this._idxToCell(this._consts._PGUP, this._range);
					this.selectRange(nextCell);
            }
				else {
					nextCell = this._idxToCell(this._consts._PGUP, this._last);
					this.selectCell(nextCell);
            }
			break;
			case Util.keyMapKeydown.pgdn:
				if (this._options['multiSelectEnabled'] && e.shiftKey) {
					nextCell = this._idxToCell(this._consts._PGDN, this._range);
					this.selectRange(nextCell);
            }
				else {
					nextCell = this._idxToCell(this._consts._PGDN, this._last);
					this.selectCell(nextCell);
            }
			break;
			case Util.keyMapKeydown.space:
				if (e.shiftKey) {
					nextCell = this._idxToCell(this._consts._PGUP, this._last);
					this.selectCell(nextCell);
            }
				else {
					nextCell = this._idxToCell(this._consts._PGDN, this._last);
					this.selectCell(nextCell);
            }
			break;
			case Util.keyMapKeydown.home:
				if (this._options['multiSelectEnabled'] && e.shiftKey) {
					nextCell = this._idxToCell(this._consts._HOME, this._range);
					this.selectRange(nextCell);
            }
				else {
					nextCell = this._idxToCell(this._consts._HOME, this._last);
					this.selectCell(nextCell);
            }
			break;
			case Util.keyMapKeydown.end:
				if (this._options['multiSelectEnabled'] && e.shiftKey) {
					nextCell = this._idxToCell(this._consts._END, this._range);
					this.selectRange(nextCell);
            }
				else {
					nextCell = this._idxToCell(this._consts._END, this._last);
					this.selectCell(nextCell);
            }
			break;
		}
		/**
		�� ���� �� Ű����� �� �׺���̼��� �� �Ŀ� �߻��Ǵ� �̺�Ʈ �Դϴ�.
		
		@event {Event} onAfterNavigate
		@param {jx.grid.Cell} nextCell - ���Ӱ� �̵��� �� �ν��Ͻ�
		@author ����ȣ
		@since 1.3.0
		@version 1.3.0
		*/
		this.grid['event'].trigger("onAfterNavigate", [nextCell], true);
	}
	else {
		if (this._cols.length === 1) {
			var key,
            cmgr = this.grid['colDefMgr'],
            col,
            cols = this._cols;
			for (col in cols) {
            if (cols.hasOwnProperty(col) && col !== "length") {
               key = cmgr.get(col).key;
               /**
                 �׸��� ĵ�ٽ��� Ȱ��ȭ �Ǿ��ְ� ���� �ϳ��� �÷��� �ϳ� �̻��� ���� ������ �� ���¿��� keydown �̺�Ʈ�� �߻��� ��� Ʈ���� �Ǵ� �̺�Ʈ �Դϴ�.
                 @event {Event} keydownColSel_COLKEY_KEYCODE
                 @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
                 @param {Object} colsMap - �÷� ���� ��
                 @param {jx.grid.Cell} cell - ������ ���� ��
                 @author ����ȣ
                 @since 1.1.7
                 @version 1.1.7
                 */
               /**
                 �׸��� ĵ�ٽ��� Ȱ��ȭ �Ǿ��ְ� ���� �ϳ��� �÷��� �ϳ� �̻��� ���� ������ �� ���¿��� keydown �̺�Ʈ�� �߻��� ��� Ʈ���� �Ǵ� �̺�Ʈ �Դϴ�.
                 @event {Event} keydownColSel_COLKEY
                 @param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
                 @param {Object} colsMap - �÷� ���� ��
                 @param {jx.grid.Cell} cell - ������ ���� ��
                 @author ����ȣ
                 @since 1.1.7
                 @version 1.1.7
                 */
               this.grid['event'].trigger("keydownColSel_" + key + "_" + e.which + " keydownColSel_" + key, [e, cols[col], this._last], true);
            }
         }
		}
		
		/**
		�׸��� ĵ�ٽ��� Ȱ��ȭ �Ǿ��ְ� ���� �ϳ��� �ο쿡 �ϳ� �̻��� ���� ������ �� ���¿��� keydown �̺�Ʈ�� �߻��� ��� Ʈ���� �Ǵ� �̺�Ʈ �Դϴ�.
		
		@event {Event} keydownRowSel_KEYCODE
		@param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
		@param {Object} rowsMap - �ο� ���� ��
		@param {jx.grid.Cell} cell - ������ ���� ��
		@author ����ȣ
		@since 1.1.7
		@version 1.1.7
		*/
		
		/**
		�׸��� ĵ�ٽ��� Ȱ��ȭ �Ǿ��ְ� ���� �ϳ��� �ο쿡 �ϳ� �̻��� ���� ������ �� ���¿��� keydown �̺�Ʈ�� �߻��� ��� Ʈ���� �Ǵ� �̺�Ʈ �Դϴ�.
		
		@event {Event} keydownRowSel
		@param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
		@param {Object} rowsMap - �ο� ���� ��
		@param {jx.grid.Cell} cell - ������ ���� ��
		@author ����ȣ
		@since 1.1.7
		@version 1.1.7
		*/
		if (this._rows.length === 1) {
         var row,
            rows = this._rows;
			for (row in rows) {
            if (rows.hasOwnProperty(row) && row !== "length") {
               this.grid['event'].trigger("keydownRowSel_" + e.which + " keydownRowSel", [e, rows[row], this._last], true);
            }
         }
      }
		
		/**
		�׸��� ĵ�ٽ��� Ȱ��ȭ �Ǿ��ְ� �ϳ� �̻��� ���� ������ �� ���¿��� keydown �̺�Ʈ�� �߻��� ��� Ʈ���� �Ǵ� �̺�Ʈ �Դϴ�.
		
		@event {Event} keydownSel_KEYCODE
		@param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
		@param {Object} map - ���� ��
		@param {Object} rowsMap - �ο� �� ���� ��
		@param {Object} colsMap - �÷� �� ���� ��
		@author ����ȣ
		@since 1.1.7
		@version 1.1.7
		*/
		
		/**
		�׸��� ĵ�ٽ��� Ȱ��ȭ �Ǿ��ְ� �ϳ� �̻��� ���� ������ �� ���¿��� keydown �̺�Ʈ�� �߻��� ��� Ʈ���� �Ǵ� �̺�Ʈ �Դϴ�.
		
		@event {Event} keydownSel
		@param {jQuery.Event} e - jQuery �̺�Ʈ ������Ʈ
		@param {Object} rowsMap - �ο� �� ���� ��
		@param {Object} colsMap - �÷� �� ���� ��
		@author ����ȣ
		@since 1.1.7
		@version 1.2.3
		*/
		this.grid['event'].trigger("keydownSel_" + e.which + " keydownSel", [e, this._rows, this._cols], true);
	}
};
/**
���� ���õ� ���� ������� ���õ� {@link jx.grid.Cell Cell} �� �ν��Ͻ��� �����մϴ�. ���� ��쿡�� <code>undefined</code> �� �����մϴ�.
@function {jx.grid.Cell} getCell
@returns {jx.grid.Cell} ���� ���õ� ���� �ν��Ͻ�
@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
//tested
prototype.getCell = function() {
	if (Util.isNotNull(this._last)) {
		return this._last;
   }
};
//tested
prototype._isSelected = function(cell) {
	return Util.isNotNull(this._last) && this._last.equals(cell);
};
/**
���� {@link jx.grid.SelectionManager SelectionManager} �� ���� ���õǾ� �ִ� ��� true,
�ƴ� ��� false �� �����մϴ�.
@function {boolean} jx.grid.Cell.isSelected
@returns {boolean} ���� {@link jx.grid.SelectionManager SelectionManager} �� ���� ���õǾ� �ִ� ��� true,
�ƴ� ��� false �� �����մϴ�.
@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
//tested
Cell.prototype.isSelected = function() {
	return this.grid['selMgr']._isSelected(this);
};
prototype._getCellIdxToNavigate = function(dir, row, col) {
	switch (dir) {
		case this._consts._RIGHT:
			if (col < this.grid['colDefMgr'].length() - 1) {
				col++;
         }
		break;
		case this._consts._LEFT:
			if (col > 0) {
				col--;
         }
		break;
		case this._consts._DOWN:
			if (row < this.grid['dataMgr'].datalist.length - 1) {
				row++;
         }
		break;
		case this._consts._UP:
			if (row > 0) {
				row--;
         }
		break;
		case this._consts._PGDN:
			row += this.grid['view']._options['rowsPerPage'];
			if (row > this.grid['dataMgr'].datalist.length - 1) {
				row = this.grid['dataMgr'].datalist.length - 1;
         }
		break;
		case this._consts._PGUP:
			row -= this.grid['view']._options['rowsPerPage'];
			if (row < 0) {
				row = 0;
         }
		break;
		case this._consts._HOME:
			row = 0;
		break;
		case this._consts._END:
			row = this.grid['dataMgr'].datalist.length - 1;
		break;	
	}
	return [row, col];
};
prototype._idxToCell = function(dir, idx) {
	var newIdx = this._getCellIdxToNavigate(dir, idx.getRowIdx(), idx.getColIdx());
	return JGM.create("Cell", {'grid': this.grid, 'row':newIdx[0], 'col':newIdx[1]});
};
/**
�־��� {@link jx.grid.Cell Cell} �� �����ϴ� �ο� ��ü�� �����մϴ�.
@function {} selectRow
@param {jx.grid.Cell} cell - ������ �ο찡 �����ϴ� {@link jx.grid.Cell Cell}
@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.selectRow = function(cell) {
	var row = cell.getRowIdx(),
		col = cell.getColIdx();
		
	this._setRange(row, col, cell);
	this._setLast(row, col, cell);
	this._setSelMap(this._getRowMap(row, col, cell));
};
/**
�־��� {@link jx.grid.Cell Cell} �� �����մϴ�.
@function {} selectCell
@param {jx.grid.Cell} cell - ������ {@link jx.grid.Cell Cell}
@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
//tested
prototype.selectCell = function(cell, noScroll) {
	/**
	�� ���� ���� �߻��Ǵ� �̺�Ʈ �Դϴ�.
	
	@event {Event} onBeforeSelectCell
	@param {jx.grid.Cell} selectedCell - ���Ӱ� �̵��� �� �ν��Ͻ�
	@author ����ȣ
	@since 1.3.0
	@version 1.3.0
	*/
	this.grid['event'].trigger("onBeforeSelectCell", [cell], true);
	if (this._options['multiSelectEnabled'] && cell.getKey() === this._options['rowSelKey']) {
		this.selectRow(cell);
   }
	else {
		var row = cell.getRowIdx(),
			col = cell.getColIdx();
			
		this._setRange(row, col, cell, noScroll);
		this._setLast(row, col, cell);
		this._setSelMap(this._getCellMap(row, col, cell));
	}
	
	/**
	�� ���� �Ŀ� �߻��Ǵ� �̺�Ʈ �Դϴ�.
	
	@event {Event} onAfterSelectCell
	@param {jx.grid.Cell} selectedCell - ���Ӱ� �̵��� �� �ν��Ͻ�
	@author ����ȣ
	@since 1.3.0
	@version 1.3.0
	*/
	this.grid['event'].trigger("onAfterSelectCell", [cell], true);
};
prototype.onBeforeDataChange = function() {
};
prototype._onBeforeRerender = function() {
	if (Util.isNotNull(this._last)) {
		this.toSelect = this._last;
	}
	this.empty();
};
prototype.onAfterRerender = function() {
	if (Util.isNotNull(this.toSelect)) {
		this.selectCell(this.toSelect, true);
		this.grid['view'].scrollToRowLazy(this.toSelect.getRowIdx());
	}
};
/**
�־��� {@link jx.grid.Cell Cell} �� �����ϴ� �ο� ��ü�� ���ÿ� �߰��մϴ�.
@function {} addRow
@param {jx.grid.Cell} cell - �߰� ������ �ο찡 �����ϴ� {@link jx.grid.Cell Cell}
@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.addRow = function(cell) {
	var row = cell.getRowIdx(),
		col = cell.getColIdx();
		
	this._setRange(row, col, cell);
	this._setLast(row, col, cell);
	this._addSelMap(this._getRowMap(row, col, cell));
};
/**
�־��� {@link jx.grid.Cell Cell} �� ���ÿ� �߰��մϴ�.
@function {} addCell
@param {jx.grid.Cell} cell - �߰� ������ {@link jx.grid.Cell Cell}
@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.addCell = function(cell) {
	var row = cell.getRowIdx(),
		col = cell.getColIdx();
		
	this._setRange(row, col, cell);
	this._setLast(row, col, cell);
	this._addSelMap(this._getCellMap(row, col, cell));
};
/**
�־��� {@link jx.grid.Cell Cell} �� ������ �𼭸��� ���� ������ �մϴ�.
@function {} selectRange
@param {jx.grid.Cell} cell - ���� ������ �𼭸� {@link jx.grid.Cell Cell}
@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.selectRange = function(cell) {
	var row = cell.getRowIdx(),
		col = cell.getColIdx(),
		lastRow = this._last.getRowIdx(),
		lastCol = this._last.getColIdx(),
		minRow = (lastRow < row ? lastRow : row),
		maxRow = (lastRow < row ? row : lastRow),
		minCol,
		maxCol;
		
	this._setRange(row, col, cell);
	if (cell.getKey() === this._options['rowSelKey']) {
		minCol = 0;
		maxCol = this.grid['colDefMgr'].length() - 1;
	}
	else {
		minCol = lastCol < col ? lastCol : col;
		maxCol = lastCol < col ? col : lastCol;
	}
	this._setSelMap(this._getRangeMap(minRow, minCol, maxRow, maxCol, row, col, cell));
	
	return {minRow:minRow, minCol:minCol, maxRow:maxRow, maxCol:maxCol};
};
prototype._setLast = function(row, col, cell) {
	var last = this._last,
      lastRow;
	if (Util.isNotNull(last)) {
		lastRow = last.getRowIdx();
			
		if (row !== lastRow && (Util.isNotNull(this._range) &&  lastRow !== this._range.getRowIdx())) {
			this.grid['view'].unlockRowById(last.getId());
      }
		last.get$().removeClass(this._options['classLast']);
      if (this._options['highlightRowEnabled'] === true) {
         $(last.getRowNode()).removeClass(this._options['classRowSelected']);
      }
		
		if (Util.isNull(cell)) {
			delete this._last;
      }
	}
	
	if (Util.isNull(cell)) {
		return;
   }
	
	(this._last = cell).get$().addClass(this._options['classLast']);
   if (this._options['highlightRowEnabled'] === true) {
      $(cell.getRowNode()).addClass(this._options['classRowSelected']);
   }
	
	this.grid['view'].lockRowByIdx(row);
};
prototype._setRange = function(row, col, cell, noScroll) {
	var range = this._range;
	if (Util.isNotNull(range)) {
		var rangeRow = range.getRowIdx();
			
		if (row === rangeRow && col === range.getColIdx()) {
			return;
      }
			
		if (row !== rangeRow && (Util.isNotNull(this._last) &&  rangeRow !== this._last.getRowIdx())) {
			this.grid['view'].unlockRowById(range.getId());
      }
			
		range.get$().removeClass(this._options['classRange']);
		if (Util.isNull(cell)) {
			delete this._range;
      }
	}
	
	if (Util.isNull(cell)) {
		return;
   }
		
	(this._range = cell).get$().addClass(this._options['classRange']);
	
	var view = this.grid['view'];
	view.lockRowByIdx(row);
	if (!noScroll) {
		view.scrollToLazy(row, col);
	}
};
prototype._addSelMap = function(map) {
	var rowsmap = this._rows,
		rowmap,
		addrow,
		r,
		c,
		view = this.grid['view'],
		toAddClass = {};
	for (r in map) {
      if (map.hasOwnProperty(r)) {
         addrow = map[r];
			if (rowsmap.hasOwnProperty(r)) {
				rowmap = rowsmap[r];
				for (c in addrow) {
					if (addrow.hasOwnProperty(c)) {
						if (rowmap.hasOwnProperty(c)) {
							if (addrow[c] instanceof Cell) {
								rowmap[c] = addrow[c];
							}
							delete addrow[c];
						}
					}
				}			
			}
      }
	}
	
	this.addOrRemoveCss(toAddClass, true);
	this._addToMaps(map);
};
// $cell ����, refresh �ϸ� ���� cell ã�� scroll, multiSelect �� �ѹ��� Ŭ��������
prototype._setSelMap = function(map) {
	var rowsmap = this._rows,
		rowmap,
		colmap,
		addrow,
		r,
		c,
		view = this.grid['view'],
		toRemoveClass = {},
		toRemoveRow,
		removeMap = {};
	for (r in rowsmap) {
      if (rowsmap.hasOwnProperty(r) && r !== "length") {
         rowmap = rowsmap[r];
         if (map.hasOwnProperty(r)) {
				addrow = map[r];
				for (c in rowmap) {
					if (rowmap.hasOwnProperty(c) && c !== "length") {
						if (addrow.hasOwnProperty(c)) {
							if (addrow[c] instanceof Cell) {
								rowmap[c] = addrow[c];
							}
							delete addrow[c];
						}
						else {
							if (!removeMap.hasOwnProperty(r)) {
								removeMap[r] = {};
							}
							removeMap[r][c] = true;
						}
					}
				}			
         }
         else {
				colmap = removeMap[r] = {};
				for (c in rowmap) {
					if (rowmap.hasOwnProperty(c) && c !== "length") {
						colmap[c] = true;
					}
				}
         }
      }
	}
	
	this._removeFromMaps(removeMap);
	this.addOrRemoveCss(toRemoveClass, false);
	
	this._addSelMap(map);
};
prototype.addOrRemoveCss = function(map, add) {
	var list = [],
		r,
		c,
		row,
		view = this.grid['view'];
	for (r in map) {
      if (map.hasOwnProperty(r)) {
         row = map[r];
         for (c in row) {
            if (row.hasOwnProperty(c)) {
               if (row[c] instanceof Cell) {
                  list.push(row[c].getNode());
               }
               else {
                  list.push(view.getCell(r, c));
               }
            }
         }
      }
	}
	list = list.filter(function(n) {return Util.isNotNull(n);});
	if (add) {
		$(list).addClass(this._options['classSelection']);
   }
	else {
		$(list).removeClass(this._options['classSelection']);		
   }
};
prototype._addToMaps = function(map) {
	var r,
		c,
		cell,
		rowmap = this._rows,
		colmap = this._cols,
		row;
	for (r in map) {
      if (map.hasOwnProperty(r)) {
         row = map[r];
         for (c in row) {
            if (row.hasOwnProperty(c)) {
               cell = Util.isNull(cell = row[c]) ? true : cell;
               if (rowmap.hasOwnProperty(r)) {
                  rowmap[r].length++;
               }
               else {
                  rowmap[r] = {length:1};
                  rowmap.length++;
               }
               rowmap[r][c] = cell;
               if (colmap.hasOwnProperty(c)) {
                  colmap[c].length++;
               }
               else {
                  colmap[c] = {length:1};
                  colmap.length++;
               }
               colmap[c][r] = cell;
            }
         }
      }
	}
};
prototype._removeFromMaps = function(map) {
	var r,
		c,
		rowmap = this._rows,
		colmap = this._cols,
		row;
	for (r in map) {
      if (map.hasOwnProperty(r)) {
         row = map[r];
         for (c in row) {
            if (row.hasOwnProperty(c)) {
               if (--rowmap[r].length === 0) {
                  delete rowmap[r];
                  rowmap.length--;
               }
               else {
                  delete rowmap[r][c];
               }
               if (--colmap[c].length === 0) {
                  delete colmap[c];
                  colmap.length--;
               }
               else {
                  delete colmap[c][r];
               }
            }
         }
      }
   }
};
prototype._getCellMap = function(row, col, cell) {
	var map = {};
	
	map[row] = {};
	map[row][col] = cell;
	
	return map;
};
prototype._getRowMap = function(row, col, cell) {
	var map = {},
		collen = this.grid['colDefMgr'].length(),
		i = 0;
	
	map[row] = {};
	for (; i < collen; i++) {
		map[row][i] = true;
   }
	
	map[row][col] = cell;
	return map;
};
prototype._getRangeMap = function(rowMin, colMin, rowMax, colMax, row, col, cell) {
	var map = {},
		i = rowMin,
		j;
		
	for (; i <= rowMax; i++) {
		map[i] = {};
		j = colMin;
		for (; j <= colMax; j++) {
			map[i][j] = true;
		}
	}
	map[row][col] = cell;
	return map;
};
/**
���� ���õ� ��� ������ �����մϴ�.
@function {} empty
@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
prototype.empty = function() {
	this._setLast();
	this._setRange();
	this._setSelMap({});
};
}());

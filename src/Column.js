console && console.log && console.log('reading javascript source "Column.js"...');//IF_DEBUG

goog.require('jx.grid');
goog.require('jx.events.EventDispatcher');

goog.provide('jx.grid.Column');

(function() {'use strict';
	var EventDispatcher = goog.getObjectByName('jx.events.EventDispatcher');

	goog.exportSymbol('jx.grid.Column', Column);

	function Column(args) {
		if (!(args['manager'] && typeof args['manager']== 'object')) {
			throw new Error('Column needs a valid manager!');
		}
		this.manager = args['manager'];

		/**
		  �ο� �����Ϳ��� �ش� �÷� �����͸� ������ �� ���Ǵ� Ű�Դϴ�. �÷�
		  ���� ������Ʈ���� �ʼ������� �� �÷����� ����ũ�� Ű ���� ���������
		  �մϴ�. <br>�⺻��:<code>undefined</code>

		  @type {string=} jgrid.grid.ColumnManager.options.colDef.key
		  @private

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		// stringify
		this.key = args['key']+ '';
		if (!this.key) {
			throw new Error('Column needs a non-empty key!');
		}

		var error = 'column key=' + this.key;

		if (this.manager.hasKey(this.key)) {
			throw new Error('Duplicate column key!' + error);
		}

		/**
		  �÷� �̸�. �� ���� ������ ��� �÷� ����� key �� ��� �� ����
		  �̸����� ��� ǥ���մϴ�. <br>�⺻��:<code>""</code>

		  @type {string=} jgrid.grid.ColumnManager.options.colDef.name
		  @private

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		// stringify
		this.name = args['name']? args['name']+ '' : '';

		/**
		  �÷� ����� �Է��� Ÿ��Ʋ attribute �� ����. <br>�⺻��:<code>undefined</code>

		  @type {string=} jgrid.grid.ColumnManager.options.colDef.title
		  @private

		  @author ����ȣ
		  @since 1.1.7
		  @version 1.1.7
		  */
		// stringify
		this.title = args['title']? args['title']+ '' : '';

		/**
		  �÷� ����� �̸��� �Է� ����. <br>�⺻��:<code>false</code>

		  @type {boolean=} jgrid.grid.ColumnManager.options.colDef.noName
		  @private

		  @author ����ȣ
		  @since 1.1.7
		  @version 1.1.7
		  */
		// booleanify
		this.noName = !!args['noName'];

		/**
		  �÷� ����� Ÿ��Ʋ attribute �Է� ����. <br>�⺻��:<code>false</code>

		  @type {boolean=} jgrid.grid.ColumnManager.options.colDef.noTitle
		  @private

		  @author ����ȣ
		  @since 1.1.7
		  @version 1.1.7
		  */
		// booleanify
		this.noTitle = !!args['noTitle'];

		// stringify
		this.type = args['type']+ '' || null;

		/**
		  ���ο� �ο� �����͸� �����ϰų� ���� �����͸� del Ű�� ������ �������� ��쿡
		  �÷��� �ڵ������� ä������ �÷��� �⺻ ���Դϴ�. <br>�⺻��:<code>undefined</code>

		  @type {?=} jgrid.grid.ColumnManager.options.colDef.defaultValue
		  @private

		  @author ����ȣ
		  @since 1.1.1
		  @version 1.1.1
		  */
		// as is
		this.defaultValue = args['defaultValue'];

		/**
		  {@link jgrid.grid.DataCreator DataCreator} �� ����Ͽ� ���ο� �ο� �����͸� ������ ���,
		  �ο� �������� �÷� ���� ���������� �Է������� �����Դϴ�. <br>�⺻��:<code>undefined</code>

		  @type {boolean=} jgrid.grid.ColumnManager.options.colDef.inputOnCreate
		  @private

		  @author ����ȣ
		  @since 1.1.1
		  @version 1.1.1
		  */
		// booleanify
		this.inputOnCreate = !!args['inputOnCreate'];

		/**
		  �÷��� �⺻ �� �ȼ�. <br>�⺻��:<code>80</code>

		  @type {number=} jgrid.grid.ColumnManager.options.colDef.width
		  @private

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		// numberify
		this.width = Number(args['width']);
		this.width = this.width || 90;

		/**
		  �÷��� ���� ������ ��� ���Ǵ� �ּ� �� �ȼ�. <br>�⺻��:<code>30</code>

		  @type {number=} jgrid.grid.ColumnManager.options.colDef.minW
		  @private

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		// numberify
		this.minW = Number(args['minW']);
		this.minW = this.minW || 30;

		/**
		  �÷��� ���� ������ ��� ���Ǵ� �ִ� �� �ȼ�. <br>�⺻��:<code>undefined</code>

		  @type {number=} jgrid.grid.ColumnManager.options.colDef.maxW
		  @private

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		// numberify
		this.maxW = Number(args['maxW']) || null;

		/**
		  �÷��� �� ���� ���� ����. <br>�⺻��:<code>false</code>

		  @type {boolean=} jgrid.grid.ColumnManager.options.colDef.resizable
		  @private

		  @author ����ȣ
		  @since 1.1.2
		  @version 1.1.2
		  */
		// booleanify
		this.resizable = !!args['resizable'];

		/**
		  �÷��� ����� ����. <br>�⺻��:<code>false</code>

		  @type {boolean=} jgrid.grid.ColumnManager.options.colDef.hidden
		  @private

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		// booleanify
		this.hidden = !!args['hidden'];

		/**
		  �÷��� ���͸� �ÿ� �˻��� ���ԵǴ��� ����.<br>�⺻��:<code>false</code>

		  @type {boolean=} jgrid.grid.ColumnManager.options.colDef.noSearch
		  @private

		  @author ����ȣ
		  @since 1.2.0
		  @version 1.2.0
		  */
		// booleanify
		this.noSearch = !!args['noSearch'];

		/**
		  ���콺�� �÷� ������ �÷����� ��� �������� ������ Ȱ�� ����. <br>�⺻��:<code>false</code>

		  @type {boolean=} jgrid.grid.ColumnManager.options.colDef.tooltipEnabled
		  @private

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		// booleanify
		this.tooltipEnabled = !!args['tooltipEnabled'];

		/**
		  �÷� �� ���鿡 ����Ǵ� CSS Ŭ����. <br>�⺻��:<code>undefined</code>

		  @type {string=} jgrid.grid.ColumnManager.options.colDef.colClass
		  @private

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		// stringify
		this.colClass = args['colClass']+ '' || null;

		/**
		  �÷� �� ���鿡 ���������� ����Ǵ� CSS style �Դϴ�.<br>
		  ������ ��: �� �ɼǿ� �Էµ� style �� ����Ǿ����� DOM �� ũ�Ⱑ ���ϸ� �׸����� �������� ũ�� ��꿡 ������ ����ϴ�.
		  ��, ũ�⿡ ������ ���� style ������ �Ҷ��� ����ϼ���.
		  <br>�⺻��:<code>""</code>

		  @type {string=} jgrid.grid.ColumnManager.options.colDef.style
		  @private

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		// stringify
		this.style = args['style']+ '' || null;

		/**
		  �÷� ������� ����Ǵ� CSS style �Դϴ�.<br>
		  ������ ��: �� �ɼǿ� �Էµ� style �� ����Ǿ����� DOM �� ũ�Ⱑ ���ϸ� �׸����� �������� ũ�� ��꿡 ������ ����ϴ�.
		  ��, ũ�⿡ ������ ���� style ������ �Ҷ��� ����ϼ���.
		  <br>�⺻��:<code>""</code>

		  @type {string=} jgrid.grid.ColumnManager.options.colDef.headerStyle
		  @private

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		// stringify
		this.headerStyle = args['headerStyle']+ '' || null;

		/**
		  ������ parsing �� ����ϴ� �Լ��Դϴ�. �׸��忡 �Էµǰų� ������ ����Ǵ� ��� �����ʹ� �� �Լ��� ���ؼ�
		  parsing �� �˴ϴ�.
		  !!!!!!!!!!!!!!!
		  Ŀ���� ���� �Ǵ� "string", "number" �� �Է��� �� �ֽ��ϴ�.<br>�⺻��:<code>undefined</code>

		  @type {Array.<Object> | string=} jgrid.grid.ColumnManager.options.colDef.parser
		  @private

		  @author ����ȣ
		  @since 1.3.0
		  @version 1.3.0
		  */
		if (args['parser']&& typeof args['parser']!= 'function') {
			throw new Error('Invalid parser!' + error);
		}
		this.parser = args['parser']|| null;

		/**
		  ���͸� �ÿ� ���� �߰� �ɼ� �����Դϴ�. Ŀ���� ���� �Ǵ� "string", "number" �� �Է��� �� �ֽ��ϴ�.<br>�⺻��:<code>undefined</code>
		  !!!!!!!!!!
		  @type {Array.<Object> | string=} jgrid.grid.ColumnManager.options.colDef.validator
		  @private

		  @author ����ȣ
		  @since 1.3.0
		  @version 1.3.0
		  */
		if (args['validator']&& typeof args['validator']!= 'function') {
			throw new Error('Invalid validator!' + error);
		}
		this.validator = args['validator']|| null;

		/**
		  �÷� �� ������.
		  �������� �Ķ���ͷ� {@link jgrid.grid.Cell Cell} �ν��Ͻ� �Ǵ�
		  value, rowIdx, colIdx, datarow, colDef, {@link jgrid.grid.ViewportManager ViewportManager} �� ������� �ް�,
		  �� HTML �� �����ϴ� Function �Դϴ�.
		  <br>�⺻��:�⺻ �ؽ�Ʈ ������

		  @type {Function=} jgrid.grid.ColumnManager.options.colDef.renderer
		  @private
		  @see jgrid.grid.ColumnManager.options.colDef.rendererInput

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		if (args['renderer']&& typeof args['renderer']!= 'function') {
			throw new Error('Invalid renderer!' + error);
		}
		this.renderer = args['renderer']|| null;

		/**
		  �÷� ������ �հ��� {@link jgrid.grid.Footer Footer} �� ǥ�� ����.
		  "krw" �Է½� \ 10,000,000 �������� �������ϸ�, "usd" �Է½� $ 10,000,000.00 �������� ������ �մϴ�.
		  �Լ� �Է½� �÷���� �հ� ���� �Ķ���ͷ� �޽��ϴ�.
		  <br>�⺻��:<code>undefined</code>

		  @type {Function=} jgrid.grid.ColumnManager.options.colDef.sumRenderer
		  @private

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		if (args['sumRenderer']&& typeof args['sumRenderer']!= 'function') {
			throw new Error('Invalid sum renderer!' + error);
		}
		this.sumRenderer = args['sumRenderer']|| null;

		/**
		  �� �������� �� �� ���Ǵ� �÷� ������. <br>�⺻��:<code>undefined</code>

		  @type {jgrid.grid.Editor=} jgrid.grid.ColumnManager.options.colDef.editor
		  @private

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		if (args['editor']&& typeof args['editor']!= 'object') {
			throw new Error('Invalid editor!' + error);
		}
		this.editor = args['editor']|| null;

		/**
		  �÷� ������ �� ���Ǵ� �÷� ���� ������Ʈ. <br>�⺻��:<code>undefined</code>

		  @type {Object=} jgrid.grid.ColumnManager.options.colDef.sorter
		  @private

		  @author ����ȣ
		  @since 1.0.0
		  @version 1.0.0
		  */
		this.sorter = args['sorter']|| null;

		/**
		  ���͸� �ÿ� ���� �߰� �ɼ� �����Դϴ�. Ŀ���� ���� �Ǵ� "string", "number" �� �Է��� �� �ֽ��ϴ�.<br>�⺻��:<code>undefined</code>

		  @type {Array.<Object> | string=} jgrid.grid.ColumnManager.options.colDef.filter
		  @private

		  @author ����ȣ
		  @since 1.2.0
		  @version 1.2.0
		  */
		this.filter = args['filter']|| null;
	}

	goog.inherits(Column, EventDispatcher);

	var proto = Column.prototype;

	proto.show = function() {
		if (this.hidden) {
			this.hidden = false;
			this.dispatchEvent({
				'type': 'hidden',
				'value': false
			});
			return true;
		}
		return false;
	}

	proto.hide = function() {
		if (!this.hidden) {
			this.hidden = true;
			this.dispatchEvent({
				'type': 'hidden',
				'value': true
			});
			return true;
		}
		return false;
	}

	proto.setHidden = function(hidden) {
		return hidden ? this.hide() : this.show();
	}

	proto.setWidth = function(w) {
		w = Number(w);
		if (w && this.width !== w) {
			this.width = w;
			this.dispatchEvent({
				'type': 'width',
				'value': w
			});
			return w;
		}
		return false;
	}

	proto.setRenderer = function(renderer) {
		if (this.renderer !== renderer) {
			if (renderer && typeof renderer != 'function') {
				var error = 'column key=' + this.key;
				throw new Error('Invalid renderer!' + error);
			}
			this.renderer = renderer || null;
			this.dispatchEvent({
				'type': 'renderer',
				'value': renderer
			});
		}
	}

}());

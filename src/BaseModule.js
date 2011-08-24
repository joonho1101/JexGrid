window.console && window.console.log && window.console.log('reading javascript source "BaseModule.js"...');//IF_DEBUG

goog.require('array_extension');
goog.require('jx.lang.Disposable');
goog.require('jx.events.EventDispatcher');
goog.require('jx.grid');

goog.provide('jx.grid.BaseModule');

/*!
 * AUTHOR
 *   The JexGrid was written and is maintained by:
 *       Joon Ho Cho <joonho1101@gmail.com>
 * COPYRIGHT
 *   Copyright (c) 2010-2011, WebCash Inc. All rights reserved.
 */

(function() {'use strict';

 var EventDispatcher = goog.getObjectByName('jx.events.EventDispatcher');
	goog.exportSymbol('jx.grid.BaseModule', BaseModule);

	/**
	 * �׸��� ���� ����� �����մϴ�.
	 * _defaultOptions �� ����Ͽ� ��� �ɼ��� �ͽ��ٵ��ϰ�, _init �Լ��� ���ϰ� _bindEvents �� ���մϴ�.
	 * Ŭ������ ���ǵ� �̺�Ʈ �ڵ鷯���� �̺�Ʈ�� �������� ���ݴϴ�.
	 * �� Ŭ������ abstract Ŭ���� �Դϴ�. ���� Ŭ���� ����Ʈ���Ϳ��� goog.base �� ����Ͽ� �� ����Ʈ���͸� ���ؾ� �մϴ�.
	 *
	 * @constructor
	 * @abstract
	 * @protected
	 * @class jx.grid.BaseModule
	 * @extends jx.events.EventDispatcher
	 *
	 * @param {object} args - ��� �Ķ���� ������Ʈ
	 * @param {string} [args.mid] - ��� ���̵�
	 * @param {jx.grid.Grid} [args.grid] - ����� ���ϴ� �׸��� �ν��Ͻ�
	 * @param {object} [args.options] - ��� �ɼ�
	 *
	 * @event jx.grid.Grid#event:afterOption
	 * @event jx.grid.Grid#event:beforeInit
	 * @event jx.grid.Grid#event:afterInit
	 * @event jx.grid.Grid#event:beforeBindEvents
	 * @event jx.grid.Grid#event:afterBindEvents
	 * @event jx.grid.Grid#event:complete
	 * @event jx.grid.Grid#event:beforeDispose 
	 * @event jx.grid.Grid#event:afterDispose 
	 * @event jx.grid.Grid#event:beforeCreateCss 
	 * @event jx.grid.Grid#event:afterCreateCss 
	 * @event jx.grid.Grid#event:beforeCreateDynamicCss 
	 * @event jx.grid.Grid#event:afterCreateDynamicCss 
	 * @event jx.grid.Grid#event:beforeRender 
	 * @event jx.grid.Grid#event:afterRender 
	 * @event jx.grid.Grid#event:beforeKeydown 
	 * @event jx.grid.Grid#event:afterKeydown 
	 * @event jx.grid.Grid#event:beforeKeyup 
	 * @event jx.grid.Grid#event:afterKeyup 
	 * @event jx.grid.Grid#event:beforeKeypress 
	 * @event jx.grid.Grid#event:afterKeypress 
	 * @event jx.grid.Grid#event:beforeMousein 
	 * @event jx.grid.Grid#event:afterMousein 
	 * @event jx.grid.Grid#event:beforeMouseout 
	 * @event jx.grid.Grid#event:afterMouseout 
	 * @event jx.grid.Grid#event:beforeMouseenter 
	 * @event jx.grid.Grid#event:afterMouseenter 
	 * @event jx.grid.Grid#event:beforeMouseleave 
	 * @event jx.grid.Grid#event:afterMouseleave 
	 * @event jx.grid.Grid#event:beforeMousemove 
	 * @event jx.grid.Grid#event:afterMousemove 
	 * @event jx.grid.Grid#event:beforeMouseover 
	 * @event jx.grid.Grid#event:afterMouseover 
	 * @event jx.grid.Grid#event:beforeMousedown 
	 * @event jx.grid.Grid#event:afterMousedown 
	 * @event jx.grid.Grid#event:beforeMouseup 
	 * @event jx.grid.Grid#event:afterMouseup 
	 * @event jx.grid.Grid#event:beforeClick 
	 * @event jx.grid.Grid#event:afterClick 
	 * @event jx.grid.Grid#event:beforeDblclick 
	 * @event jx.grid.Grid#event:afterDblclick 
	 * @event jx.grid.Grid#event:beforeResize 
	 * @event jx.grid.Grid#event:afterResize 
	 * @event jx.grid.Grid#event:beforeResizeWidth 
	 * @event jx.grid.Grid#event:afterResizeWidth 
	 * @event jx.grid.Grid#event:beforeResizeHeight 
	 * @event jx.grid.Grid#event:afterResizeHeight 
	 * @event jx.grid.Grid#event:beforeScroll 
	 * @event jx.grid.Grid#event:afterScroll 
	 * @event jx.grid.Grid#event:beforeScrollH 
	 * @event jx.grid.Grid#event:afterScrollH 
	 * @event jx.grid.Grid#event:beforeScrollV
	 * @event jx.grid.Grid#event:afterScrollV
	 *
	 * @see #mid
	 * @see #grid
	 * @see #_defaultOptions
	 * @see #_init
	 * @see #_options
	 * @see #_bindEvents
	 * @see #dispatchEvent
	 * @see #_beforeDispose 
	 * @see #_afterDispose 
	 * @see #_beforeCreateCss 
	 * @see #_afterCreateCss 
	 * @see #_beforeCreateDynamicCss 
	 * @see #_afterCreateDynamicCss 
	 * @see #_beforeRender 
	 * @see #_afterRender 
	 * @see #_beforeKeydown 
	 * @see #_afterKeydown 
	 * @see #_beforeKeyup 
	 * @see #_afterKeyup 
	 * @see #_beforeKeypress 
	 * @see #_afterKeypress 
	 * @see #_beforeMousein 
	 * @see #_afterMousein 
	 * @see #_beforeMouseout 
	 * @see #_afterMouseout 
	 * @see #_beforeMouseenter 
	 * @see #_afterMouseenter 
	 * @see #_beforeMouseleave 
	 * @see #_afterMouseleave 
	 * @see #_beforeMousemove 
	 * @see #_afterMousemove 
	 * @see #_beforeMouseover 
	 * @see #_afterMouseover 
	 * @see #_beforeMousedown 
	 * @see #_afterMousedown 
	 * @see #_beforeMouseup 
	 * @see #_afterMouseup 
	 * @see #_beforeClick 
	 * @see #_afterClick 
	 * @see #_beforeDblclick 
	 * @see #_afterDblclick 
	 * @see #_beforeResize 
	 * @see #_afterResize 
	 * @see #_beforeResizeWidth 
	 * @see #_afterResizeWidth 
	 * @see #_beforeResizeHeight 
	 * @see #_afterResizeHeight 
	 * @see #_beforeScroll 
	 * @see #_afterScroll 
	 * @see #_beforeScrollH 
	 * @see #_afterScrollH 
	 * @see #_beforeScrollV
	 * @see #_afterScrollV
	 *
	 * @since 2.0.0
	 * @version 2.0.0
	 */
	function BaseModule(args) {
		if (args) {
			// module ID
			if (args.mid != null) {
				this.mid = args.mid;
			}

			// grid
			if (args.grid) {
				this.grid = args.grid;
			}
		}

		// options
		var defaults = this._defaultOptions && this._defaultOptions(args.grid),
			opts = args && args['options'];
		if (opts || defaults) {
			if (!defaults) {
				defaults = {};
			}
			if (opts) {
				$.extend(true, defaults, opts);
			}
			this._options = defaults;
			this.dispatchEvent({
				'type':'afteroption',
				'options':defaults
			});
		}

		// init
		if (this._init) {
			this.dispatchEvent({
				'type':'beforeinit'
			});
			this._init(args);
			this.dispatchEvent({
				'type':'afterinit'
			});
		}

		var that = this,
			grid = this.grid;
		if (grid) {
			/*
			 * Common Grid Events
			 */
			['Dispose', 'CreateCss', 'CreateDynamicCss', 'Render', 'Keydown', 'Keyup', 'Keypress', 'Mousein', 'Mouseout', 'Mouseenter', 'Mouseleave', 'Mousemove', 'Mouseover', 'Mousedown', 'Mouseup', 'Click', 'Dblclick', 'Resize', 'ResizeWidth', 'ResizeHeight', 'Scroll', 'ScrollH', 'ScrollV'].forEach(function(name) {
				var before = 'before' + name,
					after = 'after' + name,
					beforefn = '_' + before,
					afterfn = '_' + after;
				if (that[beforefn]) {
					grid.addEventListener(before, function(event) {
						return that[beforefn](event);
					});
				}
				if (that[afterfn]) {
					grid.addEventListener(after, function(event) {
						return that[afterfn](event);
					});
				}
			});
		}

		// bindEvents
		if (this._bindEvents) {
			this.dispatchEvent({
				'type':'beforebindevents'
			});
			this._bindEvents(args);
			this.dispatchEvent({
				'type':'afterbindevents'
			});
		}

		// complete instantiation
		this.dispatchEvent({
			'type':'complete'
		});
	}

	goog.inherits(BaseModule, EventDispatcher);

	/**
	 * @lends jx.grid.BaseModule#
	 */
	var proto = BaseModule.prototype,
		superdispose = proto.dispose;

	/**
	 * �� ����� ���ϴ� �׸��尡 dispose �� ���� �Ͽ� beforeDispose �̺�Ʈ�� �߻������� �� �ݵǴ� �ڵ鷯�Դϴ�.
	 *
	 * @private
	 * @lends jx.grid.BaseModule#
	 *
	 * @name #_beforeDispose
	 * @event jx.grid.Grid#event:beforeDispose
	 *
	 * @see #dispose
	 * @see jx.grid.Grid#dispose
	 *
	 * @since 2.0.0
	 * @version 2.0.0
	 */
	proto._beforeDispose = function() {
		this.dispose();
	}

	/**
	 * �� ����� dispose �մϴ�. �ַ� field ���� delete �Ͽ� GarbageCollector �� �޸𸮸� �����ϱ� �����ϰ� ���ݴϴ�.
	 *
	 * @public
	 * @lends jx.grid.BaseModule#
	 *
	 * @event #event:beforeDispose
	 * @event #event:afterDispose
	 *
	 * @since 2.0.0
	 * @version 2.0.0
	 */
	proto.dispose = function() {
		delete this.grid;
		this.dispatchEvent({
			'type':'beforedispose'
		});
		superdispose.call(this);
	}

	/**
	 * �� ����� �Ҽӵ� �׸����� ������ �Ŵ��� �ν��Ͻ��� �����մϴ�.
	 *
	 * @public
	 * @lends jx.grid.BaseModule#
	 *
	 * @returns {jx.data.DataManager} �� ����� �Ҽӵ� �׸����� ������ �Ŵ��� �ν��Ͻ�
	 *
	 * @see jx.grid.Grid#dataMgr
	 *
	 * @since 2.0.0
	 * @version 2.0.0
	 */
	proto.getDataMgr = function() {
		return this.grid['dataMgr'];
	}

	/**
	 * �� ����� �Ҽӵ� �׸����� ��� �������� ��̸� �����մϴ�.
	 *
	 * @public
	 * @lends jx.grid.BaseModule#
	 *
	 * @returns {object[]} �� ����� �Ҽӵ� �׸����� ��� ������ ���
	 *
	 * @see jx.data.DataManager#all
	 *
	 * @since 2.0.0
	 * @version 2.0.0
	 */
	proto.getAllData = function() {
		return this.grid['dataMgr']['all'];
	}

	/**
	 * �� ����� �Ҽӵ� �׸����� ȭ�鿡 ���̴� �������� ��̸� �����մϴ�.
	 *
	 * @public
	 * @lends jx.grid.BaseModule#
	 *
	 * @returns {object[]} �� ����� �Ҽӵ� �׸����� ȭ�鿡 ���̴� ������ ���
	 *
	 * @see jx.data.DataManager#datalist
	 *
	 * @since 2.0.0
	 * @version 2.0.0
	 */
	proto.getDataList = function() {
		return this.grid['dataMgr']['datalist'];
	}

	/**
	 * �� ����� �Ҽӵ� �׸����� ������ �Ŵ����� idKey �� �����մϴ�.
	 *
	 * @public
	 * @lends jx.grid.BaseModule#
	 *
	 * @returns {string} �� ����� �Ҽӵ� �׸����� ������ �Ŵ����� idKey
	 *
	 * @see jx.data.DataManager#idKey
	 *
	 * @since 2.0.0
	 * @version 2.0.0
	 */
	proto.getIdKey = function() {
		return this.grid['dataMgr'].idKey;
	}

	/**
	 * �� ����� �Ҽӵ� �׸����� �÷� �Ŵ����� �����մϴ�.
	 *
	 * @public
	 * @lends jx.grid.BaseModule#
	 *
	 * @returns {jx.grid.ColumnManager} �� ����� �Ҽӵ� �׸����� �÷� �Ŵ���
	 *
	 * @see jx.grid.Grid#colDefMgr
	 *
	 * @since 2.0.0
	 * @version 2.0.0
	 */
	proto.getColMgr = function() {
		return this.grid['colDefMgr'];
	}

	/**
	 * �� ����� �Ҽӵ� �׸����� �÷� ���� ������Ʈ ��̸� �����մϴ�.
	 *
	 * @public
	 * @lends jx.grid.BaseModule#
	 *
	 * @returns {object[]} �� ����� �Ҽӵ� �׸����� �÷� ���� ������Ʈ ���
	 *
	 * @see jx.grid.ColumnManager#get
	 *
	 * @since 2.0.0
	 * @version 2.0.0
	 */
	proto.getColumns = function() {
		return this.grid['colDefMgr'].get();
	}

	/**
	 * �� ����� �Ҽӵ� �׸����� �̺�Ʈ �Ŵ����� �����մϴ�.
	 *
	 * @public
	 * @lends jx.grid.BaseModule#
	 *
	 * @returns {jx.grid.EventManager} �� ����� �Ҽӵ� �׸����� �̺�Ʈ �Ŵ���
	 *
	 * @see jx.grid.Grid#event
	 *
	 * @since 2.0.0
	 * @version 2.0.0
	 */
	proto.getEventMgr = function() {
		return this.grid['event'];
	}

	/**
	 * �� ����� �Ҽӵ� �׸����� ����Ʈ �Ŵ����� �����մϴ�.
	 *
	 * @public
	 * @lends jx.grid.BaseModule#
	 *
	 * @returns {jx.grid.ViewportManager} �� ����� �Ҽӵ� �׸����� ����Ʈ �Ŵ���
	 *
	 * @see jx.grid.Grid#view
	 *
	 * @since 2.0.0
	 * @version 2.0.0
	 */
	proto.getView = function() {
		return this.grid['view'];
	}

	/**
	 * �� ����� �Ҽӵ� �׸����� �÷� ����� �����մϴ�.
	 *
	 * @public
	 * @lends jx.grid.BaseModule#
	 *
	 * @returns {jx.grid.ColumnHeader} �� ����� �Ҽӵ� �׸����� �÷� ���
	 *
	 * @see jx.grid.Grid#header
	 *
	 * @since 2.0.0
	 * @version 2.0.0
	 */
	proto.getHeader = function() {
		return this.grid['header'];
	}

	/**
	 * �� ����� �Ҽӵ� �׸����� �̺�Ʈ �Ŵ����� �̺�Ʈ �ڵ鷯�� ���ε��մϴ�.
	 *
	 * @public
	 * @lends jx.grid.BaseModule#
	 *
	 * @param {} 
	 *
	 * @see jx.grid.Grid#event
	 * @see jx.grid.EventManager#bind
	 *
	 * @since 2.0.0
	 * @version 2.0.0
	 */
	proto.bindGridEvent = function() {
		var event = this.grid['event'];
		return event.bind.apply(event, arguments);
	}

	/**
	 * �� ����� �Ҽӵ� �׸����� �̺�Ʈ �Ŵ����� �̺�Ʈ�� Ʈ�����մϴ�.
	 *
	 * @public
	 * @lends jx.grid.BaseModule#
	 *
	 * @param {} 
	 *
	 * @see jx.grid.Grid#event
	 * @see jx.grid.EventManager#trigger
	 *
	 * @since 2.0.0
	 * @version 2.0.0
	 */
	proto.triggerGridEvent = function() {
		var event = this.grid['event'];
		return event.trigger.apply(event, arguments);
	}

	/**
	 * �� ����� ���� CSS ��Ÿ�� ��Ʈ���� �����Ͽ� �����մϴ�. �� ������ �����Ϳ� �ϳ� �̻��� ��Ÿ���� ������ �� ����մϴ�.
	 *
	 * @public
	 * @lends jx.grid.BaseModule#
	 *
	 * @param {string} selector - CSS ������
	 * @param {string|object<string>} styles - string �� ��� �״�� CSS ��Ÿ�Ͽ� �߰��ǰ�, object �� ��� key ���� CSS ��Ÿ�� ��, value ���� CSS ��Ÿ�� ������ �߰��˴ϴ�.
	 * @param {boolean} noGridId - true �� ���, �����Ϳ� �׸��� ���̵� ������ �ʽ��ϴ�. false �� ���, �׸��� ���̵� �����Ϳ� ���ԵǾ� �׸��� �����̳� ������ DOM ������Ʈ���� ��Ÿ���� ����˴ϴ�.
	 *
	 * @returns {string} CSS ��Ÿ�� ��Ʈ��
	 *
	 * @see #toCssStyles
	 *
	 * @since 2.0.0
	 * @version 2.0.0
	 */
	proto.toCssStyle = function(selector, styles, noGridId) {
		var css = [];

		if (!noGridId) {
			selector = '#' + this.grid['mid'] + ' ' + selector;
		}

		if (typeof styles != 'string') {
			var i,
				append = '';

			if (styles.hasOwnProperty('_prepend')) {
				if (styles._prepend) {
					css.push(styles._prepend);
				}
				delete styles._prepend;
			}

			if (styles.hasOwnProperty('_append')) {
				if (styles._append) {
					append = ';' + styles._append;
				}
				delete styles._append;
			}

			for (i in styles) {
				css.push(i + ':' + styles[i]);
			}

			css = css.join(';') + append;
		}

		return selector + '{' + css + '}';
	}

	/**
	 * �� ����� ���� CSS ��Ÿ�� ��Ʈ���� �����Ͽ� �����մϴ�. �ϳ� �̻��� �����Ϳ� �ϳ� �̻��� ��Ÿ���� ������ �� ����մϴ�.
	 *
	 * @public
	 * @lends jx.grid.BaseModule#
	 *
	 * @param {string[]} [selector] - CSS ��Ÿ�� ��Ʈ���� ������ ���. �־����� ���� ��� �� ��̸� ���� �����մϴ�.
	 * @param {object<string|object<string>>} styles - key ���� CSS ������ ��, value ���� {@link #toCssStyle} �� styles ������ �������ϴ�.
	 * @param {boolean} noGridId - true �� ���, ��� �����Ϳ� �׸��� ���̵� ������ �ʽ��ϴ�. false �� ���, �׸��� ���̵� ��� �����Ϳ� ���ԵǾ� �׸��� �����̳� ������ DOM ������Ʈ���� ��Ÿ���� ����˴ϴ�.
	 *
	 * @returns {string[]} CSS ��Ÿ�� ��Ʈ������ ������ ���
	 *
	 * @see #toCssStyle
	 *
	 * @since 2.0.0
	 * @version 2.0.0
	 */
	proto.toCssStyles = function(css, styles, noGridId) {
		var css = css || [],
			i;

		for (i in styles) {
			css.push(this.toCssStyle(i, styles[i], noGridId));
		}

		return css;
	}

}());

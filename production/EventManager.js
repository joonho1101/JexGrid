goog.require('engine_extension');
goog.require('jx.util');
goog.require('jx.grid');
goog.require('jx.grid.BaseModule');
goog.provide('jx.grid.EventManager');
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
	BaseModule = goog.getObjectByName('jx.grid.BaseModule');
 goog.exportSymbol('jx.grid.EventManager', EventManager);
 /**
   Grid �� �̺�Ʈ�� ����ϴ� ���. ���� ���� ��Ȱ�� Ŀ�´�����Ʈ�� �����ϰ�
   �մϴ�.
   @module EventManager
   */
 /**
   Grid �̺�Ʈ �Ŵ��� Ŭ����. Grid �� ��� �鰣�� Ŀ�´����̼��� �� Ŭ������
   ���� �̺�Ʈ�� ��������/Ʈ���� �����ν� �̷�����ϴ�. ���� �ٸ� ����� �Լ���
   ȣ���ϴ� ����� ������ �̺�Ʈ�� ���ϸ� �ٸ� ��� �ν��Ͻ��� ���� ���� �Ǵ�
   �̸��� ���� �� �Ͽ��� ��ȣ Ŀ�´�����Ʈ �� �� �ִ� ������ �ֽ��ϴ�.
   @class {EventManager} jx.grid.EventManager
   @author ����ȣ
   @since 1.0.0
   @version 1.1.7
   */
 /**
   EventManager ����Ʈ���� �Դϴ�.
   @constructor {EventManager} EventManager
   @param {Object} args - EventManager ��� �Ķ���� ������Ʈ
   @returns {EventManager} EventManager ��� �ν��Ͻ��� �����մϴ�.
   @author ����ȣ
   @since 1.0.0
   @version 1.0.0
   */
 function EventManager(args) {
	 /**
	   {@link JGM} �� �Ҵ����ִ� EventManager ��� ���� ���̵��Դϴ�. �б� ����.
	   @var {string} mid
	   @author ����ȣ
	   @since 1.0.0
	   @version 1.0.0
	   */
	 this.mid = args.mid;
	 this.grid = args.grid;
	 /**
	   Grid ���� ��� �̺�Ʈ �������Ϳ� Ʈ���Ÿ� ����ϴ� {@link jx.grid.EventManager EventManager} �ν��Ͻ� �Դϴ�.
	   @var {jx.grid.EventManager} jx.grid.Grid.event
	   @author ����ȣ
	   @since 1.0.0
	   @version 1.0.0
	   */
	 args.grid.event = this;
	 this._map = {};
 }
 EventManager.getInstance = function(args) {
	 return new EventManager(args);
 };
 var prototype = EventManager.prototype;
 prototype.destroy = function() {
	 var i,
		 map = this._map;
	 for (i in map) {
		 if (map.hasOwnProperty(i)) {
			 JGM._deleteArray(map, i);
		 }
	 }
	 JGM._destroy(this, {
name: "EventManager",
path: "event",
map: "_map"
});
};
/**
  �ϳ� �Ǵ� ������ �̺�Ʈ �ڵ鷯�� �������� �մϴ�.
  @function {} register
  @paramset �Ѱ��� �̺�Ʈ�� ����� ��� 1
  @param {string} event - �̺�Ʈ �̸�. �������� �̺�Ʈ�� ��ĭ���� ��� ���� �ѹ���
  ���� �̺�Ʈ�� ���� �ڵ鷯�� ������Ʈ�� ����� �� �ֽ��ϴ�.
  @param {function|Array.<function>} fn - �̺�Ʈ �ڵ鷯 �Լ�. �Լ� ����� ��� �̺�Ʈ��
  �������� �̺�Ʈ �ڵ鷯 �Լ��� ����մϴ�.
  @param {?=} target - �̺�Ʈ �ڵ鷯 ������Ʈ. ȣ�� �Լ��� this ��
  �������ϴ�. �־����� ���� ���, window ������Ʈ�� �������ϴ�.
  @paramset �Ѱ��� �̺�Ʈ�� ����� ��� 2
  @param {Object} args - �̺�Ʈ �Ķ����
  @... {string} args.e - event �� ����
  @... {function|Array.<function>} args.f - fn �� ����
  @... {?=} args.t - target �� ����
  @paramset �������� �̺�Ʈ�� ����� ���
  @param {Array.<Object>} args - �̺�Ʈ ��� �Ķ����
  @... {string} args[i].e - event �� ����
  @... {function|Array.<function>} args[i].f - fn �� ����
  @... {?=} args[i].t - target �� ����
  @author ����ȣ
  @since 1.0.0
  @version 1.1.6
  */
prototype.register = function(events, fn, target) {
	if (Util.isString(events)) {
		this._parseAndAdd(events, fn, target);
	}
	else {
		if (Util.isNotNull(events.e)) {
			this._parseAndAdd(events.e, events.f, events.t);
		}
		else {
			var i,
				len = events.length,
				e;
			for (; i < len; i++) {
				if (Util.isNotNull(e = events[i])) {
					this._parseAndAdd(e.e, e.f, e.t);
				}
			}
		}
	}
};
/**
  jQuery.bind �� ����� �����Դϴ�. �ϳ� �Ǵ� ������ �̺�Ʈ �ڵ鷯�� �������� �մϴ�.
  @function {} bind
  @paramset �Ѱ��� �̺�Ʈ�� ����� ��� 1
  @param {string} event - �̺�Ʈ �̸�. �������� �̺�Ʈ�� ��ĭ���� ��� ���� �ѹ���
  ���� �̺�Ʈ�� ���� �ڵ鷯�� ������Ʈ�� ����� �� �ֽ��ϴ�.
  @param {function|Array.<function>} fn - �̺�Ʈ �ڵ鷯 �Լ�. �Լ� ����� ��� �̺�Ʈ��
  �������� �̺�Ʈ �ڵ鷯 �Լ��� ����մϴ�.
  @param {?=} target - �̺�Ʈ �ڵ鷯 ������Ʈ. ȣ�� �Լ��� this ��
  �������ϴ�. �־����� ���� ���, window ������Ʈ�� �������ϴ�.
  @paramset �Ѱ� �̻��� �̺�Ʈ�� ����� ���
  @param {Object} args - �̺�Ʈ ��� �Ķ����
  @... {string} args.key - event �� ����
  @... {function|Array.<function>} args[args.key] - fn �� ����
  @param {?=} target - target.
  @author ����ȣ
  @since 1.1.6
  @version 1.1.6
  */
prototype.bind = function(events, fn, target) {
	if (Util.isString(events)) {
		this._parseAndAdd(events, fn, target);
	}
	else {
		var e;
		for (e in events) {
			if (events.hasOwnProperty(e)) {
				this._parseAndAdd(e, events[e], fn);
			}
		}
	}
};
prototype._parseAndAdd = function(events, fn, target) {
	if (Util.isNull(target)) {
		target = window;
	}
	var arr = Util.split(events),
		len = arr.length,
		i = 0;
	if (Util.isFunction(fn)) {	// Function
		for (; i < len; i++) {
			this._addHandler(arr[i], fn, target);
		}
	}
	else if (Util.isString(fn)) {	// String
		var fns = Util.split(fn),
			flen = fns.length,
			e,
			j;
		for (; i < len; i++) {
			e = arr[i];
			for (j = 0; j < flen; j++) {
				this._addHandler(e, target[fns[j]], target);
			}
		}
	}
	else {	// Function[]
		var flen = fn.length,
			e,
			j;
		for (; i < len; i++) {
			e = arr[i];
			for (j = 0; j < flen; j++) {
				this._addHandler(e, fn[j], target);
			}
		}
	}
};
prototype._addHandler = function(e, fn, target) {
	if (!this._map.hasOwnProperty(e)) {
		this._map[e] = [];
	}
	this._map[e].push({'fn':fn, 'target':target});
};
/**
  �̺�Ʈ �ڵ鷯�� �������� �մϴ�. fn �Ķ���͸� �Է��� ��� fn �ڵ鷯��
  �����ϰ� �׷��� ���� ��� �̺�Ʈ �̸��� �������͵� ��� �ڵ鷯�� �����մϴ�.
  @function {} unregister
  @param {string} event - �̺�Ʈ �̸�
  @param {Function=} fn - �̺�Ʈ �ڵ鷯 �Լ�
  @author ����ȣ
  @since 1.0.0
  @version 1.0.0
  */
prototype.unregister = function(event, fn) {
	var map = this._map;
	if (!map.hasOwnProperty(event)) {
		return;
	}
	var hans = map[event];
	if (Util.isNull(fn)) {
		hans.length = 0;
		delete map[event];
		return;
	}
	var i = 0,
		len = hans.length;
	for (; i < len; i++) {
		if (hans[i].fn === fn) {
			hans.removeAt(i);
			if (hans.length === 0) {
				delete map[event];
			}
			return;
		}
	}
};
/**
  �ϳ� �̻��� �̺�Ʈ�� Ʈ���� �մϴ�. �ش� �̸��� �������� �� ��� �̺�Ʈ �ڵ鷯����
  �Ķ���͸� �Ѱ��ְ� ȣ���� ���� ����� Array �� �ְ� �����մϴ�.
  @function {?[]} trigger
  @param {string} event - �̺�Ʈ �̸�. ���� �̺�Ʈ�� �̸��� ��ĭ���� ���� ���� �̺�Ʈ�� ���ÿ� Ʈ�����մϴ�.
  @param {?[]=} args - �̺�Ʈ �ڵ鷯�� �Էµ� �Ķ���� ���
  @param {Function(?)=} filter - �̺�Ʈ ���� �� ���͸� �Լ�. ����
  ������ ���͸� �� �� ���˴ϴ�. ���� ���� �Ķ���ͷ� �޾Ƽ� true �� �����ϸ�
  ���� ���� �̺�Ʈ ���� Array �� �߰��˴ϴ�.
  @returns {?[]} Event Result ���
  @author ����ȣ
  @since 1.0.0
  @version 1.1.7
  */
prototype.trigger = function(events, args, filter) {
	var	hans,
		hlen,
		map = this._map,
		rarr = [],
		arr = Util.split(events),
		len = arr.length,
		noarg = Util.isEmptyArray(args),
		filon = Util.isFunction(filter),
		e,
		i,
		j = 0;
	for (; j < len; j++) {
		e = arr[j];
		if (!map.hasOwnProperty(e)) {
			continue;
		}
		hans = map[e];		
		hlen = hans.length;
		if (hlen === 0) {
			continue;
		}
		i = 0;
		if (filon) {
			var res;
			if (noarg) {
				for (; i < hlen; i++) {
					res = hans[i].fn.call(hans[i].target);
					if (filter(res)) {
						rarr.push(res);
					}
				}
			}
			else {
				for (; i < hlen; i++) {
					res = hans[i].fn.apply(hans[i].target, args);
					if (filter(res)) {
						rarr.push(res);
					}
				}
			}
		}
		else {
			if (noarg) {
				for (; i < hlen; i++) {
					rarr.push(hans[i].fn.call(hans[i].target));
				}
			}
			else {
				for (; i < hlen; i++) {
					rarr.push(hans[i].fn.apply(hans[i].target, args));
				}
			}
		}
	}
	return rarr;
};
prototype.triggerInvalid = function(events, args) {
	return this.trigger(events, args, function(a) { return a === false; }).length !== 0;
};
/**
  �̺�Ʈ �̸��� �̺�Ʈ ť���� �Լ��� �� ���������� �����ϴ�. �̺�Ʈ Ʈ���� �� ����
  ���߿� ����˴ϴ�.
  @function {} sendToBack
  @param {string} event - �̺�Ʈ �̸�
  @param {Function} fn - �̺�Ʈ �ڵ鷯 �Լ�
  @author ����ȣ
  @since 1.0.0
  @version 1.0.0
  */
prototype.sendToBack = function(event, fn) {
	var eventQueue = this._map[event],
		len = eventQueue.length,
		handler,
		index = -1,
		i = 0;
	for (; i < len; i++) {
		if (eventQueue[i].fn === fn) {
			index = i;
			handler = eventQueue[i];
			break;
		}
	}
	if (index > -1) {
		eventQueue.removeAt(i);
		eventQueue.push(handler);
	}
};
/**
  �̺�Ʈ �̸��� �̺�Ʈ ť���� �Լ��� �� ó������ �����ϴ�. �̺�Ʈ Ʈ���� �� ����
  ���� ����˴ϴ�.
  @function {} sendToFront
  @param {string} event - �̺�Ʈ �̸�
  @param {Function} fn - �̺�Ʈ �ڵ鷯 �Լ�
  @author ����ȣ
  @since 1.0.0
  @version 1.0.0
  */
prototype.sendToFront = function(event, fn) {
	var eventQueue = this._map[event],
		len = eventQueue.length,
		handler,
		index = -1,
		i = 0;
	for (; i < len; i++) {
		if (eventQueue[i].fn === fn) {
			index = i;
			handler = eventQueue[i];
			break;
		}
	}
	if (index > -1) {
		eventQueue.removeAt(i);
		eventQueue.unshift(handler);
	}
};
}());

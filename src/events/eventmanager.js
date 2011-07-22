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

 goog.provide('JGM.events.EventManager');
 JGM.events.EventManager = EventManager;

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

   @class {public EventManager} JGM.EventManager

   @author ����ȣ
   @since 1.0.0
   @version 1.1.7
   */

 /**
   EventManager ����Ʈ���� �Դϴ�.

   @constructor {public EventManager} EventManager
   @param {Object} args - EventManager ��� �Ķ���� ������Ʈ
   @returns {EventManager} EventManager ��� �ν��Ͻ��� �����մϴ�.

   @author ����ȣ
   @since 1.0.0
   @version 1.0.0
   */
 function EventManager(args) {
	 /**
	   {@link JGM} �� �Ҵ����ִ� EventManager ��� ���� ���̵��Դϴ�. �б� ����.

	   @var {public final String} mid

	   @author ����ȣ
	   @since 1.0.0
	   @version 1.0.0
	   */
	 this.mid = args.mid;

	 /**
	   Grid ���� ��� �̺�Ʈ �������Ϳ� Ʈ���Ÿ� ����ϴ� {@link JGM.EventManager EventManager} �ν��Ͻ� �Դϴ�.

	   @var {public JGM.EventManager} JGM.Grid.event

	   @author ����ȣ
	   @since 1.0.0
	   @version 1.0.0
	   */
	 args.grid.event = this;

	 this.__map_a__ = {};
 }

 EventManager.getInstance = function(args) {
	 return new EventManager(args);
 };

 var prototype = EventManager.prototype;

 prototype.destroy = function() {
	 var i,
		 map = this.__map_a__;
	 for (i in map) {
		 if (map.hasOwnProperty(i)) {
			 JGM.__deleteArray_r__(map, i);
		 }
	 }

	 JGM._destroy(this, {
name: "EventManager",
path: "event",
map: "__map_a__"
});
};

/**
  �ϳ� �Ǵ� ������ �̺�Ʈ �ڵ鷯�� �������� �մϴ�.

  @function {public} register

  @paramset �Ѱ��� �̺�Ʈ�� ����� ��� 1
  @param {String} event - �̺�Ʈ �̸�. �������� �̺�Ʈ�� ��ĭ���� ��� ���� �ѹ���
  ���� �̺�Ʈ�� ���� �ڵ鷯�� ������Ʈ�� ����� �� �ֽ��ϴ�.
  @param {Function | Function[]} fn - �̺�Ʈ �ڵ鷯 �Լ�. �Լ� ����� ��� �̺�Ʈ��
  �������� �̺�Ʈ �ڵ鷯 �Լ��� ����մϴ�.
  @param {optional ?} target - �̺�Ʈ �ڵ鷯 ������Ʈ. ȣ�� �Լ��� this ��
  �������ϴ�. �־����� ���� ���, window ������Ʈ�� �������ϴ�.

  @paramset �Ѱ��� �̺�Ʈ�� ����� ��� 2
  @param {Object} args - �̺�Ʈ �Ķ����
  @... {String} args.e - event �� ����
  @... {Function | Function[]} args.f - fn �� ����
  @... {optional ?} args.t - target �� ����

  @paramset �������� �̺�Ʈ�� ����� ���
  @param {Object[]} args - �̺�Ʈ ��� �Ķ����
  @... {String} args[i].e - event �� ����
  @... {Function | Function[]} args[i].f - fn �� ����
  @... {optional ?} args[i].t - target �� ����

  @author ����ȣ
  @since 1.0.0
  @version 1.1.6
  */
prototype.register = function(events, fn, target) {
	if (Util.isString(events)) {
		this.__parseAndAdd_b__(events, fn, target);
	}
	else {
		if (Util.isNotNull(events.e)) {
			this.__parseAndAdd_b__(events.e, events.f, events.t);
		}
		else {
			var i,
				len = events.length,
				e;
			for (; i < len; i++) {
				if (Util.isNotNull(e = events[i])) {
					this.__parseAndAdd_b__(e.e, e.f, e.t);
				}
			}
		}
	}
};


/**
  jQuery.bind �� ����� �����Դϴ�. �ϳ� �Ǵ� ������ �̺�Ʈ �ڵ鷯�� �������� �մϴ�.

  @function {public} bind

  @paramset �Ѱ��� �̺�Ʈ�� ����� ��� 1
  @param {String} event - �̺�Ʈ �̸�. �������� �̺�Ʈ�� ��ĭ���� ��� ���� �ѹ���
  ���� �̺�Ʈ�� ���� �ڵ鷯�� ������Ʈ�� ����� �� �ֽ��ϴ�.
  @param {Function | Function[]} fn - �̺�Ʈ �ڵ鷯 �Լ�. �Լ� ����� ��� �̺�Ʈ��
  �������� �̺�Ʈ �ڵ鷯 �Լ��� ����մϴ�.
  @param {optional ?} target - �̺�Ʈ �ڵ鷯 ������Ʈ. ȣ�� �Լ��� this ��
  �������ϴ�. �־����� ���� ���, window ������Ʈ�� �������ϴ�.

  @paramset �Ѱ� �̻��� �̺�Ʈ�� ����� ���
  @param {Object} args - �̺�Ʈ ��� �Ķ����
  @... {String} args.key - event �� ����
  @... {Function | Function[]} args[args.key] - fn �� ����
  @param {optional ?} target - target.

  @author ����ȣ
  @since 1.1.6
  @version 1.1.6
  */
prototype.bind = function(events, fn, target) {
	if (Util.isString(events)) {
		this.__parseAndAdd_b__(events, fn, target);
	}
	else {
		var e;
		for (e in events) {
			if (events.hasOwnProperty(e)) {
				this.__parseAndAdd_b__(e, events[e], fn);
			}
		}
	}
};

prototype.__parseAndAdd_b__ = function(events, fn, target) {
	if (Util.isNull(target)) {
		target = window;
	}

	var arr = Util.split(events),
		len = arr.length,
		i = 0;
	if (Util.isFunction(fn)) {	// Function
		for (; i < len; i++) {
			this.__addHandler_c__(arr[i], fn, target);
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
				this.__addHandler_c__(e, target[fns[j]], target);
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
				this.__addHandler_c__(e, fn[j], target);
			}
		}
	}
};

prototype.__addHandler_c__ = function(e, fn, target) {
	if (!this.__map_a__.hasOwnProperty(e)) {
		this.__map_a__[e] = [];
	}

	this.__map_a__[e].push({fn:fn, target:target});
};

/**
  �̺�Ʈ �ڵ鷯�� �������� �մϴ�. fn �Ķ���͸� �Է��� ��� fn �ڵ鷯��
  �����ϰ� �׷��� ���� ��� �̺�Ʈ �̸��� �������͵� ��� �ڵ鷯�� �����մϴ�.

  @function {public} unregister
  @param {String} event - �̺�Ʈ �̸�
  @param {optional Function} fn - �̺�Ʈ �ڵ鷯 �Լ�

  @author ����ȣ
  @since 1.0.0
  @version 1.0.0
  */
prototype.unregister = function(event, fn) {
	var map = this.__map_a__;
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

  @function {public ?[]} trigger
  @param {String} event - �̺�Ʈ �̸�. ���� �̺�Ʈ�� �̸��� ��ĭ���� ���� ���� �̺�Ʈ�� ���ÿ� Ʈ�����մϴ�.
  @param {optional ?[]} args - �̺�Ʈ �ڵ鷯�� �Էµ� �Ķ���� ���
  @param {optional Function(?)} filter - �̺�Ʈ ���� �� ���͸� �Լ�. ����
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
		map = this.__map_a__,
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

  @function {public} sendToBack
  @param {String} event - �̺�Ʈ �̸�
  @param {Function} fn - �̺�Ʈ �ڵ鷯 �Լ�

  @author ����ȣ
  @since 1.0.0
  @version 1.0.0
  */
prototype.sendToBack = function(event, fn) {
	var eventQueue = this.__map_a__[event],
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

  @function {public} sendToFront
  @param {String} event - �̺�Ʈ �̸�
  @param {Function} fn - �̺�Ʈ �ڵ鷯 �Լ�

  @author ����ȣ
  @since 1.0.0
  @version 1.0.0
  */
prototype.sendToFront = function(event, fn) {
	var eventQueue = this.__map_a__[event],
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

JGM._add("EventManager", EventManager);
}());

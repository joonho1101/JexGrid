goog.require('jx.lang.Disposable');
goog.provide('jx.events.EventDispatcher');
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
(function() {'use strict';
var JGM = goog.getObjectByName('jx.grid'),
	Util = goog.getObjectByName('jx.util'),
	Disposable = goog.getObjectByName('jx.lang.Disposable');
	goog.exportSymbol('jx.events.EventDispatcher', EventDispatcher);
/**
Grid �� �̺�Ʈ�� ����ϴ� ���. ���� ���� ��Ȱ�� Ŀ�´�����Ʈ�� �����ϰ�
�մϴ�.
@module EventDispatcher
*/
/**
Grid �̺�Ʈ �Ŵ��� Ŭ����. Grid �� ��� �鰣�� Ŀ�´����̼��� �� Ŭ������
���� �̺�Ʈ�� ��������/Ʈ���� �����ν� �̷�����ϴ�. ���� �ٸ� ����� �Լ���
ȣ���ϴ� ����� ������ �̺�Ʈ�� ���ϸ� �ٸ� ��� �ν��Ͻ��� ���� ���� �Ǵ�
�̸��� ���� �� �Ͽ��� ��ȣ Ŀ�´�����Ʈ �� �� �ִ� ������ �ֽ��ϴ�.
@class {EventDispatcher} JGM.EventDispatcher
@author ����ȣ
@since 1.0.0
@version 1.1.7
*/
/**
EventDispatcher ����Ʈ���� �Դϴ�.
@constructor {EventDispatcher} EventDispatcher
@param {Object} args - EventDispatcher ��� �Ķ���� ������Ʈ
@returns {EventDispatcher} EventDispatcher ��� �ν��Ͻ��� �����մϴ�.
@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
function EventDispatcher(args) {
}
// class EventDispatcher extends Disposable
goog.inherits(EventDispatcher, Disposable);
var proto = EventDispatcher.prototype,
	sdispose = Disposable.prototype.dispose;
proto.dispose = function() {
	sdispose.call(this._handlers, -1, true);
	sdispose.call(this);
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
proto.addEventListener = function(type, listener) {
	if (!type) {
		throw new Error('Invalid event type: ' + type);
	}
	if (typeof listener != 'function') {
		throw new Error('Event listener must be a function');
	}
	if (!this._handlers) {
		this._handlers = {};
	}
	var map = this._handlers,
		listeners;
	type = (type + '').toLowerCase();
	if (!map.hasOwnProperty(type)) {
		map[type] = [];
	}
	listeners = map[type];
	if (listeners.indexOf(listener) === -1) {
		listeners.push(listener);
	}
};
proto.removeEventListener = function(type, listener) {
	if (!this._handlers) {
		return;
	}
	type = (type + '').toLowerCase();
	var map = this._handlers;
	if (!map.hasOwnProperty(type)) {
		return;
	}
	var listeners = map[type],
		index = -1;
	while ((index = listeners.indexOf(listener, index + 1)) !== -1) {
		listeners.splice(index--, 1);
	}
	if (listeners.length === 0) {
		delete map[type];
	}
};
proto.dispatchEvent = function(event) {
	if (!event || !event.type) {
		throw new Error('Invalid event');
	}
	if (!this._handlers) {
		if (event.cancelable && event.defaultPrevented) {
			return false;
		}
		if (event.defaultAction) {
			event.defaultAction(this);
		}
		return true;
	}
	var map = this._handlers,
		type = (event.type + '').toLowerCase(),
		listeners;
	event.target = this;
	if (map.hasOwnProperty(type)) {
		listeners = map[type].slice();
		var i = 0,
			l = listeners.length,
			listener;
		for (; i < l && !event.stopPropagation; i++) {
			listener = listeners[i];
			if (listener.handleEvent) {
				listener.handleEvent(event);
			}
			else {
				listener.call(this, event);
			}
		}
	}
	if (event.cancelable && event.defaultPrevented) {
		return false;
	}
	if (event.defaultAction) {
		event.defaultAction(this);
	}
	return true;
};
})();

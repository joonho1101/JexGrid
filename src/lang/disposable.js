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
Grid �� �̺�Ʈ�� ����ϴ� ���. ���� ���� ��Ȱ�� Ŀ�´�����Ʈ�� �����ϰ�
�մϴ�.
@module Disposable
*/

/**
Grid �̺�Ʈ �Ŵ��� Ŭ����. Grid �� ��� �鰣�� Ŀ�´����̼��� �� Ŭ������
���� �̺�Ʈ�� ��������/Ʈ���� �����ν� �̷�����ϴ�. ���� �ٸ� ����� �Լ���
ȣ���ϴ� ����� ������ �̺�Ʈ�� ���ϸ� �ٸ� ��� �ν��Ͻ��� ���� ���� �Ǵ�
�̸��� ���� �� �Ͽ��� ��ȣ Ŀ�´�����Ʈ �� �� �ִ� ������ �ֽ��ϴ�.

@class {public Disposable} JGM.Disposable

@author ����ȣ
@since 1.0.0
@version 1.1.7
*/

/**
Disposable ����Ʈ���� �Դϴ�.

@constructor {public Disposable} Disposable
@param {Object} args - Disposable ��� �Ķ���� ������Ʈ
@returns {Disposable} Disposable ��� �ν��Ͻ��� �����մϴ�.

@author ����ȣ
@since 1.0.0
@version 1.0.0
*/
function Disposable(args) {
}

var proto = Disposable.prototype,
	isArray = Util.isArray;

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
proto.dispose = dispose;
function dispose(level, others) {'use strict';
	level = level || 0;
	var i,
		val;
	if (level !== 0) {
		// deep dispose
		for (i in this) {
			if (this.hasOwnProperty(i)) {
				val = this[i];
				if (val) {
					// filter out null and some primitive check
					if (val.dispose) {
						// use dispose if possible
						val.dispose(level - 1, others);
					}
					else if (others && typeof val == 'object') {
						// array or object
						if (isArray(val)) {
							val.length = 0;
						}
						else {
							dispose.call(val, level - 1, others);
						}
					}
				}
				delete this[i];
			}
		}
	}
	else {
		// shallow dispose
		for (i in this) {
			if (this.hasOwnProperty(i)) {
				delete this[i];
			}
		}
	}
};

JGM.lang.Disposable = Disposable;

}());

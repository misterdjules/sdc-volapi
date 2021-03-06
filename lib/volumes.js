/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright (c) 2016, Joyent, Inc.
 */

var assert = require('assert-plus');

var units = require('./units');

var NFS_SHARED_VOLUME_EXPORTS_BASEDIR = '/exports';
var NFS_SHARED_VOLUME_EXPORTS_DIRNAME = 'data';

function throwInvalidSize(size) {
    assert.string(size, 'size');

    throw new Error('size ' + size + ' is not a valid volume size');
}

function parseVolumeSize(size) {
    assert.optionalString(size, 'size');

    var MULTIPLIERS_TABLE = {
        g: units.MBYTES_IN_GB,
        GB: units.MBYTES_IN_GB,
        m: 1,
        MB: 1
    };

    var multiplierSymbol, multiplier;
    var baseValue;

    if (size === undefined) {
        return undefined;
    }

    var matches = size.match(/(\d+)(g|m|k|GB|MB|KB)/);
    if (!matches) {
        throwInvalidSize(size);
    }

    multiplierSymbol = matches[2];
    multiplier = MULTIPLIERS_TABLE[multiplierSymbol];
    baseValue = Number(matches[1]);
    if (isNaN(baseValue) || multiplier === undefined) {
        throwInvalidSize(size);
    }

    return baseValue * multiplier;
}

module.exports = {
    NFS_SHARED_VOLUME_EXPORTS_BASEDIR: NFS_SHARED_VOLUME_EXPORTS_BASEDIR,
    NFS_SHARED_VOLUME_EXPORTS_DIRNAME: NFS_SHARED_VOLUME_EXPORTS_DIRNAME,
    parseVolumeSize: parseVolumeSize
};
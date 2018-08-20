"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_motion_1 = require("react-motion");
var Scrolling_1 = require("./Scrolling");
var Waypoint = /** @class */ (function () {
    function Waypoint(scroll, styles) {
        this.scroll = scroll;
        this.style = styles;
    }
    Waypoint.prototype.motion = function (scroll, to) {
        var delta = (scroll - this.scroll) / (to.scroll - this.scroll);
        var result = {};
        for (var key in this.style) {
            var fromValue = this.style[key];
            var toValue = to.style[key] || fromValue;
            result[key] = react_motion_1.spring(fromValue == toValue ? fromValue : fromValue + delta * (toValue - fromValue));
        }
        return result;
    };
    return Waypoint;
}());
exports.Waypoint = Waypoint;
var Waypoints = /** @class */ (function () {
    function Waypoints(initial) {
        this.items = [];
        this.anchors = new Map();
        this.scroll = 0;
        this.lastStyles = initial;
        this.items.push(new Waypoint(0, initial));
    }
    Waypoints.prototype.createAnchor = function (name) {
        this.anchors.set(name, this.scroll);
        return this;
    };
    Waypoints.prototype.anchor = function (name) {
        return this.anchors.get(name);
    };
    Waypoints.prototype.transitionAt = function (scroll, styles) {
        this.scroll = scroll;
        this.lastStyles = __assign({}, this.lastStyles, styles);
        this.items.push(new Waypoint(this.scroll, this.lastStyles));
        return this;
    };
    Waypoints.prototype.transition = function (scrollRange, styles) {
        return this.transitionAt(this.scroll + scrollRange, styles);
    };
    Waypoints.prototype.pause = function (scrollRange) {
        return this.pauseAt(this.scroll + scrollRange);
    };
    Waypoints.prototype.pauseAt = function (scroll) {
        this.scroll = scroll;
        this.items.push(new Waypoint(this.scroll, this.lastStyles));
        return this;
    };
    Waypoints.prototype.toList = function () {
        return this.items;
    };
    return Waypoints;
}());
exports.Waypoints = Waypoints;
var WaypointMotion = /** @class */ (function (_super) {
    __extends(WaypointMotion, _super);
    function WaypointMotion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WaypointMotion.prototype.render = function () {
        var _this = this;
        return (React.createElement(Scrolling_1.ScrollingConsumer, null, function (scroll) {
            var waypoints;
            if (_this.props.waypoints instanceof Waypoints) {
                waypoints = _this.props.waypoints.toList();
            }
            else {
                waypoints = _this.props.waypoints;
            }
            var scrolledWaypoints = waypoints.filter(function (c) { return scroll >= c.scroll; });
            var index = (scrolledWaypoints.length - 1);
            var from = scrolledWaypoints[index] || waypoints[0];
            var to = from;
            if (index < (waypoints.length - 1)) {
                to = waypoints[index + 1];
            }
            return (React.createElement(react_motion_1.Motion, { style: from.motion(scroll, to) }, function (interpolatingStyle) { return _this.props.children(interpolatingStyle); }));
        }));
    };
    return WaypointMotion;
}(React.Component));
exports.WaypointMotion = WaypointMotion;
//# sourceMappingURL=WaypointMotion.js.map
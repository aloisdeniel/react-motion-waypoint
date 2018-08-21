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
/**
 * A collection of waypoints.
 */
var Waypoints = /** @class */ (function () {
    /**
     * Creates a new waypoint collection.
     *
     * @param initial - The initial style value.
     */
    function Waypoints(initial) {
        this.items = [];
        this.anchors = new Map();
        this.scroll = 0;
        this.lastStyles = initial;
        this.items.push(new Waypoint(0, initial));
    }
    /**
     * Saves the current scroll position into an anchor that can be
     * accessed then with 'anchor()' method.
     *
     * @param name - The name of the anchor.
     */
    Waypoints.prototype.createAnchor = function (name) {
        this.anchors.set(name, this.scroll);
        return this;
    };
    /**
     * Gets the scroll position associated to a declared anchor.
     *
     * @param name - The name of the anchor.
     */
    Waypoints.prototype.anchor = function (name) {
        return this.anchors.get(name);
    };
    /**
     * Creates a transition waypoint with the given target styles for the
     * given target scroll position.
     *
     * @param scroll - The absolute target scroll position.
     * @param styles - The target styles for the transition.
     */
    Waypoints.prototype.transitionAt = function (scroll, styles) {
        this.scroll = scroll;
        this.lastStyles = __assign({}, this.lastStyles, styles);
        this.addWaypoint(new Waypoint(this.scroll, this.lastStyles));
        return this;
    };
    /**
     * Creates a transition waypoint with the given target styles at the
     * given distance from the current scroll position.
     *
     * @param scrollRange - The distance from the current scroll position.
     * @param styles - The target styles for the transition.
     */
    Waypoints.prototype.transition = function (scrollRange, styles) {
        return this.transitionAt(this.scroll + scrollRange, styles);
    };
    /**
     * Keeps the current style for the given distance from the current
     * scroll position.
     *
     * @param scrollRange - The distance from the current scroll position.
     */
    Waypoints.prototype.pause = function (scrollRange) {
        return this.pauseAt(this.scroll + scrollRange);
    };
    /**
     * Creates a waypoint with the current style at the given distance from the current
     * scroll position.
     *
     * @param scroll - The absolute scroll position.
     */
    Waypoints.prototype.pauseAt = function (scroll) {
        this.scroll = scroll;
        this.addWaypoint(new Waypoint(this.scroll, this.lastStyles));
        return this;
    };
    /**
     * Gets an interpolated style value for the given scroll position.
     *
     * @param scroll - The absolute scroll position.
     */
    Waypoints.prototype.valueAt = function (scroll) {
        var toIndex = this.items.findIndex(function (item) { return item.scroll >= scroll; });
        if (toIndex < 0) {
            return this.items[this.items.length - 1].style;
        }
        var fromIndex = toIndex > 0 ? toIndex - 1 : 0;
        var from = this.items[fromIndex];
        var to = this.items[toIndex];
        return from.interpolate(scroll, to);
    };
    Waypoints.prototype.addWaypoint = function (waypoint) {
        this.items.push(waypoint);
        this.items.sort(function (a, b) { return a.scroll - b.scroll; });
    };
    return Waypoints;
}());
exports.Waypoints = Waypoints;
/**
 * A component that observes current scroll to animate its children
 * from a collection of waypoints.
 */
var WaypointMotion = /** @class */ (function (_super) {
    __extends(WaypointMotion, _super);
    function WaypointMotion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WaypointMotion.prototype.render = function () {
        var _this = this;
        return (React.createElement(Scrolling_1.ScrollingConsumer, null, function (scroll) {
            var style = _this.props.waypoints.valueAt(scroll);
            return (React.createElement(react_motion_1.Motion, { style: style }, function (interpolatingStyle) { return _this.props.children(interpolatingStyle); }));
        }));
    };
    return WaypointMotion;
}(React.Component));
exports.WaypointMotion = WaypointMotion;
var Waypoint = /** @class */ (function () {
    function Waypoint(scroll, styles) {
        this.scroll = scroll;
        this.style = styles;
    }
    Waypoint.prototype.interpolate = function (scroll, to) {
        var totalDelta = to.scroll - this.scroll;
        var amount = totalDelta === 0 ? 0 : Math.max(0.0, Math.min(1.0, (scroll - this.scroll) / totalDelta));
        var result = {};
        for (var key in this.style) {
            var fromValue = this.style[key];
            var toValue = to.style[key];
            if (toValue === undefined) {
                toValue = fromValue;
            }
            var valueDelta = toValue - fromValue;
            var current = (fromValue === toValue) ? fromValue : (fromValue + amount * valueDelta);
            result[key] = react_motion_1.spring(current);
        }
        return result;
    };
    return Waypoint;
}());

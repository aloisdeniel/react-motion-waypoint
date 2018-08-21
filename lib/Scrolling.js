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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ScrollingContext = React.createContext(0);
exports.ScrollingConsumer = ScrollingContext.Consumer;
/**
 * A component that propagate the current window scrolling position to its
 * descendants.
 *
 * @remarks
 * The descendants must use a ScrollingConsumer to subscribe to changes.
 */
var ScrollingProvider = /** @class */ (function (_super) {
    __extends(ScrollingProvider, _super);
    function ScrollingProvider(props) {
        var _this = _super.call(this, props) || this;
        _this.ticking = false;
        _this.state = { scroll: window.scrollY };
        _this.onScroll = _this.onScroll.bind(_this);
        return _this;
    }
    ScrollingProvider.prototype.onScroll = function () {
        if (!this.ticking && this.state.scroll !== window.scrollY) {
            var component_1 = this;
            window.requestAnimationFrame(function () {
                component_1.setState({ scroll: window.scrollY });
                component_1.ticking = false;
            });
        }
        this.ticking = true;
    };
    ScrollingProvider.prototype.componentDidMount = function () {
        window.addEventListener('scroll', this.onScroll, false);
    };
    ScrollingProvider.prototype.componentWillUnmount = function () {
        window.removeEventListener('scroll', this.onScroll, false);
    };
    ScrollingProvider.prototype.render = function () {
        return (React.createElement(ScrollingContext.Provider, { value: this.state.scroll }, this.props.children));
    };
    return ScrollingProvider;
}(React.Component));
exports.ScrollingProvider = ScrollingProvider;

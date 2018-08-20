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
var defaultSize = { width: window.innerWidth, height: window.innerHeight };
var ResizingContext = React.createContext(defaultSize);
exports.ResizingConsumer = ResizingContext.Consumer;
/**
 * A component that propagate the current window size to its
 * descendants.
 *
 * @remarks
 * The descendants must use a ResizingConsumer to subscribe to changes.
 */
var ResizingProvider = /** @class */ (function (_super) {
    __extends(ResizingProvider, _super);
    function ResizingProvider(props) {
        var _this = _super.call(this, props) || this;
        _this.ticking = false;
        _this.state = defaultSize;
        _this.onResize = _this.onResize.bind(_this);
        return _this;
    }
    ResizingProvider.prototype.onResize = function () {
        if (!this.ticking && (this.state.width != window.innerWidth || this.state.height != window.innerHeight)) {
            var component = this;
            window.requestAnimationFrame(function () {
                component.setState({ width: window.innerWidth, height: window.innerHeight });
                component.ticking = false;
            });
        }
        this.ticking = true;
    };
    ResizingProvider.prototype.componentDidMount = function () {
        window.addEventListener('resize', this.onResize, false);
    };
    ResizingProvider.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.onResize, false);
    };
    ResizingProvider.prototype.render = function () {
        return (React.createElement(ResizingContext.Provider, { value: this.state }, this.props.children));
    };
    return ResizingProvider;
}(React.Component));
exports.ResizingProvider = ResizingProvider;
//# sourceMappingURL=Resizing.js.map
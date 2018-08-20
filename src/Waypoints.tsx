import * as React from 'react';
import { Motion, spring, PlainStyle } from 'react-motion';
import { ScrollingConsumer } from './Scrolling';

/**
 * A collection of waypoints.
 */
export class Waypoints {
    private readonly items: Waypoint[] = [];
    private readonly anchors = new Map<string,number>();
    private scroll:number = 0;
    private lastStyles:any;

    /**
     * Creates a new waypoint collection.
     *
     * @param initial - The initial style value.
     */
    constructor(initial:any) {
        this.lastStyles = initial;
        this.items.push(new Waypoint(0, initial));
    }

    /**
     * Saves the current scroll position into an anchor that can be
     * accessed then with 'anchor()' method.
     *
     * @param name - The name of the anchor.
     */
    createAnchor(name:string) {
        this.anchors.set(name, this.scroll);
        return this;
    }

    /**
     * Gets the scroll position associated to a declared anchor.
     *
     * @param name - The name of the anchor.
     */
    anchor(name:string) {
        return this.anchors.get(name);
    }

    /**
     * Creates a transition waypoint with the given target styles for the 
     * given target scroll position.
     *
     * @param scroll - The absolute target scroll position.
     * @param styles - The target styles for the transition.
     */
    transitionAt(scroll: number, styles:any) {
        this.scroll = scroll;
        this.lastStyles = { ...this.lastStyles, ...styles };
        this.addWaypoint(new Waypoint(this.scroll, this.lastStyles));
        return this;
    }

    /**
     * Creates a transition waypoint with the given target styles at the
     * given distance from the current scroll position.
     *
     * @param scrollRange - The distance from the current scroll position.
     * @param styles - The target styles for the transition.
     */
    transition(scrollRange: number, styles:any) {
        return this.transitionAt(this.scroll + scrollRange, styles);
    }

    /**
     * Keeps the current style for the given distance from the current 
     * scroll position.
     * 
     * @param scrollRange - The distance from the current scroll position.
     */
    pause(scrollRange: number) {
        return this.pauseAt(this.scroll + scrollRange);
    }

    /**
     * Creates a waypoint with the current style at the given distance from the current 
     * scroll position.
     * 
     * @param scroll - The absolute scroll position.
     */
    pauseAt(scroll: number) {
        this.scroll = scroll;
        this.addWaypoint(new Waypoint(this.scroll, this.lastStyles));
        return this;
    }

    /**
     * Gets an interpolated style value for the given scroll position.
     * 
     * @param scroll - The absolute scroll position.
     */
    valueAt(scroll:number) {
        var toIndex = this.items.findIndex((item) => item.scroll >= scroll);
        if(toIndex < 0) {
            return this.items[this.items.length - 1].style;
        }
        
        var fromIndex = toIndex > 0 ? toIndex - 1 : 0;
        var from = this.items[fromIndex];
        var to = this.items[toIndex];
        return from.interpolate(scroll, to);
    }

    private addWaypoint(waypoint:Waypoint){
        this.items.push(waypoint);
        this.items.sort((a,b) => a.scroll - b.scroll);
    }
}

/**
 * A component that observes current scroll to animate its children 
 * from a collection of waypoints.
 */
export class WaypointMotion extends React.Component<WaypointMotionProps> {
    render() {
        return (<ScrollingConsumer>
            {scroll => {
                var style = this.props.waypoints.valueAt(scroll);
                return (
                    <Motion style={style}>
                        {(interpolatingStyle:any) => this.props.children(interpolatingStyle)}
                    </Motion>
                );
            }}
        </ScrollingConsumer>);
    }
}

export interface WaypointMotionProps {
    /**
     * A waypoint collection that defines how the children should be animated.
     */
    waypoints: Waypoints;

    /**
     * A rendering function from the interpolated styles.
     */
    children: (interpolatedStyle: PlainStyle) => React.ReactElement<any>;
}

class Waypoint {
    scroll: number;
    style: any;
    constructor(scroll:number, styles:any){
        this.scroll= scroll;
        this.style = styles;
    }

    interpolate(scroll: number, to:Waypoint) {
        var totalDelta = to.scroll - this.scroll;
        var amount = totalDelta == 0 ? 0 : Math.max(0.0, Math.min(1.0,(scroll - this.scroll) / totalDelta));
        var result : any = {};
        for (let key in this.style) {
            const fromValue = this.style[key];
            var toValue = to.style[key];
            if(toValue == undefined) {
                toValue = fromValue;
            }
            var valueDelta = toValue - fromValue;
            var current = (fromValue == toValue) ? fromValue : (fromValue + amount * valueDelta);
            result[key] = spring(current);
        }
        return result;
    }
}
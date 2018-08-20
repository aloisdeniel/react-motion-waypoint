import * as React from 'react';
import { PlainStyle } from 'react-motion';
/**
 * A collection of waypoints.
 */
export declare class Waypoints {
    private readonly items;
    private readonly anchors;
    private scroll;
    private lastStyles;
    /**
     * Creates a new waypoint collection.
     *
     * @param initial - The initial style value.
     */
    constructor(initial: any);
    /**
     * Saves the current scroll position into an anchor that can be
     * accessed then with 'anchor()' method.
     *
     * @param name - The name of the anchor.
     */
    createAnchor(name: string): this;
    /**
     * Gets the scroll position associated to a declared anchor.
     *
     * @param name - The name of the anchor.
     */
    anchor(name: string): number;
    /**
     * Creates a transition waypoint with the given target styles for the
     * given target scroll position.
     *
     * @param scroll - The absolute target scroll position.
     * @param styles - The target styles for the transition.
     */
    transitionAt(scroll: number, styles: any): this;
    /**
     * Creates a transition waypoint with the given target styles at the
     * given distance from the current scroll position.
     *
     * @param scrollRange - The distance from the current scroll position.
     * @param styles - The target styles for the transition.
     */
    transition(scrollRange: number, styles: any): this;
    /**
     * Keeps the current style for the given distance from the current
     * scroll position.
     *
     * @param scrollRange - The distance from the current scroll position.
     */
    pause(scrollRange: number): this;
    /**
     * Creates a waypoint with the current style at the given distance from the current
     * scroll position.
     *
     * @param scroll - The absolute scroll position.
     */
    pauseAt(scroll: number): this;
    /**
     * Gets an interpolated style value for the given scroll position.
     *
     * @param scroll - The absolute scroll position.
     */
    valueAt(scroll: number): any;
    private addWaypoint;
}
/**
 * A component that observes current scroll to animate its children
 * from a collection of waypoints.
 */
export declare class WaypointMotion extends React.Component<WaypointMotionProps> {
    render(): JSX.Element;
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

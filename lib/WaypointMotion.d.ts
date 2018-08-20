import * as React from 'react';
import { PlainStyle } from 'react-motion';
export interface WaypointMotionProps {
    waypoints: Waypoint[] | Waypoints;
    children: (interpolatedStyle: PlainStyle) => React.ReactElement<any>;
}
export declare class Waypoint {
    scroll: number;
    style: any;
    constructor(scroll: number, styles: any);
    motion(scroll: number, to: Waypoint): any;
}
export declare class Waypoints {
    private readonly items;
    private readonly anchors;
    private scroll;
    private lastStyles;
    constructor(initial: any);
    createAnchor(name: string): this;
    anchor(name: string): number;
    transitionAt(scroll: number, styles: any): this;
    transition(scrollRange: number, styles: any): this;
    pause(scrollRange: number): this;
    pauseAt(scroll: number): this;
    toList(): Waypoint[];
}
export declare class WaypointMotion extends React.Component<WaypointMotionProps> {
    render(): JSX.Element;
}

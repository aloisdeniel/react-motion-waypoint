import * as React from 'react';
export declare var ScrollingConsumer: React.ComponentType<React.ConsumerProps<number>>;
/**
 * A component that propagate the current window scrolling position to its
 * descendants.
 *
 * @remarks
 * The descendants must use a ScrollingConsumer to subscribe to changes.
 */
export declare class ScrollingProvider extends React.Component<ScrollingProps, ScrollingState> {
    private ticking;
    constructor(props: any);
    private onScroll;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export interface ScrollingProps {
    children: React.ReactNode;
}
export interface ScrollingState {
    scroll: number;
}

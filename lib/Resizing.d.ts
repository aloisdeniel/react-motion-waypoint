import * as React from 'react';
export declare type Size = {
    width: number;
    height: number;
};
export declare const ResizingConsumer: React.ComponentType<React.ConsumerProps<Size>>;
/**
 * A component that propagate the current window size to its
 * descendants.
 *
 * @remarks
 * The descendants must use a ResizingConsumer to subscribe to changes.
 */
export declare class ResizingProvider extends React.Component<ResizingProps, Size> {
    private ticking;
    constructor(props: ResizingProps);
    private onResize;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export interface ResizingProps {
    children: React.ReactNode;
}

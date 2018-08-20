import * as React from 'react';

export type Size = { width: number, height: number };

const defaultSize : Size = { width: window.innerWidth, height: window.innerHeight }

const ResizingContext = React.createContext(defaultSize);

export var ResizingConsumer = ResizingContext.Consumer;

/**
 * A component that propagate the current window size to its
 * descendants.
 *
 * @remarks
 * The descendants must use a ResizingConsumer to subscribe to changes.
 */
export class ResizingProvider extends React.Component<ResizingProps,Size> {

    private ticking = false;

    constructor(props:any){
        super(props);
        this.state = defaultSize;
        this.onResize = this.onResize.bind(this);
    }

    private onResize() {
        if (!this.ticking && (this.state.width != window.innerWidth || this.state.height != window.innerHeight)) {
            var component = this;
            window.requestAnimationFrame(function() {
                component.setState({ width: window.innerWidth, height: window.innerHeight })
                component.ticking = false;
            });
        }
        this.ticking = true;
    }

    componentDidMount() {
        window.addEventListener('resize', this.onResize, false);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize, false);
    }
  

  render() {
    return (
      <ResizingContext.Provider value={this.state}>
        { this.props.children }
      </ResizingContext.Provider>
    );
  }
}

export interface ResizingProps {
    children: React.ReactNode;
}

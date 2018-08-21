import * as React from 'react';

const ScrollingContext = React.createContext(0);

export const ScrollingConsumer = ScrollingContext.Consumer;

/**
 * A component that propagate the current window scrolling position to its
 * descendants.
 *
 * @remarks
 * The descendants must use a ScrollingConsumer to subscribe to changes.
 */
export class ScrollingProvider extends React.Component<ScrollingProps,ScrollingState> {

    private ticking = false;

    constructor(props:ScrollingProps){
        super(props);
        this.state = { scroll: window.scrollY };
        this.onScroll = this.onScroll.bind(this);
    }

    private onScroll() {
        if (!this.ticking && this.state.scroll !== window.scrollY ) {
            const component = this;
            window.requestAnimationFrame(function() {
                component.setState({ scroll: window.scrollY })
                component.ticking = false;
            });
        }
        this.ticking = true;
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }
  

  render() {
    return (
      <ScrollingContext.Provider value={this.state.scroll}>
        { this.props.children }
      </ScrollingContext.Provider>
    );
  }
}

export interface ScrollingProps {
    children: React.ReactNode;
}

export interface ScrollingState {
    scroll: number;
}

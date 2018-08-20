import * as React from 'react';
import * as ReactDOM from "react-dom";
import { WaypointMotion, Waypoints, ResizingConsumer, ResizingProvider, ScrollingProvider, Size } from '../../lib';

type Color = { r:number, g:number, b:number }
type Transform = { tx:number, ty:number, angle:number }
var toStyle = {
    color: (color:Color) => `rgb(${color.r},${color.g},${color.b})`,
    transform: (transform:Transform) => `translate(${transform.tx}px, ${transform.ty}px) rotate(${transform.angle}deg)`,
}

class Ball extends React.Component<{}> {

    static styles : any = {
        position: "fixed",
        zIndex: 100,
        width: 50,
        height: 50,
        margin: "auto",
    };

    static waypoints = new Waypoints({ tx: 0.5, ty: 0, radius: 25, r: 255, g: 0, b: 0, angle: 0.0})
        .createAnchor("start")
        .transition(300, { tx: 0.0 })
        .createAnchor("step1")
        .transition(1000, { radius: 4, ty: 0.0, r: 0, b: 255 })
        .createAnchor("step2")
        .transition(300, { ty: 1, angle: 600 })
        .createAnchor("end");

    render() {
        return(
            <ResizingConsumer>
                {(size:Size) => {
                    console.log("width:" + size.width);
                    return (
                    <WaypointMotion waypoints={Ball.waypoints}>
                    {(style:any) => {
                            console.log("build : " + JSON.stringify(style));
                            return (
                                <div className="ball" style={{...Ball.styles, borderRadius: style.radius, background: toStyle.color(style), transform:  toStyle.transform( { tx: style.tx * size.width, ty: style.ty * size.height, angle: style.angle }) }}></div>
                            );
                    }}
                    </WaypointMotion>)}
                }
            </ResizingConsumer>);
    }

}

class Area extends React.Component<{ start: number, end: number, color: string }> {
    get styles() : any {
        return  {
            position: "absolute",
            left: 0,
            right: 0,
            height: this.props.end - this.props.start,
            top: this.props.start,
            background: this.props.color,
            margin: "auto",
        }
    };

    render() {
        return <div style={this.styles}></div>
    }
}

class Page extends React.Component<{}> {

    static styles : any = {
        height: Ball.waypoints.anchor("end") + 1000,
    };

    render() {
        return (
        <ScrollingProvider>
            <ResizingProvider>
                <div style={Page.styles}>
                    <Ball />
                    <Area start={Ball.waypoints.anchor("start")} end={Ball.waypoints.anchor("step1")} color="#eeeeee" />
                    <Area start={Ball.waypoints.anchor("step1")} end={Ball.waypoints.anchor("step2")} color="#dddddd" />
                    <Area start={Ball.waypoints.anchor("step2")} end={Ball.waypoints.anchor("end")} color="#cccccc" />
                </div>
            </ResizingProvider>
        </ScrollingProvider>);
    }
}

class Basic extends React.Component<{}> {
    
    static waypoints = new Waypoints({ r: 255, g: 0, b: 0})
        .pause(1000)
        .transition(300, { b: 255 })
        .pause(1000)
        .transition(300, { r: 0, g: 255 });

    render() {
        return (
            <ScrollingProvider>
                    <WaypointMotion waypoints={Basic.waypoints}>
                        {(style:any) => (
                                    <div style={{
                                        height: 5000,
                                        background: `rgb(${style.r},${style.g},${style.b})`
                                    }}></div>
                                )}
                    </WaypointMotion>
            </ScrollingProvider>
        );
    }
}

ReactDOM.render(
    <Page />,
    document.getElementById("content")
);
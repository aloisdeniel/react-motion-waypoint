# react-motion-waypoint

Animating elements while scrolling with [react-motion](https://github.com/chenglou/react-motion).

## Install

```bash
> npm install --save react-motion-waypoint
```

## Quickstart

The sample below will animate the background from the scroll position :

* **From 0 to 1000** : red background
* **From 1000 to 1300** : background transitioning from red to purple 
* **From 1300 to 2300** : purple background
* **From 2300 to 2600** : background transitioning from purple to cyan 

```ts
class Basic extends React.Component<{}> {

    static waypoints = new Waypoints({ r: 255, g: 0, b: 0}) // red
        .pause(1000)
        .transition(300, { b: 255 }) // purple
        .pause(1000)
        .transition(300, { r: 0, g: 255 }); // cyan

    render() {
        return (
            <ScrollingProvider>
                    <WaypointMotion waypoints={Basic.waypoints}>
                        {(style:any) => (
                            <div style={{
                                height: 4000,
                                background: `rgb(${style.r},${style.g},${style.b})`
                            }}></div>
                        )}
                    </WaypointMotion>
            </ScrollingProvider>
        );
    }
}
```

## Example

For a more complete example, please look at [index.tsx](./docs/src/index.tsx) and [try it online](http://aloisdeniel.github.com/react-motion-waypoint).

## Build

```bash
> npm run-script build
```

## Contributions

Contributions are welcome! If you find a bug please report it and if you want a feature please report it.

If you want to contribute code please file an issue and create a branch off of the current dev branch and file a pull request.

### License

![MIT © Aloïs](https://img.shields.io/badge/licence-MIT-blue.svg) 

© [Aloïs Deniel](http://aloisdeniel.github.io)





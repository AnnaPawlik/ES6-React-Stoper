'use strict'

class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            results: []
        }
        // this.running = false;
        // this.display = display;
        // this.list = addlist;
        // this.reset();
        // this.print(this.times);
    }

    reset() {
        this.setState({
            times: {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
            }
        });
        // this.print();
        this.list.innerHTML = "";
    }

    // print() {
    //     this.display.innerText = this.format(this.times);
    // }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.running) {
            this.setState({
                running: true
            });
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }

    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }

    stop() {
        this.setState({
            running: false
        })
        clearInterval(this.watch);
    }

    addlist() {
		this.list.appendChild(this.createListElement(this.format(this.times)));
	}

	createListElement(time) {
		let listElement = document.createElement('li');
		listElement.innerHTML = time;
        return listElement;
    }
    
    render() {
        return ( 
            <div className={'app'}>
                <div className={'controls'}>
                    <button onClick={() => this.start()}>Start</button>
                    <button onClick={() => this.stop()}>Stop</button>
                </div>
                <div className={'stopwatch'}>
                    {this.format(this.state.times)}
                </div>
                <button onClick={() => this.reset()}>Reset</button>
                <div className={'list'}>
                    <button onClick={() => this.addList()}>Add to list</button>
                    <ul className={'results'}>
                        {this.state.results}
                    </ul>
                </div>
            </div>
        );
    }
}

// const stopwatch = new Stopwatch(document.querySelector('.stopwatch'), document.querySelector('.results'));


// let startButton = document.getElementById('start');
// startButton.addEventListener('click', () => stopwatch.start());

// let stopButton = document.getElementById('stop');
// stopButton.addEventListener('click', () => stopwatch.stop());

// let resetButton = document.getElementById('reset');
// resetButton.addEventListener('click', () => stopwatch.reset());

// let addButton = document.getElementById('addList');
// addButton.addEventListener('click', () => stopwatch.addlist());

const element = React.createElement(Stopwatch);
ReactDOM.render(element, document.getElementsById('app'));

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}
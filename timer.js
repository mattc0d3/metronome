

function Timer(callback, timeInterval, options) {
    this.timeInterval = timeInterval
    // Start timer
    this.start = () => {
        // Set expected time. The moment in time we start the timer plus whatever the time interval is.
        this.expected = Date.now() + this.timeInterval
        // Start the timout and save the id in a property, so we can cancel it later.
        this.theTimeout = null

        if (options.immediate) {
            callback()
        }

        this.timeout = setTimeout(this.round, this.timeInterval)
        console.log("Started!")
    }
    // Stop timer
    this.stop = () => {
        clearTimeout(this.timeout)
        console.log("Stopped!")
    }
    // Adjust time interval
    this.round = () => {
        let drift = Date.now() - this.expected
        // Check if drift is greater than time interval and run error callback if true
        if (drift > this.timeInterval) {
            if (options.errorCallback) {
                options.errorCallback()
            }
        }
        callback()
        this.expected += timeInterval
        this.timeout = setTimeout(this.round, this.timeInterval - drift)
    }
}

// const myTimer = new Timer(() => {console.log("It ran!")}, 1000, () => {console.log("ERROR")})

// myTimer.start()

export default Timer
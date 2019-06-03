function countdown(initial, final, interval) {
    if (final === void 0) { final = 0; }
    if (interval === void 0) { interval = 1; }
    var current = initial;
    while (current > final) {
        console.log(current);
        current -= interval;
    }
}

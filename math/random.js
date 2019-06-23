module.exports = (min=0, max=1) => {
    if (min > max) {
        min = max;
    }
    const res = (Math.random() * (max - min)) + min

    if (isNaN(res)) return 0;
    return res
}
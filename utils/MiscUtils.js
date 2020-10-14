const tools = {}

tools.verifyTypeNumber = (...nums) => {
    const auxArray = nums.map(num => isNaN(parseInt(num)));
    return !auxArray.some(elemenet => elemenet === true);
}
module.exports = tools;
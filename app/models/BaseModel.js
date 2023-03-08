function Model(name) {
    return require('./' + name);
}

module.exports = Model;
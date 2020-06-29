const compose = (...funcs) => (comp) => {
    return funcs.reduceRight(
        (wrapped, func) => func(wrapped), comp)
}


function prettyPrint(string) {
    var ugly = document.getElementById('myTextArea').value;
    var obj = JSON.parse(ugly);
    var pretty = JSON.stringify(obj, undefined, 4);
    document.getElementById('myTextArea').value = pretty;
}

export {
    compose
}



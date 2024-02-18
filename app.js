var num1ele = document.getElementById('num1');
var num2ele = document.getElementById('num2');
var buttonele = document.querySelector('button');
function add(num1, num2) {
    return num1 + num2;
}
buttonele === null || buttonele === void 0 ? void 0 : buttonele.addEventListener('click', function () {
    var num1 = num1ele.value;
    var num2 = num2ele.value;
    var result = add(+num1, +num2);
    console.log(result);
});

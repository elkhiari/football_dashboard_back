function toNumber(str) {
  var sum = 0;
  var i = 0;
  var numberStr;

  while (str[i]) {
    numberStr = 0;
    while (str[i] >= "0" && str[i] <= "9") {
      numberStr += str[i];
      i++;
    }
    sum += parseInt(numberStr);
    i++;
  }
  return sum;
}

console.log(toNumber("34fh5dfdf54545dfdf5656"));

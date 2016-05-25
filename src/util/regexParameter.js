export default (regex, value) => {
  return value.match(regex) === null ? false : true
}

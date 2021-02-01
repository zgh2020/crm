
const conditionDTO = {
  conditionList: [],
  sortFieldList: [],
  expression: ''
}
const conditionBuilder = { conditionList: [], sortFieldList: [], expression: '' }
conditionBuilder.new = function () {
  this.conditionList = []
  this.sortFieldList = []
  this.expression = ''
  return this
}
conditionBuilder.addCondition = function (field, value, opt = '等于') {
  this.conditionList.push({ field: field, value: value, opt: opt })
  return this
}

conditionBuilder.newCondition = function () {
  this.conditionList = []
}
conditionBuilder.addSort = function (field, type = 'asc') {
  this.sortFieldList.push({ field: field, type: type })
  return this
}

conditionBuilder.newSort = function () {
  this.sortFieldList = []
  return this
}

conditionBuilder.setExp = function (exp) {
  this.expression = exp
  return this
}
conditionBuilder.get = function () {
  conditionDTO.conditionList = this.conditionList
  conditionDTO.sortFieldList = this.sortFieldList
  conditionDTO.expression = this.getExpression()
  return conditionDTO
}

conditionBuilder.getConditionList = function () {
  return this.conditionList
}

conditionBuilder.getSortFieldList = function () {
  return this.sortFieldList
}

conditionBuilder.getExpression = function () {
  let expression = this.expression
  if (expression.length > 0) return expression
  for (let i = 1; i <= this.conditionList.length; i++) {
    expression = expression + '*' + i
  }
  if (expression.length > 0) return expression.substring(1)
  return expression
}
export default conditionBuilder

const { readFile, readdir } = require("fs").promises
const { join, basename } = require("path")
const csv = require("neat-csv")

const ROOT_DIR = join(__dirname, "..")
const CSV_INPUT_DIR = join(ROOT_DIR, "csv")

const camelCase = str => str[0].toLowerCase() + str.slice(1)
const sortBy = keys => (a, b) => {
  if (keys.length === 0) return 0
  if (a[keys[0]] < b[keys[0]]) return -1
  if (a[keys[0]] > b[keys[0]]) return 1

  return sortBy(keys.slice(1))(a, b)
}

const fileList = async dir =>
  (await readdir(CSV_INPUT_DIR)).map(f => basename(f, ".csv"))

const loadCsvFile = async name => {
  const fpath = join(CSV_INPUT_DIR, name + ".csv")
  const contents = (await readFile(fpath)).toString()
  const results = await csv(contents, { separator: "\t", quote: "" })

  return results
}

const loadData = async () => {
  const names = await fileList()
  const contents = await Promise.all(names.map(loadCsvFile))

  return names.reduce((acc, name, i) => ({
    ...acc,
    [camelCase(name)]: contents[i]
  }), {})
}

module.exports = {
  camelCase,
  sortBy,
  fileList,
  loadCsvFile,
  loadData,
}

const { writeFile } = require("fs").promises
const { join, relative } = require("path")
const { green } = require("chalk")
const mkdirp = require("mkdirp")
const { sortBy, loadData } = require("./utils")

const ROOT_DIR = join(__dirname, "..")
const JSON_OUTPUT_DIR = join(ROOT_DIR, "json")

const linesJson = text => {
  return text.split(/\\n/g).reduce((acc, l) => {
    if (l === "") return acc
    return [...acc, l.replace(/\[p\]/g, "").trim()]
  }, [])
}

const paragraphJson = (paragraph, data) => {
  const type = paragraph.CharID === "xxx" ? "STAGE_DIRECTION" : "DIALOGUE"
  const character = type === "STAGE_DIRECTION"
    ? null
    : data.characters.find(c => c.CharID === paragraph.CharID)

  return {
    number: Number(paragraph.ParagraphNum),
    lines: linesJson(paragraph.PlainText),
    type: type,
    speaker: type === "STAGE_DIRECTION" ? null : ({
      name: character.CharName,
      abbreviatedName: character.Abbrev,
      appearsInWorks: character.Works.split(","),
      description: character.Description
    })
  }
}

const chapterJson = (chapter, data) => {
  return {
    sectionNumber: Number(chapter.Section),
    chapterNumber: Number(chapter.Chapter),
    description: ["---", "---\\n"].includes(chapter.Description) ? null : chapter.Description,
    paragraphs: data.paragraphs
      .filter(p => p.Section === chapter.Section && p.Chapter === chapter.Chapter)
      .map(p => paragraphJson(p, data))
      .sort(sortBy(["number"]))
  }
}

const workJson = (work, data) => {
  return {
    id: work.WorkID,
    title: work.Title,
    longTitle: work.LongTitle,
    date: work.Date,
    genre: data.genres.find(g => g.GenreType === work.GenreType).GenreName,
    wordCount: work.TotalWords,
    paragraphCount: work.TotalParagraphs,
    chapters: data.chapters
      .filter(c => c.WorkID === work.WorkID)
      .map(c => chapterJson(c, data))
      .sort(sortBy(["sectionNumber", "chapterNumber"]))
  }
}

;(async () => {
  await mkdirp(JSON_OUTPUT_DIR)
  const data = await loadData()
  
  await Promise.all(data.works.map(async work => {
    const outputPath = join(JSON_OUTPUT_DIR, work.WorkID + ".json")
    const contents = workJson(work, data)
    const json = JSON.stringify(contents, null, 2)
    
    await writeFile(outputPath, json)
    console.log(green(`generated ${relative(ROOT_DIR, outputPath)}`))
  }))
})()

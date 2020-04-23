const { writeFile } = require("fs").promises
const { join, relative } = require("path")
const { green } = require("chalk")
const mkdirp = require("mkdirp")
const { loadCsvFile } = require("./utils")

const ROOT_DIR = join(__dirname, "..")
const JSON_INPUT_DIR = join(ROOT_DIR, "json")
const HTML_OUTPUT_PATH = join(ROOT_DIR, "html")

const html = (strings, ...inserts) => {
  return strings.reduce((acc, s, i) => {
    const insert = inserts[i]

    acc += s;
    
    if (Array.isArray(insert)) acc += insert.map(i => i.trim()).join("\n")
    else if (insert !== undefined
      && insert !== null
      && insert !== true
      && insert !== false) acc += insert

    return acc
  }, "").trim()
}

const workHtml = work => {  
  return html`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${work.title} - William Shakespeare</title>
  <style>
    html,
    body {
      margin: 0;
      padding: 0;
      font-size: 18px;
      line-height: 1.8em;
    }

    main {
      padding-top: 30px;
      padding-bottom: 30px;
      width: 90%;
      max-width: 800px;
      margin: auto;
    }

    h1 {
      font-family: cursive;
    }

    h2 {
      padding: 24px 0;
    }

    h3 {
      font-weight: normal;
    }

    h1,
    h2,
    h3 {
      text-align: center;
    }

    .dialogue,
    .stage-direction {
      padding: 8px 0;
    }

    .dialogue {
      display: flex;
      align-content: space-between;
    }

    .dialogue__speaker {
      font-weight: bold;
      flex: 1;
    }

    .dialogue__text {
      flex: 5;
      padding-left: 20px;
    }

    .stage-direction {
      font-style: italic;
    }

    .line {
      display: block;
      padding-left: 15px;
    }

    .line:first-of-type {
      padding-left: 0;
    }
  </style>
</head>
<body>
  <main>
    <h1>${work.title}</h1>
    <h3>William Shakespeare, ${work.date}</h3>

    ${work.chapters.map(chapter => html`
      ${chapter.sectionNumber === 0 || chapter.chapterNumber === 0
        ? chapter.description && html`<h2>${chapter.description}</h2>`
        : html`<h2>Act ${chapter.sectionNumber} Scene ${chapter.chapterNumber}${chapter.description && ` &middot; ${chapter.description}`}</h2>`
      }

      ${chapter.paragraphs.map(paragraph =>
        paragraph.type === "DIALOGUE" ? html`
          <section class="dialogue">
            <section class="dialogue__speaker">${paragraph.speaker.name}</section>
            <section class="dialogue__text">
              ${paragraph.lines.map(line => html`
                <span class="line">${line}</span>
              `)}
            </section>
          </section>
        ` :
        paragraph.type === "STAGE_DIRECTION" ? html`
          <section class="stage-direction">
            ${paragraph.lines.map(line => html`
              <span class="line">${line}</span>
            `)}
          </section>
        ` : ""
      )}
    `)}
  </main>
</body>
</html>
  `
}

;(async () => {
  await mkdirp(HTML_OUTPUT_PATH)
  const works = await loadCsvFile("Works")

  await Promise.all(works.map(async work => {
    const inputPath = join(JSON_INPUT_DIR, work.WorkID + ".json")
    const outputPath = join(HTML_OUTPUT_PATH, work.WorkID + ".html")
    const content = workHtml(require(inputPath))

    await writeFile(outputPath, content)
    console.log(green(`generated: ${relative(ROOT_DIR, outputPath)}`))
  }))
})()

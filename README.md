# Shakespeare

The works of Shakespeare in a structured form easy to develop with. Surprised I haven't been able to find a source like this elsewhere, hope I'm wrong and there's something really good.

Raw data is in `raw`, slightly cleaner data is in `csv`, processed output is in `json` and `html`. If you need help using this, let me know, the code is a hacky mess but the output is alright :)

## About the data

- Credit to [Open Source Shakespeare](opensourceshakespeare.org) where it's available as a SQL dump
- The files in `csv` have been derived directly from this, with very minimal cleanup (quotes and apostrophes are fixed). A few of the original tables which were site-specific have been excluded
- The files in `json` are separated into a file per 'work' and split into chapters and paragraphs
- The files in `html` are generated using the JSON files

### JSON

Each file has a structure like:

```json
{
  "id": "12night", // Open Source Shakespeare work identifier, and the name of the JSON file
  "title": "Twelfth Night",
  "longTitle": "Twelfth Night, Or What You Will",
  "date": "1599",
  "genre": "Comedy",
  "wordCount": "19837",
  "paragraphCount": "1031",
  "chapters": [
    {
      "sectionNumber": 1,
      "chapterNumber": 1,
      "description": "DUKE ORSINO's palace.", // can be null
      "paragraphs": [
        {
          "number": 1,
          "lines": [
            "[Enter DUKE ORSINO, CURIO, and other Lords; Musicians attending]"
          ],
          "type": "STAGE_DIRECTION", // can be "STAGE_DIRECTION" or "DIALOGUE"
          "speaker": null // will be null when "STAGE_DIRECTION"
        },
        {
          "number": 2,
          "lines": [
            "If music be the food of love, play on;",
            "Give me excess of it, that, surfeiting,",
            "The appetite may sicken, and so die.",
            "That strain again! it had a dying fall:",
            "O, it came o'er my ear like the sweet sound,",
            "That breathes upon a bank of violets,",
            "Stealing and giving odour! Enough; no more:",
            "'Tis not so sweet now as it was before.",
            "O spirit of love! how quick and fresh art thou,",
            "That, notwithstanding thy capacity",
            "Receiveth as the sea, nought enters there,",
            "Of what validity and pitch soe'er,",
            "But falls into abatement and low price,",
            "Even in a minute: so full of shapes is fancy",
            "That it alone is high fantastical."
          ],
          "type": "DIALOGUE",
          "speaker": {
            "name": "Orsino",
            "abbreviatedName": "DUKE ORSINO",
            "appearsInWorks": [
              "12night" // Open Source Shakespeare work identifier, and the name of the JSON file
            ],
            "description": "Duke of Illyria"
          }
        }
      ]
    }
  ]
}
```

## Development

Will hopefully not need to use these instructions 🤞

### Generating CSVs

Install docker and run this to generate CSVs:

```sh
rm csv/*.csv
docker run --name shakespeare_db -e MYSQL_USER=root -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=shakespeare -v $(pwd):/project -d mysql --secure-file-priv /project/csv 
docker exec -w /project shakespeare_db sh -c './scripts/generate_csvs.sh'
```

This will output them all in `./csv`

### Generating JSON + HTML

Generate the CSVs as above

Install nodejs and run this to generate JSON:

```sh
npm run generate-json
```

Then this to generate HTML:

```sh
npm run generate-html
```

## Acknowledgements

- [Open Source Shakespeare](opensourceshakespeare.org) for providing the data. See: [https://opensourceshakespeare.org/downloads/](https://opensourceshakespeare.org/downloads/)

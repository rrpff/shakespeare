# Shakespeare

Needed this data in a structured form easy to develop with. Raw data is in `raw`, slightly cleaner data is in `csv`, processed output is in `json` and `html`. If you need help using this, let me know, the code is a hacky mess but the output is alright :)

## About the data

- Credit to [Open Source Shakespeare](opensourceshakespeare.org) where it's available as a SQL dump
- The files in `csv` have been derived directly from this, with very minimal cleanup (quotes and apostrophes are fixed). A few of the original tables which were site-specific have been excluded
- The files in `json` are separated into a file per 'work' and split into chapters and paragraphs
- The files in `html` are generated using the JSON files

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

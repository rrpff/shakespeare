# Shakespeare

Needed this data in a structured form easy to develop with. Raw data is in `raw`, slightly cleaner data is in `csv`, processed output is in `json` and `html`. If you need help using this, let me know, the code is a hacky mess but the output is alright :)

## About the data

- Credit to [Open Source Shakespeare](opensourceshakespeare.org) where it's available as a SQL dump
- The data in `csv` has been derived directly from this, with very minimal cleanup (quotes are fixed). A few of the original tables which were site-specific have been excluded
- The data in `json` is separated into a file per 'work' and split into cross referenced chapters and paragraphs

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

### Generating JSON

Generate the CSVs as above

Install nodejs and run the following to generate JSON:

```sh
npm run generate-json
```

## Acknowledgements

- [Open Source Shakespeare](opensourceshakespeare.org) for providing the data. See: [https://opensourceshakespeare.org/downloads/](https://opensourceshakespeare.org/downloads/)

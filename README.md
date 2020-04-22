# Shakespeare

Needed this data in a structured form easy to develop with. Raw data is in `raw`, processed output is in `structured` and `csv`. If you ever need help using this, let me know!

## About the data

- Credit to [Open Source Shakespeare](opensourceshakespeare.org) where it's available as a SQL dump
- The data in `csv` has been derived directly from this, with very minimal cleanup (quotes are fixed). A few of the original tables which were site-specific have been excluded
- The data in `json` is separated into a file per 'work' and split into cross referenced chapters and paragraphs

## Development

### Generating CSVs

Install docker and run the following to generate CSVs:

```sh
docker run --name shakespeare_db -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=shakespeare -d mysql
docker exec shakespeare_db mkdir -p /project/csv
docker cp raw/dump.sql shakespeare_db:/project/dump.sql
docker cp scripts/generate_csvs.sh shakespeare_db:/project/generate_csvs.sh
docker exec -w /project shakespeare_db sh -c './generate_csvs.sh'
docker cp shakespeare_db:/project/csv ./csv
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

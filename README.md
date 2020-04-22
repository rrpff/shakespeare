# Shakespeare

Needed this data in a structured form easy to develop with. Raw data is in `raw`, processed output is in `structured` and `csv`. If you ever need help using this, let me know!

## Development

### Generating CSVs

Install docker and run the following to generate CSVs from the [data set](#credits):

```sh
docker run --name shakespeare_db -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=shakespeare -d mysql
docker exec shakespeare_db mkdir -p /project/csv
docker cp raw/dump.sql shakespeare_db:/project/dump.sql
docker cp scripts/generate_csvs.sh shakespeare_db:/project/generate_csvs.sh
docker exec -w /project shakespeare_db sh -c './generate_csvs.sh'
docker cp shakespeare_db:/project/csv ./csv
```

This will output them all in `./csv`

## Credits

[https://opensourceshakespeare.org](opensourceshakespeare.org) for providing the data. See: [https://opensourceshakespeare.org/downloads/](https://opensourceshakespeare.org/downloads/)

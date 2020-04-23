mysql shakespeare -uroot -proot < raw/dump.sql
mysql shakespeare -uroot -proot -B -e "SELECT * FROM AnnotationLevels" > csv/AnnotationLevels.csv
mysql shakespeare -uroot -proot -B -e "SELECT * FROM AnnotationThreads" > csv/AnnotationThreads.csv
mysql shakespeare -uroot -proot -B -e "SELECT * FROM AnnotationTypes" > csv/AnnotationTypes.csv
mysql shakespeare -uroot -proot -B -e "SELECT * FROM Annotations" > csv/Annotations.csv
mysql shakespeare -uroot -proot -B -e "SELECT * FROM Chapters" | sed "s/&#8217;/'/g" > csv/Chapters.csv
mysql shakespeare -uroot -proot -B -e "SELECT * FROM Characters" > csv/Characters.csv
mysql shakespeare -uroot -proot -B -e "SELECT * FROM Genres" > csv/Genres.csv

# # don't even ask
# mysql shakespeare -uroot -proot -B -e "SELECT * FROM Paragraphs INTO OUTFILE '/project/csv/ParagraphsTemp.csv' FIELDS TERMINATED BY '\t' ENCLOSED BY '\"' LINES TERMINATED BY '\n'"
# echo "WorkID	ParagraphID	ParagraphNum	CharID	PlainText	PhoneticText	StemText	ParagraphType	Section	Chapter	CharCount	WordCount" > /project/csv/Paragraphs.csv
# cat /project/csv/ParagraphsTemp.csv >> /project/csv/Paragraphs.csv
# rm /project/csv/ParagraphsTemp.csv

mysql shakespeare -uroot -proot -B -e "SELECT * FROM Paragraphs" > csv/Paragraphs.csv
mysql shakespeare -uroot -proot -B -e "SELECT * FROM Quotations" > csv/Quotations.csv
mysql shakespeare -uroot -proot -B -e "SELECT * FROM WordForms" > csv/WordForms.csv
mysql shakespeare -uroot -proot -B -e "SELECT * FROM Works" > csv/Works.csv

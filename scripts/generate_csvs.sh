mysql shakespeare -uroot -proot < dump.sql
mysql shakespeare -uroot -proot -B -e "SELECT * FROM AnnotationLevels" > csv/AnnotationLevels.csv
mysql shakespeare -uroot -proot -B -e "SELECT * FROM AnnotationThreads" > csv/AnnotationThreads.csv
mysql shakespeare -uroot -proot -B -e "SELECT * FROM AnnotationTypes" > csv/AnnotationTypes.csv
mysql shakespeare -uroot -proot -B -e "SELECT * FROM Annotations" > csv/Annotations.csv
mysql shakespeare -uroot -proot -B -e "SELECT * FROM Chapters" | sed "s/&#8217;/'/g" > csv/Chapters.csv
mysql shakespeare -uroot -proot -B -e "SELECT * FROM Characters" > csv/Characters.csv
mysql shakespeare -uroot -proot -B -e "SELECT * FROM Genres" > csv/Genres.csv
mysql shakespeare -uroot -proot -B -e "SELECT * FROM Paragraphs" > csv/Paragraphs.csv
mysql shakespeare -uroot -proot -B -e "SELECT * FROM Quotations" > csv/Quotations.csv
mysql shakespeare -uroot -proot -B -e "SELECT * FROM WordForms" > csv/WordForms.csv
mysql shakespeare -uroot -proot -B -e "SELECT * FROM Works" > csv/Works.csv

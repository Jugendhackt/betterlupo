#! /bin/bash

# mdb-json ~/Downloads/test/Beispieldatenbank.lup ABP_Fachgruppen > test.json

tables=("ABP_Fachgruppen" "ABP_Faecher" "ABP_Kursarten" "ABP_Lehrer" "ABP_NichtMoeglAbiFachKombi" "ABP_Schueler" "ABP_SchuelerFaecher" "ABP_SchuelerFaecherBasisSicherung" "ABP_SchuelerFaecherSicherung" "ABP_SchuelerFehlermeldungen" "ABP_SchuelerSprachenfolge" "ABP_Schuldaten" "ABP_Version")

echo -e "{" > file.json

for i in "${tables[@]}"
do
    :
    echo $i
    echo -e  '"'$i'": [' >> file.json
    mdb-json ~/Downloads/test/Beispieldatenbank.lup $i > tmp.json
    sed 's/$/,/' tmp.json >> file.json
    echo -e "]," >> file.json
done

echo -e "}" >> file.json
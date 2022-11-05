#! /bin/bash

tables=("ABP_Fachgruppen" "ABP_Faecher" "ABP_Kursarten" "ABP_Lehrer" "ABP_NichtMoeglAbiFachKombi" "ABP_Schueler" "ABP_SchuelerFaecher" "ABP_SchuelerFaecherBasisSicherung" "ABP_SchuelerFaecherSicherung" "ABP_SchuelerFehlermeldungen" "ABP_SchuelerSprachenfolge" "ABP_Schuldaten" "ABP_Version")

echo -e "{" > $2file.json

for i in "${!tables[@]}"
do
    :
    echo -e  '"'${tables[$i]}'": [' >> $2file.json
    mdb-json $1 ${tables[$i]} > $2tmp.json
    sed 's/$/,/' $2tmp.json >> $2tmp2.json
    sed '$ s/.$//' $2tmp2.json >> $2file.json
    rm $2tmp.json
    rm $2tmp2.json
    if [ $((1 + $i)) -lt ${#tables[@]} ]
    then
    echo -e "]," >> $2file.json
    else
    echo -e "]" >> $2file.json
    fi
done

echo -e "}" >> $2file.json
import pyodbc
import json

conn_str = (r'DRIVER={Microsoft Access Driver (*.mdb, *.accdb)};'
            r'DBQ=E:\PythonInOffice\python_connect_to_ms_access\database.accdb;')
sqlConnection = pyodbc.connect('./tmp/Lupo_Datei_Niels.lpo')
cursor = sqlConnection.cursor()

file = open("converted/file.json")
data = json.load(file)

# print(data["ABP_Fachgruppen"][0]["Fach"])

tables = ["ABP_Fachgruppen", "ABP_Faecher", "ABP_Kursarten", "ABP_Lehrer", "ABP_NichtMoeglAbiFachKombi",
          "ABP_Schueler", "ABP_SchuelerFaecher", "ABP_SchuelerFaecherBasisSicherung",
          "ABP_SchuelerFaecherSicherung", "ABP_SchuelerFehlermeldungen", "ABP_SchuelerSprachenfolge",
          "ABP_Schuldaten", "ABP_Version"]
     
i = 0   

for table in tables:
    cursor.execute(f'''DELETE FROM {table}''')
    sqlConnection.commit()
    
a = input()
# daten in die rows einragen
for table in tables:
    for row in data.get(table):
        attributes = ""
        values = ""
        for attribute in row:
            attributes += "" + attribute +","
            values += "" + str(row.get(attribute))+", "
        attributes = attributes[:-1]
        values = values[:-2]
        cursor.execute(f'''INSERT INTO {table} ({attributes}) VALUES ({values})''')
        
        
        
        
sqlConnection.commit()

file.close()

sqlConnection.close()
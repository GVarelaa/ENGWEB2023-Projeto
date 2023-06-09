import os 
import re
import json

folder = "./Acordaos"
files = os.listdir(folder)

test = 1
i = 0
for file in files:
    print("A realizar Teste ", test)
    test += 1

    with open(folder + '/' + file, 'r') as descriptor:
        accordions = json.load(descriptor)
        for accordion in accordions:
            accordion["_id"] = "a" + i
            i += 1
            if "Magistrado" in accordion:
                accordion["Relator"] = accordion["Magistrado"]
                accordion.pop("Magistrado")
                
            if "Texto Integral" in accordion and "Decisão Texto Integral" in accordion:
                accordion.pop("Texto Integral")
            elif "Texto Integral" in accordion:
                accordion["Decisão Texto Integral"] = accordion["Texto Integral"]
                accordion.pop("Texto Integral")

            if "Data do Acordão" in accordion:
                accordion["Data"] = accordion["Data do Acordão"]
                accordion.pop("Data do Acordão")

        fp = open('./tratados/' + file, 'w')
        json.dump(accordions, encoding="utf-8")
        fp.close()
import pandas as pd
import sys
import json

#only return the best guess
def stripColumnStats(data):
    sorted_data = sorted(data.items(), key=lambda kv: kv[1], reverse=True)
    return sorted_data[0][0]

result = {}

with open('migrations_metadata.json') as json_file:  
    data = json.load(json_file)
    for key in data:
        #drop strings (its default)
        if stripColumnStats(data[key]) != 'string':
            result[key] = stripColumnStats(data[key])

with open('dataTypeFromGithub.json', 'w') as fp:
    json.dump(result, fp) # , indent=4



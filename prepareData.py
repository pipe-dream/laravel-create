import pandas as pd
import sys
import json

df = pd.read_csv(
    'migrations_metadata.csv',
    usecols=["column_name", "column_data_type"],
)


stats = {}

for index, row in df.iterrows():
    # ensure the column_name exists
    if not row['column_name'] in stats:
        stats[row['column_name']] = {}
    
    # ensure the column_data_type exists for the column_name
    if not row['column_data_type'] in stats[row['column_name']]:
        stats[row['column_name']][row['column_data_type']] = 0

    # add stats
    stats[row['column_name']][row['column_data_type']] += 1    
    
with open('column_name_to_data_type.json', 'w') as fp:
    json.dump(stats, fp, indent=4)

print("Finished writing")
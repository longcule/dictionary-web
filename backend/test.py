import pandas as pd
import csv
products = []
with open("products.csv", "r") as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            products.append(row)
    
print(products)
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
import aiohttp
import aiofiles
import asyncio
import logging 
import zipfile 
import json
import time 
import csv  
import os
import fs
import io
import re 
from stationData import allstationData 

logging.basicConfig(level=logging.INFO)
app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] =  os.environ['DB_URL']
mongo = PyMongo(app)
cachedResult = {}


@app.route("/api/v1/chart/history")
async def home():
    return await getAllSelectedFilterHistory()


@app.route("/api/v1/chart/data", methods=["POST"])
async def create():
    data = request.get_json() 
    yearMonth, trainLine, time, dayType, dateTimeSearched = data['yearMonth'], data['trainLine'], data['time'], data['dayType'], data['dateTimeSearched']
    print(yearMonth, trainLine, time, dayType, dateTimeSearched)

    try:
        if yearMonth not in cachedResult:
            # If data not cached, then make API call
            excelFileUrl = await get_Download_Url_From_LTA(yearMonth)
            await download_Zipped_Excel_File(yearMonth, excelFileUrl)
            originalExcelData = await read_Excel_Data(yearMonth)
            await append_Station_Name(yearMonth, originalExcelData)
        await save_Search_Filter(yearMonth, trainLine, time, dayType, dateTimeSearched)

    except Exception as error:
        return jsonify({"Status": error}), 500

    selectedStations = filter_Data(yearMonth, trainLine, time, dayType)
    return jsonify(sort_Data(selectedStations, trainLine)), 200
 



# @app.route("/data/<data_id>")
# def get_id(data_id):
    # if request.method == "GET":

#     user_data = {'extra' : data_id}
#     param = request.args.get("extra")
#     if param:
#         user_data = {'extra' : f"{param} {data_id}"}
#     return jsonify(user_data), 200 

#  ------------------- Get history logic -------------------

async def getAllSelectedFilterHistory():  
    data = mongo.db.selectedfilter.find()
    x = [i for i in list(data)] 
    return json.dumps(x, default=str)
 

#  ------------------- Get chart data logic -------------------

 

async def get_Download_Url_From_LTA(year_month):
    try:
        logging.info("Obtaining new data")
        endpoint_lta = os.environ['endpointLTA'] + year_month

        headers = {
            'AccountKey': os.environ['AccountKey'],
            'accept': 'application/json',
        }

        async with aiohttp.ClientSession() as session:
            async with session.get(endpoint_lta, headers=headers) as response:
                response.raise_for_status()
                data = await response.json()
                excel_file_url = data['value'][0]['Link']
                logging.info('Excel link obtained: %s', excel_file_url)
                return excel_file_url

    except Exception as error:
        logging.error(f"Error getting download Link: ", error)
        raise Exception(f"Error getting download Link: ", error)


async def download_Zipped_Excel_File(year_month, excel_file_url):
    try:
        http_excel_file_url = excel_file_url.replace('^https', 'http')
        async with aiohttp.ClientSession() as session:
            async with session.get(http_excel_file_url, headers={'User-Agent': 'Mozilla/5.0'}, timeout=300) as response:
                response.raise_for_status()
                async with aiofiles.open(f'./{year_month}.zip', 'wb') as f:
                    await f.write(await response.read())
        logging.info('File downloaded successfully.')

    except Exception as error:
        logging.error(f"Error downloading the zip folder: ", error)
        raise Exception(f"Error downloading the zip folder: ", error)


async def read_Excel_Data(year_month):
    try:
        current_data = []
        zip_file_path = f'./{year_month}.zip'
        csv_file_name = f'transport_node_train_{year_month}.csv'

        with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
            for zip_info in zip_ref.infolist():
                if zip_info.filename.endswith('.csv'):
                    with zip_ref.open(zip_info) as csvfile:
                        csvreader = csv.reader(io.TextIOWrapper(csvfile, 'utf-8'))
                        header = next(csvreader)
                        for row in csvreader:
                            data_dict = dict(zip(header, row))
                            current_data.append(data_dict) 
        return current_data

    except Exception as error:
        logging.error(f"Error reading zip file: ", error)
        raise Exception(f"Error reading zip file: ", error)

async def append_Station_Name(year_month, original_excel_data):
    try:
        appended_station_name_data = []
        for mrt_station_data in original_excel_data: 
            mrt_station_code = mrt_station_data['PT_CODE']
            station_info = allstationData.get(mrt_station_code, False)

            if station_info:
                appended_station_name_data.append({
                    **mrt_station_data,
                    'stationName': station_info['stationName'],
                })
            else:
                appended_station_name_data.append(mrt_station_data)

        cachedResult[year_month] = appended_station_name_data
        return appended_station_name_data

    except Exception as error:
        logging.error(f"Error appending station name: ", error)
        raise Exception(f"Error appending station name: ", error)


async def save_Search_Filter(year_month, train_line, time, day_type, date_time_searched):
    try:
        new_selected_filter = {
            "yearMonth": year_month,
            "trainLine": train_line,
            "time": time,
            "dayType": day_type,
            "dateTimeSearched": date_time_searched,
        }

        selected_filter_collection = mongo.db.selectedfilter
        result = selected_filter_collection.insert_one(new_selected_filter)
        logging.info('Inserted data:', result)

    except Exception as error:
        raise Exception(f"Error writing to DB: ", error)


def filter_Data(year_month, train_line, time, day_type):
    data_set = cachedResult[year_month]
    filtered_items = [
        station_details for station_details in data_set
        if (
            station_details['TIME_PER_HOUR'] == time
            and station_details['DAY_TYPE'] == day_type
            and train_line in station_details['PT_CODE']
        )
    ]

    return filtered_items


def sort_Data(selected_stations, train_line):
    regex_pattern = re.compile(train_line + r"(\d{1,2})")  # \d{1,2} get first 2 digits only 
    selected_stations.sort(key=lambda station: int(regex_pattern.search(station["PT_CODE"]).group(1)))
    return selected_stations

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3001)


# -----------------------------------------------------------------------
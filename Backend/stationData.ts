const stationDataNS = {
  // North South line
  "NS1 / EW24": { stationName: "Jurong East", color: "Red", line: "North South" },
  "NS2": { stationName: "Bukit Batok", color: "Red", line: "North South" },
  "NS3": { stationName: "Bukit Gombak", color: "Red", line: "North South" },
  "NS4 BP1": { stationName: "Choa Chu Kang", color: "Red", line: "North South" },
  "NS5": { stationName: "Yew Tee", color: "Red", line: "North South" },
  "NS7": { stationName: "Kranji", color: "Red", line: "North South" },
  "NS": { stationName: "Marsiling", color: "Red", line: "North South" },
  "NS9 TE2": { stationName: "Woodlands", color: "Red", line: "North South" },
  "NS10": { stationName: "Admiralty", color: "Red", line: "North South" },
  "NS11": { stationName: "Sembawang", color: "Red", line: "North South" },
  "NS12": { stationName: "Canberra", color: "Red", line: "North South" },
  "NS13": { stationName: "Yishun", color: "Red", line: "North South" },
  "NS14": { stationName: "Khatib", color: "Red", line: "North South" },
  "NS15": { stationName: "Yio Chu Kang", color: "Red", line: "North South" },
  "NS16": { stationName: "Ang Mo Kio", color: "Red", line: "North South" },
  "NS17 CC15": { stationName: "Bishan", color: "Red", line: "North South" },
  "NS18": { stationName: "Braddell", color: "Red", line: "North South" },
  "NS19": { stationName: "Toa Payoh", color: "Red", line: "North South" },
  "NS20": { stationName: "Novena", color: "Red", line: "North South" },
  "NS21 DT11": { stationName: "Newton", color: "Red", line: "North South" },
  "NS22": { stationName: "Orchard", color: "Red", line: "North South" },
  "NS23": { stationName: "Somerset", color: "Red", line: "North South" },
  "NS24 NE6 CC1": { stationName: "Dhoby Ghaut", color: "Red", line: "North South" },
  "NS25 EW13": { stationName: "City Hall", color: "Red", line: "North South" },
  "NS26 EW14": { stationName: "Raffles Place", color: "Red", line: "North South" },
  "NS27 CE2": { stationName: "Marina Bay", color: "Red", line: "North South" },
  "NS28": { stationName: "Marina South Pier", color: "Red", line: "North South" }
} 

const stationDataEW = {
  // East West line
  "EW1": { stationName: "Pasir Ris", color: "Green", line: "East West" },
  "EW2 DT32": { stationName: "Tampines", color: "Green", line: "East West" },
  "EW3": { stationName: "Simei", color: "Green", line: "East West" },
  "EW4 CG": { stationName: "Tanah Merah", color: "Green", line: "East West" },
  "EW5": { stationName: "Bedok", color: "Green", line: "East West" },
  "EW6": { stationName: "Kembangan", color: "Green", line: "East West" },
  "EW7": { stationName: "Eunos", color: "Green", line: "East West" },
  "EW8 CC9": { stationName: "Paya Lebar", color: "Green", line: "East West" },
  "EW9": { stationName: "Aljunied", color: "Green", line: "East West" },
  "EW10": { stationName: "Kallang", color: "Green", line: "East West" },
  "EW11": { stationName: "Lavender", color: "Green", line: "East West" },
  "EW12 DT14": { stationName: "Bugis", color: "Green", line: "East West" },
  "EW13 NS25": { stationName: "City Hall", color: "Green", line: "East West" },
  "EW14 NS26": { stationName: "Raffles Place", color: "Green", line: "East West" },
  "EW15": { stationName: "Tanjong Pagar", color: "Green", line: "East West" },
  "EW16 NE3": { stationName: "Outram Park", color: "Green", line: "East West" },
  "EW17": { stationName: "Tiong Bahru", color: "Green", line: "East West" },
  "EW18": { stationName: "Redhill", color: "Green", line: "East West" },
  "EW19": { stationName: "Queenstown", color: "Green", line: "East West" },
  "EW20": { stationName: "Commonwealth", color: "Green", line: "East West" },
  "EW21 CC22": { stationName: "Buona Vista", color: "Green", line: "East West" },
  "EW22": { stationName: "Dover", color: "Green", line: "East West" },
  "EW23": { stationName: "Clementi", color: "Green", line: "East West" },
  "EW24 NS1": { stationName: "Jurong East", color: "Green", line: "East West" },
  "EW25": { stationName: "Chinese Garden", color: "Green", line: "East West" },
  "EW26": { stationName: "Lakeside", color: "Green", line: "East West" },
  "EW27": { stationName: "Boon Lay", color: "Green", line: "East West" },
  "EW28": { stationName: "Pioneer", color: "Green", line: "East West" },
  "EW29": { stationName: "Joo Koon", color: "Green", line: "East West" },
  "EW30": { stationName: "Gul Circle", color: "Green", line: "East West" },
  "EW31": { stationName: "Tuas Crescent", color: "Green", line: "East West" },
  "EW32": { stationName: "Tuas West Road", color: "Green", line: "East West" },
  "EW33": { stationName: "Tuas Link", color: "Green", line: "East West" },
  "EW34 DT35": { stationName: "Expo", color: "Green", line: "Changi Airport Branch" },
  "EW35": { stationName: "Changi Airport", color: "Green", line: "Changi Airport Branch" }
}

const stationDataNE = {
  // North East line
  "NE1 CC29": { stationName: "HarbourFront", color: "Purple", line: "North East" },
  "NE3 EW16": { stationName: "Outram Park", color: "Purple", line: "North East" },
  "NE4 DT19": { stationName: "Chinatown", color: "Purple", line: "North East" },
  "NE5": { stationName: "Clarke Quay", color: "Purple", line: "North East" },
  "NE6 NS24 CC1": { stationName: "Dhoby Ghaut", color: "Purple", line: "North East" },
  "NE7 DT12": { stationName: "Little India", color: "Purple", line: "North East" },
  "NE8": { stationName: "Farrer Park", color: "Purple", line: "North East" },
  "NE9": { stationName: "Boon Keng", color: "Purple", line: "North East" },
  "NE10": { stationName: "Potong Pasir", color: "Purple", line: "North East" },
  "NE11": { stationName: "Woodleigh", color: "Purple", line: "North East" },
  "NE12 CC13": { stationName: "Serangoon", color: "Purple", line: "North East" },
  "NE13": { stationName: "Kovan", color: "Purple", line: "North East" },
  "NE14": { stationName: "Hougang", color: "Purple", line: "North East" },
  "NE15": { stationName: "Buangkok", color: "Purple", line: "North East" },
  "NE16 STC": { stationName: "Sengkang", color: "Purple", line: "North East" },
  "NE17 PTC": { stationName: "Punggol", color: "Purple", line: "North East" },
}

const stationDataCC = {
  // Circle line
  "CC1 NS24 NE6": { stationName: "Dhoby Ghaut", color: "Orange", line: "Circle" },
  "CC2": { stationName: "Bras Basah", color: "Orange", line: "Circle" },
  "CC3": { stationName: "Esplanade", color: "Orange", line: "Circle" },
  "CC4 DT15": { stationName: "Promenade", color: "Orange", line: "Circle" },
  "CC5": { stationName: "Nicoll Highway", color: "Orange", line: "Circle" },
  "CC6": { stationName: "Stadium", color: "Orange", line: "Circle" },
  "CC7": { stationName: "Mountbatten", color: "Orange", line: "Circle" },
  "CC8": { stationName: "Dakota", color: "Orange", line: "Circle" },
  "CC9 EW8": { stationName: "Paya Lebar", color: "Orange", line: "Circle" },
  "CC10 DT26": { stationName: "MacPherson", color: "Orange", line: "Circle" },
  "CC11": { stationName: "Tai Seng", color: "Orange", line: "Circle" },
  "CC12": { stationName: "Bartley", color: "Orange", line: "Circle" },
  "CC13 NE12": { stationName: "Serangoon", color: "Orange", line: "Circle" },
  "CC14": { stationName: "Lorong Chuan", color: "Orange", line: "Circle" },
  "CC15 NS17": { stationName: "Bishan", color: "Orange", line: "Circle" },
  "CC16": { stationName: "Marymount", color: "Orange", line: "Circle" },
  "CC17": { stationName: "Caldecott", color: "Orange", line: "Circle" },
  "CC19 DT9": { stationName: "Botanic Gardens", color: "Orange", line: "Circle" },
  "CC20": { stationName: "Farrer Road", color: "Orange", line: "Circle" },
  "CC21": { stationName: "Holland Village", color: "Orange", line: "Circle" },
  "CC22 EW21": { stationName: "Buona Vista", color: "Orange", line: "Circle" },
  "CC23": { stationName: "one-north", color: "Orange", line: "Circle" },
  "CC24": { stationName: "Kent Ridge", color: "Orange", line: "Circle" },
  "CC25": { stationName: "Haw Par Villa", color: "Orange", line: "Circle" },
  "CC26": { stationName: "Pasir Panjang", color: "Orange", line: "Circle" },
  "CC27": { stationName: "Labrador Park", color: "Orange", line: "Circle" },
  "CC28": { stationName: "Telok Blangah", color: "Orange", line: "Circle" },
  "CC29 NE1": { stationName: "HarbourFront", color: "Orange", line: "Circle" },
  "CE1 DT16": { stationName: "Bayfront", color: "Orange", line: "Circle Extension" },
  "CE2 NS27": { stationName: "Marina Bay", color: "Orange", line: "Circle Extension" },
}

const stationDataDT = {
  // DownTown line
  "DT1 BP6": { stationName: "Bukit Panjang", color: "Blue", line: "Downtown" },
  "DT2": { stationName: "Cashew", color: "Blue", line: "Downtown" },
  "DT3": { stationName: "Hillview", color: "Blue", line: "Downtown" },
  "DT5": { stationName: "Beauty World", color: "Blue", line: "Downtown" },
  "DT6": { stationName: "King Albert Park", color: "Blue", line: "Downtown" },
  "DT7": { stationName: "Sixth Avenue", color: "Blue", line: "Downtown" },
  "DT8": { stationName: "Tan Kah Kee", color: "Blue", line: "Downtown" },
  "DT9 CC19": { stationName: "Botanic Gardens", color: "Blue", line: "Downtown" },
  "DT10": { stationName: "Stevens", color: "Blue", line: "Downtown" },
  "DT11 NS21": { stationName: "Newton", color: "Blue", line: "Downtown" },
  "DT12 NE7": { stationName: "Little India", color: "Blue", line: "Downtown" },
  "DT13": { stationName: "Rochor", color: "Blue", line: "Downtown" },
  "DT14 EW12": { stationName: "Bugis", color: "Blue", line: "Downtown" },
  "DT15 CC4": { stationName: "Promenade", color: "Blue", line: "Downtown" },
  "DT16 CE1": { stationName: "Bayfront", color: "Blue", line: "Downtown" },
  "DT17": { stationName: "Downtown", color: "Blue", line: "Downtown" },
  "DT18": { stationName: "Telok Ayer", color: "Blue", line: "Downtown" },
  "DT19 NE4": { stationName: "Chinatown", color: "Blue", line: "Downtown" },
  "DT20": { stationName: "Fort Canning", color: "Blue", line: "Downtown" },
  "DT21": { stationName: "Bencoolen", color: "Blue", line: "Downtown" },
  "DT22": { stationName: "Jalan Besar", color: "Blue", line: "Downtown" },
  "DT23": { stationName: "Bendemeer", color: "Blue", line: "Downtown" },
  "DT24": { stationName: "Geylang Bahru", color: "Blue", line: "Downtown" },
  "DT25": { stationName: "Mattar", color: "Blue", line: "Downtown" },
  "DT26 CC10": { stationName: "MacPherson", color: "Blue", line: "Downtown" },
  "DT27": { stationName: "Ubi", color: "Blue", line: "Downtown" },
  "DT28": { stationName: "Kaki Bukit", color: "Blue", line: "Downtown" },
  "DT29": { stationName: "Bedok North", color: "Blue", line: "Downtown" },
  "DT30": { stationName: "Bedok Reservoir", color: "Blue", line: "Downtown" },
  "DT31": { stationName: "Tampines West", color: "Blue", line: "Downtown" },
  "DT32 EW2": { stationName: "Tampines", color: "Blue", line: "Downtown" },
  "DT33": { stationName: "Tampines East", color: "Blue", line: "Downtown" },
  "DT34": { stationName: "Upper Changi", color: "Blue", line: "Downtown" },
  "DT35 CG1": { stationName: "Expo", color: "Blue", line: "Downtown" },
}

const stationDataTE = {
  // Thomson East-Coast line
  "TE1": { stationName: "Woodlands North", color: "Brown", line: "Thomson-East Coast" },
  "TE2 NS9": { stationName: "Woodlands", color: "Brown", line: "Thomson-East Coast" },
  "TE3": { stationName: "Woodlands South", color: "Brown", line: "Thomson-East Coast" },
  "TE4": { stationName: "Springleaf", color: "Brown", line: "Thomson-East Coast" },
  "TE5": { stationName: "Lentor", color: "Brown", line: "Thomson-East Coast" },
  "TE6": { stationName: "Mayflower", color: "Brown", line: "Thomson-East Coast" },
  "TE7": { stationName: "Bright Hill", color: "Brown", line: "Thomson-East Coast" },
  "TE8": { stationName: "Upper Thomson", color: "Brown", line: "Thomson-East Coast" },
  "TE9 CC17": { stationName: "Caldecott", color: "Brown", line: "Thomson-East Coast" },
  "TE11 DT10": { stationName: "Stevens", color: "Brown", line: "Thomson-East Coast" },
  "TE12": { stationName: "Napier", color: "Brown", line: "Thomson-East Coast" },
  "TE13": { stationName: "Orchard Boulevard", color: "Brown", line: "Thomson-East Coast" },
  "TE14 NS22": { stationName: "Orchard", color: "Brown", line: "Thomson-East Coast" },
  "TE15": { stationName: "Great World", color: "Brown", line: "Thomson-East Coast" },
  "TE16": { stationName: "Havelock", color: "Brown", line: "Thomson-East Coast" },
  "TE17 EW16 NE3": { stationName: "Outram Park", color: "Brown", line: "Thomson-East Coast" },
  "TE18": { stationName: "Maxwell", color: "Brown", line: "Thomson-East Coast" },
  "TE19": { stationName: "Shenton Way", color: "Brown", line: "Thomson-East Coast" },
  "TE20": { stationName: "Marina Bay", color: "Brown", line: "Thomson-East Coast" }
}
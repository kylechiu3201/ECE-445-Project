import psutil, time, requests, os, json, hashlib
from _thread import start_new_thread
import bluetooth
import serial
import serial.tools.list_ports
from bluetooth import discover_devices


json_file_path = './frontend/src/lists.json'
# prog_black = banned programs
# prog_white = allowed programs
# web_black = banned websites
# web_white = allowed websites
list_dict = {'prog_black': [], 'prog_white': [], 'web_black': [], 'web_white': []}

def checkIfProcessRunning(processName):
    '''
    Check if there is any running process that contains the given name processName.
    '''
    #Iterate over the all the running process
    for proc in psutil.process_iter():
        try:
            # Check if process name contains the given name string.
            if processName.lower() in proc.name().lower():
                return True
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            pass
    return False


def start_frontend_server():
    '''
        Starts up the frontend server necessary for adding and removing programs/websites to its respective whitelist/blacklist
    '''
    os.system('npm start --prefix ./frontend/')

def start_backend_server():
    '''
    Starts up the backend server necessary for website detection
    '''
    os.system('node ./backend_server/index.js')


def getCOMPort():
    #Find COM port with LookFor name
    print("Connecting to the Antiprocrastinator...")
    lookFor = "Antiprocrastinator"
    nb=discover_devices(lookup_names=True)
    for addr,name in list(nb):
        if lookFor == name:
            break
        else:
            name = None
            addr = None
    if name == lookFor:
        comPorts=list(serial.tools.list_ports.comports())
        addr = addr.replace(":", "")
        for COM,des,hwenu in comPorts :
            if addr in hwenu:
                break
    if name!=None:
        print("Antiprocrastinator found using {} with BlueTooth ID {}".format(COM, name))
        return COM
    else:
        print('Antiprocrastinator device cannot be found.')


def get_lists():
    '''
        Gets all data from the lists.json
    '''
    file = open(json_file_path)
    lists = json.load(file)
    for list_type in ['prog_black', 'prog_white', 'web_black', 'web_white']:
        list_dict[list_type] = lists[list_type]


def get_hash():
    hash = ''
    with open(json_file_path, 'rb') as f:
        hash = hashlib.md5(f.read()).hexdigest()
    return hash


def main():
    initialHash = [get_hash()]
    get_lists()

    start_new_thread(start_backend_server, ()) # starts the backend server in its own thread

    time.sleep(5)

    start_new_thread(start_frontend_server, ()) # starts the frontend server in its own thread

    ser = serial.Serial(getCOMPort(), 115200, timeout=2)

    while True: #constantly be checking is there is a banned app
        try:
            anyIssues = False
            # for app in bannedApplications: #check all apps in the list
            for app in list_dict['prog_black']: #check all apps in the list
                # if checkIfProcessRunning(app) and app not in allowedApplications:
                if checkIfProcessRunning(app) and app not in list_dict['prog_white']:
                    anyIssues = True
                    print('ALERT!!! ' + app)

            r = requests.get('http://localhost:3000/getCurrent')
            #print("current website is " + r.text)
            # for item in bannedWebsites:
            for item in list_dict['web_black']:
                if item in r.text:
                    # if r.text not in allowedWebsites:
                    if r.text not in list_dict['web_white']:
                        anyIssues = True
                        print('ALERT!!! ' + r.text)
            # if r.text in bannedWebsites and r.text not in allowedWebsites:
            #     print('ALERT!!! ' + r.text)
            if anyIssues:
                # print("Send blutooth signal to buzz here")
                ser.write(bytes('b', 'utf-8'))
            else:
                ser.write(bytes('s', 'utf-8'))
                print("No issues")

            res = str(ser.readline())
            print(res[2:][:-5])

            curHash = get_hash()
            if initialHash[0] != curHash:
                get_lists()
                initialHash[0] = curHash
                print('JSON file changed')


            time.sleep(2) #how often to check
        except ConnectionError:
            print("not connected to server")



if __name__ == "__main__":
    main()

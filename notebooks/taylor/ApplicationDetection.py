import psutil
import time

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

def main():

    bannedApplications = ['discord', 'chrome'] 

    while True: #constantly be checking is there is a banned app
        for app in bannedApplications: #check all apps in the list
            if checkIfProcessRunning(app):
                print('A ' + app + ' process was running')
                #send bluetooth signal to make a buzz or a pulse or something
            else:
                print('No process was running')
        time.sleep(2) #howw often to check

if __name__ == "__main__":
    main()
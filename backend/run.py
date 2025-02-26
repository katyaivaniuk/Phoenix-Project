from app import routes  
from app import my_server

if __name__ == '__main__':
    my_server.run(debug=True, host="0.0.0.0", port=8779)

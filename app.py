import subprocess
from flask import Flask, render_template

PORT = 80

# app = Flask(__name__)
# app = Flask(__name__, template_folder='./build/templates', static_folder='./build/static')
app = Flask(__name__, template_folder='./build',
            static_folder='./build/static')

@app.route('/')
@app.route('/setup')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    try:
        app.run('0.0.0.0', port=PORT)
        # app.run()
    except (KeyboardInterrupt, SystemExit):
        print('\n server stop ')

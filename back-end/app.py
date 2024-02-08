from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from chat import get_response

import constants
import os
import json
import time
import random
import re

app = Flask(__name__)
CORS(app)

# Replace with your OpenAI API key

os.environ["OPENAI_API_KEY"] = constants.APIKEY

client = OpenAI()

def format_links(response):
    urls = re.findall('(?:https?://|www\.)\S+', response)
    # Replace URLs with HTML anchor tags
    for url in urls:
        response = response.replace(url, '<a href="{}" target="_blank">{}</a>'.format(url, url))
    return response


@app.route("/")
def index():
    return render_template("index.html")

@app.route('/get_chatgpt_response', methods=['POST'])
def get_chatgpt_response():
    
    try:
        user_input = request.json["user_input"].lower() #get the user input
        
        response = get_response(user_input) #get response from custom data
        if any(substring in response for substring in ['http://', 'https://', 'www.']):
            response = format_links(response)
        
        if(response == "not found"):
            prompt = f"User: {user_input}\n\nChatGPT:" # Prompt for GPT-3.5-Turbo, ensuring polite and helpful responses
            
            # Call OpenAI API with appropriate parameters
            response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": prompt}
            ],
            max_tokens=200,  # Adjust response length as needed
            n=1,
            stop=None,
            temperature=0.7,  # Adjust creativity as needed
            )
            
            response = response.model_dump()['choices'][0]['message']['content']
            
        delay_seconds = random.randint(3,5)
        time.sleep(delay_seconds)
        return jsonify({'chatgpt_response': response}) 
        
    except Exception as e:
        return jsonify({'error': str(e)})   
    
if __name__ == "__main__":
    app.run(debug=True)
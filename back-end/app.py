from flask import Flask, render_template, request, jsonify
# import openai
import constants
import os
# from openai import OpenAI
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

# Replace with your OpenAI API key
from openai import OpenAI

os.environ["OPENAI_API_KEY"] = constants.APIKEY

client = OpenAI()


@app.route("/")
def index():
    return render_template("index.html")

@app.route('/get_chatgpt_response', methods=['POST'])
def get_chatgpt_response():
    try:
        user_input = request.json["user_input"]

        print(user_input)
    # Prompt for GPT-3.5-Turbo, ensuring polite and helpful responses
        prompt = f"User: {user_input}\n\nChatGPT:"
        print(prompt)

    # Call OpenAI API with appropriate parameters
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=150,  # Adjust response length as needed
            n=1,
            stop=None,
            temperature=0.7,  # Adjust creativity as needed
        )
        
        print(response)
        chatgpt_response = response.model_dump()['choices'][0]['message']['content']
        print(chatgpt_response)
        return jsonify({'chatgpt_response': chatgpt_response})
    except Exception as e:
        return jsonify({'error': str(e)})
    
if __name__ == "__main__":
    app.run(debug=True)
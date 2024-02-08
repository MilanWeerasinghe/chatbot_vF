# Chatbot with OpenAI, Python Flask, and Custom Data

## Overview

This project aims to create a simple chatbot using OpenAI's GPT-3.5 language model, Python Flask for web development, and custom data for enhancing conversation capabilities. It has a building chrome extension.

## Prerequisites

- Python 3.9 or higher
- OpenAI API key (sign up at https://beta.openai.com/signup/ to get one)
- Flask (`pip install Flask`)
- OpenAI Python library (`pip install openai`)
- If your pip is not upgraded, please upgrade it

## Getting Started

1. Clone this repository:

    ```bash
    git clone https://github.com/your_username/chatbot-with-openai-flask.git
    cd chatbot-with-openai-flask
    ```

2. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

3. Set up your OpenAI API key:

    Create a `.env` file in the project root directory and add your OpenAI API key:

    ```env
    OPENAI_API_KEY=your_api_key_here
    ```
   Or create constants.py and add your API key:

    ```env
    OPENAI_API_KEY=your_api_key_here
    ```
    
## Usage

1. Run the Flask app:

    ```bash
    python app.py
    ```

2. Open your web browser and navigate to `http://localhost:5000`.

3. Interact with the chatbot by typing messages in the input box.

## Custom Data

To enhance the chatbot's capabilities, you can include custom data by modifying the `custom_data.json` file. Add new conversation examples to improve the chatbot's understanding of specific topics.

```json
[
    {
        "user": "Hello",
        "bot": "Hi there! How can I assist you today?"
    },
    // Add more conversation examples as needed
]
```

## OpenAI Configuration

Adjust the OpenAI configuration in the `app.py` file, where you make API calls. You can modify parameters such as the model, temperature, and max tokens to fine-tune the chatbot's responses.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for providing the GPT-3.5 language model.
- Flask community for the web framework.

Feel free to customize and extend this project according to your needs!
